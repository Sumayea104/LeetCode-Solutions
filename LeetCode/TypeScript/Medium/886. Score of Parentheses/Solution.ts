function scoreOfParentheses(s: string): number {
    const stack: number[] = [0]; 
    for (const char of s) {
        if (char === '(') {
            stack.push(0); 
        } else {
            const innerScore = stack.pop()!;
            const parentScore = stack.pop()!;
            const currentScore = Math.max(2 * innerScore, 1);
            stack.push(parentScore + currentScore);
        }
    }

    return stack[0];
};