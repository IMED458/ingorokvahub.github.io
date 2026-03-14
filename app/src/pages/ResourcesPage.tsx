import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Search } from 'lucide-react';
import { RESOURCES } from '../constants';
import { ResourceIcon } from '../components/ResourceIcon';
import { cn } from '../lib/utils';

export function ResourcesPage() {
  const [activeCategory, setActiveCategory] = React.useState('ყველა');
  const [searchQuery, setSearchQuery] = React.useState('');

  const categories = ['ყველა', ...new Set(RESOURCES.map((resource) => resource.category))];

  const filteredResources = RESOURCES.filter((resource) => {
    const normalizedQuery = searchQuery.toLowerCase();
    const matchesCategory = activeCategory === 'ყველა' || resource.category === activeCategory;
    const matchesQuery =
      resource.title.toLowerCase().includes(normalizedQuery) ||
      resource.description.toLowerCase().includes(normalizedQuery) ||
      resource.access.toLowerCase().includes(normalizedQuery) ||
      resource.note?.toLowerCase().includes(normalizedQuery);

    return matchesCategory && matchesQuery;
  });

  return (
    <div className="space-y-8 sm:space-y-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-3">
            <div className="h-6 w-1 rounded-full bg-blue-600" />
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">სამუშაო პლატფორმები</h3>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">ერთიანი რესურსების ცენტრი</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-500">
            ყველა საჭირო სისტემა, პლატფორმა და სწრაფი ბმული ერთ ეკრანზე, მობილურზეც და დესკტოპზეც.
          </p>
        </div>
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
          <input
            type="text"
            placeholder="ძიება რესურსებში..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-6 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 md:w-96"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={cn(
              'whitespace-nowrap rounded-2xl border px-5 py-3 text-xs font-bold uppercase tracking-widest transition-all',
              activeCategory === category
                ? 'border-slate-900 bg-slate-900 text-white shadow-xl shadow-slate-900/10'
                : 'border-slate-200 bg-white text-slate-500 hover:border-blue-300 hover:text-blue-600',
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {filteredResources.map((resource, index) => (
          <motion.a
            key={resource.id}
            href={resource.url}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
            className="group flex h-full flex-col rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-500/5 sm:p-7"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-transform group-hover:scale-105">
                  <ResourceIcon name={resource.icon} className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">{resource.category}</p>
                  <h3 className="mt-1 text-lg font-bold text-slate-900">{resource.title}</h3>
                </div>
              </div>
              <ExternalLink className="h-5 w-5 flex-shrink-0 text-slate-300 transition-colors group-hover:text-blue-600" />
            </div>

            <p className="mb-5 text-sm leading-relaxed text-slate-500">{resource.description}</p>

            <div className="mt-auto space-y-4">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-xl bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-600">
                  {resource.access}
                </span>
                {resource.featured && (
                  <span className="rounded-xl bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-blue-600">
                    მთავარი
                  </span>
                )}
              </div>

              {resource.note && (
                <p className="rounded-2xl bg-slate-50 px-4 py-3 text-xs leading-relaxed text-slate-500">
                  {resource.note}
                </p>
              )}

              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-blue-600">
                <span>გახსნა ახალ ფანჯარაში</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
