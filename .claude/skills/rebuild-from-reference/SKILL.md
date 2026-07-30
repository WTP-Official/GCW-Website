---
name: rebuild-from-reference
description: Xây dựng lại gần như toàn bộ website tham chiếu cho một thương hiệu demo mới — clone cấu trúc ở mức toàn site (mọi trang, mọi route, điều hướng, bố cục, thứ tự các phần, cấu trúc ưu đãi và chiến lược chuyển đổi) VÀ phong cách hình ảnh (bảng màu/theme, cặp font chữ, độ bo góc, mật độ khoảng cách, tông giọng thiết kế) của trang tham chiếu, mà không sao chép tên thương hiệu, logo, văn bản, hình ảnh hay bất kỳ tài sản có bản quyền nào khác của website đó. Với các trang dạng danh sách có phân trang (blog, tin tức, sản phẩm...), chỉ clone 1 trang con mẫu làm template cho tính năng đó, không lặp lại toàn bộ danh sách bài/entry gốc. Dùng khi người dùng yêu cầu "rebuild this site", "clone the layout of X", "build a demo based on this landing page", hoặc tương tự.
---

# Xây Dựng Lại Từ Tham Chiếu (Rebuild From Reference)

Tái tạo lại *cấu trúc* **và** *phong cách hình ảnh* của một website tham chiếu ở mức gần như toàn site — không chỉ một trang landing đơn lẻ, mà toàn bộ điều hướng, tất cả các loại trang (trang chủ, trang con, trang danh mục, trang chi tiết...), luồng bố cục, thứ tự các phần, cấu trúc ưu đãi/CTA, chiến lược chuyển đổi, **và theme thị giác** (bảng màu, cặp font chữ, độ bo góc, mật độ khoảng cách, tông giọng thiết kế tổng thể) — cho một thương hiệu demo mới, hoàn toàn nguyên bản trong dự án này. "Lấy cảm hứng" ở đây gần như đồng nghĩa với "clone lại toàn bộ website" về mặt cấu trúc/chức năng/phong cách — chỉ có bản sắc thương hiệu (tên, logo, nội dung thật) là không bao giờ được sao chép.

**Ngoại lệ duy nhất — trang dạng danh sách/phân trang:** nếu trang tham chiếu có những trang liệt kê nhiều entry con cùng loại (ví dụ: danh sách bài viết blog, danh sách sản phẩm, danh sách case study — thường có UI phân trang/tải thêm), thì:
- Trang danh sách (listing page) vẫn được clone đầy đủ như một tính năng: bố cục danh sách, filter/tab nếu có, và cơ chế phân trang.
- Trang chi tiết (detail page) của từng entry con thì **chỉ cần dựng 1 trang mẫu duy nhất** làm template minh hoạ cho tính năng đó (ví dụ 1 bài viết blog mẫu, 1 trang chi tiết sản phẩm mẫu) — không cần, và không nên, dựng lại một-một cho từng entry thật có trên trang gốc.

## Các bước thực hiện

1. **Lấy URL trang tham chiếu.** Nếu người dùng chưa cung cấp, hãy hỏi bằng `AskUserQuestion` trước khi làm bất cứ điều gì khác — skill này không thể tiếp tục nếu thiếu URL.

2. **Lấy thông tin thương hiệu demo.** Nếu người dùng chưa nêu rõ trang mới này *dành cho* mục đích gì (tên thương hiệu, ngành/lĩnh vực, sản phẩm hoặc dịch vụ, sở thích về màu sắc/tông giọng), hãy hỏi bằng `AskUserQuestion`. Không được tự bịa ra tên thương hiệu hay sản phẩm/dịch vụ mà người dùng chưa cung cấp hoặc chưa phê duyệt — đây là điều duy nhất tuyệt đối không được tự ý ứng biến.

3. **Hỏi ngôn ngữ chính của website sẽ được build.** Nếu người dùng chưa nói rõ, hãy hỏi bằng `AskUserQuestion` (ví dụ: Tiếng Việt hay Tiếng Anh) trước khi viết bất kỳ nội dung nào. Không được tự mặc định theo ngôn ngữ của trang tham chiếu hay theo ngôn ngữ hội thoại hiện tại — toàn bộ copy, nhãn UI, và `metaDescription` của trang mới phải được viết bằng ngôn ngữ đã xác nhận này.

