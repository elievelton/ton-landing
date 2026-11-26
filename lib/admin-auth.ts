import { createHash, timingSafeEqual } from "node:crypto"

export const ADMIN_SESSION_COOKIE = "ton_admin_session"

export function createAdminSessionValue(user: string, password: string) {
  return createHash("sha256").update(`${user}:${password}`).digest("hex")
}

export function isValidAdminSession(session?: string | null) {
  const user = process.env.LOG_ADMIN_USER
  const password = process.env.LOG_ADMIN_PASSWORD

  if (!session || !user || !password) return false

  const expected = createAdminSessionValue(user, password)
  const actualBuffer = Buffer.from(session)
  const expectedBuffer = Buffer.from(expected)

  return actualBuffer.length === expectedBuffer.length &&
    timingSafeEqual(actualBuffer, expectedBuffer)
}
