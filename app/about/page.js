"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FiCoffee, FiUsers, FiAward, FiClock } from "react-icons/fi";

// Components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/Loading";
import SavedList from "@/components/SavedList";

export default function AboutPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [savedItems, setSavedItems] = useState([]);
  const [isSavedListOpen, setIsSavedListOpen] = useState(false);

  // Handle loading screen
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Load saved items from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("novoSavedItems");
    if (savedData) {
      try {
        setSavedItems(JSON.parse(savedData));
      } catch (error) {
        console.error("Error loading saved items:", error);
      }
    }
  }, []);

  // Save items to localStorage when they change
  useEffect(() => {
    localStorage.setItem("novoSavedItems", JSON.stringify(savedItems));
  }, [savedItems]);

  if (isLoading) return <LoadingScreen />;

  return (
    <>
      <Navbar
        savedItems={savedItems}
        onSavedListToggle={() => setIsSavedListOpen(!isSavedListOpen)}
      />

      <SavedList
        isOpen={isSavedListOpen}
        setIsOpen={setIsSavedListOpen}
        savedItems={savedItems}
        setSavedItems={setSavedItems}
      />

      <main className="min-h-screen bg-primary text-white pb-20 pt-20">
        {/* Hero Section */}
        <section className="relative py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tighter"
              >
                درباره <span className="text-accent">نوو</span> کافه
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="w-24 h-1 bg-accent mb-8"
              ></motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto tracking-wide leading-relaxed"
              >
                مکانی دنج برای تجربه‌ای متفاوت از نوشیدن قهوه و گذراندن لحظاتی
                خوش
              </motion.p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 bg-gradient-to-b from-black to-dark">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7 }}
                  className="relative rounded-2xl overflow-hidden shadow-xl"
                >
                  <Image
                    src="/about-image.jpg"
                    alt="داستان نوو کافه"
                    width={600}
                    height={400}
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                </motion.div>
              </div>

              <div className="lg:w-1/2">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl md:text-4xl font-bold mb-6 tracking-tight"
                >
                  داستان <span className="text-accent">ما</span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="text-gray-300 mb-6 tracking-wide leading-relaxed"
                >
                  نوو کافه در سال ۱۳۹۸ با هدف ارائه قهوه‌های تخصصی و با کیفیت در
                  فضایی آرام و دنج تاسیس شد. از ابتدا، هدف ما ایجاد مکانی بود که
                  مردم بتوانند در آن احساس راحتی کنند و از طعم‌های استثنایی لذت
                  ببرند.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-gray-300 mb-6 tracking-wide leading-relaxed"
                >
                  ما معتقدیم که قهوه بیش از یک نوشیدنی است؛ قهوه یک تجربه است.
                  به همین دلیل، تیم ما متشکل از باریستاهای حرفه‌ای است که با
                  اشتیاق و دقت، هر فنجان قهوه را آماده می‌کنند.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-gray-300 tracking-wide leading-relaxed"
                >
                  امروز، نوو کافه به یکی از محبوب‌ترین کافه‌های شهر تبدیل شده و
                  افتخار میزبانی از هزاران مشتری را داشته است. ما همچنان به تعهد
                  خود برای ارائه بهترین کیفیت و خدمات پایبند هستیم.
                </motion.p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl text-center"
              >
                <FiCoffee className="text-accent text-4xl mb-4 mx-auto" />
                <h3 className="text-2xl font-bold mb-2 tracking-tight">۵۰+</h3>
                <p className="text-gray-400 tracking-wide">نوع نوشیدنی مختلف</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl text-center"
              >
                <FiUsers className="text-accent text-4xl mb-4 mx-auto" />
                <h3 className="text-2xl font-bold mb-2 tracking-tight">
                  ۱۲,۰۰۰+
                </h3>
                <p className="text-gray-400 tracking-wide">مشتری راضی</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl text-center"
              >
                <FiAward className="text-accent text-4xl mb-4 mx-auto" />
                <h3 className="text-2xl font-bold mb-2 tracking-tight">۵</h3>
                <p className="text-gray-400 tracking-wide">سال تجربه</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl text-center"
              >
                <FiClock className="text-accent text-4xl mb-4 mx-auto" />
                <h3 className="text-2xl font-bold mb-2 tracking-tight">۱۴</h3>
                <p className="text-gray-400 tracking-wide">ساعت خدمات روزانه</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-gradient-to-b from-dark to-black">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-bold mb-4 tracking-tight"
              >
                تیم <span className="text-accent">ما</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="text-gray-400 max-w-2xl mx-auto tracking-wide"
              >
                افرادی با اشتیاق و متخصص که تجربه منحصر به فرد نوو کافه را برای
                شما می‌سازند
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                whileHover={{ y: -10 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden"
              >
                <div className="relative h-64">
                  <Image
                    src="/team-1.jpg"
                    alt="عضو تیم"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1 tracking-tight">
                    علی محمدی
                  </h3>
                  <p className="text-accent mb-4 tracking-wide">
                    مدیر و بنیانگذار
                  </p>
                  <p className="text-gray-400 tracking-wide">
                    با بیش از ۱۰ سال تجربه در صنعت کافه و قهوه، همواره به دنبال
                    ارائه بهترین تجربه به مشتریان است.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                whileHover={{ y: -10 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden"
              >
                <div className="relative h-64">
                  <Image
                    src="/team-2.jpg"
                    alt="عضو تیم"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1 tracking-tight">
                    سارا رضایی
                  </h3>
                  <p className="text-accent mb-4 tracking-wide">سرباریستا</p>
                  <p className="text-gray-400 tracking-wide">
                    متخصص در انواع قهوه‌های تخصصی و دارای مدرک حرفه‌ای از آکادمی
                    قهوه ایتالیا.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                whileHover={{ y: -10 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden"
              >
                <div className="relative h-64">
                  <Image
                    src="/team-3.jpg"
                    alt="عضو تیم"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1 tracking-tight">
                    محمد حسینی
                  </h3>
                  <p className="text-accent mb-4 tracking-wide">سرآشپز</p>
                  <p className="text-gray-400 tracking-wide">
                    خلاق و پرانرژی، با تخصص در تهیه انواع دسرها و کیک‌های همراه
                    قهوه.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-bold mb-4 tracking-tight"
              >
                ارزش‌های <span className="text-accent">ما</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="text-gray-400 max-w-2xl mx-auto tracking-wide"
              >
                اصولی که همواره در نوو کافه به آن‌ها پایبند هستیم
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl"
              >
                <h3 className="text-2xl font-bold mb-4 tracking-tight">
                  کیفیت بی‌نظیر
                </h3>
                <p className="text-gray-300 tracking-wide leading-relaxed">
                  ما تنها از مرغوب‌ترین دانه‌های قهوه و با کیفیت‌ترین مواد اولیه
                  استفاده می‌کنیم. هر فنجان قهوه در نوو کافه با دقت و ظرافت خاصی
                  آماده می‌شود تا طعمی استثنایی داشته باشد.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl"
              >
                <h3 className="text-2xl font-bold mb-4 tracking-tight">
                  خدمات دوستانه
                </h3>
                <p className="text-gray-300 tracking-wide leading-relaxed">
                  ما معتقدیم که تجربه یک کافه تنها محدود به نوشیدنی‌ها نمی‌شود.
                  خدمات گرم و صمیمی تیم ما بخش مهمی از تجربه شما در نوو کافه
                  است. همه تلاش ما این است که احساس راحتی و خوشایندی داشته
                  باشید.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl"
              >
                <h3 className="text-2xl font-bold mb-4 tracking-tight">
                  فضای دنج و آرام
                </h3>
                <p className="text-gray-300 tracking-wide leading-relaxed">
                  نوو کافه مکانی است برای آرامش، گفتگو و لذت بردن از لحظات.
                  طراحی داخلی ما به گونه‌ای است که حس راحتی و آرامش را القا
                  می‌کند، چه برای کار کردن با لپ‌تاپ باشد، چه برای مطالعه یا
                  گذراندن وقت با دوستان.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl"
              >
                <h3 className="text-2xl font-bold mb-4 tracking-tight">
                  نوآوری مداوم
                </h3>
                <p className="text-gray-300 tracking-wide leading-relaxed">
                  ما همواره در حال یادگیری، رشد و نوآوری هستیم. منوی ما به طور
                  منظم با نوشیدنی‌های جدید و خلاقانه به‌روزرسانی می‌شود و همیشه
                  به دنبال راه‌هایی برای بهبود تجربه مشتریان خود هستیم.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
