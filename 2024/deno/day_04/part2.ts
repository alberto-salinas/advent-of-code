async function countXMASPatterns(filePath: string): Promise<number> {
    const fileData = await Deno.readTextFile(filePath);
    const grid = fileData.trim().split('\n');

    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0;

    const isValid = (x: number, y: number) => x >= 0 && x < rows && y >= 0 && y < cols;

    const isXMAS = (centerX: number, centerY: number): boolean => {

        if (grid[centerX][centerY] !== "A") {
            return false;
        }

        if (!isValid(centerX - 1, centerY - 1)){
            return false;
        }
        if (!isValid(centerX + 1, centerY + 1)) {
            return false;
        }

        if (!isValid(centerX - 1, centerY + 1)) {
            return false;
        }

        if (!isValid(centerX + 1, centerY - 1)) {
            return false;
        }

        const topLeftToBottomRight =  
            (grid[centerX - 1][centerY -1] === "S" &&
                grid[centerX + 1][centerY +1] === "M") ||
            (grid[centerX - 1][centerY -1] === "M" &&
                grid[centerX + 1][centerY +1] === "S");

        // Top-right to bottom-left
        const topRightToBottomLeft =
            (grid[centerX - 1][centerY + 1] === "S" &&
                grid[centerX + 1][centerY - 1] === "M") ||
            (grid[centerX - 1][centerY + 1] === "M" &&
                grid[centerX + 1][centerY - 1] === "S");

        return topLeftToBottomRight && topRightToBottomLeft;
    };

    // Iterate through every cell in the grid
    for (let x = 0; x < rows ; x++) {
        for (let y = 0; y < cols ; y++) {
            if (isXMAS(x, y)) {
                count++;
            }
        }
    }

    return count;
}

const filePath = './input.txt';
console.log(`Occurrences of XMAS":`, await countXMASPatterns(filePath));

