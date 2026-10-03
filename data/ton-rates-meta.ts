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
  "fetchedAt": "2026-10-03T14:59:56.790Z",
  "sourceRatesUpdatedAt": "2026-10-01T12:40:34.054Z",
  "sourceConditionsUpdatedAt": "2026-10-01T12:40:34.054Z",
  "plans": 11,
  "megaTiers": 6,
  "blackTiers": 4,
  "tapTonConfigs": 4,
  "configs": 40,
  "installmentsPerCreditConfig": 21,
  "message": "Nenhuma alteração nas taxas."
};
