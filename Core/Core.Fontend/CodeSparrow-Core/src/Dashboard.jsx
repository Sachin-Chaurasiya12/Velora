import { useState, useEffect } from "react";
import { motion } from "framer-motion";

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

        if (start >= target) clearInterval(timer);
      }, 16);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (timer) clearInterval(timer);
    };
  }, [target, duration, delay]);

  return value;
}

/* ─── COMPONENTS ─── */

function StatCard({ icon, label, value, suffix = "", badge, badgeColor, delay = 0 }) {
  const count = useCountUp(typeof value === "number" ? value : 0, 900, 200 + delay);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay / 1000, duration: 0.4 }}
      whileHover={{ scale: 1.03 }}
      style={styles.statCard}
    >
      <div style={styles.statLabel}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span>{icon}</span>
          {label}
        </div>

        {badge && (
          <span
            style={{
              ...styles.badge,
              ...(badgeColor === "green" ? styles.badgeGreen : styles.badgePurple),
            }}
          >
            {badge}
          </span>
        )}
      </div>

      <div style={styles.statValue}>
        {typeof value === "number" ? count.toLocaleString() : value}
        {suffix && <span style={styles.suffix}>{suffix}</span>}
      </div>
    </motion.div>
  );
}

function ProgressBar({ pct, color }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setWidth(pct), 120);
    return () => clearTimeout(t);
  }, [pct]);

  return (
    <div style={styles.progressTrack}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${width}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ ...styles.progressFill, background: color }}
      />
    </div>
  );
}

function ChallengeCard(props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.35 }}
      style={styles.challengeCard}
    >
      <div style={styles.cardTop}>
        <div style={{ ...styles.cardIcon, background: props.iconBg }}>{props.icon}</div>
        <div>
          <div style={styles.cardTitle}>{props.title}</div>
          <div style={styles.cardSub}>{props.sub}</div>
        </div>
        <span style={{ ...styles.tag, ...props.tagStyle }}>{props.tag}</span>
      </div>

      <div style={styles.cardDesc}>{props.desc}</div>

      <ProgressBar pct={props.pct} color={props.barColor} />

      <div style={styles.progLabel}>
        <span>Progress</span>
        <span>{props.pct}%</span>
      </div>
    </motion.div>
  );
}

/* ─── MAIN DASHBOARD ─── */

export default function Dashboard() {
  const challenges = [/* same as before */];

  const leaderboard = [/* same as before */];

  return (
    <div style={styles.wrapper}>
      <div style={styles.bgGlow} />

      <section style={styles.content}>
        {/* STATS */}
        <div style={styles.statGrid}>
          <StatCard icon="🔥" label="Streak" value={12} suffix=" days" />
          <StatCard icon="⭐" label="Points" value={1240} badge="Top 10%" badgeColor="purple" />
          <StatCard icon="📘" label="Solved" value={86} />
          <StatCard icon="🏆" label="Rank" value="#142" />
        </div>

        {/* CHALLENGES */}
        <div style={styles.cardGrid}>
          {challenges.map((c, i) => (
            <ChallengeCard key={i} {...c} />
          ))}
        </div>

        {/* BOTTOM */}
        <div style={styles.bottomGrid}>
          <motion.div whileHover={{ y: -2 }} style={styles.panel}>
            <div style={styles.panelTitle}>⚡ Recent Activity</div>
            <div style={styles.activityItem}>Solved Binary Search</div>
            <div style={styles.activityItem}>Joined Arena</div>
            <div style={styles.activityItem}>Saved BFS template</div>
          </motion.div>

          <motion.div whileHover={{ y: -2 }} style={styles.panel}>
            <div style={styles.panelTitle}>🏆 Leaderboard</div>
            {leaderboard.map((l, i) => (
              <div key={i} style={{ ...styles.lbRow, ...(l.me ? styles.lbMe : {}) }}>
                <span>{l.rank}</span>
                <span style={{ flex: 1 }}>{l.name}</span>
                <span>{l.score}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

/* ─── STYLES (IMPROVED RESPONSIVE + MODERN UI) ─── */

const styles = {
  wrapper: {
    minHeight: "100vh",
    background: "radial-gradient(circle at top, #f7f8ff, #eef1f8)",
    fontFamily: "Inter, sans-serif",
    display: "flex",
    justifyContent: "center",
    padding: 12,
  },

  bgGlow: {
    position: "fixed",
    width: 400,
    height: 400,
    background: "rgba(127,119,221,0.15)",
    filter: "blur(120px)",
    top: -100,
    left: -100,
    zIndex: 0,
  },

  content: {
    position: "relative",
    zIndex: 2,
    width: "100%",
    maxWidth: 1100,
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },

  statGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: 12,
  },

  statCard: {
    background: "rgba(255,255,255,0.8)",
    backdropFilter: "blur(10px)",
    padding: 14,
    borderRadius: 16,
    border: "1px solid rgba(0,0,0,0.05)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
    transition: "all 0.3s ease",
  },

  statLabel: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 12,
    color: "#666",
    marginBottom: 6,
  },

  statValue: {
    fontSize: 24,
    fontWeight: 600,
  },

  suffix: { fontSize: 12, marginLeft: 4, color: "#888" },

  badge: {
    fontSize: 10,
    padding: "3px 8px",
    borderRadius: 20,
  },

  badgePurple: { background: "#eeeaff", color: "#4b42c8" },
  badgeGreen: { background: "#e8f7ef", color: "#1e7a4f" },

  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 12,
  },

  challengeCard: {
    background: "rgba(255,255,255,0.9)",
    backdropFilter: "blur(10px)",
    padding: 16,
    borderRadius: 16,
    border: "1px solid rgba(0,0,0,0.05)",
  },

  cardTop: {
    display: "flex",
    gap: 10,
    alignItems: "center",
    marginBottom: 8,
  },

  cardIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  cardTitle: { fontSize: 14, fontWeight: 600 },
  cardSub: { fontSize: 11, color: "#777" },
  cardDesc: { fontSize: 12, color: "#555", marginBottom: 10 },

  tag: { fontSize: 10, padding: "3px 8px", borderRadius: 20 },

  tagEasy: { background: "#e7f7ee", color: "#1e7a4f" },
  tagMed: { background: "#fff3dd", color: "#7a4a12" },
  tagHard: { background: "#ffe6e6", color: "#8a1f1f" },

  progressTrack: {
    height: 5,
    background: "#eee",
    borderRadius: 10,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    borderRadius: 10,
  },

  bottomGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 12,
  },

  panel: {
    background: "rgba(255,255,255,0.9)",
    padding: 16,
    borderRadius: 16,
    border: "1px solid rgba(0,0,0,0.05)",
  },

  panelTitle: { fontSize: 14, fontWeight: 600, marginBottom: 10 },

  activityItem: { fontSize: 12, padding: "6px 0", color: "#555" },

  lbRow: { display: "flex", gap: 10, fontSize: 12, padding: "6px 0" },

  lbMe: {
    background: "#eeeaff",
    borderRadius: 10,
    padding: 6,
    fontWeight: 600,
  },
};