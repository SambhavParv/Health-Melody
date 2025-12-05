
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAppContext } from '../App';
import Card from './common/Card';
import { Calendar, Scale, ArrowRight } from 'lucide-react';

const History: React.FC = () => {
    const { logs, dataLoading } = useAppContext();

    if (dataLoading) {
        return <div className="text-center p-10">Loading history...</div>;
    }

    const chartData = logs
        .map(log => ({
            date: new Date(log.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            weight: log.weight,
        }))
        .reverse();

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-slate-800">Weight History</h1>
            <Card>
                <h2 className="text-xl font-semibold text-slate-700 mb-4">Your Progress</h2>
                {chartData.length > 1 ? (
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                            <XAxis dataKey="date" stroke="#64748b" />
                            <YAxis stroke="#64748b" domain={['dataMin - 2', 'dataMax + 2']} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'white',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '0.75rem',
                                }}
                            />
                            <Legend />
                            <Line type="monotone" dataKey="weight" stroke="#14b8a6" strokeWidth={2} activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="h-[300px] flex items-center justify-center text-slate-500">
                        Add at least two logs to see your progress chart.
                    </div>
                )}
            </Card>

            <div className="space-y-3">
                 <h2 className="text-xl font-semibold text-slate-700">All Entries</h2>
                {logs.length > 0 ? logs.map(log => (
                    <Card key={log.id}>
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="flex items-center text-slate-600">
                                    <Calendar size={14} className="mr-2" />
                                    <p className="font-semibold">{new Date(log.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                </div>
                                {log.note && <p className="text-sm text-slate-500 mt-1 pl-6">"{log.note}"</p>}
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-xl text-teal-600">{log.weight.toFixed(1)} kg</p>
                                <p className="text-sm text-slate-400">BMI: {log.bmi.toFixed(1)}</p>
                            </div>
                        </div>
                    </Card>
                )) : (
                     <p className="text-center text-slate-500 py-8">No entries found.</p>
                )}
            </div>
        </div>
    );
};

export default History;
