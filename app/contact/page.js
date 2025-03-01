"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiSend,
  FiCheck,
} from "react-icons/fi";

// Components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/Loading";
import SavedList from "@/components/SavedList";

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [savedItems, setSavedItems] = useState([]);
  const [isSavedListOpen, setIsSavedListOpen] = useState(false);
  const [formStatus, setFormStatus] = useState(null); // null, 'sending', 'success', 'error'
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

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

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus("sending");

    // Simulate form submission
    setTimeout(() => {
      setFormStatus("success");
      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      // Reset form status after a delay
      setTimeout(() => {
        setFormStatus(null);
      }, 5000);
    }, 2000);
  };

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
                تماس با <span className="text-accent">ما</span>
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
                برای سفارش، رزرو میز یا ارسال نظرات و پیشنهادات خود با ما در
                ارتباط باشید
              </motion.p>
            </div>
          </div>
        </section>

        {/* Contact Info Section */}
        <section className="py-12 bg-gradient-to-b from-black to-dark">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl text-center"
              >
                <div className="bg-accent/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiMapPin className="text-accent text-2xl" />
                </div>
                <h3 className="text-xl font-bold mb-2 tracking-tight">آدرس</h3>
                <p className="text-gray-400 tracking-wide">
                  کرمانشاه، بلوار شهید بهشتی، روبروی بانک ملی
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl text-center"
              >
                <div className="bg-accent/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiPhone className="text-accent text-2xl" />
                </div>
                <h3 className="text-xl font-bold mb-2 tracking-tight">تلفن</h3>
                <p className="text-gray-400 tracking-wide">۰۸۳-۳۸۲۲۲۲۲۲</p>
                <p className="text-gray-400 tracking-wide">۰۹۱۸۰۰۰۰۰۰۰</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl text-center"
              >
                <div className="bg-accent/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiMail className="text-accent text-2xl" />
                </div>
                <h3 className="text-xl font-bold mb-2 tracking-tight">ایمیل</h3>
                <p className="text-gray-400 tracking-wide">info@novocafe.ir</p>
                <p className="text-gray-400 tracking-wide">
                  contact@novocafe.ir
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl text-center"
              >
                <div className="bg-accent/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiClock className="text-accent text-2xl" />
                </div>
                <h3 className="text-xl font-bold mb-2 tracking-tight">
                  ساعات کاری
                </h3>
                <p className="text-gray-400 tracking-wide">
                  شنبه تا پنجشنبه: ۹ صبح تا ۱۱ شب
                </p>
                <p className="text-gray-400 tracking-wide">
                  جمعه: ۱۰ صبح تا ۱۲ شب
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map and Form Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Map */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                className="w-full h-96 bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3338.320525458647!2d47.07152541520213!3d34.343364280532395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ffaed1567446db3%3A0xa488808a94044f4b!2sNovo%20Caf%C3%A9!5e0!3m2!1sen!2sir!4v1646043746892!5m2!1sen!2sir"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="موقعیت نوو کافه"
                ></iframe>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl"
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-6 tracking-tight">
                  ارسال <span className="text-accent">پیام</span>
                </h2>

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-gray-400 mb-2 tracking-wide"
                      >
                        نام شما
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-white/10 border-0 text-white py-3 px-4 rounded-lg focus:ring-2 focus:ring-accent-500 focus:bg-white/15 transition-all"
                        placeholder="نام و نام خانوادگی"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-gray-400 mb-2 tracking-wide"
                      >
                        ایمیل
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-white/10 border-0 text-white py-3 px-4 rounded-lg focus:ring-2 focus:ring-accent-500 focus:bg-white/15 transition-all"
                        placeholder="example@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-gray-400 mb-2 tracking-wide"
                      >
                        شماره تماس
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-white/10 border-0 text-white py-3 px-4 rounded-lg focus:ring-2 focus:ring-accent-500 focus:bg-white/15 transition-all"
                        placeholder="09xxxxxxxxx"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-gray-400 mb-2 tracking-wide"
                      >
                        موضوع
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full bg-white/10 border-0 text-white py-3 px-4 rounded-lg focus:ring-2 focus:ring-accent-500 focus:bg-white/15 transition-all"
                        placeholder="موضوع پیام"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="message"
                      className="block text-gray-400 mb-2 tracking-wide"
                    >
                      پیام شما
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 border-0 text-white py-3 px-4 rounded-lg focus:ring-2 focus:ring-accent-500 focus:bg-white/15 transition-all h-32"
                      placeholder="پیام خود را بنویسید..."
                      required
                    ></textarea>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      type="submit"
                      disabled={formStatus === "sending"}
                      className={`btn-primary px-8 py-3 text-base tracking-wide font-medium flex items-center ${
                        formStatus === "sending"
                          ? "opacity-70 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      {formStatus === "sending" ? (
                        <>
                          <svg
                            className="animate-spin -mr-1 ml-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          در حال ارسال...
                        </>
                      ) : (
                        <>
                          <FiSend className="ml-2" />
                          ارسال پیام
                        </>
                      )}
                    </button>

                    {formStatus === "success" && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-green-500/20 text-green-300 px-4 py-2 rounded-lg flex items-center"
                      >
                        <FiCheck className="ml-2" />
                        پیام شما با موفقیت ارسال شد!
                      </motion.div>
                    )}
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gradient-to-t from-black to-dark">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-bold mb-4 tracking-tight"
              >
                سوالات <span className="text-accent">متداول</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="text-gray-400 max-w-2xl mx-auto tracking-wide"
              >
                به برخی از سوالات متداول شما پاسخ داده‌ایم
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl"
              >
                <h3 className="text-xl font-bold mb-3 tracking-tight">
                  آیا امکان سفارش آنلاین وجود دارد؟
                </h3>
                <p className="text-gray-300 tracking-wide">
                  بله، شما می‌توانید از طریق وبسایت ما یا با تماس با شماره‌های
                  کافه، سفارش خود را به صورت آنلاین ثبت کنید و در منزل یا محل
                  کار خود تحویل بگیرید.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl"
              >
                <h3 className="text-xl font-bold mb-3 tracking-tight">
                  آیا امکان رزرو میز وجود دارد؟
                </h3>
                <p className="text-gray-300 tracking-wide">
                  بله، شما می‌توانید با تماس با ما یا از طریق فرم تماس وبسایت،
                  میز خود را از قبل رزرو کنید. برای روزهای تعطیل و آخر هفته،
                  رزرو از ۲۴ ساعت قبل توصیه می‌شود.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl"
              >
                <h3 className="text-xl font-bold mb-3 tracking-tight">
                  آیا امکان برگزاری مراسم در کافه وجود دارد؟
                </h3>
                <p className="text-gray-300 tracking-wide">
                  بله، نوو کافه آمادگی برگزاری مراسم‌های کوچک مانند تولد، جلسات
                  کاری و دورهمی‌های دوستانه را دارد. برای اطلاعات بیشتر و
                  هماهنگی، لطفاً با ما تماس بگیرید.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl"
              >
                <h3 className="text-xl font-bold mb-3 tracking-tight">
                  آیا منوی مخصوص افراد گیاه‌خوار دارید؟
                </h3>
                <p className="text-gray-300 tracking-wide">
                  بله، ما گزینه‌های متنوعی برای افراد گیاه‌خوار و همچنین افرادی
                  که حساسیت‌های غذایی دارند، ارائه می‌دهیم. برای اطلاع از جزئیات
                  بیشتر، می‌توانید منوی ما را مشاهده کنید یا از باریستاهای ما
                  سؤال کنید.
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
