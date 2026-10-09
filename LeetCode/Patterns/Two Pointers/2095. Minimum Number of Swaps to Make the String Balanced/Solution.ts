function minSwaps(s: string): number {
    let maxImbalance = 0;
    let currentImbalance = 0;

    for (const ch of s) {
        if (ch === '[') {
            currentImbalance--;
        } else {
            currentImbalance++;
        }

        maxImbalance = Math.max(maxImbalance, currentImbalance);
    }
    return Math.floor((maxImbalance + 1) / 2);
}