import React from 'react';
import { motion } from 'motion/react';
import { Search, FileText, Star, ChevronRight, Clock, ExternalLink } from 'lucide-react';
import { KNOWLEDGE_BASE, RESOURCES } from '../constants';
import { cn } from '../lib/utils';
import { ResourceIcon } from '../components/ResourceIcon';

const categories = [
  'ყველა', 'კარდიოლოგია', 'ნევროლოგია', 'ქირურგია', 'რეანიმაცია', 'თერაპია', 'გინეკოლოგია', 'პედიატრია'
];

export function KnowledgeHub() {
  const [activeCategory, setActiveCategory] = React.useState('ყველა');
  const [searchQuery, setSearchQuery] = React.useState('');
  const knowledgeLinks = RESOURCES.filter((resource) => resource.category === 'ცოდნა და დოკუმენტები');
  const knowledgeHubLink = knowledgeLinks.find((resource) => resource.id === 'knowledge-hub')?.url ?? '#';

  const filteredMaterials = KNOWLEDGE_BASE.filter(item => {
    const matchesCategory = activeCategory === 'ყველა' || item.specialty === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 sm:space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-6 w-1 bg-blue-600 rounded-full" />
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">ცოდნის ბაზა</h3>
          </div>
          <h2 className="text-3xl font-bold text-slate-900">კლინიკური ჰაბი</h2>
        </div>
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
          <input 
            type="text" 
            placeholder="ძიება ბაზაში..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl w-full md:w-96 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 shadow-sm transition-all"
          />
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {knowledgeLinks.map((resource, idx) => (
          <motion.a
            key={resource.id}
            href={resource.url}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.06 }}
            className="group rounded-[2.5rem] border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-500/5 sm:p-8"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <ResourceIcon name={resource.icon} className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">{resource.access}</p>
                  <h3 className="mt-1 text-xl font-bold text-slate-900">{resource.title}</h3>
                </div>
              </div>
              <ExternalLink className="h-5 w-5 flex-shrink-0 text-slate-300 transition-colors group-hover:text-blue-600" />
            </div>
            <p className="mb-4 text-sm leading-relaxed text-slate-500">{resource.description}</p>
            {resource.note && (
              <p className="rounded-2xl bg-slate-50 px-4 py-3 text-xs leading-relaxed text-slate-500">
                {resource.note}
              </p>
            )}
          </motion.a>
        ))}
      </div>

      {/* Categories Scroll */}
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

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredMaterials.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-2xl hover:shadow-blue-500/5 hover:border-blue-200 transition-all flex flex-col group overflow-hidden"
          >
            <div className="p-8 flex-1">
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 rounded-xl bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest">
                  {item.type}
                </span>
                <button className="text-slate-300 hover:text-amber-400 transition-colors">
                  <Star className="w-5 h-5" />
                </button>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-slate-500 mb-6 line-clamp-3 leading-relaxed">
                {item.description}
              </p>
              <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                <span className="flex items-center gap-1.5">
                  <FileText className="w-3 h-3" />
                  {item.specialty}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3 h-3" />
                  {item.date}
                </span>
              </div>
            </div>
            <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-400">
                  {item.author.split(' ').map(n => n[0]).join('')}
                </div>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider truncate max-w-[120px]">
                  {item.author}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={knowledgeHubLink}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <a
                  href={knowledgeHubLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-[10px] font-bold uppercase tracking-widest text-slate-900 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all"
                >
                  გახსნა ჰაბში <ChevronRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredMaterials.length === 0 && (
        <div className="text-center py-32 bg-white rounded-[3rem] border border-dashed border-slate-200">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-8 h-8 text-slate-300" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">მასალები ვერ მოიძებნა</h3>
          <p className="text-sm text-slate-400 font-medium uppercase tracking-widest">სცადეთ სხვა საძიებო სიტყვა ან კატეგორია</p>
        </div>
      )}
    </div>
  );
}
