function maxSumOfSquares(num: number, sum: number): string {
    if (sum < 1 || sum > num * 9) {
        return "";
    }
    const digits: number[] = new Array(num).fill(0);
    let remainingSum = sum;
    for (let i = 0; i < num; i++) {
        const take = Math.min(9, remainingSum);
        digits[i] = take;
        remainingSum -= take;
    }
    digits.sort((a, b) => b - a);
    return digits.join('');
}