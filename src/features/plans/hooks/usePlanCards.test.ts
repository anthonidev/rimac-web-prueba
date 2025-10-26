import { renderHook } from '@testing-library/react';
import { usePlanCards } from './usePlanCards';
import type { Plan } from '@/store/useQuoteStore';
import type { QuoteTarget } from '@/features/plans/types';

describe('usePlanCards', () => {
  const mockPlans: Plan[] = [
    {
      name: 'Plan en Casa',
      price: 35.00,
      description: ['Videoconsulta', 'Médico general a domicilio'],
      age: 18
    },
    {
      name: 'Plan en Casa y Clínica',
      price: 55.00,
      description: ['Consultas en clínica', 'Videoconsulta'],
      age: 18
    },
    {
      name: 'Plan en Casa + Chequeo',
      price: 45.00,
      description: ['Un Chequeo preventivo general', 'Videoconsulta'],
      age: 25
    }
  ];

  describe('variant: for_me (no discount)', () => {
    it('should return plans without discount', () => {
      const { result } = renderHook(() =>
        usePlanCards({
          plans: mockPlans,
          variant: 'for_me' as QuoteTarget,
          recommendedPlanName: undefined
        })
      );

      expect(result.current).toHaveLength(3);
      result.current.forEach((plan, index) => {
        expect(plan.hasDiscount).toBe(false);
        expect(plan.displayPrice).toBe(mockPlans[index].price);
      });
    });

    it('should assign correct icons to plans', () => {
      const { result } = renderHook(() =>
        usePlanCards({
          plans: mockPlans,
          variant: 'for_me' as QuoteTarget,
        })
      );

      expect(result.current[0].icon).toBe('/icons/IcHomeLight.svg'); // Plan en Casa
      expect(result.current[1].icon).toBe('/icons/IcHospitalLight.svg'); // Plan en Casa y Clínica
      expect(result.current[2].icon).toBe('/icons/IcHomeLight.svg'); // Plan en Casa + Chequeo
    });

    it('should not mark any plan as recommended when recommendedPlanName is not provided', () => {
      const { result } = renderHook(() =>
        usePlanCards({
          plans: mockPlans,
          variant: 'for_me' as QuoteTarget,
        })
      );

      result.current.forEach((plan) => {
        expect(plan.isRecommended).toBe(false);
      });
    });

    it('should mark correct plan as recommended', () => {
      const { result } = renderHook(() =>
        usePlanCards({
          plans: mockPlans,
          variant: 'for_me' as QuoteTarget,
          recommendedPlanName: 'Plan en Casa'
        })
      );

      expect(result.current[0].isRecommended).toBe(true);
      expect(result.current[1].isRecommended).toBe(false);
      expect(result.current[2].isRecommended).toBe(false);
    });
  });

  describe('variant: for_others (with discount)', () => {
    it('should return plans with 5% discount applied', () => {
      const { result } = renderHook(() =>
        usePlanCards({
          plans: mockPlans,
          variant: 'for_others' as QuoteTarget,
        })
      );

      expect(result.current).toHaveLength(3);
      result.current.forEach((plan) => {
        expect(plan.hasDiscount).toBe(true);
      });

      // Plan en Casa: 35.00 * 0.95 = 33.25
      expect(result.current[0].displayPrice).toBe(33.25);

      // Plan en Casa y Clínica: 55.00 * 0.95 = 52.25
      expect(result.current[1].displayPrice).toBe(52.25);

      // Plan en Casa + Chequeo: 45.00 * 0.95 = 42.75
      expect(result.current[2].displayPrice).toBe(42.75);
    });

    it('should preserve original price field while showing discounted displayPrice', () => {
      const { result } = renderHook(() =>
        usePlanCards({
          plans: mockPlans,
          variant: 'for_others' as QuoteTarget,
        })
      );

      result.current.forEach((plan, index) => {
        expect(plan.price).toBe(mockPlans[index].price); // Original price preserved
        expect(plan.displayPrice).toBeLessThan(plan.price); // Display price is discounted
      });
    });
  });

  describe('recommended plan handling', () => {
    it('should handle recommended plan name with trailing spaces', () => {
      const { result } = renderHook(() =>
        usePlanCards({
          plans: mockPlans,
          variant: 'for_me' as QuoteTarget,
          recommendedPlanName: 'Plan en Casa  ' // trailing spaces
        })
      );

      expect(result.current[0].isRecommended).toBe(true);
    });

    it('should handle plan name with trailing spaces', () => {
      const plansWithSpaces: Plan[] = [
        {
          name: 'Plan en Casa ',
          price: 35.00,
          description: ['Coverage'],
          age: 18
        }
      ];

      const { result } = renderHook(() =>
        usePlanCards({
          plans: plansWithSpaces,
          variant: 'for_me' as QuoteTarget,
          recommendedPlanName: 'Plan en Casa'
        })
      );

      expect(result.current[0].isRecommended).toBe(true);
    });

    it('should not mark any plan as recommended when name does not match', () => {
      const { result } = renderHook(() =>
        usePlanCards({
          plans: mockPlans,
          variant: 'for_me' as QuoteTarget,
          recommendedPlanName: 'Non-existent Plan'
        })
      );

      result.current.forEach((plan) => {
        expect(plan.isRecommended).toBe(false);
      });
    });
  });

  describe('edge cases', () => {
    it('should handle empty plans array', () => {
      const { result } = renderHook(() =>
        usePlanCards({
          plans: [],
          variant: 'for_me' as QuoteTarget,
        })
      );

      expect(result.current).toEqual([]);
    });

    it('should handle single plan', () => {
      const singlePlan: Plan[] = [
        {
          name: 'Plan en Casa',
          price: 35.00,
          description: ['Coverage'],
          age: 18
        }
      ];

      const { result } = renderHook(() =>
        usePlanCards({
          plans: singlePlan,
          variant: 'for_me' as QuoteTarget,
          recommendedPlanName: 'Plan en Casa'
        })
      );

      expect(result.current).toHaveLength(1);
      expect(result.current[0].isRecommended).toBe(true);
      expect(result.current[0].hasDiscount).toBe(false);
      expect(result.current[0].displayPrice).toBe(35.00);
    });

    it('should preserve all plan properties', () => {
      const { result } = renderHook(() =>
        usePlanCards({
          plans: mockPlans,
          variant: 'for_me' as QuoteTarget,
        })
      );

      result.current.forEach((plan, index) => {
        expect(plan.name).toBe(mockPlans[index].name);
        expect(plan.price).toBe(mockPlans[index].price);
        expect(plan.description).toEqual(mockPlans[index].description);
        expect(plan.age).toBe(mockPlans[index].age);
      });
    });
  });

  describe('memoization', () => {
    it('should return same reference when props do not change', () => {
      const { result, rerender } = renderHook(
        ({ plans, variant }) => usePlanCards({ plans, variant }),
        {
          initialProps: {
            plans: mockPlans,
            variant: 'for_me' as QuoteTarget,
          }
        }
      );

      const firstResult = result.current;
      rerender({ plans: mockPlans, variant: 'for_me' as QuoteTarget });
      const secondResult = result.current;

      expect(firstResult).toBe(secondResult); // Same reference due to memoization
    });

    it('should return new reference when variant changes', () => {
      const { result, rerender } = renderHook(
        ({ plans, variant }) => usePlanCards({ plans, variant }),
        {
          initialProps: {
            plans: mockPlans,
            variant: 'for_me' as QuoteTarget,
          }
        }
      );

      const firstResult = result.current;
      rerender({ plans: mockPlans, variant: 'for_others' as QuoteTarget });
      const secondResult = result.current;

      expect(firstResult).not.toBe(secondResult); // Different reference
    });
  });
});
