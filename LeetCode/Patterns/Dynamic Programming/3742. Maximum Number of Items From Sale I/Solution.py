class Solution:
    def maximumSaleItems(self, items: list[list[int]], budget: int) -> int:
        n = len(items)
        bonus = [0] * n
        for i, (fi, _) in enumerate(items):
            cnt = 0
            for j, (fj, _) in enumerate(items):
                if i != j and fj % fi == 0:
                    cnt += 1
            bonus[i] = cnt

        dp = [0] * (budget + 1)

        for i, (_, price) in enumerate(items):
            if price > budget:
                continue

            g = bonus[i]
            for b in range(budget, price - 1, -1):
                candidate = dp[b - price] + 1 + g
                if candidate > dp[b]:
                    dp[b] = candidate
            for b in range(price, budget + 1):
                candidate = dp[b - price] + 1
                if candidate > dp[b]:
                    dp[b] = candidate

        return dp[budget]