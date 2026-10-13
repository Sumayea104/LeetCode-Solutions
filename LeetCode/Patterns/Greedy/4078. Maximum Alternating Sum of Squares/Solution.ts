function maxAlternatingSum(nums: number[]): number {

    const squared = nums.map(x => x * x).sort((a, b) => a - b);
    
    let score = 0;
    const n = squared.length;

    const mid = Math.floor(n / 2);
    
    for (let i = 0; i < n; i++) {
        if (i < mid) {
            score -= squared[i];
        } else {
            score += squared[i];
        }
    }
    
    return score;
}