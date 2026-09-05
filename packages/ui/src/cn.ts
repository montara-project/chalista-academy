import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Menggabungkan class Tailwind dengan menghapus yang saling bertabrakan. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
