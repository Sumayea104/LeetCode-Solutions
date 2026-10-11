function myPow(x: number, n: number): number {
    if (n === 0) return 1;
    if (x === 0) return 0;
    if (x === 1) return 1;
    if (x === -1) return n % 2 === 0 ? 1 : -1;

    let power = Math.abs(n);
    let result = 1;
    let currentProduct = x;

    while (power > 0) {
        if (power % 2 === 1) {
            result *= currentProduct;
        }
        currentProduct *= currentProduct;
        power = Math.floor(power / 2);
    }

    return n < 0 ? 1 / result : result;
}