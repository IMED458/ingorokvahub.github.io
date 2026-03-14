import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Bell, Plus } from 'lucide-react';
import { AddNewsModal } from './components/AddNewsModal';
import { NewsDetailModal } from './components/NewsDetailModal';
import { Sidebar } from './components/Sidebar';
import { useAuth } from './context/AuthContext';
import { NEWS } from './constants';
import { Dashboard } from './pages/Dashboard';
import { KnowledgeHub } from './pages/KnowledgeHub';
import { DoctorsDirectory } from './pages/DoctorsDirectory';
import { PatientFlow } from './pages/PatientFlow';
import { NewsPage } from './pages/NewsPage';
import { LoginPage } from './pages/LoginPage';
import { Resources } from './pages/Resources';
import type { NewsItem } from './types';

const CUSTOM_NEWS_STORAGE_KEY = 'medhub_news';

function getSavedCustomNews(): NewsItem[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const saved = window.localStorage.getItem(CUSTOM_NEWS_STORAGE_KEY);
    if (!saved) {
      return [];
    }

    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (item): item is NewsItem =>
        typeof item?.id === 'string' &&
        typeof item?.title === 'string' &&
        typeof item?.date === 'string' &&
        typeof item?.category === 'string' &&
        typeof item?.summary === 'string',
    );
  } catch {
    return [];
  }
}

function getNewsTimestamp(item: NewsItem) {
  if (typeof item.createdAt === 'number') {
    return item.createdAt;
  }

  const parsed = Date.parse(item.date);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function sortNews(items: NewsItem[]) {
  return [...items].sort((left, right) => getNewsTimestamp(right) - getNewsTimestamp(left));
}

export default function App() {
  const { isAuthenticated, role } = useAuth();
  const [now, setNow] = React.useState(() => new Date());
  const [isAddNewsOpen, setIsAddNewsOpen] = React.useState(false);
  const [customNews, setCustomNews] = React.useState<NewsItem[]>(getSavedCustomNews);
  const [selectedNews, setSelectedNews] = React.useState<NewsItem | null>(null);

  React.useEffect(() => {
    window.localStorage.setItem(CUSTOM_NEWS_STORAGE_KEY, JSON.stringify(customNews));
  }, [customNews]);

  React.useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  React.useEffect(() => {
    if (role !== 'admin') {
      setIsAddNewsOpen(false);
    }
  }, [role]);

  React.useEffect(() => {
    if (!isAuthenticated) {
      setSelectedNews(null);
    }
  }, [isAuthenticated]);

  const news = React.useMemo(() => sortNews([...NEWS, ...customNews]), [customNews]);

  const handleAddNews = React.useCallback((item: NewsItem) => {
    setCustomNews((current) => sortNews([item, ...current]));
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

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <HashRouter>
      <div className="min-h-screen flex bg-[#F8FAFC] font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900 relative overflow-x-hidden">
        {/* Background Mesh Gradients */}
        <div className="fixed inset-0 bg-mesh pointer-events-none" />
        
        <Sidebar />
        
        <main className="w-full min-w-0 min-h-screen relative lg:pl-[19rem]">
          <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-8 xl:px-12 py-4 sm:py-12">
            <header className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-8 sm:mb-12 pt-16 lg:pt-0 min-w-0">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(59,130,246,0.2)] animate-pulse" />
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]">Secure Network</p>
                </div>
                <h2 className="text-xs font-mono text-slate-400">Node: <span className="text-slate-900 font-bold">TBS-01</span> / Status: <span className="text-emerald-600 font-bold">Operational</span></h2>
              </div>
              <div className="flex items-center justify-between xl:justify-end gap-4 sm:gap-6 flex-wrap min-w-0">
                {role === 'admin' && (
                  <button
                    onClick={() => setIsAddNewsOpen(true)}
                    className="px-5 py-3 rounded-2xl bg-blue-600 text-white text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    სიახლის დამატება
                  </button>
                )}
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
              <Route
                path="/"
                element={<Dashboard news={news} onOpenNews={setSelectedNews} />}
              />
              <Route path="/knowledge" element={<KnowledgeHub />} />
              <Route path="/patient-flow" element={<PatientFlow />} />
              <Route path="/doctors" element={<DoctorsDirectory />} />
              <Route path="/resources" element={<Resources />} />
              <Route
                path="/news"
                element={
                  <NewsPage
                    news={news}
                    canAddNews={role === 'admin'}
                    onOpenAddNews={() => setIsAddNewsOpen(true)}
                    onOpenNews={setSelectedNews}
                  />
                }
              />
            </Routes>
          </div>
        </main>

        <AddNewsModal
          isOpen={isAddNewsOpen}
          onClose={() => setIsAddNewsOpen(false)}
          onAdd={handleAddNews}
        />

        <NewsDetailModal item={selectedNews} onClose={() => setSelectedNews(null)} />
      </div>
    </HashRouter>
  );
}
