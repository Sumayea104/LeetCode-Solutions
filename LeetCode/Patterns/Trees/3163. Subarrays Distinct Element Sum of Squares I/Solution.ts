function sumCounts(nums: number[]): number {
    let totalSum = 0;
    const n = nums.length;

    for (let i = 0; i < n; i++) {
        const distinctSet = new Set<number>();
        for (let j = i; j < n; j++) {
            distinctSet.add(nums[j]);
            const count = distinctSet.size;
            totalSum += count * count;
        }
    }

    return totalSum;
}