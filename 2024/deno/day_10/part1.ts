import { directions } from "./utils.ts"

export function day10Part1(grid: number[][]): number {
    const rows = grid.length;
    const cols = grid[0].length;

    const coords = [];
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === 0) {
                coords.push([i, j]);
            }
        }
    }

    let totalScore = 0;
    for (const [x, y] of coords) {
      totalScore += calculateTrailScore(grid, 0, x, y).size;
    }
    return totalScore;
}


function calculateTrailScore(
    grid: number[][],
    currentValue: number,
    x: number,
    y: number,
    peaks = new Set<string>(),
  ) {
    if (currentValue === 9) {
      return peaks.add(`${x},${y}`);
    }
    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;
        if (nx < 0 || nx >= grid.length || ny < 0 || ny >= grid[0].length) {
            continue;
        }
      const nextValue = grid[nx][ny];
      if (nextValue === currentValue + 1) {
        calculateTrailScore(grid, nextValue, nx, ny, peaks);
      }
    }
    return peaks;
  }