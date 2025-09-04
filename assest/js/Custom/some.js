Array.prototype.customSome = function(callback, thisArg) {
    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
    }

    const length = this.length;
    for(let i = 0; i < length; i++) {
        if(i in this) { //bỏ qua slot trống
            if(callback.call(thisArg, this[i], i, this)) {
                return true;
            }
        }
    }    
    return false;
}    

