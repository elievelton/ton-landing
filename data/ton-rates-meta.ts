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
  "fetchedAt": "2026-11-26T19:55:50.004Z",
  "sourceRatesUpdatedAt": "2026-10-26T14:37:43.241Z",
  "sourceConditionsUpdatedAt": "2026-10-26T14:37:43.241Z",
  "plans": 12,
  "megaTiers": 6,
  "topTiers": 5,
  "tapTonConfigs": 4,
  "configs": 44,
  "installmentsPerCreditConfig": 21,
  "message": "Nenhuma alteração nas taxas."
};
