import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const TON_URL =
  "https://www.ton.com.br/esta-pagina-nao-existe";

const RATES_FILE = path.resolve("data/ton-rates.ts");
const META_FILE = path.resolve("data/ton-rates-meta.ts");

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

const EXPECTED_MEGA_TIERS = [
  "Período Promocional",
  "Até R$ 3 mil",
  "De R$ 3 mil a R$ 6 mil",
  "De R$ 6 mil a R$ 10 mil",
  "De R$ 10 mil a R$ 30 mil",
  "Acima de R$ 30 mil",
];

const EXPECTED_BLACK_TIERS = [
  "Até R$ 20 mil",
  "Acima de R$ 20 mil",
  "Acima de R$ 40 mil",
  "Acima de R$ 80 mil",
];

const TIER_MAP: Record<string, {
  plan: "ton-mega-plus" | "ton-black";
  salesTier:
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
}> = {
  "Período Promocional": {
    plan: "ton-mega-plus",
    salesTier: "promotional",
  },
  "Até R$ 3 mil": {
    plan: "ton-mega-plus",
    salesTier: "up-to-3000",
  },
  "De R$ 3 mil a R$ 6 mil": {
    plan: "ton-mega-plus",
    salesTier: "3000-6000",
  },
  "De R$ 6 mil a R$ 10 mil": {
    plan: "ton-mega-plus",
    salesTier: "6000-10000",
  },
  "De R$ 10 mil a R$ 30 mil": {
    plan: "ton-mega-plus",
    salesTier: "10000-30000",
  },
  "Acima de R$ 30 mil": {
    plan: "ton-mega-plus",
    salesTier: "over-30000",
  },
  "Até R$ 20 mil": {
    plan: "ton-black",
    salesTier: "up-to-20000",
  },
  "Acima de R$ 20 mil": {
    plan: "ton-black",
    salesTier: "over-20000",
  },
  "Acima de R$ 40 mil": {
    plan: "ton-black",
    salesTier: "over-40000",
  },
  "Acima de R$ 80 mil": {
    plan: "ton-black",
    salesTier: "over-80000",
  },
};

type TonPlan = "ton-mega-plus" | "ton-black";
type CardBrandGroup = "visa-master" | "elo-amex";
type Settlement = "same-day" | "one-business-day";

type SalesTier =
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

type InstallmentRates = {
  debit: number;
  credit: number;
  installments: number[];
};

type TonRateConfig = {
  plan: TonPlan;
  salesTier: SalesTier;
  brand: CardBrandGroup;
  settlement: Settlement;
  rates: InstallmentRates;
};

type Meta = {
  status: "success" | "error";
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

function nowIso() {
  return new Date().toISOString();
}

function collectFrshStates(html: string): unknown[] {
  const states: unknown[] = [];
  const regex =
    /<script[^>]*id="__FRSH_STATE_[^"]+"[^>]*>([\s\S]*?)<\/script>/gi;

  for (const match of html.matchAll(regex)) {
    const raw = match[1]?.trim();

    if (!raw) {
      continue;
    }

    try {
      states.push(JSON.parse(raw));
    } catch {
      // Alguns estados podem não ser JSON válido por razões de serialização.
    }
  }

  return states;
}

type TonMdr = {
  card_brand?: string;
  payment_method?: string;
  installments?: Array<{
    installment?: number;
    mdr?: number;
  }>;
};

type TonCondition = {
  anticipation_delay?: number;
  liquidation_type?: string;
  mdrs?: TonMdr[];
};

type TonPlanRecord = {
  type?: string;
  name?: string;
  tierLabel?: string;
  updated_at?: string;
  conditions_updated_at?: string;
  conditions?: TonCondition[];
};

function findPlans(value: unknown): TonPlanRecord[] | null {
  if (Array.isArray(value)) {
    for (const item of value) {
      const result = findPlans(item);

      if (result) {
        return result;
      }
    }

    return null;
  }

  if (!value || typeof value !== "object") {
    return null;
  }

  const object = value as Record<string, unknown>;

  if (Array.isArray(object.plans)) {
    if (
      object.plans.every(
        (item) =>
          item !== null &&
          typeof item === "object",
      )
    ) {
      return object.plans as TonPlanRecord[];
    }

    return null;
  }

  for (const child of Object.values(object)) {
    const result = findPlans(child);

    if (result) {
      return result;
    }
  }

  return null;
}

