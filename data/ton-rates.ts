export type TonPlan = "ton-mega-plus" | "ton-top";
export type TapTonPlan = "tap-ton";
export type CardBrandGroup = "visa-master" | "elo-amex";
export type Settlement = "same-day" | "one-business-day";

export type SalesTier =
  | "promotional"
  | "up-to-3000"
  | "3000-6000"
  | "6000-10000"
  | "10000-30000"
  | "over-30000"
  | "top-up-to-6000"
  | "top-6000-10000"
  | "top-10000-20000"
  | "top-20000-30000"
  | "top-over-30000";

export type InstallmentRates = {
  debit: number;
  credit: number;
  installments: number[];
};

export type TonRateConfig = {
  plan: TonPlan;
  salesTier: SalesTier;
  brand: CardBrandGroup;
  settlement: Settlement;
  rates: InstallmentRates;
};

export type TapTonRateConfig = {
  brand: CardBrandGroup;
  settlement: Settlement;
  rates: InstallmentRates;
};

export const settlementOptions = [
  { value: "same-day" as const, label: "Na hora" },
  { value: "one-business-day" as const, label: "1 dia útil" },
];

export const brandOptions = [
  { value: "visa-master" as const, label: "Mastercard e Visa" },
  { value: "elo-amex" as const, label: "Elo e Amex" },
];

export const planOptions = [
  { value: "ton-mega-plus" as const, label: "Ton Mega+", available: true },
  { value: "ton-top" as const, label: "Ton Top", available: true },
];

export const salesTierOptions = [
  { value: "promotional" as const, label: "Período Promocional", plan: "ton-mega-plus" as const },
  { value: "up-to-3000" as const, label: "Até R$ 3 mil", plan: "ton-mega-plus" as const },
  { value: "3000-6000" as const, label: "De R$ 3 mil a R$ 6 mil", plan: "ton-mega-plus" as const },
  { value: "6000-10000" as const, label: "De R$ 6 mil a R$ 10 mil", plan: "ton-mega-plus" as const },
  { value: "10000-30000" as const, label: "De R$ 10 mil a R$ 30 mil", plan: "ton-mega-plus" as const },
  { value: "over-30000" as const, label: "Acima de R$ 30 mil", plan: "ton-mega-plus" as const },
  { value: "top-up-to-6000" as const, label: "Até R$ 6 mil", plan: "ton-top" as const },
  { value: "top-6000-10000" as const, label: "De R$ 6 mil a R$ 10 mil", plan: "ton-top" as const },
  { value: "top-10000-20000" as const, label: "De R$ 10 mil a R$ 20 mil", plan: "ton-top" as const },
  { value: "top-20000-30000" as const, label: "De R$ 20 mil a R$ 30 mil", plan: "ton-top" as const },
  { value: "top-over-30000" as const, label: "Acima de R$ 30 mil", plan: "ton-top" as const },
];

export const installmentOptions = [
  { value: 0, label: "Débito" },
  { value: 1, label: "Crédito à vista" },
  ...Array.from({ length: 20 }, (_, index) => ({
    value: index + 2,
    label: `Crédito ${index + 2}x`,
  })),
];

export const TON_RATE_NOTES = {
  megaPromotional: "Taxas promocionais válidas durante 30 dias ou até vender R$ 5 mil, o que vier primeiro.",
  top: "Taxas de acordo com suas vendas mensais.",
} as const;

