import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set, get) => ({
      // Theme
      theme: 'dark',
      accentColor: '#6366f1',
      toggleTheme: () => set(s => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),
      setAccent: (color) => set({ accentColor: color }),

      // Sidebar
      sidebarOpen: true,
      toggleSidebar: () => set(s => ({ sidebarOpen: !s.sidebarOpen })),

      // Notifications
      notifications: [],
      addNotification: (msg, type = 'info') => {
        const id = Date.now();
        set(s => ({ notifications: [...s.notifications, { id, msg, type }] }));
        setTimeout(() => set(s => ({ notifications: s.notifications.filter(n => n.id !== id) })), 4000);
      },

      // Stats
      stats: {
        requests: 12847,
        uptime: 99.97,
        latency: 42,
        errors: 3,
        cpu: 34,
        memory: 62,
        bandwidth: 847,
        connections: 128,
      },
      updateStat: (key, value) => set(s => ({ stats: { ...s.stats, [key]: value } })),

      // Modules
      modules: [
        { id: 'auth', name: 'Authentication', enabled: true, version: '2.1.0', color: '#6366f1', description: 'JWT & OAuth2 authentication middleware' },
        { id: 'cache', name: 'Redis Cache', enabled: true, version: '1.4.2', color: '#22d3ee', description: 'In-memory caching layer with Redis' },
        { id: 'logger', name: 'Logger', enabled: true, version: '3.0.1', color: '#a3e635', description: 'Structured logging with rotation' },
        { id: 'rate-limit', name: 'Rate Limiter', enabled: false, version: '1.2.0', color: '#f43f5e', description: 'Request rate limiting per IP/token' },
        { id: 'cors', name: 'CORS', enabled: true, version: '2.0.0', color: '#fb923c', description: 'Cross-Origin Resource Sharing headers' },
        { id: 'compress', name: 'Compression', enabled: false, version: '1.0.5', color: '#c084fc', description: 'Gzip/Brotli response compression' },
        { id: 'websocket', name: 'WebSocket', enabled: true, version: '1.3.0', color: '#2dd4bf', description: 'Real-time bidirectional communication' },
        { id: 'graphql', name: 'GraphQL', enabled: false, version: '4.0.0', color: '#e879f9', description: 'GraphQL API layer with introspection' },
      ],
      toggleModule: (id) => {
        set(s => ({
          modules: s.modules.map(m => m.id === id ? { ...m, enabled: !m.enabled } : m)
        }));
        const mod = get().modules.find(m => m.id === id);
        get().addNotification(`${mod.name} ${mod.enabled ? 'enabled' : 'disabled'}`, mod.enabled ? 'success' : 'warn');
        get().addLog({ level: 'info', msg: `Module ${mod.name} ${mod.enabled ? 'enabled' : 'disabled'}` });
      },

      // Routes
      routes: [
        { id: 1, method: 'GET', path: '/api/users', handler: 'getUsers', status: 'active', latency: 38 },
        { id: 2, method: 'POST', path: '/api/users', handler: 'createUser', status: 'active', latency: 52 },
        { id: 3, method: 'GET', path: '/api/products', handler: 'getProducts', status: 'active', latency: 29 },
        { id: 4, method: 'DELETE', path: '/api/users/:id', handler: 'deleteUser', status: 'disabled', latency: 45 },
        { id: 5, method: 'PUT', path: '/api/products/:id', handler: 'updateProduct', status: 'active', latency: 61 },
        { id: 6, method: 'GET', path: '/api/health', handler: 'healthCheck', status: 'active', latency: 3 },
        { id: 7, method: 'POST', path: '/api/auth/login', handler: 'login', status: 'active', latency: 89 },
        { id: 8, method: 'POST', path: '/api/auth/refresh', handler: 'refreshToken', status: 'active', latency: 22 },
      ],
      addRoute: (route) => set(s => ({ routes: [...s.routes, { ...route, id: Date.now() }] })),
      removeRoute: (id) => set(s => ({ routes: s.routes.filter(r => r.id !== id) })),
      toggleRoute: (id) => set(s => ({
        routes: s.routes.map(r => r.id === id ? { ...r, status: r.status === 'active' ? 'disabled' : 'active' } : r)
      })),

      // Logs
      logs: [
        { id: 1, level: 'info', msg: 'Server started on port 3000', time: '10:42:01' },
        { id: 2, level: 'success', msg: 'Database connected successfully', time: '10:42:02' },
        { id: 3, level: 'warn', msg: 'High memory usage detected (78%)', time: '10:43:15' },
        { id: 4, level: 'info', msg: 'GET /api/users 200 38ms', time: '10:44:02' },
        { id: 5, level: 'error', msg: 'Redis connection timeout — retrying...', time: '10:45:11' },
        { id: 6, level: 'info', msg: 'POST /api/auth/login 200 52ms', time: '10:46:30' },
        { id: 7, level: 'success', msg: 'Redis reconnected', time: '10:46:45' },
        { id: 8, level: 'info', msg: 'WebSocket client connected (id: ws_0x3f)', time: '10:47:02' },
      ],
      addLog: (log) => set(s => ({
        logs: [{ ...log, id: Date.now(), time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) }, ...s.logs].slice(0, 200)
      })),
      clearLogs: () => set({ logs: [] }),

      // Database
      dbConnections: [
        { id: 'pg-main', name: 'PostgreSQL Main', type: 'postgresql', host: 'db.internal:5432', status: 'connected', pool: { active: 8, idle: 12, max: 20 } },
        { id: 'redis-cache', name: 'Redis Cache', type: 'redis', host: 'redis.internal:6379', status: 'connected', pool: { active: 3, idle: 7, max: 10 } },
        { id: 'mongo-logs', name: 'MongoDB Logs', type: 'mongodb', host: 'mongo.internal:27017', status: 'disconnected', pool: { active: 0, idle: 0, max: 15 } },
      ],

      // Remote Sessions
      remoteSessions: [],
      addRemoteSession: (session) => set(s => ({
        remoteSessions: [...s.remoteSessions, { ...session, id: Date.now(), connectedAt: new Date().toISOString() }]
      })),
      removeRemoteSession: (id) => set(s => ({
        remoteSessions: s.remoteSessions.filter(s => s.id !== id)
      })),

      // Settings
      settings: {
        serverName: 'ReactSRV-Production',
        port: 3000,
        env: 'production',
        autoRestart: true,
        maxMemory: 512,
        logLevel: 'info',
        enableMetrics: true,
        enableHealthCheck: true,
        corsOrigins: '*',
        rateLimitMax: 100,
        rateLimitWindow: 60,
        sslEnabled: true,
        clusterMode: false,
        workers: 4,
      },
      updateSettings: (patch) => set(s => ({ settings: { ...s.settings, ...patch } })),
    }),
    {
      name: 'react-srv-storage',
      partialize: (s) => ({
        theme: s.theme,
        accentColor: s.accentColor,
        sidebarOpen: s.sidebarOpen,
        modules: s.modules,
        settings: s.settings,
      }),
    }
  )
);
