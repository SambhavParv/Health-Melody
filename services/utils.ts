
import type { BmiCategory, BmiInfo, WeightLog } from '../types';
import { BMI_CATEGORIES } from '../constants';

// Calculates BMI given weight in kg and height in cm.
export const calculateBMI = (weightKg: number, heightCm: number): number => {
    if (heightCm <= 0 || weightKg <= 0) return 0;
    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);
    return parseFloat(bmi.toFixed(1));
};

// Determines the BMI category based on the BMI value.
export const getBmiCategory = (bmi: number): BmiInfo => {
    if (bmi < 18.5) return BMI_CATEGORIES.Underweight;
    if (bmi >= 18.5 && bmi <= 24.9) return BMI_CATEGORIES.Normal;
    if (bmi >= 25 && bmi <= 29.9) return BMI_CATEGORIES.Overweight;
    return BMI_CATEGORIES.Obese;
};

// Calculates the ideal weight range for a given height in cm.
export const calculateIdealWeightRange = (heightCm: number): { min: number; max: number } => {
    if (heightCm <= 0) return { min: 0, max: 0 };
    const heightM = heightCm / 100;
    const minWeight = 18.5 * (heightM * heightM);
    const maxWeight = 24.9 * (heightM * heightM);
    return { min: parseFloat(minWeight.toFixed(1)), max: parseFloat(maxWeight.toFixed(1)) };
};

// Converts weight logs to a CSV string and triggers a download.
export const exportToCSV = (logs: WeightLog[], userName: string) => {
    if (logs.length === 0) {
        alert("No data to export.");
        return;
    }

    const headers = ['Date', 'Weight (kg)', 'BMI', 'Note'];
    const rows = logs.map(log => [
        new Date(log.date).toLocaleDateString(),
        log.weight,
        log.bmi,
        `"${log.note || ''}"` // Escape commas in notes
    ]);

    const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        const sanitizedName = userName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        link.setAttribute('href', url);
        link.setAttribute('download', `bodymetrics_journey_${sanitizedName}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};
