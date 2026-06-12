// Performs Dijkstra's algorithm; returns all nodes in the order they were visited.
// Also updates node properties to store parent connections for backtracking.
export function dijkstra(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];

  // Set all initial node distances to Infinity, except the start node which is 0
  for (const row of grid) {
    for (const node of row) {
      node.distance = Infinity;
      node.isVisited = false;
      node.previousNode = null;
    }
  }
  startNode.distance = 0;

  // Flatten the grid array to easily manage the pool of unvisited nodes
  const unvisitedNodes = getAllNodes(grid);

  while (unvisitedNodes.length > 0) {
    // Sort nodes by distance to find the closest one (acting as a basic priority queue)
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();

    // If the closest node's distance is Infinity, we are trapped by walls
    if (closestNode.distance === Infinity) return visitedNodesInOrder;

    // Skip walls
    if (closestNode.isWall) continue;

    // Mark node as officially visited
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);

    // Stop execution if we reach the target destination
    if (closestNode === finishNode) return visitedNodesInOrder;

    // Update distances for all neighboring nodes
    updateUnvisitedNeighbors(closestNode, grid);
  }

  return visitedNodesInOrder;
}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    // Dijkstra assumes uniform grid movement cost of 1 edge per step
    const tentativeDistance = node.distance + 1;
    if (tentativeDistance < neighbor.distance) {
      neighbor.distance = tentativeDistance;
      neighbor.previousNode = node; // Link node to backtrace path later
    }
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;

  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}
