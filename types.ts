
import type { LucideProps } from 'lucide-react';
import type React from 'react';

export interface User {
    uid: string;
    email: string | null;
    name: string | null;
    phoneNumber?: string | null;
    photoURL?: string | null;
}

export interface UserProfile {
    name: string;
    height: number; // in cm
    targetWeight?: number; // in kg
    createdAt: string;
}

export interface WeightLog {
    id: string;
    date: string; // ISO string
    weight: number; // in kg
    bmi: number;
    note?: string;
}

export type BmiCategory = 'Underweight' | 'Normal' | 'Overweight' | 'Obese';

export interface BmiInfo {
    category: BmiCategory;
    color: string;
    textColor: string;
}

export interface ToastMessage {
    message: string;
    type: 'success' | 'error';
}

export interface NavItem {
    id: string;
    label: string;
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
}

export interface AuthContextType {
    user: User | null;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    signInWithEmail: (email: string, pass: string) => Promise<void>;
    signUpWithEmail: (name: string, email: string, pass: string) => Promise<void>;
    sendPasswordReset: (email: string) => Promise<void>;
    signInWithPhone: (phone: string) => Promise<any>; // Simplified for mock
    verifyOtp: (code: string) => Promise<void>;
    signOut: () => Promise<void>;
}

export interface DataContextType {
    profile: UserProfile | null;
    logs: WeightLog[];
    dataLoading: boolean;
    updateProfile: (profileData: Partial<UserProfile>) => Promise<void>;
    addLog: (logData: Omit<WeightLog, 'id' | 'bmi'>) => Promise<void>;
}

export interface AppContextType extends AuthContextType, DataContextType {
    showToast: (message: string, type: 'success' | 'error') => void;
    mockMode: boolean;
}
