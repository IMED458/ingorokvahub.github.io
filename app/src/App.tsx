import { HashRouter, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { KnowledgeHub } from './pages/KnowledgeHub';
import { DoctorsDirectory } from './pages/DoctorsDirectory';
import { PatientFlow } from './pages/PatientFlow';
import { NewsPage } from './pages/NewsPage';
import { Bell } from 'lucide-react';

// Placeholder components for other routes
const Placeholder = ({ title }: { title: string }) => (
  <div className="py-32 text-center bg-white rounded-[3rem] border border-slate-200">
    <h2 className="text-2xl font-bold text-slate-900 mb-2">{title}</h2>
    <p className="text-sm text-slate-400 font-medium uppercase tracking-widest">ეს სექცია მალე დაემატება</p>
  </div>
);

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen flex bg-slate-50 font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
        <Sidebar />
        <main className="flex-1 ml-72 min-h-screen relative">
          <div className="absolute inset-0 grid-lines pointer-events-none opacity-40" />
          <div className="relative z-10 p-12 max-w-7xl mx-auto">
            <header className="flex items-center justify-between mb-12">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]">Internal Network</p>
                </div>
                <h2 className="text-xs font-mono text-slate-400">Node: <span className="text-slate-900 font-bold">TBS-01</span> / Status: <span className="text-emerald-500 font-bold">Active</span></h2>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-slate-900">14 მარტი, 2026</p>
                  <p className="text-[10px] text-slate-400 font-mono tracking-tighter uppercase">04:40:34 UTC</p>
                </div>
                <div className="h-8 w-[1px] bg-slate-200" />
                <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-blue-600 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 transition-all relative group">
                  <div className="absolute top-3 right-3 w-2 h-2 bg-rose-500 rounded-full border-2 border-white group-hover:scale-125 transition-transform" />
                  <Bell className="w-5 h-5" />
                </button>
              </div>
            </header>

            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/knowledge" element={<KnowledgeHub />} />
              <Route path="/patient-flow" element={<PatientFlow />} />
              <Route path="/doctors" element={<DoctorsDirectory />} />
              <Route path="/resources" element={<Placeholder title="რესურსები" />} />
              <Route path="/news" element={<NewsPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </HashRouter>
  );
}
