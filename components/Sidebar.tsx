
import React from 'react';
import type { NavItem } from '../types';
import { LogOut } from 'lucide-react';
import { useAppContext } from '../App';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  navItems: NavItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, navItems }) => {
  const { signOut, user } = useAppContext();

  return (
    <aside className="hidden md:flex flex-col w-64 h-full bg-white border-r border-slate-200 fixed z-40">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-teal-600">BodyMetrics</h1>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`flex items-center w-full text-left p-3 rounded-lg transition-colors duration-200 ${
              activeView === item.id
                ? 'bg-teal-50 text-teal-700 font-semibold'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
            }`}
          >
            <item.icon size={20} className="mr-3" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-slate-200">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="ml-3">
            <p className="font-semibold text-sm text-slate-800">{user?.name}</p>
            <p className="text-xs text-slate-500">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={signOut}
          className="flex items-center w-full text-left p-3 rounded-lg text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
        >
          <LogOut size={20} className="mr-3" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
