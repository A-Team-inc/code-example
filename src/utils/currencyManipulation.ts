import { toNumber } from 'utils/math';

export const currencies = {
  USD: 'USD'
};

export const currencyFormat = (
  value: number | string | unknown,
  location: string,
  currency?: string,
  compact?: boolean,
  digits?: number
) => {
  if (value === undefined || typeof value !== 'number') return '—';
  if (digits === undefined) digits = 0;
  const factors = compact && compactFactors(value);
  const nValue = factors ? toNumber((value / factors.value).toFixed(digits)) : value;

  return (
    new Intl.NumberFormat(location, {
      maximumSignificantDigits: 4,
      style: 'currency',
      currency: currency || currencies.USD
    }).format(nValue) + (factors ? factors.symbol : '')
  );
};

export const compactFactors = (value: number): { value: number; symbol: string } => {
  const si = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'B' }
  ];
  let i;
  for (i = si.length - 1; i > 0; i--) {
    if (value >= si[i].value) {
      break;
    }
  }
  return si[i];
};

export const compact = (value?: number, digits?: number) => {
  if (value === undefined) return;
  if (digits === undefined) digits = 0;
  const factors = compactFactors(value);

  return (value / factors.value).toFixed(digits) + factors.symbol;
};

export const currencyManager = (
  array: { percentage: number }[],
  total: number,
  compact?: boolean,
  digits?: number
) => {
  return array.map((element) => {
    const newValue = currencyFormat(
      (total * element.percentage) / 100,
      'en-US',
      undefined,
      compact,
      digits
    );

    return {
      ...element,
      amount: newValue
    };
  });
};
