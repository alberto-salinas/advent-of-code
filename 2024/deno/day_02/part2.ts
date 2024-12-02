import { isReportSafe } from './utils.ts';

function isReportSafeWithDampener(levels: number[]): boolean {
    // If the report is already safe, return true
    if (isReportSafe(levels)) {
        return true;
    }

    // Check each possible report after removing one level
    for (let i = 0; i < levels.length; i++) {
        const newLevels = levels.slice(0, i).concat(levels.slice(i + 1));
        if (isReportSafe(newLevels)) {
            return true;
        }
    }

    // If no single removal makes the report safe, return false
    return false;
}

// Function to process the data and count safe reports
async function countSafeReportsWithDampener(filePath: string): Promise<void> {
    try {
        // Read the file
        const fileData = await Deno.readTextFile(filePath);
        const lines = fileData.trim().split('\n');

        // Parse reports and check if each report is safe
        let safeCount = 0;
        for (const line of lines) {
            const levels = line.split(/\s+/).map(Number);
            if (isReportSafeWithDampener(levels)) {
                safeCount++;
            }
        }

        console.log(`Number of safe reports with Problem Dampener: ${safeCount}`);
    } catch (error) {
        console.error('Error reading or processing the file:', error);
    }
}

// Specify the file path (modify this to the path of your file)
const filePath = './input.txt';
countSafeReportsWithDampener(filePath);
