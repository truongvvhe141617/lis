Array.prototype.customFind = function(callback, thisArg) {
    if(typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
    }

    const length = this.length;

    for(let i = 0; i < length; i++) {
        if(i in this) { //bỏ qua slot trống
            if(callback.call(thisArg, this[i], i, this)) {
                return this[i]; // Trả về phần tử nếu callback trả về true
            }
        }
    }

    return undefined; // Trả về undefined nếu không tìm thấy phần tử nào
}    

const numbers = [5, 12, 8, 130, 44];

const found = numbers.customFind(x => x > 12);
console.log(found); // 130