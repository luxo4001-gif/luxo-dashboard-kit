'use client'

import { useEffect, useState } from 'react'

export type FreshnessBadgeProps = {
  /** Último cambio real de la data (max updated_at de la tabla origen). */
  lastUpdate?: string | Date | null
  /** A partir de cuánto se considera "desactualizado". Default 24 h. */
  staleMs?: number
}

/** Formatea una antigüedad en min / h / d legibles. */
function fmtAge(ms: number): string {
  const min = Math.round(ms / 60000)
  if (min < 1) return 'recién'
  if (min < 60) return `hace ${min} min`
  const h = Math.round(min / 60)
  if (h < 24) return `hace ${h} h`
  const d = Math.round(h / 24)
  return `hace ${d} d`
}

/**
 * Indicador de frescura HONESTO (principio Monte Carlo): mide hace cuánto cambió
 * la DATA (no la conexión). Si está vieja lo confiesa. Re-evalúa cada 30s.
 * El espejo realtime es independiente: esto solo informa la antigüedad del dato.
 */
export function FreshnessBadge({ lastUpdate, staleMs = 86400000 }: FreshnessBadgeProps) {
  const [, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 30000)
    return () => clearInterval(id)
  }, [])

  const ts = lastUpdate ? new Date(lastUpdate) : null
  const ageMs = ts ? Date.now() - ts.getTime() : null
  const stale = ageMs != null && ageMs > staleMs

  if (!ts) return <span className="text-xs text-zinc-500">sin datos</span>
  if (stale) {
    return <span className="text-xs text-amber-400">⚠️ desactualizado · {fmtAge(ageMs!)}</span>
  }
  return <span className="text-xs text-emerald-400">🟢 en vivo · {fmtAge(ageMs!)}</span>
}
