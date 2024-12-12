import { assertEquals } from "jsr:@std/assert";
import { day10Part1 } from "./part1.ts";
import { readFile } from "./utils.ts";
import { day10Part2 } from "./part2.ts";

Deno.test("part1-small-file", async () => {
    const fileName = "test_output.txt";
    const content = `
0123
1234
8765
9876
  `;
    
    // Write to the file
    await Deno.writeTextFile(fileName, content);
  
    // Read the file to verify content
    const fileContent = await readFile(fileName);

    // crete matrix from file content
    const matrix = fileContent.map(row => row.split(''));
    // convert matrix to array of numbers
    const numbers = matrix.map(row => row.map(Number));
  
    const result = day10Part1(numbers);
    assertEquals(result, 1);
  
  
    // Clean up (delete the file after test)
    await Deno.remove(fileName);
  });

Deno.test("part1-medium-file", async () => {
    const fileName = "test_output.txt";

    const content = `
89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732
`
     // Write to the file
     await Deno.writeTextFile(fileName, content); 
    const rawLines = await readFile(fileName);
    const matrix = rawLines.map(row => row.split(''));
    // convert matrix to array of numbers
    const numbers = matrix.map(row => row.map(Number));
    const result = day10Part1(numbers);
    assertEquals(result, 36);

    await Deno.remove(fileName);
  });

Deno.test("part1-big-file", async () => {
    const fileName = "input.txt";
  
    const rawLines = await readFile(fileName);
    const matrix = rawLines.map(row => row.split(''));

    // convert matrix to array of numbers
    const numbers = matrix.map(row => row.map(Number));
    const result = day10Part1(numbers);
    assertEquals(result, 841);
  });


Deno.test("part2-small-file", async () => {
    const fileName = "test_output.txt";
    const content = `
89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732
`
        // Write to the file
        await Deno.writeTextFile(fileName, content); 
        const rawLines = await readFile(fileName);
        const matrix = rawLines.map(row => row.split(''));
        // convert matrix to array of numbers
        const numbers = matrix.map(row => row.map(Number));
        const result = day10Part2(numbers);
        assertEquals(result, 81);

        await Deno.remove(fileName);
    });

Deno.test("part2-big-file", async () => {

    const fileName = "input.txt";
    const rawLines = await readFile(fileName);
    const matrix = rawLines.map(row => row.split(''));

    // convert matrix to array of numbers
    const numbers = matrix.map(row => row.map(Number));
    const result = day10Part2(numbers);
    assertEquals(result, 1875);
  } );