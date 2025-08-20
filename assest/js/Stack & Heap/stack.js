/*  
    Vòng đời của bộ nhớ (Memory Life Cycle): 
    - Cấp phát (Allocate) => Sử dụng (Use) => Giải phóng (Release)

    - Stack (ngăn xếp): dùng cho việc cấp phát bộ nhớ **tĩnh** (static memory allocation)
    - Stack lưu trữ các giá trị kiểu dữ liệu nguyên thủy (primitive values): 
      string, number, boolean, undefined, null
*/

const male = true
const name = 'John Doe'
const age = 24
const adult = true

// Tất cả các giá trị trên đều được lưu trong Stack vì chúng đều là primitive values.
/*
    Stack: 
    male = true
    name = 'John Doe'
    age = 24
    adult = true
*/

/* 
    - "Dữ liệu tĩnh" (static data) là dữ liệu mà trình thông dịch/JS engine 
      **biết trước kích thước ngay tại thời điểm biên dịch** (compile time).

    - Bao gồm:
        + Các giá trị nguyên thủy (primitive: string, number, boolean, undefined, null).
        + Tham chiếu (references) trỏ đến object hoặc function (nhưng bản thân object sẽ nằm ở Heap).

    - Vì engine biết kích thước dữ liệu sẽ không đổi → nó cấp phát một lượng bộ nhớ cố định cho mỗi giá trị.

    - Quá trình cấp phát bộ nhớ trước khi thực thi (ngay khi chương trình chuẩn bị chạy) 
      được gọi là **cấp phát bộ nhớ tĩnh (static memory allocation)**.

    - Do bộ nhớ được cấp phát cố định, nên giá trị primitive bị giới hạn bởi kích thước tối đa của Stack.
      → Ví dụ: số quá lớn, chuỗi quá dài, hay nhiều biến cùng lúc sẽ làm Stack bị tràn (stack overflow).

    - Giới hạn cụ thể (bao nhiêu MB cho Stack, kích thước tối đa của chuỗi/number) 
      phụ thuộc vào từng trình duyệt và runtime (Chrome V8, Node.js, Firefox SpiderMonkey...).
*/
