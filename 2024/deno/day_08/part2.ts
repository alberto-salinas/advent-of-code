
type Coordinate = [number, number];

function isValidCoordinate(coordinate: Coordinate, numRows: number, numCols: number): boolean {
    const [x, y] = coordinate;
    return x >= 0 && x < numRows && y >= 0 && y < numCols;
}


export function dayEightPartTwo(inputMap: string[]): number {
    const antennas: Map<string, Coordinate[]> = new Map();
    const numRows = inputMap.length;
    const numCols = inputMap[0].length;

    // Parse the map to find all antennas
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            const char = inputMap[row][col];
            if (char !== '.') {
                if (!antennas.has(char)) {
                    antennas.set(char, []);
                }
                antennas.get(char)!.push([row, col]);
            }
        }
    }

    const antinodes: Set<string> = new Set();

    // Compute antinodes for each frequency
    for (const [_frequency, positions] of antennas.entries()) {
        const n = positions.length;
        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                const [x1, y1] = positions[i];
                const [x2, y2] = positions[j];

                // add the two points
                antinodes.add(`${x1},${y1}`);
                antinodes.add(`${x2},${y2}`);

                // compute distance between antennas
                const run = Math.abs(x1 - x2);
                const rise = Math.abs(y1 - y2);
                const sign = Math.sign(x2 - x1) * Math.sign(y2 - y1);

                if (sign == -1) {
                    // rising case
                    if (y1 < y2) {
                        // rising right
                        const antinode1: Coordinate = [
                            x1 + run,
                            y1 - rise
                        ];

                        // rising left 
                        const antinode2: Coordinate = [
                            x2 - run,
                            y2 + rise
                        ];

                        while(isValidCoordinate(antinode1, numRows, numCols)) {
                            antinodes.add(`${antinode1[0]},${antinode1[1]}`);
                            antinode1[0] += run;
                            antinode1[1] -= rise;
                        }

                        while(isValidCoordinate(antinode2, numRows, numCols)) {
                            antinodes.add(`${antinode2[0]},${antinode2[1]}`);
                            antinode2[0] -= run;
                            antinode2[1] += rise;
                        }

                        // between the points
                        const antinode3: Coordinate = [
                            x2 + run,
                            y2 - rise
                        ];
                        while (isValidCoordinate(antinode3, numRows, numCols) && antinode3[0] !== x1 && antinode3[1] !== y1) {
                            antinodes.add(`${antinode3[0]},${antinode3[1]}`);
                            antinode3[0] += run;
                            antinode3[1] -= rise;
                        }

                    } else {
                        // rising left
                        const antinode1: Coordinate = [
                            x1 - run,
                            y1 + rise
                        ];
                        const antinode2: Coordinate = [
                            x2 + run,
                            y2 - rise
                        ];

                        while(isValidCoordinate(antinode1, numRows, numCols)) {
                            antinodes.add(`${antinode1[0]},${antinode1[1]}`);
                            antinode1[0] -= run;
                            antinode1[1] += rise;
                        }

                        while(isValidCoordinate(antinode2, numRows, numCols)) {
                            antinodes.add(`${antinode2[0]},${antinode2[1]}`);
                            antinode2[0] += run;
                            antinode2[1] -= rise;
                        }

                        const antinode3: Coordinate = [
                            x1 + run,
                            y1 - rise
                        ];
                        while (isValidCoordinate(antinode3, numRows, numCols) && antinode3[0] !== x2 && antinode3[1] !== y2) {
                            antinodes.add(`${antinode3[0]},${antinode3[1]}`);
                            antinode3[0] += run;
                            antinode3[1] -= rise;
                        }
                    }
                
                }

                else if (sign == 1) {
                    // running case
                    if (y1 < y2) {
                        const antinode1: Coordinate = [
                            x1 - run,
                            y1 - rise
                        ];
                        const antinode2: Coordinate = [
                            x2 + run,
                            y2 + rise
                        ];

                        while(isValidCoordinate(antinode1, numRows, numCols)) {
                            antinodes.add(`${antinode1[0]},${antinode1[1]}`);
                            antinode1[0] -= run;
                            antinode1[1] -= rise;
                        }

                        while(isValidCoordinate(antinode2, numRows, numCols)) {
                            antinodes.add(`${antinode2[0]},${antinode2[1]}`);
                            antinode2[0] += run;
                            antinode2[1] += rise;
                        }


                        // between the points

                        const antinode3: Coordinate = [
                            x1 + run,
                            y1 + rise
                        ];

                        while (isValidCoordinate(antinode3, numRows, numCols) && antinode3[0] !== x2 && antinode3[1] !== y2) {
                            antinodes.add(`${antinode3[0]},${antinode3[1]}`);
                            antinode3[0] += run;
                            antinode3[1] += rise;
                        }
                    } else {
                        const antinode1: Coordinate = [
                            x1 + run,
                            y1 + rise
                        ];
                        const antinode2: Coordinate = [
                            x2 - run,
                            y2 - rise
                        ];

                        while(isValidCoordinate(antinode1, numRows, numCols)) {
                            antinodes.add(`${antinode1[0]},${antinode1[1]}`);
                            antinode1[0] += run;
                            antinode1[1] += rise;
                        }

                        while(isValidCoordinate(antinode2, numRows, numCols)) {
                            antinodes.add(`${antinode2[0]},${antinode2[1]}`);
                            antinode2[0] -= run;
                            antinode2[1] -= rise;
                        }

                        const antinode3: Coordinate = [
                            x2 + run,
                            y2 + rise
                        ];

                        while (isValidCoordinate(antinode3, numRows, numCols) && antinode3[0] !== x1 && antinode3[1] !== y1) {
                            antinodes.add(`${antinode3[0]},${antinode3[1]}`);
                            antinode3[0] += run;
                            antinode3[1] += rise;
                        }
                    }
                }
            }
        }
    }

    return antinodes.size;
}