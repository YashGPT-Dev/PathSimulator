import React from "react";

function Node({
  row,
  col,
  isStart,
  isFinish,
  isWall,
  isVisited,
  isPath,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
}) {
  // Dynamically assign classes based on the node's state
  const extraClassName = isFinish
    ? "node-finish"
    : isStart
      ? "node-start"
      : isWall
        ? "node-wall"
        : isPath
          ? "node-shortest-path"
          : isVisited
            ? "node-visited"
            : "";

  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${extraClassName}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}
    />
  );
}

// Use memo to prevent unnecessary re-renders of unchanged nodes during animations
export default React.memo(Node);
