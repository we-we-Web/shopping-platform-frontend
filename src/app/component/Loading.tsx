import { useState, useEffect } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000); 

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div style={styles.container}>
      {loading ? (
        <div style={styles.loadingContainer}>
          <p style={styles.mainText}>東 毅 中</p>
          <p style={{ color: "#9F79EE" }}>SINCE 2024</p>
        </div>
      ) : (
        <div style={styles.content}>
          <h1>內容已加載完成！</h1>
        </div>
      )}
    </div>
  );
}
const styles = {
  container: {
    display: "flex" as "flex",
    justifyContent: "center" as "center",
    alignItems: "center" as "center",
    flexDirection: "column" as "column",
    height: "100vh",
    backgroundColor: "#fff",
    fontFamily: "Arial, sans-serif",
  },
  loadingContainer: {
    textAlign: "center" as "center",
  },
  mainText: {
    fontSize: "3rem",
    fontFamily: "'Brush Script MT', cursive",
    marginBottom: "20px",
    color: "#68228B",
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "4px solid #ccc",
    borderTopColor: "#000",
    borderRadius: "50%",
    margin: "20px auto",
    animation: "spin 1s linear infinite",
  },
  footerText: {
    fontSize: "1.2rem",
    fontFamily: "'Brush Script MT', cursive",
    marginTop: "20px",
  },
  content: {
    fontSize: "1.5rem",
    color: "#000",
  },
};