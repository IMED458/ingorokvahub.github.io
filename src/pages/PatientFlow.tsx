import React from 'react';
import { motion } from 'motion/react';
import { 
  ClipboardCheck, 
  MessageSquare, 
  RefreshCw, 
  FileText, 
  Info, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

const flowSections = [
  {
    title: 'ამბულატორიული პაციენტი',
    description: 'მიღების, რეგისტრაციისა და კონსულტაციის სტანდარტები.',
    icon: ClipboardCheck,
    color: 'text-blue-600',
    bg: 'bg-blue-50'
  },
  {
    title: 'სტაციონარული პაციენტი',
    description: 'ჰოსპიტალიზაციის, მართვისა და გაწერის პროტოკოლები.',
    icon: RefreshCw,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50'
  },
  {
    title: 'კომუნიკაციის სტანდარტი',
    description: 'პაციენტთან და ახლობლებთან ურთიერთობის ეთიკა და წესები.',
    icon: MessageSquare,
    color: 'text-purple-600',
    bg: 'bg-purple-50'
  }
];

const templates = [
  'გაწერის შემდგომი რეკომენდაციები',
  'ოპერაციისწინა ინფორმირებული თანხმობა',
  'ქრონიკული პაციენტის მართვის გეგმა',
  'ლაბორატორიული კვლევების განმარტება'
];

export function PatientFlow() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-6 w-1 bg-blue-600 rounded-full" />
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">პროტოკოლები</h3>
          </div>
          <h2 className="text-3xl font-bold text-slate-900">პაციენტთან ბრუნვა</h2>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {flowSections.map((section, idx) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-2xl hover:shadow-blue-500/5 hover:border-blue-200 transition-all group"
          >
            <div className={`${section.bg} ${section.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <section.icon className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{section.title}</h3>
            <p className="text-sm text-slate-500 mb-8 leading-relaxed">{section.description}</p>
            <button className="text-[10px] font-bold uppercase tracking-widest text-blue-600 flex items-center gap-2 hover:underline">
              დეტალურად ნახვა <ArrowRight className="w-3 h-3" />
            </button>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
        <section className="lg:col-span-7 bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-3">
              <FileText className="w-5 h-5 text-blue-600" />
              შაბლონები და ფორმები
            </h3>
          </div>
          <div className="space-y-4">
            {templates.map((t) => (
              <div key={t} className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl hover:bg-white hover:border-blue-200 border border-transparent transition-all cursor-pointer group">
                <span className="text-sm font-bold text-slate-700">{t}</span>
                <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                  <button className="text-[10px] font-bold uppercase tracking-widest text-blue-600 hover:text-blue-800">ჩამოტვირთვა</button>
                  <button className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900">კოპირება</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="lg:col-span-5 bg-slate-950 text-white p-10 rounded-[3rem] shadow-2xl shadow-slate-950/20 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-lg font-bold mb-8 flex items-center gap-3">
              <Info className="w-5 h-5 text-blue-400" />
              მნიშვნელოვანი ინსტრუქციები
            </h3>
            <ul className="space-y-6">
              {[
                'პაციენტის იდენტიფიკაციის წესი ყოველ მანიპულაციამდე',
                'კრიტიკული ლაბორატორიული მაჩვენებლების შეტყობინების დრო',
                'გაწერის შემდგომი ზარის (Follow-up call) განხორციელების ვადები',
                'პაციენტის კმაყოფილების კითხვარის შევსების წახალისება'
              ].map((item) => (
                <li key={item} className="flex items-start gap-4 text-sm text-slate-400 group">
                  <div className="mt-1 w-5 h-5 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 transition-colors">
                    <CheckCircle2 className="w-3 h-3 text-blue-400 group-hover:text-white transition-colors" />
                  </div>
                  <span className="group-hover:text-white transition-colors leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-10" />
        </section>
      </div>
    </div>
  );
}
