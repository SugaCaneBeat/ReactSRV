import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set, get) => ({
      // Theme
      theme: 'dark',
      accentColor: '#e8ff3a',
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
      },

      // Modules
      modules: [
        { id: 'auth', name: 'Authentication', enabled: true, version: '2.1.0', color: '#3a8fff' },
        { id: 'cache', name: 'Redis Cache', enabled: true, version: '1.4.2', color: '#3affb8' },
        { id: 'logger', name: 'Logger', enabled: true, version: '3.0.1', color: '#e8ff3a' },
        { id: 'rate-limit', name: 'Rate Limiter', enabled: false, version: '1.2.0', color: '#ff3a6e' },
        { id: 'cors', name: 'CORS', enabled: true, version: '2.0.0', color: '#ff9f3a' },
        { id: 'compress', name: 'Compression', enabled: false, version: '1.0.5', color: '#c13aff' },
      ],
      toggleModule: (id) => set(s => ({
        modules: s.modules.map(m => m.id === id ? { ...m, enabled: !m.enabled } : m)
      })),

      // Routes
      routes: [
        { method: 'GET', path: '/api/users', handler: 'getUsers', status: 'active' },
        { method: 'POST', path: '/api/users', handler: 'createUser', status: 'active' },
        { method: 'GET', path: '/api/products', handler: 'getProducts', status: 'active' },
        { method: 'DELETE', path: '/api/users/:id', handler: 'deleteUser', status: 'disabled' },
        { method: 'PUT', path: '/api/products/:id', handler: 'updateProduct', status: 'active' },
      ],
      addRoute: (route) => set(s => ({ routes: [...s.routes, route] })),
      removeRoute: (path) => set(s => ({ routes: s.routes.filter(r => r.path !== path) })),

      // Logs
      logs: [
        { id: 1, level: 'info', msg: 'Server started on port 3000', time: '10:42:01' },
        { id: 2, level: 'success', msg: 'Database connected', time: '10:42:02' },
        { id: 3, level: 'warn', msg: 'High memory usage detected (78%)', time: '10:43:15' },
        { id: 4, level: 'info', msg: 'GET /api/users 200 38ms', time: '10:44:02' },
        { id: 5, level: 'error', msg: 'Redis connection timeout', time: '10:45:11' },
        { id: 6, level: 'info', msg: 'POST /api/auth/login 200 52ms', time: '10:46:30' },
      ],
      addLog: (log) => set(s => ({
        logs: [{ ...log, id: Date.now(), time: new Date().toLocaleTimeString() }, ...s.logs].slice(0, 100)
      })),
    }),
    { name: 'react-server-storage', partialize: (s) => ({ theme: s.theme, accentColor: s.accentColor, sidebarOpen: s.sidebarOpen, modules: s.modules }) }
  )
);