function scorePlans(plans: TonPlanRecord[]): number {
  const transactional = plans.filter(
    (plan) =>
      plan?.type === "transactional" &&
      typeof plan?.name === "string",
  );

  const tierLabels = new Set(
    transactional
      .map((plan) => plan?.tierLabel)
      .filter(Boolean),
  );

  const hasMega = transactional.some(
    (plan) => plan?.name === "Ton Mega+",
  );

  const hasBlack = transactional.some(
    (plan) => plan?.name === "Ton Black",
  );

  return (
    transactional.length * 1000 +
    tierLabels.size * 100 +
    (hasMega ? 5000 : 0) +
    (hasBlack ? 5000 : 0)
  );
}

function findBestPlansFromHtml(
  html: string,
): TonPlanRecord[] | null {
  const states = collectFrshStates(html);

  let best: {
    plans: TonPlanRecord[];
    score: number;
  } | null = null;

  for (const state of states) {
    const plans = findPlans(state);

    if (!plans) {
      continue;
    }

    const score = scorePlans(plans);

    if (!best || score > best.score) {
      best = {
        plans,
        score,
      };
    }
  }

  return best?.plans ?? null;
}

function mapSettlement(
  condition: TonCondition,
): Settlement | null {
  if (
    condition?.anticipation_delay === 0 &&
    condition?.liquidation_type === "daily"
  ) {
    return "same-day";
  }

  if (
    condition?.anticipation_delay === 1 &&
    condition?.liquidation_type === "business-day"
  ) {
    return "one-business-day";
  }

  return null;
}

function mapBrand(
  brand: string,
): CardBrandGroup | null {
  if (brand === "visa" || brand === "mastercard") {
    return "visa-master";
  }

  if (brand === "elo" || brand === "amex") {
    return "elo-amex";
  }

  return null;
}

function getRatesFromMdrs(
  mdrs: TonMdr[],
  brandGroup: CardBrandGroup,
): InstallmentRates {
  const brands =
    brandGroup === "visa-master"
      ? ["visa", "mastercard"]
      : ["elo", "amex"];

  const debitByBrand = new Map<
    string,
    number
  >();

  const creditByBrand = new Map<
    string,
    number[]
  >();

  for (const mdr of mdrs) {
    const cardBrand = mdr.card_brand;

    if (!cardBrand || !brands.includes(cardBrand)) {
      continue;
    }

    const installments = Array.isArray(
      mdr.installments,
    )
      ? mdr.installments
      : [];

    if (mdr?.payment_method === "debit_card") {
      const first = installments.find(
        (item) =>
          item?.installment === 1,
      );

      if (
        first &&
        Number.isFinite(first.mdr)
      ) {
        debitByBrand.set(
          cardBrand,
          Number(first.mdr),
        );
      }
    }

    if (mdr?.payment_method === "credit_card") {
      const ordered = installments
  .filter(
    (item) =>
      typeof item.installment === "number" &&
      Number.isInteger(item.installment) &&
      item.installment >= 1 &&
      item.installment <= 21 &&
      typeof item.mdr === "number" &&
      Number.isFinite(item.mdr),
  )
  .sort(
    (a, b) =>
      (a.installment ?? 0) -
      (b.installment ?? 0),
  );

      if (ordered.length === 21) {
        creditByBrand.set(
  cardBrand,
  ordered.map((item) =>
    Number(item.mdr),
  ),
);
      }
    }
  }

  const missingDebit = brands.filter(
    (brand) => !debitByBrand.has(brand),
  );

  const missingCredit = brands.filter(
    (brand) => !creditByBrand.has(brand),
  );

  if (
    missingDebit.length > 0 ||
    missingCredit.length > 0
  ) {
    throw new Error(
      `Dados incompletos para ${brandGroup}. ` +
        `Débito ausente: ${missingDebit.join(", ") || "não"}. ` +
        `Crédito ausente: ${missingCredit.join(", ") || "não"}.`,
    );
  }

  const debitValues = brands.map(
    (brand) => debitByBrand.get(brand)!,
  );

  const creditValues = brands.map(
    (brand) => creditByBrand.get(brand)!,
  );

  if (
    !debitValues.every(
      (value) => value === debitValues[0],
    )
  ) {
    throw new Error(
      `As taxas de débito divergem entre as bandeiras de ${brandGroup}.`,
    );
  }

  const firstCredit = creditValues[0];

  if (
    !creditValues.every((values) =>
      values.every(
        (value, index) =>
          value === firstCredit[index],
      ),
    )
  ) {
    throw new Error(
      `As taxas de crédito divergem entre as bandeiras de ${brandGroup}.`,
    );
  }

  return {
    debit: debitValues[0],
    credit: firstCredit[0],
    installments: firstCredit.slice(1),
  };
}

