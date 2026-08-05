export {}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]

    gtag?: (
      command: string,
      action: string,
      parameters?: Record<string, unknown>
    ) => void

    uetq?: {
      push: (...args: unknown[]) => void
    }
  }
}