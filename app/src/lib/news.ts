import type { NewsItem } from '../types';

export const NEWS_STORAGE_KEY = 'medhub_news_state_v2';
export const LEGACY_CUSTOM_NEWS_STORAGE_KEY = 'medhub_news';
export const NEWS_LAST_SEEN_STORAGE_KEY = 'medhub_news_last_seen_at';

export function isNewsItem(value: unknown): value is NewsItem {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const item = value as Record<string, unknown>;
  return (
    typeof item.id === 'string' &&
    typeof item.title === 'string' &&
    typeof item.date === 'string' &&
    typeof item.category === 'string' &&
    typeof item.summary === 'string'
  );
}

export function getNewsTimestamp(item: NewsItem) {
  if (typeof item.createdAt === 'number') {
    return item.createdAt;
  }

  const parsed = Date.parse(item.date);
  return Number.isNaN(parsed) ? 0 : parsed;
}

export function getLatestNewsTimestamp(items: NewsItem[]) {
  return items.reduce((latest, item) => Math.max(latest, getNewsTimestamp(item)), 0);
}

export function normalizeNewsItem(item: NewsItem): NewsItem {
  const summary = item.summary.trim() || 'ადმინისტრატორის მიერ დამატებული შიდა განახლება.';
  const content = item.content?.trim() || summary;
  const createdAt = getNewsTimestamp(item);

  return {
    ...item,
    title: item.title.trim(),
    summary,
    content,
    createdAt: createdAt > 0 ? createdAt : undefined,
  };
}

export function sortNews(items: NewsItem[]) {
  return [...items].map(normalizeNewsItem).sort((left, right) => getNewsTimestamp(right) - getNewsTimestamp(left));
}

export function readStoredNews(storageKey: string): NewsItem[] | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const saved = window.localStorage.getItem(storageKey);
    if (!saved) {
      return null;
    }

    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) {
      return null;
    }

    return sortNews(parsed.filter(isNewsItem));
  } catch {
    return null;
  }
}

export function writeStoredNews(items: NewsItem[]) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(sortNews(items)));
  window.localStorage.removeItem(LEGACY_CUSTOM_NEWS_STORAGE_KEY);
}

export function readStoredNumber(storageKey: string) {
  if (typeof window === 'undefined') {
    return null;
  }

  const rawValue = window.localStorage.getItem(storageKey);
  if (!rawValue) {
    return null;
  }

  const parsed = Number(rawValue);
  return Number.isFinite(parsed) ? parsed : null;
}

export function writeStoredNumber(storageKey: string, value: number) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(storageKey, String(value));
}

export function getInitialNewsState(defaultNews: NewsItem[]) {
  const storedNews = readStoredNews(NEWS_STORAGE_KEY);
  if (storedNews !== null) {
    return storedNews;
  }

  const legacyCustomNews = readStoredNews(LEGACY_CUSTOM_NEWS_STORAGE_KEY) ?? [];
  return sortNews([...defaultNews, ...legacyCustomNews]);
}
