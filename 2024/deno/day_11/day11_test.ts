import { readFile } from "./util.ts";
import { day11part1, computeStoneValue } from "./part1.ts";
import { assertEquals } from "jsr:@std/assert/equals";

Deno.test("part1-small file",  () => {
    assertEquals(day11part1(["125", "17"], 6), 22);

});

Deno.test("part1-large file", async () => {
    const fileName = "input.txt";
    const fileData = await readFile(fileName);

    // parse each string to number
    const seedStones: string[] = [];
    fileData.forEach((item) => {
        seedStones.push(...item.split(' '));
    });

    assertEquals(day11part1(seedStones, 25), 222461);

});


Deno.test("stone evaluator test", () => {
    assertEquals(computeStoneValue(24), {value: [2,4], single: false});
    assertEquals(computeStoneValue(2528), {value: [25,28], single: false});
    assertEquals(computeStoneValue(1001), {value: [10, 1], single: false});
    assertEquals(computeStoneValue(234023), {value: [234, 23], single: false});
    assertEquals(computeStoneValue(0), {value: 1, single: true});
});