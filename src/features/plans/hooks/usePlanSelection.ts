'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { QuoteTarget } from '@/features/plans/types';
import type { Plan, SelectedPlan, UserData } from '@/store/useQuoteStore';
import { useQuoteStore } from '@/store/useQuoteStore';

export interface UsePlanSelectionResult {
  userData: UserData | null;
  plans: Plan[];
  selectedOption: QuoteTarget | null;
  currentStep: number;
  chosenPlan: SelectedPlan | null;
  introTitle: string;
  introSubtitle: string;
  handleBack: () => void;
  handleQuoteTargetChange: (option: QuoteTarget) => void;
  handlePlanSelect: (plan: SelectedPlan) => void;
}

export function usePlanSelection(): UsePlanSelectionResult {
  const router = useRouter();
  const userData = useQuoteStore((state) => state.userData);
  const clearUserData = useQuoteStore((state) => state.clearUserData);
  const setChosenPlan = useQuoteStore((state) => state.setChosenPlan);
  const chosenPlan = useQuoteStore((state) => state.chosenPlan);

  const [selectedOption, setSelectedOption] = useState<QuoteTarget | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const plans = useMemo<Plan[]>(() => userData?.plans ?? [], [userData]);

  useEffect(() => {
    if (!userData) {
      router.replace('/');
    }
  }, [userData, router]);

  const handleBack = useCallback(() => {
    if (currentStep === 1) {
      setChosenPlan(null);
      setCurrentStep(0);
      return;
    }

    clearUserData();
    router.push('/');
  }, [clearUserData, currentStep, router, setChosenPlan]);

  const handleQuoteTargetChange = useCallback(
    (option: QuoteTarget) => {
      setSelectedOption(option);
      setCurrentStep(0);
      if (chosenPlan) {
        setChosenPlan(null);
      }
    },
    [chosenPlan, setChosenPlan],
  );

  const handlePlanSelect = useCallback(
    (plan: SelectedPlan) => {
      setChosenPlan(plan);
      setCurrentStep(1);
    },
    [setChosenPlan],
  );

  const introTitle = useMemo(() => {
    if (!userData) {
      return '';
    }

    return currentStep === 0
      ? `${userData.name} ¿Para quién deseas cotizar?`
      : `${userData.name}, revisa y confirma tu plan`;
  }, [currentStep, userData]);

  const introSubtitle = useMemo(() => {
    return currentStep === 0
      ? 'Selecciona la opción que se ajuste más a tus necesidades.'
      : 'Verifica que tus datos y la información del plan sean correctos antes de continuar.';
  }, [currentStep]);

  return {
    userData: userData ?? null,
    plans,
    selectedOption,
    currentStep,
    chosenPlan,
    introTitle,
    introSubtitle,
    handleBack,
    handleQuoteTargetChange,
    handlePlanSelect,
  };
}
