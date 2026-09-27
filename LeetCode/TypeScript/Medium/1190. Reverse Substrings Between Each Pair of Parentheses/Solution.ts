function reverseParentheses(s: string): string {
    const stack: string[] = [];
    for (const char of s) {
        if (char === ')') {
            const temp: string[] = [];
            while (stack.length > 0 && stack[stack.length - 1] !== '(') {
                temp.push(stack.pop()!);
            }
            stack.pop();
            for (const c of temp) {
                stack.push(c);
            }
        } else {
            stack.push(char);
        }
    }

    return stack.join('');
}