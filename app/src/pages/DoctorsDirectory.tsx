import React from 'react';
import { motion } from 'motion/react';
import { Copy, ExternalLink, Phone, Search, UserRound } from 'lucide-react';
import { PHONE_DIRECTORY_URL } from '../constants';
import { directoryDoctors, directoryDoctorsMeta } from '../data/generated/doctors';
import { cn } from '../lib/utils';

function getInitials(fullName: string) {
  return fullName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

function sanitizePhone(phone: string) {
  return phone.replace(/\D/g, '');
}

export function DoctorsDirectory() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeDept, setActiveDept] = React.useState('ყველა');
  const [copiedDoctorId, setCopiedDoctorId] = React.useState<string | null>(null);

  const departments = ['ყველა', ...new Set(directoryDoctors.map((doctor) => doctor.department))];
  const departmentCount = departments.length - 1;
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const syncedAtLabel = new Date(directoryDoctorsMeta.syncedAt).toLocaleString('ka-GE');

  const filteredDoctors = directoryDoctors.filter((doctor) => {
    const matchesDept = activeDept === 'ყველა' || doctor.department === activeDept;
    const matchesSearch = normalizedQuery.length === 0 || doctor.searchText.includes(normalizedQuery);
    return matchesDept && matchesSearch;
  });

  const handleCopyPhone = async (doctorId: string, phone: string) => {
    await navigator.clipboard.writeText(phone);
    setCopiedDoctorId(doctorId);
    window.setTimeout(() => setCopiedDoctorId(null), 1800);
  };

  return (
    <div className="space-y-12">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="h-8 w-1.5 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.2)]" />
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">პერსონალი</h3>
          </div>
          <h2 className="text-4xl font-extrabold text-gradient tracking-tight">ექიმების დირექტორია</h2>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto">
          <div className="relative group w-full sm:w-auto">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
            <input
              type="text"
              placeholder="ძიება სახელით, სპეციალობით ან ნომრით..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="pl-14 pr-8 py-5 glass-card rounded-[2rem] w-full md:w-96 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all text-sm font-medium"
            />
          </div>

          <a
            href={PHONE_DIRECTORY_URL}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto justify-center flex items-center gap-3 px-8 py-5 bg-blue-600 text-white rounded-[2rem] hover:bg-blue-700 transition-all font-bold text-xs uppercase tracking-widest shadow-lg shadow-blue-500/20"
          >
            phone ბაზა
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="glass-card rounded-[2.5rem] p-6 sm:p-8 flex flex-col xl:flex-row xl:items-center gap-6 xl:gap-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
            <UserRound className="w-7 h-7" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">მონაცემის წყარო</p>
            <h3 className="text-lg font-bold text-slate-900 break-anywhere">phone.imed.com.ge-ის გაერთიანებული დირექტორია</h3>
          </div>
        </div>
        <div className="flex-1 grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          <div className="rounded-2xl bg-slate-50 px-4 py-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">ჩანაწერები</p>
            <p className="mt-1 text-xl font-black text-slate-900">{directoryDoctorsMeta.doctorCount}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 px-4 py-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">განყოფილებები</p>
            <p className="mt-1 text-xl font-black text-slate-900">{departmentCount}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 px-4 py-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">განახლდა</p>
            <p className="mt-1 text-sm font-bold text-slate-900">{syncedAtLabel}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar">
        {departments.map((department) => (
          <button
            key={department}
            onClick={() => setActiveDept(department)}
            className={cn(
              'px-8 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all duration-500 border',
              activeDept === department
                ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20'
                : 'glass-card text-slate-500 hover:text-slate-900 border-slate-100',
            )}
          >
            {department}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-6 xl:gap-7">
        {filteredDoctors.map((doctor, index) => (
          <motion.article
            key={doctor.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.03 }}
            className="glass-card rounded-[2.5rem] overflow-hidden glass-card-hover group"
          >
            <div className="p-6 sm:p-7">
              <div className="flex items-start gap-4 sm:gap-5 mb-6 min-w-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[2rem] bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xl sm:text-2xl font-black shadow-lg shadow-blue-500/20 shrink-0">
                  {getInitials(doctor.fullName)}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug mb-3 group-hover:text-blue-600 transition-colors break-anywhere">
                    {doctor.fullName}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-blue-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-600">
                      {doctor.specialty}
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                      {doctor.department}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-4">
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">ტელეფონის ნომერი</p>
                  <a
                    href={`tel:${sanitizePhone(doctor.phone)}`}
                    className="mt-2 inline-flex flex-wrap items-center gap-3 text-base sm:text-lg font-black text-slate-900 hover:text-blue-600 transition-colors break-anywhere"
                  >
                    <Phone className="w-4 h-4" />
                    {doctor.phone}
                  </a>
                </div>

                {doctor.comment && (
                  <div className="rounded-2xl border border-blue-100 bg-blue-50/70 px-4 py-4">
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-blue-500">კომენტარი</p>
                    <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700 break-anywhere">{doctor.comment}</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-stretch gap-3">
                <a
                  href={`tel:${sanitizePhone(doctor.phone)}`}
                  className="flex-1 bg-blue-600 text-white py-4 rounded-2xl text-[10px] font-bold uppercase tracking-[0.18em] hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
                >
                  დარეკვა
                  <Phone className="w-4 h-4" />
                </a>
                <button
                  type="button"
                  onClick={() => void handleCopyPhone(doctor.id, doctor.phone)}
                  className="flex-1 bg-slate-50 text-slate-500 border border-slate-100 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-[0.18em] hover:bg-slate-100 hover:text-slate-900 transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  {copiedDoctorId === doctor.id ? 'დაკოპირდა' : 'კოპირება'}
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="text-center py-32 glass-card rounded-[3rem] border-dashed border-slate-200">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-8 h-8 text-slate-300" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">ექიმები ვერ მოიძებნა</h3>
          <p className="text-sm text-slate-400 font-medium uppercase tracking-widest">სცადეთ სხვა საძიებო სიტყვა ან განყოფილება</p>
        </div>
      )}
    </div>
  );
}
