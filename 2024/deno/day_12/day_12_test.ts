import { assertEquals } from "jsr:@std/assert";
import { findClustersWithPerimetersAndArea, readFile } from "./utils.ts";

Deno.test("part1-small file",  async () => {
    const rawGrid = `
RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE
`
    Deno.writeTextFileSync("small_input.txt", rawGrid);
    const fileData = await readFile("small_input.txt");
    const grid = fileData.map(row => row.split(""));

    const cost = findClustersWithPerimetersAndArea(grid);
    assertEquals(cost, 1930);

    Deno.removeSync("small_input.txt");
});

Deno.test("part1-large file",  async () => {
    const fileData = await readFile("input.txt");

    const grid = fileData.map(row => row.split(""));
    const cost = findClustersWithPerimetersAndArea(grid);
    assertEquals(cost, 1304764);
});