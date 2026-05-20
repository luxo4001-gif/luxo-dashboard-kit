import type { ReactNode } from 'react'

export type StatCardProps = {
  value: ReactNode
  label: string
  /** Clase de borde para acentuar (ej. 'border-red-900/40'). */
  accent?: string
  /** Color del valor (ej. 'text-red-400'). */
  valueColor?: string
}

/** KPI grande, at-a-glance (principio Stephen Few). Server-safe. */
export function StatCard({ value, label, accent, valueColor }: StatCardProps) {
  return (
    <div className={`bg-zinc-900 border rounded-lg p-4 ${accent ?? 'border-zinc-800'}`}>
      <div className={`text-3xl font-bold ${valueColor ?? 'text-zinc-100'}`}>{value}</div>
      <div className="text-xs text-zinc-500 uppercase mt-1">{label}</div>
    </div>
  )
}
