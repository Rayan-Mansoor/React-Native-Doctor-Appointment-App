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
    { id: 1, name: "ڈاکٹر جان ڈو", specialty: "Cardiology", location: "لندن", image: require('../../assets/doctor1.png'), rating: 4.5, yearsExperience: 10, patients: 500, about: "مریضوں کی دیکھ بھال کے شوقین تجربہ کار کارڈیالوجسٹ۔" },
    { id: 2, name: "ڈاکٹر جین سمتھ", specialty: "Dermatology", location: "لندن", image: require('../../assets/doctor2.png'), rating: 4.0, yearsExperience: 8, patients: 450, about: "جلد کی دیکھ بھال اور کاسمیٹک پروسیجرز میں ماہر ڈرمیٹولوجسٹ۔" },
    { id: 3, name: "ڈاکٹر سامنتھا جان", specialty: "Neurology", location: "لندن", image: require('../../assets/doctor3.png'), rating: 4.8, yearsExperience: 12, patients: 600, about: "نیورولوجیکل امراض کے علاج پر توجہ مرکوز کرنے والے نیورولوجسٹ۔" },
    { id: 4, name: "ڈاکٹر مائیکل براؤن", specialty: "Orthopedics", location: "نیویارک", image: require('../../assets/doctor4.png'), rating: 4.7, yearsExperience: 15, patients: 700, about: "جوڑوں کے متبادل اور کھیلوں کی چوٹوں میں ماہر آرتھوپیڈک سرجن۔" },
    { id: 5, name: "ڈاکٹر ایمیلی ڈیوس", specialty: "Gastroenterology", location: "شکاگو", image: require('../../assets/doctor5.png'), rating: 4.3, yearsExperience: 9, patients: 480, about: "نظام ہاضمہ کی صحت اور بیماریوں پر توجہ مرکوز کرنے والے گیسٹرو اینٹرولوجسٹ۔" },
    { id: 6, name: "ڈاکٹر ولیم ولسن", specialty: "Nephrology", location: "لاس اینجلس", image: require('../../assets/doctor6.png'), rating: 4.6, yearsExperience: 11, patients: 550, about: "گردے کے امراض اور رینل بیماریوں کے علاج میں ماہر نیفروولوجسٹ۔" },
    { id: 7, name: "ڈاکٹر اولیویا مارٹینیز", specialty: "Pulmonology", location: "میامی", image: require('../../assets/doctor7.png'), rating: 4.4, yearsExperience: 13, patients: 620, about: "سانس کی حالتوں اور پھیپھڑوں کی بیماریوں میں ماہر پلمونولوجسٹ۔" },
    { id: 8, name: "ڈاکٹر رابرٹ گارسیا", specialty: "Ophthalmology", location: "سان فرانسسکو", image: require('../../assets/doctor8.png'), rating: 4.9, yearsExperience: 18, patients: 800, about: "آنکھوں کی دیکھ بھال اور نظر کی اصلاح میں مہارت رکھنے والے آنکھوں کے ڈاکٹر۔" },
    { id: 9, name: "ڈاکٹر سوفیا رابنسن", specialty: "Pulmonology", location: "ہیوسٹن", image: require('../../assets/doctor9.png'), rating: 4.2, yearsExperience: 7, patients: 400, about: "سانس کے مسائل کے جامع علاج فراہم کرنے والے وقف شدہ پلمونولوجسٹ۔" },
    { id: 10, name: "ڈاکٹر جیمز مارٹینیز", specialty: "Nephrology", location: "ڈلاس", image: require('../../assets/doctor10.png'), rating: 4.1, yearsExperience: 14, patients: 670, about: "گردے کی دیکھ بھال اور ڈائلیسس میں مہارت رکھنے والے تجربہ کار نیفروولوجسٹ۔" },
    { id: 11, name: "ڈاکٹر اسابیلا ہرنینڈز", specialty: "Dermatology", location: "فینکس", image: require('../../assets/doctor11.png'), rating: 4.5, yearsExperience: 10, patients: 550, about: "جلد کی صحت اور کاسمیٹک ڈرمیٹولوجی پر توجہ مرکوز کرنے والے ڈرمیٹولوجسٹ۔" },
    { id: 12, name: "ڈاکٹر ڈیوڈ کلارک", specialty: "Gastroenterology", location: "فلاڈیلفیا", image: require('../../assets/doctor12.png'), rating: 4.7, yearsExperience: 16, patients: 720, about: "نظام ہاضمہ کی خرابیوں اور اینڈوسکوپک پروسیجرز میں مہارت رکھنے والے گیسٹرو اینٹرولوجسٹ۔" },
    { id: 13, name: "ڈاکٹر میا لیوس", specialty: "Neurology", location: "سان انتونیو", image: require('../../assets/doctor20.png'), rating: 4.8, yearsExperience: 11, patients: 600, about: "نیورولوجیکل حالات اور علاج میں ماہر نیورولوجسٹ۔" },
    { id: 14, name: "ڈاکٹر کرسٹوفر ینگ", specialty: "Orthopedics", location: "سان ڈیاگو", image: require('../../assets/doctor14.png'), rating: 4.3, yearsExperience: 12, patients: 680, about: "کھیلوں کی دوائیوں اور جوڑوں کی سرجری میں مہارت رکھنے والے آرتھوپیڈک سرجن۔" },
    { id: 15, name: "ڈاکٹر شارلٹ ایلن", specialty: "Cardiology", location: "آسٹن", image: require('../../assets/doctor15.png'), rating: 4.6, yearsExperience: 9, patients: 480, about: "دل کی صحت اور قلبی امراض پر توجہ مرکوز کرنے والے کارڈیالوجسٹ۔" },
    { id: 16, name: "ڈاکٹر ڈینیئل کنگ", specialty: "Cardiology", location: "جیکسن ویل", image: require('../../assets/doctor16.png'), rating: 4.4, yearsExperience: 14, patients: 690, about: "روک تھام کارڈیالوجی اور دل کی دیکھ بھال میں مہارت رکھنے والے کارڈیالوجسٹ۔" },
    { id: 17, name: "ڈاکٹر املیا رائٹ", specialty: "Ophthalmology", location: "کولمبس", image: require('../../assets/doctor17.png'), rating: 4.9, yearsExperience: 17, patients: 780, about: "آنکھوں کی جامع دیکھ بھال کی خدمات اور علاج فراہم کرنے والے آنکھوں کے ڈاکٹر۔" },
    { id: 18, name: "ڈاکٹر ایتھن اسکاٹ", specialty: "Pulmonology", location: "فورٹ ورتھ", image: require('../../assets/doctor18.png'), rating: 4.2, yearsExperience: 8, patients: 450, about: "سانس کی دیکھ بھال اور پھیپھڑوں کی بیماریوں میں ماہر پلمونولوجسٹ۔" },
    { id: 19, name: "ڈاکٹر ابیگیل گرین", specialty: "Gastroenterology", location: "انڈیاناپولیس", image: require('../../assets/doctor19.png'), rating: 4.1, yearsExperience: 13, patients: 640, about: "نظام ہاضمہ کی خرابیوں اور علاج میں ماہر گیسٹرو اینٹرولوجسٹ۔" },
    { id: 20, name: "ڈاکٹر آئڈن بیکر", specialty: "Ophthalmology", location: "شارلٹ", image: require('../../assets/doctor13.png'), rating: 4.5, yearsExperience: 11, patients: 600, about: "جدید آنکھوں کی سرجریوں اور نظر کی اصلاح کی تکنیک میں ماہر آنکھوں کے ڈاکٹر۔" }
  ];
  
  export default doctors;
  