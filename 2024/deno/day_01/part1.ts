function calculateTotalDistance(leftList: number[], rightList: number[]): number {
    leftList.sort((a, b) => a - b);
    rightList.sort((a, b) => a - b);


    let totalDistance = 0;


    for (let i = 0; i < leftList.length; i++) {
        totalDistance += Math.abs(leftList[i] - rightList[i]);
    }

    // Step 4: Return the total distance
    return totalDistance;
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

        // Calculate and display the total distance
        const totalDistance = calculateTotalDistance(leftList, rightList);
        console.log(`Total distance: ${totalDistance}`);
    } catch (error) {
        console.error('Error reading or processing the file:', error);
    }
}

const filePath = './input.txt';
processFile(filePath);

