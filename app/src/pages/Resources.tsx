import React from 'react';
import { motion } from 'motion/react';
import { 
  ExternalLink, 
  Phone, 
  Calculator, 
  Home, 
  FileText, 
  RefreshCw, 
  ClipboardList, 
  Database, 
  Beaker, 
  Activity, 
  BookOpen, 
  Files,
  BriefcaseMedical,
  Search
} from 'lucide-react';
import { RESOURCES } from '../constants';
import { cn } from '../lib/utils';

const iconMap: Record<string, any> = {
  Phone,
  Calculator,
  Home,
  FileText,
  RefreshCw,
  ClipboardList,
  Database,
  Beaker,
  Activity,
  BookOpen,
  Files,
  BriefcaseMedical
};

export function Resources() {
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredResources = RESOURCES.filter(res => 
    res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    res.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="h-8 w-1.5 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">შიდა ქსელი</h3>
          </div>
          <h2 className="text-4xl font-extrabold text-gradient tracking-tight">სამუშაო რესურსები</h2>
        </div>
        <div className="relative group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
          <input 
            type="text" 
            placeholder="ძიება რესურსებში..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-14 pr-8 py-5 glass-card rounded-[2rem] w-full md:w-96 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all text-sm font-medium"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredResources.map((res, idx) => {
          const Icon = iconMap[res.icon] || ExternalLink;
          return (
            <motion.a
              key={res.id}
              href={res.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="group glass-card p-6 sm:p-10 rounded-[2.5rem] sm:rounded-[3rem] glass-card-hover flex flex-col gap-6 sm:gap-8"
            >
              <div className={cn(
                "w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-500 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-500 overflow-hidden",
                res.title === 'JiveX' && "bg-slate-900 group-hover:bg-slate-800"
              )}>
                {res.logo ? (
                  <img 
                    src={res.logo} 
                    alt={res.title} 
                    className={cn(
                      "w-8 h-8 sm:w-10 sm:h-10 object-contain transition-all",
                      !['JiveX', 'WebMed'].includes(res.title) && "group-hover:brightness-0 group-hover:invert"
                    )} 
                    referrerPolicy="no-referrer" 
                  />
                ) : (
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8" />
                )}
              </div>
              <div>
                <h4 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors duration-300">{res.title}</h4>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{res.description}</p>
              </div>
              <div className="mt-auto pt-6 sm:pt-8 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600 group-hover:text-blue-400 transition-colors">პლატფორმაზე გადასვლა</span>
                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-slate-700 group-hover:text-blue-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500" />
              </div>
            </motion.a>
          );
        })}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-32 glass-card rounded-[3rem] border-dashed border-white/10">
          <div className="w-20 h-20 bg-white/[0.03] rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-8 h-8 text-slate-700" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">რესურსები ვერ მოიძებნა</h3>
          <p className="text-sm text-slate-500 font-medium uppercase tracking-widest">სცადეთ სხვა საძიებო სიტყვა</p>
        </div>
      )}
    </div>
  );
}
