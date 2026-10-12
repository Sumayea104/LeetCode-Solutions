function maxSum(nums: number[], k: number): number {
    const MOD = 1000000007;
    const bitCounts = new Array(31).fill(0);
    for (const num of nums) {
        for (let i = 0; i < 31; i++) {
            if ((num & (1 << i)) !== 0) {
                bitCounts[i]++;
            }
        }
    }
    const constructed: number[] = new Array(k).fill(0);
    for (let i = 0; i < k; i++) {
        let currentNum = 0;
        for (let bit = 0; bit < 31; bit++) {
            if (bitCounts[bit] > 0) {
                currentNum |= (1 << bit);
                bitCounts[bit]--;
            }
        }
        constructed[i] = currentNum;
    }
    let totalSum = 0n;
    for (const num of constructed) {
        const bigNum = BigInt(num);
        totalSum = (totalSum + (bigNum * bigNum)) % BigInt(MOD);
    }

    return Number(totalSum);
}