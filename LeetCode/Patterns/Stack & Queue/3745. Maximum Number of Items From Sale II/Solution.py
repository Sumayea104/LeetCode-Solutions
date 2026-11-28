from typing import List


class Solution:

    def maximumSaleItems(self, items: List[List[int]], budget: int) -> int:
        if not items or budget <= 0:
            return 0

        max_f = 0
        min_p = items[0][1]
        for f, p in items:
            if f > max_f:
                max_f = f
            if p < min_p:
                min_p = p

        freq = [0] * (max_f + 1)
        for f, _ in items:
            freq[f] += 1

        mult_count = [0] * (max_f + 1)
        for f in range(1, max_f + 1):
            if freq[f]:
                total = 0
                for m in range(f, max_f + 1, f):
                    total += freq[m]
                mult_count[f] = total
        limit = min_p * 2
        boosted = []
        for f, p in items:
            if p < limit:
                gain = mult_count[f] - 1
                if gain > 0:
                    boosted.append((p, gain))
        boosted.sort()

        total_items = 0
        rem = budget
        for p, gain in boosted:
            if rem < p:
                continue
            if gain * p <= rem:
                total_items += gain * 2
                rem -= gain * p
            else:
                take = rem // p
                total_items += take * 2
                rem -= take * p
            if rem == 0:
                return total_items

        return total_items + (rem // min_p)