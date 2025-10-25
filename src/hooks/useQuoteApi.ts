'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/services/api';
import { calculateAge } from '@/utils/calculateAge';
import { useQuoteStore, type Plan } from '@/store/useQuoteStore';

interface UserResponse {
  name: string;
  lastName: string;
  birthDay: string;
}

interface PlansResponse {
  list: Plan[];
}

interface QuoteData {
  documentNumber: string;
  phone: string;
}

export function useQuoteApi() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const setUserData = useQuoteStore((state) => state.setUserData);

  const submitQuote = async (data: QuoteData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Validate specific values
      if (data.documentNumber !== '30216147' || data.phone !== '5130216147') {
        setError('Los datos ingresados son incorrectos');
        setIsLoading(false);
        return;
      }

      // Fetch user data
      const userResponse = await api.get<UserResponse>('/api/user.json');
      const { name, lastName, birthDay } = userResponse.data;

      // Calculate age
      const age = calculateAge(birthDay);

      // Fetch plans
      const plansResponse = await api.get<PlansResponse>('/api/plans.json');
      const allPlans = plansResponse.data.list;

      // Filter plans based on age
      const filteredPlans = allPlans.filter((plan) => plan.age >= age);

      // Save to store
      setUserData({
        name,
        lastName,
        documentNumber: data.documentNumber,
        phone: data.phone,
        plans: filteredPlans,
      });

      // Navigate to plans page
      router.push('/planes');
    } catch (err) {
      console.error('Error submitting quote:', err);
      setError('Ocurrió un error al procesar tu solicitud. Por favor, intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    submitQuote,
    isLoading,
    error,
  };
}
