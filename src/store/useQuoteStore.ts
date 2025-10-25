import { create } from 'zustand';

export interface Plan {
  name: string;
  price: number;
  description: string[];
  age: number;
}

export interface UserData {
  name: string;
  lastName: string;
  documentNumber: string;
  phone: string;
  plans: Plan[];
}

export interface SelectedPlan {
  name: string;
  originalPrice: number;
  finalPrice: number;
  description: string[];
  hasDiscount: boolean;
}

interface QuoteStore {
  userData: UserData | null;
  setUserData: (data: UserData) => void;
  chosenPlan: SelectedPlan | null;
  setChosenPlan: (plan: SelectedPlan | null) => void;
  clearUserData: () => void;
}

export const useQuoteStore = create<QuoteStore>((set) => ({
  userData: null,
  chosenPlan: null,
  setUserData: (data) => set({ userData: data }),
  setChosenPlan: (plan) => set({ chosenPlan: plan }),
  clearUserData: () => set({ userData: null, chosenPlan: null }),
}));
