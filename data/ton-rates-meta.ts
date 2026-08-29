export type TonRatesStatus = "success" | "error";

export type TonRatesMeta = {
  status: TonRatesStatus;
  fetchedAt: string;
  sourceRatesUpdatedAt: string | null;
  sourceConditionsUpdatedAt: string | null;
  plans: number;
  megaTiers: number;
  blackTiers: number;
  configs: number;
  installmentsPerCreditConfig: number;
  message?: string;
};

export const tonRatesMeta: TonRatesMeta = {
  "status": "success",
  "fetchedAt": "2026-08-28T21:18:02.440Z",
  "sourceRatesUpdatedAt": "2026-08-20T12:25:35.373Z",
  "sourceConditionsUpdatedAt": "2026-06-12T15:07:02.279Z",
  "plans": 10,
  "megaTiers": 6,
  "blackTiers": 4,
  "configs": 40,
  "installmentsPerCreditConfig": 21,
  "message": "Nenhuma alteração nas taxas."
};
