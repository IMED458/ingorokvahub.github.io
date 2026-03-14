import React from 'react';
import { motion } from 'motion/react';
import { Bell, ChevronRight, Clock3, X } from 'lucide-react';
import { getNewsTimestamp } from '../lib/news';
import type { NewsItem } from '../types';

interface NotificationsModalProps {
  isOpen: boolean;
  news: NewsItem[];
  unreadCount: number;
  lastSeenAt: number | null;
  onClose: () => void;
  onOpenNews: (item: NewsItem) => void;
}

export function NotificationsModal({
  isOpen,
  news,
  unreadCount,
  lastSeenAt,
  onClose,
  onOpenNews,
}: NotificationsModalProps) {
  React.useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[105] bg-slate-950/35 backdrop-blur-sm p-4 sm:p-6 flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-2xl max-h-[86vh] overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4 px-6 sm:px-8 py-6 border-b border-slate-100">
          <div className="min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Bell className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">სიახლეების ცენტრი</h3>
                <p className="text-xs text-slate-400 font-medium">
                  {unreadCount > 0 ? `${unreadCount} ახალი განახლება` : 'ყველა განახლება ნანახია'}
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="shrink-0 p-3 rounded-2xl bg-slate-50 text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Close notifications"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-[calc(86vh-6rem)] overflow-y-auto px-4 sm:px-6 py-4 sm:py-6">
          {news.length === 0 ? (
            <div className="rounded-[2rem] bg-slate-50 px-6 py-10 text-center">
              <p className="text-sm font-semibold text-slate-500">სიახლეები ჯერ არ დამატებულა</p>
            </div>
          ) : (
            <div className="space-y-3">
              {news.map((item) => {
                const isUnread = lastSeenAt === null ? false : getNewsTimestamp(item) > lastSeenAt;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onOpenNews(item)}
                    className="w-full text-left rounded-[2rem] border border-slate-100 bg-slate-50 px-5 py-5 hover:border-blue-200 hover:bg-white hover:shadow-lg hover:shadow-blue-500/5 transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="rounded-full bg-blue-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-600">
                            {item.category}
                          </span>
                          {isUnread && (
                            <span className="rounded-full bg-rose-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-rose-600">
                              ახალი
                            </span>
                          )}
                        </div>
                        <h4 className="text-base sm:text-lg font-bold text-slate-900 break-anywhere mb-2">
                          {item.title}
                        </h4>
                        <p className="text-sm text-slate-500 leading-6 break-anywhere line-clamp-2">
                          {item.summary}
                        </p>
                      </div>

                      <div className="shrink-0 flex flex-col items-end gap-3">
                        <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                          <Clock3 className="w-3.5 h-3.5" />
                          {item.date}
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-300" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
