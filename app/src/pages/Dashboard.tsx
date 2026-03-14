import { motion } from 'motion/react';
import { 
  BookOpen, 
  Stethoscope, 
  Users, 
  Link as LinkIcon, 
  Newspaper, 
  ArrowRight,
  Clock,
  ExternalLink,
  Phone,
  Zap,
  Activity,
  ShieldCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { NEWS, RESOURCES } from '../constants';
import { ResourceIcon } from '../components/ResourceIcon';

const quickActions = [
  { title: 'ცოდნის პლატფორმა', icon: BookOpen, to: '/knowledge', color: 'text-blue-600', bg: 'bg-blue-50' },
  { title: 'პაციენტთან ბრუნვა', icon: Stethoscope, to: '/patient-flow', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { title: 'კონტაქტები', icon: Users, to: '/doctors', color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { title: 'შიდა რესურსები', icon: LinkIcon, to: '/resources', color: 'text-amber-600', bg: 'bg-amber-50' },
  { title: 'სიახლეები', icon: Newspaper, to: '/news', color: 'text-sky-600', bg: 'bg-sky-50' },
];

export function Dashboard() {
  const featuredPlatforms = RESOURCES.filter((resource) => resource.featured);
  const secondaryResources = RESOURCES.filter((resource) => !resource.featured).slice(0, 4);

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Hero Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 sm:gap-6">
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-5">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Cases</p>
            <h4 className="text-2xl font-bold font-mono">142</h4>
          </div>
        </div>
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">System Security</p>
            <h4 className="text-2xl font-bold font-mono">100%</h4>
          </div>
        </div>
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-5 sm:col-span-2 xl:col-span-1">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Response Time</p>
            <h4 className="text-2xl font-bold font-mono">1.2s</h4>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid xl:grid-cols-12 gap-8 lg:gap-10">
        <div className="xl:col-span-8 space-y-8 sm:space-y-10">
          {/* Quick Actions */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-6 w-1 bg-blue-600 rounded-full" />
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">სწრაფი წვდომა</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {quickActions.map((action, idx) => (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link 
                    to={action.to}
                    className="group bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/5 transition-all flex flex-col items-start gap-4 h-full"
                  >
                    <div className={`${action.bg} ${action.color} p-3 rounded-2xl group-hover:scale-110 transition-transform`}>
                      <action.icon className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-bold text-slate-900">
                      {action.title}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>

          <section>
            <div className="mb-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-6 w-1 rounded-full bg-blue-600" />
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">ჩაშენებული პლატფორმები</h3>
              </div>
              <Link to="/resources" className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-blue-600 hover:underline">
                ყველას ნახვა <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {featuredPlatforms.map((resource, idx) => (
                <motion.a
                  key={resource.id}
                  href={resource.url}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  className="group flex h-full flex-col rounded-[2rem] border border-slate-200 bg-white p-5 sm:p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-500/5"
                >
                  <div className="mb-5 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                        <ResourceIcon name={resource.icon} className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">{resource.access}</p>
                        <h4 className="mt-1 text-base font-bold text-slate-900">{resource.title}</h4>
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 flex-shrink-0 text-slate-300 transition-colors group-hover:text-blue-600" />
                  </div>
                  <p className="mb-4 text-sm leading-relaxed text-slate-500">{resource.description}</p>
                  {resource.note && (
                    <p className="mt-auto rounded-2xl bg-slate-50 px-4 py-3 text-xs leading-relaxed text-slate-500">
                      {resource.note}
                    </p>
                  )}
                </motion.a>
              ))}
            </div>
          </section>

          {/* News Feed */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="h-6 w-1 bg-blue-600 rounded-full" />
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">ბოლო განახლებები</h3>
              </div>
              <Link to="/news" className="text-[10px] font-bold text-blue-600 uppercase tracking-widest hover:underline flex items-center gap-1">
                ყველას ნახვა <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="grid gap-4">
              {NEWS.map((item) => (
                <div key={item.id} className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 flex items-center gap-4 sm:gap-6 group hover:border-blue-200 transition-colors">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{item.category}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{item.date}</span>
                    </div>
                    <h4 className="font-bold text-slate-900">{item.title}</h4>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="xl:col-span-4 space-y-8 sm:space-y-10">
          {/* Resources */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-6 w-1 bg-blue-600 rounded-full" />
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">დამატებითი სისტემები</h3>
            </div>
            <div className="space-y-3">
              {secondaryResources.map((res) => (
                <a 
                  key={res.id}
                  href={res.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-5 bg-white rounded-3xl border border-slate-200 hover:border-blue-500 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                    <ResourceIcon name={res.icon} className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{res.title}</h4>
                    <p className="text-[10px] text-slate-400">{res.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Hotline */}
          <section className="bg-slate-950 text-white p-7 sm:p-8 rounded-[2.5rem] relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-blue-400 mb-6 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                ცხელი ხაზი
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">მიღება</span>
                  <span className="font-mono text-lg font-bold">100</span>
                </div>
                <div className="h-[1px] bg-slate-900" />
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">რეანიმაცია</span>
                  <span className="font-mono text-lg font-bold">205</span>
                </div>
                <div className="h-[1px] bg-slate-900" />
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">IT მხარდაჭერა</span>
                  <span className="font-mono text-lg font-bold">911</span>
                </div>
              </div>
            </div>
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-600 rounded-full blur-[80px] opacity-20" />
          </section>
        </div>
      </div>
    </div>
  );
}
