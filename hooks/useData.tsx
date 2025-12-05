
import { useState, useEffect, useCallback } from 'react';
import type { User, UserProfile, WeightLog } from '../types';
import { calculateBMI } from '../services/utils';

const MOCK_PROFILE: UserProfile = {
    name: 'John Doe',
    height: 175, // cm
    targetWeight: 75, // kg
    createdAt: new Date().toISOString(),
};

const MOCK_LOGS: WeightLog[] = [
    { id: '1', date: new Date(2023, 10, 1).toISOString(), weight: 85, bmi: calculateBMI(85, 175), note: "Starting my journey!" },
    { id: '2', date: new Date(2023, 10, 8).toISOString(), weight: 84.5, bmi: calculateBMI(84.5, 175) },
    { id: '3', date: new Date(2023, 10, 15).toISOString(), weight: 84, bmi: calculateBMI(84, 175) },
    { id: '4', date: new Date(2023, 10, 22).toISOString(), weight: 83, bmi: calculateBMI(83, 175), note: "Feeling better" },
    { id: '5', date: new Date(2023, 10, 29).toISOString(), weight: 82.5, bmi: calculateBMI(82.5, 175) },
];

export const useData = (user: User | null, mockMode: boolean) => {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [logs, setLogs] = useState<WeightLog[]>([]);
    const [dataLoading, setDataLoading] = useState(true);

    const fetchAllData = useCallback(() => {
        if (!user) {
            setDataLoading(false);
            return;
        };

        setDataLoading(true);
        if (mockMode) {
            setTimeout(() => {
                setProfile(MOCK_PROFILE);
                setLogs(MOCK_LOGS.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
                setDataLoading(false);
            }, 800);
        } else {
            // Real Firebase logic to fetch profile and logs
            // const fetchProfile = async () => { ... };
            // const fetchLogs = async () => { ... };
            // Promise.all([fetchProfile(), fetchLogs()]).then(() => setDataLoading(false));
            setDataLoading(false);
        }
    }, [user, mockMode]);


    useEffect(() => {
        fetchAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const updateProfile = async (profileData: Partial<UserProfile>) => {
        if (mockMode) {
            setProfile(prev => prev ? { ...prev, ...profileData } : null);
            return;
        }
        // Real Firebase logic
    };

    const addLog = async (logData: Omit<WeightLog, 'id' | 'bmi'>) => {
        if (mockMode) {
            const userHeight = profile?.height || 1;
            const newLog: WeightLog = {
                ...logData,
                id: (Math.random() + 1).toString(36).substring(7),
                bmi: calculateBMI(logData.weight, userHeight),
            };
            setLogs(prev => [newLog, ...prev].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
            return;
        }
        // Real Firebase logic
    };

    return { profile, logs, dataLoading, updateProfile, addLog };
};
