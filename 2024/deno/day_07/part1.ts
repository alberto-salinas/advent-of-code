import { readFile, FILE_PATH, generateOperatorCombinationsPartOne, evaluateEquation} from "./utils.ts";

interface Equation {
    result: number;
    vector: number[];
}

async function daySevenPartOne(filePath: string) {
    const lines = await readFile(filePath);

    const equations: Equation[] = [];
    let count = 0;
    lines.forEach((line) => {
        const [result, vector] = line.split(": ");
        const vectorArray = vector.split(" ").map((v) => parseInt(v));
        equations.push({ result: parseInt(result), vector: vectorArray });
    });

    equations.forEach((equation) => {
        const operatorCombinations = generateOperatorCombinationsPartOne(equation.vector.length-1)
        for (const ops of operatorCombinations) {

            const result = evaluateEquation(equation.vector, ops);
            if (result === equation.result) {
                count += equation.result;
                break
            }
        }
    });
    console.log(count);
}

daySevenPartOne(FILE_PATH);