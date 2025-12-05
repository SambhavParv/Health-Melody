
import React, { useState } from 'react';
import Button from './common/Button';
import Input from './common/Input';
import { useAppContext } from '../App';
import { Calendar, Weight, Ruler } from 'lucide-react';

interface AddLogProps {
  onLogAdded: () => void;
}

const AddLog: React.FC<AddLogProps> = ({ onLogAdded }) => {
    const { addLog, profile, updateProfile, showToast } = useAppContext();
    
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState(profile?.height ? String(profile.height) : '');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const weightKg = parseFloat(weight);
        const heightCm = parseFloat(height);

        if (isNaN(weightKg) || weightKg <= 0 || isNaN(heightCm) || heightCm <= 0) {
            showToast('Please enter valid weight and height.', 'error');
            return;
        }

        try {
            await addLog({
                date: new Date(date).toISOString(),
                weight: weightKg,
            });
            
            // Update profile height if it's new or changed
            if (profile?.height !== heightCm) {
                await updateProfile({ height: heightCm });
            }

            showToast('Log added successfully!', 'success');
            onLogAdded();
        } catch (error) {
            showToast('Failed to add log.', 'error');
            console.error(error);
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-slate-800 mb-6">Add New Log</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label htmlFor="date" className="font-medium text-slate-700">Date</label>
                    <Input id="date" type="date" value={date} onChange={e => setDate(e.target.value)} icon={<Calendar size={16}/>} required />
                </div>
                <div className="space-y-2">
                     <label htmlFor="weight" className="font-medium text-slate-700">Weight (kg)</label>
                    <Input id="weight" type="number" step="0.1" placeholder="e.g., 75.5" value={weight} onChange={e => setWeight(e.target.value)} icon={<Weight size={16} />} required />
                </div>
                <div className="space-y-2">
                    <label htmlFor="height" className="font-medium text-slate-700">Height (cm)</label>
                    <Input id="height" type="number" placeholder="e.g., 175" value={height} onChange={e => setHeight(e.target.value)} icon={<Ruler size={16}/>} required />
                    <p className="text-xs text-slate-500 pl-2">Your height is saved to your profile and used for BMI calculations.</p>
                </div>
                <Button type="submit">Save Entry</Button>
            </form>
        </div>
    );
};

export default AddLog;
