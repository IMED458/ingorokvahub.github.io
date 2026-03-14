import React from 'react';
import { motion } from 'motion/react';
import { Search, Phone, Mail, Building2, ChevronRight, User } from 'lucide-react';
import { DOCTORS } from '../constants';
import { cn } from '../lib/utils';

export function DoctorsDirectory() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeDept, setActiveDept] = React.useState('ყველა');

  const departments = ['ყველა', ...new Set(DOCTORS.map(d => d.department))];

  const filteredDoctors = DOCTORS.filter(doc => {
    const matchesDept = activeDept === 'ყველა' || doc.department === activeDept;
    const fullName = `${doc.name} ${doc.surname}`.toLowerCase();
    const matchesSearch = fullName.includes(searchQuery.toLowerCase()) || 
                         doc.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-6 w-1 bg-blue-600 rounded-full" />
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">პერსონალი</h3>
          </div>
          <h2 className="text-3xl font-bold text-slate-900">ექიმების დირექტორია</h2>
        </div>
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
          <input 
            type="text" 
            placeholder="ძიება სახელით ან სპეციალობით..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl w-full md:w-96 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 shadow-sm transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar">
        {departments.map(dept => (
          <button
            key={dept}
            onClick={() => setActiveDept(dept)}
            className={cn(
              "px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all border",
              activeDept === dept 
                ? "bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-900/10" 
                : "bg-white text-slate-500 border-slate-200 hover:border-blue-300 hover:text-blue-600"
            )}
          >
            {dept}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDoctors.map((doc, idx) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden hover:shadow-2xl hover:shadow-blue-500/5 hover:border-blue-200 transition-all group"
          >
            <div className="p-8">
              <div className="flex items-center gap-5 mb-8">
                <div className="relative">
                  <div className="w-20 h-20 rounded-3xl overflow-hidden border-2 border-slate-100 group-hover:border-blue-200 transition-colors">
                    <img 
                      src={doc.image} 
                      alt={doc.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full shadow-sm" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 leading-tight mb-1">
                    {doc.name} {doc.surname}
                  </h3>
                  <p className="text-blue-600 text-xs font-bold uppercase tracking-widest">{doc.specialty}</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4 text-sm text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <Building2 className="w-4 h-4 text-slate-400" />
                  <span className="font-medium">{doc.department}</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">შიდა ნომერი</span>
                    <span className="font-mono font-bold text-slate-900">{doc.internalPhone}</span>
                  </div>
                  <div className="flex flex-col gap-1 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">სტატუსი</span>
                    <span className="text-[10px] font-bold text-emerald-600 uppercase">Active</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="flex-1 bg-white text-slate-900 border border-slate-200 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                  <User className="w-4 h-4" />
                  პროფილი
                </button>
                <button className="flex-1 bg-slate-900 text-white py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10">
                  დაკავშირება
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
