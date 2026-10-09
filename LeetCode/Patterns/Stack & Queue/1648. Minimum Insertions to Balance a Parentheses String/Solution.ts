function minInsertions(s: string): number {
    let insertions = 0;
    let neededRights = 0;

    for (let i = 0; i < s.length; i++) {
        const char = s[i];

        if (char === '(') {

            if (neededRights % 2 !== 0) {
                insertions++;
                neededRights--;
            }

            neededRights += 2;
        } else {
            neededRights--;
            if (neededRights < 0) {
                insertions++; 
                neededRights += 2; 
            }
        }
    }

    return insertions + neededRights;
}