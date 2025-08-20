/*  
    Vòng đời của bộ nhớ (Memory Life Cycle): 
    - Cấp phát (Allocate) => Sử dụng (Use) => Giải phóng (Release)

    - Heap: nơi **cấp phát bộ nhớ động** (dynamic memory allocation)
    - Heap lưu trữ các **object và function**
*/

const person = {
  name: 'John',
  age: 24,
};

const hobbies = ['hiking', 'reading'];

function foo() {
  const a = 1;
  console.log('Function stored in heap!');
}

/*
    Stack:
    - person: chỉ là tham chiếu (reference) trỏ đến object "person" nằm trong Heap
    - hobbies: tham chiếu trỏ đến array "hobbies" nằm trong Heap
    - foo: tham chiếu trỏ đến function "foo" nằm trong Heap

    Heap: 
    - {name: 'John', age: 24}
    - ['hiking', 'reading']
    - foo() {
        console.log('Function stored in heap!')
    }
*/

// ------------------- Demo -------------------

// stack (primitive)
const a = 1;
const b = 1;

// heap (object/array)
const c = [1];
const d = [1];

console.log(a === b); // true  → so sánh giá trị trực tiếp (Stack)
console.log(c === d); // false → so sánh địa chỉ tham chiếu (Heap)
