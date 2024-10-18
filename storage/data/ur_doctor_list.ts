export interface Doctor {
    id: number;
    name: string;
    specialty: string;
    location: string;
    image: any; 
    rating: number;
    yearsExperience: number;
    patients: number;
    about: string;
  }
  
  const doctors: Doctor[] = [
    { id: 1, name: "جان ڈو", specialty: "Oral Surgery", location: "لندن", image: require('../../assets/images/doctors/doctor1.png'), rating: 4.5, yearsExperience: 10, patients: 500, about: "اعلیٰ مہارت والا اورل سرجن جو پیچیدہ دانت نکالنے اور جبڑے کی سرجری میں مہارت رکھتا ہے۔"},
    { id: 2, name: "جین سمتھ", specialty: "Oral Surgery", location: "لندن", image: require('../../assets/images/doctors/doctor2.png'), rating: 4.0, yearsExperience: 8, patients: 450, about: "تجربہ کار اورل سرجن جو دانتوں کے امپلانٹس اور تعمیراتی طریقہ کار پر توجہ مرکوز کرتا ہے۔"},
    { id: 3, name: "سمانتھا جان", specialty: "Oral Surgery", location: "لندن", image: require('../../assets/images/doctors/doctor3.png'), rating: 4.8, yearsExperience: 12, patients: 600, about: "معروف اورل سرجن جو جبڑے کی درستگی کی سرجری اور چہرے کے صدمے میں مہارت رکھتا ہے۔"},
    { id: 4, name: "مائیکل براؤن", specialty: "Oral Surgery", location: "نیو یارک", image: require('../../assets/images/doctors/doctor4.png'), rating: 4.7, yearsExperience: 15, patients: 700, about: "ماہر اورل سرجن جو عقل داڑھ نکالنے اور اورل پیتھالوجی میں مہارت رکھتا ہے۔"},
    { id: 5, name: "ایملی ڈیوس", specialty: "Pedodontics", location: "شکاگو", image: require('../../assets/images/doctors/doctor5.png'), rating: 4.3, yearsExperience: 9, patients: 480, about: "پیار کرنے والی بچوں کی دانتوں کی ڈاکٹر جو بچوں کے دوستانہ علاج اور حفاظتی نگہداشت میں مہارت رکھتی ہے۔"},
    { id: 6, name: "ولیم ولسن", specialty: "Pedodontics", location: "لاس اینجلس", image: require('../../assets/images/doctors/doctor6.png'), rating: 4.6, yearsExperience: 11, patients: 550, about: "ماہر بچوں کی دانتوں کی ڈاکٹر جو ابتدائی بچپن کی دانتوں کی صحت اور کیویٹی روک تھام پر توجہ مرکوز کرتا ہے۔"},
    { id: 7, name: "اولیویا مارٹینز", specialty: "Pedodontics", location: "میامی", image: require('../../assets/images/doctors/doctor7.png'), rating: 4.4, yearsExperience: 13, patients: 620, about: "تجربہ کار بچوں کی دانتوں کی ڈاکٹر جو بچوں اور نوجوانوں کو نرمی سے دیکھ بھال فراہم کرتی ہے، دانتوں کی نشوونما اور ترقی پر توجہ مرکوز کرتی ہے۔"},
    { id: 8, name: "رابرٹ گارسیا", specialty: "Endodontics", location: "سان فرانسسکو", image: require('../../assets/images/doctors/doctor8.png'), rating: 4.9, yearsExperience: 18, patients: 800, about: "معروف اینڈوڈونٹسٹ جو پیچیدہ روٹ کینال کے علاج اور مائیکروسرجری میں مہارت رکھتا ہے۔"},
    { id: 9, name: "صوفیہ رابنسن", specialty: "Endodontics", location: "ہیوسٹن", image: require('../../assets/images/doctors/doctor9.png'), rating: 4.2, yearsExperience: 7, patients: 400, about: "ماہر اینڈوڈونٹسٹ جو درد کے انتظام اور دانتوں کو بچانے کی تکنیک پر توجہ مرکوز کرتی ہے۔"},
    { id: 10, name: "جیمز مارٹینز", specialty: "Endodontics", location: "ڈلاس", image: require('../../assets/images/doctors/doctor10.png'), rating: 4.1, yearsExperience: 14, patients: 670, about: "تجربہ کار اینڈوڈونٹسٹ جو ریٹریٹمنٹ کیسز اور اپیکویکٹومی طریقہ کار میں مہارت رکھتا ہے۔"},
    { id: 11, name: "میا لیوس", specialty: "Endodontics", location: "سان انتونیو", image: require('../../assets/images/doctors/doctor20.png'), rating: 4.8, yearsExperience: 11, patients: 600, about: "ماہر اینڈوڈونٹسٹ جو مریضوں کی تعلیم اور حفاظتی نگہداشت کے لیے پرجوش ہے۔"},
    { id: 12, name: "کرسٹوفر ینگ", specialty: "Prosthodontics", location: "سان ڈیاگو", image: require('../../assets/images/doctors/doctor14.png'), rating: 4.3, yearsExperience: 12, patients: 680, about: "تجربہ کار پروستھوڈونٹسٹ جو مکمل منہ کی بحالی اور کاسمیٹک ڈینٹسٹری میں مہارت رکھتا ہے۔"},
    { id: 13, name: "شارلٹ ایلن", specialty: "Prosthodontics", location: "آسٹن", image: require('../../assets/images/doctors/doctor15.png'), rating: 4.6, yearsExperience: 9, patients: 480, about: "ماہر پروستھوڈونٹسٹ جو امپلانٹ کے ذریعے سپورٹ شدہ پروستھسیس اور مسکراہٹ کی بحالی پر توجہ مرکوز کرتی ہے۔"},
    { id: 14, name: "ڈینیل کنگ", specialty: "Prosthodontics", location: "جیکسن ول", image: require('../../assets/images/doctors/doctor16.png'), rating: 4.4, yearsExperience: 14, patients: 690, about: "مخصوص پروستھوڈونٹسٹ جو CAD/CAM ٹیکنالوجی میں مہارت رکھتا ہے تاکہ دانتوں کی درست بحالی فراہم کی جا سکے۔"},
    { id: 15, name: "امیلیا رائٹ", specialty: "Orthodontics", location: "کولمبس", image: require('../../assets/images/doctors/doctor17.png'), rating: 4.9, yearsExperience: 17, patients: 780, about: "معروف ارتھوڈونٹسٹ جو پیچیدہ کیسز اور جدید بریکنگ تکنیکوں میں مہارت رکھتی ہے۔"},
    { id: 16, name: "ایتھن سکاٹ", specialty: "Orthodontics", location: "فورٹ ورتھ", image: require('../../assets/images/doctors/doctor18.png'), rating: 4.2, yearsExperience: 8, patients: 450, about: "ماہر ارتھوڈونٹسٹ جو ابتدائی مداخلت اور انٹرسیپٹیو ارتھوڈونٹکس پر توجہ مرکوز کرتا ہے۔"},
    { id: 17, name: "ابیگیل گرین", specialty: "Orthodontics", location: "انڈیاناپولس", image: require('../../assets/images/doctors/doctor19.png'), rating: 4.1, yearsExperience: 13, patients: 640, about: "تجربہ کار ارتھوڈونٹسٹ جو واضح الائنر تھراپی اور لنگوال بریکس میں مہارت رکھتی ہے۔"},
    { id: 18, name: "ایڈن بیکر", specialty: "Periodontics", location: "شارلٹ", image: require('../../assets/images/doctors/doctor13.png'), rating: 4.5, yearsExperience: 11, patients: 600, about: "مخصوص پیریوڈونٹسٹ جو مسوڑھوں کی بیماری کے علاج اور پیریوڈونٹل پلاسٹک سرجری میں مہارت رکھتا ہے۔"},
    { id: 19, name: "اسابیلا ہرنینڈز", specialty: "Periodontics", location: "فینکس", image: require('../../assets/images/doctors/doctor11.png'), rating: 4.5, yearsExperience: 10, patients: 550, about: "مخصوص پیریوڈونٹسٹ جو مسوڑھوں کی بیماریوں کی روک تھام اور علاج میں مہارت رکھتی ہے۔"},
    { id: 20, name: "ڈیوڈ کلارک", specialty: "Periodontics", location: "فلاڈیلفیا", image: require('../../assets/images/doctors/doctor12.png'), rating: 4.7, yearsExperience: 16, patients: 720, about: "ماہر پیریوڈونٹسٹ جو دانتوں کے امپلانٹس، مسوڑھوں کے گرافٹس اور پیریوڈونٹل تھیراپیز میں مہارت رکھتا ہے۔"}
  ];  
  
  export default doctors;
  