4. **Khảo sát toàn bộ trang web tham chiếu, không chỉ trang chủ.** Bắt đầu từ điều hướng chính (header nav, footer nav, megamenu nếu có) để lập bản đồ đầy đủ các loại trang tồn tại trên site (trang chủ, about, dịch vụ/sản phẩm, bảng giá, blog/tin tức, case study, liên hệ, v.v.), sau đó dùng `WebFetch` đi theo từng loại trang đó để xác định, thuần túy về mặt cấu trúc:
   - Thứ tự các phần và luồng bố cục của từng loại trang (ví dụ trang chủ: hero → bằng chứng xã hội → lưới tính năng → bảng giá → đánh giá khách hàng → FAQ → CTA cuối cùng)
   - Cấu trúc ưu đãi (cách trình bày giá/gói/combo, những gì được đóng gói chung, các mẫu hình giá neo/giá mồi)
   - Chiến lược chuyển đổi (CTA chính so với CTA phụ, các thủ thuật tạo cảm giác khẩn cấp/khan hiếm, tín hiệu tin cậy, vị trí đặt biểu mẫu, những chỗ được giảm ma sát)
   - Điều hướng và hệ thống phân cấp thông tin (bao gồm cấu trúc URL/route nếu có thể suy ra)
   - Với các trang danh sách/phân trang (blog, tin tức, sản phẩm...): cách hiển thị danh sách (lưới/list, filter, tab), cơ chế phân trang hoặc "tải thêm", và bố cục của MỘT trang chi tiết mẫu đại diện (không cần khảo sát từng entry — 1 ví dụ điển hình là đủ để nắm cấu trúc trang chi tiết)

   Đồng thời ghi chú lại **phong cách hình ảnh (visual style)** của trang tham chiếu để tái hiện ở bước xây dựng, cụ thể:
   - **Bảng màu**: màu chủ đạo, màu nhấn/CTA, màu nền (sáng/tối/trung tính), mức độ tương phản — mô tả bằng tên màu hoặc mã hex ước lượng, không cần chính xác tuyệt đối.
   - **Typography**: kiểu chữ tiêu đề so với phần thân (serif/sans-serif, đậm/nhẹ, cỡ chữ tương đối), có phải là một cặp font đặc trưng (ví dụ tiêu đề dùng font riêng, thân dùng font khác) hay không.
   - **Ngôn ngữ hình khối**: độ bo góc (vuông/bo nhẹ/bo tròn nhiều), độ dùng bóng đổ (shadow) nhiều hay phẳng (flat), mật độ khoảng trắng (thoáng hay dày đặc), phong cách nút bấm/thẻ (pill, rounded-rect, outline...).
   - **Tông giọng thiết kế tổng thể**: trang trọng/doanh nghiệp, tối giản/hiện đại, ấm áp/thân thiện, táo bạo/nổi bật, v.v.

   Chỉ ghi chú về mặt cấu trúc và phong cách hình ảnh — không sao chép tiêu đề, nội dung văn bản, tên sản phẩm, khẩu hiệu, và không lưu/tham chiếu hình ảnh hay logo thật từ trang web đó. Phông chữ cụ thể (font family) có thể được ghi nhận và tái hiện bằng một font thay thế được cấp phép tự do có phong cách tương đồng (ví dụ qua Google Fonts) — không bao giờ tải hay nhúng file font độc quyền của trang tham chiếu.

5. **Loại bỏ toàn bộ những gì thuộc về thương hiệu gốc.** Trước khi viết bất kỳ đoạn code nào, hãy chủ động loại bỏ: tên thương hiệu, logo, câu chữ nguyên văn, tên sản phẩm/tính năng, hình ảnh, và bất kỳ tài sản có bản quyền hay nhãn hiệu nào khác của trang tham chiếu. Chỉ có *hình dạng* của trang được giữ lại — thứ tự các phần, các mẫu bố cục, và cơ chế chuyển đổi.

6. **Áp dụng phong cách hình ảnh của trang tham chiếu vào bộ quy ước kỹ thuật hiện có của dự án này** — tức là *theme* (màu sắc, font, bo góc, khoảng cách, tông giọng) đi theo trang tham chiếu, còn *cách hiện thực* (component pattern, cấu trúc file, kỹ thuật ảnh) vẫn đi theo quy ước sẵn có của dự án. Đây là dự án Next.js (App Router) + TypeScript + Tailwind CSS v4 sử dụng `lucide-react` cho icon. Trước khi xây dựng:
   - Kiểm tra `src/app/` để xem các trang hiện đang được cấu tạo như thế nào (ví dụ: `page.tsx` import các component phần từ thư mục `_components` cục bộ) và làm theo cùng mẫu đó cho bất kỳ trang mới nào.
   - **Cập nhật token theme trong `src/app/globals.css`** (khối `@theme` của Tailwind v4: `--color-brand-*`, `--color-*` khác, `--font-sans`...) để phản ánh bảng màu và mức độ bo góc/khoảng cách đã ghi nhận ở bước 4, thay vì giữ nguyên theme demo mặc định hiện có của dự án.
   - **Đổi font chữ** trong `src/app/layout.tsx` (hiện đang dùng `next/font/google` với font Roboto) sang một font Google Fonts có phong cách gần nhất với cặp font tiêu đề/thân đã quan sát được ở trang tham chiếu — không bao giờ tải hay nhúng file font độc quyền thật của trang tham chiếu.
   - Tuân theo quy tắc về hình ảnh trong `AGENTS.md` ở thư mục gốc dự án: luôn dùng `next/image` (không bao giờ dùng `<img>`), dùng `fill` + wrapper có `position` và `overflow-hidden` cho ảnh có kích thước theo CSS kèm `sizes`, dùng `width`/`height` tường minh cho ảnh kích thước cố định, và chỉ dùng `priority` cho ảnh hero nằm phía trên màn hình đầu tiên (above-the-fold).
   - Nếu trang sẽ được index (có route riêng dưới `app/_data/pages/*.json` hoặc tương tự theo `AGENTS.md`), hãy đặt cho nó một `metaDescription` riêng biệt, thật, viết bằng ngôn ngữ đã xác nhận ở bước 3 — không được để trống hoặc trùng lặp với trang khác.
   - Tái sử dụng các component/quy ước cấu trúc chung đã có sẵn trong codebase (co-location `content.json`, mẫu `_components`...) thay vì tạo ra một hệ thống mới — chỉ token theme và font là được điều chỉnh theo trang tham chiếu.

