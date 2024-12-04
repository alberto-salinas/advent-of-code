async function countWordOccurrences(filePath: string): Promise<number> {
    const word = "XMAS";
    const directions = [
        [0, 1],  // Right
        [1, 0],  // Down
        [1, 1],  // Down-right (diagonal)
        [1, -1], // Down-left (diagonal)
        [0, -1], // Left
        [-1, 0], // Up
        [-1, -1], // Up-left (diagonal)
        [-1, 1]  // Up-right (diagonal)
    ];

    const fileData = await Deno.readTextFile(filePath);
    const grid = fileData.trim().split('\n');

    const rows = grid.length;
    const cols = grid[0].length;

    let count = 0;

    const isValid = (x: number, y: number) => x >= 0 && x < rows && y >= 0 && y < cols;

    const searchWord = (x: number, y: number, dx: number, dy: number): boolean => {
        for (let i = 0; i < word.length; i++) {
            const nx = x + i * dx;
            const ny = y + i * dy;
            if (!isValid(nx, ny) || grid[nx][ny] !== word[i]) {
                return false;
            }
        }
        return true;
    };

    for (let x = 0; x < rows; x++) {
        for (let y = 0; y < cols; y++) {
            if (grid[x][y] === word[0]) { // Start search only if the first character matches
                for (const [dx, dy] of directions) {
                    if (searchWord(x, y, dx, dy)) {
                        count++;
                    }
                }
            }
        }
    }

    return count;
}

const filePath = './input.txt';
console.log(`Occurrences of XMAS":`, await countWordOccurrences(filePath));

