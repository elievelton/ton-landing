export type TonRatesStatus = "success" | "error";

export type TonRatesMeta = {
  status: TonRatesStatus;
  fetchedAt: string;
  sourceRatesUpdatedAt: string | null;
  sourceConditionsUpdatedAt: string | null;
  plans: number;
  megaTiers: number;
  topTiers: number;
  tapTonConfigs: number;
  configs: number;
  installmentsPerCreditConfig: number;
  message?: string;
};

export const tonRatesMeta: TonRatesMeta = {
  "status": "success",
  "fetchedAt": "2026-11-25T22:43:08.952Z",
  "sourceRatesUpdatedAt": "2026-10-26T14:37:43.241Z",
  "sourceConditionsUpdatedAt": "2026-10-26T14:37:43.241Z",
  "plans": 12,
  "megaTiers": 6,
  "topTiers": 5,
  "tapTonConfigs": 4,
  "configs": 44,
  "installmentsPerCreditConfig": 21,
  "message": "🔄 20 alteração(ões) detectada(s).\n- Top | top-over-30000 | visa-master | same-day | debit | nova → 1.09%\n- Top | top-over-30000 | elo-amex | same-day | debit | nova → 2.38%\n- Top | top-over-30000 | visa-master | one-business-day | debit | nova → 0.79%\n- Top | top-over-30000 | elo-amex | one-business-day | debit | nova → 2.08%\n- Top | top-20000-30000 | visa-master | same-day | debit | nova → 1.14%\n- Top | top-20000-30000 | elo-amex | same-day | debit | nova → 2.43%\n- Top | top-20000-30000 | visa-master | one-business-day | debit | nova → 0.84%\n- Top | top-20000-30000 | elo-amex | one-business-day | debit | nova → 2.13%\n- Top | top-10000-20000 | visa-master | same-day | debit | nova → 1.21%\n- Top | top-10000-20000 | elo-amex | same-day | debit | nova → 2.50%\n- Top | top-10000-20000 | visa-master | one-business-day | debit | nova → 1.18%\n- Top | top-10000-20000 | elo-amex | one-business-day | debit | nova → 2.47%\n- Top | top-6000-10000 | visa-master | same-day | debit | nova → 1.31%\n- Top | top-6000-10000 | elo-amex | same-day | debit | nova → 2.60%\n- Top | top-6000-10000 | visa-master | one-business-day | debit | nova → 1.28%\n- Top | top-6000-10000 | elo-amex | one-business-day | debit | nova → 2.57%\n- Top | top-up-to-6000 | visa-master | same-day | debit | nova → 2.16%\n- Top | top-up-to-6000 | elo-amex | same-day | debit | nova → 3.45%\n- Top | top-up-to-6000 | visa-master | one-business-day | debit | nova → 1.90%\n- Top | top-up-to-6000 | elo-amex | one-business-day | debit | nova → 3.19%"
};
