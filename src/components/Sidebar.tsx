import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Link as LinkIcon, 
  Newspaper, 
  Stethoscope,
  ChevronRight,
  LogOut,
  Bell
} from 'lucide-react';
import { cn } from '../lib/utils';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'მთავარი' },
  { to: '/knowledge', icon: BookOpen, label: 'ცოდნის ჰაბი' },
  { to: '/patient-flow', icon: Stethoscope, label: 'პაციენტთან ბრუნვა' },
  { to: '/doctors', icon: Users, label: 'ექიმების დირექტორია' },
  { to: '/resources', icon: LinkIcon, label: 'რესურსები' },
  { to: '/news', icon: Newspaper, label: 'სიახლეები' },
];

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 w-72 bg-slate-950 text-white flex flex-col border-r border-slate-900 z-50">
      <div className="p-10">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/20">
            <Stethoscope className="text-white w-7 h-7" />
          </div>
          <div>
            <h1 className="font-bold text-xl tracking-tight">INGOROKVA</h1>
            <p className="text-[10px] text-blue-400 font-bold tracking-[0.3em] uppercase opacity-80">Medical Hub</p>
          </div>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => cn(
                "group flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300",
                isActive 
                  ? "bg-white text-slate-950 shadow-2xl shadow-white/5" 
                  : "text-slate-500 hover:text-white hover:bg-slate-900/50"
              )}
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-4">
                    <item.icon className={cn("w-5 h-5 transition-colors", isActive ? "text-blue-600" : "text-slate-600 group-hover:text-blue-400")} />
                    <span className="text-sm font-bold tracking-tight">{item.label}</span>
                  </div>
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-10 space-y-6">
        <div className="p-6 bg-slate-900/50 rounded-[2rem] border border-slate-900 backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-slate-800 flex items-center justify-center text-xs font-bold border border-slate-700">GA</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold truncate">გიორგი აბაშიძე</p>
              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">კარდიოლოგი</p>
            </div>
          </div>
          <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 text-[10px] font-bold text-slate-500 hover:text-rose-400 hover:bg-rose-500/5 transition-all border border-transparent hover:border-rose-500/20">
            <LogOut className="w-3 h-3" />
            გასვლა
          </button>
        </div>
        
        <div className="flex items-center justify-between px-2">
          <p className="text-[10px] text-slate-700 font-mono uppercase tracking-[0.2em]">v2.4.0-stable</p>
          <div className="flex items-center gap-2">
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
             <span className="text-[10px] text-slate-600 uppercase font-bold tracking-widest">Online</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
