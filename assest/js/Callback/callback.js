// =============================
// Callback là gì?
// =============================
// Callback là một hàm được truyền vào một hàm khác
// và sẽ được gọi lại (call back) sau khi công việc hoàn tất.

// =============================
// Ví dụ 1: Callback đồng bộ
// =============================
function greet(name, callback) {
  console.log("Xin chào " + name);
  callback(); // gọi lại hàm callback
}

function afterGreeting() {
  console.log("Rất vui được gặp bạn!");
}

greet("Trường", afterGreeting);

// =============================
// Ví dụ 2: Callback bất đồng bộ (setTimeout)
// =============================
function doTask(callback) {
  console.log("Bắt đầu công việc...");
  setTimeout(() => {
    console.log("Hoàn thành công việc sau 2 giây");
    callback();
  }, 2000);
}

doTask(() => {
  console.log("Callback được gọi sau khi xong!");
});

// =============================
// Ví dụ 3: Callback trong Array method (forEach)
// =============================
const numbers = [1, 2, 3];

numbers.forEach((num, index) => {
  console.log("Phần tử:", num, "ở vị trí:", index);
});
