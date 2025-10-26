import {
  formatPrice,
  applyDiscount,
  getPlanIcon,
  getHighlightTokens,
  DISCOUNT_RATE
} from './utils';

describe('planUtils', () => {
  describe('formatPrice', () => {
    it('should format whole numbers with two decimal places', () => {
      expect(formatPrice(100)).toBe('$100.00');
    });

    it('should format decimal numbers correctly', () => {
      expect(formatPrice(35.5)).toBe('$35.50');
      expect(formatPrice(99.99)).toBe('$99.99');
    });

    it('should handle zero correctly', () => {
      expect(formatPrice(0)).toBe('$0.00');
    });

    it('should format large numbers correctly', () => {
      expect(formatPrice(1000.50)).toBe('$1000.50');
    });

    it('should round to two decimal places', () => {
      expect(formatPrice(35.456)).toBe('$35.46');
    });
  });

  describe('applyDiscount', () => {
    it('should apply default 5% discount correctly', () => {
      const result = applyDiscount(100);
      expect(result).toBe(95.00);
    });

    it('should apply custom discount rate correctly', () => {
      const result = applyDiscount(100, 0.10); // 10% discount
      expect(result).toBe(90.00);
    });

    it('should handle decimal prices correctly', () => {
      const result = applyDiscount(35.50, DISCOUNT_RATE);
      expect(result).toBe(33.73);
    });

    it('should return correct value for zero price', () => {
      const result = applyDiscount(0);
      expect(result).toBe(0);
    });

    it('should round to 2 decimal places', () => {
      const result = applyDiscount(33.33, 0.05);
      expect(result).toBe(31.66);
    });

    it('should handle 100% discount', () => {
      const result = applyDiscount(100, 1.0);
      expect(result).toBe(0);
    });

    it('should handle no discount (0%)', () => {
      const result = applyDiscount(100, 0);
      expect(result).toBe(100);
    });
  });

  describe('getPlanIcon', () => {
    it('should return correct icon for "Plan en Casa"', () => {
      expect(getPlanIcon('Plan en Casa')).toBe('/icons/IcHomeLight.svg');
    });

    it('should return correct icon for "Plan en Casa y Clínica"', () => {
      expect(getPlanIcon('Plan en Casa y Clínica')).toBe('/icons/IcHospitalLight.svg');
    });

    it('should handle plan names with extra spaces', () => {
      expect(getPlanIcon('  Plan en Casa  ')).toBe('/icons/IcHomeLight.svg');
    });

    it('should return default icon for unknown plan', () => {
      expect(getPlanIcon('Unknown Plan')).toBe('/icons/IcHomeLight.svg');
    });

    it('should return default icon for empty string', () => {
      expect(getPlanIcon('')).toBe('/icons/IcHomeLight.svg');
    });

    it('should handle "Plan en Casa + Chequeo " with trailing space', () => {
      expect(getPlanIcon('Plan en Casa + Chequeo ')).toBe('/icons/IcHomeLight.svg');
    });
  });

  describe('getHighlightTokens', () => {
    it('should return empty array for empty string', () => {
      expect(getHighlightTokens('')).toEqual([]);
    });

    it('should return single non-bold token for text without highlights', () => {
      const result = getHighlightTokens('Some regular text');
      expect(result).toEqual([
        { value: 'Some regular text', bold: false }
      ]);
    });

    it('should highlight "Videoconsulta" correctly', () => {
      const result = getHighlightTokens('Incluye Videoconsulta gratis');
      expect(result).toEqual([
        { value: 'Incluye ', bold: false },
        { value: 'Videoconsulta', bold: true },
        { value: ' gratis', bold: false }
      ]);
    });

    it('should highlight "Médico general a domicilio" correctly', () => {
      const result = getHighlightTokens('Médico general a domicilio disponible');
      expect(result).toEqual([
        { value: 'Médico general a domicilio', bold: true },
        { value: ' disponible', bold: false }
      ]);
    });

    it('should handle multiple highlights in same text', () => {
      const result = getHighlightTokens('Videoconsulta y Vacunas incluidas');
      expect(result).toEqual([
        { value: 'Videoconsulta', bold: true },
        { value: ' y ', bold: false },
        { value: 'Vacunas', bold: true },
        { value: ' incluidas', bold: false }
      ]);
    });

    it('should handle text with only highlighted phrase', () => {
      const result = getHighlightTokens('Videoconsulta');
      expect(result).toEqual([
        { value: 'Videoconsulta', bold: true }
      ]);
    });

    it('should handle highlight at the beginning', () => {
      const result = getHighlightTokens('Indemnización por enfermedad');
      expect(result).toEqual([
        { value: 'Indemnización', bold: true },
        { value: ' por enfermedad', bold: false }
      ]);
    });

    it('should handle highlight at the end', () => {
      const result = getHighlightTokens('Chequeo con Vacunas');
      expect(result).toEqual([
        { value: 'Chequeo con ', bold: false },
        { value: 'Vacunas', bold: true }
      ]);
    });

    it('should not create overlapping highlights', () => {
      // This tests the non-overlapping logic
      const result = getHighlightTokens('más de 200 clínicas del país. Videoconsulta');
      expect(result.length).toBeGreaterThan(0);
      expect(result).toEqual([
        { value: 'más de 200 clínicas del país.', bold: true },
        { value: ' ', bold: false },
        { value: 'Videoconsulta', bold: true }
      ]);
    });
  });
});
