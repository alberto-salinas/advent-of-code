export function dayNinePartTwo(inputMap: string[]): number {
    const denseEncode = inputMap[0]
    const diskMap = []
    let idx = 0
    const idxByOffset = []
    const idxByAmount = []
    const freeSpaceByAmount =[]
    for (let i = 0; i < denseEncode.length; i++) {
        const nSpace = parseInt(denseEncode[i])
        if (i % 2 === 0) {
            // add i to diskMap  by nSpace
            idxByOffset.push([idx, diskMap.length])
            idxByAmount.push([idx, nSpace])
            for (let j = 0; j < nSpace; j++) {
                diskMap.push(String(idx))
            }
            idx++
        } else {
            freeSpaceByAmount.push([diskMap.length, nSpace])    
            for (let j = 0; j < nSpace; j++) {
                diskMap.push(".")
            }
        }
    }


    for (const [freeSlotId, freeSpaceAmount] of idxByOffset) {
        console.log(`[GOLGO] ${freeSlotId} ${freeSpaceAmount}`)
    }

    for (const [freeSlotId, freeSpaceAmount] of freeSpaceByAmount) {
        console.log(`[HELL] ${freeSlotId} ${freeSpaceAmount}`)
    }

    for (let i = 0; i < idxByOffset.length; i++) {
        // find a pair in freeSpaceByAmount that matches the second element of idxByOffset
        const [memoryIdx, totalMemory] = idxByAmount[idxByOffset.length - 1 - i]

        let foundSwap = -1
        freeSpaceByAmount.forEach(([freeSlotId, freeSpaceAmount], idx) => {
            if (foundSwap !== -1) {
                return
            }
            if (freeSpaceAmount >= totalMemory) {
                console.log(`[CHET] ${memoryIdx} ${totalMemory} ${freeSpaceAmount} ${freeSlotId} ${idx}`)
                foundSwap = idx
                return
            }
        })

        if (foundSwap !== -1) {
            const [freeSlotId, freeSpaceAmount] = freeSpaceByAmount[foundSwap]
            let swapTotal = totalMemory
            let replaceIdx = freeSlotId
            let replaceMemIdx = memoryIdx
            while (swapTotal > 0) {
                console.log("aue pedo")
                diskMap[replaceIdx] = String(memoryIdx)
                diskMap[replaceMemIdx] = "."
                replaceIdx++
                swapTotal--
                replaceMemIdx--
            }
            freeSpaceByAmount.splice(foundSwap, 1)
        }
    }

    console.log(diskMap)

    // let left = 0
    // let right = diskMap.length - 1
    // while (left < right) {
    //     // print map
    //     if (diskMap[left] === "." && diskMap[right] !== ".") {
    //         diskMap[left] = diskMap[right]
    //         diskMap[right] = "."
    //         left++
    //         right--
    //         continue
    //     }

    //     if (diskMap[left] !== ".") {
    //         left++
    //     }
    //     if (diskMap[right] === ".") {
    //         right--
    //     }
    // }
    
    let checkSum = 0
    for (let i = 0; i < diskMap.length; i++) {
        if (diskMap[i] === ".") {
            break
        }
        checkSum += parseInt(diskMap[i]) * i
    }

    return checkSum
}