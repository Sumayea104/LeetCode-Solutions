function minOperations(s: string): number {
    const n = s.length;

    let isSorted = true;
    for (let i = 0; i < n - 1; i++) {
        if (s[i] > s[i + 1]) {
            isSorted = false;
            break;
        }
    }
    if (isSorted) return 0;

    if (n === 2) return -1;

    let minChar = s[0], maxChar = s[0];
    for (let i = 1; i < n; i++) {
        if (s[i] < minChar) minChar = s[i];
        if (s[i] > maxChar) maxChar = s[i];
    }

    const minAtStart = (s[0] === minChar);
    const maxAtEnd = (s[n - 1] === maxChar);

    if (minAtStart || maxAtEnd) {
        return 1;
    }

    const uniqueMax = s.split('').filter(c => c === maxChar).length === 1;
    const uniqueMin = s.split('').filter(c => c === minChar).length === 1;

    if (s[0] === maxChar && uniqueMax && s[n - 1] === minChar && uniqueMin) {
        return 3;
    }

    return 2;
}