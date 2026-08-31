export type TonPlan = "ton-mega-plus" | "ton-black";
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
  | "up-to-20000"
  | "over-20000"
  | "over-40000"
  | "over-80000";

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
  { value: "ton-black" as const, label: "Ton Black", available: true },
];

export const salesTierOptions = [
  { value: "promotional" as const, label: "Período Promocional", plan: "ton-mega-plus" as const },
  { value: "up-to-3000" as const, label: "Até R$ 3 mil", plan: "ton-mega-plus" as const },
  { value: "3000-6000" as const, label: "De R$ 3 mil a R$ 6 mil", plan: "ton-mega-plus" as const },
  { value: "6000-10000" as const, label: "De R$ 6 mil a R$ 10 mil", plan: "ton-mega-plus" as const },
  { value: "10000-30000" as const, label: "De R$ 10 mil a R$ 30 mil", plan: "ton-mega-plus" as const },
  { value: "over-30000" as const, label: "Acima de R$ 30 mil", plan: "ton-mega-plus" as const },
  { value: "up-to-20000" as const, label: "Até R$ 20 mil", plan: "ton-black" as const },
  { value: "over-20000" as const, label: "Acima de R$ 20 mil", plan: "ton-black" as const },
  { value: "over-40000" as const, label: "Acima de R$ 40 mil", plan: "ton-black" as const },
  { value: "over-80000" as const, label: "Acima de R$ 80 mil", plan: "ton-black" as const },
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
  black: "Taxas de acordo com suas vendas mensais.",
} as const;

export const tapTonRateConfigs: TapTonRateConfig[] = [
  {
    brand: "elo-amex",
    settlement: "same-day",
    rates: {
      debit: 2.06,
      credit: 4.27,
      installments: [6.98, 7.78, 9.58, 9.78, 9.88, 11.18, 11.38, 12.04, 12.74, 13.44, 13.54, 14.18, 14.82, 15.46, 16.1, 16.74, 17.38, 18.02, 18.66, 19.3],
    },
  },
  {
    brand: "elo-amex",
    settlement: "one-business-day",
    rates: {
      debit: 1.98,
      credit: 4.24,
      installments: [6.94, 7.74, 9.48, 9.74, 9.84, 11.14, 11.28, 11.98, 12.68, 13.38, 13.48, 14.12, 14.76, 15.4, 16.04, 16.68, 17.32, 17.96, 18.6, 19.24],
    },
  },
  {
    brand: "visa-master",
    settlement: "same-day",
    rates: {
      debit: 0.87,
      credit: 3.08,
      installments: [5.79, 6.59, 8.39, 8.59, 8.69, 9.99, 10.19, 10.85, 11.55, 12.25, 12.35, 12.99, 13.63, 14.27, 14.91, 15.55, 16.19, 16.83, 17.47, 18.11],
    },
  },
  {
    brand: "visa-master",
    settlement: "one-business-day",
    rates: {
      debit: 0.57,
      credit: 3.05,
      installments: [5.75, 6.55, 8.29, 8.55, 8.65, 9.95, 10.09, 10.79, 11.49, 12.19, 12.29, 12.93, 13.57, 14.21, 14.85, 15.49, 16.13, 16.77, 17.41, 18.05],
    },
  },
];

