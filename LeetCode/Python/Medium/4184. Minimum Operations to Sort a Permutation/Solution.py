from typing import List

class Solution:
    def minOperations(self, nums: List[int]) -> int:
        n = len(nums)
        if n == 1:
            return 0
        
        def get_shift(arr, target):
            try:
                idx = arr.index(target[0])
            except ValueError:
                return -1
            
            for i in range(n):
                if arr[(idx + i) % n] != target[i]:
                    return -1
            return idx

        inc_target = list(range(n))
        dec_target = list(range(n - 1, -1, -1))

        inc_shift = get_shift(nums, inc_target)
        dec_shift = get_shift(nums, dec_target)

        if inc_shift == -1 and dec_shift == -1:
            return -1

        ans = float('inf')

        if inc_shift != -1:
            ans = min(ans, inc_shift)
            ans = min(ans, 2 + (n - inc_shift) % n)

        if dec_shift != -1:
            ans = min(ans, 1 + (n - dec_shift) % n)
            ans = min(ans, 1 + dec_shift)

        return ans