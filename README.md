# ⚡ REACTSERV — Premium React Dashboard

## Installation

```bash
cd react-server
npm install
```

## Lancer le serveur

```bash
# Mode local uniquement
npm run dev

# Mode réseau (accès depuis d'autres appareils)
npm run dev -- --host
```

## Accès distant

1. Lance avec `npm run dev -- --host`
2. Note l'adresse réseau affiché (ex: `http://192.168.1.x:5173`)
3. Ouvre cette URL depuis n'importe quel appareil sur le même réseau

## Pages disponibles

| Page | URL | Description |
|---|---|---|
| Dashboard | `/` | Vue d'ensemble, stats en temps réel |
| Modules | `/modules` | Activer/désactiver les modules |
| Routes | `/routes` | Gérer les routes API |
| Logs | `/logs` | Terminal de logs filtrable |
| Remote | `/remote` | Contrôle à distance, clé API |
| Database | `/database` | Éditeur de requêtes SQL |
| Settings | `/settings` | Configuration générale |

## Build production

```bash
npm run build
npm run preview -- --host
```
