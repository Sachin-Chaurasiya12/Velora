import { useState, useEffect, useRef } from "react";
import logo from "./assets/brand.png";
import { useNavigate, Outlet } from "react-router-dom";

export default function LayoutShell() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [active, setActive] = useState("Dashboard");
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const navItems = [
    { label: "Dashboard", icon: "⚡", section: "Main", path: "/dashboard" },
    { label: "DSA Arena", icon: "⚔️", section: "Main", path: "/arena" },
    { label: "Code Vault", icon: "📦", section: "Main", path: "/vault" },
    { label: "Learning Loop", icon: "🔁", section: "Main", path: "/learning" },
    { label: "Friends", icon: "👥", section: "Social", path: "/friends" },
    { label: "Progress", icon: "📊", section: "Social", path: "/progress" },
    { label: "Settings", icon: "⚙️", section: "Account", path: "/settings" },
  ];

  const sections = [...new Set(navItems.map((n) => n.section))];

  return (
    <div style={styles.wrapper}>

      {/* TOPBAR */}
      <header style={styles.topbar}>
        <button
          onClick={() => setSidebarOpen(v => !v)}
          style={styles.toggleBtn}
        >
          ☰
        </button>

        <div style={styles.brandContainer}>
          <img src={logo} style={styles.logo} />
          <span style={styles.brand}>CodeSparrow</span>
        </div>

        <input placeholder="Search..." style={styles.search} />

        <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
          <div ref={notifRef} style={{ position: "relative" }}>
            🔔
            {notifOpen && <div style={styles.notifPanel}>Notifications</div>}
          </div>

          <div
            onClick={() => navigate("/profile")}
            style={styles.avatar}
          >
            U
          </div>
        </div>
      </header>

      {/* BODY */}
      <div style={styles.body}>

        {/* SIDEBAR */}
        <aside style={{
          ...styles.sidebar,
          width: sidebarOpen ? 220 : 70,
        }}>
          {sections.map(section => (
            <div key={section}>

              {sidebarOpen && (
                <div style={styles.sidebarSection}>{section}</div>
              )}

              {navItems
                .filter(i => i.section === section)
                .map(item => (
                  <div
                    key={item.label}
                    onClick={() => {
                      setActive(item.label);
                      navigate(item.path);
                    }}
                    style={{
                      ...styles.navItem,
                      justifyContent: sidebarOpen ? "flex-start" : "center",
                      background:
                        active === item.label ? "#EEEDFE" : "transparent",
                      color:
                        active === item.label ? "#534AB7" : "#5F5E5A",
                    }}
                  >
                    <span>{item.icon}</span>
                    {sidebarOpen && <span>{item.label}</span>}
                  </div>
                ))}
            </div>
          ))}
        </aside>

        {/* MAIN */}
        <main style={styles.main}>
          <Outlet />
        </main>

      </div>
    </div>
  );
}
const styles = {
  wrapper: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    fontFamily: "Inter, sans-serif",
    background: "#f4f6fb",
  },

  /* TOPBAR */
  topbar: {
    height: 52,
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "0 16px",
    background: "white",
    borderBottom: "0.5px solid rgba(0,0,0,0.09)",
    flexShrink: 0,
    zIndex: 100,
  },

  toggleBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    border: "0.5px solid rgba(0,0,0,0.1)",
    background: "white",
    cursor: "pointer",
  },

  brandContainer: {
    display: "flex",
    alignItems: "center",
    gap: 6,
  },

  logo: { width: 32, height: 32, objectFit: "contain" },

  brand: { fontWeight: 500, color: "#534AB7" },

  search: {
    flex: 1,
    maxWidth: 300,
    height: 32,
    borderRadius: 8,
    border: "0.5px solid rgba(0,0,0,0.1)",
    padding: "0 10px",
    background: "#F1EFE8",
  },

  avatar: {
    width: 28,
    height: 28,
    borderRadius: "50%",
    background: "#534AB7",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },

  notifPanel: {
    position: "absolute",
    top: 35,
    right: 0,
    width: 200,
    background: "white",
    border: "0.5px solid rgba(0,0,0,0.1)",
    borderRadius: 10,
    padding: 10,
  },

  /* BODY */
  body: {
    display: "flex",
    flex: 1,
    overflow: "hidden",
  },

  /* SIDEBAR */
  sidebar: {
    background: "white",
    borderRight: "0.5px solid rgba(0,0,0,0.09)",
    transition: "width 0.25s ease",
    overflow: "hidden",
    flexShrink: 0,
  },

  sidebarSection: {
    fontSize: 10,
    textTransform: "uppercase",
    color: "#B4B2A9",
    padding: "10px",
  },

  navItem: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "8px 10px",
    cursor: "pointer",
    fontSize: 13,
    borderRadius: 8,
  },

  /* MAIN */
  main: {
    flex: 1,
    overflowY: "auto",
    padding: 18,
  },
};
