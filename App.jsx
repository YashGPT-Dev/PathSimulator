import { useState } from "react";
import Grid from "./components/Grid";
import Navbar from "./components/Navbar";
import "./Apps.css";

import { bfs, getNodesInShortestPathOrder } from "./algorithms/bfs";

const ROWS = 20;
const COLS = 40;

const START_NODE_ROW = 5;
const START_NODE_COL = 5;

const FINISH_NODE_ROW = 15;
const FINISH_NODE_COL = 35;

function App() {
  const createGrid = () => {
    let grid = [];

    for (let r = 0; r < ROWS; r++) {
      let row = [];

      for (let c = 0; c < COLS; c++) {
        row.push({
          row: r,
          col: c,

          isStart: r === START_NODE_ROW && c === START_NODE_COL,

          isFinish: r === FINISH_NODE_ROW && c === FINISH_NODE_COL,

          isWall: false,
          isVisited: false,
          isPath: false,

          distance: Infinity,
          previousNode: null,
        });
      }

      grid.push(row);
    }

    return grid;
  };

  const [grid, setGrid] = useState(createGrid());

  const [currentAlgorithm, setCurrentAlgorithm] = useState("");

  const updateGridState = (row, col) => {
    const node = grid[row][col];

    if (node.isStart || node.isFinish) return;

    const newGrid = grid.map((rowItems) =>
      rowItems.map((n) => {
        if (n.row === row && n.col === col) {
          if (n.isWall) return n;

          return {
            ...n,
            isWall: true,
          };
        }

        return n;
      }),
    );

    setGrid(newGrid);
  };

  const visualizeBFS = () => {
    document.querySelectorAll(".node").forEach((element) => {
      element.classList.remove("node-visited");
      element.classList.remove("node-shortest-path");
    });
    // Reset previous visualization
    grid.forEach((row) =>
      row.forEach((node) => {
        node.isVisited = false;
        node.previousNode = null;
        node.distance = Infinity;
      }),
    );

    const startNode = grid[START_NODE_ROW][START_NODE_COL];

    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];

    const visitedNodesInOrder = bfs(grid, startNode, finishNode);

    const shortestPath = getNodesInShortestPathOrder(finishNode);

    if (finishNode.previousNode === null && finishNode !== startNode) {
      alert("No Path Found");
      return;
    }

    console.log("Visited Nodes:", visitedNodesInOrder.length);

    console.log("Shortest Path Length:", shortestPath.length);

    animateVisitedNodes(visitedNodesInOrder, shortestPath);
  };
  const visualizeAlgorithm = () => {
    switch (currentAlgorithm) {
      case "bfs":
        visualizeBFS();
        break;

      case "dfs":
        alert("DFS Coming Soon");
        break;

      case "dijkstra":
        alert("Dijkstra Coming Soon");
        break;

      default:
        alert("Please select an algorithm");
        break;
    }
  };
  const animateVisitedNodes = (
    visitedNodesInOrder,
    nodesInShortestPathOrder,
  ) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);

        return;
      }

      setTimeout(() => {
        const node = visitedNodesInOrder[i];

        const element = document.getElementById(`node-${node.row}-${node.col}`);

        if (element) {
          if (!node.isStart && !node.isFinish && !node.isWall) {
            element.classList.add("node-visited");
          }
        }
      }, 10 * i);
    }
  };

  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];

        const element = document.getElementById(`node-${node.row}-${node.col}`);

        if (element) {
          if (!node.isStart && !node.isFinish && !node.isWall) {
            element.classList.remove("node-visited");
            element.classList.add("node-shortest-path");
          }
        }
      }, 50 * i);
    }
  };

  //const clearGrid = () => {
  //const newGrid = createGrid();

  //setGrid(newGrid);
  //setGrid(createGrid());
  //document.querySelectorAll(".node").forEach((node) => {
  //node.className = "node";
  //});//
  //};
  const clearGrid = () => {
    const newGrid = createGrid();

    setGrid(newGrid);

    setTimeout(() => {
      document.querySelectorAll(".node").forEach((element) => {
        element.classList.remove("node-visited");
        element.classList.remove("node-shortest-path");
        element.classList.remove("node-wall");
      });
    }, 0);
  };

  return (
    <>
      <Navbar
        currentAlgorithm={currentAlgorithm}
        setCurrentAlgorithm={setCurrentAlgorithm}
        onVisualize={visualizeAlgorithm}
        onClearGrid={clearGrid}
      />

      <Grid grid={grid} updateGridState={updateGridState} />
    </>
  );
}

export default App;
