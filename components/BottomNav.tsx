
import React from 'react';
import type { NavItem } from '../types';

interface BottomNavProps {
  activeView: string;
  setActiveView: (view: string) => void;
  navItems: NavItem[];
}

const BottomNav: React.FC<BottomNavProps> = ({ activeView, setActiveView, navItems }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-200 shadow-t-lg md:hidden z-40">
      <div className="flex justify-around items-center h-full">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`flex flex-col items-center justify-center w-full h-full transition-colors duration-200 ${
              activeView === item.id ? 'text-teal-600' : 'text-slate-500 hover:text-teal-500'
            }`}
          >
            <item.icon size={24} />
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
