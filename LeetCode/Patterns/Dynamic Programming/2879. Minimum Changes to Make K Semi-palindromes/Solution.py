class Solution:
    def minimumChanges(self, s: str, k: int) -> int:
        n = len(s)
        
        memo_cost = {}
        
        def get_cost(i: int, j: int) -> int:
            if (i, j) in memo_cost:
                return memo_cost[(i, j)]
            
            length = j - i + 1
            min_changes = float('inf')
   
            divisors = []
            for d in range(1, length):
                if length % d == 0:
                    divisors.append(d)
            
            if not divisors:
                return length 
                
            for d in divisors:
                current_cost = 0
           
                group_len = length // d
                for offset in range(d):
                  
                    l, r = 0, group_len - 1
                    while l < r:
                        idx1 = i + offset + l * d
                        idx2 = i + offset + r * d
                        if s[idx1] != s[idx2]:
                            current_cost += 1
                        l += 1
                        r -= 1
                min_changes = min(min_changes, current_cost)
                
            memo_cost[(i, j)] = min_changes
            return min_changes

        cost = [[0] * n for _ in range(n)]
        for length in range(2, n + 1):
            for i in range(n - length + 1):
                j = i + length - 1
                cost[i][j] = get_cost(i, j)
                
        dp = [[float('inf')] * (k + 1) for _ in range(n + 1)]
        dp[0][0] = 0
        
        for p in range(1, k + 1):
            for i in range(1, n + 1):
                
                for m in range(p - 1, i):
                    if i - m >= 2 or p == i:
                        sub_cost = cost[m][i - 1] if i - m >= 2 else 0 
                        if i - m >= 2:
                            dp[i][p] = min(dp[i][p], dp[m][p - 1] + cost[m][i - 1])
                            
        return dp[n][k]