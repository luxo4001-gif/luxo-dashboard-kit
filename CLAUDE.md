# @luxo/dashboard-kit — Contexto (SISTEMA / tooling)

> Complementa el `README.md` (instalar + uso). Lee primero `SOP/DASHBOARD_PLAYBOOK.md`.

## Qué es
Librería de **componentes front** del molde Opción A: `RealtimeRefresh`, `FreshnessBadge`, `Sparkline`, `StatCard`, `ProgressBar`. Es la implementación reutilizable del `DASHBOARD_PLAYBOOK`. **Agnóstico a la fuente** de datos — solo UI + refresh.

## Las 3 piezas
Es **una** de las 3 piezas del sistema de dashboards (ver `DASHBOARD_PLAYBOOK.md` → "Las 3 piezas"):
- **kit** (esto) = componentes front
- **template** (`luxo-dashboard-template`) = scaffold que trae el trío
- **playbook** (`DASHBOARD_PLAYBOOK.md`) = reglas/decisiones

## Cómo funciona la propagación
- Público en GitHub (`luxo4001-gif/luxo-dashboard-kit`). Los 4 dashboards lo consumen via `npm i github:...`.
- Cambio del kit → **bump `version` en `package.json`** → Renovate abre PRs en cada dashboard para actualizar el SHA fijado.
- NO meter lógica de dominio ni acceso a datos acá; eso vive en cada dashboard / en `status_<x>`.

## Fuente de verdad
`sop.systems` slug=`dashboard-kit`. Estado/uso real: los dashboards en `sop.sites kind='dashboard'`.