export const tapTonRateConfigs: TapTonRateConfig[] = [
  {
    brand: "visa-master",
    settlement: "same-day",
    rates: {
      debit: 0.87,
      credit: 3.08,
      installments: [5.79, 6.59, 8.39, 8.59, 8.69, 9.99, 10.19, 10.85, 11.55, 12.25, 12.35, 12.94, 14.01, 15.03, 16.13, 17.21, 18.49, 19.77, 21.05, 22.33],
    },
  },
  {
    brand: "elo-amex",
    settlement: "same-day",
    rates: {
      debit: 2.06,
      credit: 4.27,
      installments: [6.98, 7.78, 9.58, 9.78, 9.88, 11.18, 11.38, 12.04, 12.74, 13.44, 13.54, 14.18, 14.82, 16.22, 17.32, 18.4, 19.68, 20.96, 22.24, 23.52],
    },
  },
  {
    brand: "visa-master",
    settlement: "one-business-day",
    rates: {
      debit: 0.57,
      credit: 3.05,
      installments: [5.75, 6.55, 8.29, 8.55, 8.65, 9.95, 10.09, 10.79, 11.49, 12.19, 12.29, 12.84, 13.91, 14.93, 16.03, 17.11, 18.39, 19.67, 20.95, 22.23],
    },
  },
  {
    brand: "elo-amex",
    settlement: "one-business-day",
    rates: {
      debit: 1.98,
      credit: 4.24,
      installments: [6.94, 7.74, 9.48, 9.74, 9.84, 11.14, 11.28, 11.98, 12.68, 13.38, 13.48, 14.12, 14.76, 16.21, 17.31, 18.39, 19.67, 20.95, 22.23, 23.51],
    },
  },
];

