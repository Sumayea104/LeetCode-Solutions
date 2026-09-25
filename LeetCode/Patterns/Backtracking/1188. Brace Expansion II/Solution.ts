function braceExpansionII(expression: string): string[] {
    const opStack: string[] = [];
    const valStack: Set<string>[] = [];

    const isAlpha = (ch: string) => ch >= 'a' && ch <= 'z';

    const pushOp = (op: string) => {
        while (opStack.length > 0) {
            const top = opStack[opStack.length - 1];
            if (top === '{') break;
            if (op === '.' && top === ',') break;
            evalTop();
        }
        opStack.push(op);
    };

    const evalTop = () => {
        const op = opStack.pop()!;
        const right = valStack.pop()!;
        const left = valStack.pop()!;

        const res = new Set<string>();

        if (op === ',') {
            for (const s of left) res.add(s);
            for (const s of right) res.add(s);
        } else if (op === '.') {
            for (const l of left) {
                for (const r of right) {
                    res.add(l + r);
                }
            }
        }

        valStack.push(res);
    };
    for (let i = 0; i < expression.length; i++) {
        const ch = expression[i];
        if (ch === '{') {
            if (i > 0 && (isAlpha(expression[i - 1]) || expression[i - 1] === '}')) {
                pushOp('.');
            }
            opStack.push('{');
        } else if (ch === ',') {
            while (opStack.length > 0 && opStack[opStack.length - 1] === '.') {
                evalTop();
            }
            opStack.push(',');
        } else if (ch === '}') {
            while (opStack.length > 0 && opStack[opStack.length - 1] !== '{') {
                evalTop();
            }
            opStack.pop(); 
        } else if (isAlpha(ch)) {
            if (i > 0 && (isAlpha(expression[i - 1]) || expression[i - 1] === '}')) {
                pushOp('.');
            }

            valStack.push(new Set([ch]));
        }
    }

    while (opStack.length > 0) {
        evalTop();
    }
    const result = Array.from(valStack.pop()!);
    return result.sort();
}