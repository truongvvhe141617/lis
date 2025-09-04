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

const numbers = [1, 2, 3];
numbers.customForEach((num, idx, arr) => {
  console.log(`Index ${idx}, Giá trị: ${num}, Mảng: [${arr}]`);
});

//Linear Search
function linearSearch(arr, target) {
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] === target) {
            return i; // Trả về chỉ số nếu tìm thấy
        }
    }
    return -1;
}
console.log('linearSearch', linearSearch([10, 20, 30, 40, 50], 30)); // Output: 2

//Binary Search
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if(arr[mid] === target) return mid;
        if(arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        } 
    }
    return -1;
}       
console.log(binarySearch([10, 20, 30, 40, 50], 30)); // Output: 2  

//Quick Sort
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  let pivot = arr[arr.length - 1];
  let left = [], right = [];
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) left.push(arr[i]);
    else right.push(arr[i]);
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}
console.log(quickSort([5, 2, 9, 1, 5, 6])); // [1, 2, 5, 5, 6, 9]

//Recursion
function factorial(n) {
  if (n === 0) return 1;
  return n * factorial(n - 1);
}
console.log(factorial(5)); // 120

//Fibonacci
function fibonacci(n) {
  if (n < 2) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
console.log(fibonacci(6)); // 8
