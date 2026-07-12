const items = [
  { id: 101, name: "گوشی موبایل سامسونگ A55", price: 18500000, oldPrice: 19900000, categoryId: 1, shopId: 1, image: "/demos/shahin-bazaar/images/galaxy-A55.jpg", description: "گوشی موبایل سامسونگ مدل Galaxy A55 5G با رم 8 گیگ و حافظه 256 گیگ - کاملا نو و با گارانتی 18 ماهه", isPreOrder: false, inStock: 12, createdAt: "1403/01/20" },
  { id: 102, name: "هدفون بی‌سیم سونی WH-1000XM5", price: 15800000, oldPrice: null, categoryId: 1, shopId: 1, image: "/demos/shahin-bazaar/images/WH-1000XM5.jpg", description: "هدفون حذف نویز فعال سونی مدل WH-1000XM5 - کیفیت صدای فوق‌العاده و باتری 30 ساعته", isPreOrder: false, inStock: 5, createdAt: "1403/02/10" },
  { id: 103, name: "لپ‌تاپ ایسوس VivoBook 15", price: 35900000, oldPrice: 38900000, categoryId: 1, shopId: 1, image: "/demos/shahin-bazaar/images/VivoBook-15.jpg", description: "لپ‌تاپ ایسوس VivoBook 15 با پردازنده Core i7 و 16 گیگ رم و SSD 512 گیگ", isPreOrder: true, preOrderDate: "1403/04/15", inStock: 0, createdAt: "1403/03/01" },
  { id: 104, name: "هدفون بی سیم جدید مدل X200", price: 4500000, oldPrice: null, categoryId: 1, shopId: 1, image: "/demos/shahin-bazaar/images/X200.jpg", description: "هدفون بی سیم بلوتوثی با کیفیت صدای استریو و میکروفن داخلی - مناسب برای تماس و موسیقی", isPreOrder: true, preOrderDate: "1403/05/01", inStock: 0, createdAt: "1403/03/15" },
  { id: 105, name: "شارژر فست شارژ 65 وات", price: 890000, oldPrice: null, categoryId: 1, shopId: 1, image: "/demos/shahin-bazaar/images/charger-65-w.jpg", description: "شارژر سریع 65 وات گانشی - مناسب برای لپ‌تاپ و گوشی - پورت USB-C", isPreOrder: false, inStock: 50, createdAt: "1403/01/05" },
  { id: 201, name: "کت و شلوار مردانه اسپورت", price: 4500000, oldPrice: 5800000, categoryId: 2, shopId: 2, image: "/demos/shahin-bazaar/images/kot&shalvar.jpg", description: "کت و شلوار اسپورت مردانه با پارچه کتان مرغوب - مناسب مجالس و مهمانی‌ها", isPreOrder: false, inStock: 8, createdAt: "1403/02/05" },
  { id: 202, name: "پیراهن زنانه مجلسی", price: 2800000, oldPrice: null, categoryId: 2, shopId: 2, image: "/demos/shahin-bazaar/images/lebas-majlesi-woman.jpg", description: "پیراهن زنانه مجلسی طرح دار با پارچه ساتن اعلا - سایزهای مختلف", isPreOrder: false, inStock: 15, createdAt: "1403/02/20" },
  { id: 203, name: "کفش ورزشی نایک اصل", price: 6500000, oldPrice: 7500000, categoryId: 2, shopId: 2, image: "/demos/shahin-bazaar/images/shoes-nike.jpg", description: "کفش ورزشی نایک مدل Revolution 6 - کف بالشتک‌دار و مناسب پیاده‌روی", isPreOrder: true, preOrderDate: "1403/04/20", inStock: 0, createdAt: "1403/03/10" },
  { id: 204, name: "شال و روسری ابریشمی", price: 580000, oldPrice: null, categoryId: 2, shopId: 2, image: "/demos/shahin-bazaar/images/shal-rosari.jpg", description: "شال و روسری ابریشمی طرح گل و بلبل - رنگ‌بندی متنوع - هدیه‌ای خاص برای عزیزان", isPreOrder: false, inStock: 30, createdAt: "1403/01/15" },
  { id: 205, name: "مانتو زنانه بهاره", price: 3200000, oldPrice: 3800000, categoryId: 2, shopId: 2, image: "/demos/shahin-bazaar/images/manto-bnahare.jpg", description: "مانتو زنانه بهاره مدل جدید - پارچه کتان خنک - مناسب بهار و تابستان", isPreOrder: false, inStock: 10, createdAt: "1403/02/28" },
  { id: 301, name: "ست ظروف غذاخوری 24 پارچه", price: 3800000, oldPrice: 4500000, categoryId: 3, shopId: 3, image: "/demos/shahin-bazaar/images/set-24nafare-food.jpg", description: "ست 24 پارچه ظروف غذاخوری چینی با طرح سنتی - شامل بشقاب، کاسه و فنجان", isPreOrder: false, inStock: 20, createdAt: "1403/01/10" },
  { id: 302, name: "قابلمه و تابه گرانیتی", price: 5200000, oldPrice: null, categoryId: 3, shopId: 3, image: "/demos/shahin-bazaar/images/ghablame-tabe.jpg", description: "ست قابلمه و تابه گرانیتی 7 تایی - دسته چوبی - نچسب و بادوام", isPreOrder: false, inStock: 6, createdAt: "1403/02/15" },
  { id: 303, name: "چراغ مطالعه LED", price: 890000, oldPrice: null, categoryId: 3, shopId: 3, image: "/demos/shahin-bazaar/images/desk-lamps.jpg", description: "چراغ مطالعه LED قابل تنظیم - شارژی - 3 حالته نوری - مناسب مطالعه و کار", isPreOrder: false, inStock: 25, createdAt: "1403/03/01" },
  { id: 304, name: "جاروبرقی رباتیک شیائومی", price: 15800000, oldPrice: 18500000, categoryId: 3, shopId: 3, image: "/demos/shahin-bazaar/images/xiamoi-jaro-barghi.jpg", description: "جاروبرقی رباتیک شیائومی مدل S20 - مجهز به سنسور نقشه‌برداری و کنترل با اپلیکیشن", isPreOrder: true, preOrderDate: "1403/05/10", inStock: 0, createdAt: "1403/03/20" },
  { id: 305, name: "سرویس قهوه‌خوری 12 نفره", price: 2500000, oldPrice: 3000000, categoryId: 3, shopId: 3, image: "/demos/shahin-bazaar/images/coffee-12-nafare.jpg", description: "سرویس قهوه‌خوری بلور 12 نفره - شامل فنجان، نعلبکی و قوری", isPreOrder: false, inStock: 10, createdAt: "1403/01/25" },
  { id: 401, name: "هندوانه شیرین (هر کیلو)", price: 28000, oldPrice: null, categoryId: 4, shopId: 4, image: "/demos/shahin-bazaar/images/watermnelon.jpg", description: "هندوانه شیرین و آبدار مزارع شاهین شهر - برداشت تازه - هر کیلو", isPreOrder: false, inStock: 200, createdAt: "1403/04/01" },
  { id: 402, name: "گوجه گیلاسی ارگانیک", price: 45000, oldPrice: 55000, categoryId: 4, shopId: 4, image: "/demos/shahin-bazaar/images/tomato-gilasi.jpg", description: "گوجه گیلاسی ارگانیک - بدون سم و کود شیمیایی - جعبه‌ای 3 کیلویی", isPreOrder: false, inStock: 60, createdAt: "1403/03/25" },
  { id: 403, name: "پیش‌خرید گندم مرغوب", price: 15000, oldPrice: null, categoryId: 4, shopId: 4, image: "/demos/shahin-bazaar/images/gandom.jpg", description: "پیش‌خرید گندم مرغوب از مزارع شاهین شهر - تحویل بعد از برداشت - هر کیلو", isPreOrder: true, preOrderDate: "1403/05/30", inStock: 0, createdAt: "1403/02/10" },
  { id: 404, name: "خیار گلخانه‌ای تازه", price: 22000, oldPrice: null, categoryId: 4, shopId: 4, image: "/demos/shahin-bazaar/images/cucumber.jpg", description: "خیار گلخانه‌ای تازه و بدون نقص - بسته‌بندی 2 کیلویی", isPreOrder: false, inStock: 100, createdAt: "1403/04/05" },
  { id: 405, name: "عسل طبیعی کوهستان", price: 280000, oldPrice: 350000, categoryId: 4, shopId: 4, image: "/demos/shahin-bazaar/images/honey.jpg", description: "عسل طبیعی کوهستان شاهین شهر - ارگانیک و خالص - ظرف 900 گرمی", isPreOrder: false, inStock: 30, createdAt: "1403/01/20" },
  { id: 501, name: "کرم ضدآفتاب SPF 50", price: 320000, oldPrice: 380000, categoryId: 5, shopId: 5, image: "/demos/shahin-bazaar/images/spf50-sunscreen-cream.jpg", description: "کرم ضدآفتاب صورت SPF 50 - مناسب پوست چرب و مختلط - 50 میلی‌لیتر", isPreOrder: false, inStock: 40, createdAt: "1403/03/05" },
  { id: 502, name: "عطر زنانه شنل شماره 5", price: 8500000, oldPrice: null, categoryId: 5, shopId: 5, image: "/demos/shahin-bazaar/images/chanel-n5.jpg", description: "عطر زنانه شنل مدل شماره 5 - اورجینال فرانسه - حجم 50 میلی‌لیتر", isPreOrder: false, inStock: 3, createdAt: "1403/02/15" },
  { id: 503, name: "سرم تقویت مو بایوفول", price: 450000, oldPrice: null, categoryId: 5, shopId: 5, image: "/demos/shahin-bazaar/images/serom-biofol.jpg", description: "سرم تقویت و رشد مو بایوفول - فاقد سولفات - 30 میلی‌لیتر", isPreOrder: true, preOrderDate: "1403/04/25", inStock: 0, createdAt: "1403/03/12" },
  { id: 504, name: "ست برس آرایشی حرفه‌ای", price: 890000, oldPrice: 1100000, categoryId: 5, shopId: 5, image: "/demos/shahin-bazaar/images/set-brush-pro.jpg", description: "ست 12 تایی برس آرایشی حرفه‌ای با کیف - موی طبیعی و مصنوعی", isPreOrder: false, inStock: 15, createdAt: "1403/01/30" },
  { id: 505, name: "ماسک صورت ژلاتینی طلا", price: 185000, oldPrice: null, categoryId: 5, shopId: 5, image: "/demos/shahin-bazaar/images/face-mask-gold.jpg", description: "ماسک صورت ژلاتینی طلا - جوان‌کننده و رفع چین و چروک - بسته 5 عددی", isPreOrder: false, inStock: 50, createdAt: "1403/02/25" },
];

export function getItemById(id) {
  return items.find(item => item.id === Number(id)) || null;
}

export function getItemsByCategory(categoryId) {
  return items.filter(item => item.categoryId === Number(categoryId));
}

export function getItemsByShop(shopId) {
  return items.filter(item => item.shopId === Number(shopId));
}

export function getLatestItems(limit = 10) {
  return [...items].sort((a, b) => b.id - a.id).slice(0, limit);
}

export function getPreOrderItems() {
  return items.filter(item => item.isPreOrder);
}

export default items;
