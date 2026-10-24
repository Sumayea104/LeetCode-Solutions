class Solution:
    def countDaysTogether(self, arriveAlice: str, leaveAlice: str, arriveBob: str, leaveBob: str) -> int:

        days_in_months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

        def date_to_day(date_str: str) -> int:
            month, day = map(int, date_str.split("-"))
            total_days = day
            for m in range(month - 1):
                total_days += days_in_months[m]
            return total_days

        a_start = date_to_day(arriveAlice)
        a_end = date_to_day(leaveAlice)
        b_start = date_to_day(arriveBob)
        b_end = date_to_day(leaveBob)
        
        latest_start = max(a_start, b_start)
        earliest_end = min(a_end, b_end)
        
        if latest_start <= earliest_end:
            return earliest_end - latest_start + 1
        
        return 0