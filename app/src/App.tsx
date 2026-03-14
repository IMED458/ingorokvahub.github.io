import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { KnowledgeHub } from './pages/KnowledgeHub';
import { DoctorsDirectory } from './pages/DoctorsDirectory';
import { PatientFlow } from './pages/PatientFlow';
import { NewsPage } from './pages/NewsPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { Bell, Menu } from 'lucide-react';

function AppShell() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [now, setNow] = React.useState(() => new Date());
  const location = useLocation();

  React.useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  React.useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  const currentDate = now.toLocaleDateString('ka-GE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const currentTime = now.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      {isSidebarOpen && (
        <button
          type="button"
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm lg:hidden"
          aria-label="ნავიგაციის დახურვა"
        />
      )}
      <main className="flex-1 min-h-screen relative lg:ml-72">
          <div className="absolute inset-0 grid-lines pointer-events-none opacity-40" />
          <div className="relative z-10 mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:p-12">
            <header className="mb-8 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-center sm:justify-between lg:mb-12">
              <div className="flex items-start gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={() => setIsSidebarOpen(true)}
                  className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500 shadow-sm transition-all hover:border-blue-200 hover:text-blue-600 lg:hidden"
                  aria-label="ნავიგაციის გახსნა"
                >
                  <Menu className="h-5 w-5" />
                </button>
                <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]">Internal Network</p>
                </div>
                <h2 className="text-xs font-mono text-slate-400">Node: <span className="text-slate-900 font-bold">TBS-01</span> / Status: <span className="text-emerald-500 font-bold">Active</span></h2>
              </div>
              </div>
              <div className="flex items-center justify-between gap-4 sm:justify-end sm:gap-6">
                <div className="text-left sm:text-right">
                  <p className="text-xs font-bold text-slate-900">{currentDate}</p>
                  <p className="text-[10px] text-slate-400 font-mono tracking-tighter uppercase">{currentTime} Tbilisi</p>
                </div>
                <div className="hidden h-8 w-[1px] bg-slate-200 sm:block" />
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
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/news" element={<NewsPage />} />
            </Routes>
          </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppShell />
    </HashRouter>
  );
}
