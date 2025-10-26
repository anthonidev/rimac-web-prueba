export type QuoteTarget = 'for_me' | 'for_others';

export type QuoteTargetOption = {
  label: string;
  value: QuoteTarget;
  icon: string;
  description: string;
};

export type PlanStep = {
  number: number;
  label: string;
};
