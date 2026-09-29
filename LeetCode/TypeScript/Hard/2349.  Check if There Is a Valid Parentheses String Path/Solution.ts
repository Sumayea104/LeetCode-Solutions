function hasValidPath(grid: string[][]): boolean {
    const m = grid.length;
    const n = grid[0].length;

    if ((m + n - 1) % 2 !== 0) return false;

    if (grid[0][0] === ')' || grid[m - 1][n - 1] === '(') return false;
    const maxBalance = Math.floor((m + n) / 2);
    const memo: boolean[][][] = Array.from({ length: m }, () =>
        Array.from({ length: n }, () => new Array(maxBalance + 1).fill(false))
    );

    function dfs(r: number, c: number, balance: number): boolean {

        balance += grid[r][c] === '(' ? 1 : -1;

        if (balance < 0 || balance > maxBalance) return false;

        if (r === m - 1 && c === n - 1) {
            return balance === 0;
        }

        if (memo[r][c][balance]) return false;
        memo[r][c][balance] = true;
        if (r + 1 < m && dfs(r + 1, c, balance)) return true;
        if (c + 1 < n && dfs(r, c + 1, balance)) return true;

        return false;
    }

    return dfs(0, 0, 0);
}