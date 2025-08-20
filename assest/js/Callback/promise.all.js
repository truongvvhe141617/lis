const p1 = Promise.resolve(3);
const p2 = 1337;
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("foo");
  }, 100);
});
const p4 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("helloo");
  });
  reject(new Error("Error!"));
});

Promise.all([p1, p2, p3]).then((values) => {
  console.log(values); // [3, 1337, "foo"]
});

// Using .catch:
Promise.allSettled([p1, p2, p3, p4])
  .then((values) => {
    console.log(values);
  })
  .catch((error) => {
    console.error("Using .catch: ", error.message); // Why this output display before line 16 ???
  });