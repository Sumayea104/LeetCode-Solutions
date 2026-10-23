class Solution:
    def sortPermutation(self, nums: List[int]) -> int:
        k_star = -1
        
        for i, val in enumerate(nums):
            if val != i:
                if k_star == -1:
                    k_star = val
                else:
                    k_star &= val
                    
        return k_star if k_star != -1 else 0