type Grid = string[][];

export function findClusters(grid: Grid): number[][][] {
  const rows = grid.length;
  const cols = grid[0].length;

  // Create a visited array
  const visited: boolean[][] = Array.from({ length: rows }, () => Array(cols).fill(false));

  const directions = [
    [0, 1],  // Right
    [1, 0],  // Down
    [0, -1], // Left
    [-1, 0]  // Up
  ];

  const isValid = (r: number, c: number, char: string): boolean => {
    return r >= 0 && r < rows && c >= 0 && c < cols && !visited[r][c] && grid[r][c] === char;
  };

  const floodFill = (r: number, c: number, char: string): number[][] => {
    const stack: [number, number][] = [[r, c]];
    const cluster: number[][] = [];

    while (stack.length > 0) {
      const [x, y] = stack.pop()!;
      if (visited[x][y]) continue;

      visited[x][y] = true;
      cluster.push([x, y]);

      for (const [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;
        if (isValid(nx, ny, char)) {
          stack.push([nx, ny]);
        }
      }
    }

    return cluster;
  };

  const clusters: number[][][] = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (!visited[r][c]) {
        const cluster = floodFill(r, c, grid[r][c]);
        if (cluster.length > 0) {
          clusters.push(cluster);
        }
      }
    }
  }

  return clusters;
}

// Example Usage
// const clusters = findClusters(grid);
// console.log("Clusters:");
// clusters.forEach((cluster, idx) => {
//   console.log(`Cluster ${idx + 1}:`, cluster);
// });
