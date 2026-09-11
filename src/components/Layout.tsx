import { NavLink, Outlet } from "react-router-dom";

const nav = [
  ["◈", "Dashboard", "/dashboard"],
  ["▣", "Projects", "/projects"],
  ["✓", "My Tasks", "/tasks"],
  ["▦", "Calendar", "/calendar"],
];

export default function Layout() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">T</span><span>Timeline Tracker</span></div>
        <nav className="nav">
          {nav.map(([icon, label, to]) => (
            <NavLink key={to} to={to} className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
              <span>{icon}</span><span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="user-mini"><span className="avatar">S</span><div><b>Shannu</b><small>Project Manager</small></div></div>
        </div>
      </aside>
      <main className="main">
        <header className="topbar">
          <div className="breadcrumb">Workspace / <strong>Timeline Tracker</strong></div>
          <div className="top-actions"><button className="icon-btn">⌕</button><button className="icon-btn">♢</button><span className="avatar">S</span></div>
        </header>
        <div className="content"><Outlet /></div>
      </main>
    </div>
  );
}