import { useState, useEffect, useRef } from "react";
import logo from './assets/brand.png';
/* ─── ANIMATED COUNTER HOOK ─── */
function useCountUp(target, duration = 1000, delay = 200) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let timer;

    const timeout = setTimeout(() => {
      let start = 0;
      const step = target / (duration / 16);

      timer = setInterval(() => {
        start = Math.min(start + step, target);
        setValue(Math.round(start));

        if (start >= target) {
          clearInterval(timer);
        }
      }, 16);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (timer) clearInterval(timer);
    };
  }, [target, duration, delay]);

  return value;
}


/* ─── SUBCOMPONENTS ─── */

function StatCard({ icon, label, value, suffix = "", badge, badgeColor, delay = 0 }) {
  const count = useCountUp(typeof value === "number" ? value : 0, 900, 200 + delay);
  return (
    <div style={{ ...styles.statCard, animationDelay: `${delay}ms` }} className="stat-card fade-up">
      <div style={styles.statLabel}>
        <span style={{ fontSize: 13 }}>{icon}</span>
        {label}
        {badge && (
          <span style={{ ...styles.badge, ...(badgeColor === "green" ? styles.badgeGreen : styles.badgePurple), marginLeft: "auto" }}>
            {badge}
          </span>
        )}
      </div>
      <div style={styles.statValue}>
        {typeof value === "number" ? count.toLocaleString() : value}
        {suffix && <span style={{ fontSize: 12, color: "#888780", fontWeight: 400, marginLeft: 3 }}>{suffix}</span>}
      </div>
    </div>
  );
}

function ProgressBar({ pct, color, animated }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(pct), 500);
    return () => clearTimeout(t);
  }, [pct]);
  return (
    <div style={styles.progressTrack}>
      <div style={{ ...styles.progressFill, background: color, width: `${width}%`, transition: "width 1.1s cubic-bezier(0.4,0,0.2,1)" }} />
    </div>
  );
}

function ChallengeCard({ icon, iconBg, title, sub, desc, pct, barColor, tag, tagStyle, delay = 0, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...styles.challengeCard,
        animationDelay: `${delay}ms`,
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        borderColor: hovered ? "#AFA9EC" : "rgba(0,0,0,0.1)",
        cursor: "pointer",
      }}
      className="fade-up"
    >
      <div style={styles.cardTop}>
        <div style={{ ...styles.cardIcon, background: iconBg }}>{icon}</div>
        <div>
          <div style={styles.cardTitle}>{title}</div>
          <div style={styles.cardSub}>{sub}</div>
        </div>
        <span style={{ ...styles.tag, ...tagStyle, marginLeft: "auto" }}>{tag}</span>
      </div>
      <div style={styles.cardDesc}>{desc}</div>
      <ProgressBar pct={pct} color={barColor} />
      <div style={styles.progLabel}><span>Progress</span><span>{pct}%</span></div>
    </div>
  );
}

