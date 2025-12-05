
import React from 'react';
import { Target, Weight, TrendingUp, TrendingDown, Scale, Info } from 'lucide-react';
import Card from './common/Card';
import { useAppContext } from '../App';
import { calculateIdealWeightRange, getBmiCategory } from '../services/utils';

const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: string; subtext?: string; trend?: 'up' | 'down' | 'none' }> = ({ icon, title, value, subtext, trend }) => {
    const trendIcon = trend === 'up' ? <TrendingUp className="text-red-500" size={20} /> : trend === 'down' ? <TrendingDown className="text-emerald-500" size={20} /> : null;
    return (
        <Card className="flex-1">
            <div className="flex items-center text-slate-500 mb-2">
                {icon}
                <span className="ml-2 text-sm font-medium">{title}</span>
            </div>
            <div className="flex items-baseline justify-between">
                <p className="text-2xl font-bold text-slate-800">{value}</p>
                {trendIcon}
            </div>
            {subtext && <p className="text-xs text-slate-400 mt-1">{subtext}</p>}
        </Card>
    );
};

const BMICard: React.FC<{ bmi: number }> = ({ bmi }) => {
    const bmiInfo = getBmiCategory(bmi);
    return (
        <Card className={`${bmiInfo.color} flex flex-col items-center justify-center text-center p-6`}>
            <p className={`font-semibold ${bmiInfo.textColor}`}>Your BMI</p>
            <p className={`text-5xl font-bold my-2 ${bmiInfo.textColor}`}>{bmi.toFixed(1)}</p>
            <p className={`py-1 px-3 rounded-full text-sm font-medium bg-white/60 ${bmiInfo.textColor}`}>
                {bmiInfo.category}
            </p>
        </Card>
    );
};

const IdealWeightCard: React.FC<{ heightCm: number }> = ({ heightCm }) => {
    const range = calculateIdealWeightRange(heightCm);
    return (
        <Card className="bg-teal-50 border border-teal-200">
            <div className="flex items-center text-teal-800 mb-2">
                <Info size={16} />
                <h3 className="ml-2 font-semibold">Healthy Weight Range</h3>
            </div>
            <p className="text-teal-700">
                Based on your height of <span className="font-bold">{heightCm} cm</span>, a healthy weight for you is between <span className="font-bold">{range.min} kg</span> and <span className="font-bold">{range.max} kg</span>.
            </p>
        </Card>
    );
};


const Dashboard: React.FC = () => {
    const { profile, logs, dataLoading, user } = useAppContext();

    if (dataLoading) {
        return <div className="text-center p-10">Loading your dashboard...</div>;
    }

    if (!profile || logs.length === 0) {
        return <div className="text-center p-10">Welcome! Add your first weight log to get started.</div>;
    }

    const latestLog = logs[0];
    const startingLog = logs[logs.length - 1];
    const weightChange = latestLog.weight - startingLog.weight;
    
    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold text-slate-800">Hi, {user?.name?.split(' ')[0] || 'there'}!</h1>
            <p className="text-slate-500">Here's your progress summary. Keep it up!</p>
            
            <BMICard bmi={latestLog.bmi} />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard 
                    icon={<Weight size={16} />} 
                    title="Current" 
                    value={`${latestLog.weight.toFixed(1)} kg`}
                />
                <StatCard 
                    icon={<Scale size={16} />} 
                    title="Start" 
                    value={`${startingLog.weight.toFixed(1)} kg`}
                />
                <StatCard 
                    icon={weightChange > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />} 
                    title="Change" 
                    value={`${weightChange > 0 ? '+' : ''}${weightChange.toFixed(1)} kg`}
                    trend={weightChange === 0 ? 'none' : weightChange > 0 ? 'up' : 'down'}
                />
                <StatCard 
                    icon={<Target size={16} />} 
                    title="Target" 
                    value={profile.targetWeight ? `${profile.targetWeight} kg` : '--'}
                />
            </div>

            {profile.height > 0 && <IdealWeightCard heightCm={profile.height} />}

        </div>
    );
};

export default Dashboard;
