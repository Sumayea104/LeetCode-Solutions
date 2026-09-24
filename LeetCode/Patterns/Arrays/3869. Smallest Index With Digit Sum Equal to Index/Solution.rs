impl Solution {
    pub fn smallest_index(nums: Vec<i32>) -> i32 {
        let limit = nums.len().min(28);
        for i in 0..limit {
            let mut num = nums[i];
            let mut digit_sum = 0;
            while num > 0 {
                digit_sum += num % 10;
                num /= 10;
            }
            if digit_sum == i as i32 {
                return i as i32;
            }
        }
        -1
    }
}