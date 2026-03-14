import React from 'react';
import { motion } from 'motion/react';
import {
  Clock,
  ExternalLink,
  FileArchive,
  FileImage,
  FileSpreadsheet,
  FileText,
  Folder,
  Search,
} from 'lucide-react';
import { KNOWLEDGE_HUB_URL } from '../constants';
import { knowledgeDepartments, knowledgeDepartmentsMeta } from '../data/generated/knowledge-hub';
import { cn } from '../lib/utils';

function getFileIcon(extension: string) {
  if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)) {
    return FileImage;
  }
  if (['xls', 'xlsx', 'csv'].includes(extension)) {
    return FileSpreadsheet;
  }
  if (['zip', 'rar', '7z'].includes(extension)) {
    return FileArchive;
  }
  return FileText;
}

export function KnowledgeHub() {
  const [activeCategory, setActiveCategory] = React.useState('ყველა');
  const [searchQuery, setSearchQuery] = React.useState('');

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const categories = ['ყველა', ...knowledgeDepartments.map((department) => department.title)];
  const syncedAtLabel = new Date(knowledgeDepartmentsMeta.syncedAt).toLocaleString('ka-GE');

  const filteredDepartments = knowledgeDepartments
    .map((department) => ({
      ...department,
      documents: department.documents.filter((document) => {
        if (!normalizedQuery) {
          return true;
        }

        return [document.title, document.pathLabel, document.modifiedLabel]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery);
      }),
    }))
    .filter(
      (department) =>
        (activeCategory === 'ყველა' || department.title === activeCategory) && department.documents.length > 0,
    );

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="h-8 w-1.5 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.2)]" />
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">ბიბლიოთეკა</h3>
          </div>
          <h2 className="text-4xl font-extrabold text-gradient tracking-tight">ცოდნის ჰაბი</h2>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto">
          <div className="relative group w-full sm:w-auto">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
            <input
              type="text"
              placeholder="ძიება დოკუმენტებში..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="pl-14 pr-8 py-5 glass-card rounded-[2rem] w-full md:w-96 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all text-sm font-medium"
            />
          </div>

          <a
            href={KNOWLEDGE_HUB_URL}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto justify-center flex items-center gap-3 px-8 py-5 bg-blue-600 text-white rounded-[2rem] hover:bg-blue-700 transition-all font-bold text-xs uppercase tracking-widest shadow-lg shadow-blue-500/20"
          >
            Drive საქაღალდე
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="glass-card rounded-[2.5rem] p-6 sm:p-8 flex flex-col xl:flex-row xl:items-center gap-6 xl:gap-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
            <Folder className="w-7 h-7" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">სინქი</p>
            <h3 className="text-lg font-bold text-slate-900 break-anywhere">Google Drive-დან გენერირებული ბიბლიოთეკა</h3>
          </div>
        </div>
        <div className="flex-1 grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          <div className="rounded-2xl bg-slate-50 px-4 py-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">დეპარტამენტები</p>
            <p className="mt-1 text-xl font-black text-slate-900">{knowledgeDepartmentsMeta.departmentCount}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 px-4 py-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">დოკუმენტები</p>
            <p className="mt-1 text-xl font-black text-slate-900">{knowledgeDepartmentsMeta.documentCount}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 px-4 py-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">განახლდა</p>
            <p className="mt-1 text-sm font-bold text-slate-900">{syncedAtLabel}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={cn(
              'px-8 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all duration-500 border',
              activeCategory === category
                ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20'
                : 'glass-card text-slate-500 hover:text-slate-900 border-slate-100',
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="space-y-16">
        {filteredDepartments.map((department) => (
          <section key={department.id} className="space-y-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-4 min-w-0">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <Folder className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-2xl font-bold text-slate-900 break-anywhere">{department.title}</h3>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-slate-100 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                      {department.documentCount} დოკუმენტი
                    </span>
                    <span className="rounded-full bg-blue-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-600">
                      განახლდა {department.modifiedLabel}
                    </span>
                  </div>
                </div>
              </div>

              <a
                href={department.url}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-fit justify-center flex items-center gap-2 px-5 py-3 rounded-2xl glass-card text-[10px] font-bold uppercase tracking-widest text-slate-600 hover:text-blue-600 transition-all"
              >
                საქაღალდის გახსნა <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid lg:grid-cols-2 gap-5 xl:gap-6">
              {department.documents.map((document, index) => {
                const Icon = getFileIcon(document.extension);

                return (
                  <motion.a
                    key={document.id}
                    href={document.url}
                    target="_blank"
                    rel="noreferrer"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.03 }}
                    className="glass-card rounded-[2.25rem] p-6 sm:p-7 glass-card-hover group"
                  >
                    <div className="flex items-start gap-4 sm:gap-5 min-w-0">
                      <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shrink-0">
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-slate-400 group-hover:text-white" />
                      </div>

                      <div className="min-w-0 flex-1 space-y-4">
                        <div className="flex items-start justify-between gap-3">
                          <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed break-anywhere group-hover:text-blue-600 transition-colors">
                            {document.title}
                          </h4>
                          <ExternalLink className="w-5 h-5 text-slate-300 group-hover:text-blue-600 transition-colors shrink-0 mt-1" />
                        </div>

                        {document.pathLabel && (
                          <p className="text-[11px] font-semibold leading-relaxed text-indigo-600 break-anywhere">
                            {document.pathLabel}
                          </p>
                        )}

                        <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                          <span className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1.5 text-slate-500 border border-slate-100">
                            <Clock className="w-3.5 h-3.5" />
                            {document.modifiedLabel}
                          </span>
                          <span className="rounded-full bg-blue-50 px-3 py-1.5 text-blue-600 border border-blue-100">
                            {document.extension || 'file'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {filteredDepartments.length === 0 && (
        <div className="text-center py-32 glass-card rounded-[3rem] border-dashed border-slate-200">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-8 h-8 text-slate-300" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">დოკუმენტები ვერ მოიძებნა</h3>
          <p className="text-sm text-slate-400 font-medium uppercase tracking-widest">სცადეთ სხვა საძიებო სიტყვა ან დეპარტამენტი</p>
        </div>
      )}
    </div>
  );
}
