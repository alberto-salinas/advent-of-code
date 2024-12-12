export async function readFile(filePath: string): Promise<string[]> {
    const fileData = await Deno.readTextFile(filePath);

    const lines = fileData.trim().split('\n')
    return lines;
}

export const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ] as const;