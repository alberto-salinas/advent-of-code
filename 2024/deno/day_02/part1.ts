import { isReportSafe } from './utils.ts';

async function countSafeReports(filePath: string): Promise<void> {
    try {
        // Read the file
        const fileData = await Deno.readTextFile(filePath);
        const lines = fileData.trim().split('\n');

        // Parse reports and check if each report is safe
        let safeCount = 0;
        for (const line of lines) {
            const levels = line.split(/\s+/).map(Number);
            if (isReportSafe(levels)) {
                safeCount++;
            }
        }

        console.log(`Number of safe reports: ${safeCount}`);
    } catch (error) {
        console.error('Error reading or processing the file:', error);
    }
}

// Specify the file path (modify this to the path of your file)
const filePath = './input.txt';
countSafeReports(filePath);