export const tonRateConfigs: TonRateConfig[] = [
  {
    plan: "ton-black",
    salesTier: "over-20000",
    brand: "elo-amex",
    settlement: "one-business-day",
    rates: {
      debit: 2.07,
      credit: 4.64,
      installments: [6.08, 6.68, 7.27, 7.86, 8.45, 9.04, 9.62, 10.19, 10.75, 11.32, 11.87, 14.87, 15.46, 16.08, 16.73, 17.4, 18.09, 18.73, 19.37, 20.01],
    },
  },
  {
    plan: "ton-black",
    salesTier: "over-20000",
    brand: "elo-amex",
    settlement: "same-day",
    rates: {
      debit: 2.28,
      credit: 5.48,
      installments: [10.88, 11.98, 12.58, 13.28, 13.98, 14.98, 15.58, 16.18, 16.88, 17.88, 18.28, 21.28, 22.13, 23.02, 23.94, 24.89, 25.89, 26.53, 27.17, 27.81],
    },
  },
  {
    plan: "ton-black",
    salesTier: "over-20000",
    brand: "visa-master",
    settlement: "one-business-day",
    rates: {
      debit: 0.84,
      credit: 2.88,
      installments: [4.21, 4.82, 5.43, 6.04, 6.63, 7.23, 7.81, 8.4, 8.97, 9.55, 10.11, 13.11, 13.63, 14.18, 14.75, 15.34, 15.95, 16.59, 17.23, 17.87],
    },
  },
  {
    plan: "ton-black",
    salesTier: "over-20000",
    brand: "visa-master",
    settlement: "same-day",
    rates: {
      debit: 2.28,
      credit: 5.48,
      installments: [10.88, 11.98, 12.58, 13.28, 13.98, 14.98, 15.58, 16.18, 16.88, 17.88, 18.28, 21.28, 22.13, 23.02, 23.94, 24.89, 25.89, 26.53, 27.17, 27.81],
    },
  },
  {
    plan: "ton-black",
    salesTier: "over-40000",
    brand: "elo-amex",
    settlement: "one-business-day",
    rates: {
      debit: 1.97,
      credit: 4.55,
      installments: [5.94, 6.49, 7.04, 7.59, 8.14, 8.68, 9.22, 9.75, 10.28, 10.8, 11.32, 14.32, 14.89, 15.49, 16.11, 16.75, 17.42, 18.06, 18.7, 19.34],
    },
  },
  {
    plan: "ton-black",
    salesTier: "over-40000",
    brand: "elo-amex",
    settlement: "same-day",
    rates: {
      debit: 2.28,
      credit: 5.48,
      installments: [10.88, 11.98, 12.58, 13.28, 13.98, 14.98, 15.58, 16.18, 16.88, 17.88, 18.28, 21.28, 22.13, 23.02, 23.94, 24.89, 25.89, 26.53, 27.17, 27.81],
    },
  },
  {
    plan: "ton-black",
    salesTier: "over-40000",
    brand: "visa-master",
    settlement: "one-business-day",
    rates: {
      debit: 0.78,
      credit: 2.78,
      installments: [4.07, 4.64, 5.2, 5.76, 6.31, 6.86, 7.41, 7.95, 8.48, 9.02, 9.55, 12.55, 13.05, 13.57, 14.12, 14.68, 15.27, 15.91, 16.55, 17.19],
    },
  },
  {
    plan: "ton-black",
    salesTier: "over-40000",
    brand: "visa-master",
    settlement: "same-day",
    rates: {
      debit: 2.28,
      credit: 5.48,
      installments: [10.88, 11.98, 12.58, 13.28, 13.98, 14.98, 15.58, 16.18, 16.88, 17.88, 18.28, 21.28, 22.13, 23.02, 23.94, 24.89, 25.89, 26.53, 27.17, 27.81],
    },
  },
  {
    plan: "ton-black",
    salesTier: "over-80000",
    brand: "elo-amex",
    settlement: "one-business-day",
    rates: {
      debit: 1.87,
      credit: 4.45,
      installments: [5.8, 6.31, 6.82, 7.32, 7.82, 8.33, 8.82, 9.31, 9.8, 10.28, 10.76, 13.76, 14.31, 14.88, 15.48, 16.1, 16.74, 17.38, 18.02, 18.66],
    },
  },
  {
    plan: "ton-black",
    salesTier: "over-80000",
    brand: "elo-amex",
    settlement: "same-day",
    rates: {
      debit: 2.28,
      credit: 5.48,
      installments: [10.88, 11.98, 12.58, 13.28, 13.98, 14.98, 15.58, 16.18, 16.88, 17.88, 18.28, 21.28, 22.13, 23.02, 23.94, 24.89, 25.89, 26.53, 27.17, 27.81],
    },
  },
  {
    plan: "ton-black",
    salesTier: "over-80000",
    brand: "visa-master",
    settlement: "one-business-day",
    rates: {
      debit: 0.74,
      credit: 2.68,
      installments: [3.93, 4.45, 4.97, 5.48, 5.98, 6.5, 6.98, 7.5, 7.98, 8.48, 8.98, 11.98, 12.46, 12.96, 13.48, 14.01, 14.58, 15.22, 15.86, 16.5],
    },
  },
  {
    plan: "ton-black",
    salesTier: "over-80000",
    brand: "visa-master",
    settlement: "same-day",
    rates: {
      debit: 2.28,
      credit: 5.48,
      installments: [10.88, 11.98, 12.58, 13.28, 13.98, 14.98, 15.58, 16.18, 16.88, 17.88, 18.28, 21.28, 22.13, 23.02, 23.94, 24.89, 25.89, 26.53, 27.17, 27.81],
    },
  },
  {
    plan: "ton-black",
    salesTier: "up-to-20000",
    brand: "elo-amex",
    settlement: "one-business-day",
    rates: {
      debit: 2.57,
      credit: 4.9,
      installments: [6.46, 7.19, 7.91, 8.62, 9.32, 10.02, 10.71, 11.4, 12.07, 12.74, 13.4, 16.4, 17.06, 17.74, 18.45, 19.19, 19.95, 20.59, 21.23, 21.87],
    },
  },
  {
    plan: "ton-black",
    salesTier: "up-to-20000",
    brand: "elo-amex",
    settlement: "same-day",
    rates: {
      debit: 2.28,
      credit: 5.48,
      installments: [10.88, 11.98, 12.58, 13.28, 13.98, 14.98, 15.58, 16.18, 16.88, 17.88, 18.28, 21.28, 22.13, 23.02, 23.94, 24.89, 25.89, 26.53, 27.17, 27.81],
    },
  },
  {
    plan: "ton-black",
    salesTier: "up-to-20000",
    brand: "visa-master",
    settlement: "one-business-day",
    rates: {
      debit: 1.36,
      credit: 3.14,
      installments: [5.38, 6.11, 6.84, 7.56, 8.27, 8.98, 9.68, 10.37, 11.05, 11.73, 12.39, 15.39, 16.01, 16.65, 17.31, 18, 18.72, 19.36, 20, 20.64],
    },
  },
  {
    plan: "ton-black",
    salesTier: "up-to-20000",
    brand: "visa-master",
    settlement: "same-day",
    rates: {
      debit: 2.28,
      credit: 5.48,
      installments: [10.88, 11.98, 12.58, 13.28, 13.98, 14.98, 15.58, 16.18, 16.88, 17.88, 18.28, 21.28, 22.13, 23.02, 23.94, 24.89, 25.89, 26.53, 27.17, 27.81],
    },
  },
  {
    plan: "ton-mega-plus",
    salesTier: "10000-30000",
    brand: "elo-amex",
    settlement: "one-business-day",
    rates: {
      debit: 2.51,
      credit: 4.31,
      installments: [6.82, 7.55, 9.28, 10, 10.71, 11.42, 12.12, 12.38, 12.58, 13.92, 14.02, 14.66, 15.3, 15.94, 16.58, 17.22, 17.86, 18.5, 19.14, 19.78],
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
      installments: [8.03, 9.63, 10.33, 11.2, 12.54, 13.12, 13.17, 13.22, 13.42, 14.13, 14.24, 14.88, 15.52, 16.16, 16.8, 17.44, 18.08, 18.72, 19.36, 20],
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
      installments: [5.38, 6.11, 7.84, 8.56, 9.27, 9.98, 10.68, 10.94, 10.99, 11.67, 11.73, 12.37, 13.01, 13.65, 14.29, 14.93, 15.57, 16.21, 16.85, 17.49],
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
      installments: [6.59, 8.19, 8.89, 9.76, 11.1, 11.68, 11.73, 11.78, 11.83, 11.88, 11.95, 12.59, 13.23, 13.87, 14.51, 15.15, 15.79, 16.43, 17.07, 17.71],
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
      installments: [8.73, 9.79, 10.67, 11.54, 12.29, 12.34, 12.39, 12.44, 12.64, 13.98, 14.67, 15.31, 15.95, 16.59, 17.23, 17.87, 18.51, 19.15, 19.79, 20.43],
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
      installments: [8.82, 10.41, 11.07, 11.94, 12.62, 13.63, 14.48, 14.51, 14.71, 15.42, 15.51, 16.15, 16.79, 17.43, 18.07, 18.71, 19.35, 19.99, 20.63, 21.27],
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
      installments: [7.29, 8.35, 9.23, 10.1, 10.85, 10.9, 10.95, 11, 11.05, 11.73, 12.38, 13.02, 13.66, 14.3, 14.94, 15.58, 16.22, 16.86, 17.5, 18.14],
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
      installments: [7.38, 8.97, 9.63, 10.5, 11.18, 12.19, 13.04, 13.07, 13.12, 13.17, 13.22, 13.86, 14.5, 15.14, 15.78, 16.42, 17.06, 17.7, 18.34, 18.98],
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
      installments: [8.13, 9.2, 10.08, 10.95, 11.81, 12.31, 12.36, 12.41, 12.61, 13.95, 14.64, 15.28, 15.92, 16.56, 17.2, 17.84, 18.48, 19.12, 19.76, 20.4],
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
      installments: [8.62, 10, 10.88, 11.75, 12.61, 13.44, 13.94, 13.99, 14.17, 14.86, 14.95, 15.59, 16.23, 16.87, 17.51, 18.15, 18.79, 19.43, 20.07, 20.71],
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
      installments: [6.69, 7.76, 8.64, 9.51, 10.37, 10.87, 10.92, 10.97, 11.02, 11.7, 12.35, 12.99, 13.63, 14.27, 14.91, 15.55, 16.19, 16.83, 17.47, 18.11],
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
      installments: [7.18, 8.56, 9.44, 10.31, 11.17, 12, 12.5, 12.55, 12.58, 12.61, 12.66, 13.3, 13.94, 14.58, 15.22, 15.86, 16.5, 17.14, 17.78, 18.42],
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
      installments: [6.77, 7.5, 9.23, 9.95, 10.66, 11.37, 12.07, 12.35, 12.55, 13.71, 13.8, 14.44, 15.08, 15.72, 16.36, 17, 17.64, 18.28, 18.92, 19.56],
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
      installments: [7.98, 9.58, 10.28, 11.15, 12.23, 12.28, 12.33, 12.38, 12.58, 13.88, 14.02, 14.66, 15.3, 15.94, 16.58, 17.22, 17.86, 18.5, 19.14, 19.78],
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
      installments: [5.33, 6.06, 7.79, 8.51, 9.22, 9.93, 10.63, 10.91, 10.96, 11.46, 11.51, 12.15, 12.79, 13.43, 14.07, 14.71, 15.35, 15.99, 16.63, 17.27],
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
      installments: [6.54, 8.14, 8.84, 9.71, 10.79, 10.84, 10.89, 10.94, 10.99, 11.63, 11.73, 12.37, 13.01, 13.65, 14.29, 14.93, 15.57, 16.21, 16.85, 17.49],
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
      installments: [7.02, 7.58, 8.38, 9.38, 10.38, 10.98, 11.38, 12.38, 12.88, 13.74, 13.78, 14.87, 15.51, 16.15, 16.79, 17.43, 18.07, 18.71, 19.35, 19.99],
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
      installments: [7.02, 7.58, 8.38, 9.38, 10.38, 10.98, 11.38, 12.38, 12.88, 13.74, 13.78, 14.87, 15.51, 16.15, 16.79, 17.43, 18.07, 18.71, 19.35, 19.99],
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
      installments: [3.97, 3.97, 4.97, 5.97, 6.97, 7.97, 7.97, 7.97, 7.97, 7.97, 7.97, 14.87, 14.87, 14.87, 14.87, 14.87, 14.87, 14.87, 14.87, 14.87],
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
      installments: [3.97, 3.97, 4.97, 5.97, 6.97, 7.97, 7.97, 7.97, 7.97, 7.97, 7.97, 14.87, 14.87, 14.87, 14.87, 14.87, 14.87, 14.87, 14.87, 14.87],
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
      installments: [11.3, 12.68, 14.03, 15.36, 16.66, 17.94, 19.2, 20.43, 21.78, 22.64, 22.68, 23.32, 23.96, 24.6, 25.24, 25.88, 26.52, 27.16, 27.8, 28.44],
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
      installments: [12.3, 13.68, 15.03, 16.36, 17.66, 18.94, 20.2, 21.43, 22.78, 23.64, 23.68, 24.32, 24.96, 25.6, 26.24, 26.88, 27.52, 28.16, 28.8, 29.44],
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
      installments: [9.86, 11.24, 12.59, 13.92, 15.22, 16.5, 17.76, 18.99, 20.19, 20.39, 20.39, 21.03, 21.67, 22.31, 22.95, 23.59, 24.23, 24.87, 25.51, 26.15],
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
      installments: [10.86, 12.24, 13.59, 14.92, 16.22, 17.5, 18.76, 19.99, 21.19, 21.39, 21.39, 22.03, 22.67, 23.31, 23.95, 24.59, 25.23, 25.87, 26.51, 27.15],
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
