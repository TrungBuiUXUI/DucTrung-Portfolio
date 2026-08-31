# Mẫu thông tin chuẩn cho một dự án

Mỗi dự án là **một object trong mảng `PROJECTS`** ở cuối [`content.js`](content.js). Card ở lưới Work và overlay case study đều render từ object đó — không cần đụng vào HTML.

> **Website song ngữ.** Trường nào hai thứ tiếng khác nhau thì viết `{ en: "...", vi: "..." }`.
> Trường nào giống hệt nhau (tên dự án, năm, tên công cụ, tên nền tảng) thì viết thẳng
> **một chuỗi** — hàm `t()` tự hiểu cả hai kiểu. Đừng dịch những gì không cần dịch.

---

## 1. Bảng trường thông tin

### Bắt buộc — định danh

| Trường | Song ngữ? | Quy tắc | Ví dụ |
|--------|-----------|---------|-------|
| `id` | không | slug thường, không dấu, không khoảng trắng. **Phải trùng tên thư mục ảnh** trong `images/` | `"swaptique"` |
| `num` | không | 2 chữ số, theo thứ tự hiển thị | `"01"` |
| `title` | hiếm khi | Tên dự án. Tối đa ~20 ký tự để không xuống dòng xấu trên card | `"Swaptique"` |
| `tone` | không | Màu gradient dự phòng khi chưa có ảnh. Có 6 tone: `a` scarlet · `b` vermillion · `c` amber · `d` crimson · `e` rust · `f` coral | `"a"` |

### Bắt buộc — hiển thị trên card

| Trường | Song ngữ? | Quy tắc |
|--------|-----------|---------|
| `blurb` | **có** | **1 câu, ≤ 90 ký tự.** Nói *dự án là gì*, không nói bạn làm gì. |
| `tags` | **có** | **Đúng 3 thẻ, thứ tự: [lĩnh vực, nền tảng, năm]**. Mỗi thẻ ≤ 16 ký tự. Mảng riêng cho mỗi ngôn ngữ. |

### Bắt buộc — hiển thị trong overlay

