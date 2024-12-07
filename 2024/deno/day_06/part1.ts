import { readFile,
            FILE_PATH,
            X,
            Y,
            deltaCoordinates,
 } from "./utils.ts";


async function day_six_part_one_solution(filePath: string): Promise<void> {
    const lines = await readFile(filePath);

    const grid = lines.map((line) => line.split(''));
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

    let uniquePositions = 1
    grid[currentX][currentY] = 'X';
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
                uniquePositions++;
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
    console.log(uniquePositions);
}

day_six_part_one_solution(FILE_PATH)