import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DRIVE_ROOT_FOLDER_ID = '1NAkvFwEI-BTnb1NLLv0xDR4iaGTY7KRT';
const PHONE_FIRESTORE_PROJECT = 'medical-phone-directory';
const PHONE_FIRESTORE_API_KEY = 'AIzaSyAjGwo4BWRR2BZNewA91oiTSJjMePXNenE';
const DEFAULT_PHONE_README = path.resolve(__dirname, '../../../phone.github.io/README.md');
const OUTPUT_DIR = path.resolve(__dirname, '../src/data/generated');

const htmlEntities = new Map([
  ['&amp;', '&'],
  ['&quot;', '"'],
  ['&#39;', "'"],
  ['&#x27;', "'"],
  ['&lt;', '<'],
  ['&gt;', '>'],
]);

function decodeHtml(value) {
  return value
    .replace(/&amp;|&quot;|&#39;|&#x27;|&lt;|&gt;/g, (match) => htmlEntities.get(match) ?? match)
    .replace(/\s+/g, ' ')
    .trim();
}

function slugify(value) {
  return value
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[^a-z0-9\u10A0-\u10FF]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function formatPhone(value) {
  const digits = String(value ?? '').replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('995')) {
    return `+${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)} ${digits.slice(9)}`;
  }
  if (digits.length === 11 && digits.startsWith('0')) {
    return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
  }
  if (digits.length === 0) {
    return '';
  }
  if (digits.length === 9) {
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
  }
  return String(value ?? '').trim();
}

function getFirestoreString(fields, name) {
  return fields?.[name]?.stringValue ?? '';
}

function extractDocumentId(name) {
  const parts = String(name).split('/');
  return parts[parts.length - 1] ?? '';
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0',
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }

  return response.json();
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0',
      Accept: 'text/html,application/xhtml+xml',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }

  return response.text();
}

async function fetchAllFirestoreDocuments(collectionName) {
  const documents = [];
  let nextPageToken = '';

  do {
    const url = new URL(
      `https://firestore.googleapis.com/v1/projects/${PHONE_FIRESTORE_PROJECT}/databases/(default)/documents/${collectionName}`,
    );
    url.searchParams.set('key', PHONE_FIRESTORE_API_KEY);
    url.searchParams.set('pageSize', '1000');
    if (nextPageToken) {
      url.searchParams.set('pageToken', nextPageToken);
    }

    const payload = await fetchJson(url.toString());
    documents.push(...(payload.documents ?? []));
    nextPageToken = payload.nextPageToken ?? '';
  } while (nextPageToken);

  return documents;
}

async function loadInitialDoctors(phoneReadmePath) {
  const readme = await fs.readFile(phoneReadmePath, 'utf8');
  const match = readme.match(/const initialDoctors = \[(?<body>[\s\S]*?)\]\.map/);

  if (!match?.groups?.body) {
    throw new Error('Could not find initialDoctors array in phone directory README');
  }

  const initialDoctors = Function(`"use strict"; return [${match.groups.body}];`)();
  return initialDoctors.map((doctor, index) => ({
    ...doctor,
    sourceKey: `initial-${index}`,
  }));
}

function mergeDoctors(initialDoctors, firestoreDoctors, firestoreOverrides) {
  const overrideMap = new Map(
    firestoreOverrides.map((doc) => {
      const id = extractDocumentId(doc.name);
      return [
        id,
        {
          name: getFirestoreString(doc.fields, 'name'),
          specialty: getFirestoreString(doc.fields, 'specialty'),
          phone: getFirestoreString(doc.fields, 'phone'),
          comment: getFirestoreString(doc.fields, 'comment'),
        },
      ];
    }),
  );

  const mergedInitialDoctors = initialDoctors.map((doctor) => {
    const override = overrideMap.get(doctor.sourceKey);
    return {
      ...doctor,
      name: override?.name || doctor.name,
      specialty: override?.specialty || doctor.specialty,
      phone: override?.phone || doctor.phone,
      comment: override?.comment || doctor.comment || '',
    };
  });

  const extraDoctors = firestoreDoctors.map((doc) => {
    const id = extractDocumentId(doc.name);
    return {
      id: `firebase-${id}`,
      sourceKey: `firebase-${id}`,
      name: getFirestoreString(doc.fields, 'name'),
      specialty: getFirestoreString(doc.fields, 'specialty'),
      phone: getFirestoreString(doc.fields, 'phone'),
      comment: getFirestoreString(doc.fields, 'comment'),
      isInitial: false,
    };
  });

  return [...mergedInitialDoctors, ...extraDoctors]
    .map((doctor, index) => ({
      id: doctor.sourceKey || `doctor-${index + 1}`,
      fullName: String(doctor.name ?? '').trim(),
      specialty: String(doctor.specialty ?? '').trim(),
      department: String(doctor.specialty ?? '').trim(),
      phone: formatPhone(doctor.phone),
      comment: String(doctor.comment ?? '').trim(),
      sourceKey: doctor.sourceKey || `doctor-${index + 1}`,
      isInitial: doctor.isInitial !== false,
      searchText: [doctor.name, doctor.specialty, doctor.phone, doctor.comment].filter(Boolean).join(' ').toLowerCase(),
    }))
    .filter((doctor) => doctor.fullName && doctor.specialty && doctor.phone)
    .sort((a, b) => {
      const specialtyComparison = a.specialty.localeCompare(b.specialty, 'ka');
      if (specialtyComparison !== 0) {
        return specialtyComparison;
      }
      return a.fullName.localeCompare(b.fullName, 'ka');
    });
}

