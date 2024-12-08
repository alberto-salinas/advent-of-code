import { assertEquals } from "jsr:@std/assert";

import { 
    generateOperatorCombinationsPartOne, 
    generateOperatorCombinationsPart2, 
    evaluateEquation, 

} from "./utils.ts"; 

Deno.test("generateOperatorCombinations", () => {
  const result = generateOperatorCombinationsPartOne(2);
  assertEquals(result, [["+", "+"], ["+", "*"], ["*", "+"], ["*", "*"]]);
});

Deno.test("generateOperatorCombinations", () => {
    const result = generateOperatorCombinationsPartOne(1);
    assertEquals(result, [["+"], ["*"]]);
});

Deno.test("generateOperatorCombinationsPart2", () => {
    const result = generateOperatorCombinationsPart2(2);
    console.log(result);
    assertEquals(result, [
        ["+", "+"], 
        ["+", "*"], 
        ["+", "@"], 
        ["*", "+"], 
        ["*", "*"], 
        ["*", "@"], 
        ["@", "+"], 
        ["@", "*"], 
        ["@", "@"],
    ]);
});

Deno.test("simple test", () => {
  const x = 1 + 2;
  assertEquals(x, 3);
});

Deno.test("evaluateEquation left -> right", () => {
    const result = evaluateEquation([1, 2, 3], ["+", "*"]);
    assertEquals(result, 9);
});

Deno.test("evaluateEquation left -> right", () => {
    const result = evaluateEquation([1, 2, 3], ["*", "+"]);
    assertEquals(result, 5);
});

Deno.test("evaluateEquation left -> right", () => {
    const result = evaluateEquation([6, 8, 6, 15], ["*", "@", "*"]);
    assertEquals(result, 7290);
});


import { delay } from "jsr:@std/async";

Deno.test("async test", async () => {
  const x = 1 + 2;
  await delay(100);
  assertEquals(x, 3);
});