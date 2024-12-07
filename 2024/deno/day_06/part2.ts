import { readFile,
    FILE_PATH,
    X,
    Y,
    deltaCoordinates,
} from "./utils.ts";

function hasLoops(grid: string[][]): boolean {
    // Extract grid dimensions
    const height = grid.length;
    const width = grid[0].length;
  
    // Find the starting point '^' and initialize coordinates
    let [startX, startY] = grid.flatMap((row, y) =>
      row.map((_cell, x) => [x, y])
    ).find(([x, y]) => grid[y][x] === "^")!;
  
    // Initialize direction (facing up initially)
    let dx = -1, dy = 0;
  
    // Track visited positions with direction
    const visited = new Set<string>();
  
    // Traverse the grid
    while (startX >= 0 && startX < width && startY >= 0 && startY < height) {
      const state = `${startX},${startY},${dx},${dy}`;
      
      // If we revisit the same state, it's a loop
      if (visited.has(state)) return true;
  
      // Mark the current state as visited
      visited.add(state);
  
      // Change direction if the next cell is blocked (#)
      while (grid[startY + dy]?.[startX + dx] === "#") {
        [dx, dy] = [-dy, dx]; // Rotate direction clockwise
      }
  
      // Move to the next cell
      startX += dx;
      startY += dy;
    }
  
    // If the traversal exits the grid, there's no loop
    return false;
  }
  

async function day_six_part_one_solution(filePath: string): Promise<void> {
    const lines = await readFile(filePath);

    const grid = lines.map((line) => line.split(''));
    const gridPart2 = lines.map((line) => line.split(''));
    let guardX = 0;
    let guardY = 0;
    let direction: number = 1; // 0 - up, 1 - right, 2 - down, 3 - left
    grid.find((line, idx) => {
        if (line.includes('^')) {
            guardX = idx;
            guardY = line.indexOf('^');
            return true;
        }
    })

    let currentX = guardX;
    let currentY = guardY;

    function isValidCoord(x: number, y: number): boolean {
    return x >= 0 && x < grid.length && y >= 0 && y < grid[0].length;
    }

    function outOfBounds(x: number, y: number): boolean {
    return x < 0 || x >= grid.length || y < 0 || y >= grid[0].length;
    }

    grid[currentX][currentY] = 'X';
    const seen = new Set<string>();
    while (true) {
        const deltaCoord = deltaCoordinates.get(direction);
        if (deltaCoord === undefined) {
            throw new Error('Invalid direction');
        }

        if (outOfBounds(currentX + deltaCoord[X], currentY + deltaCoord[Y])) {
            break;
        }

        if (isValidCoord(currentX + deltaCoord[X], currentY + deltaCoord[Y])) {
            const potentialX = deltaCoord[X] + currentX;
            const potentialY = deltaCoord[Y] + currentY;
            if (grid[potentialX][potentialY] === '.') {
                grid[potentialX][potentialY] = 'X';
                seen.add(`${potentialX},${potentialY}`);
                currentX = potentialX;
                currentY = potentialY;
            }
            else if (grid[potentialX][potentialY] === 'X') {
                currentX = potentialX;
                currentY = potentialY;
            }
            else if (grid[potentialX][potentialY] === '#') {
                if (direction === 1) {
                    direction = 2;
                }
                else if (direction === 2) {
                    direction = 3;
                }
                else if (direction === 3) {
                    direction = 4;
                }
                else if (direction === 4) {
                    direction = 1;
                }
            }
        }
    }

    let count = 0;
    for (const hash of seen) {
      const [x, y] = hash.split(",").map(Number);
      if (gridPart2[x][y] === "^") continue;
      // set an obstacle at a visited position and check if it causes a loop
      if (hasLoops(gridPart2.with(x, gridPart2[x].with(y, "#")))) count++;
    }
    console.log(count);
}

day_six_part_one_solution(FILE_PATH)