'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

export type RealtimeRefreshProps = {
  /** URL del proyecto Supabase que emite los cambios. */
  url: string
  /** Anon key del mismo proyecto. */
  anonKey: string
  /** Schemas a escuchar (postgres_changes). Ej: ['sop'] o ['status_motor']. */
  schemas: string[]
  /** Red de seguridad si el websocket se cae. Default 60s. */
  fallbackMs?: number
  /** Nombre único del channel (evita colisiones si hay varios). */
  channelName?: string
}

/**
 * MOLDE Opción A — espejo en tiempo real.
 * Suscribe postgres_changes de los schemas dados y dispara router.refresh()
 * para re-renderizar el Server Component sin que nadie recargue (F5).
 * Ver ~/Luxolandia/SISTEMAS/SOP/DASHBOARD_PLAYBOOK.md.
 */
export function RealtimeRefresh({
  url,
  anonKey,
  schemas,
  fallbackMs = 60000,
  channelName = 'luxo-dashboard-live',
}: RealtimeRefreshProps) {
  const router = useRouter()
  const schemaKey = schemas.join(',')

  useEffect(() => {
    const sb = createClient(url, anonKey)
    let channel = sb.channel(channelName)
    for (const schema of schemas) {
      channel = channel.on(
        'postgres_changes',
        { event: '*', schema },
        () => router.refresh(),
      )
    }
    channel.subscribe()

    const fallback = setInterval(() => router.refresh(), fallbackMs)

    return () => {
      sb.removeChannel(channel)
      clearInterval(fallback)
    }
    // schemaKey resume el array para deps estables
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, anonKey, schemaKey, fallbackMs, channelName, router])

  return null
}
