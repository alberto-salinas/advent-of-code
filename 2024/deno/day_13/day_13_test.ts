import { readFile, part1Solution } from "./utils.ts";
import { assertEquals } from "jsr:@std/assert";

Deno.test("small input", async () => {
    const rawInput = `
Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279
`;
    Deno.writeTextFileSync("small_input.txt", rawInput);
    const fileData = await readFile("small_input.txt");

    const tokens = part1Solution(fileData);
    assertEquals(tokens, 480);
    Deno.removeSync("small_input.txt");
});

Deno.test("large input", async () => {
    const fileData = await readFile("input.txt");

    const tokens = part1Solution(fileData);
    assertEquals(tokens, 32041);
});