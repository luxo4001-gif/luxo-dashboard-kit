'use client'

import { useEffect, useState } from 'react'

export type FreshnessBadgeProps = {
  /** Último cambio real de la data (max updated_at de la tabla origen). */
  lastUpdate?: string | Date | null
  /** A partir de cuánto se considera "desactualizado". Default 2 min. */
  staleMs?: number
}

/**
 * Indicador de frescura HONESTO (principio Monte Carlo): si la data está vieja
 * lo confiesa, no muestra lo viejo como actual. Re-evalúa cada 30s.
 */
export function FreshnessBadge({ lastUpdate, staleMs = 120000 }: FreshnessBadgeProps) {
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
    return (
      <span className="text-xs text-amber-400">
        ⚠️ desactualizado · {Math.round(ageMs! / 60000)} min
      </span>
    )
  }
  return <span className="text-xs text-emerald-400">🟢 en vivo</span>
}