function NotifPanel() {
  const notifs = [
    { icon: "🔥", bg: "#FAEEDA", title: "Daily challenge unlocked", sub: "Two Sum Variants — Medium" },
    { icon: "👥", bg: "#E1F5EE", title: "Alex solved a problem", sub: "Longest Palindrome — Hard" },
    { icon: "🏆", bg: "#EEEDFE", title: "New badge earned", sub: "10-day streak — keep going!" },
  ];
  return (
    <div style={styles.notifPanel}>
      <div style={{ fontSize: 11, fontWeight: 500, color: "#888780", marginBottom: 8, letterSpacing: "0.5px", textTransform: "uppercase" }}>
        Notifications
      </div>
      {notifs.map((n, i) => (
        <div key={i} style={{ ...styles.notifItem, borderBottom: i < notifs.length - 1 ? "0.5px solid rgba(0,0,0,0.07)" : "none" }}>
          <div style={{ ...styles.notifIcon, background: n.bg }}>{n.icon}</div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 2 }}>{n.title}</div>
            <div style={{ fontSize: 11, color: "#888780" }}>{n.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── MAIN DASHBOARD ─── */

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [active, setActive] = useState("Dashboard");
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const notifRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const navItems = [
    { label: "Dashboard", icon: "⚡", section: "Main" },
    { label: "DSA Arena", icon: "⚔️", section: "Main" },
    { label: "Code Vault", icon: "📦", section: "Main" },
    { label: "Learning Loop", icon: "🔁", section: "Main" },
    { label: "Friends", icon: "👥", section: "Social" },
    { label: "Progress", icon: "📊", section: "Social" },
    { label: "Settings", icon: "⚙️", section: "Account" },
  ];

  const sections = [...new Set(navItems.map((n) => n.section))];

  const challenges = [
    { icon: "⚔️", iconBg: "#EEEDFE", title: "Daily Challenge", sub: "Updated 2h ago", desc: "Two Sum Variants — explore hashing strategies", pct: 70, barColor: "#7F77DD", tag: "Medium", tagStyle: styles.tagMed, delay: 250 },
    { icon: "🔥", iconBg: "#FAECE7", title: "DSA Arena", sub: "12 participants", desc: "Live competition — Segment Trees", pct: 40, barColor: "#D85A30", tag: "Hard", tagStyle: styles.tagHard, delay: 300 },
    { icon: "📦", iconBg: "#E1F5EE", title: "Code Vault", sub: "34 snippets saved", desc: "Saved solutions and templates", pct: 90, barColor: "#1D9E75", tag: "Easy", tagStyle: styles.tagEasy, delay: 350 },
    { icon: "🔁", iconBg: "#FAEEDA", title: "Learning Loop", sub: "Due today: 5", desc: "Spaced revision — Dynamic Programming", pct: 55, barColor: "#BA7517", tag: "Medium", tagStyle: styles.tagMed, delay: 400 },
  ];

  const leaderboard = [
    { rank: 1, name: "Alex", score: 2450, me: false },
    { rank: 2, name: "Sarah", score: 2310, me: false },
    { rank: 3, name: "You", score: 1240, me: true },
    { rank: 4, name: "Jordan", score: 1190, me: false },
  ];

  return (
    <div style={styles.wrapper}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.45s ease both; }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .pulse-dot { animation: pulseDot 1.4s ease infinite; }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .slide-down { animation: slideDown 0.2s ease both; }
        .nav-hover:hover {
          background: rgba(79,70,229,0.06) !important;
          transform: translateX(3px) !important;
        }
        .challenge-card { transition: transform 0.2s ease, border-color 0.2s ease; }
        .stat-card { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .stat-card:hover { transform: translateY(-2px); }
        .lb-row-me { background: #EEEDFE; border-radius: 8px; }
      `}</style>

      {/* TOP BAR */}
      <header style={styles.topbar}>
        <button
          onClick={() => setSidebarOpen((v) => !v)}
          style={styles.toggleBtn}
          title="Toggle sidebar"
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 4, width: 16 }}>
            <span style={{ ...styles.toggleLine, transform: sidebarOpen ? "none" : "rotate(45deg) translate(3.5px, 3.5px)", transition: "transform 0.3s" }} />
            <span style={{ ...styles.toggleLine, opacity: sidebarOpen ? 1 : 0, transition: "opacity 0.3s" }} />
            <span style={{ ...styles.toggleLine, transform: sidebarOpen ? "none" : "rotate(-45deg) translate(3.5px, -3.5px)", transition: "transform 0.3s" }} />
          </div>
        </button>

        <div style={{...styles.brandContainer,cursor:'pointer'}}
                onClick={() => setActive("Dashboard")}>

          <img 
            src={logo} // Replace with your logo path (SVG, PNG, etc.)
            alt="CodeSparrow Logo" 
            style={styles.logo} 
          />
          <span style={styles.brand}>CodeSparrow</span>
        </div>

        <input
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          placeholder="Search problems, topics..."
          style={styles.search}
        />

        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
          {/* Notification button */}
          <div ref={notifRef} style={{ position: "relative" }}>
            <button onClick={() => setNotifOpen((v) => !v)} style={styles.iconBtn}>
              🔔
              <span style={styles.notifDot} />
            </button>
            {notifOpen && (
              <div className="slide-down">
                <NotifPanel />
              </div>
            )}
          </div>
          <div style={styles.avatar}>U</div>
        </div>
      </header>

      {/* BODY */}
      <div style={styles.body}>

        {/* SIDEBAR */}
        <aside style={{ ...styles.sidebar, width: sidebarOpen ? 210 : 0, padding: sidebarOpen ? "12px 10px" : "12px 0", overflow: "hidden", transition: "width 0.28s cubic-bezier(0.4,0,0.2,1), padding 0.28s" }}>
          {sections.map((section) => (
            <div key={section}>
              <div style={styles.sidebarSection}>{section}</div>
              {navItems.filter((n) => n.section === section).map((item) => (
                <div
                  key={item.label}
                  onClick={() => setActive(item.label)}
                  className="nav-hover"
                  style={{
                    ...styles.navItem,
                    background: active === item.label ? "#EEEDFE" : "transparent",
                    color: active === item.label ? "#534AB7" : "#5F5E5A",
                    fontWeight: active === item.label ? 500 : 400,
                    transition: "background 0.15s, color 0.15s, transform 0.15s",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                  }}
                >
                  <span style={{ fontSize: 15, flexShrink: 0 }}>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          ))}
        </aside>

        {/* CONTENT */}
        <section style={styles.content}>

          {/* STATS */}
          <div style={styles.statGrid}>
            <StatCard icon="🔥" label="Streak" value={12} suffix="days" badge="+2" badgeColor="green" delay={0} />
            <StatCard icon="⭐" label="Points" value={1240} badge="Top 10%" badgeColor="purple" delay={50} />
            <StatCard icon="📘" label="Solved" value={86} delay={100} />
            <StatCard icon="🏆" label="Rank" value="#142" delay={150} />
          </div>

          {/* SECTION HEADER */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: "#2C2C2A" }}>Today's challenges</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#888780" }}>
              <span className="pulse-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#D85A30", display: "inline-block" }} />
              Live arena active
            </div>
          </div>

          {/* CHALLENGE CARDS */}
          <div style={styles.cardGrid}>
            {challenges.map((c, i) => (
              <ChallengeCard key={i} {...c} onClick={() => setActive(c.title)} />
            ))}
          </div>

          {/* BOTTOM */}
          <div style={styles.bottomGrid}>
            {/* Activity */}
            <div style={styles.panel} className="fade-up" style2={{ animationDelay: "450ms" }}>
              <div style={styles.panelTitle}>⚡ Recent activity</div>
              {[
                "Solved Binary Search — Easy",
                "Joined weekly arena",
                "Saved BFS template",
                "Revised DP patterns",
              ].map((act, i) => (
                <div key={i} style={{ ...styles.activityItem, borderBottom: i < 3 ? "0.5px solid rgba(0,0,0,0.06)" : "none" }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#1D9E75", display: "inline-block", flexShrink: 0 }} />
                  {act}
                </div>
              ))}
            </div>

            {/* Leaderboard */}
            <div style={styles.panel}>
              <div style={styles.panelTitle}>🏆 Leaderboard</div>
              {leaderboard.map((row, i) => (
                <div key={i} style={{ ...styles.lbRow, ...(row.me ? styles.lbRowMe : {}), borderBottom: !row.me && i < leaderboard.length - 1 ? "0.5px solid rgba(0,0,0,0.06)" : "none" }}>
                  <span style={{ ...styles.lbRank, color: row.rank === 1 ? "#BA7517" : "#888780" }}>{row.rank}</span>
                  <span style={{ flex: 1, fontSize: 12, color: row.me ? "#534AB7" : "#2C2C2A", fontWeight: row.me ? 500 : 400 }}>{row.name}</span>
                  <span style={{ fontSize: 12, fontWeight: 500, color: "#534AB7" }}>{row.score.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

        </section>
      </div>
    </div>
  );
}

/* ─── STYLES ─── */
const styles = {
  wrapper: { minHeight: "100vh", fontFamily: "'Inter', sans-serif", background: "#f4f6fb", color: "#2C2C2A" },

  topbar: { display: "flex", alignItems: "center", gap: 12, padding: "0 16px", height: 52, background: "white", borderBottom: "0.5px solid rgba(0,0,0,0.09)", position: "sticky", top: 0, zIndex: 20 },

  toggleBtn: { width: 30, height: 30, borderRadius: 8, border: "0.5px solid rgba(0,0,0,0.1)", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  toggleLine: { display: "block", height: 1.5, background: "#5F5E5A", borderRadius: 2, transformOrigin: "center" },

  brand: { fontWeight: 500, fontSize: 15, color: "#534AB7", letterSpacing: "-0.3px", whiteSpace: "nowrap" },

  search: { flex: 1, maxWidth: 280, height: 30, borderRadius: 8, border: "0.5px solid rgba(0,0,0,0.1)", background: "#F1EFE8", padding: "0 10px", fontSize: 13, outline: "none" },

  iconBtn: { position: "relative", width: 30, height: 30, borderRadius: 8, border: "0.5px solid rgba(0,0,0,0.1)", background: "white", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" },
  notifDot: { position: "absolute", top: 5, right: 5, width: 6, height: 6, borderRadius: "50%", background: "#D85A30", border: "1.5px solid white" },

  avatar: { width: 28, height: 28, borderRadius: "50%", background: "#534AB7", color: "#EEEDFE", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 500, cursor: "pointer" },

  notifPanel: { position: "absolute", right: 0, top: 38, width: 250, background: "white", border: "0.5px solid rgba(0,0,0,0.1)", borderRadius: 12, padding: 12, boxShadow: "0 8px 24px rgba(0,0,0,0.08)", zIndex: 50 },
  notifItem: { display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 0" },
  notifIcon: { width: 24, height: 24, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0 },

  body: { display: "flex", minHeight: "calc(100vh - 52px)" },

  sidebar: { background: "white", borderRight: "0.5px solid rgba(0,0,0,0.09)", display: "flex", flexDirection: "column", gap: 2, flexShrink: 0 },
  sidebarSection: { fontSize: 10, fontWeight: 500, color: "#B4B2A9", letterSpacing: "0.6px", textTransform: "uppercase", padding: "10px 10px 4px" },
  navItem: { display: "flex", alignItems: "center", gap: 9, padding: "8px 10px", borderRadius: 8, cursor: "pointer", fontSize: 13 },

  content: { flex: 1, padding: 18, display: "flex", flexDirection: "column", gap: 14, overflowY: "auto" },

  statGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 },
  statCard: { background: "white", border: "0.5px solid rgba(0,0,0,0.09)", borderRadius: 12, padding: "12px 14px" },
  statLabel: { display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#888780", marginBottom: 4 },
  statValue: { fontSize: 22, fontWeight: 500, color: "#2C2C2A" },

  badge: { fontSize: 10, padding: "2px 6px", borderRadius: 20, fontWeight: 500 },
  badgeGreen: { background: "#EAF3DE", color: "#3B6D11" },
  badgePurple: { background: "#EEEDFE", color: "#534AB7" },

  cardGrid: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 },
  challengeCard: { background: "white", border: "0.5px solid rgba(0,0,0,0.09)", borderRadius: 12, padding: 14 },
  cardTop: { display: "flex", alignItems: "center", gap: 9, marginBottom: 8 },
  cardIcon: { width: 30, height: 30, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0 },
  cardTitle: { fontSize: 13, fontWeight: 500, color: "#2C2C2A" },
  cardSub: { fontSize: 10, color: "#888780", marginTop: 1 },
  cardDesc: { fontSize: 12, color: "#5F5E5A", marginBottom: 10 },
  tag: { fontSize: 10, padding: "2px 7px", borderRadius: 20, fontWeight: 500 },
  tagEasy: { background: "#EAF3DE", color: "#3B6D11" },
  tagMed: { background: "#FAEEDA", color: "#633806" },
  tagHard: { background: "#FCEBEB", color: "#791F1F" },
  progressTrack: { height: 4, background: "#F1EFE8", borderRadius: 20, overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: 20 },
  progLabel: { display: "flex", justifyContent: "space-between", fontSize: 10, color: "#B4B2A9", marginTop: 5 },

  bottomGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
  panel: { background: "white", border: "0.5px solid rgba(0,0,0,0.09)", borderRadius: 12, padding: 14 },
  panelTitle: { fontSize: 13, fontWeight: 500, color: "#2C2C2A", marginBottom: 10, display: "flex", alignItems: "center", gap: 6 },
  activityItem: { display: "flex", alignItems: "center", gap: 8, padding: "7px 0", fontSize: 12, color: "#5F5E5A" },
  lbRow: { display: "flex", alignItems: "center", gap: 8, padding: "7px 0", fontSize: 12, borderBottom: "0.5px solid rgba(0,0,0,0.06)" },
  lbRowMe: { background: "#EEEDFE", borderRadius: 8, padding: "7px 8px", margin: "0 -4px" },
  lbRank: { width: 18, fontSize: 11, fontWeight: 500 },

  brandContainer: {
  display: "flex",
  alignItems: "center",
  // gap: 1,
},

logo: {
  width: 45,
  height: 45,
  objectFit: "contain",
},

};
