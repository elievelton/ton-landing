export type TonRatesStatus = "success" | "error";

export type TonRatesMeta = {
  status: TonRatesStatus;
  fetchedAt: string;
  sourceRatesUpdatedAt: string | null;
  sourceConditionsUpdatedAt: string | null;
  plans: number;
  megaTiers: number;
  blackTiers: number;
  tapTonConfigs: number;
  configs: number;
  installmentsPerCreditConfig: number;
  message?: string;
};

export const tonRatesMeta: TonRatesMeta = {
  "status": "success",
  "fetchedAt": "2026-10-01T17:12:35.054Z",
  "sourceRatesUpdatedAt": "2026-10-01T12:40:34.054Z",
  "sourceConditionsUpdatedAt": "2026-10-01T12:40:34.054Z",
  "plans": 11,
  "megaTiers": 6,
  "blackTiers": 4,
  "tapTonConfigs": 4,
  "configs": 40,
  "installmentsPerCreditConfig": 21,
  "message": "🔄 240 alteração(ões) detectada(s).\n- Mega+ | promotional | visa-master | same-day | credit-13x | 14.87% → 12.57%\n- Mega+ | promotional | visa-master | same-day | credit-14x | 14.87% → 13.52%\n- Mega+ | promotional | visa-master | same-day | credit-15x | 14.87% → 14.99%\n- Mega+ | promotional | visa-master | same-day | credit-16x | 14.87% → 14.99%\n- Mega+ | promotional | visa-master | same-day | credit-17x | 14.87% → 14.99%\n- Mega+ | promotional | visa-master | same-day | credit-18x | 14.87% → 14.99%\n- Mega+ | promotional | visa-master | same-day | credit-19x | 14.87% → 15.89%\n- Mega+ | promotional | visa-master | same-day | credit-20x | 14.87% → 15.89%\n- Mega+ | promotional | visa-master | same-day | credit-21x | 14.87% → 15.89%\n- Mega+ | promotional | elo-amex | same-day | credit-19x | 18.71% → 19.73%\n- Mega+ | promotional | elo-amex | same-day | credit-20x | 19.35% → 20.37%\n- Mega+ | promotional | elo-amex | same-day | credit-21x | 19.99% → 21.01%\n- Mega+ | promotional | visa-master | one-business-day | credit-13x | 14.87% → 12.57%\n- Mega+ | promotional | visa-master | one-business-day | credit-14x | 14.87% → 13.52%\n- Mega+ | promotional | visa-master | one-business-day | credit-15x | 14.87% → 14.99%\n- Mega+ | promotional | visa-master | one-business-day | credit-16x | 14.87% → 14.99%\n- Mega+ | promotional | visa-master | one-business-day | credit-17x | 14.87% → 14.99%\n- Mega+ | promotional | visa-master | one-business-day | credit-18x | 14.87% → 14.99%\n- Mega+ | promotional | visa-master | one-business-day | credit-19x | 14.87% → 15.89%\n- Mega+ | promotional | visa-master | one-business-day | credit-20x | 14.87% → 15.89%\n- ... e mais 220 alteração(ões)."
};
