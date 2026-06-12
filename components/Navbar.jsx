import React from "react";

function Navbar({
  onVisualize,
  onClearGrid,
  currentAlgorithm,
  setCurrentAlgorithm,
}) {
  const algorithms = [
    { id: "dijkstra", name: "Dijkstra's" },
    { id: "astar", name: "A* Search" },
    { id: "bfs", name: "BFS" },
    { id: "dfs", name: "DFS" },
    { id: "greedy", name: "Greedy Best-First" },
  ];

  return (
    <nav className="navbar" style={styles.nav}>
      <div className="navbar-brand" style={styles.brand}>
        PathVision
      </div>

      <div className="navbar-controls" style={styles.controls}>
        <div style={styles.selectWrapper}>
          <label htmlFor="algo-select" style={styles.label}>
            Algorithm:
          </label>
          <select
            id="algo-select"
            value={currentAlgorithm}
            onChange={(e) => setCurrentAlgorithm(e.target.value)}
            style={styles.select}
          >
            <option value="">Select an Algorithm</option>
            {algorithms.map((algo) => (
              <option key={algo.id} value={algo.id}>
                {algo.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={onVisualize}
          disabled={!currentAlgorithm}
          style={{
            ...styles.button,
            ...styles.visualizeBtn,
            ...(!currentAlgorithm ? styles.disabledBtn : {}),
          }}
        >
          Visualize!
        </button>

        <button
          onClick={onClearGrid}
          style={{ ...styles.button, ...styles.clearBtn }}
        >
          Clear Board
        </button>
      </div>
    </nav>
  );
}

// Clean inline styles for instant setup without managing extra files
const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1a1a24",
    padding: "0.75rem 2rem",
    color: "#fff",
    fontFamily: "sans-serif",
  },
  brand: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    letterSpacing: "1px",
    color: "#00beda",
  },
  controls: {
    display: "flex",
    gap: "1.5rem",
    alignItems: "center",
  },
  selectWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  label: {
    fontSize: "0.9rem",
    color: "#cbd5e1",
  },
  select: {
    padding: "0.4rem 0.8rem",
    borderRadius: "4px",
    border: "1px solid #334155",
    backgroundColor: "#0f172a",
    color: "#fff",
    cursor: "pointer",
    outline: "none",
  },
  button: {
    padding: "0.5rem 1.2rem",
    borderRadius: "4px",
    border: "none",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  visualizeBtn: {
    backgroundColor: "#00d700",
    color: "#000",
  },
  clearBtn: {
    backgroundColor: "#ef4444",
    color: "#fff",
  },
  disabledBtn: {
    backgroundColor: "#475569",
    color: "#94a3b8",
    cursor: "not-allowed",
  },
};

export default Navbar;
