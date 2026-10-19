function targetIndices(nums: number[], target: number): number[] {
    let smallerCount = 0;
    let targetCount = 0;
    for (const num of nums) {
        if (num < target) {
            smallerCount++;
        } else if (num === target) {
            targetCount++;
        }
    }
    const result: number[] = [];
    for (let i = 0; i < targetCount; i++) {
        result.push(smallerCount + i);
    }

    return result;
}