function buildConfigs(
  plans: TonPlanRecord[],
): {
  configs: TonRateConfig[];
  megaTiers: Set<string>;
  blackTiers: Set<string>;
  sourceRatesUpdatedAt: string | null;
  sourceConditionsUpdatedAt: string | null;
} {
  const configs: TonRateConfig[] = [];
  const megaTiers = new Set<string>();
  const blackTiers = new Set<string>();

  let sourceRatesUpdatedAt: string | null = null;
  let sourceConditionsUpdatedAt: string | null = null;

  for (const plan of plans) {
    if (plan?.type !== "transactional") {
      continue;
    }

    const name = plan?.name;

    if (name !== "Ton Mega+" && name !== "Ton Black") {
      continue;
    }

    const tierLabel = String(
      plan.tierLabel ?? "",
    );

    const tier = TIER_MAP[tierLabel];

    if (!tier || tier.plan !== (name === "Ton Mega+" ? "ton-mega-plus" : "ton-black")) {
      throw new Error(
        `Faixa não reconhecida para ${name}: "${tierLabel}"`,
      );
    }

    if (name === "Ton Mega+") {
      megaTiers.add(tierLabel);
    } else {
      blackTiers.add(tierLabel);
    }

    if (plan?.updated_at) {
      sourceRatesUpdatedAt =
        !sourceRatesUpdatedAt ||
        new Date(plan.updated_at) >
          new Date(sourceRatesUpdatedAt)
          ? plan.updated_at
          : sourceRatesUpdatedAt;
    }

    if (plan?.conditions_updated_at) {
      sourceConditionsUpdatedAt =
        !sourceConditionsUpdatedAt ||
        new Date(plan.conditions_updated_at) >
          new Date(sourceConditionsUpdatedAt)
          ? plan.conditions_updated_at
          : sourceConditionsUpdatedAt;
    }

    if (!Array.isArray(plan.conditions)) {
      throw new Error(
        `Plano ${name} / ${tierLabel} não possui conditions válidas.`,
      );
    }

    const settlementMap = new Map<
      Settlement,
      TonCondition
    >();

    for (const condition of plan.conditions) {
      const settlement =
        mapSettlement(condition);

      if (settlement) {
        settlementMap.set(
          settlement,
          condition,
        );
      }
    }

    for (const settlement of [
      "same-day",
      "one-business-day",
    ] as const) {
      const condition =
        settlementMap.get(settlement);

      if (!condition) {
        throw new Error(
          `Plano ${name} / ${tierLabel} não possui a condição ${settlement}.`,
        );
      }

      if (!Array.isArray(condition.mdrs)) {
        throw new Error(
          `Plano ${name} / ${tierLabel} / ${settlement} não possui mdrs válidos.`,
        );
      }

      for (const brand of [
        "visa-master",
        "elo-amex",
      ] as const) {
        configs.push({
          plan: tier.plan,
          salesTier: tier.salesTier,
          brand,
          settlement,
          rates: getRatesFromMdrs(
            condition.mdrs,
            brand,
          ),
        });
      }
    }
  }

  return {
    configs,
    megaTiers,
    blackTiers,
    sourceRatesUpdatedAt,
    sourceConditionsUpdatedAt,
  };
}

