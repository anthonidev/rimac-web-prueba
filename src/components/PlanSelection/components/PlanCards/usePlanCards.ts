'use client';

import { useMemo } from 'react';
import type { QuoteTarget } from '../../types';
import type { Plan } from '@/store/useQuoteStore';
import { DISCOUNT_RATE, applyDiscount, getPlanIcon } from '../../planUtils';

export interface PlanCardViewModel extends Plan {
  icon: string;
  isRecommended: boolean;
  displayPrice: number;
  hasDiscount: boolean;
}

interface UsePlanCardsParams {
  plans: Plan[];
  variant: QuoteTarget;
  recommendedPlanName?: string;
}

export function usePlanCards({ plans, variant, recommendedPlanName }: UsePlanCardsParams): PlanCardViewModel[] {
  return useMemo(() => {
    return plans.map<PlanCardViewModel>((plan) => {
      const hasDiscount = variant === 'for_others';
      const displayPrice = hasDiscount ? applyDiscount(plan.price, DISCOUNT_RATE) : plan.price;

      return {
        ...plan,
        icon: getPlanIcon(plan.name),
        isRecommended: plan.name.trim() === (recommendedPlanName ?? '').trim(),
        displayPrice,
        hasDiscount,
      };
    });
  }, [plans, variant, recommendedPlanName]);
}
