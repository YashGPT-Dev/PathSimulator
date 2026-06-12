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

    console.log("Visited Nodes:", visitedNodesInOrder.length);

    console.log("Shortest Path Length:", shortestPath.length);

    animateVisitedNodes(visitedNodesInOrder, shortestPath);
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

        console.log(element);

        if (element) {
          if (!node.isStart && !node.isFinish) {
            element.className = "node node-visited";
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

        if (element && !node.isStart && !node.isFinish && !node.isWall) {
          element.className = "node node-shortest-path";
        }
      }, 50 * i);
    }
  };

  const clearGrid = () => {
    const newGrid = createGrid();

    setGrid(newGrid);

    document.querySelectorAll(".node").forEach((node) => {
      node.className = "node";
    });
  };

  return (
    <>
      <Navbar
        currentAlgorithm={currentAlgorithm}
        setCurrentAlgorithm={setCurrentAlgorithm}
        onVisualize={visualizeBFS}
        onClearGrid={clearGrid}
      />

      <Grid grid={grid} updateGridState={updateGridState} />
    </>
  );
}

export default App;
