"use client"

export function CookieSettingsButton() {
  function openSettings() {
    window.dispatchEvent(
      new Event("open-cookie-settings")
    )
  }

  return (
    <button
      type="button"
      onClick={openSettings}
      className="transition-colors hover:text-primary"
    >
      Configurar cookies
    </button>
  )
}