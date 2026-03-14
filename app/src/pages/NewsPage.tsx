import React from 'react';
import { motion } from 'motion/react';
import { Clock, Newspaper, ChevronRight, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { cn } from '../lib/utils';
import type { NewsItem } from '../types';

interface NewsPageProps {
  news: NewsItem[];
  canAddNews: boolean;
  onOpenAddNews: () => void;
  onOpenNews: (item: NewsItem) => void;
  onEditNews: (item: NewsItem) => void;
  onDeleteNews: (item: NewsItem) => void;
}

export function NewsPage({
  news,
  canAddNews,
  onOpenAddNews,
  onOpenNews,
  onEditNews,
  onDeleteNews,
}: NewsPageProps) {
  const [activeCategory, setActiveCategory] = React.useState('ყველა');
  const [searchQuery, setSearchQuery] = React.useState('');
  const categories = React.useMemo(
    () => ['ყველა', ...new Set(news.map((item) => item.category))],
    [news],
  );

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredNews = news.filter((item) => {
    const matchesCategory = activeCategory === 'ყველა' || item.category === activeCategory;
    const matchesSearch =
      normalizedQuery.length === 0 ||
      `${item.title} ${item.summary} ${item.category}`.toLowerCase().includes(normalizedQuery);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-6 w-1 bg-blue-600 rounded-full" />
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">სიახლეები</h3>
          </div>
          <h2 className="text-3xl font-bold text-slate-900">განახლებები</h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative group flex-1 md:flex-none">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="ძიება სიახლეებში..."
              className="pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl w-full md:w-96 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 shadow-sm transition-all"
            />
          </div>
          {canAddNews && (
            <button
              onClick={onOpenAddNews}
              className="px-6 py-4 bg-blue-600 text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
            >
              <Plus className="w-4 h-4" />
              სიახლის დამატება
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all border",
              activeCategory === cat 
                ? "bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-900/10" 
                : "bg-white text-slate-500 border-slate-200 hover:border-blue-300 hover:text-blue-600"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-6">
        {filteredNews.map((item, idx) => (
          <motion.article
            key={item.id}
            onClick={() => onOpenNews(item)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onOpenNews(item);
              }
            }}
            role="button"
            tabIndex={0}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="w-full text-left bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-2xl hover:shadow-blue-500/5 hover:border-blue-200 transition-all group cursor-pointer"
          >
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors flex-shrink-0">
                <Newspaper className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 rounded-xl bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    <Clock className="w-3 h-3" />
                    {item.date}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-500 leading-relaxed mb-6">
                  {item.summary}
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-blue-600 group-hover:translate-x-1 transition-transform">
                    სრულად წაკითხვა <ChevronRight className="w-3 h-3" />
                  </div>

                  {canAddNews && (
                    <div
                      className="flex items-center gap-2"
                      onClick={(event) => event.stopPropagation()}
                      onKeyDown={(event) => event.stopPropagation()}
                    >
                      <button
                        type="button"
                        onClick={() => onEditNews(item)}
                        className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        რედაქტირება
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteNews(item)}
                        className="inline-flex items-center gap-2 rounded-xl bg-rose-50 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-rose-600 hover:bg-rose-100 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        წაშლა
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {filteredNews.length === 0 && (
        <div className="text-center py-32 bg-white rounded-[3rem] border border-dashed border-slate-200">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Newspaper className="w-8 h-8 text-slate-300" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">სიახლეები ვერ მოიძებნა</h3>
          <p className="text-sm text-slate-400 font-medium uppercase tracking-widest">სცადეთ სხვა კატეგორია ან საძიებო სიტყვა</p>
        </div>
      )}
    </div>
  );
}