| Trường | Song ngữ? | Quy tắc |
|--------|-----------|---------|
| `desc` | **có** | **2–4 câu.** Câu 1: bối cảnh/vấn đề. Câu 2–3: hướng giải quyết và quyết định thiết kế đáng kể nhất. Tránh liệt kê tính năng. |
| `meta` | tuỳ trường | **6 khoá cố định** — xem bảng dưới. Giữ nguyên thứ tự để 6 dự án nhìn đồng nhất. |
| `cover` | không | `"images/<id>/cover.jpg"`. Dùng cho **cả card lẫn hero** của overlay. |
| `gallery` | caption có | 3–6 ảnh. Xem [mục 2](#2-gallery). |

#### 6 khoá `meta` chuẩn

Khoá luôn viết bằng tiếng Anh (`Role`, `Timeline`…) — nhãn hiển thị tự dịch qua `CONTENT.metaLabels`. Chỉ **giá trị** mới cần song ngữ.

| Khoá | Nhãn hiện ra | Điền gì | Ví dụ |
|------|--------------|---------|-------|
| `Role` | Vai trò | Vai trò **của bạn**, không phải của cả nhóm | `{ en: "UX/UI Designer", vi: "Thiết kế UX/UI" }` |
| `Timeline` | Thời gian | Thời lượng + năm | `{ en: "8 weeks — 2026", vi: "8 tuần — 2026" }` |
| `Context` | Bối cảnh | **Quan trọng nhất với hồ sơ sinh viên** — loại dự án | `{ en: "Solo project", vi: "Dự án cá nhân" }` · `{ en: "University project", vi: "Bài tập môn học" }` · `{ en: "Capstone", vi: "Đồ án tốt nghiệp" }` |
| `Team` | Nhóm | Quy mô nhóm. Solo thì ghi rõ | `{ en: "Solo", vi: "Làm một mình" }` · `{ en: "3 students", vi: "3 sinh viên" }` |
| `Platform` | Nền tảng | Nền tảng đích — thường không cần dịch | `"iOS, Android"` · `"Web"` |
| `Tools` | Công cụ | Công cụ chính, tối đa 4 — không dịch | `"Figma, FigJam, Maze"` |

### Tuỳ chọn — bỏ hẳn cũng được

| Trường | Song ngữ? | Quy tắc |
|--------|-----------|---------|
| `outcome` | **có** | **2–3 gạch đầu dòng kết quả.** Ưu tiên con số. Chưa launch thì ghi kết quả usability test / phản hồi giảng viên. Bỏ trường này thì cả khối "Outcome" tự ẩn. |
| `links` | label có | 1–3 link. `label` ngắn, `href` là URL thật. Bỏ trường này thì hàng nút tự ẩn. |

> **Không có `outcome` thật thì đừng bịa.** Xoá trường đi tốt hơn là ghi chung chung.

---

## 2. Gallery

```js
gallery: [
  { src: "images/swaptique/01.jpg", wide: true, caption: { en: "Onboarding", vi: "Onboarding" } },
  { src: "images/swaptique/02.jpg", caption: { en: "Home", vi: "Trang chủ" } },
  { src: "images/swaptique/03.jpg", caption: { en: "Swap flow", vi: "Luồng swap" } },
],
```

| Trường | Quy tắc |
|--------|---------|
| `src` | Đường dẫn ảnh. Thiếu file → `<img>` tự gỡ, còn lại khối gradient, **layout không vỡ** |
| `caption` | 1–4 chữ, mô tả *màn hình nào*, không phải khen đẹp xấu |
| `wide` | `true` = chiếm trọn chiều rộng. **Chỉ đặt cho ảnh đầu tiên** |

**Kích thước ảnh:** `cover` 16:10 ~2000px · ảnh `wide` 16:9 ~2400px · ảnh thường 4:3 ~1200px. Nén dưới ~300KB/ảnh.

---

## 3. Khối trống để copy

```js
{
  /* -- định danh -- */
  id: "",                      // slug = tên thư mục trong images/
  num: "01",
  tone: "a",                   // a scarlet · b vermillion · c amber · d crimson · e rust · f coral
  title: "",

  /* -- card -- */
  blurb: {
    en: "",                    // 1 câu, ≤ 90 ký tự
    vi: "",
  },
  tags: {
    en: ["", "", ""],          // [lĩnh vực, nền tảng, năm]
    vi: ["", "", ""],
  },

  /* -- overlay -- */
  desc: {
    en: "",                    // 2–4 câu
    vi: "",
  },
  meta: {
    Role:     { en: "", vi: "" },
    Timeline: { en: "", vi: "" },
    Context:  { en: "", vi: "" },   // Solo project / University project / Capstone
    Team:     { en: "", vi: "" },
    Platform: "",                   // không cần dịch
    Tools:    "",                   // không cần dịch
  },
  outcome: {                   // tuỳ chọn — xoá cả trường nếu chưa có số liệu
    en: ["", ""],
    vi: ["", ""],
  },
  links: [                     // tuỳ chọn — xoá cả trường nếu chưa có link
    { label: { en: "Figma prototype", vi: "Prototype Figma" }, href: "" },
  ],
  cover: "images/<id>/cover.jpg",
  gallery: [
    { src: "images/<id>/01.jpg", wide: true, caption: { en: "", vi: "" } },
    { src: "images/<id>/02.jpg", caption: { en: "", vi: "" } },
    { src: "images/<id>/03.jpg", caption: { en: "", vi: "" } },
  ],
},
```

---

## 4. Checklist trước khi coi là xong một dự án

- [ ] `id` trùng đúng tên thư mục trong `images/`
- [ ] `num` liên tục `01` → `06`, không nhảy số
- [ ] `tone` mỗi dự án một chữ khác nhau (`a`–`f`)
- [ ] `blurb` ≤ 90 ký tự **ở cả hai ngôn ngữ**, không trùng câu đầu của `desc`
- [ ] `tags` đúng 3 thẻ mỗi ngôn ngữ, thẻ thứ 3 là năm
- [ ] Đủ 6 khoá `meta`, không để trống khoá nào
- [ ] `Role` viết vai trò của riêng bạn
- [ ] `Context` nói rõ solo hay bài tập môn / đồ án
- [ ] Gallery chỉ có **một** ảnh `wide: true` và nó là ảnh đầu
- [ ] Mọi `caption` đều có ở cả hai ngôn ngữ
- [ ] `outcome` có số liệu thật, hoặc xoá hẳn trường
- [ ] `links` trỏ đúng URL thật, hoặc xoá hẳn trường
- [ ] Ảnh đã nén, đúng tỉ lệ, đặt đúng `images/<id>/`

---

## 5. Ghi chú

Mảng `PROJECTS` không giới hạn số lượng — lưới Work và nút *Next project* (cuộn vòng) tự chạy theo số phần tử. Hiện có **6 tone màu** (`a`–`f`); dự án thứ 7 trở đi thì quay lại dùng `"a"`.

Gradient `tone-*` chỉ là **màu dự phòng khi chưa có ảnh**. Khi bạn thả ảnh `cover.jpg` thật vào, ảnh phủ kín và gradient không còn nhìn thấy — nên đừng mất thời gian chọn tone.
