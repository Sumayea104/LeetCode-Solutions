function minSwaps(nums: number[]): number {
    const n = nums.length;
    const getDigitSum = (num: number): number => {
        let sum = 0;
        while (num > 0) {
            sum += num % 10;
            num = Math.floor(num / 10);
        }
        return sum;
    };

    const items = nums.map((val, idx) => ({
        val,
        idx,
        digitSum: getDigitSum(val)
    }));

    items.sort((a, b) => {
        if (a.digitSum !== b.digitSum) {
            return a.digitSum - b.digitSum;
        }
        return a.val - b.val;
    });

    const visited = new Array(n).fill(false);
    let cycles = 0;

    for (let i = 0; i < n; i++) {
        if (visited[i] || items[i].idx === i) {
            continue;
        }

        let cycleSize = 0;
        let curr = i;
        
        while (!visited[curr]) {
            visited[curr] = true;
            curr = items[curr].idx;
            cycleSize++;
        }

        if (cycleSize > 1) {
            cycles += (cycleSize - 1);
        }
    }

    return cycles;
}