import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function isValidFileName(fileName: string): boolean {
  const validFilenameRegex = /^\d+_[A-Za-z0-9]+_\d{4}-\d{2}-\d{2}\.pdf$/;
  return validFilenameRegex.test(fileName);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',  
    currency: 'PHP',
    maximumFractionDigits: 0
  }).format(amount);
}
