function removeInvalidParentheses(s: string): string[] {
    const result: string[] = [];
    if (!s) return [""];
    const visited = new Set<string>();
    const queue: string[] = [s];
    visited.add(s);
    let found = false;
    while (queue.length > 0) {
        const curr = queue.shift()!;
        if (isValid(curr)) {
            result.push(curr);
            found = true;
        }
        if (found) continue;
        for (let i = 0; i < curr.length; i++) {
            if (curr[i] !== '(' && curr[i] !== ')') continue;
            const nextStr = curr.slice(0, i) + curr.slice(i + 1);
            if (!visited.has(nextStr)) {
                visited.add(nextStr);
                queue.push(nextStr);
            }
        }
    }
    return result;
}
function isValid(str: string): boolean {
    let count = 0;
    for (const char of str) {
        if (char === '(') {
            count++;
        } else if (char === ')') {
            count--;
            if (count < 0) return false;
        }
    }
    return count === 0;
}