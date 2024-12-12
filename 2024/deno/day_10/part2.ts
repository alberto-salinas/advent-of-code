import {directions} from './utils.ts';

function calculateTrailRating(
    grid: number[][],
    currentValue: number,
    x: number,
    y: number,
  ): number {
    if (currentValue === 9) {
      return 1;
    }
    let rating = 0;
    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;
        if (nx < 0 || nx >= grid.length || ny < 0 || ny >= grid[0].length) {
            continue;
        }
      const nextValue = grid[nx][ny];
      if (nextValue === currentValue + 1) {
        rating += calculateTrailRating(grid, nextValue, nx, ny);
      }
    }
    return rating;
  }

  export function day10Part2(grid: number[][]): number {
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
    
    let totalRating = 0;
    for (const [x, y] of coords) {
      totalRating += calculateTrailRating(grid, 0, x, y);
    }
    return totalRating;
}