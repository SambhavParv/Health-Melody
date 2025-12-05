
import React, { useState } from 'react';
import { Mail, Lock, User as UserIcon, Phone, KeyRound } from 'lucide-react';
import Button from './common/Button';
import Input from './common/Input';
import { useAppContext } from '../App';

type AuthMode = 'login' | 'register' | 'forgot' | 'phone' | 'otp';

const Auth: React.FC = () => {
    const { 
        loading, 
        signInWithGoogle, 
        signInWithEmail, 
        signUpWithEmail,
        sendPasswordReset,
        signInWithPhone,
        verifyOtp,
        showToast 
    } = useAppContext();
    const [mode, setMode] = useState<AuthMode>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (mode === 'login') {
                await signInWithEmail(email, password);
            } else if (mode === 'register') {
                await signUpWithEmail(name, email, password);
            } else if (mode === 'forgot') {
                await sendPasswordReset(email);
                showToast("Password reset link sent!", 'success');
                setMode('login');
            } else if (mode === 'phone') {
                await signInWithPhone(`+1${phoneNumber}`); // Assuming US numbers for simplicity
                showToast("OTP sent to your phone!", 'success');
                setMode('otp');
            } else if (mode === 'otp') {
                await verifyOtp(otp);
            }
        } catch (error) {
            console.error(error);
            showToast((error as Error).message, 'error');
        }
    };

    const renderForm = () => {
        switch (mode) {
            case 'register':
                return (
                    <>
                        <h2 className="text-2xl font-bold text-slate-800">Create Account</h2>
                        <p className="text-slate-500 mb-6">Start your health journey today.</p>
                        <Input icon={<UserIcon size={16} />} type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required />
                        <Input icon={<Mail size={16} />} type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required />
                        <Input icon={<Lock size={16} />} type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                        <Button type="submit" isLoading={loading}>Sign Up</Button>
                        <p className="text-center text-sm text-slate-500">Already have an account? <button type="button" onClick={() => setMode('login')} className="font-semibold text-teal-600 hover:underline">Log In</button></p>
                    </>
                );
            case 'forgot':
                 return (
                    <>
                        <h2 className="text-2xl font-bold text-slate-800">Reset Password</h2>
                        <p className="text-slate-500 mb-6">Enter your email to get a reset link.</p>
                        <Input icon={<Mail size={16} />} type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required />
                        <Button type="submit" isLoading={loading}>Send Reset Link</Button>
                        <p className="text-center text-sm text-slate-500">Remembered your password? <button type="button" onClick={() => setMode('login')} className="font-semibold text-teal-600 hover:underline">Log In</button></p>
                    </>
                );
            case 'phone':
                return (
                    <>
                        <h2 className="text-2xl font-bold text-slate-800">Login with Phone</h2>
                        <p className="text-slate-500 mb-6">We'll text you a verification code.</p>
                        <Input icon={<Phone size={16} />} type="tel" placeholder="Phone Number" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} required />
                        <Button type="submit" isLoading={loading}>Send OTP</Button>
                        <p className="text-center text-sm text-slate-500">Prefer email? <button type="button" onClick={() => setMode('login')} className="font-semibold text-teal-600 hover:underline">Log In</button></p>
                    </>
                );
            case 'otp':
                return (
                    <>
                        <h2 className="text-2xl font-bold text-slate-800">Verify Code</h2>
                        <p className="text-slate-500 mb-6">Enter the code sent to your phone.</p>
                        <Input icon={<KeyRound size={16} />} type="text" placeholder="6-digit code" value={otp} onChange={e => setOtp(e.target.value)} required />
                        <Button type="submit" isLoading={loading}>Verify & Log In</Button>
                        <p className="text-center text-sm text-slate-500">Didn't get a code? <button type="button" onClick={() => setMode('phone')} className="font-semibold text-teal-600 hover:underline">Resend</button></p>
                    </>
                );
            case 'login':
            default:
                return (
                    <>
                        <h2 className="text-2xl font-bold text-slate-800">Welcome Back</h2>
                        <p className="text-slate-500 mb-6">Log in to track your progress.</p>
                        <Input icon={<Mail size={16} />} type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required />
                        <Input icon={<Lock size={16} />} type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                        <div className="text-right text-sm mb-4">
                            <button type="button" onClick={() => setMode('forgot')} className="font-semibold text-teal-600 hover:underline">Forgot Password?</button>
                        </div>
                        <Button type="submit" isLoading={loading}>Log In</Button>
                        <p className="text-center text-sm text-slate-500">No account? <button type="button" onClick={() => setMode('register')} className="font-semibold text-teal-600 hover:underline">Sign Up</button></p>
                    </>
                );
        }
    }
    
    const GoogleIcon = () => (
        <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C43.021,36.251,44,30.686,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
        </svg>
    );

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <div className="w-full max-w-sm">
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
                        {renderForm()}
                    </form>
                     <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-slate-500">Or continue with</span>
                        </div>
                    </div>
                    <div className="space-y-3">
                         <Button variant="secondary" onClick={signInWithGoogle} isLoading={loading}>
                            <GoogleIcon /> Sign in with Google
                         </Button>
                         <Button variant="secondary" onClick={() => setMode('phone')} isLoading={loading}>
                            <Phone className="w-5 h-5 mr-3" /> Login with Phone
                         </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
