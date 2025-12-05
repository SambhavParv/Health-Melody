
import { useState, useEffect } from 'react';
import type { User } from '../types';

const MOCK_USER: User = {
    uid: 'mock-user-123',
    email: 'test@example.com',
    name: 'John Doe',
};

// Placeholder for Firebase Auth functions
const mockAuth = {
    signInWithGoogle: () => new Promise<void>(res => setTimeout(() => res(), 1000)),
    signInWithEmail: (_email: string, _pass: string) => new Promise<void>(res => setTimeout(() => res(), 1000)),
    signUpWithEmail: (_name: string, _email: string, _pass: string) => new Promise<void>(res => setTimeout(() => res(), 1000)),
    sendPasswordReset: (_email: string) => new Promise<void>(res => setTimeout(() => res(), 1000)),
    signInWithPhone: (_phone: string) => new Promise<any>(res => {
        console.log("OTP requested for:", _phone);
        setTimeout(() => res({ verificationId: 'mock-verification-id' }), 1000);
    }),
    verifyOtp: (_code: string) => new Promise<void>(res => {
        console.log("Verifying OTP:", _code);
        setTimeout(() => res(), 1000);
    }),
    signOut: () => new Promise<void>(res => setTimeout(() => res(), 500)),
};

export const useAuth = (mockMode: boolean) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // In a real app, this would use onAuthStateChanged from Firebase
        if (mockMode) {
            // Check session storage for a mock session
            const mockSession = sessionStorage.getItem('mockUser');
            if (mockSession) {
                setUser(JSON.parse(mockSession));
            }
        }
        setLoading(false);
    }, [mockMode]);
    
    const createMockSession = () => {
        sessionStorage.setItem('mockUser', JSON.stringify(MOCK_USER));
        setUser(MOCK_USER);
    };

    const signInWithGoogle = async () => {
        setLoading(true);
        if (mockMode) {
            await mockAuth.signInWithGoogle();
            createMockSession();
        } else {
            // Real Firebase logic here
        }
        setLoading(false);
    };

    const signInWithEmail = async (_email: string, _pass: string) => {
        setLoading(true);
        if (mockMode) {
            await mockAuth.signInWithEmail(_email, _pass);
            createMockSession();
        }
        setLoading(false);
    };
    
    const signUpWithEmail = async (_name: string, _email: string, _pass: string) => {
        setLoading(true);
        if(mockMode) {
            await mockAuth.signUpWithEmail(_name, _email, _pass);
            createMockSession();
        }
        setLoading(false);
    };

    const sendPasswordReset = async (_email: string) => {
        setLoading(true);
        if(mockMode) await mockAuth.sendPasswordReset(_email);
        setLoading(false);
    };

    const signInWithPhone = async (_phone: string) => {
        setLoading(true);
        if(mockMode) {
            const confirmationResult = await mockAuth.signInWithPhone(_phone);
            // In a real app, you'd store this confirmationResult
            setLoading(false);
            return confirmationResult;
        }
        setLoading(false);
    };
    
    const verifyOtp = async (_code: string) => {
        setLoading(true);
        if(mockMode) {
            await mockAuth.verifyOtp(_code);
            createMockSession();
        }
        setLoading(false);
    };


    const signOut = async () => {
        setLoading(true);
        if (mockMode) {
            await mockAuth.signOut();
            sessionStorage.removeItem('mockUser');
            setUser(null);
        }
        setLoading(false);
    };

    return { user, loading, signInWithGoogle, signInWithEmail, signUpWithEmail, sendPasswordReset, signInWithPhone, verifyOtp, signOut };
};
