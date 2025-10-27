'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
  plansSectionRef: React.RefObject<HTMLDivElement | null>;
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
  const plansSectionRef = useRef<HTMLDivElement>(null);

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

      // Scroll to plans section after a brief delay to ensure content is rendered
      setTimeout(() => {
        if (plansSectionRef.current) {
          plansSectionRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        }
      }, 100);
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

    return `${userData.name} ¿Para quién deseas cotizar?`
  }, [userData]);

  const introSubtitle ='Selecciona la opción que se ajuste más a tus necesidades.'

  return {
    userData: userData ?? null,
    plans,
    selectedOption,
    currentStep,
    chosenPlan,
    introTitle,
    introSubtitle,
    plansSectionRef,
    handleBack,
    handleQuoteTargetChange,
    handlePlanSelect,
  };
}
