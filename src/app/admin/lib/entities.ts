export type FieldType =
  | "text"
  | "textarea"
  | "richtext"
  | "select"
  | "tags"
  | "image"
  | "url"
  | "datetime-local";

export type FieldConfig = {
  key: string;
  label: string;
  type: FieldType;
  options?: string[];
  placeholder?: string;
  optional?: boolean;
};

export type EntityConfig = {
  slug: string;
  label: string;
  description: string;
  /** Path to the route's content.json, relative to src/app/(pages)/. */
  contentFile: string;
  /**
   * "list" (default): itemsKey holds an array of records, editable via
   * add/edit/delete. "singleton": itemsKey holds a single object with no
   * id — only one edit form, no add/delete.
   */
  mode?: "list" | "singleton";
  /** Key within that content.json holding this entity's item array (or object, for mode: "singleton"). */
  itemsKey: string;
  publicHref: string;
  fields: FieldConfig[];
};

const PILLARS = ["Phát triển lãnh đạo", "Xây dựng văn hoá tin cậy", "Tạo kết quả đột phá"];
const EVENT_FORMATS = ["Online", "Offline", "Kết hợp (Online & Offline)"];

export const ENTITIES: EntityConfig[] = [
  {
    slug: "tai-nguyen-upcoming",
    label: "Tài nguyên — Định dạng (trang hub)",
    description: "Danh sách 6 định dạng tài nguyên hiển thị ở /tai-nguyen",
    contentFile: "tai-nguyen/content.json",
    itemsKey: "items",
    publicHref: "/tai-nguyen",
    fields: [
      { key: "icon", label: "Icon (tên Lucide)", type: "text", placeholder: "BookOpen" },
      { key: "title", label: "Tiêu đề", type: "text" },
      { key: "image", label: "Hình ảnh", type: "image" },
      { key: "description", label: "Mô tả", type: "textarea" },
      { key: "href", label: "Đường dẫn trang", type: "text", placeholder: "/tai-nguyen/sach" },
    ],
  },
  {
    slug: "tai-nguyen-sach",
    label: "Sách & Ấn phẩm",
    description: "Danh sách sách hiển thị ở /tai-nguyen/sach",
    contentFile: "tai-nguyen/sach/content.json",
    itemsKey: "items",
    publicHref: "/tai-nguyen/sach",
    fields: [
      { key: "eyebrow", label: "Chủ đề", type: "select", options: PILLARS },
      { key: "title", label: "Tiêu đề sách", type: "text" },
      { key: "image", label: "Ảnh bìa", type: "image" },
      { key: "description", label: "Mô tả", type: "textarea" },
      {
        key: "downloadUrl",
        label: "Đường dẫn tải ấn phẩm",
        type: "url",
        placeholder: "https://...",
        optional: true,
      },
      { key: "body", label: "Nội dung chi tiết (trang riêng)", type: "richtext", optional: true },
    ],
  },
  {
    slug: "tai-nguyen-sach-featured",
    label: "Sách & Ấn phẩm — Ấn phẩm nổi bật",
    description: "Card ấn phẩm nổi bật hiển thị ở đầu /tai-nguyen/sach",
    contentFile: "tai-nguyen/sach/content.json",
    mode: "singleton",
    itemsKey: "featured",
    publicHref: "/tai-nguyen/sach",
    fields: [
      { key: "title", label: "Tiêu đề", type: "text" },
      { key: "description", label: "Mô tả", type: "textarea" },
      { key: "ctaLabel", label: "Nhãn nút", type: "text" },
      { key: "ctaHref", label: "Đường dẫn nút", type: "text" },
    ],
  },
  {
    slug: "tai-nguyen-cam-nang-tools",
    label: "Cẩm nang — Công cụ tự đánh giá",
    description: "3 công cụ tương tác hiển thị ở đầu /tai-nguyen/cam-nang",
    contentFile: "tai-nguyen/cam-nang/content.json",
    itemsKey: "tools",
    publicHref: "/tai-nguyen/cam-nang",
    fields: [
      { key: "title", label: "Tên công cụ", type: "text" },
      { key: "image", label: "Hình ảnh", type: "image" },
      { key: "description", label: "Mô tả", type: "textarea" },
      { key: "ctaLabel", label: "Nhãn nút", type: "text" },
      { key: "ctaHref", label: "Đường dẫn nút", type: "text" },
    ],
  },
  {
    slug: "tai-nguyen-cam-nang-items",
    label: "Cẩm nang — Checklist theo chủ đề",
    description: "Danh sách cẩm nang/checklist ở /tai-nguyen/cam-nang, nhóm theo 3 chủ đề",
    contentFile: "tai-nguyen/cam-nang/content.json",
    itemsKey: "items",
    publicHref: "/tai-nguyen/cam-nang",
    fields: [
      { key: "category", label: "Chủ đề", type: "select", options: PILLARS },
      { key: "title", label: "Tiêu đề", type: "text" },
      { key: "image", label: "Hình ảnh", type: "image" },
      { key: "description", label: "Mô tả", type: "textarea" },
      {
        key: "fileUrl",
        label: "Đường dẫn tải checklist",
        type: "url",
        placeholder: "https://...",
        optional: true,
      },
    ],
  },
  {
    slug: "tai-nguyen-podcast-series",
    label: "Podcast — Chuỗi",
    description: "Danh sách chuỗi podcast hiển thị ở /tai-nguyen/podcast",
    contentFile: "tai-nguyen/podcast/content.json",
    itemsKey: "series",
    publicHref: "/tai-nguyen/podcast",
    fields: [
      {
        key: "label",
        label: "Loại chuỗi",
        type: "select",
        options: ["Chuỗi định kỳ", "Chuỗi giới hạn"],
      },
      { key: "title", label: "Tên chuỗi", type: "text" },
      { key: "image", label: "Hình ảnh", type: "image" },
      { key: "description", label: "Mô tả", type: "textarea" },
      {
        key: "episodesUrl",
        label: "Đường dẫn nghe (Spotify, Apple Podcasts, RSS...)",
        type: "url",
        placeholder: "https://...",
        optional: true,
      },
      { key: "body", label: "Nội dung chi tiết (trang riêng)", type: "richtext", optional: true },
    ],
  },
  {
    slug: "tai-nguyen-video-items",
    label: "Video theo chủ đề",
    description: "Danh sách video ở /tai-nguyen/video, nhóm theo 3 chủ đề",
    contentFile: "tai-nguyen/video/content.json",
    itemsKey: "items",
    publicHref: "/tai-nguyen/video",
    fields: [
      { key: "category", label: "Chủ đề", type: "select", options: PILLARS },
      { key: "title", label: "Tiêu đề", type: "text" },
      { key: "image", label: "Hình ảnh", type: "image" },
      { key: "description", label: "Mô tả", type: "textarea" },
      {
        key: "videoUrl",
        label: "Đường dẫn video (YouTube, Vimeo...)",
        type: "url",
        placeholder: "https://www.youtube.com/watch?v=...",
        optional: true,
      },
    ],
  },
  {
    slug: "tai-nguyen-ke-hoach-mau",
    label: "Kế hoạch mẫu",
    description: "Danh sách kế hoạch mẫu ở /tai-nguyen/ke-hoach-mau",
    contentFile: "tai-nguyen/ke-hoach-mau/content.json",
    itemsKey: "items",
    publicHref: "/tai-nguyen/ke-hoach-mau",
    fields: [
      { key: "eyebrow", label: "Chủ đề", type: "select", options: PILLARS },
      { key: "title", label: "Tiêu đề", type: "text" },
      { key: "image", label: "Hình ảnh", type: "image" },
      { key: "description", label: "Mô tả", type: "textarea" },
      {
        key: "fileUrl",
        label: "Đường dẫn tải file mẫu (.docx/.xlsx/.pdf)",
        type: "url",
        placeholder: "https://...",
        optional: true,
      },
      { key: "body", label: "Nội dung chi tiết (trang riêng)", type: "richtext", optional: true },
    ],
  },
  {
    slug: "tai-nguyen-hoi-thao-luu-tru-items",
    label: "Hội thảo lưu trữ theo chủ đề",
    description: "Danh sách hội thảo lưu trữ ở /tai-nguyen/hoi-thao-luu-tru, nhóm theo 3 chủ đề",
    contentFile: "tai-nguyen/hoi-thao-luu-tru/content.json",
    itemsKey: "items",
    publicHref: "/tai-nguyen/hoi-thao-luu-tru",
    fields: [
      { key: "category", label: "Chủ đề", type: "select", options: PILLARS },
      { key: "title", label: "Tiêu đề", type: "text" },
      { key: "image", label: "Hình ảnh", type: "image" },
      { key: "description", label: "Mô tả", type: "textarea" },
      {
        key: "recordingUrl",
        label: "Đường dẫn bản ghi webinar",
        type: "url",
        placeholder: "https://...",
        optional: true,
      },
    ],
  },
  {
    slug: "su-kien-categories",
    label: "Sự kiện — Hình thức (trang hub)",
    description: "4 hình thức sự kiện hiển thị ở /su-kien",
    contentFile: "su-kien/content.json",
    itemsKey: "categories",
    publicHref: "/su-kien",
    fields: [
      { key: "icon", label: "Icon (tên Lucide)", type: "text", placeholder: "Radio" },
      { key: "title", label: "Tiêu đề", type: "text" },
      { key: "image", label: "Hình ảnh", type: "image" },
      { key: "description", label: "Mô tả", type: "textarea" },
      {
        key: "href",
        label: "Đường dẫn trang",
        type: "text",
        placeholder: "/su-kien/hoi-thao-truc-tuyen",
      },
    ],
  },
  {
    slug: "su-kien-hoi-thao-truc-tuyen",
    label: "Hội thảo trực tuyến",
    description: "Danh sách webinar ở /su-kien/hoi-thao-truc-tuyen",
    contentFile: "su-kien/hoi-thao-truc-tuyen/content.json",
    itemsKey: "items",
    publicHref: "/su-kien/hoi-thao-truc-tuyen",
    fields: [
      { key: "title", label: "Tiêu đề", type: "text" },
      { key: "image", label: "Hình ảnh", type: "image" },
      { key: "description", label: "Mô tả", type: "textarea" },
      { key: "format", label: "Hình thức", type: "select", options: EVENT_FORMATS },
      { key: "eventDate", label: "Ngày giờ diễn ra", type: "datetime-local", optional: true },
      {
        key: "location",
        label: "Địa điểm / nền tảng",
        type: "text",
        placeholder: "Link Zoom sẽ gửi sau khi đăng ký",
        optional: true,
      },
      { key: "body", label: "Giới thiệu sự kiện (About the Event)", type: "richtext", optional: true },
      {
        key: "speakers",
        label: "Diễn giả nổi bật (mỗi dòng: Tên | Vai trò, tổ chức)",
        type: "textarea",
        placeholder: "Bà Nguyễn Thị Ngân | Trưởng Chi nhánh Hà Nội, InCorp Vietnam",
        optional: true,
      },
      {
        key: "takeaways",
        label: "Những điều bạn sẽ học được (mỗi dòng 1 ý)",
        type: "textarea",
        placeholder: "Lợi thế cạnh tranh của Việt Nam — vì sao doanh nghiệp chọn Việt Nam để mở rộng",
        optional: true,
      },
      {
        key: "audience",
        label: "Đối tượng nên tham dự (mỗi dòng 1 ý)",
        type: "textarea",
        placeholder: "Nhà đầu tư đang tìm hiểu thị trường Việt Nam",
        optional: true,
      },
      {
        key: "registerUrl",
        label: "Đường dẫn đăng ký tham dự",
        type: "url",
        placeholder: "https://...",
        optional: true,
      },
    ],
  },
  {
    slug: "su-kien-hoi-nghi",
    label: "Hội nghị & sự kiện",
    description: "Danh sách hội nghị ở /su-kien/hoi-nghi",
    contentFile: "su-kien/hoi-nghi/content.json",
    itemsKey: "items",
    publicHref: "/su-kien/hoi-nghi",
    fields: [
      { key: "title", label: "Tiêu đề", type: "text" },
      { key: "image", label: "Hình ảnh", type: "image" },
      { key: "description", label: "Mô tả", type: "textarea" },
      { key: "format", label: "Hình thức", type: "select", options: EVENT_FORMATS },
      { key: "eventDate", label: "Ngày giờ diễn ra", type: "datetime-local", optional: true },
      {
        key: "location",
        label: "Địa điểm / nền tảng",
        type: "text",
        placeholder: "Văn phòng GCW, TP.HCM",
        optional: true,
      },
      { key: "body", label: "Giới thiệu sự kiện (About the Event)", type: "richtext", optional: true },
      {
        key: "speakers",
        label: "Diễn giả nổi bật (mỗi dòng: Tên | Vai trò, tổ chức)",
        type: "textarea",
        placeholder: "Bà Nguyễn Thị Ngân | Trưởng Chi nhánh Hà Nội, InCorp Vietnam",
        optional: true,
      },
      {
        key: "takeaways",
        label: "Những điều bạn sẽ học được (mỗi dòng 1 ý)",
        type: "textarea",
        placeholder: "Lợi thế cạnh tranh của Việt Nam — vì sao doanh nghiệp chọn Việt Nam để mở rộng",
        optional: true,
      },
      {
        key: "audience",
        label: "Đối tượng nên tham dự (mỗi dòng 1 ý)",
        type: "textarea",
        placeholder: "Nhà đầu tư đang tìm hiểu thị trường Việt Nam",
        optional: true,
      },
      {
        key: "registerUrl",
        label: "Đường dẫn đăng ký tham dự",
        type: "url",
        placeholder: "https://...",
        optional: true,
      },
    ],
  },
  {
    slug: "su-kien-workshop",
    label: "Workshop nội bộ",
    description: "Danh sách workshop ở /su-kien/workshop",
    contentFile: "su-kien/workshop/content.json",
    itemsKey: "items",
    publicHref: "/su-kien/workshop",
    fields: [
      { key: "title", label: "Tiêu đề", type: "text" },
      { key: "image", label: "Hình ảnh", type: "image" },
      { key: "description", label: "Mô tả", type: "textarea" },
      { key: "format", label: "Hình thức", type: "select", options: EVENT_FORMATS },
      { key: "eventDate", label: "Ngày giờ diễn ra", type: "datetime-local", optional: true },
      {
        key: "location",
        label: "Địa điểm / nền tảng",
        type: "text",
        placeholder: "Tại doanh nghiệp (theo yêu cầu)",
        optional: true,
      },
      {
        key: "duration",
        label: "Thời lượng dự kiến",
        type: "text",
        placeholder: "1 ngày / Nửa ngày",
        optional: true,
      },
      { key: "body", label: "Giới thiệu sự kiện (About the Event)", type: "richtext", optional: true },
      {
        key: "speakers",
        label: "Diễn giả nổi bật (mỗi dòng: Tên | Vai trò, tổ chức)",
        type: "textarea",
        placeholder: "Bà Nguyễn Thị Ngân | Trưởng Chi nhánh Hà Nội, InCorp Vietnam",
        optional: true,
      },
      {
        key: "takeaways",
        label: "Những điều bạn sẽ học được (mỗi dòng 1 ý)",
        type: "textarea",
        placeholder: "Lợi thế cạnh tranh của Việt Nam — vì sao doanh nghiệp chọn Việt Nam để mở rộng",
        optional: true,
      },
      {
        key: "audience",
        label: "Đối tượng nên tham dự (mỗi dòng 1 ý)",
        type: "textarea",
        placeholder: "Nhà đầu tư đang tìm hiểu thị trường Việt Nam",
        optional: true,
      },
      {
        key: "registerUrl",
        label: "Đường dẫn đăng ký tham dự",
        type: "url",
        placeholder: "https://...",
        optional: true,
      },
    ],
  },
  {
    slug: "su-kien-doi-ngu-dien-gia",
    label: "Đội ngũ diễn giả",
    description: "Danh sách diễn giả ở /su-kien/doi-ngu-dien-gia",
    contentFile: "su-kien/doi-ngu-dien-gia/content.json",
    itemsKey: "speakers",
    publicHref: "/su-kien/doi-ngu-dien-gia",
    fields: [
      { key: "name", label: "Tên / vai trò hiển thị", type: "text" },
      { key: "image", label: "Ảnh đại diện", type: "image" },
      { key: "role", label: "Nhóm chuyên môn", type: "select", options: PILLARS },
      { key: "bio", label: "Giới thiệu", type: "textarea" },
      { key: "topics", label: "Chủ đề (phân tách bằng dấu phẩy)", type: "tags" },
      { key: "body", label: "Nội dung chi tiết (trang riêng)", type: "richtext", optional: true },
    ],
  },
];

export function getEntity(slug: string) {
  return ENTITIES.find((entity) => entity.slug === slug);
}
