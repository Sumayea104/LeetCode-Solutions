function isPerfectSquare(num: number): boolean {
    if (num < 1) return false;
    if (num === 1) return true;

    let left = 1;
    let right = Math.floor(num / 2);

    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        const squared = mid * mid;

        if (squared === num) {
            return true;
        } else if (squared < num) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return false;
}