7. **Xây dựng lại toàn bộ site** theo luồng cấu trúc và điều hướng của trang tham chiếu — mỗi loại trang đã khảo sát ở bước 4 đều có một route tương ứng trong dự án này — nhưng với nội dung 100% nguyên bản cho thương hiệu demo, viết bằng ngôn ngữ đã xác nhận ở bước 3: văn bản gốc (viết mới hoàn toàn, không diễn giải lại từng dòng từ trang tham chiếu), tên thương hiệu/sản phẩm do người dùng cung cấp, và dùng hình ảnh giữ chỗ (khối màu đơn sắc, icon `lucide-react`, hoặc ảnh stock được nêu rõ là miễn phí bản quyền) hoặc tài sản do người dùng cung cấp. Không bao giờ tải, lấy, hay tham chiếu hình ảnh/logo thật của trang tham chiếu.

   Với các trang dạng danh sách/phân trang: dựng đầy đủ trang danh sách (kèm phân trang/filter như bản gốc) với một bộ entry mẫu vừa đủ để minh hoạ (không cần nhiều bằng số lượng thật trên trang gốc), rồi chỉ dựng **một** trang chi tiết mẫu dùng chung route động (ví dụ `news/[slug]`) làm template cho toàn bộ entry — đúng theo quy ước route động đã có trong dự án (xem `news/[slug]` hiện tại làm ví dụ tham khảo).

8. **Xác nhận phạm vi trước khi xây dựng quy mô lớn.** Vì phạm vi mặc định của skill này là toàn site, hãy liệt kê ngắn gọn danh sách trang/route dự kiến dựng lại (rút ra từ bước khảo sát) **và** tóm tắt ngắn gọn theme thị giác dự kiến áp dụng (bảng màu, font, độ bo góc/khoảng cách) rồi xác nhận với người dùng trước khi bắt đầu tạo hàng loạt — đặc biệt nêu rõ trang nào sẽ áp dụng ngoại lệ "chỉ 1 trang chi tiết mẫu" — thay vì tự cho rằng toàn bộ luồng đều được mong muốn.

## Rào chắn an toàn (Guardrails)

- Không bao giờ sao chép: tên thương hiệu, logo, văn bản/nội dung nguyên văn, hình ảnh, tên sản phẩm, hoặc bất kỳ tài sản nào khác có thể có bản quyền hoặc nhãn hiệu từ trang web tham chiếu.
- Trang tham chiếu dùng để **clone lại cấu trúc/chức năng VÀ phong cách hình ảnh ở mức toàn site** (mọi loại trang, điều hướng, bố cục, bảng màu, font, tông giọng thiết kế). Đây là skill duy nhất được phép tái hiện phong cách nguyên văn của một tham chiếu — khác với quy ước toàn cục mặc định của người dùng (vốn chỉ coi ảnh chụp UI tham chiếu là cảm hứng bố cục/chức năng, giữ nguyên style của app hiện có); trong phạm vi skill này, theme thị giác của trang tham chiếu được chủ động tái hiện. "Toàn site" không có nghĩa là clone một-một từng entry của các trang danh sách (blog, sản phẩm...) — với nhóm này chỉ cần 1 trang chi tiết mẫu làm template, xem bước 7.
- Ranh giới không được vượt qua dù đang tái hiện phong cách: không sao chép font độc quyền dưới dạng file thật, không dùng đúng logo/biểu tượng thương hiệu, không tái hiện các chi tiết trade dress mang tính nhận diện thương hiệu quá đặc trưng (ví dụ một tông màu gắn liền danh tính thương hiệu nổi tiếng) — chỉ tái hiện phong cách ở mức tổng quát (bảng màu tương đồng, phong cách typography tương đồng, ngôn ngữ hình khối tương đồng).
- Luôn xây dựng lại cho thương hiệu demo của riêng người dùng — hỏi nếu chưa có thông tin thương hiệu; không tự động mặc định tái sử dụng bản sắc của trang tham chiếu "cho mục đích giữ chỗ."
- Luôn xác nhận ngôn ngữ chính của website trước khi viết nội dung — không tự mặc định theo ngôn ngữ của trang tham chiếu hay ngôn ngữ hội thoại.
- Nếu trang tham chiếu yêu cầu đăng nhập/trả phí hoặc không thể lấy được cấu trúc của nó, hãy báo cho người dùng biết thay vì đoán mò bố cục.
