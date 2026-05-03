import { useState } from "react";
import logo from "./assets/brand.png";

export default function Dashboard() {
  const [active, setActive] = useState("Dashboard");
  const [notifOpen, setNotifOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", icon: "🏠" },
    { label: "DSA Arena", icon: "⚔️" },
    { label: "Code Vault", icon: "📦" },
    { label: "Learning Loop", icon: "🔁" },
    { label: "Friends", icon: "👥" },
    { label: "Progress", icon: "📊" },
    { label: "Settings", icon: "⚙️" },
  ];

  return (
    <div style={styles.wrapper}>

      {/* CSS ANIMATIONS + RESPONSIVE LAYOUT */}
      <style>{`
        .layout {
          display: flex;
          min-height: calc(100vh - 60px);
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
            width: 260px;
            min-height: calc(100vh - 60px);
            position: sticky;
            top: 60px;
          }
        }

        /* MOBILE → BOTTOM NAV BAR */
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
            padding: 6px !important;
            text-align: center;
            margin: 0 !important;
          }

          .content {
            padding-bottom: 90px;
          }

          .heroGrid {
            grid-template-columns: repeat(2, 1fr) !important;
          }

          .bottomGrid {
            grid-template-columns: 1fr !important;
          }

          .search {
            width: 100% !important;
          }
        }
      `}</style>

      {/* TOP BAR */}
      <header style={styles.topbar}>
        <div style={styles.leftTop}>
          <img src={logo} style={styles.logo} />
          <span style={styles.brand}>CodeSparrow</span>
        </div>

        <input placeholder="Search..." style={styles.search} className="search" />

        <div style={styles.rightTop}>
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            style={styles.iconBtn}
          >
            🔔
          </button>
          <div style={styles.avatar}>U</div>
        </div>
      </header>

      {/* NOTIFICATIONS */}
      {notifOpen && (
        <div style={styles.notifPanel}>
          <p>🔥 Daily Challenge unlocked</p>
          <p>👥 Friend solved a problem</p>
          <p>🏆 New badge earned</p>
        </div>
      )}

      <div className="layout">

        {/* SIDEBAR */}
        <aside style={styles.sidebar} className="sidebar">

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

        {/* CONTENT */}
        <section style={styles.content} className="content">

          {/* STATS */}
          <div style={styles.heroGrid} className="heroGrid">
            <StatCard title="🔥 Streak" value="12 Days" />
            <StatCard title="⭐ Points" value="1,240" />
            <StatCard title="📘 Solved" value="86" />
            <StatCard title="🏆 Rank" value="#142" />
          </div>

          {/* MAIN CARDS */}
          <div style={styles.grid}>
            <Card title="Daily Challenge" desc="Two Sum Variants" progress="70%" />
            <Card title="DSA Arena" desc="Live competition" progress="40%" />
            <Card title="Code Vault" desc="Saved snippets" progress="90%" />
            <Card title="Learning Loop" desc="Revision cycle" progress="55%" />
          </div>

          {/* BOTTOM SECTION */}
          <div style={styles.bottomGrid} className="bottomGrid">
            <Activity />
            <Leaderboard />
          </div>

        </section>
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function StatCard({ title, value }) {
  return (
    <div style={styles.statCard}>
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}

function Card({ title, desc, progress }) {
  return (
    <div style={styles.card}>
      <h3>{title}</h3>
      <p>{desc}</p>
      <div style={styles.progressBar}>
        <div style={{ ...styles.progress, width: progress }} />
      </div>
    </div>
  );
}

function Activity() {
  return (
    <div style={styles.panel}>
      <h3>🔥 Activity</h3>
      <p>✔ Solved Binary Search</p>
      <p>✔ Joined contest</p>
      <p>✔ Saved snippet</p>
    </div>
  );
}

function Leaderboard() {
  return (
    <div style={styles.panel}>
      <h3>🏆 Leaderboard</h3>
      <p>1. Alex - 2450</p>
      <p>2. Sarah - 2310</p>
      <p>3. You - 1240</p>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  wrapper: {
    minHeight: "100vh",
    fontFamily: "Inter, sans-serif",
    background: "#f4f6fb",
    color: "#111827",
  },

  topbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 20px",
    background: "white",
    borderBottom: "1px solid #e5e7eb",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },

  leftTop: { display: "flex", alignItems: "center", gap: 10 },
  logo: { width: 40 },
  brand: { fontWeight: 800, color: "#4f46e5" },

  search: {
    width: "40%",
    padding: 10,
    borderRadius: 10,
    border: "1px solid #e5e7eb",
    outline: "none",
  },

  rightTop: { display: "flex", gap: 10, alignItems: "center" },

  iconBtn: {
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

  notifPanel: {
    position: "absolute",
    right: 20,
    top: 60,
    background: "white",
    padding: 15,
    borderRadius: 12,
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  },

  sidebar: {
    background: "white",
    padding: 15,
    borderRight: "1px solid #e5e7eb",
    display: "flex",
    flexDirection: "column",
    gap: 10,
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

  content: {
    flex: 1,
    padding: 20,
  },

  heroGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: 12,
    marginBottom: 20,
  },

  statCard: {
    background: "white",
    padding: 15,
    borderRadius: 14,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: 16,
  },

  card: {
    background: "white",
    padding: 18,
    borderRadius: 14,
  },

  progressBar: {
    height: 6,
    background: "#e5e7eb",
    borderRadius: 10,
    marginTop: 10,
  },

  progress: {
    height: "100%",
    background: "#4f46e5",
    borderRadius: 10,
  },

  bottomGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
    marginTop: 20,
  },

  panel: {
    background: "white",
    padding: 18,
    borderRadius: 14,
  },
};
