class Solution:
    def minCost(self, grid: list[list[int]]) -> int:
        m, n = len(grid), len(grid[0])

        dp = [[set() for _ in range(n)] for _ in range(m)]
        dp[0][0].add(grid[0][0])
        
        for i in range(m):
            for j in range(n):
                for x in dp[i][j]:
                    if i + 1 < m:
                        dp[i + 1][j].add(x ^ grid[i + 1][j])
                    if j + 1 < n:
                        dp[i][j + 1].add(x ^ grid[i][j + 1])
        return min(dp[m - 1][n - 1])