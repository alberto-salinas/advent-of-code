export async function readFile(filePath: string): Promise<string[]> {
    const fileData = await Deno.readTextFile(filePath);

    const lines = fileData.trim().split('\n')
    return lines;
}

export interface ClawGame {
    buttonA : { x: number, y: number },
    buttonB : { x: number, y: number },
    prize : { x: number, y: number },
}

export interface Result {
    buttonAPresses: number,
    buttonBPresses: number,
    eqType: "unique" | "infinite" | "none",
}

export function NewEmptyResult(): Result {
    return {
        buttonAPresses: 0,
        buttonBPresses: 0,
        eqType: "none",
    };
}

export function NewEmptyClawGame(): ClawGame {
    return {
        buttonA: { x: 0, y: 0 },
        buttonB: { x: 0, y: 0 },
        prize: { x: 0, y: 0 }
    };
}

export function rawTextToClawGames(lines: string[]): ClawGame[] {
    const games: ClawGame[] = [];

    let lineIdx = 0;
    games.push(NewEmptyClawGame());
    let gameIdx = 0;
    while( lineIdx < lines.length) {
        if (lines[lineIdx] === "") {
            games.push(NewEmptyClawGame());
            gameIdx++;
            lineIdx++;
            continue;
        }

        const parts = lines[lineIdx].split(" ");
        if (lines[lineIdx].startsWith("Button A")) {
            games[gameIdx].buttonA.x = parseInt(parts[2].split("+")[1].slice(0, -1));
            games[gameIdx].buttonA.y = parseInt(parts[3].split("+")[1]);
        }
        else if (lines[lineIdx].startsWith("Button B")) {
            games[gameIdx].buttonB.x = parseInt(parts[2].split("+")[1].slice(0, -1));
            games[gameIdx].buttonB.y = parseInt(parts[3].split("+")[1]);
        }
        else if (lines[lineIdx].startsWith("Prize")) {
            games[gameIdx].prize.x = parseInt(parts[1].split("=")[1].slice(0, -1));
            games[gameIdx].prize.y = parseInt(parts[2].split("=")[1]);
        }
        lineIdx++;
    }
    return games;
}

export function solveAllEqSolutions(games: ClawGame[]): Result[] {
    const results: Result[] = [];

    for (const game of games) {
        results.push(findEqSolution(game));
    }

    return results;
}

export function findEqSolution(game: ClawGame) : Result {
    const result = NewEmptyResult();

    const determinant = game.buttonA.x * game.buttonB.y - game.buttonB.x * game.buttonA.y;

    if (determinant === 0) {
        
        if (game.prize.x * game.buttonA.y === game.prize.y * game.buttonA.x) {
            result.eqType = "infinite";
            return result;
        } else {
            result.eqType = "none";
            return result;
        }
    }

    const x = (game.prize.x * game.buttonB.y - game.prize.y * game.buttonB.x) / determinant;
    const y = (game.buttonA.x * game.prize.y - game.buttonA.y * game.prize.x) / determinant;

    if (x < 0 || y < 0) {
        result.eqType = "none";
        return result;
    }
    if (x % 1 !== 0 || y % 1 !== 0) {
        result.eqType = "none";
        return result;
    }

    result.buttonAPresses = x;
    result.buttonBPresses = y;
    result.eqType = "unique";

    return result
}

export function part1Solution(lines: string[]): number {
    const games = rawTextToClawGames(lines);
    const results = solveAllEqSolutions(games);

    let tokens = 0;
    for (const sol of results) {
        if (sol.eqType === "unique") {
            tokens += sol.buttonAPresses * 3 + sol.buttonBPresses;
        }
    }

    return tokens;
}

