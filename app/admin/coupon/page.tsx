import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Link from "next/link"
import { getCouponPercent } from "@/lib/coupon-settings"
import { isValidAdminSession, ADMIN_SESSION_COOKIE } from "@/lib/admin-auth"
import { CouponSettingsForm } from "./CouponSettingsForm"

export const dynamic = "force-dynamic"

export default async function AdminCouponPage() {
  const cookieStore = await cookies()
  if (!isValidAdminSession(cookieStore.get(ADMIN_SESSION_COOKIE)?.value)) {
    redirect("/admin/login")
  }

  const percent = await getCouponPercent()

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <p className="mb-2 text-sm font-medium text-slate-400">Maquininha com Cupom</p>
          <h1 className="text-3xl font-bold tracking-tight">Configuração do cupom</h1>
          <p className="mt-2 text-sm text-slate-400">Gerencie em um só lugar o percentual divulgado no site.</p>
        </header>
        <nav className="mb-6 flex gap-3 text-sm">
          <Link href="/admin/coupon" className="rounded-lg bg-slate-800 px-4 py-2 font-semibold text-white">Cupom</Link>
          <Link href="/admin/logs" className="rounded-lg border border-slate-700 px-4 py-2 text-slate-300 hover:bg-slate-900">Logs</Link>
        </nav>
        <CouponSettingsForm initialPercent={percent} />
      </div>
    </main>
  )
}
