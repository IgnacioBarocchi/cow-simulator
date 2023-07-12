export default function getRandomPatrolPath(tree: {
  [x: string]: [number, number];
}) {
  const vertices = Object.keys(tree);
  const visited = new Set();
  const path: string[] = [];

  // Define the backtracking function
  function backtrack(vertex: string) {
    visited.add(vertex);
    path.push(vertex);

    if (visited.size === vertices.length) {
      // All vertices have been visited, return the path
      return true;
    }

    const neighbors = findNeighbors(vertex);
    shuffleArray(neighbors);

    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        if (backtrack(neighbor)) {
          return true;
        }
      }
    }

    // If no unvisited neighbors found, backtrack
    visited.delete(vertex);
    path.pop();
    return false;
  }

  // Find neighboring vertices for a given vertex
  function findNeighbors(vertex: string) {
    const [x, y] = tree[vertex];
    const neighbors = [];

    for (const v of vertices) {
      const [vx, vy] = tree[v];
      if ((vx === x || vy === y) && v !== vertex) {
        neighbors.push(v);
      }
    }

    return neighbors;
  }

  // Shuffle an array in-place using Fisher-Yates algorithm
  function shuffleArray(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Start the backtracking from a random vertex
  const startVertex = vertices[Math.floor(Math.random() * vertices.length)];
  backtrack(startVertex);

  return path;
}
