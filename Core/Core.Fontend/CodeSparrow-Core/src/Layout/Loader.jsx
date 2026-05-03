export default function Loader() {
  return (
    <div style={styles.loaderWrapper}>
      <div style={styles.spinner}></div>
      <p style={styles.text}>Loading Dashboard...</p>
    </div>
  );
}

const styles = {
  loaderWrapper: {
    height: "70vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  spinner: {
    width: 45,
    height: 45,
    border: "4px solid #e5e7eb",
    borderTop: "4px solid #4f46e5",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },

  text: {
    marginTop: 12,
    color: "#4f46e5",
    fontWeight: 500,
    fontSize: 14,
  },
};
