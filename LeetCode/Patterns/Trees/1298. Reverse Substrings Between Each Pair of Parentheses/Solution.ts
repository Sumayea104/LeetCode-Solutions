function reverseParentheses(s: string): string {
    const n = s.length;
    const pair = new Array<number>(n);
    const stack: number[] = [];
    for (let i = 0; i < n; i++) {
        if (s[i] === '(') {
            stack.push(i);
        } else if (s[i] === ')') {
            const j = stack.pop()!;
            pair[i] = j;
            pair[j] = i;
        }
    }
    let result = '';
    let curr = 0;
    let dir = 1; 
    while (curr < n) {
        if (s[curr] === '(' || s[curr] === ')') {
            curr = pair[curr]; 
            dir = -dir;      
        } else {
            result += s[curr];
        }
        curr += dir;
    }

    return result;
}