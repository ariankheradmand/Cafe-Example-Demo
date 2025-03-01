"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import {
  FaInstagram,
  FaTwitter,
  FaSpotify,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

function Footer() {
  const footerLinks = [
    {
      title: "منوی کافه",
      links: [
        { name: "قهوه گرم و سرد", href: "#قهوه-گرم-و-سرد" },
        { name: "نوشیدنی‌های سرد", href: "#نوشیدنی-های-سرد" },
        { name: "نوشیدنی‌های گرم", href: "#نوشیدنی-های-گرم" },
        { name: "دمی بار", href: "#دمی-بار" },
        { name: "شیک", href: "#شیک" },
      ],
    },
    {
      title: "درباره ما",
      links: [
        { name: "تاریخچه نوو", href: "#about" },
        { name: "فلسفه قهوه ما", href: "#philosophy" },
        { name: "همکاری با ما", href: "#careers" },
      ],
    },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-dark pt-12 pb-6 text-white"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="col-span-1">
            <div className="flex items-center mb-4">
              <Image
                src="/Logo.svg"
                alt="نوو کافه"
                width={100}
                height={40}
                className="h-12 w-auto"
              />
            </div>
            <p className="text-gray-400 text-sm mb-4">
              نوو کافه، محلی برای لذت بردن از قهوه‌های اصیل و باکیفیت در فضایی
              آرامش‌بخش و دوستانه
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <Link
                href="https://instagram.com"
                className="text-gray-400 hover:text-accent transition-colors"
              >
                <FaInstagram className="text-2xl" />
              </Link>
              <Link
                href="https://twitter.com"
                className="text-gray-400 hover:text-accent transition-colors"
              >
                <FaTwitter className="text-2xl" />
              </Link>
              <Link
                href="https://spotify.com"
                className="text-gray-400 hover:text-accent transition-colors"
              >
                <FaSpotify className="text-2xl" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          {footerLinks.map((section, i) => (
            <div key={i} className="col-span-1">
              <h3 className="text-lg font-bold mb-4 text-accent">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-lg font-bold mb-4 text-accent">تماس با ما</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-400 text-sm">
                <FaMapMarkerAlt className="text-accent ml-2" />
                <span>کرمانشاه، خیابان مدرس، کافه نوو</span>
              </li>
              <li className="flex items-center text-gray-400 text-sm">
                <FaPhone className="text-accent ml-2" />
                <span>۰۸۳-۱۲۳۴۵۶۷۸</span>
              </li>
              <li className="flex items-center text-gray-400 text-sm">
                <FaEnvelope className="text-accent ml-2" />
                <span>info@novocafe.ir</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} نوو کافه. تمامی حقوق محفوظ است.</p>
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;
