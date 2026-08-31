"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronDown,
  CreditCard,
  Gift,
  ShoppingCart,
  Sparkles,
  Truck,
  Wallet,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import {
  brandOptions,
  getInstallmentRate,
  getSalesTierOptionsForPlan,
  getTapTonRate,
  getTonRate,
  installmentOptions,
  planOptions,
  settlementOptions,
  type CardBrandGroup,
  type SalesTier,
  type Settlement,
  type TonPlan,
} from "@/data/ton-rates";
import { tonRatesMeta } from "@/data/ton-rates-meta";

import { TrackedLink } from "@/components/shared/TrackedLink";

const MACHINE_URL =
  "https://www.ton.com.br/maquininha/t3-smart?coupon=ELIEVELTOSILVAVC&userAnticipation=0&utm_medium=invite_share&utm_source=revendedor";

const TON_PLANS_URL =
  "https://www.ton.com.br/planos-e-taxas?coupon=ELIEVELTOSILVAVC&userAnticipation=0&utm_medium=invite_share&utm_source=revendedor";

const MAX_SALE_VALUE = 10_000;

type CalculatorMode = "machines" | "tap-ton";

type ComparisonItem = {
  key: string;
  label: string;
  rate: number;
  amount: number;
  isPix?: boolean;
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}
function formatUpdatedDate(value: string | null) {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeZone: "America/Sao_Paulo",
  }).format(date);
}
const ratesUpdatedDate = formatUpdatedDate(tonRatesMeta.sourceRatesUpdatedAt);

function formatRate(value: number) {
  return value.toFixed(2).replace(".", ",");
}

