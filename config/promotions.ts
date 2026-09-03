export const activePromotion = {
  enabled: true,

  badge: "Benefício extra",

  title: "Venda R$ 10 mil e receba de volta o valor pago pela sua Ton",

  description:
    "Ative sua primeira maquininha Ton até 30/09/2026 e, se atingir R$ 10.000 em vendas nos primeiros 30 dias após receber a máquina, receba em cashback o valor efetivamente pago pela maquininha na sua Conta Ton.",

  cta: "Pegar meu desconto",

  period: "24/06/2026 a 30/09/2026",

  salesTarget: "R$ 10.000",

  deadline: "30 dias",

  destination: "catalog",

  regulationUrl: "",

  disclaimer:
    "Promoção sujeita às condições de elegibilidade e demais regras do regulamento oficial da Ton.",
}
//Aqui é usado para ativar a promoção, colocar a data de validade da promoção
export const PROMOTION_END = new Date(
  "2026-09-30T23:59:59-03:00"
).getTime()

export function isPromotionActive() {
  return (
    activePromotion.enabled &&
    Date.now() < PROMOTION_END
  )
}