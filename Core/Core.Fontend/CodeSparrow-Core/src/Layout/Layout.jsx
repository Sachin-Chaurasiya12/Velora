import { Outlet, useState } from "react-router-dom";

export default function Layout() {
  const [active, setActive] = useState("Dashboard");

  const navItems = [
    { label: "Dashboard", icon: "🏠" },
    { label: "DSA Arena", icon: "⚔️" },
    { label: "Code Vault", icon: "📦" },
    { label: "Settings", icon: "⚙️" },
  ];

  return (
    <div style={styles.wrapper}>

      {/* CSS RESPONSIVE + ANIMATION */}
      <style>{`
        .layout {
          display: flex;
          min-height: 100vh;
        }

        .sidebar {
          transition: all 0.3s ease;
        }

        .navItem {
          transition: all 0.25s ease;
        }

        .navItem:hover {
          background: #eef2ff !important;
          transform: translateX(5px);
        }

        /* DESKTOP */
        @media (min-width: 769px) {
          .sidebar {
            width: 250px;
            min-height: 100vh;
            position: sticky;
            top: 0;
          }
        }

        /* MOBILE → BOTTOM NAV */
        @media (max-width: 768px) {
          .layout {
            flex-direction: column;
          }

          .sidebar {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            height: 65px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            background: white;
            border-top: 1px solid #e5e7eb;
            z-index: 100;
          }

          .navItem {
            flex: 1;
            font-size: 11px;
            text-align: center;
            padding: 6px !important;
            margin: 0 !important;
            flex-direction: column;
          }

          .content {
            padding-bottom: 90px;
          }

          .search {
            width: 100% !important;
          }
        }
      `}</style>

      <div className="layout">

        {/* SIDEBAR */}
        <aside style={styles.sidebar} className="sidebar">

          <div style={styles.brand}>
            CodeSparrow
          </div>

          {navItems.map((item) => (
            <div
              key={item.label}
              onClick={() => setActive(item.label)}
              className="navItem"
              style={{
                ...styles.navItem,
                background:
                  active === item.label ? "#4f46e5" : "transparent",
                color: active === item.label ? "white" : "#111827",
                transform:
                  active === item.label ? "scale(1.05)" : "scale(1)",
              }}
            >
              <span style={{ fontSize: 18 }}>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </aside>

        {/* MAIN AREA */}
        <div style={styles.main} className="content">

          {/* NAVBAR */}
          <header style={styles.navbar}>
            <input
              placeholder="Search anything..."
              style={styles.search}
              className="search"
            />

            <div style={styles.right}>
              <button style={styles.btn}>🔔</button>
              <div style={styles.avatar}>U</div>
            </div>
          </header>

          {/* PAGE CONTENT */}
          <main style={styles.page}>
            <Outlet />
          </main>

        </div>
      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  wrapper: {
    fontFamily: "Inter, sans-serif",
    background: "#f4f6fb",
  },

  layout: {
    display: "flex",
    minHeight: "100vh",
  },

  sidebar: {
    background: "white",
    padding: 15,
    borderRight: "1px solid #e5e7eb",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  brand: {
    fontWeight: 800,
    fontSize: 18,
    color: "#4f46e5",
    marginBottom: 10,
  },

  navItem: {
    padding: 12,
    borderRadius: 12,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontWeight: 500,
  },

  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },

  navbar: {
    height: 60,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    background: "white",
    borderBottom: "1px solid #e5e7eb",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },

  search: {
    width: "40%",
    padding: 10,
    borderRadius: 10,
    border: "1px solid #e5e7eb",
    outline: "none",
  },

  right: {
    display: "flex",
    gap: 10,
    alignItems: "center",
  },

  btn: {
    padding: 8,
    borderRadius: 10,
    border: "1px solid #e5e7eb",
    background: "white",
    cursor: "pointer",
  },

  avatar: {
    width: 35,
    height: 35,
    borderRadius: "50%",
    background: "#4f46e5",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: 600,
  },

  page: {
    padding: 20,
  },
};
