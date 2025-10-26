import { calculateAge } from './calculateAge';

describe('calculateAge', () => {
  beforeEach(() => {
    // Mock current date to 2025-10-25 for consistent tests (using local timezone)
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2025, 9, 25, 12, 0, 0)); // Oct 25, 2025 at noon local time
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should calculate age correctly for a birthday that already passed this year', () => {
    // Person born on 03-01-1990, tested on 2025-10-25
    const birthDate = '03-01-1990';
    const age = calculateAge(birthDate);
    expect(age).toBe(35);
  });

  it('should calculate age correctly for a birthday that has not passed yet this year', () => {
    // Person born on 15-12-1990, tested on 2025-10-25
    const birthDate = '15-12-1990';
    const age = calculateAge(birthDate);
    expect(age).toBe(34); // Birthday hasn't happened yet in 2025
  });

  it('should calculate age correctly for someone born today', () => {
    const birthDate = '25-10-2025';
    const age = calculateAge(birthDate);
    expect(age).toBe(0);
  });

  it('should calculate age correctly for someone born exactly one year ago', () => {
    const birthDate = '25-10-2024';
    const age = calculateAge(birthDate);
    expect(age).toBe(1);
  });

  it('should handle dates with single digit day and month', () => {
    const birthDate = '5-3-2000';
    const age = calculateAge(birthDate);
    expect(age).toBe(25); // Birthday already passed (March)
  });

  it('should handle leap year birthdays correctly', () => {
    // Person born on Feb 29, 2000 (leap year)
    const birthDate = '29-02-2000';
    const age = calculateAge(birthDate);
    expect(age).toBe(25); // Birthday already passed
  });

  it('should calculate correct age when tested on birthday', () => {
    // Mock to the birthday
    jest.setSystemTime(new Date(2025, 0, 15, 12, 0, 0)); // Jan 15, 2025 at noon local time
    const birthDate = '15-01-1995';
    const age = calculateAge(birthDate);
    expect(age).toBe(30); // Exactly 30 on birthday
  });

  it('should calculate correct age one day before birthday', () => {
    // Mock to one day before birthday
    jest.setSystemTime(new Date(2025, 0, 14, 12, 0, 0)); // Jan 14, 2025 at noon local time
    const birthDate = '15-01-1995';
    const age = calculateAge(birthDate);
    expect(age).toBe(29); // Still 29, birthday tomorrow
  });

  it('should handle people born in the 20th century correctly', () => {
    const birthDate = '10-06-1985';
    const age = calculateAge(birthDate);
    expect(age).toBe(40); // Birthday already passed (June)
  });

  it('should handle young children correctly', () => {
    const birthDate = '01-01-2023';
    const age = calculateAge(birthDate);
    expect(age).toBe(2);
  });
});
