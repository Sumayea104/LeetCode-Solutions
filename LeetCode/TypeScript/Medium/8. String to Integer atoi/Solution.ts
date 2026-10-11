function myAtoi(s: string): number {
    let i = 0;
    const n = s.length;
    while (i < n && s[i] === ' ') {
        i++;
    }
    let sign = 1;
    if (i < n) {
        if (s[i] === '-') {
            sign = -1;
            i++;
        } else if (s[i] === '+') {
            i++;
        }
    }
    let result = 0;
    const INT_MAX = 2147483647;
    const INT_MIN = -2147483648; 

    while (i < n && s[i] >= '0' && s[i] <= '9') {
        const digit = s.charCodeAt(i) - 48; 
        if (result > Math.floor((INT_MAX - digit) / 10)) {
            return sign === 1 ? INT_MAX : INT_MIN;
        }

        result = result * 10 + digit;
        i++;
    }

    return result * sign;
}