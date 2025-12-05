
import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onDismiss: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onDismiss }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onDismiss, 300); // Wait for transition to finish
    }, 3000);

    return () => clearTimeout(timer);
  }, [message, onDismiss]);

  const bgColor = type === 'success' ? 'bg-emerald-500' : 'bg-red-500';
  const Icon = type === 'success' ? CheckCircle : XCircle;

  return (
    <div
      className={`fixed bottom-24 md:bottom-5 md:right-5 left-1/2 -translate-x-1/2 md:translate-x-0 w-11/12 max-w-sm rounded-xl text-white p-4 flex items-center shadow-lg transition-all duration-300 ease-in-out z-50 ${bgColor} ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      <Icon className="h-6 w-6 mr-3" />
      <span className="flex-1 font-medium">{message}</span>
      <button onClick={onDismiss} className="ml-3 p-1 rounded-full hover:bg-white/20">
        <X className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Toast;
