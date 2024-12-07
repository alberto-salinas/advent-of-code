export async function readFile(filePath: string): Promise<string[]> {
    const fileData = await Deno.readTextFile(filePath);

    const lines = fileData.trim().split('\n')
    return lines;
}

export function printGrid(grid: string[][]): void {
    grid.forEach((line) => {
        console.log(line.join(''));
    });
}

export const FILE_PATH = './input.txt';
export const X = 0;
export const Y = 1;
export const deltaCoordinates: Map<number, number[]> = new Map([
    [1, [-1, 0]], // Up
    [2, [0, 1]], // Right
    [3, [1, 0]], // Down
    [4, [0, -1]], // Left
]);