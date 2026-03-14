import React from 'react';
import { motion } from 'motion/react';
import { AlertCircle, ArrowRight, Lock, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function LoginPage() {
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(false);
  const { login } = useAuth();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!login(password)) {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-6 relative overflow-hidden">
      <div className="fixed inset-0 bg-mesh pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-500/20">
            <ShieldCheck className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">MEDICAL HUB</h1>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-[0.3em]">Secure Access</p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl p-10 rounded-[3rem] border border-white shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2">
                პაროლი
              </label>
              <div className="relative">
                <Lock
                  className={`absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 ${
                    error ? 'text-rose-500' : 'text-slate-400'
                  }`}
                />
                <input
                  type="password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setError(false);
                  }}
                  className={`w-full pl-14 pr-6 py-5 bg-slate-50 border rounded-2xl outline-none transition-all font-mono text-lg ${
                    error
                      ? 'border-rose-200 ring-4 ring-rose-500/5'
                      : 'border-slate-100 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5'
                  }`}
                  placeholder="••••••••"
                />
              </div>
              {error && (
                <p className="text-rose-500 text-[10px] font-bold uppercase ml-2 flex items-center gap-2">
                  <AlertCircle className="w-3 h-3" />
                  არასწორი პაროლი
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 group"
            >
              შესვლა
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
