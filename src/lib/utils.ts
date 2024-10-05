import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export function getFirstLetters(firstName:string, lastName:string) {
  return [firstName.charAt(0), lastName.charAt(0)];
}