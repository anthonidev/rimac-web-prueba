import { renderHook, act } from '@testing-library/react';
import { useQuoteStore } from './useQuoteStore';
import type { UserData, SelectedPlan } from './useQuoteStore';

describe('useQuoteStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    const { result } = renderHook(() => useQuoteStore());
    act(() => {
      result.current.clearUserData();
    });
  });

  it('should have initial state with null values', () => {
    const { result } = renderHook(() => useQuoteStore());

    expect(result.current.userData).toBeNull();
    expect(result.current.chosenPlan).toBeNull();
  });

  it('should set user data correctly', () => {
    const { result } = renderHook(() => useQuoteStore());

    const mockUserData: UserData = {
      name: 'John',
      lastName: 'Doe',
      documentNumber: '30216147',
      phone: '5130216147',
      plans: [
        {
          name: 'Plan en Casa',
          price: 35.00,
          description: ['Cobertura básica'],
          age: 18
        }
      ]
    };

    act(() => {
      result.current.setUserData(mockUserData);
    });

    expect(result.current.userData).toEqual(mockUserData);
  });

  it('should update user data when called multiple times', () => {
    const { result } = renderHook(() => useQuoteStore());

    const userData1: UserData = {
      name: 'John',
      lastName: 'Doe',
      documentNumber: '12345678',
      phone: '987654321',
      plans: []
    };

    const userData2: UserData = {
      name: 'Jane',
      lastName: 'Smith',
      documentNumber: '87654321',
      phone: '123456789',
      plans: []
    };

    act(() => {
      result.current.setUserData(userData1);
    });
    expect(result.current.userData).toEqual(userData1);

    act(() => {
      result.current.setUserData(userData2);
    });
    expect(result.current.userData).toEqual(userData2);
  });

  it('should set chosen plan correctly', () => {
    const { result } = renderHook(() => useQuoteStore());

    const mockPlan: SelectedPlan = {
      name: 'Plan en Casa',
      originalPrice: 35.00,
      finalPrice: 33.25,
      description: ['Cobertura básica', 'Videoconsulta'],
      hasDiscount: true
    };

    act(() => {
      result.current.setChosenPlan(mockPlan);
    });

    expect(result.current.chosenPlan).toEqual(mockPlan);
  });

  it('should clear chosen plan when set to null', () => {
    const { result } = renderHook(() => useQuoteStore());

    const mockPlan: SelectedPlan = {
      name: 'Plan en Casa',
      originalPrice: 35.00,
      finalPrice: 35.00,
      description: ['Cobertura'],
      hasDiscount: false
    };

    act(() => {
      result.current.setChosenPlan(mockPlan);
    });
    expect(result.current.chosenPlan).toEqual(mockPlan);

    act(() => {
      result.current.setChosenPlan(null);
    });
    expect(result.current.chosenPlan).toBeNull();
  });

  it('should clear all data when clearUserData is called', () => {
    const { result } = renderHook(() => useQuoteStore());

    const mockUserData: UserData = {
      name: 'John',
      lastName: 'Doe',
      documentNumber: '30216147',
      phone: '5130216147',
      plans: []
    };

    const mockPlan: SelectedPlan = {
      name: 'Plan en Casa',
      originalPrice: 35.00,
      finalPrice: 35.00,
      description: ['Cobertura'],
      hasDiscount: false
    };

    act(() => {
      result.current.setUserData(mockUserData);
      result.current.setChosenPlan(mockPlan);
    });

    expect(result.current.userData).toEqual(mockUserData);
    expect(result.current.chosenPlan).toEqual(mockPlan);

    act(() => {
      result.current.clearUserData();
    });

    expect(result.current.userData).toBeNull();
    expect(result.current.chosenPlan).toBeNull();
  });

  it('should handle setting user data with multiple plans', () => {
    const { result } = renderHook(() => useQuoteStore());

    const mockUserData: UserData = {
      name: 'María',
      lastName: 'García',
      documentNumber: '30216147',
      phone: '5130216147',
      plans: [
        {
          name: 'Plan en Casa',
          price: 35.00,
          description: ['Videoconsulta', 'Médico general a domicilio'],
          age: 25
        },
        {
          name: 'Plan en Casa y Clínica',
          price: 55.00,
          description: ['Consultas en clínica', 'Videoconsulta'],
          age: 25
        }
      ]
    };

    act(() => {
      result.current.setUserData(mockUserData);
    });

    expect(result.current.userData).toEqual(mockUserData);
    expect(result.current.userData?.plans).toHaveLength(2);
  });

  it('should persist state across multiple hook calls', () => {
    const { result: result1 } = renderHook(() => useQuoteStore());

    const mockUserData: UserData = {
      name: 'Test',
      lastName: 'User',
      documentNumber: '12345678',
      phone: '987654321',
      plans: []
    };

    act(() => {
      result1.current.setUserData(mockUserData);
    });

    // Create a new hook instance - should have the same state
    const { result: result2 } = renderHook(() => useQuoteStore());

    expect(result2.current.userData).toEqual(mockUserData);
  });
});
