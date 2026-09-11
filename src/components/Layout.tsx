import { NavLink, Outlet, useLocation } from "react-router-dom";

const nav = [
  ["◈", "Dashboard", "/dashboard"],
  ["▣", "Projects", "/projects"],
  ["✓", "My Tasks", "/tasks"],
  ["▦", "Calendar", "/calendar"],
];

export default function Layout() {
  const location = useLocation();

  const isDashboard = location.pathname === "/dashboard";

  return (
    <div className="app-shell">

      {/* ==================== SIDEBAR ==================== */}
      <aside className="sidebar">

        {/* Brand */}
        <div className="brand">
          <span className="brand-mark">
            <img
              src="/icons/Sai_icon.png"
              alt="Timeline Tracker"
            />
          </span>

          <span className="brand-name">
            Timeline Tracker
          </span>
        </div>

        {/* Navigation */}
        <nav
          className="nav"
          aria-label="Main navigation"
        >
          {nav.map(([icon, label, to]) => (
            <NavLink
              key={to}
              to={to}
              title={label}
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
            >
              <span className="nav-icon">
                {icon}
              </span>

              <span className="nav-label">
                {label}
              </span>
            </NavLink>
          ))}
        </nav>

        {/* Sidebar Bottom */}
        <div className="sidebar-bottom">
          <div className="user-mini">

            <span className="avatar">
              S
            </span>

            <div className="user-mini-info">
              <b>Shannu</b>
              <small>Project Manager</small>
            </div>

          </div>
        </div>
      </aside>

      {/* ==================== MAIN ==================== */}
      <main className="main">

        {/* ==================== TOPBAR ==================== */}
        <header className="topbar">

          {/* Title */}
          <div className="topbar-title">
            <h1>
              {isDashboard
                ? "Projects"
                : "Timeline Tracker"}
            </h1>

            <p>
              {isDashboard
                ? "Manage and monitor all active projects"
                : "Project management workspace"}
            </p>
          </div>

          {/* Actions */}
          <div className="topbar-actions">

            {/* Search */}
            <div className="global-search">
              <span className="search-icon">
                ⌕
              </span>

              <input
                type="text"
                placeholder="Search here..."
                aria-label="Search"
              />
            </div>

            {/* Notifications */}
            <button
              type="button"
              className="notification-btn"
              aria-label="Notifications"
            >
              <span className="notification-icon">
                ♧
              </span>

              <span className="notification-dot">
                2
              </span>
            </button>

            {/* Profile */}
            <button
              type="button"
              className="profile"
              aria-label="Open profile menu"
            >
              <div className="profile-avatar">
                S
              </div>

              <div className="profile-info">
                <strong>Shannu</strong>
                <span>Project Manager</span>
              </div>

              <span className="profile-arrow">
                ⌄
              </span>
            </button>

          </div>
        </header>

        {/* ==================== PAGE CONTENT ==================== */}
        <div className="content">
          <Outlet />
        </div>

      </main>
    </div>
  );
}