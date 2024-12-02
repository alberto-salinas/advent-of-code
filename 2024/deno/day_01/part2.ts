function calculateSimilarityScore(leftList: number[], rightList: number[]): number {
    // Create a frequency map for the right list
    const rightFrequencyMap = new Map<number, number>();
    for (const num of rightList) {
        rightFrequencyMap.set(num, (rightFrequencyMap.get(num) || 0) + 1);
    }

    // Calculate the similarity score
    let similarityScore = 0;
    for (const num of leftList) {
        const frequency = rightFrequencyMap.get(num) || 0;
        similarityScore += num * frequency;
    }

    return similarityScore;
}

async function processFile(filePath: string): Promise<void> {
    try {
        const fileData = await Deno.readTextFile(filePath);
        const lines = fileData.trim().split('\n');

        // Parse the input into two lists
        const leftList: number[] = [];
        const rightList: number[] = [];

        for (const line of lines) {
            const [left, right] = line.split(/\s+/).map(Number);
            leftList.push(left);
            rightList.push(right);
        }

        const similarityScore = calculateSimilarityScore(leftList, rightList);
        console.log(`Similarity score: ${similarityScore}`);
    } catch (error) {
        console.error('Error reading or processing the file:', error);
    }
}

const filePath = './input.txt';
processFile(filePath);