export const tonRateConfigs: TonRateConfig[] = [
  {
    plan: "ton-mega-plus",
    salesTier: "10000-30000",
    brand: "elo-amex",
    settlement: "one-business-day",
    rates: {
      debit: 2.51,
      credit: 4.31,
      installments: [6.82, 7.55, 9.28, 10, 10.71, 11.42, 12.12, 12.38, 12.58, 13.92, 14.02, 14.88, 15.83, 16.69, 18.19, 19.02, 20.02, 20.52, 21.02, 21.52],
    },
  },
  {
    plan: "ton-mega-plus",
    salesTier: "10000-30000",
    brand: "elo-amex",
    settlement: "same-day",
    rates: {
      debit: 2.54,
      credit: 4.34,
      installments: [8.03, 9.63, 10.33, 11.2, 12.54, 13.12, 13.17, 13.22, 13.42, 14.13, 14.24, 15.38, 16.33, 17.19, 18.69, 19.52, 20.52, 21.02, 21.52, 22.02],
    },
  },
  {
    plan: "ton-mega-plus",
    salesTier: "10000-30000",
    brand: "visa-master",
    settlement: "one-business-day",
    rates: {
      debit: 1.22,
      credit: 3.02,
      installments: [5.38, 6.11, 7.84, 8.56, 9.27, 9.98, 10.68, 10.94, 10.99, 11.67, 11.73, 12.59, 13.54, 14.4, 15.9, 16.73, 17.73, 18.23, 18.73, 19.23],
    },
  },
  {
    plan: "ton-mega-plus",
    salesTier: "10000-30000",
    brand: "visa-master",
    settlement: "same-day",
    rates: {
      debit: 1.25,
      credit: 3.05,
      installments: [6.59, 8.19, 8.89, 9.76, 11.1, 11.68, 11.73, 11.78, 11.83, 11.88, 11.95, 13.09, 14.04, 14.9, 16.4, 17.23, 18.23, 18.73, 19.23, 19.73],
    },
  },
  {
    plan: "ton-mega-plus",
    salesTier: "3000-6000",
    brand: "elo-amex",
    settlement: "one-business-day",
    rates: {
      debit: 2.68,
      credit: 4.63,
      installments: [8.73, 9.79, 10.67, 11.54, 12.29, 12.34, 12.39, 12.44, 12.64, 13.98, 14.67, 16.15, 17.09, 17.91, 19.41, 20.22, 21.22, 21.72, 22.22, 22.72],
    },
  },
  {
    plan: "ton-mega-plus",
    salesTier: "3000-6000",
    brand: "elo-amex",
    settlement: "same-day",
    rates: {
      debit: 2.72,
      credit: 4.65,
      installments: [8.82, 10.41, 11.07, 11.94, 12.62, 13.63, 14.48, 14.51, 14.71, 15.42, 15.51, 16.65, 17.59, 18.41, 19.91, 20.72, 21.72, 22.22, 22.72, 23.22],
    },
  },
  {
    plan: "ton-mega-plus",
    salesTier: "3000-6000",
    brand: "visa-master",
    settlement: "one-business-day",
    rates: {
      debit: 1.39,
      credit: 3.34,
      installments: [7.29, 8.35, 9.23, 10.1, 10.85, 10.9, 10.95, 11, 11.05, 11.73, 12.38, 13.86, 14.8, 15.62, 17.12, 17.93, 18.93, 19.43, 19.93, 20.43],
    },
  },
  {
    plan: "ton-mega-plus",
    salesTier: "3000-6000",
    brand: "visa-master",
    settlement: "same-day",
    rates: {
      debit: 1.43,
      credit: 3.36,
      installments: [7.38, 8.97, 9.63, 10.5, 11.18, 12.19, 13.04, 13.07, 13.12, 13.17, 13.22, 14.36, 15.3, 16.12, 17.62, 18.43, 19.43, 19.93, 20.43, 20.93],
    },
  },
  {
    plan: "ton-mega-plus",
    salesTier: "6000-10000",
    brand: "elo-amex",
    settlement: "one-business-day",
    rates: {
      debit: 2.61,
      credit: 4.54,
      installments: [8.13, 9.2, 10.08, 10.95, 11.81, 12.31, 12.36, 12.41, 12.61, 13.95, 14.64, 15.59, 16.54, 17.44, 18.94, 19.77, 20.77, 21.27, 21.77, 22.27],
    },
  },
  {
    plan: "ton-mega-plus",
    salesTier: "6000-10000",
    brand: "elo-amex",
    settlement: "same-day",
    rates: {
      debit: 2.63,
      credit: 4.6,
      installments: [8.62, 10, 10.88, 11.75, 12.61, 13.44, 13.94, 13.99, 14.17, 14.86, 14.95, 16.09, 17.04, 17.94, 19.44, 20.27, 21.27, 21.77, 22.27, 22.77],
    },
  },
  {
    plan: "ton-mega-plus",
    salesTier: "6000-10000",
    brand: "visa-master",
    settlement: "one-business-day",
    rates: {
      debit: 1.32,
      credit: 3.25,
      installments: [6.69, 7.76, 8.64, 9.51, 10.37, 10.87, 10.92, 10.97, 11.02, 11.7, 12.35, 13.3, 14.25, 15.15, 16.65, 17.48, 18.48, 18.98, 19.48, 19.98],
    },
  },
  {
    plan: "ton-mega-plus",
    salesTier: "6000-10000",
    brand: "visa-master",
    settlement: "same-day",
    rates: {
      debit: 1.34,
      credit: 3.31,
      installments: [7.18, 8.56, 9.44, 10.31, 11.17, 12, 12.5, 12.55, 12.58, 12.61, 12.66, 13.8, 14.75, 15.65, 17.15, 17.98, 18.98, 19.48, 19.98, 20.48],
    },
  },
  {
    plan: "ton-mega-plus",
    salesTier: "over-30000",
    brand: "elo-amex",
    settlement: "one-business-day",
    rates: {
      debit: 2.48,
      credit: 4.14,
      installments: [6.77, 7.5, 9.23, 9.95, 10.66, 11.37, 12.07, 12.35, 12.55, 13.71, 13.8, 14.86, 15.81, 16.54, 18.04, 18.87, 19.87, 20.37, 20.87, 21.37],
    },
  },
  {
    plan: "ton-mega-plus",
    salesTier: "over-30000",
    brand: "elo-amex",
    settlement: "same-day",
    rates: {
      debit: 2.51,
      credit: 4.2,
      installments: [7.98, 9.58, 10.28, 11.15, 12.23, 12.28, 12.33, 12.38, 12.58, 13.88, 14.02, 15.36, 16.31, 17.04, 18.54, 19.37, 20.37, 20.87, 21.37, 21.87],
    },
  },
  {
    plan: "ton-mega-plus",
    salesTier: "over-30000",
    brand: "visa-master",
    settlement: "one-business-day",
    rates: {
      debit: 1.19,
      credit: 2.85,
      installments: [5.33, 6.06, 7.79, 8.51, 9.22, 9.93, 10.63, 10.91, 10.96, 11.46, 11.51, 12.57, 13.52, 14.25, 15.75, 16.58, 17.58, 18.08, 18.58, 19.08],
    },
  },
  {
    plan: "ton-mega-plus",
    salesTier: "over-30000",
    brand: "visa-master",
    settlement: "same-day",
    rates: {
      debit: 1.22,
      credit: 2.91,
      installments: [6.54, 8.14, 8.84, 9.71, 10.79, 10.84, 10.89, 10.94, 10.99, 11.63, 11.73, 13.07, 14.02, 14.75, 16.25, 17.08, 18.08, 18.58, 19.08, 19.58],
    },
  },
  {
    plan: "ton-mega-plus",
    salesTier: "promotional",
    brand: "elo-amex",
    settlement: "one-business-day",
    rates: {
      debit: 2.57,
      credit: 4.34,
      installments: [7.02, 7.58, 8.38, 9.38, 10.38, 10.98, 11.38, 12.38, 12.88, 13.74, 13.78, 14.87, 15.51, 16.15, 16.79, 17.43, 18.07, 19.73, 20.37, 21.01],
    },
  },
  {
    plan: "ton-mega-plus",
    salesTier: "promotional",
    brand: "elo-amex",
    settlement: "same-day",
    rates: {
      debit: 2.57,
      credit: 4.34,
      installments: [7.02, 7.58, 8.38, 9.38, 10.38, 10.98, 11.38, 12.38, 12.88, 13.74, 13.78, 14.87, 15.51, 16.15, 16.79, 17.43, 18.07, 19.73, 20.37, 21.01],
    },
  },
  {
    plan: "ton-mega-plus",
    salesTier: "promotional",
    brand: "visa-master",
    settlement: "one-business-day",
    rates: {
      debit: 0.57,
      credit: 0.57,
      installments: [3.97, 3.97, 4.97, 5.97, 6.97, 7.97, 7.97, 7.97, 7.97, 7.97, 7.97, 12.57, 13.52, 14.99, 14.99, 14.99, 14.99, 15.89, 15.89, 15.89],
    },
  },
  {
    plan: "ton-mega-plus",
    salesTier: "promotional",
    brand: "visa-master",
    settlement: "same-day",
    rates: {
      debit: 0.57,
      credit: 0.57,
      installments: [3.97, 3.97, 4.97, 5.97, 6.97, 7.97, 7.97, 7.97, 7.97, 7.97, 7.97, 12.57, 13.52, 14.99, 14.99, 14.99, 14.99, 15.89, 15.89, 15.89],
    },
  },
  {
    plan: "ton-mega-plus",
    salesTier: "up-to-3000",
    brand: "elo-amex",
    settlement: "one-business-day",
    rates: {
      debit: 2.98,
      credit: 5.15,
      installments: [11.3, 12.68, 14.03, 15.36, 16.66, 17.94, 19.2, 20.43, 21.78, 22.64, 23.68, 24.82, 25.94, 26.24, 27.74, 28.37, 29.37, 29.87, 30.37, 30.87],
    },
  },
  {
    plan: "ton-mega-plus",
    salesTier: "up-to-3000",
    brand: "elo-amex",
    settlement: "same-day",
    rates: {
      debit: 3.27,
      credit: 6.15,
      installments: [12.3, 13.68, 15.03, 16.36, 17.66, 18.94, 20.2, 21.43, 22.78, 23.64, 24.28, 25.32, 26.44, 26.74, 28.24, 28.87, 29.87, 30.37, 30.87, 31.37],
    },
  },
  {
    plan: "ton-mega-plus",
    salesTier: "up-to-3000",
    brand: "visa-master",
    settlement: "one-business-day",
    rates: {
      debit: 1.69,
      credit: 3.86,
      installments: [9.86, 11.24, 12.59, 13.92, 15.22, 16.5, 17.76, 18.99, 20.19, 20.39, 21.39, 22.53, 23.65, 23.95, 25.45, 26.08, 27.08, 27.58, 28.08, 28.58],
    },
  },
  {
    plan: "ton-mega-plus",
    salesTier: "up-to-3000",
    brand: "visa-master",
    settlement: "same-day",
    rates: {
      debit: 1.98,
      credit: 4.86,
      installments: [10.86, 12.24, 13.59, 14.92, 16.22, 17.5, 18.76, 19.99, 21.19, 21.39, 21.99, 23.03, 24.15, 24.45, 25.95, 26.58, 27.58, 28.08, 28.58, 29.08],
    },
  },
  {
    plan: "ton-top",
    salesTier: "top-10000-20000",
    brand: "elo-amex",
    settlement: "one-business-day",
    rates: {
      debit: 2.47,
      credit: 4.27,
      installments: [6.77, 7.5, 8.23, 8.95, 9.64, 10.32, 11.09, 11.63, 12.26, 13.14, 13.24, 15.83, 17.24, 18.39, 19.3, 19.49, 19.62, 22.52, 23.02, 23.52],
    },
  },
  {
    plan: "ton-top",
    salesTier: "top-10000-20000",
    brand: "elo-amex",
    settlement: "same-day",
    rates: {
      debit: 2.5,
      credit: 4.3,
      installments: [7.57, 8.9, 9.98, 10.24, 10.29, 10.42, 11.19, 11.73, 12.36, 13.16, 13.28, 16.13, 17.54, 18.99, 19.62, 19.75, 19.65, 23.97, 24.47, 24.97],
    },
  },
  {
    plan: "ton-top",
    salesTier: "top-10000-20000",
    brand: "visa-master",
    settlement: "one-business-day",
    rates: {
      debit: 1.18,
      credit: 2.98,
      installments: [5.33, 6.06, 6.79, 7.51, 8.2, 8.88, 9.65, 10.19, 10.67, 10.89, 10.95, 13.54, 14.95, 16.1, 17.01, 17.2, 17.33, 20.23, 20.73, 21.23],
    },
  },
  {
    plan: "ton-top",
    salesTier: "top-10000-20000",
    brand: "visa-master",
    settlement: "same-day",
    rates: {
      debit: 1.21,
      credit: 3.01,
      installments: [6.13, 7.46, 8.54, 8.8, 8.85, 8.98, 9.75, 10.29, 10.77, 10.91, 10.99, 13.84, 15.25, 16.7, 17.33, 17.46, 17.36, 21.68, 22.18, 22.68],
    },
  },
  {
    plan: "ton-top",
    salesTier: "top-20000-30000",
    brand: "elo-amex",
    settlement: "one-business-day",
    rates: {
      debit: 2.13,
      credit: 4.08,
      installments: [5.65, 6.26, 6.87, 7.48, 8.07, 9.52, 10.79, 11.33, 11.96, 12.84, 13.17, 15.63, 17.04, 18.19, 19.1, 19.29, 19.38, 22.02, 22.52, 23.02],
    },
  },
  {
    plan: "ton-top",
    salesTier: "top-20000-30000",
    brand: "elo-amex",
    settlement: "same-day",
    rates: {
      debit: 2.43,
      credit: 4.14,
      installments: [7.15, 8.26, 8.87, 9.48, 10.07, 10.39, 11.16, 11.7, 12.22, 13.08, 13.21, 15.68, 17.09, 18.54, 19.17, 19.3, 19.41, 23.52, 24.02, 24.52],
    },
  },
  {
    plan: "ton-top",
    salesTier: "top-20000-30000",
    brand: "visa-master",
    settlement: "one-business-day",
    rates: {
      debit: 0.84,
      credit: 2.79,
      installments: [4.21, 4.82, 5.43, 6.04, 6.63, 8.08, 9.35, 9.89, 10.37, 10.59, 10.88, 13.34, 14.75, 15.9, 16.81, 17, 17.09, 19.73, 20.23, 20.73],
    },
  },
  {
    plan: "ton-top",
    salesTier: "top-20000-30000",
    brand: "visa-master",
    settlement: "same-day",
    rates: {
      debit: 1.14,
      credit: 2.85,
      installments: [5.71, 6.82, 7.43, 8.04, 8.63, 8.95, 9.72, 10.26, 10.63, 10.83, 10.92, 13.39, 14.8, 16.25, 16.88, 17.01, 17.12, 21.23, 21.73, 22.23],
    },
  },
  {
    plan: "ton-top",
    salesTier: "top-6000-10000",
    brand: "elo-amex",
    settlement: "one-business-day",
    rates: {
      debit: 2.57,
      credit: 4.44,
      installments: [6.87, 7.6, 8.33, 9.05, 9.72, 10.42, 11.12, 11.81, 12.64, 13.88, 13.97, 16.62, 17.54, 18.44, 19.44, 19.54, 20.39, 23.02, 23.52, 24.02],
    },
  },
  {
    plan: "ton-top",
    salesTier: "top-6000-10000",
    brand: "elo-amex",
    settlement: "same-day",
    rates: {
      debit: 2.6,
      credit: 4.53,
      installments: [8.25, 9.54, 10.4, 10.55, 10.72, 12.45, 12.87, 13, 13.22, 13.92, 13.99, 16.8, 17.82, 19.2, 20.18, 20.38, 20.42, 24.18, 25.27, 25.77],
    },
  },
  {
    plan: "ton-top",
    salesTier: "top-6000-10000",
    brand: "visa-master",
    settlement: "one-business-day",
    rates: {
      debit: 1.28,
      credit: 3.15,
      installments: [5.43, 6.16, 6.89, 7.61, 8.28, 8.98, 9.68, 10.37, 11.05, 11.63, 11.68, 14.33, 15.25, 16.15, 17.15, 17.25, 18.1, 20.73, 21.23, 21.73],
    },
  },
  {
    plan: "ton-top",
    salesTier: "top-6000-10000",
    brand: "visa-master",
    settlement: "same-day",
    rates: {
      debit: 1.31,
      credit: 3.24,
      installments: [6.81, 8.1, 8.96, 9.11, 9.28, 11.01, 11.43, 11.56, 11.63, 11.67, 11.7, 14.51, 15.53, 16.91, 17.89, 18.09, 18.13, 21.89, 22.98, 23.48],
    },
  },
  {
    plan: "ton-top",
    salesTier: "top-over-30000",
    brand: "elo-amex",
    settlement: "one-business-day",
    rates: {
      debit: 2.08,
      credit: 4.04,
      installments: [5.62, 6.23, 6.84, 7.43, 8.02, 9.39, 10.76, 11.3, 11.93, 12.81, 13.14, 15.6, 17.01, 18.16, 19.07, 18.5, 19.2, 21.99, 22.49, 22.99],
    },
  },
  {
    plan: "ton-top",
    salesTier: "top-over-30000",
    brand: "elo-amex",
    settlement: "same-day",
    rates: {
      debit: 2.38,
      credit: 4.11,
      installments: [7.12, 8.23, 8.84, 9.45, 10.03, 10.36, 11.13, 11.67, 12.19, 13.05, 13.17, 15.65, 17.06, 18.51, 19.14, 19.2, 19.23, 23.49, 23.99, 24.49],
    },
  },
  {
    plan: "ton-top",
    salesTier: "top-over-30000",
    brand: "visa-master",
    settlement: "one-business-day",
    rates: {
      debit: 0.79,
      credit: 2.75,
      installments: [4.18, 4.79, 5.4, 5.99, 6.58, 7.95, 9.32, 9.86, 10.34, 10.56, 10.85, 13.31, 14.72, 15.87, 16.78, 16.21, 16.91, 19.7, 20.2, 20.7],
    },
  },
  {
    plan: "ton-top",
    salesTier: "top-over-30000",
    brand: "visa-master",
    settlement: "same-day",
    rates: {
      debit: 1.09,
      credit: 2.82,
      installments: [5.68, 6.79, 7.4, 8.01, 8.59, 8.92, 9.69, 10.23, 10.6, 10.8, 10.88, 13.36, 14.77, 16.22, 16.85, 16.91, 16.94, 21.2, 21.7, 22.2],
    },
  },
  {
    plan: "ton-top",
    salesTier: "top-up-to-6000",
    brand: "elo-amex",
    settlement: "one-business-day",
    rates: {
      debit: 3.19,
      credit: 5.36,
      installments: [11.51, 12.89, 14.24, 15.57, 16.87, 18.15, 19.41, 20.64, 21.99, 22.85, 23.89, 25.03, 26.15, 26.45, 27.95, 28.58, 29.58, 30.08, 30.58, 31.08],
    },
  },
  {
    plan: "ton-top",
    salesTier: "top-up-to-6000",
    brand: "elo-amex",
    settlement: "same-day",
    rates: {
      debit: 3.45,
      credit: 6.3,
      installments: [14.05, 15.64, 17.19, 19.14, 20.21, 22.19, 23.67, 24.76, 25.04, 25.75, 25.86, 28.38, 29.14, 29.88, 30.64, 31.39, 31.42, 31.72, 32.02, 32.32],
    },
  },
  {
    plan: "ton-top",
    salesTier: "top-up-to-6000",
    brand: "visa-master",
    settlement: "one-business-day",
    rates: {
      debit: 1.9,
      credit: 4.07,
      installments: [10.07, 11.45, 12.8, 14.13, 15.43, 16.71, 17.97, 19.2, 20.4, 20.6, 21.6, 22.74, 23.86, 24.16, 25.66, 26.29, 27.29, 27.79, 28.29, 28.79],
    },
  },
  {
    plan: "ton-top",
    salesTier: "top-up-to-6000",
    brand: "visa-master",
    settlement: "same-day",
    rates: {
      debit: 2.16,
      credit: 5.01,
      installments: [12.61, 14.2, 15.75, 17.7, 18.77, 20.75, 22.23, 23.32, 23.45, 23.5, 23.57, 26.09, 26.85, 27.59, 28.35, 29.1, 29.13, 29.43, 29.73, 30.03],
    },
  },
];

export function getTonRate(
  plan: TonPlan,
  salesTier: SalesTier,
  brand: CardBrandGroup,
  settlement: Settlement,
): InstallmentRates | null {
  return (
    tonRateConfigs.find(
      (item) =>
        item.plan === plan &&
        item.salesTier === salesTier &&
        item.brand === brand &&
        item.settlement === settlement,
    )?.rates ?? null
  );
}

export function getInstallmentRate(
  rates: InstallmentRates,
  installments: number,
): number {
  if (installments === 0) return rates.debit;
  if (installments === 1) return rates.credit;
  return rates.installments[installments - 2] ?? 0;
}

export function getSalesTierOptionsForPlan(plan: TonPlan) {
  return salesTierOptions.filter(
    (option) => option.plan === plan,
  );
}

export function getTapTonRate(
  brand: CardBrandGroup,
  settlement: Settlement,
): InstallmentRates | null {
  return (
    tapTonRateConfigs.find(
      (item) =>
        item.brand === brand &&
        item.settlement === settlement,
    )?.rates ?? null
  );
}
