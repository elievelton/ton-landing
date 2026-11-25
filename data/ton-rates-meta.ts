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
  "status": "error",
  "fetchedAt": "2026-11-02T20:35:10.892Z",
  "sourceRatesUpdatedAt": "2026-10-01T12:40:34.054Z",
  "sourceConditionsUpdatedAt": "2026-10-01T12:40:34.054Z",
  "plans": 11,
  "megaTiers": 6,
  "topTiers": 0,
  "tapTonConfigs": 4,
  "configs": 0,
  "installmentsPerCreditConfig": 21,
  "message": "Estrutura do Ton Top preparada; aguardando a primeira execução bem-sucedida do scraper para substituir os dados antigos."
};