function validateConfigs(
  configs: TonRateConfig[],
  megaTiers: Set<string>,
  blackTiers: Set<string>,
) {
  if (megaTiers.size !== EXPECTED_MEGA_TIERS.length) {
    throw new Error(
      `Mega+ incompleto: esperado ${EXPECTED_MEGA_TIERS.length} faixas, encontrado ${megaTiers.size}.`,
    );
  }

  if (blackTiers.size !== EXPECTED_BLACK_TIERS.length) {
    throw new Error(
      `Black incompleto: esperado ${EXPECTED_BLACK_TIERS.length} faixas, encontrado ${blackTiers.size}.`,
    );
  }

  for (const expected of EXPECTED_MEGA_TIERS) {
    if (!megaTiers.has(expected)) {
      throw new Error(
        `Faixa do Mega+ ausente: ${expected}`,
      );
    }
  }

  for (const expected of EXPECTED_BLACK_TIERS) {
    if (!blackTiers.has(expected)) {
      throw new Error(
        `Faixa do Black ausente: ${expected}`,
      );
    }
  }

  const expectedConfigs =
    10 * 2 * 2;

  if (configs.length !== expectedConfigs) {
    throw new Error(
      `Quantidade de configurações inválida: esperado ${expectedConfigs}, encontrado ${configs.length}.`,
    );
  }

  for (const config of configs) {
    if (
      !Number.isFinite(config.rates.debit) ||
      !Number.isFinite(config.rates.credit) ||
      config.rates.debit < 0 ||
      config.rates.credit < 0
    ) {
      throw new Error(
        `Taxa inválida em ${config.plan}/${config.salesTier}/${config.brand}/${config.settlement}.`,
      );
    }

    if (
      config.rates.installments.length !== 20 ||
      config.rates.installments.some(
        (value) =>
          !Number.isFinite(value) ||
          value < 0,
      )
    ) {
      throw new Error(
        `Parcelamento inválido em ${config.plan}/${config.salesTier}/${config.brand}/${config.settlement}.`,
      );
    }
  }
}

function tsString(value: unknown) {
  return JSON.stringify(value);
}

function buildRatesFile(
  configs: TonRateConfig[],
): string {
  const grouped = new Map<
    string,
    TonRateConfig
  >();

  for (const config of configs) {
    const key = [
      config.plan,
      config.salesTier,
      config.brand,
      config.settlement,
    ].join("|");

    grouped.set(key, config);
  }

  const ordered = [...grouped.values()].sort(
    (a, b) =>
      `${a.plan}|${a.salesTier}|${a.brand}|${a.settlement}`.localeCompare(
        `${b.plan}|${b.salesTier}|${b.brand}|${b.settlement}`,
      ),
  );

  const configLines = ordered.map(
    (config) => `  {
    plan: ${tsString(config.plan)},
    salesTier: ${tsString(config.salesTier)},
    brand: ${tsString(config.brand)},
    settlement: ${tsString(config.settlement)},
    rates: {
      debit: ${config.rates.debit},
      credit: ${config.rates.credit},
      installments: [${config.rates.installments.join(", ")}],
    },
  },`,
  );

  return `export type TonPlan = "ton-mega-plus" | "ton-black";
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
    label: \`Crédito \${index + 2}x\`,
  })),
];

export const TON_RATE_NOTES = {
  megaPromotional: "Taxas promocionais válidas durante 30 dias ou até vender R$ 5 mil, o que vier primeiro.",
  black: "Taxas de acordo com suas vendas mensais.",
} as const;

export const tonRateConfigs: TonRateConfig[] = [
${configLines.join("\n")}
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
`;
}


type RateKey = string;

function rateKey(config: TonRateConfig): RateKey {
  return [
    config.plan,
    config.salesTier,
    config.brand,
    config.settlement,
  ].join("|");
}

function normalizeConfig(config: TonRateConfig) {
  return {
    plan: config.plan,
    salesTier: config.salesTier,
    brand: config.brand,
    settlement: config.settlement,
    rates: {
      debit: config.rates.debit,
      credit: config.rates.credit,
      installments: [...config.rates.installments],
    },
  };
}

