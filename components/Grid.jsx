import React, { useState } from "react";
import Node from "./Node";

function Grid({ grid, updateGridState }) {
  // Track if the mouse is currently pressed down anywhere on the grid
  const [isMousePressed, setIsMousePressed] = useState(false);

  const handleMouseDown = (row, col) => {
    updateGridState(row, col, "down");
    setIsMousePressed(true);
  };

  const handleMouseEnter = (row, col) => {
    if (!isMousePressed) return;
    updateGridState(row, col, "enter");
  };

  const handleMouseUp = () => {
    setIsMousePressed(false);
  };

  return (
    <div className="grid-container" onMouseLeave={handleMouseUp}>
      {grid.map((row, r) => (
        <div key={r} className="grid-row" style={{ display: "flex" }}>
          {row.map((node, c) => (
            <Node
              key={`${r}-${c}`}
              row={r}
              col={c}
              isStart={node.isStart}
              isFinish={node.isFinish}
              isWall={node.isWall}
              isVisited={node.isVisited}
              isPath={node.isPath}
              onMouseDown={handleMouseDown}
              onMouseEnter={handleMouseEnter}
              onMouseUp={handleMouseUp}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Grid;
