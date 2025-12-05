
import type { BmiCategory, BmiInfo } from './types';

export const BMI_CATEGORIES: Record<BmiCategory, BmiInfo> = {
    Underweight: {
        category: 'Underweight',
        color: 'bg-blue-100',
        textColor: 'text-blue-800'
    },
    Normal: {
        category: 'Normal',
        color: 'bg-emerald-100',
        textColor: 'text-emerald-800'
    },
    Overweight: {
        category: 'Overweight',
        color: 'bg-orange-100',
        textColor: 'text-orange-800'
    },
    Obese: {
        category: 'Obese',
        color: 'bg-red-100',
        textColor: 'text-red-800'
    },
};
