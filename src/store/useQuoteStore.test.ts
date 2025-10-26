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

  it('should set and update user data correctly', () => {
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

  it('should set and clear chosen plan', () => {
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
