import { quoteFormSchema } from './useQuoteForm';

describe('QuoteForm Validation Schema', () => {
  describe('DNI validation', () => {
    it('should validate correct DNI with 8 digits', () => {
      const validData = {
        documentType: 'DNI' as const,
        documentNumber: '30216147',
        phone: '5130216147',
        acceptPrivacy: true,
        acceptCommunications: true,
      };

      const result = quoteFormSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject DNI with less than 8 digits', () => {
      const invalidData = {
        documentType: 'DNI' as const,
        documentNumber: '1234567', // 7 digits
        phone: '5130216147',
        acceptPrivacy: true,
        acceptCommunications: true,
      };

      const result = quoteFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('El DNI debe tener 8 dígitos');
      }
    });

    it('should reject DNI with more than 8 digits', () => {
      const invalidData = {
        documentType: 'DNI' as const,
        documentNumber: '123456789', // 9 digits
        phone: '5130216147',
        acceptPrivacy: true,
        acceptCommunications: true,
      };

      const result = quoteFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('El DNI debe tener 8 dígitos');
      }
    });

    it('should reject DNI with non-numeric characters', () => {
      const invalidData = {
        documentType: 'DNI' as const,
        documentNumber: '1234567a',
        phone: '5130216147',
        acceptPrivacy: true,
        acceptCommunications: true,
      };

      const result = quoteFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some(issue => issue.message === 'Solo se permiten números')).toBe(true);
      }
    });

    it('should reject empty DNI', () => {
      const invalidData = {
        documentType: 'DNI' as const,
        documentNumber: '',
        phone: '5130216147',
        acceptPrivacy: true,
        acceptCommunications: true,
      };

      const result = quoteFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Ingresa tu número de documento');
      }
    });
  });

  describe('RUC validation', () => {
    it('should validate correct RUC with 11 digits', () => {
      const validData = {
        documentType: 'RUC' as const,
        documentNumber: '20123456789',
        phone: '5130216147',
        acceptPrivacy: true,
        acceptCommunications: true,
      };

      const result = quoteFormSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject RUC with less than 11 digits', () => {
      const invalidData = {
        documentType: 'RUC' as const,
        documentNumber: '2012345678', // 10 digits
        phone: '5130216147',
        acceptPrivacy: true,
        acceptCommunications: true,
      };

      const result = quoteFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('El RUC debe tener 11 dígitos');
      }
    });

    it('should reject RUC with more than 11 digits', () => {
      const invalidData = {
        documentType: 'RUC' as const,
        documentNumber: '201234567890', // 12 digits
        phone: '5130216147',
        acceptPrivacy: true,
        acceptCommunications: true,
      };

      const result = quoteFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('El RUC debe tener 11 dígitos');
      }
    });
  });

  describe('Phone validation', () => {
    it('should validate correct phone number', () => {
      const validData = {
        documentType: 'DNI' as const,
        documentNumber: '30216147',
        phone: '5130216147',
        acceptPrivacy: true,
        acceptCommunications: true,
      };

      const result = quoteFormSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject empty phone', () => {
      const invalidData = {
        documentType: 'DNI' as const,
        documentNumber: '30216147',
        phone: '',
        acceptPrivacy: true,
        acceptCommunications: true,
      };

      const result = quoteFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Ingresa tu número de celular');
      }
    });

    it('should reject phone with non-numeric characters', () => {
      const invalidData = {
        documentType: 'DNI' as const,
        documentNumber: '30216147',
        phone: '513021614a',
        acceptPrivacy: true,
        acceptCommunications: true,
      };

      const result = quoteFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some(issue => issue.message === 'Solo se permiten números')).toBe(true);
      }
    });
  });

  describe('Privacy policy validation', () => {
    it('should reject when privacy policy is not accepted', () => {
      const invalidData = {
        documentType: 'DNI' as const,
        documentNumber: '30216147',
        phone: '5130216147',
        acceptPrivacy: false,
        acceptCommunications: true,
      };

      const result = quoteFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Debes aceptar la Política de Privacidad');
      }
    });

    it('should validate when privacy policy is accepted', () => {
      const validData = {
        documentType: 'DNI' as const,
        documentNumber: '30216147',
        phone: '5130216147',
        acceptPrivacy: true,
        acceptCommunications: true,
      };

      const result = quoteFormSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });

  describe('Communications validation', () => {
    it('should reject when communications policy is not accepted', () => {
      const invalidData = {
        documentType: 'DNI' as const,
        documentNumber: '30216147',
        phone: '5130216147',
        acceptPrivacy: true,
        acceptCommunications: false,
      };

      const result = quoteFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Debes aceptar las Comunicaciones Comerciales');
      }
    });

    it('should validate when communications policy is accepted', () => {
      const validData = {
        documentType: 'DNI' as const,
        documentNumber: '30216147',
        phone: '5130216147',
        acceptPrivacy: true,
        acceptCommunications: true,
      };

      const result = quoteFormSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });

  describe('Complete form validation', () => {
    it('should reject form with all fields invalid', () => {
      const invalidData = {
        documentType: 'DNI' as const,
        documentNumber: '',
        phone: '',
        acceptPrivacy: false,
        acceptCommunications: false,
      };

      const result = quoteFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        // Should have multiple errors
        expect(result.error.issues.length).toBeGreaterThan(1);
      }
    });

    it('should validate complete valid form', () => {
      const validData = {
        documentType: 'DNI' as const,
        documentNumber: '30216147',
        phone: '5130216147',
        acceptPrivacy: true,
        acceptCommunications: true,
      };

      const result = quoteFormSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });
});
