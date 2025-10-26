import type { PlanStep, QuoteTargetOption } from './types';

export const STEPS: PlanStep[] = [
  { number: 1, label: 'Planes y coberturas' },
  { number: 2, label: 'Resumen' },
];

export const QUOTE_TARGET_OPTIONS: QuoteTargetOption[] = [
  {
    label: 'Para mí',
    value: 'for_me',
    icon: '/icons/IcProtectionLight.svg',
    description: 'Cotiza tu seguro de salud y agrega familiares si así lo deseas.',
  },
  {
    label: 'Para alguien más',
    value: 'for_others',
    icon: '/icons/IcAddUserLight.svg',
    description: 'Realiza una cotización para uno de tus familiares o cualquier persona.',
  },
];

export const RECOMMENDED_PLAN_NAME = 'Plan en Casa y Clínica';