function parseSaleValue(value: string) {
  const normalized = value
    .replace(/\./g, "")
    .replace(",", ".")
    .replace(/[^\d.]/g, "");

  const parsed = Number(normalized);

  if (!Number.isFinite(parsed)) {
    return 0;
  }

  return Math.max(0, parsed);
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string | number;
  options: {
    value: string | number;
    label: string;
  }[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <label className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-sky-600">
        {label}
      </label>

      <div className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="
            h-12 w-full appearance-none
            rounded-xl border border-sky-200
            bg-sky-50/50 px-3.5 pr-9
            text-sm font-semibold text-sky-950
            outline-none transition-all
            hover:border-sky-400
            focus:border-sky-500
            focus:ring-4 focus:ring-sky-500/10
          "
        >
          {options.map((option) => (
            <option key={String(option.value)} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          className="
            pointer-events-none absolute right-3 top-1/2
            size-4 -translate-y-1/2 text-sky-600
          "
        />
      </div>
    </div>
  );
}

function ComparisonRow({ item }: { item: ComparisonItem }) {
  return (
    <motion.div
      layout
      initial={{
        opacity: 0,
        y: 6,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: -6,
      }}
      transition={{
        duration: 0.2,
      }}
      className="
        flex items-center justify-between
        gap-4 border-t border-border
        py-3 first:border-t-0
      "
    >
      <div className="flex min-w-0 items-center gap-2.5">
        <div
          className={[
            "flex size-8 shrink-0 items-center justify-center rounded-lg",
            item.isPix
              ? "bg-orange-50 text-orange-500"
              : "bg-primary/10 text-primary",
          ].join(" ")}
        >
          {item.isPix ? (
            <Zap className="size-4" />
          ) : (
            <CreditCard className="size-4" />
          )}
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-foreground">
            {item.label}
          </p>

          <p
            className={[
              "text-[11px] font-semibold",
              item.isPix ? "text-orange-500" : "text-primary",
            ].join(" ")}
          >
            {item.rate === 0 ? "Taxa zero" : `${formatRate(item.rate)}%`}
          </p>
        </div>
      </div>

      <div className="shrink-0 text-right">
        <p className="text-[10px] font-medium text-muted">Você recebe</p>

        <AnimatePresence mode="wait">
          <motion.p
            key={`${item.key}-${item.amount}`}
            initial={{
              opacity: 0,
              y: 5,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -5,
            }}
            transition={{
              duration: 0.18,
            }}
            className="text-lg font-black tracking-tight text-primary"
          >
            {formatCurrency(item.amount)}
          </motion.p>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function TaxCalculator() {
  const [mode, setMode] = useState<CalculatorMode>("machines");
  const [plan, setPlan] = useState<TonPlan>("ton-mega-plus");

  const [salesTier, setSalesTier] = useState<SalesTier>("promotional");

  const [brand, setBrand] = useState<CardBrandGroup>("visa-master");

  const [settlement, setSettlement] = useState<Settlement>("one-business-day");

  const [installments, setInstallments] = useState(0);

  const [saleValue, setSaleValue] = useState("100");

  const [limitMessage, setLimitMessage] = useState(false);

  const isSaleValueEmpty = saleValue.trim() === "";
  const isTapTon = mode === "tap-ton";

  const availableSalesTierOptions = useMemo(() => {
    return getSalesTierOptionsForPlan(plan);
  }, [plan]);

  useEffect(() => {
    const options = getSalesTierOptionsForPlan(plan);
    const currentExists = options.some((option) => option.value === salesTier);

    if (!currentExists && options.length > 0) {
      setSalesTier(options[0].value);
    }
  }, [plan, salesTier]);

  const numericSaleValue = useMemo(() => {
    return Math.min(MAX_SALE_VALUE, parseSaleValue(saleValue));
  }, [saleValue]);

  const rates = useMemo(() => {
    if (isTapTon) {
      return getTapTonRate(brand, settlement);
    }

    return getTonRate(plan, salesTier, brand, settlement);
  }, [isTapTon, plan, salesTier, brand, settlement]);

  const currentRate = useMemo(() => {
    if (!rates) {
      return 0;
    }

    return getInstallmentRate(rates, installments);
  }, [rates, installments]);

  const fee = useMemo(() => {
    return numericSaleValue * (currentRate / 100);
  }, [numericSaleValue, currentRate]);

  const received = useMemo(() => {
    return Math.max(0, numericSaleValue - fee);
  }, [numericSaleValue, fee]);

  const currentPaymentLabel =
    installmentOptions.find((item) => item.value === installments)?.label ??
    `${installments}x`;

  const currentSettlementLabel =
    settlementOptions.find((item) => item.value === settlement)?.label ??
    "1 dia útil";

  const comparisonItems = useMemo<ComparisonItem[]>(() => {
    if (!rates) {
      return [];
    }

    const items: ComparisonItem[] = [];

    // PIX — sempre aparece, exceto se no futuro passar a ser uma
    // opção selecionável no campo principal.
    if (installments !== -1) {
      items.push({
        key: "pix",
        label: "Pix",
        rate: 0,
        amount: numericSaleValue,
        isPix: true,
      });
    }

    // DÉBITO — remove do comparativo se estiver selecionado.
    if (installments !== 0) {
      const rate = getInstallmentRate(rates, 0);

      items.push({
        key: "debit",
        label: "Débito",
        rate,
        amount:
          numericSaleValue -
          numericSaleValue * (rate / 100),
      });
    }

    // CRÉDITO À VISTA — remove do comparativo se estiver selecionado.
    if (installments !== 1) {
      const rate = getInstallmentRate(rates, 1);

      items.push({
        key: "credit",
        label: "Crédito à vista",
        rate,
        amount:
          numericSaleValue -
          numericSaleValue * (rate / 100),
      });
    }

    // CRÉDITO 3X — remove do comparativo se estiver selecionado.
    if (installments !== 3) {
      const rate = getInstallmentRate(rates, 3);

      items.push({
        key: "credit-3x",
        label: "Crédito 3x",
        rate,
        amount:
          numericSaleValue -
          numericSaleValue * (rate / 100),
      });
    }

    // CRÉDITO 12X — remove do comparativo se estiver selecionado.
    if (installments !== 12) {
      const rate = getInstallmentRate(rates, 12);

      items.push({
        key: "credit-12x",
        label: "Crédito 12x",
        rate,
        amount:
          numericSaleValue -
          numericSaleValue * (rate / 100),
      });
    }

    return items;
  }, [installments, numericSaleValue, rates]);

  function handleSaleValueChange(value: string) {
    const cleaned = value.replace(/[^\d.,]/g, "");

    const parsed = parseSaleValue(cleaned);

    if (parsed > MAX_SALE_VALUE) {
      setSaleValue("10000");
      setLimitMessage(true);
      return;
    }

    setLimitMessage(false);
    setSaleValue(cleaned);
  }

  function normalizeSaleValue() {
    const parsed = parseSaleValue(saleValue);

    if (parsed > MAX_SALE_VALUE) {
      setSaleValue("10000");
      setLimitMessage(true);
      return;
    }

    setLimitMessage(false);

    setSaleValue(parsed.toFixed(2).replace(".", ","));
  }

  return (
    <section
      id="calculadora"
      className="
        relative overflow-hidden
        bg-white
        py-14 sm:py-20
      "
    >
      {/* =====================================================
          DECORAÇÃO
         ===================================================== */}

      <div
        className="
          pointer-events-none absolute
          -left-32 top-16
          size-64 rounded-full
          bg-primary/10 blur-3xl
        "
      />

      <div
        className="
          pointer-events-none absolute
          -right-32 bottom-10
          size-72 rounded-full
          bg-orange-500/10 blur-3xl
        "
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* =====================================================
            CABEÇALHO
           ===================================================== */}

        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.45,
            }}
            className="
              mb-3 inline-flex
              items-center gap-2
              rounded-full
              bg-primary/10
              px-3.5 py-1.5
              text-xs font-bold
              text-primary
            "
          >
            <Sparkles className="size-3.5" />
            Simule suas taxas
          </motion.div>

          <motion.h2
            initial={{
              opacity: 0,
              y: 10,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.45,
              delay: 0.05,
            }}
            className="
              text-3xl
              font-black
              tracking-tight
              text-foreground
              sm:text-4xl
            "
          >
            Quanto você recebe
            <span className="text-primary"> de verdade?</span>
          </motion.h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted sm:text-base">
            Escolha as condições da venda e veja imediatamente quanto entra na
            sua conta.
          </p>
        </div>

        {/* =====================================================
            ALTERNADOR
           ===================================================== */}

        <div className="mb-8 flex justify-center sm:mb-10">
          <div
            className="
              inline-flex rounded-full border border-border
              bg-slate-100 p-1 shadow-sm
            "
            role="tablist"
            aria-label="Tipo de calculadora"
          >
            <button
              type="button"
              role="tab"
              aria-selected={!isTapTon}
              onClick={() => setMode("machines")}
              className={[
                "rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-200",
                !isTapTon
                  ? "bg-white text-primary shadow-sm"
                  : "text-muted hover:text-foreground",
              ].join(" ")}
            >
              Maquininhas
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={isTapTon}
              onClick={() => setMode("tap-ton")}
              className={[
                "rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-200",
                isTapTon
                  ? "bg-white text-primary shadow-sm"
                  : "text-muted hover:text-foreground",
              ].join(" ")}
            >
              TapTon
            </button>
          </div>
        </div>

        {/* =====================================================
            CARD PRINCIPAL
           ===================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 18,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.55,
          }}
          className="
            overflow-hidden
            rounded-[28px]
            border border-border
            bg-white
            shadow-[0_20px_60px_rgba(0,0,0,0.07)]
          "
        >
          {/* ===================================================
              MOBILE / TABLET
             =================================================== */}

          <div className="lg:hidden">
            {/* CABEÇALHO */}

            <div
              className="
                flex items-center justify-between
                gap-4
                border-b border-border
                px-5 py-5
                sm:px-7
              "
            >
              <div className="flex min-w-0 items-center gap-3">
                <div
                  className="
                    flex size-10 shrink-0
                    items-center justify-center
                    rounded-xl
                    bg-foreground
                    text-white
                  "
                >
                  <CreditCard className="size-5" />
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-muted">
                    {isTapTon ? "Forma de pagamento" : "Plano"}
                  </p>

                  <p className="truncate text-lg font-black text-foreground">
                    {isTapTon
                      ? "TapTon"
                      : plan === "ton-mega-plus"
                        ? "Ton Mega+"
                        : "Ton Black"}
                  </p>
                </div>
              </div>

              <div
                className="
                  shrink-0
                  rounded-full
                  px-3 py-1.5
                  text-[10px]
                  font-black
                  "
              >
                {isTapTon ? (
                  <span className="rounded-full bg-primary/10 px-3 py-1.5 text-primary">
                    Grátis no celular
                  </span>
                ) : (
                  <span className="rounded-full bg-orange-50 px-3 py-1.5 text-orange-600">
                    20% OFF
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-1 px-5 py-5 sm:px-7">
              {/* PLANO */}

              {!isTapTon && (
                <div className="border-b border-border pb-4">
                  <SelectField
                    label="Plano"
                    value={plan}
                    onChange={(value) => setPlan(value as TonPlan)}
                    options={planOptions.map((option) => ({
                      value: option.value,
                      label: option.available
                        ? option.label
                        : `${option.label} — em breve`,
                    }))}
                  />

                  <AnimatePresence>
                    {plan === "ton-black" && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="
                          mt-3 rounded-xl border border-orange-200
                          bg-orange-50 px-3.5 py-2.5
                        "
                      >
                        <p className="text-xs font-black text-orange-700">
                          🟠 Exclusivo para MEI / PJ
                        </p>
                        <p className="mt-0.5 text-[11px] leading-4 text-orange-700/80">
                          Disponível para empresas e MEIs.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* VENDAS + RECEBIMENTO */}

              {isTapTon ? (
                <div className="border-b border-border py-4">
                  <SelectField
                    label="Recebimento"
                    value={settlement}
                    onChange={(value) => setSettlement(value as Settlement)}
                    options={settlementOptions}
                  />
                  <p className="mt-2 text-[10px] leading-4 text-muted">
                    No TapTon, o plano é único e as taxas variam conforme o prazo de recebimento.
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 border-b border-border py-4 sm:grid-cols-2">
                  <SelectField
                    label="Vendas mensais"
                    value={salesTier}
                    onChange={(value) => setSalesTier(value as SalesTier)}
                    options={availableSalesTierOptions}
                  />

                  <SelectField
                    label="Recebimento"
                    value={settlement}
                    onChange={(value) => setSettlement(value as Settlement)}
                    options={settlementOptions}
                  />
                </div>
              )}

              {/* BANDEIRAS + PAGAMENTO */}

              <div className="grid gap-4 border-b border-border py-4 sm:grid-cols-2">
                <SelectField
                  label="Bandeiras"
                  value={brand}
                  onChange={(value) => setBrand(value as CardBrandGroup)}
                  options={brandOptions}
                />

                <SelectField
                  label="Parcelamento escolhido"
                  value={installments}
                  onChange={(value) => setInstallments(Number(value))}
                  options={installmentOptions}
                />
              </div>

              {/* VALOR */}

              <div className="pt-4">
                <label
                  htmlFor="sale-value-mobile"
                  className="
                    mb-2 block
                    text-[11px]
                    font-bold uppercase
                    tracking-[0.08em]
                    text-muted
                  "
                >
                  Valor da venda
                </label>

                <div
                  className="
                    flex h-14 overflow-hidden
                    rounded-2xl
                    border border-sky-200
                    bg-sky-50/40
                    transition-all
                    focus-within:border-sky-500
                    focus-within:ring-4
                    focus-within:ring-sky-500/10
                  "
                >
                  <div
                    className="
                      flex items-center
                      border-r border-sky-200
                      bg-sky-100/70
                      px-4
                      text-sm font-bold
                      text-sky-700
                    "
                  >
                    R$
                  </div>

                  <input
                    id="sale-value-mobile"
                    inputMode="decimal"
                    value={saleValue}
                    onChange={(event) =>
                      handleSaleValueChange(event.target.value)
                    }
                    onBlur={normalizeSaleValue}
                    className="
                      min-w-0 flex-1
                      bg-transparent
                      px-4
                      text-2xl
                      font-black
                      text-sky-950
                      outline-none
                    "
                    placeholder="100,00"
                    aria-label="Valor da venda"
                  />
                </div>

                <p className="mt-2 text-[10px] text-muted">
                  Simule vendas de até{" "}
                  <strong className="text-foreground">R$ 10.000,00</strong>
                </p>
                <div
                  className="
    group mt-5 flex w-full
    items-center justify-center
    rounded-xl
    border border-orange-300/30
    bg-orange-50/60
    px-4 py-3.5
    shadow-sm
  "
                  aria-hidden="true"
                >
                  <p
                    className="
      flex items-center justify-center gap-2
      text-center
      text-sm font-extrabold text-orange-600
      animate-bounce
    "
                  >
                    👇🔥 Quanto cai em sua Conta? 👇🔥
                  </p>
                </div>

                <AnimatePresence>
                  {limitMessage && (
                    <motion.p
                      initial={{
                        opacity: 0,
                        y: -5,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: -5,
                      }}
                      className="
                        mt-2
                        rounded-xl
                        bg-orange-50
                        px-3 py-2
                        text-xs
                        font-semibold
                        text-orange-700
                      "
                    >
                      O simulador está limitado a vendas de até R$ 10.000,00.
                    </motion.p>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {isSaleValueEmpty && (
                    <motion.p
                      initial={{
                        opacity: 0,
                        y: -5,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: -5,
                      }}
                      className="
                        mt-2
                        rounded-xl
                        bg-slate-50
                        px-3 py-2
                        text-xs
                        font-semibold
                        text-slate-700
                        ring-1 ring-slate-200
                      "
                    >
                      Digite um valor acima de R$ 1.00 para calcular sua venda.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* RESULTADO */}

            <div
              className="
                border-t border-border
                bg-[#f7faf8]
                px-5 py-6
                sm:px-7
              "
            >
              <div className="flex items-end justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-bold text-muted">
                      Em uma venda de{" "}
                      <strong className="text-foreground">
                        {formatCurrency(numericSaleValue)}
                      </strong>
                    </p>

                    <p className="text-sm font-bold text-muted">Você recebe:</p>
                  </div>
                </div>

                <div
                  className="
                    flex size-11 shrink-0
                    items-center justify-center
                    rounded-2xl
                    bg-white
                    text-primary
                    shadow-sm
                    ring-1 ring-border
                  "
                >
                  <Wallet className="size-5" />
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${received}-${currentRate}`}
                  initial={{
                    opacity: 0,
                    y: 12,
                    scale: 0.97,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: -8,
                    scale: 0.99,
                  }}
                  transition={{
                    duration: 0.28,
                  }}
                  className="
                    mt-4
                    sm:mt-2
                    text-5xl
                    font-black
                    tracking-tight
                    text-primary
                    sm:text-6xl
                  "
                >
                  {formatCurrency(received)}
                </motion.div>
              </AnimatePresence>
              <motion.p
                initial={{
                  opacity: 0,
                  y: 5,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.3,
                  delay: 0.05,
                }}
                className="
    mt-4
    sm:mt-2
    text-sm
    font-bold
    text-orange-600
  "
              >
                Esse valor cai na sua conta bancária
              </motion.p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span
                  className="
                    rounded-full
                    bg-primary/10
                    px-3 py-1
                    text-[11px]
                    font-bold
                    text-primary
                  "
                >
                  Taxa {formatRate(currentRate)}%
                </span>

                <span
                  className="
                    rounded-full
                    bg-white
                    px-3 py-1
                    text-[11px]
                    font-semibold
                    text-muted
                    ring-1 ring-border
                  "
                >
                  {currentSettlementLabel}
                </span>
                <span
                  className="
                    rounded-full
                    bg-white
                    px-3 py-1
                    text-[11px]
                    font-semibold
                    text-muted
                    ring-1 ring-border
                  "
                >
                  {currentPaymentLabel}
                </span>
              </div>
            </div>

            {/* COMPARATIVO */}

            <div className="px-5 py-5 sm:px-7">
              <div className="mb-2">
                <h3 className="text-base font-black text-foreground">
                  Quanto cai em sua conta no mesmo plano:
                </h3>

                <p className="text-xs leading-5 text-muted">
                  Compare outras formas de pagamento usando o mesmo valor da venda.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-white px-4">
                <AnimatePresence initial={false}>
                  {comparisonItems.map((item) => (
                    <ComparisonRow key={item.key} item={item} />
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* CTA */}

            <div className="px-5 pb-6 sm:px-7 sm:pb-7">
              <div
                className="
                  overflow-hidden
                  rounded-2xl
                  border border-primary/15
                  bg-primary/[0.04]
                  p-5
                "
              >
                <div className="flex items-start gap-3">
                  <div
                    className="
                      flex size-10 shrink-0
                      items-center justify-center
                      rounded-xl
                      bg-primary
                      text-white
                    "
                  >
                    <ShoppingCart className="size-5" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-base font-black text-foreground">
                      {isTapTon
                        ? "Venda pelo celular com o TapTon."
                        : "Pague menos taxas e receba mais."}
                    </p>

                    <p className="mt-1 text-sm leading-6 text-muted">
                      {isTapTon
                        ? "Transforme seu celular em maquininha e comece a vender."
                        : "Use meu cupom e peça sua maquininha com 20% de desconto."}
                    </p>
                  </div>
                </div>

                <TrackedLink
                  href={isTapTon ? TON_PLANS_URL : MACHINE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  tracking={{
                    event: "machine_click",
                    location: "tax_calculator",
                    destination: "checkout",
                    label: isTapTon
                          ? "Começar a usar o TapTon"
                          : "Pedir maquininha com 20% de desconto",
                    product: "ton",
                    conversionStrength: "strong",
                  }}
                  className="
                        group
                        mt-4 flex w-full
                        items-center
                        justify-center
                        gap-2.5
                        rounded-xl
                        bg-orange-500
                        px-4 py-3.5
                        text-sm font-black
                        text-white
                        shadow-lg
                        shadow-orange-500/20
                        transition-all duration-300
                        hover:-translate-y-0.5
                        hover:bg-orange-600
                        hover:shadow-xl
                        active:translate-y-0
                      "
                >
                  Pedir maquininha com 20% de desconto
                  <ArrowRight
                    className="
                      size-4
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  />
                </TrackedLink>

                <p className="mt-2 text-center text-[10px] text-muted">
                  {isTapTon
                        ? "O TapTon é gratuito para baixar e usar."
                        : "O desconto é aplicado pelo seu cupom ao acessar a Ton."}
                </p>
              </div>
            </div>
          </div>

          {/* ===================================================
              DESKTOP
             =================================================== */}

          <div className="hidden lg:grid lg:grid-cols-[1.05fr_0.95fr]">
            {/* ESQUERDA */}

            <div className="p-8 xl:p-10">
              <div className="mb-8 flex items-center gap-3">
                <div
                  className="
                    flex size-11
                    items-center justify-center
                    rounded-xl
                    bg-foreground
                    text-white
                  "
                >
                  <CreditCard className="size-5" />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-muted">
                    Configure sua venda
                  </p>

                  <h3 className="text-xl font-black text-foreground">
                    Simulador de Vendas
                  </h3>
                </div>
              </div>

              {/* PLANO */}
              {!isTapTon && (

              <div className="mb-5">
                <SelectField
                  label="Plano"
                  value={plan}
                  onChange={(value) => setPlan(value as TonPlan)}
                  options={planOptions.map((option) => ({
                    value: option.value,
                    label: option.available
                      ? option.label
                      : `${option.label} — em breve`,
                  }))}
                />

                <AnimatePresence>
                  {plan === "ton-black" && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: -4,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: -4,
                      }}
                      className="
          mt-3
          rounded-xl
          border border-orange-200
          bg-orange-50
          px-3.5 py-2.5
        "
                    >
                      <p className="text-xs font-black text-orange-700">
                        🟠 Exclusivo para MEI / PJ
                      </p>

                      <p className="mt-0.5 text-[11px] leading-4 text-orange-700/80">
                        Disponível para empresas e MEIs.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              )}

              {/* VENDAS + RECEBIMENTO */}

              {isTapTon ? (
                <div className="border-t border-border pt-5">
                  <SelectField
                    label="Recebimento"
                    value={settlement}
                    onChange={(value) => setSettlement(value as Settlement)}
                    options={settlementOptions}
                  />
                  <p className="mt-2 text-[10px] leading-4 text-muted">
                    No TapTon, o plano é único e as taxas variam conforme o prazo de recebimento.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 border-t border-border pt-5">
                  <SelectField
                    label="Vendas mensais"
                    value={salesTier}
                    onChange={(value) => setSalesTier(value as SalesTier)}
                    options={availableSalesTierOptions}
                  />

                  <SelectField
                    label="Recebimento"
                    value={settlement}
                    onChange={(value) => setSettlement(value as Settlement)}
                    options={settlementOptions}
                  />
                </div>
              )}

              {/* BANDEIRAS + PAGAMENTO */}

              <div className="mt-5 grid grid-cols-2 gap-4 border-t border-border pt-5">
                <SelectField
                  label="Bandeiras"
                  value={brand}
                  onChange={(value) => setBrand(value as CardBrandGroup)}
                  options={brandOptions}
                />

                <SelectField
                  label="Parcelamento escolhido"
                  value={installments}
                  onChange={(value) => setInstallments(Number(value))}
                  options={installmentOptions}
                />
              </div>

              {/* VALOR */}

              <div className="mt-5 border-t border-border pt-5">
                <label
                  htmlFor="sale-value-desktop"
                  className="
                    mb-2 block
                    text-[11px]
                    font-bold uppercase
                    tracking-[0.08em]
                    text-muted
                  "
                >
                  Valor da venda
                </label>

                <div
                  className="
                    flex h-16 overflow-hidden
                    rounded-2xl
                    border border-sky-200
                    bg-sky-50/40
                    transition-all
                    focus-within:border-sky-500
                    focus-within:ring-4
                    focus-within:ring-sky-500/10
                  "
                >
                  <div
                    className="
                      flex items-center
                      border-r border-sky-200
                      bg-sky-100/70
                      px-5
                      text-sm font-bold
                      text-sky-700
                    "
                  >
                    R$
                  </div>

                  <input
                    id="sale-value-desktop"
                    inputMode="decimal"
                    value={saleValue}
                    onChange={(event) =>
                      handleSaleValueChange(event.target.value)
                    }
                    onBlur={normalizeSaleValue}
                    className="
                      min-w-0 flex-1
                      bg-transparent
                      px-5
                      text-2xl font-black
                      text-sky-950
                      outline-none
                    "
                    placeholder="100,00"
                    aria-label="Valor da venda"
                  />
                </div>

                <p className="mt-2 text-[10px] text-muted">
                  Simule vendas de até{" "}
                  <strong className="text-foreground">R$ 10.000,00</strong>
                </p>

                <AnimatePresence>
                  {limitMessage && (
                    <motion.p
                      initial={{
                        opacity: 0,
                        y: -5,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: -5,
                      }}
                      className="
                        mt-2
                        rounded-xl
                        bg-orange-50
                        px-3 py-2
                        text-xs
                        font-semibold
                        text-orange-700
                      "
                    >
                      O simulador está limitado a vendas de até R$ 10.000,00.
                    </motion.p>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {isSaleValueEmpty && (
                    <motion.p
                      initial={{
                        opacity: 0,
                        y: -5,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: -5,
                      }}
                      className="
                        mt-2
                        rounded-xl
                        bg-slate-50
                        px-3 py-2
                        text-xs
                        font-semibold
                        text-slate-700
                        ring-1 ring-slate-200
                      "
                    >
                      Digite um valor acima de R$ 1.00 para calcular sua venda.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* =================================================
                  VANTAGENS DESKTOP
                 ================================================= */}

              <div className="mt-7 border-t border-border pt-6">
                <div className="mb-4">
                  <p className="text-lg font-black text-foreground">
                    Por que escolher a Ton?
                  </p>

                  <p className="mt-1 text-xs leading-5 text-muted">
                    Além de taxas competitivas, você conta com benefícios para
                    vender mais.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-x-5 gap-y-4">
                  <div className="flex items-start gap-2.5">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />

                    <div>
                      <p className="text-sm font-bold text-foreground">
                        Menores taxas
                      </p>

                      <p className="text-[11px] leading-4 text-muted">
                        Mais dinheiro fica na sua conta.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Zap className="mt-0.5 size-4 shrink-0 text-orange-500" />

                    <div>
                      <p className="text-sm font-bold text-foreground">
                        Pix com taxa zero
                      </p>

                      <p className="text-[11px] leading-4 text-muted">
                        Receba pelo Pix sem taxa.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CreditCard className="mt-0.5 size-4 shrink-0 text-primary" />

                    <div>
                      <p className="text-sm font-bold text-foreground">
                        Até 21x no cartão
                      </p>

                      <p className="text-[11px] leading-4 text-muted">
                        Mais opções para seus clientes.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Gift className="mt-0.5 size-4 shrink-0 text-orange-500" />

                    <div>
                      <p className="text-sm font-bold text-foreground">
                        Sem aluguel
                      </p>

                      <p className="text-[11px] leading-4 text-muted">
                        Sem mensalidade da maquininha.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Wallet className="mt-0.5 size-4 shrink-0 text-primary" />

                    <div>
                      <p className="text-sm font-bold text-foreground">
                        Garantia vitalícia
                      </p>

                      <p className="text-[11px] leading-4 text-muted">
                        Proteção conforme as condições da Ton.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Truck className="mt-0.5 size-4 shrink-0 text-orange-500" />

                    <div>
                      <p className="text-sm font-bold text-foreground">
                        Frete grátis
                      </p>

                      <p className="text-[11px] leading-4 text-muted">
                        Consulte as condições da oferta.
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="
                    mt-5
                    rounded-xl
                    border border-primary/15
                    bg-primary/[0.04]
                    px-4 py-3
                  "
                >
                  <p className="text-center text-xs font-bold text-primary">
                    Venda mais. Pague menos taxas. Receba mais.
                  </p>
                </div>
                <a
                  href="#faq-planos"
                  className="
    group mt-5 flex w-full
    items-center justify-center
    gap-3 rounded-xl
    border border-primary/20
    bg-primary/5
    px-4 py-3.5
    text-left
    transition-all duration-300
    hover:-translate-y-0.5
    hover:border-primary/30
    hover:bg-primary/10
    hover:shadow-md
    hover:shadow-primary/10
  "
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-muted">
                      Ainda em dúvida qual plano escolher?
                    </p>

                    <p className="mt-0.5 text-sm font-extrabold text-primary">
                      Conheça mais Detalhes Sobre os Planos Mega+ e Black
                    </p>
                  </div>

                  <ArrowRight className="size-5 shrink-0 text-primary transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </div>

            {/* =================================================
                DIREITA
               ================================================= */}

            <div
              className="
                relative
                flex flex-col
                border-l border-border
                bg-[#f7faf8]
                p-8
                xl:p-10
              "
            >
              <div
                className="
                  pointer-events-none
                  absolute
                  -right-24 -top-24
                  size-72 rounded-full
                  bg-primary/10 blur-3xl
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  -bottom-24 -left-24
                  size-64 rounded-full
                  bg-orange-500/10 blur-3xl
                "
              />

              <div className="relative flex flex-1 flex-col">
                {/* RESULTADO */}

                <div className="border-b border-border pb-7">
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <div>
                        <p className="text-sm font-bold text-muted">
                          Em uma venda de{" "}
                          <strong className="text-foreground">
                            {formatCurrency(numericSaleValue)}
                          </strong>{" "}
                          você recebe:
                        </p>
                      </div>
                    </div>

                    <div
                      className="
                        flex size-12 shrink-0
                        items-center justify-center
                        rounded-2xl
                        bg-white
                        text-primary
                        shadow-sm
                        ring-1 ring-border
                      "
                    >
                      <Wallet className="size-5" />
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${received}-${currentRate}`}
                      initial={{
                        opacity: 0,
                        y: 14,
                        scale: 0.97,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        y: -8,
                        scale: 0.99,
                      }}
                      transition={{
                        duration: 0.28,
                      }}
                      className="
                        mt-2
                        text-6xl
                        font-black
                        tracking-tight
                        text-primary
                      "
                    >
                      {formatCurrency(received)}
                    </motion.div>
                  </AnimatePresence>
                  <motion.p
                    initial={{
                      opacity: 0,
                      y: 5,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.3,
                      delay: 0.05,
                    }}
                    className="
    mt-2
    text-sm
    font-bold
    text-orange-600
  "
                  >
                    Esse valor cai na sua conta bancária
                  </motion.p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span
                      className="
                        rounded-full
                        bg-primary/10
                        px-3 py-1
                        text-[11px]
                        font-bold text-primary
                      "
                    >
                      Taxa {formatRate(currentRate)}%
                    </span>

                    <span
                      className="
                        rounded-full
                        bg-white
                        px-3 py-1
                        text-[11px]
                        font-semibold
                        text-muted
                        ring-1 ring-border
                      "
                    >
                      {currentSettlementLabel}
                    </span>
                    <span
                      className="
                        rounded-full
                        bg-white
                        px-3 py-1
                        text-[11px]
                        font-semibold
                        text-muted
                        ring-1 ring-border
                      "
                    >
                      {currentPaymentLabel}
                    </span>
                  </div>
                </div>

                {/* COMPARATIVO */}

                <div className="py-7">
                  <div className="mb-3">
                    <h3 className="text-lg font-black text-foreground">
                      Quanto cai em sua conta no mesmo plano:
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-muted">
                      Compare outras formas de pagamento usando o mesmo valor da venda.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border bg-white px-4 shadow-sm">
                    <AnimatePresence initial={false}>
                      {comparisonItems.map((item) => (
                        <ComparisonRow key={item.key} item={item} />
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                {/* CTA */}

                <div className="mt-auto">
                  <div
                    className="
                      overflow-hidden
                      rounded-2xl
                      border border-primary/15
                      bg-primary/[0.04]
                      p-5
                    "
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="
                          flex size-10 shrink-0
                          items-center justify-center
                          rounded-xl
                          bg-primary
                          text-white
                        "
                      >
                        <ShoppingCart className="size-5" />
                      </div>

                      <div>
                        <p className="text-base font-black text-foreground">
                          Pague menos taxas e receba mais.
                        </p>

                        <p className="mt-1 text-sm leading-6 text-muted">
                          Use meu cupom e peça sua maquininha com 20% de
                          desconto.
                        </p>
                      </div>
                    </div>

                    <TrackedLink
                      href={isTapTon ? TON_PLANS_URL : MACHINE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      tracking={{
                        event: "machine_click",
                        location: "tax_calculator",
                        destination: "checkout",
                        label: isTapTon
                          ? "Começar a usar o TapTon"
                          : "Pedir maquininha com 20% de desconto",
                        product: "ton",
                        conversionStrength: "strong",
                      }}
                      className="
                        group
                        mt-4 flex w-full
                        items-center
                        justify-center
                        gap-2.5
                        rounded-xl
                        bg-orange-500
                        px-4 py-3.5
                        text-sm font-black
                        text-white
                        shadow-lg
                        shadow-orange-500/20
                        transition-all duration-300
                        hover:-translate-y-0.5
                        hover:bg-orange-600
                        hover:shadow-xl
                        active:translate-y-0
                      "
                    >
                      {isTapTon
                        ? "Começar a usar o TapTon"
                        : "Pedir maquininha com 20% de desconto"}
                      <ArrowRight
                        className="
                          size-4
                          transition-transform
                          duration-300
                          group-hover:translate-x-1
                        "
                      />
                    </TrackedLink>

                    <p className="mt-2 text-center text-[10px] text-muted">
                      {isTapTon
                        ? "O TapTon é gratuito para baixar e usar."
                        : "O desconto é aplicado pelo seu cupom ao acessar a Ton."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* OBSERVAÇÃO */}

        <div className="mx-auto mt-5 max-w-3xl text-center">
          <p className="text-[11px] leading-5 text-muted">
            Simulação informativa baseada nas taxas cadastradas nesta
            calculadora. As condições podem variar conforme plano, faixa de
            vendas e condições comerciais vigentes.
          </p>

          {tonRatesMeta.status === "success" && ratesUpdatedDate && (
            <p className="mt-2 text-[11px] font-semibold text-primary">
              ✓ Taxas atualizadas em {ratesUpdatedDate}
              <span className="ml-1 font-medium text-muted">· fonte: Ton</span>
            </p>
          )}

          {tonRatesMeta.status === "error" && (
            <p className="mt-2 text-[11px] font-semibold text-orange-600">
              ⚠️ Estamos usando a última tabela válida de taxas.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
