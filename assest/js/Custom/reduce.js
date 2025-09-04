Array.prototype.cusTomeReduce = function(callback, initialValue) {
    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
    }

    const length = this.length;
    if (length === 0 && arguments.length < 2) {
        throw new TypeError('Reduce of empty array with no initial value');
    }

    let accumulator;
    let startIndex;

    //Xác định giá trị khởi tạo và chỉ số bắt đầu
    if (arguments.length >= 2) {
        accumulator = initialValue; 
    } else {
        while (!(startIndex in this) && startIndex < length) {
            startIndex++;
        }
        if(startIndex >= length) {
            throw new TypeError('Reduce of empty array with no initial value');
        }

        accumulator = this[startIndex++];
    }
    
    for (let i = startIndex; i < length; i++) {
        if (i in this) { //bỏ qua slot trống
            accumulator = callback(accumulator, this[i], i, this);
        }   
    }

    return accumulator;    
}    