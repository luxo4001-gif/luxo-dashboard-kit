# @luxo/dashboard-kit

Molde **Opción A** compartido para los dashboards de Luxolandia: realtime push + primitivos de UI.
Es la implementación del `DASHBOARD_PLAYBOOK.md`. Single source para que los 4 dashboards no vuelvan a divergir.

## Instalar (consumidor)

```bash
npm i github:luxo4001-gif/luxo-dashboard-kit
```

En `next.config.ts` del dashboard:

```ts
const nextConfig = { transpilePackages: ['@luxo/dashboard-kit'] }
```

## Uso

```tsx
// app/page.tsx (Server Component)
export const dynamic = 'force-dynamic'
import { RealtimeRefresh, StatCard, ProgressBar, FreshnessBadge } from '@luxo/dashboard-kit'

export default async function Page() {
  // ...fetch del plan (sop.plans) + status propio (status_<x>)...
  return (
    <main>
      <RealtimeRefresh
        url={process.env.NEXT_PUBLIC_SUPABASE_URL!}
        anonKey={process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}
        schemas={['sop']}            // o ['status_motor'], o varios
      />
      <FreshnessBadge lastUpdate={lastUpdate} />
      <StatCard value={`${pct}%`} label="Progreso" />
      <ProgressBar pct={pct} />
    </main>
  )
}
```

## Prerequisito DB (una vez por proyecto/schema)

```sql
alter publication supabase_realtime add table <schema>.<tabla>;
-- + RLS que permita SELECT al rol anon
```

## Exports

- `RealtimeRefresh` — espejo en vivo (postgres_changes → router.refresh + fallback polling).
- `FreshnessBadge` — indicador de frescura honesto (confiesa si la data está vieja).
- `StatCard` — KPI at-a-glance.
- `ProgressBar` — barra de progreso consistente.

## Convención de datos

- **Plan maestro:** `sop.plans` + `sop.plan_*` (central, proyecto Luxolandia).
- **Status:** `status_<x>` (propio del proyecto/sistema).
- Cada dashboard lee de ambos. Ver `DASHBOARD_PLAYBOOK.md`.
