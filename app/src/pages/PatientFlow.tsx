import React from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  Info, 
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { RESOURCES } from '../constants';
import { ResourceIcon } from '../components/ResourceIcon';

export function PatientFlow() {
  const workflowResources = RESOURCES.filter((resource) =>
    ['home-prescription', 'inpatient-prescription', 'patient-turnover', 'er-order-set', 'calculators'].includes(resource.id),
  );
  const documentationResources = RESOURCES.filter((resource) =>
    ['knowledge-hub', 'templates-forms'].includes(resource.id),
  );

  return (
    <div className="space-y-8 sm:space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-6 w-1 bg-blue-600 rounded-full" />
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">პროტოკოლები</h3>
          </div>
          <h2 className="text-3xl font-bold text-slate-900">პაციენტთან ბრუნვა</h2>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {workflowResources.map((resource, idx) => (
          <motion.a
            key={resource.id}
            href={resource.url}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group rounded-[2.5rem] border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-500/5 sm:p-8"
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-transform group-hover:scale-105">
                <ResourceIcon name={resource.icon} className="h-7 w-7" />
              </div>
              <span className="rounded-xl bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-600">
                {resource.access}
              </span>
            </div>
            <h3 className="mb-3 text-xl font-bold text-slate-900">{resource.title}</h3>
            <p className="mb-5 text-sm leading-relaxed text-slate-500">{resource.description}</p>
            {resource.note && (
              <p className="rounded-2xl bg-slate-50 px-4 py-3 text-xs leading-relaxed text-slate-500">
                {resource.note}
              </p>
            )}
            <div className="mt-5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-blue-600">
              გახსნა <ExternalLink className="h-3 w-3" />
            </div>
          </motion.a>
        ))}
      </div>

      <div className="grid xl:grid-cols-12 gap-8 lg:gap-10">
        <section className="xl:col-span-7 bg-white p-6 sm:p-10 rounded-[3rem] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-3">
              <FileText className="w-5 h-5 text-blue-600" />
              დოკუმენტები და ცოდნის წყაროები
            </h3>
          </div>
          <div className="space-y-4">
            {documentationResources.map((resource) => (
              <a
                key={resource.id}
                href={resource.url}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-4 rounded-3xl border border-transparent bg-slate-50 p-5 transition-all hover:border-blue-200 hover:bg-white sm:p-6"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-blue-600 border border-slate-200">
                    <ResourceIcon name={resource.icon} className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{resource.access}</span>
                    <p className="mt-1 text-sm font-bold text-slate-700">{resource.title}</p>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 flex-shrink-0 text-slate-300 transition-colors group-hover:text-blue-600" />
              </a>
            ))}
          </div>
        </section>

        <section className="xl:col-span-5 bg-slate-950 text-white p-6 sm:p-10 rounded-[3rem] shadow-2xl shadow-slate-950/20 relative overflow-hidden">
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
