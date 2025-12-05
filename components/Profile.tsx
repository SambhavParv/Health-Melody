
import React, { useState } from 'react';
import { useAppContext } from '../App';
import Button from './common/Button';
import Input from './common/Input';
import Card from './common/Card';
import { User, Target, Download, LogOut } from 'lucide-react';
import { exportToCSV } from '../services/utils';

const Profile: React.FC = () => {
    const { user, profile, updateProfile, logs, signOut, showToast } = useAppContext();
    const [name, setName] = useState(profile?.name || '');
    const [targetWeight, setTargetWeight] = useState(profile?.targetWeight?.toString() || '');

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateProfile({ 
                name,
                targetWeight: targetWeight ? parseFloat(targetWeight) : undefined
            });
            showToast('Profile updated successfully!', 'success');
        } catch (error) {
            showToast('Failed to update profile.', 'error');
        }
    };
    
    const handleExport = () => {
        if(profile) {
            exportToCSV(logs, profile.name);
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-slate-800">Profile & Settings</h1>
            
            <Card>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <h2 className="text-xl font-semibold text-slate-700 mb-2">Your Details</h2>
                    <div className="space-y-2">
                        <label htmlFor="name" className="font-medium text-slate-700">Name</label>
                        <Input id="name" type="text" value={name} onChange={e => setName(e.target.value)} icon={<User size={16}/>} />
                    </div>
                     <div className="space-y-2">
                        <label htmlFor="targetWeight" className="font-medium text-slate-700">Target Weight (kg)</label>
                        <Input id="targetWeight" type="number" step="0.1" value={targetWeight} onChange={e => setTargetWeight(e.target.value)} icon={<Target size={16}/>} />
                    </div>
                    <Button type="submit">Update Profile</Button>
                </form>
            </Card>
            
            <Card>
                 <h2 className="text-xl font-semibold text-slate-700 mb-4">Data Management</h2>
                 <Button variant="secondary" onClick={handleExport}>
                    <Download size={16} className="mr-2"/>
                    Export All Data as .CSV
                 </Button>
            </Card>

             <Card>
                 <h2 className="text-xl font-semibold text-slate-700 mb-4">Account</h2>
                 <Button variant="danger" onClick={signOut}>
                    <LogOut size={16} className="mr-2"/>
                    Sign Out
                 </Button>
            </Card>

        </div>
    );
};

export default Profile;
