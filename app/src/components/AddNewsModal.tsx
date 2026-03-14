import React from 'react';
import { motion } from 'motion/react';
import { Plus, X } from 'lucide-react';
import type { NewsItem } from '../types';

interface AddNewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (news: NewsItem) => void;
}

const categoryOptions: NewsItem['category'][] = ['ტრენინგი', 'სიახლე', 'განცხადება'];

export function AddNewsModal({ isOpen, onClose, onAdd }: AddNewsModalProps) {
  const [title, setTitle] = React.useState('');
  const [summary, setSummary] = React.useState('');
  const [content, setContent] = React.useState('');
  const [category, setCategory] = React.useState<NewsItem['category']>('ტრენინგი');

  React.useEffect(() => {
    if (!isOpen) {
      setTitle('');
      setSummary('');
      setContent('');
      setCategory('ტრენინგი');
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const createdAt = Date.now();

    onAdd({
      id: createdAt.toString(),
      title: title.trim(),
      summary: summary.trim() || 'ადმინისტრატორის მიერ დამატებული შიდა განახლება.',
      content: content.trim() || summary.trim() || 'ადმინისტრატორის მიერ დამატებული შიდა განახლება.',
      category,
      date: new Date(createdAt).toLocaleDateString('ka-GE'),
      createdAt,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="bg-white w-full max-w-lg rounded-[3rem] p-10 shadow-2xl border border-white/60"
      >
        <div className="flex justify-between items-center mb-10">
          <h3 className="text-2xl font-bold text-slate-900">სიახლის დამატება</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2">
              სათაური
            </label>
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2">
              მოკლე აღწერა
            </label>
            <textarea
              value={summary}
              onChange={(event) => setSummary(event.target.value)}
              rows={4}
              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all resize-none"
              placeholder="მოკლე აღწერა სიახლის ბარათისთვის"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2">
              სრული ტექსტი
            </label>
            <textarea
              value={content}
              onChange={(event) => setContent(event.target.value)}
              rows={6}
              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all resize-none"
              placeholder="სრული ტექსტი სრულად წაკითხვის ფანჯრისთვის"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2">
              კატეგორია
            </label>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value as NewsItem['category'])}
              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all"
            >
              {categoryOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold uppercase text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            დამატება
          </button>
        </form>
      </motion.div>
    </div>
  );
}
