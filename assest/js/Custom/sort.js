Array.prototype.customSort = function(compareFn) {
  const O = Object(this);
  const len = O.length >>> 0; // ép length về số nguyên 32-bit không âm

  // 1. Thu thập phần tử thật (skip slot trống)
  const items = [];
  for (let i = 0; i < len; i++) {
    if (i in O) {
      items.push(O[i]);
    }
  }

  // 2. Định nghĩa compareFn mặc định
  const compare = typeof compareFn === "function"
    ? compareFn
    : (a, b) => {
        const A = String(a);
        const B = String(b);
        if (A < B) return -1;
        if (A > B) return 1;
        return 0;
      };

  // 3. Sắp xếp phần tử theo compareFn (hoặc mặc định)
  items.sort(compare);

  // 4. Clear mảng gốc
  for (let i = 0; i < len; i++) {
    delete O[i];
  }

  // 5. Ghi lại các phần tử đã sắp xếp
  for (let i = 0; i < items.length; i++) {
    O[i] = items[i];
  }

  // 6. Fill undefined vào cuối
  for (let i = items.length; i < len; i++) {
    O[i] = undefined;
  }

  return O;
};
