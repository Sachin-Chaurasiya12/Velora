

export default function Dashboard() {
  return (
    <div style={styles.container}>
      <h1 style={styles.text}>Hello World 👋</h1>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #6a11cb, #2575fc)",
    fontFamily: "Arial, sans-serif",
  },
  text: {
    color: "white",
    fontSize: "48px",
    fontWeight: "bold",
  },
};
