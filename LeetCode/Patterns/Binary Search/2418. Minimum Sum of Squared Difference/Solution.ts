function minSumSquareDiff(nums1: number[], nums2: number[], k1: number, k2: number): number {
    const n = nums1.length;
    let totalOp = k1 + k2;

    let maxDiff = 0;
    const diffCounts = new Map<number, number>();
    
    for (let i = 0; i < n; i++) {
        const diff = Math.abs(nums1[i] - nums2[i]);
        if (diff > 0) {
            diffCounts.set(diff, (diffCounts.get(diff) || 0) + 1);
            maxDiff = Math.max(maxDiff, diff);
        }
    }
    if (maxDiff === 0) return 0;
    const count = new Array(maxDiff + 1).fill(0);
    for (const [d, freq] of diffCounts.entries()) {
        count[d] = freq;
    }

    for (let d = maxDiff; d > 0 && totalOp > 0; d--) {
        if (count[d] === 0) continue;

        const opsNeeded = count[d];
        const opsToUse = Math.min(totalOp, opsNeeded);
        
        count[d] -= opsToUse;
        count[d - 1] += opsToUse;
        totalOp -= opsToUse;
    }
  
    let totalSum = 0;
    for (let d = 1; d <= maxDiff; d++) {
        if (count[d] > 0) {
            totalSum += count[d] * d * d;
        }
    }
    
    return totalSum;
}