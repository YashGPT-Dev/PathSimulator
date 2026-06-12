// Performs Depth-First Search; returns all nodes in the order they were visited.
// Updates node properties to store parent connections for backtracking.
export function dfs(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  const stack = [];

  // Start node initialization
  stack.push(startNode);

  while (stack.length > 0) {
    const currentNode = stack.pop();

    // Skip if it's a wall or already visited (nodes can be added to stack multiple times)
    if (currentNode.isWall || currentNode.isVisited) continue;

    // Mark as visited when popping from the stack
    currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);

    // Stop execution if we successfully reached the target destination
    if (currentNode === finishNode) return visitedNodesInOrder;

    // Retrieve neighbors
    const neighbors = getUnvisitedNeighbors(currentNode, grid);
    for (const neighbor of neighbors) {
      if (!neighbor.isVisited && !neighbor.isWall) {
        neighbor.isVisited = true;
        neighbor.previousNode = currentNode;
        stack.push(neighbor);
      }
    }
  }

  // Returns all visited nodes if no path exists
  return visitedNodesInOrder;
}

// Retrieves neighboring nodes (Order determines exploration direction: Up, Down, Left, Right)
function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;

  // Check top neighbor
  if (row > 0) neighbors.push(grid[row - 1][col]);
  // Check bottom neighbor
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  // Check left neighbor
  if (col > 0) neighbors.push(grid[row][col - 1]);
  // Check right neighbor
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

  return neighbors;
}
