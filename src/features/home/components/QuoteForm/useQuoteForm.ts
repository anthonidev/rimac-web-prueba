'use client';

import { type ChangeEvent } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  type UseFormRegisterReturn,
  type UseFormReturn,
  useForm,
  useWatch,
} from 'react-hook-form';
import { z } from 'zod';

const documentTypes = ['DNI', 'RUC'] as const;

const quoteFormSchema = z
  .object({
    documentType: z.enum(documentTypes),
    documentNumber: z
      .string()
      .min(1, 'Ingresa tu número de documento')
      .regex(/^\d+$/, 'Solo se permiten números'),
    phone: z
      .string()
      .min(1, 'Ingresa tu número de celular')
      .regex(/^\d+$/, 'Solo se permiten números'),
    acceptPrivacy: z
      .boolean()
      .refine((value) => value, 'Debes aceptar la Política de Privacidad'),
    acceptCommunications: z
      .boolean()
      .refine((value) => value, 'Debes aceptar las Comunicaciones Comerciales'),
  })
  .superRefine((data, ctx) => {
    const limit = data.documentType === 'DNI' ? 8 : 11;

    if (data.documentNumber.length !== limit) {
      ctx.addIssue({
        path: ['documentNumber'],
        code: z.ZodIssueCode.custom,
        message:
          data.documentType === 'DNI'
            ? 'El DNI debe tener 8 dígitos'
            : 'El RUC debe tener 11 dígitos',
      });
    }
  });

type QuoteFormValues = z.infer<typeof quoteFormSchema>;

interface UseQuoteFormResult {
  register: UseFormReturn<QuoteFormValues>['register'];
  handleSubmit: UseFormReturn<QuoteFormValues>['handleSubmit'];
  errors: UseFormReturn<QuoteFormValues>['formState']['errors'];
  currentDocumentType: QuoteFormValues['documentType'];
  documentTypeField: UseFormRegisterReturn;
  handleDocumentTypeChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export function useQuoteForm(): UseQuoteFormResult {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState,
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      documentType: 'DNI',
      documentNumber: '',
      phone: '',
      acceptPrivacy: false,
      acceptCommunications: false,
    },
    mode: 'onBlur',
  });

  const currentDocumentType =
    useWatch({ control, name: 'documentType' }) ?? 'DNI';

  const documentTypeField = register('documentType');

  const handleDocumentTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    documentTypeField.onChange(event);

    const newType = event.target.value as QuoteFormValues['documentType'];
    const maxLength = newType === 'DNI' ? 8 : 11;
    const currentValue = getValues('documentNumber');

    if (currentValue.length > maxLength) {
      setValue('documentNumber', currentValue.slice(0, maxLength), {
        shouldValidate: true,
      });
    }
  };

  return {
    register,
    handleSubmit,
    errors: formState.errors,
    currentDocumentType,
    documentTypeField,
    handleDocumentTypeChange,
  };
}

export type { QuoteFormValues };
export { quoteFormSchema, documentTypes };
