Promise.allSettled([
  Promise.resolve(33),
  new Promise((resolve) => setTimeout(() => resolve(66), 0)),
  99,
  Promise.reject(new Error("an error")),
]).then((values) => console.log(values));

// Await
(async () => {
  const values = await Promise.allSettled([
    Promise.resolve(33),
    new Promise((resolve) => setTimeout(() => resolve(66), 0)),
    99,
    Promise.reject(new Error("an error")),
  ]);
  console.log(values);
})();


// Dùng .then()
Promise.allSettled([
  Promise.resolve(111),
  new Promise((resolve) => setTimeout(() => resolve(222), 500)),
  333, // số thường -> tự động được bọc thành Promise.resolve(333)
  Promise.reject(new Error("lỗi xảy ra")),
]).then((results) => {
  console.log("Kết quả với .then():", results);
});

// Dùng async/await
(async () => {
  const results = await Promise.allSettled([
    Promise.resolve(111),
    new Promise((resolve) => setTimeout(() => resolve(222), 500)),
    333,
    Promise.reject(new Error("lỗi xảy ra")),
  ]);
  console.log("Kết quả với await:", results);
})();
