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
  "fetchedAt": "2026-09-04T14:37:36.155Z",
  "sourceRatesUpdatedAt": "2026-09-04T13:13:42.805Z",
  "sourceConditionsUpdatedAt": "2026-07-01T12:24:51.271Z",
  "plans": 11,
  "megaTiers": 6,
  "blackTiers": 4,
  "tapTonConfigs": 4,
  "configs": 40,
  "installmentsPerCreditConfig": 21,
  "message": "Nenhuma alteração nas taxas."
};
