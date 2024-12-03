const matchAllValidCommandsPattern = /mul\(\d+,\d+\)|do\(\)|don't\(\)/g;

async function findAllEnabledMultiplications(filePath: string): Promise<void> {
    try {
        const fileData = await Deno.readTextFile(filePath);
        const lines = fileData.trim().split('\n');
        const parsed = [];
        let isEnabled = true; 
        for (const line of lines) {

                const matches = line.match(matchAllValidCommandsPattern);
                if (matches) {
                    for (const match of matches) {
                        const matchMult2 = new RegExp(`mul\\(([0-9]{1,3}),([0-9]{1,3})\\)`, "g");
                    if (match === "do()") {
                        isEnabled = true; 
                    } else if (match === "don't()") {
                        isEnabled = false; 
                    } else if (matchMult2.test(match) && isEnabled) {
                        let multiMatch;
                        matchMult2.lastIndex = 0;
                        while ((multiMatch = matchMult2.exec(match)) !== null) {
                            parsed.push({ first: parseInt(multiMatch[1], 10), second: parseInt(multiMatch[2], 10) });
                        }
                    }
                    }
                }
        }

        let total = 0;
        parsed.forEach((item) => {
            total += item.first * item.second;
        });
        console.log(total);



    } catch (error) {
        console.error('Error reading or processing the file:', error);
    }
}

const filePath = './input.txt';
findAllEnabledMultiplications(filePath);