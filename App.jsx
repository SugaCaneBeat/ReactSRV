import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useStore } from './store/useStore';
import Sidebar from './components/Sidebar';
import Notifications from './components/Notifications';
import Dashboard from './pages/Dashboard';
import Modules from './pages/Modules';
import Routes2 from './pages/Routes';
import Logs from './pages/Logs';
import Remote from './pages/Remote';
import DatabasePage from './pages/Database';
import Settings from './pages/Settings';
import './App.css';

export default function App() {
  const { sidebarOpen } = useStore();
  return (
    <BrowserRouter>
      <div className={`app-shell ${sidebarOpen ? 'sidebar-open' : 'sidebar-collapsed'}`}>
        <Sidebar />
        <main className="main-area">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/modules" element={<Modules />} />
            <Route path="/routes" element={<Routes2 />} />
            <Route path="/logs" element={<Logs />} />
            <Route path="/remote" element={<Remote />} />
            <Route path="/database" element={<DatabasePage />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
        <Notifications />
      </div>
    </BrowserRouter>
  );
}
