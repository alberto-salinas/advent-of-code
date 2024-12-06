import { isValid, findMedian } from "./utils.ts";

const FILE_PATH = './input.txt';

async function day_four_part_two_solution(filePath: string): Promise<void> {
    const fileData = await Deno.readTextFile(filePath);

    const lines = fileData.trim().split('\n')
    let separatorIdx: number = -1; 
    lines.find((line) => {
        if (line === "") {
            separatorIdx = lines.indexOf(line);
        }
    })

    // store rules in a map
    const rules = new Map();
    for (let i = 0; i < separatorIdx; i++) {
        const line = lines[i];
        const [key, value] = line.split("|");
        if (rules.has(key)) {
            const values = rules.get(key);
            values.push(value);
            rules.set(key, values);
        } else {
            rules.set(key, [value]);
        }
    }

    function reorderPages(pages: string[]): string[] {
        return pages.sort((a, b) => {
            if (rules.has(a) && rules.get(a)?.includes(b)) {
                return -1;
            }
            if (rules.has(b) && rules.get(b)?.includes(a)) {
                return 1;
            }
            return 0;
        });
    }

    // store expressions in an array
    const expressions = [];
    for (let i = separatorIdx + 1; i < lines.length; i++) {
        expressions.push(lines[i].split(","));
    }

    let sum = 0;
    for (let i = 0; i < expressions.length; i++) {
        const expression = expressions[i];
        const result = isValid(expression, rules);
        if (!result) {
            const reorderedPages = reorderPages(expression);
            sum += findMedian(reorderedPages);

        }
    }
    console.log(sum);
}

day_four_part_two_solution(FILE_PATH)