/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Award, 
  Users, 
  Clock, 
  ShieldCheck, 
  Check, 
  ArrowRight, 
  Calculator, 
  ChevronDown, 
  X, 
  Menu, 
  Scale, 
  Briefcase, 
  FileText, 
  HelpCircle, 
  Calendar, 
  Coins, 
  CheckCircle2, 
  TrendingUp, 
  MessageSquare,
  ChevronRight,
  ShieldAlert,
  Map,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Types for Application layout
interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  timeframe: string;
  priceEstimate: string;
  deliverables: string[];
  iconName: "scale" | "briefcase" | "fileText" | "award";
}

interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  items: ServiceItem[];
}

export default function App() {
  // Navigation & UI States
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("setup");
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);
  const [consultationSubmitted, setConsultationSubmitted] = useState(false);
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(0);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<string>("Thành lập doanh nghiệp mới");

  // User details for consultation form
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientMessage, setClientMessage] = useState("");
  const [formValidationMsg, setFormValidationMsg] = useState("");

  // interactive Cost Estimator widget state
  const [province, setProvince] = useState<string>("Hồ Chí Minh");
  const [capitalSize, setCapitalSize] = useState<number>(100); // in Million VND
  const [includeDigitalSignature, setIncludeDigitalSignature] = useState(true);
  const [includeEInvoice, setIncludeEInvoice] = useState(true);
  const [includeTaxSetup, setIncludeTaxSetup] = useState(true);
  const [includeTrademark, setIncludeTrademark] = useState(false);

  // Newsletter states
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Constants
  const SERVICES_DATA: ServiceCategory[] = [
    {
      id: "setup",
      name: "Thành Lập Doanh Nghiệp",
      icon: "Scale",
      items: [
        {
          id: "tl-01",
          title: "Thành lập Công ty TNHH 1 Thành Viên",
          shortDesc: "Phù hợp nhất cho cá nhân tự quản lý kinh doanh, chịu trách nhiệm giới hạn.",
          longDesc: "Dịch vụ đồng hành trọn gói từ soạn hồ sơ, nộp Sở Kế hoạch và Đầu tư, khắc con dấu và trả kết quả tận nhà trong vòng 3 làm việc. Giúp chủ doanh nghiệp tối ưu thuế và bảo vệ tài sản cá nhân an toàn.",
          timeframe: "3 - 5 ngày làm việc",
          priceEstimate: "Chỉ từ 1.200.000 VNĐ",
          deliverables: [
            "Giấy chứng nhận đăng ký doanh nghiệp (Mã số thuế)",
            "Con dấu tròn pháp nhân chất lượng cao",
            "Đăng bố cáo thành lập trên Cổng thông tin quốc gia",
            "Hồ sơ nội bộ công ty (Điều lệ, Danh sách sáng lập)"
          ],
          iconName: "scale"
        },
        {
          id: "tl-02",
          title: "Thành lập Công ty TNHH 2 Thành Viên trở lên",
          shortDesc: "Tối ưu cho việc hợp tác góp vốn giữa 2 - 50 cá nhân hoặc tổ chức.",
          longDesc: "Hỗ trợ soạn thảo thỏa thuận cổ đông góp vốn, phân chia tỷ lệ sở hữu rõ ràng và điều lệ hoạt động công ty, giảm thiểu tối đa rủi ro tranh chấp thành viên sau này.",
          timeframe: "3 - 5 ngày làm việc",
          priceEstimate: "Chỉ từ 1.350.000 VNĐ",
          deliverables: [
            "Giấy đăng ký doanh nghiệp mới nhất",
            "Con dấu tròn đại diện pháp luật",
            "Hồ sơ thành viên góp vốn & Điều lệ chuẩn tối ưu",
            "Tư vấn quản trị nội bộ miễn phí"
          ],
          iconName: "scale"
        },
        {
          id: "tl-03",
          title: "Thành lập Công ty Cổ Phần",
          shortDesc: "Quy mô lớn, dễ dàng huy động vốn trên thị trường thông qua phát hành cổ phiếu.",
          longDesc: "Thiết lập cấu trúc quản trị đa tầng (Hội đồng quản trị, Đại hội đồng cổ đông, Ban kiểm soát). Đảm bảo tuân thủ cao định hướng mở rộng hoặc gọi vốn đầu tư nước ngoài.",
          timeframe: "4 - 6 ngày làm việc",
          priceEstimate: "Chỉ từ 1.500.000 VNĐ",
          deliverables: [
            "Đăng ký kinh doanh Công ty Cổ phần",
            "Con dấu pháp nhân & chứng nhận mẫu dấu",
            "Danh sách cổ đông sáng lập & Sổ đăng ký cổ đông",
            "Hỗ trợ thủ tục mở tài khoản ngân hàng số đẹp"
          ],
          iconName: "briefcase"
        }
      ]
    },
    {
      id: "accounting",
      name: "Kế Toán - Thuế Trọn Gói",
      icon: "FileText",
      items: [
        {
          id: "kt-01",
          title: "Báo Cáo Thuế & Kế Toán Trọn Gói Theo Tháng",
          shortDesc: "Vận hành sổ sách thuế an toàn, giảm chi phí thuê nhân sự kế toán cố định.",
          longDesc: "Phù hợp cho công ty vừa và nhỏ không cần kế toán ngồi trực tiếp. Đại diện doanh nghiệp giải trình trước Cơ quan Thuế trực thuộc và xử lý kịp thời hóa đơn chứng từ mỗi tháng.",
          timeframe: "Hàng tháng định kỳ",
          priceEstimate: "Hỗ trợ chỉ từ 500.000 VNĐ / Tháng",
          deliverables: [
            "Nhận hóa đơn, kiểm tra tính hợp lệ pháp lý định kỳ",
            "Báo cáo thuế GTGT, TNCN, hóa đơn xuất nhập khẩu",
            "Cân đối doanh thu, chi phí hợp lý nhất để tối ưu thuế đầu ra",
            "In ấn đóng tập chứng từ kế toán hoàn chỉnh"
          ],
          iconName: "fileText"
        },
        {
          id: "kt-02",
          title: "Dọn dẹp & Hoàn thiện Sổ sách Kế toán Cuối Năm",
          shortDesc: "Khắc phục sai sót kế toán cũ, chuẩn bị sẵn sàng cho kỳ quyết toán thuế.",
          longDesc: "Rà soát lại toàn bộ hệ thống hóa đơn chứng từ các năm trước đó. Phát hiện lỗi hỏng số liệu, bổ sung hồ sơ thiếu, giảm thiểu tiền phạt sai phạm hành chính tối đa.",
          timeframe: "Xử lý từ 7 - 15 ngày",
          priceEstimate: "Tùy thuộc lượng hóa đơn phát sinh",
          deliverables: [
            "Báo cáo phân tích rủi ro thuế phát sinh",
            "Bản báo cáo Tài chính Hoàn chỉnh quyết toán thuế",
            "Sổ cái kế toán được chuẩn chuẩn hóa đúng quy pháp",
            "Tư vấn giải pháp giải trình chi phí doanh nghiệp"
          ],
          iconName: "award"
        }
      ]
    },
    {
      id: "licenses",
      name: "Giấy Phép Con - Sở Hữu Trí Tuệ",
      icon: "Award",
      items: [
        {
          id: "gp-01",
          title: "Xin Giấy Phép An Toàn Vệ Sinh Thực Phẩm",
          shortDesc: "Bắt buộc đối với nhà hàng, cơ sở chế biến cơm văn phòng, thực phẩm.",
          longDesc: "Quy trình khảo sát trực tiếp cơ sở cùng chuyên viên thuế, sửa đổi mặt bằng đạt chuẩn vệ sinh dịch tễ, đại diện nộp hồ sơ thẩm định lấy giấy phép nhanh.",
          timeframe: "15 - 20 ngày làm việc",
          priceEstimate: "Chi phí cạnh tranh nhất thị trường",
          deliverables: [
            "Giấy chứng nhận cơ sở đủ điều kiện ATTP",
            "Tài liệu tập huấn an toàn thực phẩm cho nhân viên",
            "Hồ sơ nguồn gốc nguyên liệu đạt chuẩn thanh tra"
          ],
          iconName: "award"
        },
        {
          id: "gp-02",
          title: "Đăng Ký Độc Quyền Nhãn Hiệu / Logo Thương Hiệu",
          shortDesc: "Bảo hộ tài sản trí tuệ doanh nghiệp, tránh bị đối thủ cạnh tranh sao chép.",
          longDesc: "Tra cứu chuyên sâu khả năng đăng ký nhãn hiệu hoàn toàn miễn phí trước khi nộp đơn chính thức tại Cục Sở hữu trí tuệ, đạt tỷ lệ được cấp văn bằng bảo hộ trên 95%.",
          timeframe: "Tra cứu 1 ngày - Phát bằng 12 tháng",
          priceEstimate: "Chỉ từ 2.500.000 VNĐ / Nhóm",
          deliverables: [
            "Đơn đăng ký nhãn hiệu đóng dấu nhận đơn của Cục SHTT",
            "Kết quả tra cứu pháp lý mức độ trùng lặp thương hiệu",
            "Văn bằng Bảo hộ độc quyền nhãn hiệu chính thức"
          ],
          iconName: "scale"
        },
        {
          id: "gp-03",
          title: "Giấy Phép Lao Động & Thẻ Tạm Trú Người Nước Ngoài",
          shortDesc: "Hợp pháp hóa nhân sự quốc tế làm việc hợp pháp tại Việt Nam.",
          longDesc: "Xin công văn chấp thuận nhu cầu sử dụng lao động nước ngoài và xử lý hồ sơ xin cấp mới / gia hạn Work Permit và Thẻ Tạm Trú (TCT) thời hạn lên đến 2 năm.",
          timeframe: "10 - 15 ngày làm việc",
          priceEstimate: "Liên hệ nhận báo giá chi tiết",
          deliverables: [
            "Giấy phép lao động (Work Permit) bản gốc",
            "Thẻ tạm trú thời hạn 2 năm từ Cục Xuất Nhập Cảnh",
            "Hồ sơ dịch thuật công chứng tư pháp hợp lệ"
          ],
          iconName: "briefcase"
        }
      ]
    },
    {
      id: "changes",
      name: "Thay Đổi ĐKKD & Giải Thể",
      icon: "Briefcase",
      items: [
        {
          id: "td-01",
          title: "Thay đổi Người đại diện pháp luật / Tăng vốn điều lệ",
          shortDesc: "Cập nhật pháp lý kịp thời với các biến động cơ cấu nội bộ của công ty.",
          longDesc: "Dịch vụ hỗ trợ chỉnh sửa GPKD khi có quyết định thay đổi giám đốc điều hành, đại diện ký tá hoặc khi chủ sở hữu quyết định bơm thêm vốn kinh doanh mở rộng quy mô kinh tế.",
          timeframe: "3 ngày làm việc",
          priceEstimate: "Báo giá trọn gói 1.000.000 VNĐ",
          deliverables: [
            "Giấy phép đăng ký kinh doanh đã cập nhật thông tin mới nhất",
            "Biên bản họp Hội đồng thành viên/HĐQT phê chuẩn thay đổi",
            "Bố cáo thông tin thay đổi hợp chuẩn cổng thông tin quốc gia"
          ],
          iconName: "fileText"
        },
        {
          id: "td-02",
          title: "Thay đổi Địa chỉ trụ sở chính / Thêm ngành nghề",
          shortDesc: "Chuyển địa điểm kinh doanh liên quận/tỉnh hoặc đăng ký mã ngành mới.",
          longDesc: "Đảm bảo đồng nhất thủ tục thông báo với cơ quan quản lý thuế Quận chuyển đi và chuyển đến, khắc con dấu mới (nếu chuyển quận làm đổi thông tin quận cũ) nhanh gọn.",
          timeframe: "3 - 5 ngày làm việc",
          priceEstimate: "Xem chi tiết theo khu vực",
          deliverables: [
            "Giấy chứng nhận đăng ký doanh nghiệp mới",
            "Hồ sơ chốt thuế chuyển quận (Trường hợp thay đổi địa chỉ quận)",
            "Đăng tải cập nhật ngành nghề kinh doanh mới"
          ],
          iconName: "scale"
        }
      ]
    }
  ];

  // Calculate detailed state fee and service fee in real-time
  const calculatedFees = useMemo(() => {
    // Base State Fees (prescribed by Vietnam Ministry of Finance)
    const baselineDpiStateFee = 100000; // Đăng ký doanh nghiệp
    const sealFee = 250000; // Khắc con dấu tròn đồng bộ
    const portalPublicationFee = 300000; // Phí công bố cổng thông tin
    
    // Service base fees (Thien Luat Phat promotions)
    let serviceBase = 650000; // Phí dịch vụ cơ bản soạn HS, nộp, lấy kết quả
    if (capitalSize > 1000) {
      serviceBase += 200000; // Phụ phí tư vấn cấu trúc vốn lớn trên 1 Tỷ VND
    }
    
    // Add-on components
    const digitalSignatureCost = includeDigitalSignature ? 1800000 : 0; // Chữ ký số 3 năm
    const eInvoiceCost = includeEInvoice ? 1200000 : 0; // 500 số hóa đơn điện tử + PM mềm
    const initialTaxSetupCost = includeTaxSetup ? 500000 : 0; // Khai và nộp tờ khai lệ phí môn bài đầu tiên
    const trademarkCost = includeTrademark ? 2500000 : 0; // Đăng thử độc quyền 1 nhóm sản phẩm

    const totalStateFee = baselineDpiStateFee + sealFee + portalPublicationFee;
    const totalServiceFee = serviceBase;
    const totalAddons = digitalSignatureCost + eInvoiceCost + initialTaxSetupCost + trademarkCost;
    
    // Discount applied automatically for startup support
    const discount = (includeDigitalSignature && includeEInvoice && includeTaxSetup) ? 300000 : 0;

    return {
      stateFee: totalStateFee,
      serviceFee: totalServiceFee,
      addonsFee: totalAddons,
      discount: discount,
      grandTotal: totalStateFee + totalServiceFee + totalAddons - discount
    };
  }, [capitalSize, includeDigitalSignature, includeEInvoice, includeTaxSetup, includeTrademark]);

  const activeCategory = useMemo(() => {
    return SERVICES_DATA.find(cat => cat.id === activeTab) || SERVICES_DATA[0];
  }, [activeTab]);

  // Handle Free Consultation intake form submission
  const handleConsultationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim()) {
      setFormValidationMsg("Vui lòng điền họ tên và số điện thoại liên hệ chính xác.");
      return;
    }
    setFormValidationMsg("");
    setConsultationSubmitted(true);
    setTimeout(() => {
      // Clear form after submission
      setClientName("");
      setClientPhone("");
      setClientEmail("");
      setClientMessage("");
    }, 1500);
  };

  // Open consultation modal preset with specific service
  const openConsultForService = (serviceTitle: string) => {
    setSelectedServiceForModal(serviceTitle);
    setConsultationModalOpen(true);
    setConsultationSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-brand-gold-500 selection:text-brand-blue-950">
      
      {/* HEADER SECTION */}
      <header id="site-header" className="sticky top-0 z-50 bg-brand-blue-950 text-white border-b border-brand-blue-900 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center space-x-3 cursor-pointer">
              <div className="p-2 bg-brand-gold-500 rounded-lg text-brand-blue-950">
                <Scale className="h-7 w-7" />
              </div>
              <div>
                <span className="font-serif font-bold text-xl tracking-tight text-white block sm:inline">THIÊN LUẬT PHÁT</span>
                <span className="text-xs text-brand-gold-400 font-mono tracking-widest block uppercase font-medium">LUẬT DOANH NGHIỆP</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1 lg:space-x-4">
              <a href="#services-section" className="px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:text-brand-gold-400 hover:bg-brand-blue-900 transition-colors">
                Dịch Vụ Pháp Lý
              </a>
              <a href="#calculator-section" className="px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:text-brand-gold-400 hover:bg-brand-blue-900 transition-colors">
                Dự Toán Chi Phí
              </a>
              <a href="#process-section" className="px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:text-brand-gold-400 hover:bg-brand-blue-900 transition-colors">
                Quy Trình Làm Việc
              </a>
              <a href="#about-section" className="px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:text-brand-gold-400 hover:bg-brand-blue-900 transition-colors">
                Tại Sao Chọn Chúng Tôi
              </a>
              <a href="#faq-section" className="px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:text-brand-gold-400 hover:bg-brand-blue-900 transition-colors">
                Hỏi Đáp Thuế
              </a>
            </nav>

            {/* Hotline & Consultation actions */}
            <div className="hidden lg:flex items-center space-x-4">
              <a 
                href="tel:0901234567" 
                className="flex items-center space-x-2 text-brand-gold-400 hover:text-brand-gold-500 transition-colors group cursor-pointer"
                id="link-hotline-nav"
              >
                <div className="p-2 bg-brand-gold-500/10 rounded-full group-hover:scale-110 transition-transform">
                  <Phone className="h-4 w-4" />
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest leading-none">HOTLINE 24/7</p>
                  <p className="font-mono font-bold text-sm tracking-wider">090.1234.567</p>
                </div>
              </a>
              <button
                id="btn-nav-free-consult"
                onClick={() => openConsultForService("Tư vấn Doanh nghiệp chung")}
                className="px-5 py-2.5 bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-blue-950 font-semibold text-xs rounded-lg uppercase tracking-wider shadow-lg hover:shadow-brand-gold-500/15 transition-all cursor-pointer"
              >
                Nhận tư vấn miễn phí
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                id="btn-hamburger"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-slate-400 hover:text-white hover:bg-brand-blue-900 transition-colors"
                aria-expanded="false"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden bg-brand-blue-900 border-t border-brand-blue-800"
            >
              <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 text-center">
                <a 
                  href="#services-section" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-3 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-brand-blue-800 transition-colors"
                >
                  Dịch Vụ Pháp Lý
                </a>
                <a 
                  href="#calculator-section" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-3 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-brand-blue-800 transition-colors"
                >
                  Dự Toán Chi Phí
                </a>
                <a 
                  href="#process-section" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-3 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-brand-blue-800 transition-colors"
                >
                  Quy Trình Làm Việc
                </a>
                <a 
                  href="#about-section" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-3 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-brand-blue-800 transition-colors"
                >
                  Tại Sao Chọn Chúng Tôi
                </a>
                <a 
                  href="#faq-section" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-3 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-brand-blue-800 transition-colors"
                >
                  Hỏi Đáp Thuế
                </a>
                <div className="pt-4 border-t border-brand-blue-800 flex flex-col items-center space-y-3">
                  <a 
                    href="tel:0901234567" 
                    className="flex items-center space-x-2 text-brand-gold-400 py-2 font-mono font-bold"
                  >
                    <Phone className="h-5 w-5" />
                    <span>090.1234.567</span>
                  </a>
                  <button 
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      openConsultForService("Tư vấn Doanh nghiệp chung");
                    }}
                    className="w-full max-w-xs py-3 bg-brand-gold-500 text-brand-blue-950 font-bold rounded-lg uppercase tracking-wider text-xs shadow-md"
                  >
                    Nhận tư vấn miễn phí
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO SECTION */}
      <section id="hero-section" className="relative bg-gradient-to-br from-brand-blue-950 via-brand-blue-900 to-brand-blue-950 text-white overflow-hidden py-16 lg:py-24">
        {/* Subtle Decorative Elements */}
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-12 left-10 w-96 h-96 bg-brand-gold-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-600 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center space-x-2 bg-brand-gold-500/10 border border-brand-gold-500/20 px-3 py-1.5 rounded-full text-brand-gold-400 text-xs tracking-wider uppercase font-semibold">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Đối Tác Pháp Lý Vững Vàng Cho Khởi Nghiệp</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-semibold tracking-tight text-white leading-tight">
              Khởi Nghiệp An Tâm <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold-400 to-brand-gold-500">
                Pháp Lý Vững Bước
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed font-sans-fallback">
              Thiên Luật Phát cung cấp dịch vụ thành lập công ty uy tín, kế toán trọn gói chuyên nghiệp với chi phí cam kết không phát sinh. Giúp doanh nghiệp tối ưu chi phí vận hành ban đầu, vững tâm tập trung phát triển kinh doanh bền vững.
            </p>

            {/* Micro Key Benefits list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl pb-3">
              {[
                "Có ngay Giấy đăng ký kinh doanh sau 3 ngày",
                "Miễn phí giao hồ sơ, con dấu tận tay",
                "Hỗ trợ tư vấn thuế ban đầu miễn phí",
                "Cam kết hoàn tiền kế toán nếu sai sót"
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-slate-300">
                  <CheckCircle2 className="h-5 w-5 text-brand-gold-400 flex-shrink-0" />
                  <span className="text-sm font-sans-fallback">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                id="btn-hero-cta-consult"
                onClick={() => openConsultForService("Khởi nghiệp thành lập công ty ban đầu")}
                className="px-8 py-4 bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-blue-950 font-bold text-center rounded-lg shadow-lg hover:shadow-brand-gold-500/20 transition-all text-sm uppercase tracking-wide cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>Nhận Tư Vấn Miễn Phí</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href="#calculator-section"
                className="px-8 py-4 bg-brand-blue-900/50 hover:bg-brand-blue-900 border border-brand-gold-500/30 hover:border-brand-gold-500/60 text-white font-bold text-center rounded-lg transition-all text-sm uppercase tracking-wide flex items-center justify-center space-x-2"
              >
                <Calculator className="h-4 w-4 text-brand-gold-400" />
                <span>Tính Thử Chi Phí Lập Doanh Nghiệp</span>
              </a>
            </div>
          </div>

          {/* Hero Right Visual Form Widget */}
          <div className="lg:col-span-5">
            <div className="bg-brand-blue-900/60 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-brand-blue-800 shadow-2xl relative">
              <div className="absolute top-0 right-0 -mr-2 -mt-2 w-12 h-12 bg-brand-gold-500/20 rounded-full blur-lg"></div>
              
              <h3 className="text-xl sm:text-2xl font-serif text-white mb-2 text-center">ĐĂNG KÝ NHẬN BÁO GIÁ</h3>
              <p className="text-slate-300 text-xs sm:text-sm text-center mb-6 font-sans-fallback">
                Nhận ngay tài liệu hướng dẫn chuẩn bị hồ sơ thành lập công ty hoàn toàn miễn phí gửi qua Zalo/Email.
              </p>

              <form onSubmit={handleConsultationSubmit} className="space-y-4">
                <div>
                  <label className="block text-slate-300 text-xs font-semibold mb-1 uppercase tracking-widest">Họ & Tên *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Nguyễn Văn A" 
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-brand-blue-950 border border-brand-blue-800 focus:border-brand-gold-500 rounded-lg py-2.5 px-4 text-white text-sm outline-none transition-colors placeholder-slate-500 font-sans-fallback"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 text-xs font-semibold mb-1 uppercase tracking-widest">Số điện thoại / Zalo *</label>
                  <input 
                    type="tel" 
                    required
                    placeholder="Ví dụ: 0901234567" 
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full bg-brand-blue-950 border border-brand-blue-800 focus:border-brand-gold-500 rounded-lg py-2.5 px-4 text-white text-sm outline-none transition-colors placeholder-slate-500 font-sans-fallback"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 text-xs font-semibold mb-1 uppercase tracking-widest">Dịch vụ quan tâm</label>
                  <select 
                    value={selectedServiceForModal}
                    onChange={(e) => setSelectedServiceForModal(e.target.value)}
                    className="w-full bg-brand-blue-950 border border-brand-blue-800 focus:border-brand-gold-500 rounded-lg py-2.5 px-4 text-white text-sm outline-none transition-colors font-sans-fallback"
                  >
                    <option value="Thành lập doanh nghiệp mới">Thành Lập Doanh Nghiệp Mới</option>
                    <option value="Kế toán - Thuế trọn gói">Kế Toán - Thuế Trọn Gói</option>
                    <option value="Thay đổi Giấy phép ĐKKD">Thay Đổi Đăng Ký Kinh Doanh</option>
                    <option value="Xin Giấy Phép Con đặc thù">Xin Giấy Phép Con Đặc Thù</option>
                    <option value="Độc quyền nhãn hiệu / SHTT">Đăng Ký Độc Quyền Nhãn Hiệu</option>
                  </select>
                </div>

                {formValidationMsg && (
                  <p className="text-red-400 text-xs bg-red-400/10 p-2 rounded border border-red-400/20 flex items-center space-x-1.5">
                    <ShieldAlert className="h-3.5 w-3.5 flex-shrink-0" />
                    <span>{formValidationMsg}</span>
                  </p>
                )}

                <button
                  type="submit"
                  id="btn-hero-form-submit"
                  className="w-full py-3.5 bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-blue-950 font-bold rounded-lg text-sm uppercase tracking-wider shadow-lg transition-colors cursor-pointer"
                >
                  GỬI YÊU CẦU CHO LUẬT SƯ
                </button>
              </form>

              {/* Consultation success notification inline */}
              <AnimatePresence>
                {consultationSubmitted && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-brand-blue-950/95 rounded-2xl p-6 flex flex-col items-center justify-center text-center z-20 space-y-4"
                  >
                    <div className="w-16 h-16 bg-brand-gold-500/20 text-brand-gold-500 rounded-full flex items-center justify-center">
                      <Check className="h-10 w-10 stroke-[3]" />
                    </div>
                    <h4 className="text-2xl font-serif text-white">Đăng Ký Thành Công</h4>
                    <p className="text-slate-300 text-sm max-w-xs font-sans-fallback">
                      Cảm ơn <strong>{clientName || "Quý khách"}</strong>. Đội ngũ chuyên viên pháp lý của Thiên Luật Phát sẽ liên hệ lại qua số điện thoại <strong>{clientPhone}</strong> trong vòng 15-30 phút (Hỗ trợ cả ngoài giờ hành chính).
                    </p>
                    <button 
                      onClick={() => setConsultationSubmitted(false)}
                      className="px-4 py-2 bg-brand-blue-800 hover:bg-brand-blue-700 text-slate-200 text-xs rounded transition-colors"
                    >
                      Quay lại form
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </section>

      {/* DYNAMIC STATISTICS ROW */}
      <section className="bg-brand-blue-950 border-y border-brand-blue-900 py-10 relative z-20 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center">
            
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl md:text-5xl font-mono text-brand-gold-500 font-extrabold tracking-tight">10+</p>
              <p className="text-xs uppercase tracking-widest text-slate-400 font-sans-fallback">Năm Kinh Nghiệm Thực Chiến</p>
              <p className="text-[10px] text-slate-500 font-sans-fallback">Đồng hành cùng DN Việt từ năm 2016</p>
            </div>

            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl md:text-5xl font-mono text-brand-gold-500 font-extrabold tracking-tight">3,500+</p>
              <p className="text-xs uppercase tracking-widest text-slate-400 font-sans-fallback">Doanh Nghiệp Đã Thành Lập</p>
              <p className="text-[10px] text-slate-500 font-sans-fallback">Thuộc nhiều mảng dịch vụ, phân khúc rộng</p>
            </div>

            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl md:text-5xl font-mono text-brand-gold-500 font-extrabold tracking-tight">450+</p>
              <p className="text-xs uppercase tracking-widest text-slate-400 font-sans-fallback">Khách Hàng Kế Toán Định Kỳ</p>
              <p className="text-[10px] text-slate-500 font-sans-fallback">Báo cáo hóa đơn, tối ưu dòng thuế hàng quý</p>
            </div>

            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl md:text-5xl font-mono text-brand-gold-500 font-extrabold tracking-tight">100%</p>
              <p className="text-xs uppercase tracking-widest text-slate-400 font-sans-fallback">Bảo mật & Không phát sinh</p>
              <p className="text-[10px] text-slate-500 font-sans-fallback">Hợp đồng pháp lý minh bạch rõ ràng</p>
            </div>

          </div>
        </div>
      </section>

      {/* BRAND VALUES INTRO */}
      <section className="bg-white py-12">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-4">
          <p className="text-brand-gold-600 uppercase tracking-widest text-xs font-semibold font-sans-fallback">GIÀU KINH NGHIỆM - TRỌN NIỀM TIN</p>
          <h2 className="text-3xl font-serif font-semibold text-brand-blue-900">Thiết Kế Trọn Gói Trải Nghiệm Khởi Nghiệp Thuận Lợi</h2>
          <div className="w-16 h-1 bg-brand-gold-500 mx-auto rounded-full"></div>
          <p className="text-slate-600 text-sm sm:text-base max-w-3xl mx-auto font-sans-fallback leading-relaxed">
            Chúng tôi sinh ra với sứ mệnh giảm bớt gánh nặng hành chính, xử lý nhanh chóng mọi thủ tục pháp lý thành lập công ty, giấy tờ bổ sung cũng như hạch toán các dòng thuế lắt léo nhất. Hãy tập trung xây dựng sản phẩm và bán hàng, phần việc pháp chế đau đầu nhất đã có các chuyên viên kỳ cựu gánh vác.
          </p>
        </div>
      </section>

      {/* CORE SERVICES Tabbed Grid Section */}
      <section id="services-section" className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section title */}
          <div className="text-center space-y-3 mb-10">
            <span className="text-xs uppercase tracking-widest text-brand-gold-600 font-bold block font-sans-fallback">DANH MỤC PHÁP LÝ CHUYÊN SÂU</span>
            <h2 className="text-3xl sm:text-4xl font-serif text-brand-blue-900 font-semibold">Tất Cả Dịch Vụ Doanh Nghiệp Bạn Cần</h2>
            <p className="text-slate-600 text-sm max-w-xl mx-auto font-sans-fallback">
              Báo giá cực kỳ chi tiết, công khai, phù hợp các loại hình kinh doanh từ nhỏ lẻ tư nhân tới công ty cổ phần quy mô lớn.
            </p>
          </div>

          {/* Desktop tabs buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {SERVICES_DATA.map((cat) => (
              <button
                key={cat.id}
                id={`tab-${cat.id}`}
                onClick={() => setActiveTab(cat.id)}
                className={`px-5 py-3 rounded-lg text-sm font-semibold transition-all shadow-sm cursor-pointer flex items-center space-x-2 ${
                  activeTab === cat.id 
                    ? "bg-brand-blue-900 text-white border-b-2 border-brand-gold-500" 
                    : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
                }`}
              >
                {cat.id === "setup" && <Scale className="h-4 w-4 text-brand-gold-500" />}
                {cat.id === "accounting" && <FileText className="h-4 w-4 text-brand-gold-500" />}
                {cat.id === "licenses" && <Award className="h-4 w-4 text-brand-gold-500" />}
                {cat.id === "changes" && <Briefcase className="h-4 w-4 text-brand-gold-500" />}
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Active Category Display Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeCategory.items.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Icon and title */}
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 bg-brand-blue-900/5 text-brand-blue-900 rounded-lg group-hover:bg-brand-blue-900 group-hover:text-white transition-colors duration-300">
                      {item.iconName === "scale" && <Scale className="h-5 w-5" />}
                      {item.iconName === "briefcase" && <Briefcase className="h-5 w-5" />}
                      {item.iconName === "fileText" && <FileText className="h-5 w-5" />}
                      {item.iconName === "award" && <Award className="h-5 w-5" />}
                    </div>
                    <h3 className="text-lg font-serif font-semibold text-brand-blue-900 group-hover:text-brand-blue-700 transition-colors leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  {/* Summary & Descriptions */}
                  <p className="text-slate-500 text-xs font-semibold tracking-wide font-sans-fallback">
                    {item.shortDesc}
                  </p>
                  
                  <p className="text-slate-600 text-xs font-sans-fallback leading-relaxed">
                    {item.longDesc}
                  </p>

                  {/* Deliverables checklist */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <p className="text-[11px] font-bold text-slate-800 uppercase tracking-wider font-sans-fallback">Kết quả bàn giao gồm:</p>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {item.deliverables.map((del, dIdx) => (
                        <li key={dIdx} className="flex items-start space-x-2">
                          <Check className="h-3.5 w-3.5 text-brand-gold-600 mt-0.5 flex-shrink-0" />
                          <span className="font-sans-fallback block leading-tight">{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Foot indicators and action button */}
                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-400 font-sans-fallback uppercase font-semibold">Thời gian hoàn tất</p>
                    <p className="text-xs font-semibold text-slate-700 flex items-center space-x-1 font-sans-fallback">
                      <Clock className="h-3.5 w-3.5 text-brand-gold-500 flex-shrink-0" />
                      <span>{item.timeframe}</span>
                    </p>
                  </div>
                  <button 
                    onClick={() => openConsultForService(item.title)}
                    className="px-4 py-2 bg-brand-blue-900 hover:bg-brand-gold-500 hover:text-brand-blue-950 text-white font-bold text-xs rounded transition-all cursor-pointer flex items-center space-x-1"
                  >
                    <span>Yêu cầu</span>
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* DỰ TOÁN CHI PHÍ THÀNH LẬP - INTERACTIVE ESTIMATOR WIDGET */}
      <section id="calculator-section" className="py-16 bg-gradient-to-tr from-brand-blue-950 to-brand-blue-900 text-white relative overflow-hidden">
        
        {/* Abstract background graphics */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-brand-gold-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs uppercase tracking-widest text-brand-gold-400 font-bold block font-sans-fallback">MINH BẠCH & MINIMALIST</span>
            <h2 className="text-3xl sm:text-4xl font-serif text-white font-semibold">Hệ Thống Dự Bản Dự Toán Chi Phí Tự Động</h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto font-sans-fallback">
              Chọn các dịch vụ và phụ kiện công nghệ ban đầu phù hợp với nhu cầu. Hệ thống tự động tính toán tổng số tiền bao gồm lệ phí nhà nước và phí dịch vụ của Thiên Luật Phát.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Side: Parameters input form */}
            <div className="lg:col-span-7 bg-brand-blue-900/40 border border-brand-blue-800 p-6 sm:p-8 rounded-2xl space-y-6">
              
              <div className="flex items-center space-x-3 pb-4 border-b border-brand-blue-800">
                <Calculator className="h-6 w-6 text-brand-gold-400" />
                <h3 className="text-xl font-serif">Tham Số Thành Lập Doanh Nghiệp</h3>
              </div>

              {/* Province Selection */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 font-sans-fallback">Tỉnh / Thành Phố Nơi Đặt Trụ Sở *</label>
                <div className="grid grid-cols-3 gap-2">
                  {["Hồ Chí Minh", "Hà Nội", "Tỉnh Thành Khác"].map((prov) => (
                    <button
                      key={prov}
                      onClick={() => setProvince(prov)}
                      className={`py-2 px-3 text-xs sm:text-sm font-semibold rounded-lg border transition-all cursor-pointer ${
                        province === prov
                          ? "bg-brand-gold-500 text-brand-blue-950 border-brand-gold-400"
                          : "bg-brand-blue-950 text-slate-300 border-brand-blue-800 hover:bg-brand-blue-900"
                      }`}
                    >
                      {prov}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider for Capital Size */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-300 font-sans-fallback">
                  <span>Dự kiến Vốn điều lệ đăng ký</span>
                  <span className="text-brand-gold-400 font-mono text-sm lowercase">{capitalSize} triệu VNĐ</span>
                </div>
                <input 
                  type="range" 
                  min="50" 
                  max="10000" 
                  step="50"
                  value={capitalSize}
                  onChange={(e) => setCapitalSize(Number(e.target.value))}
                  className="w-full h-1.5 bg-brand-blue-950 rounded-lg appearance-none cursor-pointer accent-brand-gold-400"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>50 Triệu VNĐ</span>
                  <span>1 Tỷ VNĐ</span>
                  <span>5 Tỷ VNĐ</span>
                  <span>10 Tỷ VNĐ</span>
                </div>
                {capitalSize > 1000 && (
                  <p className="text-[11px] text-brand-gold-400/90 font-sans-fallback flex items-center space-x-1 bg-brand-gold-500/5 p-2 rounded border border-brand-gold-500/10">
                    <ShieldAlert className="h-3.5 w-3.5 flex-shrink-0" />
                    <span>Lưu ý: Doanh nghiệp đăng ký vốn từ 1 Tỷ VNĐ thường có nghĩa vụ lệ phí môn bài là 2-3 Triệu/Năm. Chúng tôi miễn phí nộp tờ khai này.</span>
                  </p>
                )}
              </div>

              {/* Add-on selection checkboxes */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs uppercase tracking-widest text-slate-300 font-bold font-sans-fallback">Lựa chọn bổ sung tiện ích khởi nghiệp thiết yếu</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  
                  {/* Digital Signature */}
                  <label className="flex items-start p-3 bg-brand-blue-950 rounded-xl border border-brand-blue-800 hover:border-slate-700 transition-colors cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={includeDigitalSignature}
                      onChange={(e) => setIncludeDigitalSignature(e.target.checked)}
                      className="mt-1 mr-3 h-4 w-4 accent-brand-gold-400"
                    />
                    <div className="space-y-0.5">
                      <p className="text-xs font-semibold text-white">Chữ ký số Token (3 Năm)</p>
                      <p className="text-[10px] text-slate-400">Mua để kê khai thuế, hải quan, ký HĐĐT bắt buộc.</p>
                      <p className="text-xs font-mono font-bold text-brand-gold-400">+1.800.000đ</p>
                    </div>
                  </label>

                  {/* Electronic Invoice */}
                  <label className="flex items-start p-3 bg-brand-blue-950 rounded-xl border border-brand-blue-800 hover:border-slate-700 transition-colors cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={includeEInvoice}
                      onChange={(e) => setIncludeEInvoice(e.target.checked)}
                      className="mt-1 mr-3 h-4 w-4 accent-brand-gold-400"
                    />
                    <div className="space-y-0.5">
                      <p className="text-xs font-semibold text-white">Hóa đơn điện tử (500 Số)</p>
                      <p className="text-[10px] text-slate-400">Đã bao gồm phần mềm xuất và phí khởi tạo hệ thống.</p>
                      <p className="text-xs font-mono font-bold text-brand-gold-400">+1.200.000đ</p>
                    </div>
                  </label>

                  {/* Initial Tax setup */}
                  <label className="flex items-start p-3 bg-brand-blue-950 rounded-xl border border-brand-blue-800 hover:border-slate-700 transition-colors cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={includeTaxSetup}
                      onChange={(e) => setIncludeTaxSetup(e.target.checked)}
                      className="mt-1 mr-3 h-4 w-4 accent-brand-gold-400"
                    />
                    <div className="space-y-0.5">
                      <p className="text-xs font-semibold text-white">Đặt trước khai môn bài thuế</p>
                      <p className="text-[10px] text-slate-400">Soạn hồ sơ pháp lý thuế ban đầu tối ưu rủi ro thanh tra.</p>
                      <p className="text-xs font-mono font-bold text-brand-gold-400">+500.000đ</p>
                    </div>
                  </label>

                  {/* Trademark design/protection */}
                  <label className="flex items-start p-3 bg-brand-blue-950 rounded-xl border border-brand-blue-800 hover:border-slate-700 transition-colors cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={includeTrademark}
                      onChange={(e) => setIncludeTrademark(e.target.checked)}
                      className="mt-1 mr-3 h-4 w-4 accent-brand-gold-400"
                    />
                    <div className="space-y-0.5">
                      <p className="text-xs font-semibold text-white">Tra cứu & Bảo hộ Nhãn hiệu</p>
                      <p className="text-[10px] text-slate-400">Đăng ký giữ logo thương hiệu tại Cục Sở hữu Trí Tuệ.</p>
                      <p className="text-xs font-mono font-bold text-brand-gold-400">+2.500.000đ</p>
                    </div>
                  </label>

                </div>

              </div>

            </div>

            {/* Right Side: Price breakdowns real-time display cards */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-white text-slate-900 rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-100 flex flex-col justify-between">
                
                <div className="space-y-6">
                  
                  <div className="pb-4 border-b border-slate-100 text-center">
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold font-sans-fallback">Tổng Dự Toán Trọn Gói</p>
                    <p className="text-3xl sm:text-4xl font-mono text-brand-blue-900 font-extrabold mt-1">
                      {calculatedFees.grandTotal.toLocaleString("vi-VN")} <span className="text-lg">VNĐ</span>
                    </p>
                    <p className="text-xs text-slate-500 mt-1 font-sans-fallback">Đã bao gồm tất cả lệ phí cần nộp cho Sở Kế Hoạch Đầu Tư.</p>
                  </div>

                  {/* Itemized list */}
                  <div className="space-y-3.5 text-xs">
                    
                    <div className="flex justify-between items-center text-slate-600">
                      <span className="font-sans-fallback">1. Lệ phí nhà nước bắt buộc:</span>
                      <span className="font-mono font-bold text-slate-800">{calculatedFees.stateFee.toLocaleString("vi-VN")}đ</span>
                    </div>

                    <div className="flex justify-between items-center text-slate-600">
                      <span className="font-sans-fallback">2. Phí soạn hồ sơ Thiên Luật Phát:</span>
                      <span className="font-mono font-bold text-slate-800">{calculatedFees.serviceFee.toLocaleString("vi-VN")}đ</span>
                    </div>

                    {calculatedFees.addonsFee > 0 && (
                      <div className="flex justify-between items-center text-slate-600">
                        <span className="font-sans-fallback">3. Tổng phí dịch vụ giá trị gia tăng:</span>
                        <span className="font-mono font-bold text-slate-800">+{calculatedFees.addonsFee.toLocaleString("vi-VN")}đ</span>
                      </div>
                    )}

                    {calculatedFees.discount > 0 && (
                      <div className="flex justify-between items-center text-emerald-600 bg-emerald-50 px-2.5 py-1.5 rounded border border-emerald-100 font-semibold">
                        <span className="font-sans-fallback">Khuyến mãi Combo Khởi nghiệp:</span>
                        <span className="font-mono">-{calculatedFees.discount.toLocaleString("vi-VN")}đ</span>
                      </div>
                    )}

                    <div className="pt-3 border-t border-dashed border-slate-200">
                      <p className="text-[10.5px] text-slate-400 font-sans-fallback leading-relaxed uppercase tracking-wider font-bold mb-2">Quyền lợi đặc biệt kèm theo:</p>
                      
                      <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-700">
                        <div className="flex items-center space-x-1.5">
                          <Check className="h-3.5 w-3.5 text-brand-gold-600" />
                          <span>Khắc dấu tròn 1h</span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                          <Check className="h-3.5 w-3.5 text-brand-gold-600" />
                          <span>Giao hồ sơ tận nơi</span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                          <Check className="h-3.5 w-3.5 text-brand-gold-600" />
                          <span>Mẫu điều lệ tối ưu</span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                          <Check className="h-3.5 w-3.5 text-brand-gold-600" />
                          <span>Cố vấn thuế 12 tháng</span>
                        </div>
                      </div>

                    </div>

                  </div>

                </div>

                <div className="mt-8 space-y-3">
                  <button
                    onClick={() => {
                      let desc = `Tôi muốn đăng ký Gói lập DN thành lập tại ${province}, Vốn đăng ký ${capitalSize} Triệu VNĐ.`;
                      if (includeDigitalSignature) desc += " Kèm CTS.";
                      if (includeEInvoice) desc += " Kèm HĐĐT.";
                      if (includeTrademark) desc += " Kèm nhãn hiệu.";
                      openConsultForService(desc);
                    }}
                    className="w-full py-4 bg-brand-blue-900 hover:bg-brand-blue-950 text-white font-bold text-sm tracking-wide rounded-xl uppercase shadow-md hover:shadow-brand-blue-900/15 transition-all cursor-pointer text-center"
                  >
                    Đăng Ký Thành Lập Với Gói Này
                  </button>
                  <p className="text-[10.5px] text-slate-400 text-center font-sans-fallback">
                    * Giá trị tính toán phía trên dựa trên thuế suất mới nhất. Cam kết không phát sinh ẩn suất trong toàn bộ quá trình xử lý.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* CLARITY WORKING PROCESS - STEPS SECTION */}
      <section id="process-section" className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-16">
            <span className="text-xs uppercase tracking-widest text-brand-gold-600 font-bold block font-sans-fallback">MINH BẠCH & TẬN TÂM</span>
            <h2 className="text-3xl sm:text-4xl font-serif text-brand-blue-900 font-semibold">Quy Trình 3 Bước Tận Nơi Đơn Giản</h2>
            <p className="text-slate-600 text-sm max-w-xl mx-auto font-sans-fallback">
              Quý khách chỉ việc cung cấp thông tin căn cước công dân. Tất cả các bước di chuyển lên Sở KH&ĐT, nhận con dấu, bàn giao hồ sơ đều được chuyên viên hỗ trợ tại nhà.
            </p>
          </div>

          <div className="relative">
            {/* Timeline progression bar */}
            <div className="absolute top-24 left-1/2 w-0.5 h-[calc(100%-196px)] -translate-x-1/2 bg-slate-200 hidden md:block"></div>

            <div className="space-y-12 md:space-y-20">
              
              {/* Step 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="md:text-right space-y-3 md:pr-12 md:order-1">
                  <span className="inline-block py-1 px-3.5 bg-brand-gold-500/10 text-brand-gold-600 text-xs font-bold rounded-full font-mono">BƯỚC 1</span>
                  <h3 className="text-xl sm:text-2xl font-serif text-brand-blue-900 font-semibold">Tiếp Nhận Thông Tin & Tư Vấn</h3>
                  <p className="text-slate-600 text-sm font-sans-fallback leading-relaxed">
                    Đội ngũ chuyên viên luật sẽ liên hệ thu thập ý tưởng của khách hàng về Tên doanh nghiệp dự kiến, địa chỉ trụ sở đặt văn phòng làm việc và hạn mức vốn đăng ký ban đầu. Chúng tôi miễn phí tra cứu trùng lặp tên công ty, tư vấn các ngành nghề kinh doanh hạn chế hoặc có điều kiện.
                  </p>
                  <div className="flex flex-wrap md:justify-end gap-2 text-xs text-slate-500 pt-1 font-sans-fallback">
                    <span className="px-2 py-1 bg-slate-100 rounded">Thời gian: 15-30 Phút</span>
                    <span className="px-2 py-1 bg-slate-100 rounded">Hoàn toàn miễn phí</span>
                  </div>
                </div>
                <div className="flex justify-start md:justify-start md:order-2 md:pl-12 relative">
                  {/* Circle dot marker */}
                  <div className="absolute top-1/2 -left-3.5 w-7 h-7 bg-brand-gold-500 text-white rounded-full flex items-center justify-center font-bold text-xs ring-4 ring-white -translate-y-1/2 -ml-0.5 hidden md:flex">1</div>
                  
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 w-full max-w-md shadow-sm">
                    <p className="text-xs text-slate-400 font-mono mb-2">QUY CHUẨN XỬ LÝ</p>
                    <p className="text-sm font-bold text-slate-800 font-sans-fallback mb-1">Rà soát vốn pháp định và ngành đặc thù</p>
                    <p className="text-xs text-slate-500 font-sans-fallback">Giúp doanh nghiệp tránh vi phạm khai quá cao dẫn tới nghĩa vụ chịu lỗ nợ cực hạn, hoạch định kế toán ban đầu hiệu quả.</p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-3 md:pl-12 md:order-2">
                  <span className="inline-block py-1 px-3.5 bg-brand-gold-500/10 text-brand-gold-600 text-xs font-bold rounded-full font-mono">BƯỚC 2</span>
                  <h3 className="text-xl sm:text-2xl font-serif text-brand-blue-900 font-semibold">Soạn Thảo Hồ Sơ & Đăng Ký Chữ Ký</h3>
                  <p className="text-slate-600 text-sm font-sans-fallback leading-relaxed">
                    Soạn lập hồ sơ hoàn chỉnh điều lệ sáng lập doanh nghiệp, danh sách cổ đông, giấy đăng ký nộp Sở Kế Hoạch Đầu Tư theo quy cách chuẩn nhất. Chuyển hồ sơ tận nhà riêng / cơ quan của khách hàng để ký duyệt nội bộ, tránh làm mất thời gian đi lại của khách hàng.
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs text-slate-500 pt-1 font-sans-fallback">
                    <span className="px-2 py-1 bg-slate-100 rounded">Thời gian soạn thảo: 12 Giờ</span>
                    <span className="px-2 py-1 bg-slate-100 rounded">Ký tận nhà riêng</span>
                  </div>
                </div>
                <div className="flex justify-start md:justify-end md:order-1 md:pr-12 relative">
                  {/* Circle dot marker */}
                  <div className="absolute top-1/2 -right-3.5 w-7 h-7 bg-brand-gold-500 text-white rounded-full flex items-center justify-center font-bold text-xs ring-4 ring-white -translate-y-1/2 -mr-0.5 hidden md:flex">2</div>
                  
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 w-full max-w-md shadow-sm">
                    <p className="text-xs text-slate-400 font-mono mb-2">QUY CHUẨN KÝ TẬN NƠI</p>
                    <p className="text-sm font-bold text-slate-800 font-sans-fallback mb-1">Tuân thủ quy trình kiểm soát chữ ký chuẩn</p>
                    <p className="text-xs text-slate-500 font-sans-fallback">Nhân viên của Thiên Luật Phát trực tiếp mang hồ sơ cho các thành viên ký, hướng dẫn điền nét chữ chuẩn không bị Sở trả lại.</p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="md:text-right space-y-3 md:pr-12 md:order-1">
                  <span className="inline-block py-1 px-3.5 bg-brand-gold-500/10 text-brand-gold-600 text-xs font-bold rounded-full font-mono">BƯỚC 3</span>
                  <h3 className="text-xl sm:text-2xl font-serif text-brand-blue-900 font-semibold">Nộp Hồ Sơ & Bàn Giao Kết Quả Tận Tay</h3>
                  <p className="text-slate-600 text-sm font-sans-fallback leading-relaxed">
                    Chuyên viên nộp hồ sơ, giải trình điều chỉnh trực tiếp với chuyên viên Sở Kế hoạch Đầu tư. Thay mặt nhận kết quả Giấy đăng ký kinh doanh bản chính, chuyển khắc con dấu tròn pháp nhân bằng đồng đảm bảo chất lượng, chuyển giao tận nhà miễn phí mọi kết quả.
                  </p>
                  <div className="flex flex-wrap md:justify-end gap-2 text-xs text-slate-500 pt-1 font-sans-fallback">
                    <span className="px-2 py-1 bg-slate-100 rounded">Thủ tục Sở: 3 Ngày làm việc</span>
                    <span className="px-2 py-1 bg-slate-100 rounded">Bàn giao tận tay khách</span>
                  </div>
                </div>
                <div className="flex justify-start md:justify-start md:order-2 md:pl-12 relative">
                  {/* Circle dot marker */}
                  <div className="absolute top-1/2 -left-3.5 w-7 h-7 bg-brand-gold-500 text-white rounded-full flex items-center justify-center font-bold text-xs ring-4 ring-white -translate-y-1/2 -ml-0.5 hidden md:flex">3</div>
                  
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 w-full max-w-md shadow-sm">
                    <p className="text-xs text-slate-400 font-mono mb-2">QUY CHUẨN BÀN GIAO</p>
                    <p className="text-sm font-bold text-slate-800 font-sans-fallback mb-1">Bàn giao kèm hóa đơn GTGT đầy đủ</p>
                    <p className="text-xs text-slate-500 font-sans-fallback">Gồm giấy phép bản gốc, con dấu bỏ hộp nhung, cẩm nang thuế năm khởi nghiệp để đảm bảo an tâm nhất.</p>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* WHY CHOOSE US - METRICS SECTION */}
      <section id="about-section" className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Column */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs uppercase tracking-widest text-brand-gold-600 font-bold block font-sans-fallback">UY TÍN HƠN 10 NĂM HOẠT ĐỘNG</span>
              <h2 className="text-3xl sm:text-4xl font-serif text-brand-blue-900 font-semibold leading-tight">
                Vì Sao 3,500+ Doanh Nghiệp Lựa Chọn Ký Kết Khởi Nghiệp?
              </h2>
              <p className="text-slate-600 text-sm font-sans-fallback leading-relaxed">
                Chúng tôi không cạnh tranh bằng mức giá phá rẻ bất chấp quy pháp. Thiên Luật Phát tập trung kiến tạo chất lượng, mang đến sự minh bạch tối đa và an toàn pháp chất với một chi phí hợp lý nhất.
              </p>

              <div className="space-y-4 pt-4">
                
                <div className="flex items-start space-x-3">
                  <div className="p-1 text-emerald-600 bg-emerald-50 rounded-full mt-1">
                    <Check className="h-4 w-4 stroke-[3]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 font-sans-fallback">Cam Kết Giá Trọn Gói - Không Phát Sinh Phí Ẩn</h4>
                    <p className="text-xs text-slate-500 font-sans-fallback">Tất cả chi phí nộp nhà nước, soạn hồ sơ được chốt duy nhất một lần trên hợp đồng pháp lý dịch vụ.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-1 text-emerald-600 bg-emerald-50 rounded-full mt-1">
                    <Check className="h-4 w-4 stroke-[3]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 font-sans-fallback">Bảo mật tuyệt mật thông tin khách hàng</h4>
                    <p className="text-xs text-slate-500 font-sans-fallback">Hồ sơ thông tin cá nhân, ý tưởng dự án của bạn được cam kết giữ kín tuyệt đối, không chia sẻ cho bất kỳ bên thứ ba nào.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-1 text-emerald-600 bg-emerald-50 rounded-full mt-1">
                    <Check className="h-4 w-4 stroke-[3]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 font-sans-fallback">Đền bù thỏa đáng nếu phát sinh lỗi xử lý thuế</h4>
                    <p className="text-xs text-slate-500 font-sans-fallback">Tự tin chịu trách nghiệm mọi lỗi sai sót từ chuyên viên kế toán thuế, sẵn sàng chịu phạt hành chính thay khách.</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Metrics Checklist Columns */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">

              {/* Advantage Card 1 */}
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:-translate-y-1 transition-transform">
                <div className="w-12 h-12 bg-amber-50 rounded-lg text-brand-gold-600 flex items-center justify-center mb-4">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-serif font-semibold text-brand-blue-900 mb-2">Đại Chuẩn Hợp Pháp Kế Toán</h3>
                <p className="text-xs text-slate-600 font-sans-fallback leading-relaxed">
                  Thiên Luật Phát sở hữu đội ngũ kế toán trưởng đạt chứng chỉ hành nghề thuế quốc gia do Bộ Tài Chính trực tiếp công nhận, am hiểu sâu biến động thông tư chính sách năm 2026.
                </p>
              </div>

              {/* Advantage Card 2 */}
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:-translate-y-1 transition-transform">
                <div className="w-12 h-12 bg-blue-50 rounded-lg text-brand-blue-900 flex items-center justify-center mb-4">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-serif font-semibold text-brand-blue-900 mb-2">99,8% Hồ Sơ Được Sở Phê Duyệt</h3>
                <p className="text-xs text-slate-600 font-sans-fallback leading-relaxed">
                  Quá trình kiểm soát và rà soát hồ sơ 3 tầng nghiêm ngặt giúp đạt tỷ lệ xử lý nộp Sở KH&ĐT duyệt thành công ngay từ vòng nộp đầu tiên mà không bị trì hoãn sữa đổi.
                </p>
              </div>

              {/* Advantage Card 3 */}
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:-translate-y-1 transition-transform">
                <div className="w-12 h-12 bg-emerald-50 rounded-lg text-emerald-600 flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-serif font-semibold text-brand-blue-900 mb-2">Hỗ Trợ Kỹ Thuật Số Khẩn Cấp</h3>
                <p className="text-xs text-slate-600 font-sans-fallback leading-relaxed">
                  Đường dây hotline hỗ trợ sự cố hóa đơn điện tử chữ ký số luôn túc trực, hướng dẫn kế toán nội bộ xuất hóa đơn cả cuối tuần, ngày lễ.
                </p>
              </div>

              {/* Advantage Card 4 */}
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:-translate-y-1 transition-transform">
                <div className="w-12 h-12 bg-purple-50 rounded-lg text-purple-600 flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-serif font-semibold text-brand-blue-900 mb-2">Miễn Phí Tư Vấn Chuỗi Thuế</h3>
                <p className="text-xs text-slate-600 font-sans-fallback leading-relaxed">
                  Cung cấp các buổi tư vấn chuyên đề về cách khai giảm chi phí thuế TNDN, cân bằng dòng tiền giữa công ty đại diện và các công ty con liên kết hiệu quả.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* VERIFIABLE TESTIMONIALS SECTION */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs uppercase tracking-widest text-brand-gold-600 font-bold block font-sans-fallback">ĐỒNG HÀNH CÙNG KHÁCH HÀNG</span>
            <h2 className="text-3xl sm:text-4xl font-serif text-brand-blue-900 font-semibold">Khách Hàng Nói Gì Về Chúng Tôi</h2>
            <p className="text-slate-600 text-sm max-w-xl mx-auto font-sans-fallback">
              Những đánh giá chân thực từ chính các đối tác khởi nghiệp đã đặt nền móng phát triển thành lập văn phòng cùng Thiên Luật Phát.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Testimonial Card 1 */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex text-amber-400">
                  {"★★★★★".split("").map((star, i) => <span key={i} className="text-lg">★</span>)}
                </div>
                <p className="text-slate-700 italic text-sm font-sans-fallback leading-relaxed">
                  "Tôi rất ấn tượng với dịch vụ kế toán trọn gói của Thiên Luật Phát. Trước kia tự làm hay bị phạt vì nộp trễ báo cáo môn bài, từ ngày ủy quyền cho công ty, sổ sách chuẩn chỉnh 100%, tôi yên tâm mở rộng sản xuất mặt hàng gia dụng."
                </p>
              </div>
              <div className="flex items-center space-x-3 pt-4 border-t border-slate-200/60">
                <div className="h-10 w-10 bg-brand-blue-900 rounded-full text-white flex items-center justify-center font-bold text-xs uppercase">
                  HA
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 font-sans-fallback">Chị Nguyễn Hồng Anh</p>
                  <p className="text-[10px] text-slate-400 font-sans-fallback">CEO - Công ty SX Gia Dụng Hồng Anh</p>
                </div>
              </div>
            </div>

            {/* Testimonial Card 2 */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex text-amber-400">
                  {"★★★★★".split("").map((star, i) => <span key={i} className="text-lg">★</span>)}
                </div>
                <p className="text-slate-700 italic text-sm font-sans-fallback leading-relaxed">
                  "Thiên Luật Phát bàn giao giấy phép đăng ký kinh doanh đúng cam kết sau 3 ngày làm việc. Nhân viên mang xe con dấu tròn đến tận văn phòng riêng của tôi. Dịch vụ soạn hồ sơ hỗ trợ cả chủ trương người góp vốn kín kẽ, uy tín."
                </p>
              </div>
              <div className="flex items-center space-x-3 pt-4 border-t border-slate-200/60">
                <div className="h-10 w-10 bg-brand-blue-900 rounded-full text-white flex items-center justify-center font-bold text-xs uppercase">
                  TL
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 font-sans-fallback">Anh Trần Tiến Luật</p>
                  <p className="text-[10px] text-slate-400 font-sans-fallback">Sáng lập - Chuỗi Cafe Acoustic Cỏ Lạ</p>
                </div>
              </div>
            </div>

            {/* Testimonial Card 3 */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex text-amber-400">
                  {"★★★★★".split("").map((star, i) => <span key={i} className="text-lg">★</span>)}
                </div>
                <p className="text-slate-700 italic text-sm font-sans-fallback leading-relaxed">
                  "Ban đầu tôi rất lo lắng về thủ tục xin Giấy phép an toàn vệ sinh thực phẩm do xưởng chiên thực phẩm phức tạp, tuy nhiên nhờ sự tư vấn sắp đặt khảo sát chuẩn của luật sư Thiên Luật Phát xưởng đã được duyệt thanh tra 100% thuận lợi."
                </p>
              </div>
              <div className="flex items-center space-x-3 pt-4 border-t border-slate-200/60">
                <div className="h-10 w-10 bg-brand-blue-900 rounded-full text-white flex items-center justify-center font-bold text-xs uppercase">
                  MH
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 font-sans-fallback">Bà Võ Mỹ Hương</p>
                  <p className="text-[10px] text-slate-400 font-sans-fallback">Giám Đốc Kinh Doanh - Thực Phẩm Xanh FoodCO</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq-section" className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs uppercase tracking-widest text-brand-gold-600 font-bold block font-sans-fallback">HỎI ĐÁP PHÁP CHẾ DOANH NGHIỆP</span>
            <h2 className="text-3xl font-serif text-brand-blue-900 font-semibold text-center">Các Vấn Đề Khách Hàng Thường Hỏi</h2>
            <p className="text-slate-600 text-sm font-sans-fallback text-center">
              Tổng hợp giải pháp cho các tình huống phát sinh phổ biến nhất khi chuẩn bị làm giấy tờ kinh doanh tại Việt Nam năm 2026.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Cần chuẩn bị giấy tờ cá nhân gì khi muốn thành lập công ty?",
                a: "Bạn chỉ cần cung cấp 01 bản chụp ảnh hoặc scan rõ nét gốc của Căn cước công dân (CCCD), Chứng minh nhân dân hoặc Hộ chiếu của tất cả người góp vốn. Bản sao không quá hạn sử dụng 15 năm. Toàn bộ hồ sơ thành lập còn lại đều do Thiên Luật Phát chịu trách nhiệm soạn thảo và trình ký tận nơi."
              },
              {
                q: "Mức vốn điều lệ tối thiểu và tối đa khi mở doanh nghiệp là bao nhiêu?",
                a: "Luật Doanh nghiệp không quy định mức vốn điều lệ tối thiểu hoặc tối đa cho các ngành kinh doanh bình thường. Bạn tự quyết định mức vốn và chịu trách nhiệm dân sự tương thích trên số vốn đã cam kết góp trong 90 ngày. Tuy nhiên, một số ngành đăng ký đặc thù (ngân hàng, tài chính, bất động sản...) sẽ yêu cầu vốn pháp định tối thiểu bắt buộc khác nhau."
              },
              {
                q: "Sau khi có Giấy ĐKKD gốc, tôi có phải bắt đầu nộp thuế ngay lập tức?",
                a: "Chưa nộp thuế doanh thu ngay nhưng bạn cần làm thủ tục ban đầu bắt buộc: nộp Tờ khai lệ phí môn bài (Thường được miễn phí năm đầu tiên tùy quy định hỗ trợ), thông báo mở tài khoản ngân hàng liên thông cơ quan thuế, mua chữ ký số (Token ID) để nộp tờ khai quý và hóa đơn điện tử để xuất bán hàng. Thiên Luật Phát sẽ hướng dẫn trọn gói miễn phí các bước này."
              },
              {
                q: "Công ty của tôi ban đầu không phát sinh đơn hàng, doanh thu thì có cần khai báo sổ kế toán?",
                a: "BẮT BUỘC. Ngay cả khi công ty không có hoạt động mua bán hay doanh thu chi phí phát sinh, định kỳ mỗi quý doanh nghiệp vẫn phải nộp tờ khai báo cáo thuế giá trị gia tăng trống và tờ khai báo cáo tình hình sử dụng hóa đơn cho Cơ quan Thuế quản lý trực tiếp. Nếu không nộp, doanh nghiệp sẽ bị phạt hành chính chậm nộp rất nặng."
              },
              {
                q: "Tôi có thể đặt vị trí địa chỉ căn hộ chung cư làm trụ sở công ty được không?",
                a: "Theo Luật Nhà ở Việt Nam, căn hộ chỉ phục vụ chức năng để ở và KHÔNG được phép sử dụng đặt làm trụ sở chính của doanh nghiệp, văn phòng đại diện hoặc địa điểm kinh doanh chính thức. Bạn bắt buộc phải chọn nhà riêng mặt đất, tòa nhà văn phòng cho thuê chuyên dụng hoặc các mô hình văn phòng ảo hợp hợp thức hóa khác."
              }
            ].map((faq, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm transition-colors"
              >
                <button
                  onClick={() => setFaqOpenIndex(faqOpenIndex === index ? null : index)}
                  className="w-full py-4.5 px-6 text-left flex items-start justify-between space-x-4 cursor-pointer focus:outline-none"
                >
                  <div className="flex items-start space-x-3">
                    <HelpCircle className="h-5 w-5 text-brand-gold-500 mt-0.5 flex-shrink-0" />
                    <span className="font-serif font-semibold text-slate-800 text-sm sm:text-base leading-snug">
                      {faq.q}
                    </span>
                  </div>
                  <ChevronDown 
                    className={`h-5 w-5 text-slate-400 flex-shrink-0 transition-transform duration-200 mt-0.5 ${
                      faqOpenIndex === index ? "rotate-180 text-brand-gold-500" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {faqOpenIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-6 pb-5 pt-1 border-t border-slate-100 text-slate-650 text-xs sm:text-sm font-sans-fallback leading-relaxed bg-slate-50/50">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* MAP AND COMPACT OFFICE INFORMATION */}
      <section className="bg-slate-100 py-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-brand-blue-900/10 border border-brand-blue-900/20 px-3 py-1 rounded-full text-brand-blue-900 text-xs tracking-wider uppercase font-semibold">
              <Map className="h-3.5 w-3.5" />
              <span>Chào Đón Khách Đến Văn Phòng</span>
            </div>
            
            <h2 className="text-3xl font-serif text-brand-blue-900 font-semibold leading-tight">Văn Phòng Trụ Sở Thiên Luật Phát</h2>
            <p className="text-slate-600 text-sm font-sans-fallback leading-relaxed">
              Tọa lạc tại khu trung tâm dễ dàng di chuyển, văn phòng Thiên Luật Phát mở cửa đón tiếp các khách hàng doanh nghiệp từ Thứ 2 đến sáng Thứ 7 hàng tuần để trao đổi trực tiếp hoặc hỗ trợ ký tá giấy phép doanh nghiệp nhanh.
            </p>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start space-x-3 text-slate-700">
                <MapPin className="h-5 w-5 text-brand-gold-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-bold font-sans-fallback text-slate-800">Trụ sở Hồ Chí Minh (Nhận Hồ Sơ Toàn Quốc)</p>
                  <p className="text-xs text-slate-500 font-sans-fallback">Địa chỉ: Lầu 5, Tòa nhà VIP, 120-122 Đường Nguyễn Thế Truyện, Phường Tân Sơn Nhì, Quận Tân Phú, TPHCM.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-slate-700">
                <Mail className="h-5 w-5 text-brand-gold-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-bold font-sans-fallback text-slate-800">Hòm thư tiếp nhận đại lý / Pháp lý doanh nghiệp</p>
                  <p className="text-xs text-slate-500 font-sans-fallback font-mono">lienhe@thienluatphat.vn / trolyphaply@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-slate-700">
                <Calendar className="h-5 w-5 text-brand-gold-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-bold font-sans-fallback text-slate-800">Giờ hoạt động đón tiếp khách</p>
                  <p className="text-xs text-slate-500 font-sans-fallback">Sáng: 08h00 - 12h00 | Chiều: 13h30 - 17h30 (Thứ Hai đến hết sáng Thứ Bảy)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-4 shadow-md h-80 relative overflow-hidden flex flex-col justify-between">
            {/* Elegant Vector Mock Map Representing Legal Security */}
            <div className="absolute inset-4 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center">
              {/* Fake abstract visual stylized map so we don't depend on fragile iFrame scripts */}
              <div className="absolute inset-0 bg-sky-50 opacity-40"></div>
              {/* Grid abstract patterns representation of map roads */}
              <div className="absolute top-1/3 left-0 right-0 h-4 bg-slate-300 -rotate-12 transform origin-center"></div>
              <div className="absolute top-2/3 left-0 right-0 h-3 bg-slate-300 5rotate-12 transform origin-center"></div>
              <div className="absolute left-1/3 top-0 bottom-0 w-4 bg-slate-350 rotate-3 transform origin-center"></div>
              <div className="absolute left-2/3 top-0 bottom-0 w-3 bg-slate-350 -rotate-3 transform origin-center"></div>
              
              {/* Animated Map Pin Representing Office Location */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="p-3 bg-brand-blue-950 rounded-full text-brand-gold-500 shadow-xl border-2 border-white ring-8 ring-brand-gold-500/20 animate-bounce">
                  <Scale className="h-6 w-6" />
                </div>
                <div className="mt-2 bg-brand-blue-950 text-white text-[10px] font-bold py-1 px-2.5 rounded-lg border border-brand-gold-500 flex items-center space-x-1 shadow-lg">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                  <span>Thiên Luật Phát (TÂN PHÚ, TPHCM)</span>
                </div>
                <p className="text-[9px] text-slate-400 mt-0.5">Số 120 Đường Nguyễn Thế Truyện</p>
              </div>

              {/* Blue graphical compass and map grids */}
              <div className="absolute bottom-3 right-3 p-1.5 bg-white/80 rounded border shadow text-[9px] font-mono text-slate-500">
                10.7981° N, 106.6340° E
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* INTERACTIVE GENERAL CALL TO ACTION BUTTON FOR APPOINTMENTS */}
      <section className="bg-brand-blue-950 py-12 text-white text-center border-t border-brand-blue-900 relative">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif">Đừng Để Rủi Ro Pháp Lý Cản Bước Ước Mơ Kinh Doanh Của Bạn</h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto font-sans-fallback">
            Chỉ với một cuộc gọi, toàn bộ thủ tục pháp lý kinh doanh phức tạp sẽ được bàn giao cho luật sư. Được tư vấn đúng mô hình công ty ban đầu giúp bạn tiết kiệm hàng chục triệu tiền thuế môn bài, thuế suất khấu trừ sau này.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a 
              href="tel:0901234567"
              className="w-full sm:w-auto px-6 py-3.5 bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-blue-950 font-bold rounded-lg text-xs tracking-wider uppercase flex items-center justify-center space-x-2 shadow-lg"
            >
              <Phone className="h-4 w-4" />
              <span>Gọi Miễn Phí: 090.1234.567</span>
            </a>
            <button
              onClick={() => openConsultForService("Yêu cầu tư vấn nhanh từ khu vực CTA")}
              className="w-full sm:w-auto px-6 py-3.5 bg-brand-blue-900 hover:bg-brand-blue-800 border border-slate-700 text-slate-200 text-xs tracking-wider uppercase font-bold rounded-lg cursor-pointer"
            >
              Đặt lịch hẹn tư vấn tại nhà
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className="bg-brand-blue-950 text-slate-400 text-xs py-16 border-t border-brand-blue-900 font-sans-fallback">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* Identity & Licensing */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center space-x-3 text-white">
              <div className="p-2 bg-brand-gold-500 text-brand-blue-950 rounded-lg">
                <Scale className="h-5 w-5" />
              </div>
              <span className="font-serif font-bold text-lg tracking-tight">THIÊN LUẬT PHÁT</span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              Công ty Luật Đầu tư & Kế Toán Doanh Nghiệp Thiên Luật Phát là cơ sở pháp lý độc lập hoạt động theo Luật Doanh nghiệp, Luật Kế toán và Luật Luật sư của Quốc hội nước Cộng hòa Xã hội Chủ nghĩa Việt Nam.
            </p>

            <div className="space-y-2 border-l-2 border-brand-gold-500/40 pl-4 py-1 text-[11px] text-slate-400">
              <p>📍 <strong>Trụ sở chính:</strong> Lầu 5, Tòa nhà VIP, 120-122 Đường Nguyễn Thế Truyện, Phường Tân Sơn Nhì, Quận Tân Phú, Thành phố Hồ Chí Minh.</p>
              <p>📇 <strong>Mã số doanh nghiệp:</strong> 0314567890 do Sở KH&ĐT TPHCM cấp lần đầu ngày 12/06/2016.</p>
              <p>💼 <strong>Người đại diện pháp luật:</strong> ThS. Luật Sư Nguyễn Thế Thiên (Đoàn Luật sư TPHCM).</p>
            </div>
          </div>

          {/* Quick links 1 */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-serif">Dịch vụ cốt lõi</h4>
            <ul className="space-y-2 text-[11px]">
              <li><a href="#services-section" onClick={() => setActiveTab("setup")} className="hover:text-brand-gold-400 transition-colors">Thành lập công ty TNHH</a></li>
              <li><a href="#services-section" onClick={() => setActiveTab("setup")} className="hover:text-brand-gold-400 transition-colors">Thành lập công ty Cổ Phần</a></li>
              <li><a href="#services-section" onClick={() => setActiveTab("accounting")} className="hover:text-brand-gold-400 transition-colors">Kế toán thuế trọn gói</a></li>
              <li><a href="#services-section" onClick={() => setActiveTab("changes")} className="hover:text-brand-gold-400 transition-colors">Thay đổi người đại diện</a></li>
              <li><a href="#services-section" onClick={() => setActiveTab("changes")} className="hover:text-brand-gold-400 transition-colors">Thay đổi địa chỉ kinh doanh</a></li>
            </ul>
          </div>

          {/* Quick links 2 */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-serif">Giấy phép & Bảo hộ</h4>
            <ul className="space-y-2 text-[11px]">
              <li><a href="#services-section" onClick={() => setActiveTab("licenses")} className="hover:text-brand-gold-400 transition-colors">Giấy phép ATVSTP</a></li>
              <li><a href="#services-section" onClick={() => setActiveTab("licenses")} className="hover:text-brand-gold-400 transition-colors">Độc quyền nhãn hiệu</a></li>
              <li><a href="#services-section" onClick={() => setActiveTab("licenses")} className="hover:text-brand-gold-400 transition-colors">Giấy phép lao động</a></li>
              <li><a href="#services-section" onClick={() => setActiveTab("licenses")} className="hover:text-brand-gold-400 transition-colors">Thẻ tạm trú ngoại tộc</a></li>
              <li><a href="#services-section" onClick={() => setActiveTab("changes")} className="hover:text-brand-gold-400 transition-colors">Giải thể doanh nghiệp</a></li>
            </ul>
          </div>

          {/* Contacts info right */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-serif">Đăng ký bản tin pháp lý</h4>
            <p className="text-[11px] text-slate-400">Đăng ký để nhận sớm nhất thông báo thay đổi mẫu hóa đơn điện tử định kỳ từ Tổng cục Thuế Việt Nam.</p>
            
            {!newsletterSuccess ? (
              <div className="flex items-center">
                <input 
                  type="email" 
                  placeholder="Email của bạn" 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full bg-brand-blue-950 border border-brand-blue-805 text-[11px] text-white py-2 px-3 rounded-l-md outline-none placeholder:text-slate-500"
                />
                <button 
                  onClick={() => {
                    if (newsletterEmail.trim().includes("@")) {
                      setNewsletterSuccess(true);
                    }
                  }}
                  className="bg-brand-gold-500 text-brand-blue-950 px-3 py-2 rounded-r-md hover:bg-brand-gold-600 font-bold text-[11px] cursor-pointer"
                >
                  Đăng ký
                </button>
              </div>
            ) : (
              <div className="bg-emerald-950/45 border border-emerald-850 p-2.5 rounded-md text-emerald-300 text-[11px]">
                ✓ Đăng ký nhận thông tin Thuế thành công!
              </div>
            )}

            <div className="pt-2 flex items-center space-x-3 text-slate-450">
              <span className="text-[10px] uppercase font-bold text-slate-550">KẾT NỐI:</span>
              <a href="#" className="hover:text-white transition-colors">Facebook</a>
              <span className="text-slate-700">|</span>
              <a href="#" className="hover:text-white transition-colors">Zalo</a>
              <span className="text-slate-700">|</span>
              <a href="#" className="hover:text-white transition-colors">Youtube</a>
            </div>
          </div>

        </div>

        {/* Bottom Rights copyright row */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-brand-blue-900/60 text-center text-[10px] text-slate-500 font-mono space-y-2">
          <p>© 2026 THIÊN LUẬT PHÁT. Tất cả các quyền được bảo lưu. Thiết kế và vận hành theo quy cách pháp tế Việt Nam.</p>
          <p className="text-[9px] uppercase tracking-wider text-slate-600">Trang web hỗ trợ tối ưu hóa SEO địa lý và hiển thị di động xuất sắc bởi Frontend Dev.</p>
        </div>
      </footer>

      {/* PERSISTENT CONSULTATION INTAKE MODAL */}
      <AnimatePresence>
        {consultationModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              
              {/* Back backdrop overlay */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setConsultationModalOpen(false)}
                className="fixed inset-0 bg-slate-900/80 transition-opacity" 
                aria-hidden="true"
              ></motion.div>

              {/* Set vertical screen spacing helper */}
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

              {/* Modal Box */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2 }}
                className="inline-block align-bottom bg-brand-blue-950 rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full border border-brand-blue-800"
              >
                <div className="relative p-6 sm:p-8 space-y-4 text-white">
                  
                  {/* Close Button */}
                  <button 
                    onClick={() => setConsultationModalOpen(false)}
                    className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>

                  <div className="flex items-center space-x-3 text-brand-gold-500 mb-2">
                    <Scale className="h-6 w-6" />
                    <h3 className="text-xl sm:text-2xl font-serif">Đăng Ký Tư Vấn Pháp Lý</h3>
                  </div>

                  <p className="text-slate-300 text-xs sm:text-sm font-sans-fallback leading-relaxed">
                    Đang đăng ký cho: <strong className="text-brand-gold-400">{selectedServiceForModal}</strong>. Vui lòng gửi lại số điện thoại, Trưởng ban cố vấn pháp lý sẽ trực tiếp liên hệ và bảo mật thông tin tuyệt đối.
                  </p>

                  <form onSubmit={handleConsultationSubmit} className="space-y-4 pt-2">
                    <div>
                      <label className="block text-slate-300 text-[10px] font-bold uppercase tracking-widest mb-1.5">Họ và Tên khách hàng *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Ví dụ: Nguyễn Thế Nam" 
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full bg-brand-blue-900 border border-brand-blue-800 focus:border-brand-gold-500 rounded-lg py-2.5 px-4 text-white text-xs sm:text-sm outline-none transition-colors font-sans-fallback"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-300 text-[10px] font-bold uppercase tracking-widest mb-1.5">Số điện thoại / Zalo *</label>
                        <input 
                          type="tel" 
                          required
                          placeholder="0912xxxxxx" 
                          value={clientPhone}
                          onChange={(e) => setClientPhone(e.target.value)}
                          className="w-full bg-brand-blue-900 border border-brand-blue-800 focus:border-brand-gold-500 rounded-lg py-2.5 px-4 text-white text-xs sm:text-sm outline-none transition-colors font-sans-fallback"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 text-[10px] font-bold uppercase tracking-widest mb-1.5">Địa chỉ email (nếu có)</label>
                        <input 
                          type="email" 
                          placeholder="khachhang@gmail.com" 
                          value={clientEmail}
                          onChange={(e) => setClientEmail(e.target.value)}
                          className="w-full bg-brand-blue-900 border border-brand-blue-800 focus:border-brand-gold-500 rounded-lg py-2.5 px-4 text-white text-xs sm:text-sm outline-none transition-colors font-sans-fallback"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-300 text-[10px] font-bold uppercase tracking-widest mb-1.5">Nhu cầu hoặc thắc mắc cụ thể</label>
                      <textarea 
                        rows={3}
                        placeholder="Hãy ghi chú thêm về ngành kinh doanh của bạn, địa bàn đăng ký hoặc các phụ lục bổ sung khác..." 
                        value={clientMessage}
                        onChange={(e) => setClientMessage(e.target.value)}
                        className="w-full bg-brand-blue-900 border border-brand-blue-800 focus:border-brand-gold-500 rounded-lg py-2 px-3 text-white text-xs sm:text-sm outline-none transition-colors resize-none font-sans-fallback"
                      ></textarea>
                    </div>

                    {formValidationMsg && (
                      <p className="text-red-400 text-xs font-semibold bg-red-400/10 p-2 rounded border border-red-400/20 flex items-center space-x-1">
                        <ShieldAlert className="h-4 w-4 flex-shrink-0" />
                        <span>{formValidationMsg}</span>
                      </p>
                    )}

                    <div className="pt-4 flex items-center justify-end space-x-3">
                      <button 
                        type="button"
                        onClick={() => setConsultationModalOpen(false)}
                        className="px-4 py-2 text-xs sm:text-sm border border-slate-700 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                      >
                        Huỷ bỏ
                      </button>
                      
                      <button 
                        type="submit"
                        className="px-6 py-2 bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-blue-950 font-bold text-xs sm:text-sm rounded-lg hover:shadow-md transition-colors cursor-pointer"
                      >
                        Gửi Đăng Ký
                      </button>
                    </div>

                  </form>

                  {/* Submit success message block */}
                  <AnimatePresence>
                    {consultationSubmitted && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-brand-blue-950/95 p-6 sm:p-8 flex flex-col items-center justify-center text-center z-10 space-y-4"
                      >
                        <div className="w-16 h-16 bg-brand-gold-500/20 text-brand-gold-500 rounded-full flex items-center justify-center shadow-inner">
                          <Check className="h-10 w-10 stroke-[3]" />
                        </div>
                        <h4 className="text-xl sm:text-2xl font-serif text-white">Đăng Ký Thành Công</h4>
                        <p className="text-slate-300 text-xs sm:text-sm max-w-sm font-sans-fallback">
                          Xin chân thành cảm ơn. Chuyên viên pháp lý hàng đầu của Thiên Luật Phát sẽ liên lạc với <strong>{clientName || "Quý khách"}</strong> trong khung giờ sớm nhất.
                        </p>
                        <button 
                          onClick={() => setConsultationModalOpen(false)}
                          className="px-5 py-2.5 bg-brand-gold-500 text-brand-blue-950 font-bold text-xs rounded-lg uppercase tracking-wide transition-colors cursor-pointer"
                        >
                          Hoàn tất
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              </motion.div>

            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
