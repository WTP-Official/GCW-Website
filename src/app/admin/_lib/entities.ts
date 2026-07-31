export type FieldType = "text" | "textarea" | "select" | "tags";

export type FieldConfig = {
  key: string;
  label: string;
  type: FieldType;
  options?: string[];
  placeholder?: string;
};

export type EntityConfig = {
  slug: string;
  label: string;
  description: string;
  dataFile: string;
  publicHref: string;
  fields: FieldConfig[];
};

const PILLARS = ["Tuân thủ lao động", "Vận hành nhân sự", "Chiến lược & tổ chức"];

export const ENTITIES: EntityConfig[] = [
  {
    slug: "tai-nguyen-upcoming",
    label: "Tài nguyên — Định dạng (trang hub)",
    description: "Danh sách 6 định dạng tài nguyên hiển thị ở /tai-nguyen",
    dataFile: "tai-nguyen-upcoming.json",
    publicHref: "/tai-nguyen",
    fields: [
      { key: "icon", label: "Icon (tên Lucide)", type: "text", placeholder: "BookOpen" },
      { key: "title", label: "Tiêu đề", type: "text" },
      { key: "description", label: "Mô tả", type: "textarea" },
      { key: "href", label: "Đường dẫn trang", type: "text", placeholder: "/tai-nguyen/sach" },
    ],
  },
  {
    slug: "tai-nguyen-sach",
    label: "Sách & Ấn phẩm",
    description: "Danh sách sách hiển thị ở /tai-nguyen/sach",
    dataFile: "tai-nguyen-sach.json",
    publicHref: "/tai-nguyen/sach",
    fields: [
      { key: "eyebrow", label: "Chủ đề", type: "select", options: PILLARS },
      { key: "title", label: "Tiêu đề sách", type: "text" },
      { key: "description", label: "Mô tả", type: "textarea" },
    ],
  },
  {
    slug: "tai-nguyen-cam-nang-tools",
    label: "Cẩm nang — Công cụ tự đánh giá",
    description: "3 công cụ tương tác hiển thị ở đầu /tai-nguyen/cam-nang",
    dataFile: "tai-nguyen-cam-nang-tools.json",
    publicHref: "/tai-nguyen/cam-nang",
    fields: [
      { key: "title", label: "Tên công cụ", type: "text" },
      { key: "description", label: "Mô tả", type: "textarea" },
      { key: "ctaLabel", label: "Nhãn nút", type: "text" },
      { key: "ctaHref", label: "Đường dẫn nút", type: "text" },
    ],
  },
  {
    slug: "tai-nguyen-cam-nang-items",
    label: "Cẩm nang — Checklist theo chủ đề",
    description: "Danh sách cẩm nang/checklist ở /tai-nguyen/cam-nang, nhóm theo 3 chủ đề",
    dataFile: "tai-nguyen-cam-nang-items.json",
    publicHref: "/tai-nguyen/cam-nang",
    fields: [
      { key: "category", label: "Chủ đề", type: "select", options: PILLARS },
      { key: "title", label: "Tiêu đề", type: "text" },
      { key: "description", label: "Mô tả", type: "textarea" },
    ],
  },
  {
    slug: "tai-nguyen-podcast-series",
    label: "Podcast — Chuỗi",
    description: "Danh sách chuỗi podcast hiển thị ở /tai-nguyen/podcast",
    dataFile: "tai-nguyen-podcast-series.json",
    publicHref: "/tai-nguyen/podcast",
    fields: [
      {
        key: "label",
        label: "Loại chuỗi",
        type: "select",
        options: ["Chuỗi định kỳ", "Chuỗi giới hạn"],
      },
      { key: "title", label: "Tên chuỗi", type: "text" },
      { key: "description", label: "Mô tả", type: "textarea" },
    ],
  },
  {
    slug: "tai-nguyen-video-items",
    label: "Video theo chủ đề",
    description: "Danh sách video ở /tai-nguyen/video, nhóm theo 3 chủ đề",
    dataFile: "tai-nguyen-video-items.json",
    publicHref: "/tai-nguyen/video",
    fields: [
      { key: "category", label: "Chủ đề", type: "select", options: PILLARS },
      { key: "title", label: "Tiêu đề", type: "text" },
      { key: "description", label: "Mô tả", type: "textarea" },
    ],
  },
  {
    slug: "tai-nguyen-ke-hoach-mau",
    label: "Kế hoạch mẫu",
    description: "Danh sách kế hoạch mẫu ở /tai-nguyen/ke-hoach-mau",
    dataFile: "tai-nguyen-ke-hoach-mau.json",
    publicHref: "/tai-nguyen/ke-hoach-mau",
    fields: [
      { key: "eyebrow", label: "Chủ đề", type: "select", options: PILLARS },
      { key: "title", label: "Tiêu đề", type: "text" },
      { key: "description", label: "Mô tả", type: "textarea" },
    ],
  },
  {
    slug: "tai-nguyen-hoi-thao-luu-tru-items",
    label: "Hội thảo lưu trữ theo chủ đề",
    description: "Danh sách hội thảo lưu trữ ở /tai-nguyen/hoi-thao-luu-tru, nhóm theo 3 chủ đề",
    dataFile: "tai-nguyen-hoi-thao-luu-tru-items.json",
    publicHref: "/tai-nguyen/hoi-thao-luu-tru",
    fields: [
      { key: "category", label: "Chủ đề", type: "select", options: PILLARS },
      { key: "title", label: "Tiêu đề", type: "text" },
      { key: "description", label: "Mô tả", type: "textarea" },
    ],
  },
  {
    slug: "su-kien-categories",
    label: "Sự kiện — Hình thức (trang hub)",
    description: "4 hình thức sự kiện hiển thị ở /su-kien",
    dataFile: "su-kien-categories.json",
    publicHref: "/su-kien",
    fields: [
      { key: "icon", label: "Icon (tên Lucide)", type: "text", placeholder: "Radio" },
      { key: "title", label: "Tiêu đề", type: "text" },
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
    dataFile: "su-kien-hoi-thao-truc-tuyen.json",
    publicHref: "/su-kien/hoi-thao-truc-tuyen",
    fields: [
      { key: "title", label: "Tiêu đề", type: "text" },
      { key: "description", label: "Mô tả", type: "textarea" },
      {
        key: "meta",
        label: "Nhãn phụ (định dạng · thời gian)",
        type: "text",
        placeholder: "Webinar · Dự kiến Quý 3/2026",
      },
    ],
  },
  {
    slug: "su-kien-hoi-nghi",
    label: "Hội nghị & sự kiện",
    description: "Danh sách hội nghị ở /su-kien/hoi-nghi",
    dataFile: "su-kien-hoi-nghi.json",
    publicHref: "/su-kien/hoi-nghi",
    fields: [
      { key: "title", label: "Tiêu đề", type: "text" },
      { key: "description", label: "Mô tả", type: "textarea" },
      { key: "meta", label: "Nhãn phụ (định dạng · thời gian)", type: "text" },
    ],
  },
  {
    slug: "su-kien-workshop",
    label: "Workshop nội bộ",
    description: "Danh sách workshop ở /su-kien/workshop",
    dataFile: "su-kien-workshop.json",
    publicHref: "/su-kien/workshop",
    fields: [
      { key: "title", label: "Tiêu đề", type: "text" },
      { key: "description", label: "Mô tả", type: "textarea" },
      { key: "meta", label: "Nhãn phụ (thời lượng)", type: "text" },
    ],
  },
  {
    slug: "su-kien-doi-ngu-dien-gia",
    label: "Đội ngũ diễn giả",
    description: "Danh sách diễn giả ở /su-kien/doi-ngu-dien-gia",
    dataFile: "su-kien-doi-ngu-dien-gia.json",
    publicHref: "/su-kien/doi-ngu-dien-gia",
    fields: [
      { key: "name", label: "Tên / vai trò hiển thị", type: "text" },
      { key: "role", label: "Nhóm chuyên môn", type: "select", options: PILLARS },
      { key: "bio", label: "Giới thiệu", type: "textarea" },
      { key: "topics", label: "Chủ đề (phân tách bằng dấu phẩy)", type: "tags" },
    ],
  },
];

export function getEntity(slug: string) {
  return ENTITIES.find((entity) => entity.slug === slug);
}
