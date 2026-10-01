function isValid(s: string): boolean {
    if (s.length % 2 !== 0) return false;

    const stack: string[] = [];
    const map: Record<string, string> = {
        ')': '(',
        '}': '{',
        ']': '['
    };

    for (const char of s) {
        if (char in map) {
            if (stack.length === 0 || stack.pop() !== map[char]) {
                return false;
            }
        } else {
            stack.push(char);
        }
    }

    return stack.length === 0;
}