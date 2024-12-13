export interface Stone {
    value: number | number[];
    single: boolean;
}

export function day11part1(input: string[], blinks: number): number {
    const seedStones = input.map(Number);
    let finalStones = [...seedStones];

    while (blinks > 0) {
        const result: number[] = [];
        for ( let i = 0; i < finalStones.length; i++) {
            
            const stone = finalStones[i];
            const stoneValue = computeStoneValue(stone);
            if (stoneValue.single && typeof stoneValue.value === 'number') {
                result.push(stoneValue.value);
            } else {
                if (Array.isArray(stoneValue.value)) {
                    result.push(...stoneValue.value);
                }
            }
        }
        finalStones = [...result];
        blinks--
    }

    return finalStones.length
}

export function computeStoneValue(stone: number): Stone {

    if (stone === 0) {
        return {value: 1, single: true};
    }

    const digits = stone.toString().split('').map(Number);
    if (digits.length % 2 === 0) {
        // split digits in half and create an array, removing leading zeros
        const half = Math.floor(digits.length / 2);
        const left = digits.slice(0, half);
        const right = digits.slice(half);
        return {value: [parseInt(left.join('')), parseInt(right.join(''))], single: false};
    }

    return {value: stone * 2024, single: true};
}