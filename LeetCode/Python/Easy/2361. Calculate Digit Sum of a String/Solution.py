class Solution:
    def digitSum(self, s: str, k: int) -> str:
        while len(s) > k:
            next_chunks = []
            for i in range(0, len(s), k):
                group = s[i : i + k]
                group_sum = sum(int(digit) for digit in group)
                next_chunks.append(str(group_sum))
            s = "".join(next_chunks)
        return s