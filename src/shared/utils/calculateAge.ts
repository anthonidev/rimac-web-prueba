/**
 * Calculates age based on birthdate string in DD-MM-YYYY format
 * @param birthDate - Date string in format DD-MM-YYYY
 * @returns Age in years
 */
export function calculateAge(birthDate: string): number {
  const [day, month, year] = birthDate.split('-').map(Number);
  const birth = new Date(year, month - 1, day);
  const today = new Date();

  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}
