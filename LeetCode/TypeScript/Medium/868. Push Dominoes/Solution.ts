function pushDominoes(dominoes: string): string {
    const d = 'L' + dominoes + 'R';
    const res: string[] = [];
    let i = 0;
    for (let j = 1; j < d.length; j++) {
        if (d[j] === '.') continue;
        if (i > 0) res.push(d[i]);
        const middleCount = j - i - 1;
        if (d[i] === d[j]) {
            res.push(d[i].repeat(middleCount));
        } else if (d[i] === 'L' && d[j] === 'R') {
            res.push('.'.repeat(middleCount));
        } else {
            const half = Math.floor(middleCount / 2);
            res.push('R'.repeat(half));
            if (middleCount % 2 === 1) res.push('.');
            res.push('L'.repeat(half));
        }
        i = j;
    }

    return res.join('');
}