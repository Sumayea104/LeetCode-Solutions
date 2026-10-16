function sumCounts(nums: number[]): number {
    const MOD = 1_000_000_007;
    const n = nums.length;
    const sum = new Float64Array(4 * n);
    const lazy = new Float64Array(4 * n);
    const treeSum = new Float64Array(4 * n);

    function push(node: number, l: number, r: number) {
        if (lazy[node] !== 0) {
            const mid = Math.floor((l + r) / 2);
            apply(2 * node, l, mid, lazy[node]);
            apply(2 * node + 1, mid + 1, r, lazy[node]);
            lazy[node] = 0;
        }
    }

    function apply(node: number, l: number, r: number, val: number) {
        const len = r - l + 1;
        treeSum[node] = (treeSum[node] + 2 * val * sum[node] + val * val * len) % MOD;
        sum[node] = (sum[node] + val * len) % MOD;
        lazy[node] = (lazy[node] + val) % MOD;
    }

    function update(node: number, l: number, r: number, ql: number, qr: number, val: number) {
        if (ql > r || qr < l) return;
        if (ql <= l && r <= qr) {
            apply(node, l, r, val);
            return;
        }
        push(node, l, r);
        const mid = Math.floor((l + r) / 2);
        update(2 * node, l, mid, ql, qr, val);
        update(2 * node + 1, mid + 1, r, ql, qr, val);
        sum[node] = (sum[2 * node] + sum[2 * node + 1]) % MOD;
        treeSum[node] = (treeSum[2 * node] + treeSum[2 * node + 1]) % MOD;
    }

    const lastOccur = new Map<number, number>();
    let totalSum = 0;

    for (let j = 0; j < n; j++) {
        const prev = lastOccur.has(nums[j]) ? lastOccur.get(nums[j])! : -1;
        lastOccur.set(nums[j], j);
        update(1, 0, n - 1, prev + 1, j, 1);
        totalSum = (totalSum + treeSum[1]) % MOD;
    }

    return (totalSum + MOD) % MOD;
}