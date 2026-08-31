/* ============================================================
   CONTENT — mọi chữ trên trang nằm ở đây, không nằm trong main.js.
   Sửa file này là đủ để đổi nội dung website.

   Quy ước: chỗ nào hai ngôn ngữ khác nhau thì viết { en: "...", vi: "..." }.
   Chỗ nào giống hệt nhau (tên riêng, năm, tên công cụ) thì viết thẳng
   một chuỗi — hàm t() bên dưới tự hiểu cả hai kiểu.
   ============================================================ */

const CONTENT = {
  /* ---------- Thẻ meta / SEO ---------- */
  metaTitle: "Bùi Đức Trung — UX/UI Designer",
  metaDesc: {
    en: "Bùi Đức Trung is a UX/UI design student at FPT University Hanoi, working through research, wireframes and prototypes. Open to internships and junior roles.",
    vi: "Bùi Đức Trung là sinh viên thiết kế UX/UI tại Đại học FPT Hà Nội, làm việc qua nghiên cứu, wireframe và prototype. Đang tìm cơ hội thực tập và vị trí junior.",
  },
  preloader: "Bùi Đức Trung® — Portfolio ’26",

  /* ---------- Điều hướng ---------- */
  navLocation: { en: "Hanoi, VN", vi: "Hà Nội, VN" },
  navWork: { en: "Work", vi: "Dự án" },
  navAbout: { en: "About", vi: "Giới thiệu" },
  navServices: { en: "What I do", vi: "Tôi làm gì" },
  navContact: { en: "Contact", vi: "Liên hệ" },
  menuLocation: { en: "Hanoi — GMT+7", vi: "Hà Nội — GMT+7" },

  /* ---------- Hero ---------- */
  heroRole: { en: "UX/UI Designer", vi: "Thiết kế UX/UI" },
  heroYears: "Folio ’22—’26",
  heroIntro: {
    en: "I’m a UX/UI design student at FPT University Hanoi. I work through research, wireframes and prototypes to make digital products people understand without being taught.",
    vi: "Tôi là sinh viên thiết kế UX/UI tại Đại học FPT Hà Nội. Tôi đi qua nghiên cứu, wireframe và prototype để làm ra sản phẩm số mà người dùng nhìn là hiểu, không cần ai chỉ.",
  },
  heroScroll: { en: "Scroll", vi: "Cuộn" },

  /* ---------- Dải chữ chạy ---------- */
  marquee: {
    en: ["User Research", "Wireframing", "Prototyping", "UI Design", "Interaction Design"],
    vi: ["Nghiên cứu người dùng", "Wireframe", "Prototype", "Thiết kế UI", "Thiết kế tương tác"],
  },

  /* ---------- Tiêu đề các section ---------- */
  workTitle: { en: "Selected<br/>Work", vi: "Dự án<br/>tiêu biểu" },
  aboutTitle: { en: "About", vi: "Giới thiệu" },
  servicesTitle: { en: "What I do", vi: "Tôi làm gì" },

  /* ---------- About ---------- */
  aboutStatement: {
    en: "Good design should disappear into use. I’m drawn to the point where function and aesthetics stop competing — where research turns into something a person can pick up without being taught.",
    vi: "Thiết kế tốt là thiết kế biến mất khi người ta dùng. Tôi bị cuốn vào đúng cái điểm mà công năng và thẩm mỹ thôi tranh nhau — nơi nghiên cứu biến thành thứ người dùng cầm lên là dùng được ngay.",
  },
  aboutCol1Title: { en: "Education", vi: "Học vấn" },
  aboutCol1: {
    en: [
      "FPT University Hanoi — Graphic Design, 2022–2026",
      "Interaction Design major — since 2025",
      "IELTS 7.5 — English",
    ],
    vi: [
      "Đại học FPT Hà Nội — Thiết kế đồ hoạ, 2022–2026",
      "Chuyên ngành Interaction Design — từ 2025",
      "IELTS 7.5 — Tiếng Anh",
    ],
  },
  aboutCol2Title: { en: "Experience", vi: "Kinh nghiệm" },
  aboutCol2: {
    en: [
      "UX/UI Intern — Viettel Solutions, 2025",
      "Interaction Design — FPT University, 2025–now",
    ],
    vi: [
      "Thực tập UX/UI — Viettel Solutions, 2025",
      "Interaction Design — Đại học FPT, 2025–nay",
    ],
  },

  /* ---------- What I do ---------- */
  services: {
    en: [
      { name: "User Research", desc: "Interviews, surveys and synthesis that lead somewhere." },
      { name: "UX Design", desc: "User flows, information architecture, wireframes." },
      { name: "UI Design", desc: "Interfaces, design systems, visual detail." },
      { name: "Prototyping", desc: "Clickable prototypes and motion to test ideas early." },
    ],
    vi: [
      { name: "Nghiên cứu người dùng", desc: "Phỏng vấn, khảo sát và tổng hợp thành insight dùng được." },
      { name: "Thiết kế UX", desc: "Luồng màn hình, kiến trúc thông tin, wireframe." },
      { name: "Thiết kế UI", desc: "Giao diện, design system, chi tiết thị giác." },
      { name: "Prototype", desc: "Prototype bấm được và chuyển động để kiểm chứng sớm." },
    ],
  },

  /* ---------- Liên hệ ---------- */
  contactKicker: {
    en: "Open to internships and junior roles",
    vi: "Đang tìm cơ hội thực tập và vị trí junior",
  },
  contactColContact: { en: "Contact", vi: "Liên hệ" },
  contactColSocial: { en: "Socials", vi: "Mạng xã hội" },
  contactColBased: { en: "Based in", vi: "Đang ở" },
  contactLocation1: { en: "Hanoi, Vietnam", vi: "Hà Nội, Việt Nam" },
  contactLocation2: { en: "Open to remote work", vi: "Sẵn sàng làm remote" },
  copyright: {
    en: "© 2026 Bùi Đức Trung. All rights reserved.",
    vi: "© 2026 Bùi Đức Trung. Bảo lưu mọi quyền.",
  },
  footerNote: { en: "Built with GSAP & Three.js", vi: "Dựng bằng GSAP & Three.js" },
  backToTop: { en: "Back to top ↑", vi: "Lên đầu trang ↑" },

  /* ---------- Overlay case study ---------- */
  viewCase: { en: "View case", vi: "Xem dự án" },
  caseNext: { en: "Next project", vi: "Dự án tiếp theo" },
  caseOutcomeTitle: { en: "Outcome", vi: "Kết quả" },

  /* Nhãn cho 6 trường meta chuẩn của mỗi dự án */
  metaLabels: {
    Role: { en: "Role", vi: "Vai trò" },
    Timeline: { en: "Timeline", vi: "Thời gian" },
    Context: { en: "Context", vi: "Bối cảnh" },
    Team: { en: "Team", vi: "Nhóm" },
    Platform: { en: "Platform", vi: "Nền tảng" },
    Tools: { en: "Tools", vi: "Công cụ" },
  },
};

