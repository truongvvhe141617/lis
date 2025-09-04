Array.prototype.customFindIndex = function(callback, thisArg) {
    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
    }
    const length = this.length;
    for (let i = 0; i < length; i++) {
        if (i in this) { //bỏ qua slot trống
            if (callback.call(thisArg, this[i], i, this)) {
                return i; // Trả về chỉ số nếu callback trả về true
            }
        }
    }
    return -1; // Trả về -1 nếu không tìm thấy phần tử nào    
}    

const numbers = [5, 12, 8, 130, 44];

const index = numbers.myFindIndex(x => x > 10);
console.log(index); // 1