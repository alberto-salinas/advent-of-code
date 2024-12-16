import { assertEquals } from "jsr:@std/assert/equals";
import { 
    quadrantLocation,
    Dimension, 
    moveRobot, 
    getRobotCellKey, 
    moveRobotNTimes, 
    rawLineToRobot,
    readFile,
    part1Solution
} from "./utils.ts";

Deno.test("quadran location",  async () => {

    const dim: Dimension = { width: 11, height: 7 };
    assertEquals(quadrantLocation("0,0", dim), 0);
    assertEquals(quadrantLocation("5,0", dim), -1);
    assertEquals(quadrantLocation("10,0", dim), 1);
    assertEquals(quadrantLocation("0,3", dim), -1);
    assertEquals(quadrantLocation("5,3", dim), -1);
    assertEquals(quadrantLocation("10,3", dim), -1);
    assertEquals(quadrantLocation("0,6", dim), 2);
    assertEquals(quadrantLocation("5,6", dim), -1);
    assertEquals(quadrantLocation("10,6", dim), 3);
    assertEquals(quadrantLocation("1,4", dim), 2);
});

Deno.test("move robot",  () => {

    const dim: Dimension = { width: 11, height: 7 };
    const robot = { vx: 2, vy: -3, px: 2, py: 4 };

    assertEquals(moveRobot(robot, dim), "4,1");
    assertEquals(moveRobot(robot, dim), "6,5");


    moveRobotNTimes(robot, dim, 3);

    assertEquals(getRobotCellKey(robot), "1,3");

});

Deno.test("parse line",  () => {
    const robot = rawLineToRobot("p=0,4 v=3,-3");
    assertEquals(robot.px, 0);
    assertEquals(robot.py, 4);
    assertEquals(robot.vx, 3);
    assertEquals(robot.vy, -3);
});

Deno.test("small input", async () => {
    const fileName = "small_input.txt";
    const rawInput = `
p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3
`;

    Deno.writeTextFileSync(fileName, rawInput);
    const fileData = await readFile("small_input.txt");
    const result = part1Solution(fileData, { width: 11, height: 7 }, 100);
    assertEquals(result, 12);
});

Deno.test("large input", async () => {
    const fileData = await readFile("input.txt");
    const result = part1Solution(fileData, { width: 101, height: 103 }, 100);
    assertEquals(result, 229069152);
});