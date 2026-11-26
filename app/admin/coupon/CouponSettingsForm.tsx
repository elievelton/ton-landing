"use client"

import { useEffect, useState } from "react"

export function CouponSettingsForm({ initialPercent }: { initialPercent: number }) {
  const [percent, setPercent] = useState(String(initialPercent))
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    setPercent(String(initialPercent))
  }, [initialPercent])

  async function save() {
    const value = Number(percent)
    if (!Number.isInteger(value) || value < 0 || value > 100) {
      setMessage("Informe um número inteiro entre 0 e 100.")
      return
    }

    setSaving(true)
    setMessage("")
    try {
      const response = await fetch("/api/admin/coupon", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ percent: value }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || "Falha ao salvar.")
      setMessage("Percentual atualizado. O site já usará o novo valor nas próximas páginas carregadas.")
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Não foi possível salvar.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="max-w-xl rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <label htmlFor="coupon-percent" className="block text-sm font-medium text-slate-300">
        Percentual de desconto do cupom
      </label>
      <div className="mt-3 flex items-center gap-3">
        <input
          id="coupon-percent"
          type="number"
          min="0"
          max="100"
          step="1"
          inputMode="numeric"
          value={percent}
          onChange={(event) => setPercent(event.target.value)}
          className="h-12 w-32 rounded-lg border border-slate-700 bg-slate-950 px-4 text-xl font-bold text-white outline-none focus:border-emerald-500"
        />
        <span className="text-2xl font-bold text-slate-400">%</span>
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="h-12 rounded-lg bg-emerald-500 px-5 text-sm font-bold text-slate-950 transition hover:bg-emerald-400 disabled:opacity-50"
        >
          {saving ? "Salvando..." : "Salvar percentual"}
        </button>
      </div>
      <p className="mt-3 text-sm text-slate-400">
        O valor inicial é 30%. Ao alterar aqui, os textos do cupom no site passam a usar o novo percentual.
      </p>
      {message && <p role="status" className="mt-4 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200">{message}</p>}
    </section>
  )
}
