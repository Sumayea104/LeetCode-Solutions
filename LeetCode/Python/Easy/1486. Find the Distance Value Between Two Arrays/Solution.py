import bisect

class Solution:
    def findTheDistanceValue(self, arr1: list[int], arr2: list[int], d: int) -> int:
        arr2.sort()
        distance_val = 0
        m = len(arr2)
        
        for x in arr1:
            idx = bisect.bisect_left(arr2, x)
            valid = True
            
            if idx > 0 and abs(x - arr2[idx - 1]) <= d:
                valid = False
            if idx < m and abs(x - arr2[idx]) <= d:
                valid = False
                
            if valid:
                distance_val += 1
                
        return distance_val