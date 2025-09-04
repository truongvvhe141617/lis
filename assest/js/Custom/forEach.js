//Custom ForEach Function
Array.prototype.customForEach = function(callback) {
    if(typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
    }
    const length = this.length;
    for(let i = 0; i < length; i++) {
        if(i in this) { //bỏ qua slot trống
            callback(this[i], i, this);
        }
    }
}