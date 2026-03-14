import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { collection, deleteDoc, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { Bell, Plus } from 'lucide-react';
import { AddNewsModal } from './components/AddNewsModal';
import { NewsDetailModal } from './components/NewsDetailModal';
import { NotificationsModal } from './components/NotificationsModal';
import { Sidebar } from './components/Sidebar';
import { useAuth } from './context/AuthContext';
import { NEWS } from './constants';
import { firestore, enableFirebaseAnalytics } from './lib/firebase';
import {
  getInitialNewsState,
  getLatestNewsTimestamp,
  getNewsTimestamp,
  NEWS_LAST_SEEN_STORAGE_KEY,
  normalizeNewsItem,
  readStoredNumber,
  sortNews,
  writeStoredNews,
  writeStoredNumber,
} from './lib/news';
import { Dashboard } from './pages/Dashboard';
import { KnowledgeHub } from './pages/KnowledgeHub';
import { DoctorsDirectory } from './pages/DoctorsDirectory';
import { PatientFlow } from './pages/PatientFlow';
import { NewsPage } from './pages/NewsPage';
import { LoginPage } from './pages/LoginPage';
import { Resources } from './pages/Resources';
import type { NewsItem } from './types';

const NEWS_COLLECTION = 'news';

function upsertNewsLocally(current: NewsItem[], item: NewsItem) {
  const exists = current.some((entry) => entry.id === item.id);
  if (exists) {
    return sortNews(current.map((entry) => (entry.id === item.id ? item : entry)));
  }

  return sortNews([item, ...current]);
}

export default function App() {
  const { isAuthenticated, role, isLoading } = useAuth();
  const initialNews = React.useMemo(() => getInitialNewsState(NEWS), []);
  const initialNewsRef = React.useRef(initialNews);
  const hasMigratedInitialNewsRef = React.useRef(false);
  const [now, setNow] = React.useState(() => new Date());
  const [isNewsModalOpen, setIsNewsModalOpen] = React.useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = React.useState(false);
  const [editingNews, setEditingNews] = React.useState<NewsItem | null>(null);
  const [news, setNews] = React.useState<NewsItem[]>(initialNews);
  const [lastSeenNewsAt, setLastSeenNewsAt] = React.useState<number | null>(() =>
    readStoredNumber(NEWS_LAST_SEEN_STORAGE_KEY),
  );
  const [selectedNews, setSelectedNews] = React.useState<NewsItem | null>(null);

  React.useEffect(() => {
    writeStoredNews(news);
  }, [news]);

  React.useEffect(() => {
    if (lastSeenNewsAt === null) {
      return;
    }

    writeStoredNumber(NEWS_LAST_SEEN_STORAGE_KEY, lastSeenNewsAt);
  }, [lastSeenNewsAt]);

  React.useEffect(() => {
    void enableFirebaseAnalytics();
  }, []);

  React.useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  React.useEffect(() => {
    const newsCollectionRef = collection(firestore, NEWS_COLLECTION);

    const unsubscribe = onSnapshot(
      newsCollectionRef,
      (snapshot) => {
        const remoteNews = sortNews(
          snapshot.docs.map((snapshotDoc) =>
            normalizeNewsItem({
              id: snapshotDoc.id,
              ...(snapshotDoc.data() as Omit<NewsItem, 'id'>),
            }),
          ),
        );

        if (!hasMigratedInitialNewsRef.current) {
          hasMigratedInitialNewsRef.current = true;

          const remoteIds = new Set(remoteNews.map((item) => item.id));
          const missingLocalNews = initialNewsRef.current
            .map(normalizeNewsItem)
            .filter((item) => !remoteIds.has(item.id));

          if (missingLocalNews.length > 0) {
            void Promise.all(
              missingLocalNews.map((item) => setDoc(doc(newsCollectionRef, item.id), item)),
            ).catch((error) => {
              console.error('Failed to migrate local news to Firebase.', error);
            });

            if (remoteNews.length === 0) {
              setNews(sortNews(missingLocalNews));
              return;
            }
          }
        }

        setNews(remoteNews.length > 0 ? remoteNews : initialNewsRef.current);
      },
      (error) => {
        console.error('Failed to subscribe to Firebase news.', error);
        setNews(getInitialNewsState(NEWS));
      },
    );

    return () => unsubscribe();
  }, []);

  React.useEffect(() => {
    if (role !== 'admin') {
      setIsNewsModalOpen(false);
      setEditingNews(null);
    }
  }, [role]);

  React.useEffect(() => {
    if (!isAuthenticated) {
      setSelectedNews(null);
      setIsNotificationsOpen(false);
    }
  }, [isAuthenticated]);

  React.useEffect(() => {
    if (lastSeenNewsAt !== null || news.length === 0) {
      return;
    }

    setLastSeenNewsAt(getLatestNewsTimestamp(news));
  }, [lastSeenNewsAt, news]);

  React.useEffect(() => {
    if (!selectedNews) {
      return;
    }

    const currentItem = news.find((item) => item.id === selectedNews.id) ?? null;
    if (!currentItem) {
      setSelectedNews(null);
      return;
    }

    if (currentItem !== selectedNews) {
      setSelectedNews(currentItem);
    }
  }, [news, selectedNews]);

  const unreadCount = React.useMemo(() => {
    if (lastSeenNewsAt === null) {
      return 0;
    }

    return news.filter((item) => getNewsTimestamp(item) > lastSeenNewsAt).length;
  }, [lastSeenNewsAt, news]);

  const handleSaveNews = React.useCallback(async (item: NewsItem) => {
    const normalizedItem = normalizeNewsItem(item);

    try {
      await setDoc(doc(firestore, NEWS_COLLECTION, normalizedItem.id), normalizedItem);
    } catch (error) {
      console.error('Failed to save news in Firebase.', error);
      setNews((current) => upsertNewsLocally(current, normalizedItem));
    } finally {
      setIsNewsModalOpen(false);
      setEditingNews(null);
    }
  }, []);

  const openCreateNews = React.useCallback(() => {
    setEditingNews(null);
    setIsNewsModalOpen(true);
  }, []);

  const openEditNews = React.useCallback((item: NewsItem) => {
    setSelectedNews(null);
    setEditingNews(item);
    setIsNewsModalOpen(true);
  }, []);

  const handleDeleteNews = React.useCallback(async (item: NewsItem) => {
    const shouldDelete = window.confirm(`ნამდვილად გსურთ სიახლის წაშლა: "${item.title}"?`);
    if (!shouldDelete) {
      return;
    }

    try {
      await deleteDoc(doc(firestore, NEWS_COLLECTION, item.id));
    } catch (error) {
      console.error('Failed to delete news in Firebase.', error);
      setNews((current) => current.filter((entry) => entry.id !== item.id));
    } finally {
      setSelectedNews((current) => (current?.id === item.id ? null : current));
      setEditingNews((current) => (current?.id === item.id ? null : current));
      setIsNewsModalOpen(false);
    }
  }, []);

  const openNotifications = React.useCallback(() => {
    setLastSeenNewsAt(Math.max(Date.now(), getLatestNewsTimestamp(news)));
    setIsNotificationsOpen(true);
  }, [news]);

  const handleOpenNewsFromNotifications = React.useCallback((item: NewsItem) => {
    setIsNotificationsOpen(false);
    setSelectedNews(item);
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="flex items-center gap-3 rounded-2xl bg-white/80 px-6 py-4 border border-white shadow-xl">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
          <p className="text-sm font-semibold text-slate-500">ავტორიზაცია მოწმდება...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <HashRouter>
      <div className="min-h-screen flex bg-[#F8FAFC] font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900 relative overflow-x-hidden">
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
                <h2 className="text-xs font-mono text-slate-400">
                  Node: <span className="text-slate-900 font-bold">TBS-01</span> / Status:{' '}
                  <span className="text-emerald-600 font-bold">Operational</span>
                </h2>
              </div>
              <div className="flex items-center justify-between xl:justify-end gap-4 sm:gap-6 flex-wrap min-w-0">
                {role === 'admin' && (
                  <button
                    onClick={openCreateNews}
                    className="px-5 py-3 rounded-2xl bg-blue-600 text-white text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    სიახლის დამატება
                  </button>
                )}
                <div className="text-left sm:text-right">
                  <p className="text-xs font-bold text-slate-900">{currentDate}</p>
                  <p className="text-[10px] text-slate-400 font-mono tracking-tighter uppercase">
                    {currentTime} Tbilisi
                  </p>
                </div>
                <div className="h-8 w-[1px] bg-slate-200" />
                <button
                  type="button"
                  onClick={openNotifications}
                  className="p-3 glass-card rounded-2xl text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all relative group"
                  aria-label="Open news notifications"
                >
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white shadow-sm">
                      {unreadCount > 99 ? '99+' : unreadCount}
                    </span>
                  )}
                  <Bell className="w-5 h-5" />
                </button>
              </div>
            </header>

            <Routes>
              <Route path="/" element={<Dashboard news={news} onOpenNews={setSelectedNews} />} />
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
                    onOpenAddNews={openCreateNews}
                    onOpenNews={setSelectedNews}
                    onEditNews={openEditNews}
                    onDeleteNews={handleDeleteNews}
                  />
                }
              />
            </Routes>
          </div>
        </main>

        <AddNewsModal
          isOpen={isNewsModalOpen}
          onClose={() => {
            setIsNewsModalOpen(false);
            setEditingNews(null);
          }}
          onSave={handleSaveNews}
          initialNews={editingNews}
        />

        <NewsDetailModal
          item={selectedNews}
          onClose={() => setSelectedNews(null)}
          canManage={role === 'admin'}
          onEdit={openEditNews}
          onDelete={handleDeleteNews}
        />

        <NotificationsModal
          isOpen={isNotificationsOpen}
          news={news}
          unreadCount={unreadCount}
          lastSeenAt={lastSeenNewsAt}
          onClose={() => setIsNotificationsOpen(false)}
          onOpenNews={handleOpenNewsFromNotifications}
        />
      </div>
    </HashRouter>
  );
}