function parseFolderEntries(html) {
  const entries = [];
  const entryPattern =
    /<div class="flip-entry" id="entry-([^"]+)"[\s\S]*?<a href="([^"]+)" target="_blank">[\s\S]*?<div class="flip-entry-title">([\s\S]*?)<\/div><\/a><\/div><div class="flip-entry-last-modified"><div>([^<]*)<\/div><\/div><\/div>/g;

  for (const match of html.matchAll(entryPattern)) {
    const [, rawId, href, rawTitle, modifiedLabel] = match;
    const isFolder = href.includes('/drive/folders/');
    const entryId = isFolder
      ? href.split('/drive/folders/')[1]?.split(/[?#]/)[0]
      : rawId;

    entries.push({
      id: entryId,
      title: decodeHtml(rawTitle),
      url: decodeHtml(href),
      modifiedLabel: decodeHtml(modifiedLabel),
      kind: isFolder ? 'folder' : 'file',
    });
  }

  return entries;
}

async function fetchDriveFolderEntries(folderId) {
  const html = await fetchText(`https://drive.google.com/embeddedfolderview?id=${folderId}#list`);
  return parseFolderEntries(html);
}

async function crawlDriveFiles(folderId, pathSegments = []) {
  const entries = await fetchDriveFolderEntries(folderId);
  const files = [];

  for (const entry of entries) {
    if (entry.kind === 'folder') {
      const nestedFiles = await crawlDriveFiles(entry.id, [...pathSegments, entry.title]);
      files.push(...nestedFiles);
      continue;
    }

    files.push({
      id: entry.id,
      title: entry.title,
      url: entry.url,
      modifiedLabel: entry.modifiedLabel,
      pathLabel: pathSegments.join(' / '),
      extension: entry.title.includes('.') ? entry.title.split('.').pop()?.toLowerCase() ?? '' : '',
    });
  }

  return files;
}

async function buildKnowledgeHubData() {
  const topLevelEntries = await fetchDriveFolderEntries(DRIVE_ROOT_FOLDER_ID);
  const departmentFolders = topLevelEntries.filter((entry) => entry.kind === 'folder');
  const departments = [];

  for (const folder of departmentFolders) {
    const documents = await crawlDriveFiles(folder.id);
    departments.push({
      id: folder.id,
      slug: slugify(folder.title),
      title: folder.title,
      url: folder.url,
      modifiedLabel: folder.modifiedLabel,
      documentCount: documents.length,
      documents,
    });
  }

  return departments.sort((a, b) => a.title.localeCompare(b.title, 'ka'));
}

async function writeGeneratedModule(filename, exportName, payload, meta = {}) {
  const filePath = path.join(OUTPUT_DIR, filename);
  const source = `export const ${exportName} = ${JSON.stringify(payload, null, 2)};\n\nexport const ${exportName}Meta = ${JSON.stringify(
    meta,
    null,
    2,
  )};\n`;
  await fs.writeFile(filePath, source, 'utf8');
}

async function main() {
  const phoneReadmePath = process.env.PHONE_DIRECTORY_README || DEFAULT_PHONE_README;
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  const [initialDoctors, firestoreDoctors, firestoreOverrides, knowledgeDepartments] = await Promise.all([
    loadInitialDoctors(phoneReadmePath),
    fetchAllFirestoreDocuments('doctors'),
    fetchAllFirestoreDocuments('doctor_overrides'),
    buildKnowledgeHubData(),
  ]);

  const mergedDoctors = mergeDoctors(initialDoctors, firestoreDoctors, firestoreOverrides);
  const syncedAt = new Date().toISOString();

  await writeGeneratedModule('doctors.ts', 'directoryDoctors', mergedDoctors, {
    syncedAt,
    sourceUrl: 'https://phone.imed.com.ge/',
    firestoreProject: PHONE_FIRESTORE_PROJECT,
    phoneReadmePath,
    doctorCount: mergedDoctors.length,
  });

  await writeGeneratedModule('knowledge-hub.ts', 'knowledgeDepartments', knowledgeDepartments, {
    syncedAt,
    sourceUrl: `https://drive.google.com/drive/folders/${DRIVE_ROOT_FOLDER_ID}`,
    departmentCount: knowledgeDepartments.length,
    documentCount: knowledgeDepartments.reduce((total, department) => total + department.documentCount, 0),
  });

  console.log(`Synced ${mergedDoctors.length} directory entries and ${knowledgeDepartments.length} knowledge departments.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