function parseExistingRateConfigs(
  content: string,
): TonRateConfig[] {
  const configs: TonRateConfig[] = [];

  const blockRegex =
    /{\s*plan:\s*"([^"]+)",\s*salesTier:\s*"([^"]+)",\s*brand:\s*"([^"]+)",\s*settlement:\s*"([^"]+)",\s*rates:\s*{\s*debit:\s*([0-9.]+),\s*credit:\s*([0-9.]+),\s*installments:\s*\[([^\]]*)\]/g;

  for (const match of content.matchAll(blockRegex)) {
    const [
      ,
      plan,
      salesTier,
      brand,
      settlement,
      debit,
      credit,
      installmentsRaw,
    ] = match;

    const installments = installmentsRaw
      .split(",")
      .map((value) => Number(value.trim()))
      .filter((value) => Number.isFinite(value));

    if (
      !plan ||
      !salesTier ||
      !brand ||
      !settlement ||
      installments.length !== 20
    ) {
      continue;
    }

    configs.push({
      plan: plan as TonPlan,
      salesTier: salesTier as SalesTier,
      brand: brand as CardBrandGroup,
      settlement: settlement as Settlement,
      rates: {
        debit: Number(debit),
        credit: Number(credit),
        installments,
      },
    });
  }

  return configs;
}

type RateChange = {
  config: TonRateConfig;
  field:
    | "debit"
    | "credit"
    | `credit-${number}x`;
  previous: number;
  current: number;
};

function compareRateConfigs(
  previous: TonRateConfig[],
  current: TonRateConfig[],
): RateChange[] {
  const previousMap = new Map(
    previous.map((config) => [
      rateKey(config),
      config,
    ]),
  );

  const changes: RateChange[] = [];

  for (const config of current) {
    const old = previousMap.get(
      rateKey(config),
    );

    if (!old) {
      changes.push({
        config,
        field: "debit",
        previous: NaN,
        current: config.rates.debit,
      });
      continue;
    }

    if (
      old.rates.debit !==
      config.rates.debit
    ) {
      changes.push({
        config,
        field: "debit",
        previous: old.rates.debit,
        current: config.rates.debit,
      });
    }

    if (
      old.rates.credit !==
      config.rates.credit
    ) {
      changes.push({
        config,
        field: "credit",
        previous: old.rates.credit,
        current: config.rates.credit,
      });
    }

    config.rates.installments.forEach(
      (currentRate, index) => {
        const previousRate =
          old.rates.installments[index];

        if (
          previousRate !== currentRate
        ) {
          changes.push({
            config,
            field: `credit-${index + 2}x`,
            previous: previousRate,
            current: currentRate,
          });
        }
      },
    );
  }

  return changes;
}

function formatRateChange(
  change: RateChange,
): string {
  const oldValue = Number.isFinite(
    change.previous,
  )
    ? `${change.previous.toFixed(2)}%`
    : "nova";

  const newValue = `${change.current.toFixed(2)}%`;

  return [
    change.config.plan === "ton-mega-plus"
      ? "Mega+"
      : "Black",
    change.config.salesTier,
    change.config.brand,
    change.config.settlement,
    change.field,
    `${oldValue} → ${newValue}`,
  ].join(" | ");
}

function buildChangeSummary(
  changes: RateChange[],
): string {
  if (changes.length === 0) {
    return "Nenhuma alteração nas taxas.";
  }

  const lines = changes
    .slice(0, 20)
    .map(
      (change) =>
        `- ${formatRateChange(change)}`,
    );

  if (changes.length > 20) {
    lines.push(
      `- ... e mais ${changes.length - 20} alteração(ões).`,
    );
  }

  return [
    `🔄 ${changes.length} alteração(ões) detectada(s).`,
    ...lines,
  ].join("\n");
}

function buildMetaFile(meta: Meta): string {
  return `export type TonRatesStatus = "success" | "error";

export type TonRatesMeta = ${"{"}
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
${"}"};

export const tonRatesMeta: TonRatesMeta = ${JSON.stringify(meta, null, 2)};
`;
}

async function sendTelegram(
  text: string,
) {
  if (
    !TELEGRAM_BOT_TOKEN ||
    !TELEGRAM_CHAT_ID
  ) {
    console.log(
      "ℹ️ Telegram não configurado (TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID).",
    );
    return;
  }

  const response = await fetch(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: {
        "content-type":
          "application/json",
      },
      body: JSON.stringify({
        chat_id:
          TELEGRAM_CHAT_ID,
        text,
      }),
    },
  );

  if (!response.ok) {
    throw new Error(
      `Telegram respondeu ${response.status}.`,
    );
  }
}

async function writeMeta(
  meta: Meta,
) {
  await fs.mkdir(
    path.dirname(META_FILE),
    { recursive: true },
  );

  await fs.writeFile(
    META_FILE,
    buildMetaFile(meta),
    "utf8",
  );
}

