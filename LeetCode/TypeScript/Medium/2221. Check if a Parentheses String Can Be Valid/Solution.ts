function canBeValid(s: string, locked: string): boolean {
    const n = s.length;

    if (n % 2 !== 0) {
        return false;
    }

    let openCount = 0;
    for (let i = 0; i < n; i++) {
        if (locked[i] === '0' || s[i] === '(') {
            openCount++;
        } else {
            openCount--;
        }
        if (openCount < 0) {
            return false;
        }
    }

    let closeCount = 0;
    for (let i = n - 1; i >= 0; i--) {
        if (locked[i] === '0' || s[i] === ')') {
            closeCount++;
        } else {
            closeCount--;
        }
        if (closeCount < 0) {
            return false;
        }
    }

    return true;
};