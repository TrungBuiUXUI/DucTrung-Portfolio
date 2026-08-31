# Ảnh dự án

Mỗi project có một thư mục riêng, tên trùng với `id` trong mảng `PROJECTS` ở `main.js`.

```
images/
  lumen/   cover.jpg  01.jpg  02.jpg  03.jpg
  nocta/   cover.jpg  01.jpg  02.jpg  03.jpg
  aro/     cover.jpg  01.jpg  02.jpg  03.jpg
  atlas/   cover.jpg  01.jpg  02.jpg  03.jpg
```

- `cover.jpg` — ảnh trên card ở lưới Work **và** ảnh hero lớn trong overlay.
- `01.jpg` — ảnh đầu tiên trong gallery, đang để `wide: true` nên chiếm trọn chiều rộng.
- `02.jpg`, `03.jpg` — xếp thành 2 cột.

## Kích thước đề xuất

| Vị trí | Tỉ lệ | Bề rộng |
|--------|-------|---------|
| `cover.jpg` | 16:10 | 2000px |
| ảnh `wide` | 16:9 | 2400px |
| ảnh thường | 4:3 | 1200px |

Dùng `.jpg` cho ảnh chụp/screenshot, `.webp` nếu muốn nhẹ hơn (nhớ sửa đuôi file trong `main.js`). Nén xuống dưới ~300KB mỗi ảnh.

## Thêm / bớt / đổi tên project

Sửa mảng `PROJECTS` ở đầu `main.js` — cả lưới Work lẫn overlay đều đọc từ đó, không cần đụng vào HTML.

```js
{
  id: "swaptique",              // = tên thư mục ảnh
  num: "01",
  title: "Swaptique",
  tone: "a",                    // a | b | c | d — màu gradient dự phòng
  blurb: "Câu mô tả ngắn hiện trên card.",
  tags: ["Marketplace", "Mobile App", "2026"],
  desc: "Đoạn mô tả dài hơn hiện trong overlay.",
  meta: { Role: "...", Year: "...", Team: "...", Tools: "..." },
  cover: "images/swaptique/cover.jpg",
  gallery: [
    { src: "images/swaptique/01.jpg", caption: "Onboarding", wide: true },
    { src: "images/swaptique/02.jpg", caption: "Trang chủ" },
    { src: "images/swaptique/03.jpg", caption: "Luồng swap" },
  ],
}
```

Chưa có ảnh cũng không sao — file nào thiếu thì `<img>` tự gỡ bỏ và khối gradient của `tone` hiện lên thay thế, trang không vỡ.
