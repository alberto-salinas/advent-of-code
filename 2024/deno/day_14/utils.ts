export async function readFile(filePath: string): Promise<string[]> {
    const fileData = await Deno.readTextFile(filePath);
    const lines = fileData.trim().split('\n')
    return lines;
}

export type CellKey = string;

export interface Dimension {
    width: number;
    height: number;
}

export interface Robot {
    vx: number,
    vy: number,
    px: number,
    py: number,
}

export type Grid = Map<CellKey, number>;

export function part1Solution(lines: string[], dim: Dimension, numberOfMoves: number): number {
    const robots: Robot[] = lines.map(rawLineToRobot);

    const grid = new Map<CellKey, number>();

    for (let i = 0; i < robots.length; i++) {
        const curRobot = robots[i];
        moveRobotNTimes(curRobot, dim, numberOfMoves);

        if (grid.has(getRobotCellKey(curRobot))) {
            grid.set(getRobotCellKey(curRobot), grid.get(getRobotCellKey(curRobot))! + 1);
        } else {
            grid.set(getRobotCellKey(curRobot), 1);
        }
    }

    const quadrantRobotCount = new Map<number, number>();

    for (const [key, value] of grid) {
        const quadrant = quadrantLocation(key, dim);

        if (quadrantRobotCount.has(quadrant)) {
            quadrantRobotCount.set(quadrant, quadrantRobotCount.get(quadrant)! + value);
        } else {
            quadrantRobotCount.set(quadrant, value);
        }
    }

    let result = 1
    for (const [key, value] of quadrantRobotCount) {
        if (key !== -1) {
            result = result * value;
        }
    }

    return result;
}

export function rawLineToRobot(line: string): Robot {

    const robot = { vx: 0, vy: 0, px: 0, py: 0 };

    const parts = line.split(" ");

    const loc = parts[0].split("=");
    const [px, py] = loc[1].split(",").map(Number);

    robot.px = px;
    robot.py = py;

    const vel = parts[1].split("=");
    const [vx, vy] = vel[1].split(",").map(Number);

    robot.vx = vx;
    robot.vy = vy;
    return robot
}

export function cellKey(x: number, y: number): CellKey {
    return `${x},${y}`;
}

function pythonMod(a: number, b: number): number {
    return ((a % b) + b) % b;
}

export function moveRobot(robot: Robot, dim: Dimension): CellKey {
    robot.px = pythonMod(robot.px + robot.vx, dim.width);
    robot.py = pythonMod(robot.py + robot.vy, dim.height);

    return getRobotCellKey(robot);
}

export function getRobotCellKey(robot: Robot): CellKey {
    return `${robot.px},${robot.py}`;
}

export function moveRobotNTimes(robot: Robot, dim: Dimension, n: number): CellKey {
    for (let i = 0; i < n; i++) {
        moveRobot(robot, dim);
    }

    return getRobotCellKey(robot);
}

export function quadrantLocation(cell: CellKey, dim: Dimension): number {
    const [x, y] = cell.split(',').map(Number);
    
    const hDeadZone = Math.floor(dim.height / 2);
    const wDeadZone = Math.floor(dim.width / 2);

    if (x < wDeadZone && y < hDeadZone) return 0;

    if (x > wDeadZone && y < hDeadZone) return 1;

    if (x < wDeadZone && y > hDeadZone) return 2;

    if (x > wDeadZone && y > hDeadZone) return 3;

    // lies in center lines
    return -1
}

