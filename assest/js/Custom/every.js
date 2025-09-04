Array.prototype.customEvery = function(callback, thisArg) {
    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
    }

    const length = this.length;
    for(let i = 0; i < length; i++) {
        if(i in this) { //bỏ qua slot trống
            if(!callback.call(thisArg, this[i], i, this)) {
                return false; // Trả về false ngay khi callback trả về false
            }
        }
    }    
    return true; // Trả về true nếu tất cả các phần tử đều thỏa   
}    