/* ============================================================
   PROJECTS

   Ca 6 du an deu THAT: 01 Moodbi, 02 Swaptique (solo)
   03 Chill, 04 PASSS, 05 PerFin, 06 Nocturne (nhom 4 nguoi).
   Xem PROJECT-TEMPLATE.md de biet cach dien them / sua.

   Truong nao hai thu tieng khac nhau thi viet { en, vi }.
   Truong nao giong nhau (ten du an, nam, ten cong cu) viet thang chuoi.
   ============================================================ */
const PROJECTS = [
  {
    id: "moodbi",
    num: "01",
    tone: "a",                       // a=scarlet  b=vermillion  c=amber  d=crimson  e=rust  f=coral
    title: "Moodbi",
    blurb: {
      en: "An AI moodboard tool that turns a fragmented visual-discovery process into one structured, defensible design direction.",
      vi: "Công cụ tạo moodboard bằng AI, gom quá trình tìm ý tưởng thị giác rời rạc thành một hướng thiết kế thống nhất, có căn cứ để bảo vệ.",
    },
    tags: {
      en: ["AI Tool", "Web App", "2026"],
      vi: ["Công cụ AI", "Web App", "2026"],
    },
    desc: {
      en: "Moodbi is an AI-powered moodboard tool built for UX/UI designers. It compresses the early visual-discovery phase — normally spread across 3–4 disconnected tools — into one structured workflow that outputs a defensible design direction, not just a pretty image.",
      vi: "Moodbi là công cụ tạo moodboard bằng AI dành cho designer UX/UI. Nó nén giai đoạn tìm ý tưởng thị giác ban đầu — vốn trải dài qua 3–4 công cụ rời rạc — thành một quy trình thống nhất, cho ra một hướng thiết kế có căn cứ, chứ không chỉ là một tấm ảnh đẹp.",
    },
    meta: {
      Role: { en: "UX Researcher & UI/UX Designer (Solo)", vi: "Nghiên cứu UX & Thiết kế UI/UX (làm một mình)" },
      Timeline: { en: "May – Jul 2026 · 1 month", vi: "05–07/2026 · 1 tháng" },
      Context: { en: "Solo project", vi: "Dự án cá nhân" },
      Team: { en: "Solo", vi: "Làm một mình" },
      Platform: "Web",
      Tools: "Figma, Claude, Google Stitch",
    },
    outcome: {
      en: ["Audited 4 core flows against all 10 Nielsen heuristics, catching 16+ critical issues before handoff", "First project run through the full Design Thinking cycle solo — Empathize through Test"],
      vi: ["Đánh giá 4 luồng chính theo đủ 10 nguyên tắc heuristic của Nielsen, phát hiện hơn 16 lỗi nghiêm trọng trước khi hoàn thiện", "Dự án đầu tiên đi trọn quy trình Design Thinking một mình — từ Empathize tới Test"],
    },
    links: [{ label: { en: "Figma prototype", vi: "Prototype Figma" }, href: "https://www.figma.com/proto/EFqW1DvIFv7FQfN2620PY7/Individual-Project-01?node-id=269-2919&viewport=-658%2C251%2C0.2&t=FqIvWeRBk17GWXvV-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=269%3A2919&page-id=266%3A2335" }],
    cover: "images/moodbi/cover.jpg",
    gallery: [
      { src: "images/moodbi/01.jpg", wide: true, caption: { en: "Case study overview", vi: "Tổng quan case study" } },
      { src: "images/moodbi/02.jpg", caption: { en: "Key screens", vi: "Màn hình chính" } },
      { src: "images/moodbi/03.jpg", caption: { en: "Design system", vi: "Design system" } },
    ],
  },
  {
    id: "swaptique",
    num: "02",
    tone: "b",
    title: "Swaptique",
    blurb: {
      en: "A campus-only marketplace where every seller is a verified student, so buying secondhand starts from trust instead of suspicion.",
      vi: "Chợ đồ cũ chỉ dành cho sinh viên trong trường, mọi người bán đều được xác thực — mua bán bắt đầu từ sự tin tưởng thay vì nghi ngờ.",
    },
    tags: {
      en: ["Marketplace", "Mobile App", "2026"],
      vi: ["Marketplace", "Ứng dụng di động", "2026"],
    },
    desc: {
      en: "Students already trade secondhand in Zalo groups, Facebook posts and dorm corridors — but every trade opens with the same question: is this person real, and can I trust them? Swaptique makes school-email verification the gate, so trust doesn't depend on guesswork.",
      vi: "Sinh viên đã trao đổi đồ cũ qua nhóm Zalo, bài đăng Facebook, hành lang ký túc xá — nhưng mọi cuộc trao đổi đều mở đầu bằng một câu hỏi: người này có thật không, có tin được không? Swaptique biến việc xác thực email trường thành cánh cổng duy nhất, để sự tin tưởng không còn phải đoán.",
    },
    meta: {
      Role: { en: "Solo — research, IA, UI, prototype", vi: "Làm một mình — nghiên cứu, IA, UI, prototype" },
      Timeline: { en: "4 weeks (8-week plan, compressed)", vi: "4 tuần (kế hoạch 8 tuần, rút gọn)" },
      Context: { en: "Solo project", vi: "Dự án cá nhân" },
      Team: { en: "Solo", vi: "Làm một mình" },
      Platform: "iOS · 390 × 844",
      Tools: "Figma, Claude",
    },
    outcome: {
      en: ["Audited all 35 screens against Nielsen's 10 heuristics — found 3 critical, 9 significant, 5 minor issues (30/50 overall)", "Design system of 23 component sets and 53 components, 13 colour tokens bound across every screen"],
      vi: ["Đánh giá toàn bộ 35 màn hình theo 10 nguyên tắc heuristic của Nielsen — phát hiện 3 lỗi nghiêm trọng, 9 lỗi đáng kể, 5 lỗi nhỏ (30/50 điểm)", "Design system gồm 23 bộ component, 53 component, 13 biến màu áp dụng xuyên suốt tất cả màn hình"],
    },
    links: [{ label: { en: "Figma prototype", vi: "Prototype Figma" }, href: "https://www.figma.com/proto/HmJIlqeMGHHb0LOzImj7Tp/Individual-Project-02?node-id=12-3&viewport=407%2C517%2C0.1&t=UxSDqFp1ArE9nhst-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=12%3A3&show-proto-sidebar=1&page-id=4%3A2" }],
    cover: "images/swaptique/cover.jpg",
    gallery: [
      { src: "images/swaptique/01.jpg", wide: true, caption: { en: "Onboarding & verification", vi: "Onboarding & xác thực" } },
      { src: "images/swaptique/02.jpg", caption: { en: "Search & filters", vi: "Tìm kiếm & lọc" } },
      { src: "images/swaptique/03.jpg", caption: { en: "Chat & meetup", vi: "Chat & hẹn gặp" } },
    ],
  },
  {
    id: "chill",
    num: "03",
    tone: "c",                       // a=scarlet  b=vermillion  c=amber  d=crimson  e=rust  f=coral
    title: "Chill",
    blurb: {
      en: "An e-commerce site for gym & activewear, designed around a smooth shopping experience.",
      vi: "Trang thương mại điện tử bán đồ tập gym, thiết kế quanh trải nghiệm mua sắm mượt mà.",
    },
    tags: {
      en: ["E-commerce", "Web App", "2025"],
      vi: ["E-commerce", "Ứng dụng web", "2025"],
    },
    desc: {
      en: "Chill is an e-commerce concept for gym and activewear, built for shoppers who exercise 3–4 times a week and want gear that performs as well as it looks. The team ran a full research-to-test cycle — user interviews, a persona, and usability sessions — and simplified the checkout flow after testing showed the original process felt too long.",
      vi: "Chill là ý tưởng website thương mại điện tử cho đồ tập gym, hướng tới người tập luyện 3–4 lần/tuần và muốn trang phục vừa đẹp vừa hiệu quả. Nhóm thực hiện trọn quy trình từ nghiên cứu tới kiểm thử — phỏng vấn người dùng, dựng persona, chạy usability test — và rút gọn luồng thanh toán sau khi test cho thấy quy trình ban đầu quá dài.",
    },
    meta: {
      Role: { en: "UX/UI Designer — wireframes & refinement", vi: "Thiết kế UX/UI — wireframe & tinh chỉnh" },
      Timeline: { en: "10 weeks · Jan–Apr 2025", vi: "10 tuần · 01–04/2025" },
      Context: { en: "University group project", vi: "Bài tập nhóm — môn học" },
      Team: { en: "4 students", vi: "4 sinh viên" },
      Platform: "Web",
      Tools: "Figma",
    },
    outcome: {
      en: ["Usability testing surfaced that checkout felt too long, leading to a simplified flow", "Delivered a full research-to-prototype cycle: interviews, persona, HMW, high-fi wireframes, testing"],
      vi: ["Usability test phát hiện luồng thanh toán quá dài, dẫn tới việc rút gọn quy trình", "Hoàn thành trọn quy trình từ nghiên cứu tới prototype: phỏng vấn, persona, HMW, wireframe high-fi, kiểm thử"],
    },
    cover: "images/chill/cover.jpg",
    gallery: [
      { src: "images/chill/01.jpg", wide: true, caption: { en: "Homepage & product listing", vi: "Trang chủ & danh sách sản phẩm" } },
      { src: "images/chill/02.jpg", caption: { en: "Checkout & payment flow", vi: "Luồng mua hàng & thanh toán" } },
      { src: "images/chill/03.jpg", caption: { en: "Cart & product detail", vi: "Giỏ hàng & chi tiết sản phẩm" } },
    ],
  },
  {
    id: "passs",
    num: "04",
    tone: "d",                       // a=scarlet  b=vermillion  c=amber  d=crimson  e=rust  f=coral
    title: "PASSS",
    blurb: {
      en: "A cooking app for gym-goers to plan high-protein meals and track macros.",
      vi: "Ứng dụng nấu ăn cho người tập gym, lên thực đơn giàu đạm và theo dõi macro.",
    },
    tags: {
      en: ["Health & Fitness", "Mobile App", "2025"],
      vi: ["Sức khỏe & Thể thao", "Ứng dụng di động", "2025"],
    },
    desc: {
      en: "PASSS helps gym-goers who don't have time to figure out what to cook turn a protein target into an actual meal — recipes built around ingredients on hand, with step-by-step photo guidance. User testing found the rating screen felt over-detailed, so it was simplified to cut cognitive load during the post-cook flow.",
      vi: "PASSS giúp người tập gym không có thời gian nghĩ nên nấu gì biến mục tiêu đạm thành một bửa ăn thật — công thức dựa trên nguyên liệu sẵn có, kèm hướng dẫn từng bước có ảnh minh hoạ. Usability test cho thấy màn hình đánh giá sau khi nấu quá rườm rà, nên được rút gọn để giảm tải nhận thức.",
    },
    meta: {
      Role: { en: "UX/UI Designer — wireframes & refinement", vi: "Thiết kế UX/UI — wireframe & tinh chỉnh" },
      Timeline: { en: "10 weeks · Jan–Apr 2025", vi: "10 tuần · 01–04/2025" },
      Context: { en: "University group project", vi: "Bài tập nhóm — môn học" },
      Team: { en: "4 students", vi: "4 sinh viên" },
      Platform: "Mobile app",
      Tools: "Figma",
    },
    outcome: {
      en: ["Usability testing found the rating screen too detailed and simplified it to reduce cognitive load", "Delivered a full research-to-prototype cycle: low-fi through high-fi wireframes, tested and iterated"],
      vi: ["Usability test phát hiện màn hình đánh giá quá rườm rà và đã được rút gọn để giảm tải nhận thức", "Hoàn thành trọn quy trình từ nghiên cứu tới prototype: wireframe low-fi tới high-fi, kiểm thử và lặp lại"],
    },
    cover: "images/passs/cover.jpg",
    gallery: [
      { src: "images/passs/01.jpg", wide: true, caption: { en: "Full app overview", vi: "Toàn bộ ứng dụng" } },
      { src: "images/passs/02.jpg", caption: { en: "Splash & sign in", vi: "Splash & đăng nhập" } },
      { src: "images/passs/03.jpg", caption: { en: "Recipe detail", vi: "Chi tiết công thức" } },
    ],
  },
  {
    id: "perfin",
    num: "05",
    tone: "e",                       // a=scarlet  b=vermillion  c=amber  d=crimson  e=rust  f=coral
    title: "PerFin",
    blurb: {
      en: "A personal budgeting app built on real user research and two rounds of usability testing.",
      vi: "Ứng dụng lập ngân sách cá nhân, dựng trên nghiên cứu người dùng thật và hai vòng usability test.",
    },
    tags: {
      en: ["Fintech", "Mobile App", "2025"],
      vi: ["Fintech", "Ứng dụng di động", "2025"],
    },
    desc: {
      en: "PerFin was built for people like Tam — a student juggling cash, bank cards and e-wallets who tracks spending by hand in Notes and Excel. The team ran a full research cycle, then tested two wireframe rounds with 5 outside users, fixing concrete friction: a forced bank-link step with no way to skip, a budget screen with no save confirmation, no way to scan a receipt.",
      vi: "PerFin được thiết kế cho những người như Tâm — sinh viên xoay xở giữa tiền mặt, thẻ ngân hàng và ví điện tử, vẫn ghi chi tiêu thủ công bằng Notes và Excel. Nhóm thực hiện trọn quy trình nghiên cứu, rồi test 2 vòng wireframe với 5 người dùng ngoài nhóm, sửa những điểm vướng cụ thể: bước liên kết ngân hàng bắt buộc không có nút bỏ qua, màn hình ngân sách không có xác nhận lưu, không quét được hóa đơn.",
    },
    meta: {
      Role: { en: "Research support & UI Design", vi: "Hỗ trợ nghiên cứu & Thiết kế UI" },
      Timeline: { en: "TBD — update timeline", vi: "TBD — cập nhật thời gian" },
      Context: { en: "University group project", vi: "Bài tập nhóm — môn học" },
      Team: { en: "4 students", vi: "4 sinh viên" },
      Platform: "Mobile app",
      Tools: "Figma",
    },
    outcome: {
      en: ["Usability testing with 5 users surfaced concrete friction — forced bank-linking, no save confirmation, no receipt scan — each fixed in wireframe v2", "Delivered two full wireframe iterations plus a complete design system: colour tokens, type scale, and a working Figma prototype"],
      vi: ["Usability test với 5 người dùng phát hiện các điểm vướng cụ thể — bị ép liên kết ngân hàng, không xác nhận lưu, không quét được hóa đơn — mỗi lỗi đều được sửa ở wireframe v2", "Hoàn thành 2 vòng lặp wireframe cùng design system đầy đủ: token màu, type scale, và prototype Figma chạy được"],
    },
    links: [
      { label: { en: "Figma prototype", vi: "Prototype Figma" }, href: "https://www.figma.com/proto/1q2tJRPiGmD54h7IRcj35W/ADT401-final?node-id=539-26199&viewport=-4042%2C-12231%2C0.52&t=a0lNRjCk2H9OcxvY-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=539%3A26199&show-proto-sidebar=1&page-id=0%3A1" },
      { label: { en: "Demo video", vi: "Video demo" }, href: "https://youtu.be/hozZW3_spKo" },
    ],
    cover: "images/perfin/cover.jpg",
    gallery: [
      { src: "images/perfin/01.jpg", wide: true, caption: { en: "Home, notifications & transactions", vi: "Trang chủ, thông báo & giao dịch" } },
      { src: "images/perfin/02.jpg", caption: { en: "Budget, goals & analytics", vi: "Ngân sách, mục tiêu & phân tích" } },
      { src: "images/perfin/03.jpg", caption: { en: "Guided goal setup", vi: "Thiết lập mục tiêu có hướng dẫn" } },
    ],
  },
  {
    id: "nocturne",
    num: "06",
    tone: "f",                       // a=scarlet  b=vermillion  c=amber  d=crimson  e=rust  f=coral
    title: "Nocturne",
    blurb: {
      en: "A community-driven discovery app for indie music, built for listeners who want to find artists before they're trending.",
      vi: "Ứng dụng khám phá nhạc indie dựa vào cộng đồng, dành cho người muốn tìm nghệ sĩ trước khi họ nổi.",
    },
    tags: {
      en: ["Music", "Mobile App", "2025"],
      vi: ["Âm nhạc", "Ứng dụng di động", "2025"],
    },
    desc: {
      en: "Nocturne was designed for listeners like Diego — someone tired of algorithms that keep pushing the same big-label tracks. Instead of top-down recommendations, the app builds discovery around the community itself: artist and label pages with real production credits, a Smart Packager that bundles songs into shareable playlists, and an early-finder badge for surfacing hidden gems before they trend.",
      vi: "Nocturne được thiết kế cho những người nghe như Diego — chán các thuật toán chỉ đẩy nhạc hãng lớn lặp đi lặp lại. Thay vì gợi ý áp đặt từ trên xuống, app xây dựng việc khám phá quanh chính cộng đồng: trang nghệ sĩ/label có thông tin sản xuất thật, Smart Packager gom bài hát thành playlist chia sẻ được, và huy hiệu “early finder” cho người tìm ra viên ngọc ẩn trước khi nó nổi.",
    },
    meta: {
      Role: { en: "Research support & UI Design", vi: "Hỗ trợ nghiên cứu & Thiết kế UI" },
      Timeline: { en: "15 weeks — 2025", vi: "15 tuần — 2025" },
      Context: { en: "University group project", vi: "Bài tập nhóm — môn học" },
      Team: { en: "4 students", vi: "4 sinh viên" },
      Platform: "Mobile app",
      Tools: "Figma",
    },
    outcome: {
      en: ["Delivered a complete high-fi UI kit across 13 screen groups — auth, home, search, community, library, artist & label detail, profile", "Defined a full dark-UI design system: colour tokens, Poppins type scale, component library and moodboard"],
      vi: ["Hoàn thành bộ UI high-fi đầy đủ 13 nhóm màn hình — đăng nhập, trang chủ, tìm kiếm, cộng đồng, thư viện, chi tiết nghệ sĩ & label, hồ sơ", "Xây dựng trọn design system dark UI: token màu, type scale Poppins, thư viện component và moodboard"],
    },
    links: [
      { label: { en: "Figma prototype", vi: "Prototype Figma" }, href: "https://www.figma.com/proto/oRGE6Vf4O8HFb1zvJoTxuv/ADH?page-id=1%3A48634&node-id=675-28540&viewport=-2769%2C3686%2C0.18&t=NrS9xoezZToZjdfH-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=675%3A28540" },
    ],
    cover: "images/nocturne/cover.jpg",
    gallery: [
      { src: "images/nocturne/01.jpg", wide: true, caption: { en: "Home, community & player", vi: "Trang chủ, cộng đồng & trình phát" } },
      { src: "images/nocturne/02.jpg", wide: true, caption: { en: "Now playing, library & artist", vi: "Đang phát, thư viện & nghệ sĩ" } },
      { src: "images/nocturne/03.jpg", wide: true, caption: { en: "Moodboard & design system", vi: "Moodboard & design system" } },
    ],
  },
];
