export async function readFile(filePath: string): Promise<string[]> {
    const fileData = await Deno.readTextFile(filePath);

    const lines = fileData.trim().split('\n')
    return lines;
}

// Helper function to generate all combinations of operators
export function generateOperatorCombinationsPartOne(length: number): string[][] {
    if (length === 0) return [[]];
    const smallerCombinations = generateOperatorCombinationsPartOne(length - 1);
    return smallerCombinations.flatMap((comb) => [
      [...comb, "+"],
      [...comb, "*"],
    ]);
}

export function generateOperatorCombinationsPart2(length: number): string[][] {
    if (length === 0) return [[]];
    const smallerCombinations = generateOperatorCombinationsPart2(length - 1);
    return smallerCombinations.flatMap((comb) => [
      [...comb, "+"],
      [...comb, "*"],
      [...comb, "@"],
    ]);
}

export function evaluateEquation(numbers: number[], operators: string[]): number {
  if (numbers.length === 0) return 0; // Handle empty input case
  if (numbers.length !== operators.length + 1) {
      throw new Error("Invalid input: Operators should be one less than numbers.");
  }

  let result = numbers[0]; // Start with the first number

  for (let i = 1; i < numbers.length; i++) {
      const operator = operators[i - 1];
      const nextNumber = numbers[i];

      switch (operator) {
          case "+":
              result += nextNumber;
              break;
          case "*":
              result *= nextNumber;
              break;
          case "@":
              result = parseInt(String(result) + String(nextNumber));
              break;
          default:
              throw new Error(`Unsupported operator: ${operator}`);
      }
  }

  return result;
}

export const FILE_PATH = './input.txt';