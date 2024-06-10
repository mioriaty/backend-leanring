# Model

## Tại sao cần check data ở cả tầng validation và model schema?
- Ở tầng validation:
  - Sẽ validate những gì client gửi lên. Sau đó mới đưa dữ liệu sang controller -> service -> model.

- Ở tầng model schema:
  - Sẽ validate những gì đã được lưu trong database.
  - Và nếu xử lý logic ở tâng service bị lỗi thì sẽ không lưu dữ liệu vào database.