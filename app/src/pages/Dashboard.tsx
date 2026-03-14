import { motion } from 'motion/react';
import { 
  BookOpen, 
  Stethoscope, 
  Users, 
  Link as LinkIcon, 
  Newspaper, 
  ArrowRight,
  Bell,
  Clock,
  ExternalLink,
  Phone,
  Zap,
  Activity,
  ShieldCheck,
  Calculator,
  Home,
  FileText,
  RefreshCw,
  ClipboardList,
  Database,
  Beaker,
  Files
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { RESOURCES } from '../constants';
import { cn } from '../lib/utils';
import type { NewsItem } from '../types';

const quickActions = [
  { title: 'ცოდნის პლატფორმა', icon: BookOpen, to: '/knowledge', color: 'text-blue-600', bg: 'bg-blue-50' },
  { title: 'პაციენტთან ბრუნვა', icon: Stethoscope, to: '/patient-flow', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { title: 'კონტაქტები', icon: Users, to: '/doctors', color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { title: 'შიდა რესურსები', icon: LinkIcon, to: '/resources', color: 'text-amber-600', bg: 'bg-amber-50' },
  { title: 'სიახლეები', icon: Newspaper, to: '/news', color: 'text-sky-600', bg: 'bg-sky-50' },
];

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
  Files
};

interface DashboardProps {
  news: NewsItem[];
  onOpenNews: (item: NewsItem) => void;
}

export function Dashboard({ news, onOpenNews }: DashboardProps) {
  return (
    <div className="space-y-12">
      {/* Main Grid */}
      <div className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-12">
          {/* Work Platforms Grid */}
          <section>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-8 w-1.5 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.2)]" />
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">სამუშაო პლატფორმები</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {RESOURCES.map((res, idx) => {
                const Icon = iconMap[res.icon] || ExternalLink;
                return (
                  <motion.a
                    key={res.id}
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.03 }}
                    className="group glass-card p-7 rounded-[2.5rem] glass-card-hover flex flex-col gap-5"
                  >
                    <div className={cn(
                      "w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-500 overflow-hidden",
                      res.title === 'JiveX' && "bg-slate-900 group-hover:bg-slate-800"
                    )}>
                      {res.logo ? (
                        <img 
                          src={res.logo} 
                          alt={res.title} 
                          className={cn(
                            "w-8 h-8 object-contain transition-all",
                            !['JiveX', 'WebMed'].includes(res.title) && "group-hover:brightness-0 group-hover:invert"
                          )} 
                          referrerPolicy="no-referrer" 
                        />
                      ) : (
                        <Icon className="w-7 h-7" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">{res.title}</h4>
                      <p className="text-[10px] text-slate-500 leading-relaxed font-medium">{res.description}</p>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </section>

          {/* News Feed */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="h-8 w-1.5 bg-gradient-to-b from-emerald-500 to-teal-600 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.2)]" />
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">ბოლო განახლებები</h3>
              </div>
              <Link to="/news" className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em] hover:text-blue-700 transition-colors flex items-center gap-2">
                ყველას ნახვა <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="grid gap-5">
              {news.slice(0, 4).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onOpenNews(item)}
                  className="w-full text-left glass-card p-5 sm:p-7 rounded-[2.5rem] flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 group glass-card-hover cursor-pointer"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all duration-500 shrink-0">
                    <Clock className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em]">{item.category}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{item.date}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-base sm:text-lg group-hover:text-blue-600 transition-colors">{item.title}</h4>
                  </div>
                  <ArrowRight className="hidden sm:block w-6 h-6 text-slate-200 group-hover:text-blue-600 group-hover:translate-x-2 transition-all duration-500" />
                </button>
              ))}
            </div>
            {news.length === 0 && (
              <div className="glass-card p-10 rounded-[2.5rem] text-center">
                <p className="text-sm font-semibold text-slate-500">სიახლეები ჯერ არ დამატებულა</p>
              </div>
            )}
          </section>
        </div>

        <div className="lg:col-span-4 space-y-12">
          {/* Quick Actions */}
          <section>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-8 w-1.5 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.2)]" />
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">ნავიგაცია</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {quickActions.map((action) => (
                <Link 
                  key={action.title}
                  to={action.to}
                  className="flex items-center gap-5 p-5 glass-card rounded-3xl glass-card-hover group"
                >
                  <div className={`p-3 rounded-2xl ${action.bg} ${action.color} group-hover:scale-110 transition-transform duration-500`}>
                    <action.icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900 transition-colors break-anywhere">{action.title}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Hotline */}
          <section className="glass-card p-6 sm:p-10 rounded-[3rem] relative overflow-hidden border-blue-100">
            <div className="relative z-10">
              <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-blue-600 mb-6 sm:mb-8 flex items-center gap-3">
                <Phone className="w-5 h-5" />
                ცხელი ხაზი
              </h3>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex justify-between items-center group">
                  <span className="text-xs text-slate-400 font-semibold group-hover:text-slate-600 transition-colors">მიღება</span>
                  <span className="font-mono text-lg sm:text-xl font-black text-slate-900">100</span>
                </div>
                <div className="h-[1px] bg-slate-100" />
                <div className="flex justify-between items-center group">
                  <span className="text-xs text-slate-400 font-semibold group-hover:text-slate-600 transition-colors">რეანიმაცია</span>
                  <span className="font-mono text-lg sm:text-xl font-black text-slate-900">205</span>
                </div>
                <div className="h-[1px] bg-slate-100" />
                <div className="flex justify-between items-center group">
                  <span className="text-xs text-slate-400 font-semibold group-hover:text-slate-600 transition-colors">IT მხარდაჭერა</span>
                  <span className="font-mono text-lg sm:text-xl font-black text-slate-900">911</span>
                </div>
              </div>
            </div>
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-blue-500 rounded-full blur-[100px] opacity-10 animate-pulse" />
          </section>
        </div>
      </div>
    </div>
  );
}
