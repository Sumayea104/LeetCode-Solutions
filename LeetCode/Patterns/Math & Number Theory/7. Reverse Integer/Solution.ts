function reverse(x: number): number {
    const isNegative = x < 0;
    let rev = 0n;
    let n = BigInt(Math.abs(x));
    while (n > 0n) {
        rev = rev * 10n + (n % 10n);
        n /= 10n;
    }
    const INT_MAX = 2147483647n;
    const INT_MIN = -2147483648n;
    if (isNegative) {
        rev = -rev;
    }
    if (rev > INT_MAX || rev < INT_MIN) {
        return 0;
    }
    return Number(rev);
}