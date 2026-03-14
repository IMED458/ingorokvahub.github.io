import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { KnowledgeHub } from './pages/KnowledgeHub';
import { DoctorsDirectory } from './pages/DoctorsDirectory';
import { PatientFlow } from './pages/PatientFlow';
import { NewsPage } from './pages/NewsPage';
import { Resources } from './pages/Resources';
import { Bell } from 'lucide-react';

export default function App() {
  const [now, setNow] = React.useState(() => new Date());

  React.useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const currentDate = now.toLocaleDateString('ka-GE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Tbilisi',
  });
  const currentTime = now.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Asia/Tbilisi',
  });

  return (
    <HashRouter>
      <div className="min-h-screen flex bg-[#F8FAFC] font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900 relative overflow-hidden">
        {/* Background Mesh Gradients */}
        <div className="fixed inset-0 bg-mesh pointer-events-none" />
        
        <Sidebar />
        
        <main className="flex-1 lg:ml-80 min-h-screen relative">
          <div className="relative z-10 p-4 sm:p-12 max-w-7xl mx-auto">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 sm:mb-12 pt-16 lg:pt-0">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(59,130,246,0.2)] animate-pulse" />
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]">Secure Network</p>
                </div>
                <h2 className="text-xs font-mono text-slate-400">Node: <span className="text-slate-900 font-bold">TBS-01</span> / Status: <span className="text-emerald-600 font-bold">Operational</span></h2>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-6">
                <div className="text-left sm:text-right">
                  <p className="text-xs font-bold text-slate-900">{currentDate}</p>
                  <p className="text-[10px] text-slate-400 font-mono tracking-tighter uppercase">{currentTime} Tbilisi</p>
                </div>
                <div className="h-8 w-[1px] bg-slate-200" />
                <button className="p-3 glass-card rounded-2xl text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all relative group">
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
              <Route path="/resources" element={<Resources />} />
              <Route path="/news" element={<NewsPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </HashRouter>
  );
}
