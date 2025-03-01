import localFont from "next/font/local";
import "./globals.css";

const vazirmatn = localFont({
  src: [
    {
      path: "./fonts/GeistVF.woff",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-vazirmatn",
});

export const metadata = {
  title: "نوو کافه | منوی دیجیتال",
  description:
    "منوی دیجیتال کافه نوو - مکانی دنج برای لذت بردن از قهوه‌های استثنایی",
  keywords: ["کافه", "قهوه", "منو", "نوو", "کرمانشاه"],
  authors: [{ name: "Novo Cafe" }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazirmatn.variable} font-sans antialiased`}>
        <div className="relative min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
          {children}
        </div>
      </body>
    </html>
  );
}
