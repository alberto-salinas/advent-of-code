export function isValid(expression: string[], rules: Map<string, string[]>): boolean {
    const seen = new Set();

    for (const happenFirst of expression) {
        const happenSecondElements = rules.get(happenFirst)

        if (happenSecondElements === undefined) {
            seen.add(happenFirst);
            continue
        }
        for (const happenSecond of happenSecondElements) {
            if (seen.has(happenSecond)) {
                return false;
            }
        }

        seen.add(happenFirst);
    }

    return true;
}

export function findMedian(arr: string[]): number {
    const mid = Math.floor(arr.length / 2);
    return arr.length % 2 !== 0 ? parseInt(arr[mid]) : (parseInt(arr[mid - 1]) + parseInt(arr[mid])) / 2;
}