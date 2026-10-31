class Solution:

  def uniquePaths(self, grid: List[List[int]]) -> int:
    MOD = 10**9 + 7
    m, n = len(grid), len(grid[0])

    memo = {}

    def get_next(ci, cj, d):
      if not (0 <= ci < m and 0 <= cj < n):
        return None
      if grid[ci][cj] == 0:
        return (ci, cj)

      state = (ci, cj, d)
      if state in memo:
        return memo[state]

      if d == 0:
        nd, nci, ncj = 1, ci + 1, cj
      else:
        nd, nci, ncj = 0, ci, cj + 1

      memo[state] = get_next(nci, ncj, nd)
      return memo[state]

    go = [[[None, None] for _ in range(n)] for _ in range(m)]

    for i in range(m):
      for j in range(n):
        go[i][j][0] = get_next(i, j + 1, 0)
        go[i][j][1] = get_next(i + 1, j, 1)

    dp = [[0] * n for _ in range(m)]
    dp[0][0] = 1

    for i in range(m):
      for j in range(n):
        if dp[i][j] == 0:
          continue

        target_right = go[i][j][0]
        if target_right:
          ni, nj = target_right
          dp[ni][nj] = (dp[ni][nj] + dp[i][j]) % MOD

        target_down = go[i][j][1]
        if target_down:
          ni, nj = target_down
          dp[ni][nj] = (dp[ni][nj] + dp[i][j]) % MOD

    return dp[m - 1][n - 1]
    