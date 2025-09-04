function mapMethod() {
    // Create a map object and set the default center and zoom level
    var map = L.map('map').setView([51.505, -0.09], 13);    
    arguments.callee.caller.arguments[0].setState({ mapInstance: map });

    // Add a tile layer to the map (you can use different tile providers)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    // You can add markers, popups, and other map features here
    return map;
}

Array.prototype.customMap = function(callback, thisArg) {
    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
    }
    const length = this.length;
    const result = new Array(length); // Tạo mảng mới để lưu kết quả
    for (let i = 0; i < length; i++) {
        if(i in this) { //bỏ qua slot trống
            result[i] = callback.call(thisArg, this[i], i, this);
        }
    }
    return result;
}    

const numbers = [1, 2, 3];
const doubled = numbers.customMap((num, idx, arr) => {
  console.log(`Index ${idx}, Giá trị: ${num}, Mảng: [${arr}]`);
  return num * 2;
});