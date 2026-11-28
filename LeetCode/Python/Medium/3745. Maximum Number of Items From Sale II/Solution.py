from functools import cmp_to_key
from typing import List


class Solution:

    def maximumSaleItems(self, items: List[List[int]], budget: int) -> int:
        max_f = max(f for f, _ in items)
        min_p = min(p for _, p in items)

        freq = [0] * (max_f + 1)
        for f, _ in items:
            freq[f] += 1

        mult_count = [0] * (max_f + 1)
        for f in range(1, max_f + 1):
            if freq[f] == 0:
                continue
            total = 0
            for m in range(f, max_f + 1, f):
                total += freq[m]
            mult_count[f] = total
        offers = []
        for f, p in items:
            gain = mult_count[f] - 1
            if gain > 0:
                offers.append((p, 2, gain))
        offers.append((min_p, 1, None))  
        def cmp_offers(a, b):
            c1, v1, _ = a
            c2, v2, _ = b
            if v1 * c2 > v2 * c1:
                return -1
            if v1 * c2 < v2 * c1:
                return 1
            return 0

        offers.sort(key=cmp_to_key(cmp_offers))

        total_items = 0
        for cost, val, cap in offers:
            if budget < cost:
                continue
            take = (budget // cost) if cap is None else min(cap, budget // cost)
            total_items += take * val
            budget -= take * cost
            if budget == 0:
                break

        return total_items