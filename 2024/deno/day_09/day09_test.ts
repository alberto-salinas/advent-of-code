import {dayNinePartOne} from "./part1.ts"
import {dayNinePartTwo} from "./part2.ts"
import { assertEquals } from "jsr:@std/assert";
import { readFile } from "./utils.ts";


Deno.test("part1-small file", async () => {
    const fileName = "test_output.txt";
    const content = `
2333133121414131402
    `;
    await Deno.writeTextFile(fileName, content);
    const fileData = await readFile(fileName);
    assertEquals(dayNinePartOne(fileData), 1928);

    await Deno.remove(fileName);
});

Deno.test("part1-big file", async () => {
    const fileName = "input.txt";
    const rawLines = await readFile(fileName);
    assertEquals(dayNinePartOne(rawLines), 6323641412437);
});

Deno.test("part2-small file WIP", async () => {
    const fileName = "test_output.txt";
    const content = `
2333133121414131402
    `;
    await Deno.writeTextFile(fileName, content);
    const fileData = await readFile(fileName);
    assertEquals(dayNinePartTwo(fileData), 2858);

    await Deno.remove(fileName);
});