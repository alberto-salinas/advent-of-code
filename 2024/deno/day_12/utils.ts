export async function readFile(filePath: string): Promise<string[]> {
    const fileData = await Deno.readTextFile(filePath);

    const lines = fileData.trim().split('\n')
    return lines;
}

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

  function calculatePerimeter(grid: string[][], cluster: number[][]): number {
    const rows = grid.length;
    const cols = grid[0].length;
  
    let perimeter = 0;
  
    const directions = [
      [0, 1],  // Right
      [1, 0],  // Down
      [0, -1], // Left
      [-1, 0]  // Up
    ];
  
    for (const [r, c] of cluster) {
      for (const [dr, dc] of directions) {
        const nr = r + dr;
        const nc = c + dc;
  
        // Check if the neighbor is out of bounds or has a different character
        if (nr < 0 || nr >= rows || nc < 0 || nc >= cols || grid[nr][nc] !== grid[r][c]) {
          perimeter++;
        }
      }
    }
  
    return perimeter;
  }


  export function findClustersWithPerimetersAndArea(grid: string[][]) {
    const clusters = findClusters(grid); // Use the clustering function from before
    const clusterPerimeters = clusters.map(cluster => calculatePerimeter(grid, cluster));

    const clusterAreas = clusters.map(cluster => cluster.length);

    // calculate the product of the area and perimeter per cluster and sum them up
    const sum = clusterAreas.reduce((acc, area, i) => acc + area * clusterPerimeters[i], 0);
  
    return sum;
  }