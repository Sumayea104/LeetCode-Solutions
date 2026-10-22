class Solution:
    def sortableIntegers(self, nums: list[int]) -> int:
        n = len(nums)
        sorted_nums = sorted(nums)
        total_sum = 0

        def is_sortable(k: int) -> bool:
            for i in range(0, n, k):
                original_block = nums[i:i + k]
                sorted_block = sorted_nums[i:i + k]
                
                if sorted_block == original_block:
                    continue
                
                doubled = original_block + original_block
                found = False
                
                target = tuple(sorted_block)
                for j in range(k):
                    if tuple(doubled[j:j + k]) == target:
                        found = True
                        break
                
                if not found:
                    return False
            return True

        k = 1
        while k * k <= n:
            if n % k == 0:
                if is_sortable(k):
                    total_sum += k
                other_divisor = n // k
                if other_divisor != k:
                    if is_sortable(other_divisor):
                        total_sum += other_divisor
            k += 1

        return total_sum