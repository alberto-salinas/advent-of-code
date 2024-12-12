export async function readFile(filePath: string): Promise<string[]> {
    const fileData = await Deno.readTextFile(filePath);

    const lines = fileData.trim().split('\n')
    return lines;
}
