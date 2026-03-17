import { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import Header from '../components/Header';
import { Activity, Zap, Clock, AlertTriangle, TrendingUp, ArrowUpRight } from 'lucide-react';
import './Dashboard.css';

function StatCard({ icon: Icon, label, value, unit, color, trend }) {
  return (
    <div className="stat-card" style={{ '--card-accent': color }}>
      <div className="stat-icon"><Icon size={18} /></div>
      <div className="stat-body">
        <span className="stat-label">{label}</span>
        <div className="stat-value">
          <span className="stat-num">{value}</span>
          {unit && <span className="stat-unit">{unit}</span>}
        </div>
        {trend && <span className="stat-trend"><TrendingUp size={10} /> {trend}</span>}
      </div>
    </div>
  );
}

const COLORS = ['var(--accent4)', 'var(--accent3)', 'var(--accent)', 'var(--accent2)'];

export default function Dashboard() {
  const { stats, logs, modules, addLog } = useStore();
  const [chart, setChart] = useState(Array.from({ length: 20 }, () => Math.random() * 80 + 20));

  useEffect(() => {
    const interval = setInterval(() => {
      setChart(prev => [...prev.slice(1), Math.random() * 80 + 20]);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const recentLogs = logs.slice(0, 5);
  const activeModules = modules.filter(m => m.enabled);

  return (
    <div className="page">
      <Header title="Dashboard" />
      <div className="page-content">

        {/* Stats */}
        <div className="stats-grid">
          <StatCard icon={Activity} label="Total Requests" value={stats.requests.toLocaleString()} color={COLORS[0]} trend="+12% today" />
          <StatCard icon={Zap} label="Uptime" value={stats.uptime} unit="%" color={COLORS[1]} trend="Last 30d" />
          <StatCard icon={Clock} label="Avg Latency" value={stats.latency} unit="ms" color={COLORS[2]} trend="-8ms vs yesterday" />
          <StatCard icon={AlertTriangle} label="Errors" value={stats.errors} color={COLORS[3]} trend="Last 24h" />
        </div>

        {/* Live chart */}
        <div className="card chart-card">
          <div className="card-head">
            <span>Live Request Rate</span>
            <div className="live-badge"><span className="live-dot" />LIVE</div>
          </div>
          <div className="mini-chart">
            {chart.map((h, i) => (
              <div key={i} className="bar" style={{ height: `${h}%`, opacity: 0.3 + (i / chart.length) * 0.7 }} />
            ))}
          </div>
        </div>

        <div className="two-col">
          {/* Recent logs */}
          <div className="card">
            <div className="card-head">
              <span>Recent Logs</span>
              <a href="/logs" className="card-link">View all <ArrowUpRight size={12} /></a>
            </div>
            <div className="log-list">
              {recentLogs.map(log => (
                <div key={log.id} className={`log-row log-${log.level}`}>
                  <span className="log-level">{log.level}</span>
                  <span className="log-msg">{log.msg}</span>
                  <span className="log-time">{log.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Active modules */}
          <div className="card">
            <div className="card-head">
              <span>Active Modules</span>
              <span className="badge">{activeModules.length}/{modules.length}</span>
            </div>
            <div className="module-list">
              {modules.map(m => (
                <div key={m.id} className="module-row">
                  <div className="module-dot" style={{ background: m.enabled ? m.color : 'var(--text3)', boxShadow: m.enabled ? `0 0 6px ${m.color}` : 'none' }} />
                  <span className="module-name">{m.name}</span>
                  <span className="module-ver">{m.version}</span>
                  <span className={`module-status ${m.enabled ? 'on' : 'off'}`}>{m.enabled ? 'ON' : 'OFF'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
