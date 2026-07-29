---
name: rebuild-from-reference
description: Xây dựng lại gần như toàn bộ website tham chiếu cho một thương hiệu demo mới — clone cấu trúc ở mức toàn site (mọi trang, mọi route, điều hướng, bố cục, thứ tự các phần, cấu trúc ưu đãi và chiến lược chuyển đổi) mà không sao chép tên thương hiệu, logo, văn bản, hình ảnh hay bất kỳ tài sản có bản quyền nào khác của website đó. Với các trang dạng danh sách có phân trang (blog, tin tức, sản phẩm...), chỉ clone 1 trang con mẫu làm template cho tính năng đó, không lặp lại toàn bộ danh sách bài/entry gốc. Dùng khi người dùng yêu cầu "rebuild this site", "clone the layout of X", "build a demo based on this landing page", hoặc tương tự.
---

# Xây Dựng Lại Từ Tham Chiếu (Rebuild From Reference)

Tái tạo lại *cấu trúc* của một website tham chiếu ở mức gần như toàn site — không chỉ một trang landing đơn lẻ, mà toàn bộ điều hướng, tất cả các loại trang (trang chủ, trang con, trang danh mục, trang chi tiết...), luồng bố cục, thứ tự các phần, cấu trúc ưu đãi/CTA, và chiến lược chuyển đổi — cho một thương hiệu demo mới, hoàn toàn nguyên bản trong dự án này. "Lấy cảm hứng" ở đây gần như đồng nghĩa với "clone lại toàn bộ website" về mặt cấu trúc/chức năng — chỉ có bản sắc thương hiệu và nội dung thật là không bao giờ được sao chép.

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

   Chỉ ghi chú về mặt cấu trúc — không sao chép tiêu đề, nội dung văn bản, tên sản phẩm, khẩu hiệu, và không lưu/tham chiếu hình ảnh hay logo thật từ trang web đó.

5. **Loại bỏ toàn bộ những gì thuộc về thương hiệu gốc.** Trước khi viết bất kỳ đoạn code nào, hãy chủ động loại bỏ: tên thương hiệu, logo, câu chữ nguyên văn, tên sản phẩm/tính năng, hình ảnh, và bất kỳ tài sản có bản quyền hay nhãn hiệu nào khác của trang tham chiếu. Chỉ có *hình dạng* của trang được giữ lại — thứ tự các phần, các mẫu bố cục, và cơ chế chuyển đổi.

6. **Tuân theo quy ước hiện có của dự án này, không phải phong cách của trang tham chiếu.** Đây là dự án Next.js (App Router) + TypeScript + Tailwind CSS v4 sử dụng `lucide-react` cho icon. Trước khi xây dựng:
   - Kiểm tra `src/app/` để xem các trang hiện đang được cấu tạo như thế nào (ví dụ: `page.tsx` import các component phần từ thư mục `_components` cục bộ) và làm theo cùng mẫu đó cho bất kỳ trang mới nào.
   - Tuân theo quy tắc về hình ảnh trong `AGENTS.md` ở thư mục gốc dự án: luôn dùng `next/image` (không bao giờ dùng `<img>`), dùng `fill` + wrapper có `position` và `overflow-hidden` cho ảnh có kích thước theo CSS kèm `sizes`, dùng `width`/`height` tường minh cho ảnh kích thước cố định, và chỉ dùng `priority` cho ảnh hero nằm phía trên màn hình đầu tiên (above-the-fold).
   - Nếu trang sẽ được index (có route riêng dưới `app/_data/pages/*.json` hoặc tương tự theo `AGENTS.md`), hãy đặt cho nó một `metaDescription` riêng biệt, thật, viết bằng ngôn ngữ đã xác nhận ở bước 3 — không được để trống hoặc trùng lặp với trang khác.
   - Tái sử dụng các component/quy ước styling chung đã có sẵn trong codebase thay vì tạo ra một hệ thống hình ảnh mới.

7. **Xây dựng lại toàn bộ site** theo luồng cấu trúc và điều hướng của trang tham chiếu — mỗi loại trang đã khảo sát ở bước 4 đều có một route tương ứng trong dự án này — nhưng với nội dung 100% nguyên bản cho thương hiệu demo, viết bằng ngôn ngữ đã xác nhận ở bước 3: văn bản gốc (viết mới hoàn toàn, không diễn giải lại từng dòng từ trang tham chiếu), tên thương hiệu/sản phẩm do người dùng cung cấp, và dùng hình ảnh giữ chỗ (khối màu đơn sắc, icon `lucide-react`, hoặc ảnh stock được nêu rõ là miễn phí bản quyền) hoặc tài sản do người dùng cung cấp. Không bao giờ tải, lấy, hay tham chiếu hình ảnh/logo thật của trang tham chiếu.

   Với các trang dạng danh sách/phân trang: dựng đầy đủ trang danh sách (kèm phân trang/filter như bản gốc) với một bộ entry mẫu vừa đủ để minh hoạ (không cần nhiều bằng số lượng thật trên trang gốc), rồi chỉ dựng **một** trang chi tiết mẫu dùng chung route động (ví dụ `news/[slug]`) làm template cho toàn bộ entry — đúng theo quy ước route động đã có trong dự án (xem `news/[slug]` hiện tại làm ví dụ tham khảo).

8. **Xác nhận phạm vi trước khi xây dựng quy mô lớn.** Vì phạm vi mặc định của skill này là toàn site, hãy liệt kê ngắn gọn danh sách trang/route dự kiến dựng lại (rút ra từ bước khảo sát) và xác nhận với người dùng trước khi bắt đầu tạo hàng loạt — đặc biệt nêu rõ trang nào sẽ áp dụng ngoại lệ "chỉ 1 trang chi tiết mẫu" — thay vì tự cho rằng toàn bộ luồng đều được mong muốn.

## Rào chắn an toàn (Guardrails)

- Không bao giờ sao chép: tên thương hiệu, logo, văn bản/nội dung nguyên văn, hình ảnh, tên sản phẩm, hoặc bất kỳ tài sản nào khác có thể có bản quyền hoặc nhãn hiệu từ trang web tham chiếu.
- Trang tham chiếu dùng để **clone lại cấu trúc/chức năng ở mức toàn site** (mọi loại trang, điều hướng, bố cục) — xử lý nó giống như cách xử lý ảnh chụp màn hình UI tham chiếu theo quy ước toàn cục của người dùng (cảm hứng cho bố cục/chức năng, không phải phong cách nguyên văn). "Toàn site" không có nghĩa là clone một-một từng entry của các trang danh sách (blog, sản phẩm...) — với nhóm này chỉ cần 1 trang chi tiết mẫu làm template, xem bước 7.
- Luôn xây dựng lại cho thương hiệu demo của riêng người dùng — hỏi nếu chưa có thông tin thương hiệu; không tự động mặc định tái sử dụng bản sắc của trang tham chiếu "cho mục đích giữ chỗ."
- Luôn xác nhận ngôn ngữ chính của website trước khi viết nội dung — không tự mặc định theo ngôn ngữ của trang tham chiếu hay ngôn ngữ hội thoại.
- Nếu trang tham chiếu yêu cầu đăng nhập/trả phí hoặc không thể lấy được cấu trúc của nó, hãy báo cho người dùng biết thay vì đoán mò bố cục.