async function update() {
  console.log("🌐 Abrindo página da Ton...");
  console.log(
    `🔗 ${TON_URL}`,
  );

  const browser = await chromium.launch({
    headless: true,
  });

  const page = await browser.newPage();

  let bestPlans: TonPlanRecord[] | null = null;
  let bestScore = -1;

  page.on(
    "response",
    async (response) => {
      try {
        const contentType =
          response.headers()[
            "content-type"
          ] ?? "";

        if (
          !contentType.includes("text/html")
        ) {
          return;
        }

        const body =
          await response.text();

        const plans =
          findBestPlansFromHtml(body);

        if (!plans) {
          return;
        }

        const score =
          scorePlans(plans);

        if (score > bestScore) {
          bestScore = score;
          bestPlans = plans;

          console.log(
            `🔥 Fonte candidata encontrada: ${plans.length} planos. Score ${score}.`,
          );
        }
      } catch {
        // Response não analisável: ignorar e continuar.
      }
    },
  );

  try {
    await page.goto(TON_URL, {
      waitUntil: "networkidle",
      timeout: 60_000,
    });
  } catch {
    console.log(
      "⚠️ networkidle não foi atingido. Continuando...",
    );
  }

  await page.waitForTimeout(10_000);

  await browser.close();

  if (!bestPlans) {
    throw new Error(
      "Nenhuma fonte válida de planos/taxas foi encontrada.",
    );
  }

  const built = buildConfigs(
    bestPlans,
  );

  validateConfigs(
    built.configs,
    built.megaTiers,
    built.blackTiers,
  );

  const fetchedAt = nowIso();

  const newRatesContent =
    buildRatesFile(built.configs);

  let previousConfigs: TonRateConfig[] = [];
  let ratesFileExists = true;

  try {
    const previousRatesContent =
      await fs.readFile(
        RATES_FILE,
        "utf8",
      );

    previousConfigs =
      parseExistingRateConfigs(
        previousRatesContent,
      );
  } catch {
    ratesFileExists = false;
  }

  const changes = compareRateConfigs(
    previousConfigs,
    built.configs,
  );

  const ratesChanged =
    !ratesFileExists ||
    changes.length > 0;

  const meta: Meta = {
    status: "success",
    fetchedAt,
    sourceRatesUpdatedAt:
      built.sourceRatesUpdatedAt,
    sourceConditionsUpdatedAt:
      built.sourceConditionsUpdatedAt,
    plans: 10,
    megaTiers: built.megaTiers.size,
    blackTiers: built.blackTiers.size,
    configs: built.configs.length,
    installmentsPerCreditConfig: 21,
    message: buildChangeSummary(changes),
  };

  await fs.mkdir(
    path.dirname(RATES_FILE),
    { recursive: true },
  );

  if (ratesChanged) {
    /*
     * Só atualiza o arquivo quando os valores realmente
     * mudaram ou quando ainda não existe uma tabela local.
     */
    await fs.writeFile(
      RATES_FILE,
      newRatesContent,
      "utf8",
    );

    console.log("\n🔄 ALTERAÇÕES NAS TAXAS");
    console.log(buildChangeSummary(changes));
  } else {
    console.log(
      "\n✅ Nenhuma alteração nas taxas.",
    );
    console.log(
      "O arquivo data/ton-rates.ts não foi regravado.",
    );
  }

  await writeMeta(meta);

  console.log("\n====================================");
  console.log(
    ratesChanged
      ? "✅ TAXAS VERIFICADAS E ATUALIZADAS"
      : "✅ TAXAS VERIFICADAS — SEM ALTERAÇÕES",
  );
  console.log("====================================");
  console.log(
    `Mega+: ${built.megaTiers.size} faixas`,
  );
  console.log(
    `Black: ${built.blackTiers.size} faixas`,
  );
  console.log(
    `Configurações: ${built.configs.length}`,
  );
  console.log(
    `Taxas da Ton atualizadas em: ${
      built.sourceRatesUpdatedAt ?? "não informado"
    }`,
  );
  console.log(
    `Captura realizada em: ${fetchedAt}`,
  );
}

async function main() {
  try {
    await update();
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : String(error);

    const meta: Meta = {
      status: "error",
      fetchedAt: nowIso(),
      sourceRatesUpdatedAt: null,
      sourceConditionsUpdatedAt: null,
      plans: 0,
      megaTiers: 0,
      blackTiers: 0,
      configs: 0,
      installmentsPerCreditConfig: 0,
      message,
    };

    /*
     * Importante:
     * não alteramos ton-rates.ts quando falha.
     * Só registramos o status da tentativa.
     */
    await writeMeta(meta);

    const alert =
      `🚨 ALERTA — Atualização das taxas Ton falhou\n\n` +
      `Data: ${new Date().toLocaleString(
        "pt-BR",
        {
          timeZone:
            "America/Sao_Paulo",
        },
      )}\n\n` +
      `Motivo: ${message}\n\n` +
      `A última tabela válida foi mantida no site.`;

    console.error(
      "\n" + alert,
    );

    try {
      await sendTelegram(alert);
    } catch (telegramError) {
      console.error(
        "⚠️ Falha ao enviar alerta no Telegram:",
        telegramError,
      );
    }

    process.exit(1);
  }
}

main();