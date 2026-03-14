import React from 'react';
import { motion } from 'motion/react';
import { CalendarDays, X } from 'lucide-react';
import type { NewsItem } from '../types';

interface NewsDetailModalProps {
  item: NewsItem | null;
  onClose: () => void;
}

function getParagraphs(item: NewsItem) {
  const content = item.content?.trim();
  if (!content) {
    return [];
  }

  return content
    .split('\n')
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export function NewsDetailModal({ item, onClose }: NewsDetailModalProps) {
  React.useEffect(() => {
    if (!item) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, onClose]);

  if (!item) {
    return null;
  }

  const paragraphs = getParagraphs(item);

  return (
    <div
      className="fixed inset-0 z-[110] bg-slate-950/45 backdrop-blur-sm p-4 sm:p-6 flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-3xl max-h-[88vh] overflow-hidden bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4 px-6 sm:px-8 py-6 border-b border-slate-100">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="rounded-full bg-blue-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-600">
                {item.category}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                <CalendarDays className="w-3.5 h-3.5" />
                {item.date}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight break-anywhere">
              {item.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="shrink-0 p-3 rounded-2xl bg-slate-50 text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Close news"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 sm:px-8 py-6 sm:py-8 overflow-y-auto max-h-[calc(88vh-7.5rem)]">
          <div className="rounded-[2rem] bg-slate-50 px-5 py-4 mb-6">
            <p className="text-sm sm:text-base text-slate-700 leading-7 break-anywhere">{item.summary}</p>
          </div>

          <div className="space-y-5">
            {paragraphs.map((paragraph, index) => (
              <p key={`${item.id}-${index}`} className="text-sm sm:text-base text-slate-700 leading-8 break-anywhere">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
