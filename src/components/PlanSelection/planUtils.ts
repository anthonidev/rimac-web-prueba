export const DISCOUNT_RATE = 0.05;

const PLAN_ICON_MAP: Record<string, string> = {
  'Plan en Casa': '/icons/IcHomeLight.svg',
  'Plan en Casa y Clínica': '/icons/IcHospitalLight.svg',
  'Plan en Casa + Chequeo': '/icons/IcHomeLight.svg',
  'Plan en Casa + Chequeo ': '/icons/IcHomeLight.svg',
  'Plan en Casa + Fitness': '/icons/IcHomeLight.svg',
  'Plan en Casa + Bienestar': '/icons/IcHomeLight.svg',
};

export type HighlightToken = {
  value: string;
  bold: boolean;
};

const HIGHLIGHT_PHRASES = [
  'Médico general a domicilio',
  'Videoconsulta',
  'Indemnización',
  'Consultas en clínica',
  'Medicinas y exámenes',
  'más de 200 clínicas del país.',
  'Un Chequeo preventivo general',
  'Vacunas',
  'Incluye todos los beneficios del Plan en Casa.',
];

export function getPlanIcon(name: string): string {
  const normalizedName = name.trim();
  return PLAN_ICON_MAP[normalizedName] ?? '/icons/IcHomeLight.svg';
}

export function applyDiscount(price: number, discountRate: number = DISCOUNT_RATE): number {
  const discounted = price * (1 - discountRate);
  return Number(discounted.toFixed(2));
}

export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

export function getHighlightTokens(text: string): HighlightToken[] {
  if (!text) {
    return [];
  }

  const matches: Array<{ start: number; end: number }> = [];

  HIGHLIGHT_PHRASES.forEach((phrase) => {
    let searchStart = 0;
    while (searchStart < text.length) {
      const index = text.indexOf(phrase, searchStart);
      if (index === -1) {
        break;
      }
      matches.push({ start: index, end: index + phrase.length });
      searchStart = index + phrase.length;
    }
  });

  if (!matches.length) {
    return [{ value: text, bold: false }];
  }

  const nonOverlapping = matches
    .sort((a, b) => a.start - b.start)
    .reduce<Array<{ start: number; end: number }>>((acc, match) => {
      const last = acc[acc.length - 1];
      if (!last || match.start >= last.end) {
        acc.push(match);
      }
      return acc;
    }, []);

  const tokens: HighlightToken[] = [];
  let currentIndex = 0;

  nonOverlapping.forEach((match) => {
    if (currentIndex < match.start) {
      tokens.push({ value: text.slice(currentIndex, match.start), bold: false });
    }

    tokens.push({ value: text.slice(match.start, match.end), bold: true });
    currentIndex = match.end;
  });

  if (currentIndex < text.length) {
    tokens.push({ value: text.slice(currentIndex), bold: false });
  }

  return tokens;
}
