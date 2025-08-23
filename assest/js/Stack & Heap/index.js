/**
 * Stack and Heap
 * 1. Stack: Static memory allocation - Cấp phát bộ nhớ tĩnh (primitive values)
 * 2. Heap: Dynamic memory allocation - Cấp phát bộ nhớ động (objects, arrays, functions)
 */

// ------------------------- STACK (Primitive values) -------------------------

const companyName = 'Mitalab';    // string
const totalEmployees = 350;       // number
let isVerified = false;           // boolean
let ceoName = 'An';               // string
let foundedYear = null;           // null

// 📌 Các giá trị này được lưu trực tiếp trong stack:
// | companyName = "Mitalab" |
// | totalEmployees = 350    |
// | isVerified = false      |
// | ceoName = "An"          |
// | foundedYear = null      |

// ------------------------- HEAP (Reference types) -------------------------

// Object
const product = {
  id: 101,
  name: 'Xét nghiệm sinh hóa',
  price: 150000,
};

// Thêm thuộc tính động → vẫn lưu trong heap
product.category = 'Y tế';

// Function
function checkProduct() {
  return 'This function lives in Heap!';
}

// Array
const departments = ['Kỹ thuật', 'Kinh doanh', 'Nhân sự'];
departments.push('Hành chính');

// ------------------------- STACK chứa tham chiếu -------------------------

// Stack lưu:
// companyName = "Mitalab"
// totalEmployees = 350
// isVerified = false
// ceoName = "An"
// foundedYear = null
// product → (tham chiếu đến object trong Heap)
// checkProduct → (tham chiếu đến function trong Heap)
// departments → (tham chiếu đến array trong Heap)

// ------------------------- HEAP chứa dữ liệu thật -------------------------

// {
//    id: 101,
//    name: "Xét nghiệm sinh hóa",
//    price: 150000,
//    category: "Y tế"
// }

// function checkProduct() {
//    return 'This function lives in Heap!';
// }

// ["Kỹ thuật", "Kinh doanh", "Nhân sự", "Hành chính"]

// ------------------------- Ví dụ minh họa bản chất -------------------------

const x = 10; // => x = 10 được lưu trực tiếp trong Stack

const staff = { name: 'Minh' }; 
// staff được lưu trong Stack, nhưng chỉ giữ *tham chiếu* đến object {name: "Minh"} nằm trong Heap

const staffCopy = staff; 
// staffCopy cũng tham chiếu đến cùng object trong Heap

staffCopy.name = 'Nam'; 
// Thay đổi trên staffCopy → staff cũng thay đổi vì cả hai cùng tham chiếu đến một object

console.log(staff.name); // "Nam"
console.log(staffCopy.name); // "Nam"
