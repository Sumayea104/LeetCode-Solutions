function evaluate(s: string, knowledge: string[][]): string {
    const map = new Map<string, string>();
    for (const [key, value] of knowledge) {
        map.set(key, value);
    }
    const result: string[] = [];
    let keyStart = -1;
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        if (char === '(') {
            keyStart = i + 1;
        } else if (char === ')') {
            const key = s.slice(keyStart, i);
            result.push(map.get(key) ?? "?");
            keyStart = -1;
        } else if (keyStart === -1) {
            result.push(char); 
        }
    }
    return result.join("");
}