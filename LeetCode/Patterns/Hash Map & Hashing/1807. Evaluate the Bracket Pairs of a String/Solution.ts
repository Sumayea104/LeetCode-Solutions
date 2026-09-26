function evaluate(s: string, knowledge: string[][]): string {
    const map = new Map<string, string>();
    for (const [key, value] of knowledge) {
        map.set(key, value);
    }
    const result: string[] = [];
    let isInsideBracket = false;
    let currentKey = "";
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        if (char === '(') {
            isInsideBracket = true;
            currentKey = "";
        } else if (char === ')') {
            isInsideBracket = false;
            result.push(map.has(currentKey) ? map.get(currentKey)! : "?");
        } else {
            if (isInsideBracket) {
                currentKey += char;
            } else {
                result.push(char);
            }
        }
    }
    return result.join("");
}