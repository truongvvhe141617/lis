/*  
    Vòng đời của bộ nhớ (Memory Life Cycle): Allocate => Use => Release
    - Giải phóng bộ nhớ (Garbage Collection): 
      xóa bỏ những giá trị không còn được dùng nữa
    - Cơ chế phổ biến: Scavenge, Mark-Sweep, Mark-Compact
*/

/*
    Khi JavaScript engine phát hiện một biến hoặc function không còn được tham chiếu 
    (tức là không ai dùng đến nữa), nó sẽ tự động giải phóng vùng nhớ đó.

    Cơ chế hoạt động cơ bản của Garbage Collector:
    
    1. Bước "Đánh dấu" (Mark): 
       - Thuật toán sẽ duyệt qua tất cả các giá trị (object, array, function) trong bộ nhớ Heap.
       - Bắt đầu từ các biến gốc (root) như global object, biến đang còn sống trong stack.
       - Duyệt theo kiểu Depth-First Search (DFS), tất cả những giá trị còn tham chiếu được sẽ được "đánh dấu" là còn sống.

    2. Bước "Dọn dẹp" (Sweep): 
       - Sau khi duyệt xong, tất cả giá trị nào KHÔNG được đánh dấu 
         → coi là "chết" (unreachable).
       - Những giá trị này sẽ bị giải phóng bộ nhớ.

    3. Tối ưu "Nén bộ nhớ" (Compact):
       - Sau khi xóa, bộ nhớ có thể bị phân mảnh (nhiều khoảng trống nhỏ rải rác).
       - Thuật toán Mark-Compact sẽ gom các object "sống" lại liền kề nhau,
         nhờ đó bộ nhớ gọn gàng hơn và tránh lãng phí.

    🚀 Tóm gọn:
    - Mark-Sweep: Đánh dấu và xóa bỏ object không dùng nữa.
    - Mark-Compact: Tương tự Mark-Sweep, nhưng có thêm bước nén bộ nhớ.
    - Scavenge: (thường áp dụng cho bộ nhớ nhỏ, tạm thời) copy object sống sang vùng nhớ mới, 
                vùng cũ sẽ bị giải phóng toàn bộ.
*/
