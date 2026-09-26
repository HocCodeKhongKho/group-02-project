# Kịch bản Báo cáo (Góc nhìn Developer: Kiến trúc, AI & Use Cases)

> [!NOTE] 
> Kịch bản này được thiết kế theo góc nhìn cá nhân (Developer), đi từ kiến trúc, quá trình Deploy, đến cách xử lý AI. Đặc biệt, **Use Case 2 đã được cập nhật thành tính năng Chat tích hợp Trợ lý AI** dựa trên User Story và Test Case (166) chính xác của bạn.

---

## Phần 1: Câu chuyện của Developer & Bức tranh hệ thống (2 - 2.5 phút)

### 1. Giới thiệu & Vai trò
"Chào thầy/cô, em là `[Tên của bạn]`, đảm nhận vai trò Developer trong dự án AI Helpdesk. Hôm nay em xin phép trình bày toàn bộ quá trình em đã xây dựng, deploy hệ thống này và cách em kiểm soát chất lượng khi làm việc với AI."

### 2. Quá trình làm Frontend & Backend
- **Frontend:** "Em xây dựng giao diện bằng React/Vite. Mục tiêu của em là tách biệt component rõ ràng. Logic phức tạp được tách ra, các component chỉ làm nhiệm vụ hiển thị (Presentational)."
- **Backend:** "Phía Backend, em sử dụng FastAPI kết nối với Database. Điểm mấu chốt là em thiết lập các API router rõ ràng và gom toàn bộ logic gọi AI vào một file service riêng biệt (`ai_client.py`) để không làm bẩn logic nghiệp vụ chính."

### 3. Deploy & Khó khăn gặp phải
- "Hệ thống đã được em deploy thành công. Frontend chạy trên Vercel và Backend chạy trên Render."
- **Khó khăn lớn nhất:** "Trong quá trình deploy, khó khăn lớn nhất em gặp phải là **lỗi CORS (Cross-Origin Resource Sharing)** và việc bảo mật API Key của AI. Em đã giải quyết bằng cách config lại middleware CORS trên Backend và nạp secret keys thông qua biến môi trường (Environment Variables) trên cloud."

### 4. Tương tác với AI & Sự kiểm soát của Sinh viên
- "AI giúp em sinh boilerplate code rất nhanh. Tuy nhiên, em luôn áp dụng nguyên tắc **kiểm chứng mọi dòng code**. Có những lúc em thắc mắc về code AI sinh ra (như AI viết thiếu validate, sai UI), em lập tức confirm lại và ép AI phải viết lại theo kiến trúc em mong muốn. Quyết định cuối cùng luôn thuộc về em."

---

## Phần 2: Đi sâu vào Use Case 1 (1.5 - 2 phút)

**"Sau đây, em xin demo Use Case 1: Tạo Ticket Mới"**

### 1. Luồng hoạt động (Live Flow)
- *(Demo trên UI)* "Khi User điền form tạo Ticket và nhấn Submit, Frontend sẽ bắt sự kiện, validate dữ liệu (để tránh rác) và bắn API POST xuống Backend. Dữ liệu lập tức được lưu vào Database và hệ thống tự động sinh mã Ticket (ví dụ INC-123)."

### 2. Các file cốt lõi (Code Traceability)
- *(Mở code)* "Ở Frontend, logic của chức năng này nằm toàn bộ tại: `frontend/src/pages/CreateTicket.tsx`. Ở Backend, nó được tiếp nhận tại router tương ứng để lưu Database."

### 3. Kiểm chứng (Testing)
- "Để UC1 chạy đúng, em có viết các Unit Test kiểm tra logic validate và tính toán SLA (thời gian cam kết xử lý vé) trong file `tests/test_unit_sla.py` với 25 cases (bao gồm TC-066, TC-067)."

---

## Phần 3: Đi sâu vào Use Case 2 (1.5 - 2 phút)

**"Tiếp theo là Use Case 2: Tính năng Nhắn tin trao đổi (Chat) trên Ticket và sự hỗ trợ của Trợ lý AI."**

### 1. Luồng hoạt động & Trợ lý AI (Live Flow)
- *(Demo trên UI)* "Theo User Story, khi khách hàng hoặc IT Agent vào màn hình chi tiết vé, họ có thể chat qua lại để trao đổi thêm thông tin. Tin nhắn được hiển thị realtime lập tức kèm tên và thời gian."
- **Trợ lý AI hỗ trợ:** *(Nhấn mạnh)* "Đặc biệt, em không để nhân viên IT phải gõ tay toàn bộ. Trong màn hình này có một nút **'Hỏi Trợ lý AI'** (hoặc AI Draft). AI sẽ tự động đọc ngữ cảnh toàn bộ Ticket và Knowledge Base nội bộ của công ty để **gợi ý (draft) câu trả lời hoàn chỉnh**. Nhân viên IT (con người) đóng vai trò kiểm duyệt, chỉ cần nhấn 'Gửi' nếu thấy hợp lý. Đây là cách AI phục vụ con người một cách an toàn."

### 2. Các file cốt lõi (Bí mật nằm ở đâu)
- *(Mở code)* "Tính năng Chat này được viết tại Frontend ở file `frontend/src/pages/TicketDetail.tsx`. Toàn bộ luồng mà Trợ lý AI sinh ra câu trả lời dựa trên ngữ cảnh nằm ở Backend trong file `backend/src/backend/services/ai_client.py`."

### 3. Kiểm chứng bằng E2E Testing (Playwright)
- "Với tính năng Chat, UI/UX rất quan trọng (Khách hàng bên phải, IT bên trái). Em đã không chỉ test tay mà viết hẳn 1 script **End-to-End (E2E) Test bằng Playwright**."
- *(Mở file evidence)* "Đây là file `tests/test_e2e_ui.py`, cụ thể là **Test Case số 166**. Đoạn code này tự động mở trình duyệt giả lập, login vào, vào trang Chat, đếm số lượng tin nhắn và **dùng lệnh `expect` để verify xem tin nhắn của người gửi có được gắn đúng CSS class `flex-row-reverse` (đẩy sang phải) hay không**. Mọi thứ đều Passed tự động."

---

## Lời Kết (30 giây)
"Qua 2 Use Case, em đã đi trọn vẹn từ lúc thiết kế luồng, viết code Front-Back, tích hợp AI có kiểm soát cho đến việc tự động hóa quá trình test (Unit Test và E2E Test Playwright). Em xin cảm ơn sự lắng nghe của hội đồng!"
