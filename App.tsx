
import React, { useState, useCallback, useMemo, useEffect, createContext, useContext } from 'react';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import History from './components/History';
import AddLog from './components/AddLog';
import Profile from './components/Profile';
import BottomNav from './components/BottomNav';
import Sidebar from './components/Sidebar';
import { useAuth } from './hooks/useAuth';
import { useData } from './hooks/useData';
import type { AppContextType, ToastMessage, User, WeightLog } from './types';
import { LayoutDashboard, PlusCircle, History as HistoryIcon, User as UserIcon } from 'lucide-react';
import Toast from './components/common/Toast';

const AppContext = createContext<AppContextType | null>(null);
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};

const NAV_ITEMS = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'add', label: 'Add Log', icon: PlusCircle },
    { id: 'history', label: 'History', icon: HistoryIcon },
    { id: 'profile', label: 'Profile', icon: UserIcon },
];

export default function App() {
    const MOCK_MODE = true; // Set to false to use real Firebase
    const auth = useAuth(MOCK_MODE);
    const data = useData(auth.user, MOCK_MODE);
    const [activeView, setActiveView] = useState('dashboard');
    const [toast, setToast] = useState<ToastMessage | null>(null);

    const showToast = useCallback((message: string, type: 'success' | 'error') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    }, []);

    const contextValue = useMemo(() => ({
        ...auth,
        ...data,
        showToast,
        mockMode: MOCK_MODE,
    }), [auth, data, showToast, MOCK_MODE]);

    const renderView = () => {
        switch (activeView) {
            case 'dashboard':
                return <Dashboard />;
            case 'add':
                return <AddLog onLogAdded={() => setActiveView('history')} />;
            case 'history':
                return <History />;
            case 'profile':
                return <Profile />;
            default:
                return <Dashboard />;
        }
    };

    if (!auth.user) {
        return (
            <AppContext.Provider value={contextValue}>
                <Auth />
            </AppContext.Provider>
        );
    }

    return (
        <AppContext.Provider value={contextValue}>
            <div className="flex h-screen w-full bg-slate-50 font-sans">
                <Sidebar activeView={activeView} setActiveView={setActiveView} navItems={NAV_ITEMS} />
                <div className="flex flex-col flex-1 md:ml-64">
                    <main className="flex-1 overflow-y-auto p-4 pb-20 md:pb-4">
                        {renderView()}
                    </main>
                    <BottomNav activeView={activeView} setActiveView={setActiveView} navItems={NAV_ITEMS} />
                </div>
                {toast && <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />}
            </div>
        </AppContext.Provider>
    );
}
