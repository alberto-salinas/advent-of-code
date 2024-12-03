const re = new RegExp(`mul\\(([0-9]{1,3}),([0-9]{1,3})\\)`, "g");

async function findAllMultMatches(filePath: string): Promise<void> {
    try {
        // Read the file
        const fileData = await Deno.readTextFile(filePath);
        const lines = fileData.trim().split('\n');

        const parsed = [];
        for (const line of lines) {
            let match;
            while ((match = re.exec(line)) !== null) {
                parsed.push({ first: parseInt(match[1], 10), second: parseInt(match[2], 10) });
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
findAllMultMatches(filePath);