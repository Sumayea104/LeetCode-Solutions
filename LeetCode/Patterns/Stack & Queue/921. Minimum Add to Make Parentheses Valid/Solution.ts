function minAddToMakeValid(s: string): number {
    let open = 0;
    let add = 0;

    for (const char of s) {
        if (char === '(') {
            open++;
        } else {
            if (open > 0) {
                open--;
            } else {
                add++;
            }
        }
    }

    return open + add;
}