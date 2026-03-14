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
  ShieldCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { NEWS, RESOURCES } from '../constants';

const quickActions = [
  { title: 'ცოდნის პლატფორმა', icon: BookOpen, to: '/knowledge', color: 'text-blue-600', bg: 'bg-blue-50' },
  { title: 'პაციენტთან ბრუნვა', icon: Stethoscope, to: '/patient-flow', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { title: 'კონტაქტები', icon: Users, to: '/doctors', color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { title: 'შიდა რესურსები', icon: LinkIcon, to: '/resources', color: 'text-amber-600', bg: 'bg-amber-50' },
  { title: 'სიახლეები', icon: Newspaper, to: '/news', color: 'text-sky-600', bg: 'bg-sky-50' },
];

export function Dashboard() {
  return (
    <div className="space-y-10">
      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-5">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Cases</p>
            <h4 className="text-2xl font-bold font-mono">142</h4>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">System Security</p>
            <h4 className="text-2xl font-bold font-mono">100%</h4>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-5">
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
      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10">
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
                    className="group bg-white p-6 rounded-3xl border border-slate-200 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/5 transition-all flex flex-col items-start gap-4"
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
                <div key={item.id} className="bg-white p-6 rounded-3xl border border-slate-200 flex items-center gap-6 group hover:border-blue-200 transition-colors">
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

        <div className="lg:col-span-4 space-y-10">
          {/* Resources */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-6 w-1 bg-blue-600 rounded-full" />
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">რესურსები</h3>
            </div>
            <div className="space-y-3">
              {RESOURCES.map((res) => (
                <a 
                  key={res.id}
                  href={res.url}
                  className="flex items-center gap-4 p-5 bg-white rounded-3xl border border-slate-200 hover:border-blue-500 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                    <ExternalLink className="w-5 h-5" />
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
          <section className="bg-slate-950 text-white p-8 rounded-[2.5rem] relative overflow-hidden">
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
