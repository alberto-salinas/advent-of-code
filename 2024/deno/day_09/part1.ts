export function dayNinePartOne(inputMap: string[]): number {
    const denseEncode = inputMap[0]
    const diskMap = []
    let idx = 0
    const freeSpaceIdxs = []
    for (let i = 0; i < denseEncode.length; i++) {
        const nSpace = parseInt(denseEncode[i])
        if (i % 2 === 0) {
            // add i to diskMap  by nSpace
            for (let j = 0; j < nSpace; j++) {
                diskMap.push(String(idx))
            }
            idx++
        } else {
            for (let j = 0; j < nSpace; j++) {
                diskMap.push(".")
                freeSpaceIdxs.push(diskMap.length - 1)
            }
        }
    }

    let left = 0
    let right = diskMap.length - 1
    while (left < right) {
        // print map
        if (diskMap[left] === "." && diskMap[right] !== ".") {
            diskMap[left] = diskMap[right]
            diskMap[right] = "."
            left++
            right--
            continue
        }

        if (diskMap[left] !== ".") {
            left++
        }
        if (diskMap[right] === ".") {
            right--
        }
    }

    
    let checkSum = 0
    for (let i = 0; i < diskMap.length; i++) {
        if (diskMap[i] === ".") {
            break
        }
        checkSum += parseInt(diskMap[i]) * i
    }

    return checkSum
}