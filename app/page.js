"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiCoffee, FiMapPin, FiPhoneCall } from "react-icons/fi";

// Components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/Loading";

export default function Home() {
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

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4 text-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="/hero-bg.jpg"
              alt="نوو کافه"
              fill
              className="object-cover opacity-50"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90"></div>
          </div>

          <div className="container mx-auto relative z-10 px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white tracking-tighter">
                <span className="text-accent">نوو</span> کافه؛ تجربه‌ای نو در
                دنیای قهوه
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed tracking-wide max-w-xl mx-auto">
                مکانی دنج و آرام برای لذت بردن از طعم‌های استثنایی و لحظات
                ماندگار
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/menu"
                  className="btn-primary tracking-wide font-medium inline-flex items-center justify-center min-w-[160px] gap-2"
                >
                  مشاهده منو
                  <FiArrowRight />
                </Link>

                <Link
                  href="#contact"
                  className="btn-secondary tracking-wide font-medium inline-flex items-center justify-center min-w-[160px] gap-2"
                >
                  ارتباط با ما
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gradient-to-b from-black to-dark">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
                چرا <span className="text-accent">نوو</span> کافه؟
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto tracking-wide">
                تلاش ما ارائه بهترین تجربه برای مشتریان ماست
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl"
                whileHover={{
                  y: -10,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                transition={{ duration: 0.3 }}
              >
                <FiCoffee className="text-accent text-4xl mb-4" />
                <h3 className="text-xl font-bold mb-2 tracking-tight">
                  قهوه تازه روز
                </h3>
                <p className="text-gray-400 tracking-wide">
                  ما از دانه‌های قهوه تازه و با کیفیت استفاده می‌کنیم تا طعمی
                  استثنایی را به شما هدیه دهیم.
                </p>
              </motion.div>

              <motion.div
                className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl"
                whileHover={{
                  y: -10,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                transition={{ duration: 0.3 }}
              >
                <FiMapPin className="text-accent text-4xl mb-4" />
                <h3 className="text-xl font-bold mb-2 tracking-tight">
                  فضای دنج و آرام
                </h3>
                <p className="text-gray-400 tracking-wide">
                  محیطی آرام و دلنشین برای گفتگو، مطالعه و لذت بردن از لحظات خاص
                  در کنار عزیزانتان.
                </p>
              </motion.div>

              <motion.div
                className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl"
                whileHover={{
                  y: -10,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                transition={{ duration: 0.3 }}
              >
                <FiPhoneCall className="text-accent text-4xl mb-4" />
                <h3 className="text-xl font-bold mb-2 tracking-tight">
                  سفارش آنلاین
                </h3>
                <p className="text-gray-400 tracking-wide">
                  به راحتی سفارش خود را ثبت کنید و در اسرع وقت آن را در منزل یا
                  محل کار خود تحویل بگیرید.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Preview Section */}
        <section className="py-20" id="about">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <motion.div
                  className="relative rounded-2xl overflow-hidden"
                  whileInView={{ opacity: 1, scale: 1 }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src="/pexels-chevanon-302899.jpg"
                    alt="درباره نوو کافه"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                </motion.div>
              </div>

              <div className="lg:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                  درباره <span className="text-accent">نوو</span> کافه
                </h2>

                <p className="text-gray-300 mb-6 tracking-wide leading-relaxed">
                  نوو کافه از سال ۱۳۹۸ فعالیت خود را آغاز کرده و تاکنون افتخار
                  میزبانی از هزاران مشتری را داشته است. ما با تیمی مجرب و
                  حرفه‌ای، همواره در تلاشیم تا بهترین تجربه را برای مشتریان خود
                  فراهم کنیم.
                </p>

                <Link
                  href="/about"
                  className="btn-secondary tracking-wide font-medium inline-flex items-center justify-center min-w-[160px] gap-2"
                >
                  بیشتر بدانید
                  <FiArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Preview Section */}
        <section
          className="py-20 bg-gradient-to-t from-black to-dark"
          id="contact"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
                با ما در <span className="text-accent">تماس</span> باشید
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto tracking-wide">
                برای رزرو میز، سفارش آنلاین یا هرگونه پرسشی با ما در ارتباط
                باشید
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl text-center">
                  <FiMapPin className="text-accent text-3xl mb-4 mx-auto" />
                  <h3 className="text-xl font-bold mb-2 tracking-tight">
                    آدرس
                  </h3>
                  <p className="text-gray-400 tracking-wide">
                    کرمانشاه، بلوار شهید بهشتی، روبروی بانک ملی
                  </p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl text-center">
                  <FiPhoneCall className="text-accent text-3xl mb-4 mx-auto" />
                  <h3 className="text-xl font-bold mb-2 tracking-tight">
                    تلفن
                  </h3>
                  <p className="text-gray-400 tracking-wide">۰۸۳-۳۸۲۲۲۲۲۲</p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl text-center">
                  <FiCoffee className="text-accent text-3xl mb-4 mx-auto" />
                  <h3 className="text-xl font-bold mb-2 tracking-tight">
                    ساعات کاری
                  </h3>
                  <p className="text-gray-400 tracking-wide">
                    همه روزه از ساعت ۹ صبح تا ۱۱ شب
                  </p>
                </div>
              </div>

              <div className="text-center">
                <Link
                  href="/contact"
                  className="btn-primary tracking-wide font-medium inline-flex items-center justify-center min-w-[160px] gap-2"
                >
                  تماس با ما
                  <FiArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
