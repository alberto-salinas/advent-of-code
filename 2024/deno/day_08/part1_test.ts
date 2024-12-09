import { assertEquals } from "jsr:@std/assert";
import { readFile } from "./utils.ts";
import { dayEightPartOne } from "./part1.ts";


Deno.test("small-file", async () => {
  const fileName = "test_output.txt";
  const content = `
............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............
`;
  
  // Write to the file
  await Deno.writeTextFile(fileName, content);

  // Read the file to verify content
  const fileContent = await readFile(fileName);

  const expectedContent = content.trim().split('\n');
  assertEquals(fileContent, expectedContent);

  const result = dayEightPartOne(fileContent);
  assertEquals(result, 14);


  // Clean up (delete the file after test)
  await Deno.remove(fileName);
});

Deno.test("big-file", async () => {
    const fileName = "input.txt";
  
    const rawLines = await readFile(fileName);
    const result = dayEightPartOne(rawLines);
    assertEquals(result, 341);
});
