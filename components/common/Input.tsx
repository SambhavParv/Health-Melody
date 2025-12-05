
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({ icon, className = '', ...props }) => {
  return (
    <div className="relative w-full">
      {icon && <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">{icon}</span>}
      <input
        className={`w-full rounded-xl border border-slate-300 bg-white p-4 ${icon ? 'pl-10' : ''} text-slate-900 placeholder-slate-400 focus:border-teal-500 focus:ring-teal-500 transition-colors duration-200 ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;
