function smallestIndex(nums: number[]): number {
    const len = nums.length;
    
    for (let i = 0; i < len; i++) {
        let num = nums[i];
        let sum = 0;
        while (num > 0) {
            sum += num % 10;
            num = (num / 10) | 0; 
        }
        if (sum === i) {
            return i;
        }
    }
    return -1;
}