import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Link as LinkIcon, 
  Newspaper, 
  ChevronRight,
  LogOut,
  Bell,
  Menu,
  X
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';
import ingorokvaClinicLogo from '../assets/tm-center-logo.png';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'მთავარი' },
  { to: '/knowledge', icon: BookOpen, label: 'ცოდნის ჰაბი' },
  { to: '/doctors', icon: Users, label: 'ექიმების დირექტორია' },
  { to: '/resources', icon: LinkIcon, label: 'რესურსები' },
  { to: '/news', icon: Newspaper, label: 'სიახლეები' },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { role, logout } = useAuth();
  const roleLabel = role === 'admin' ? 'ადმინისტრატორი' : 'თანამშრომელი';
  const initials = role === 'admin' ? 'AD' : 'US';

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-6 left-6 z-40 w-12 h-12 bg-white/80 backdrop-blur-xl text-slate-900 rounded-2xl flex items-center justify-center shadow-lg border border-white/20"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={cn(
        "fixed inset-y-6 left-6 w-64 glass-card rounded-[2.5rem] text-slate-900 flex flex-col z-[60] transition-transform duration-700 lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-[120%]"
      )}>
        <div className="p-8">
          <div className="flex items-center justify-between mb-10">
            <div className="pr-3">
              <img
                src={ingorokvaClinicLogo}
                alt="ინგოროყვას საუნივერსიტეტო კლინიკა"
                className="h-14 w-auto max-w-[11.5rem] object-contain"
              />
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="lg:hidden w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => cn(
                   "group flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all duration-500",
                   isActive 
                     ? "bg-blue-50 text-blue-600 shadow-sm" 
                     : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                )}
              >
                {({ isActive }) => (
                  <>
                    <item.icon className={cn("w-5 h-5 transition-all duration-500", isActive ? "text-blue-600 scale-110" : "text-slate-400 group-hover:text-slate-600")} />
                    <span className="text-sm font-semibold tracking-tight">{item.label}</span>
                    {isActive && (
                      <motion.div 
                        layoutId="active-pill"
                        className="ml-auto w-1 h-4 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-8 space-y-6">
          <div className="p-5 bg-slate-50/50 rounded-3xl border border-slate-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-[10px] font-bold border border-slate-200 text-slate-600 shadow-sm">
                {initials}
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Access</p>
                <p className="text-sm font-semibold text-slate-900">{roleLabel}</p>
              </div>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                void logout();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white text-[10px] font-bold text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all border border-slate-100 shadow-sm"
            >
              <LogOut className="w-3 h-3" />
              გასვლა
            </button>
          </div>
          
          <div className="flex items-center justify-between px-2">
            <p className="text-[9px] text-slate-400 font-mono uppercase tracking-[0.1em]">v2.4.0-stable</p>
            <div className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">Online</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
