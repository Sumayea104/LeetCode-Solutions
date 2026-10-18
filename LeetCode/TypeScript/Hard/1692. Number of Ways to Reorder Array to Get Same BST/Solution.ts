function numOfWays(nums: number[]): number {
    const MOD = 1000000007n;
    const n = nums.length;

    const table: bigint[][] = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0n));
    for (let i = 0; i <= n; i++) {
        table[i][0] = 1n;
        table[i][i] = 1n;
        for (let j = 1; j < i; j++) {
            table[i][j] = (table[i - 1][j - 1] + table[i - 1][j]) % MOD;
        }
    }

    function getWays(arr: number[]): bigint {
        if (arr.length <= 2) return 1n;

        const root = arr[0];
        const left: number[] = [];
        const right: number[] = [];

        for (let i = 1; i < arr.length; i++) {
            if (arr[i] < root) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }

        const leftWays = getWays(left);
        const rightWays = getWays(right);

        const L = BigInt(left.length);
        const R = BigInt(right.length);
    
        const ways = (table[Number(L + R)][Number(L)] * leftWays) % MOD;
        return (ways * rightWays) % MOD;
    }
    const totalWays = (getWays(nums) - 1n + MOD) % MOD;
    return Number(totalWays);
}