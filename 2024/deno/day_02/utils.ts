// Function to check if a report is safe
export function isReportSafe(levels: number[]): boolean {
    // Determine if the levels are strictly increasing or strictly decreasing
    const isIncreasing = levels.every((level, i, arr) =>
        i === 0 || (level > arr[i - 1] && level - arr[i - 1] >= 1 && level - arr[i - 1] <= 3)
    );
    const isDecreasing = levels.every((level, i, arr) =>
        i === 0 || (level < arr[i - 1] && arr[i - 1] - level >= 1 && arr[i - 1] - level <= 3)
    );

    return isIncreasing || isDecreasing;
}
