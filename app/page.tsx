"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Phone,
  Calendar,
  Stethoscope,
  Star,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

// shadcn/ui
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

const Landing = () => {
  const navigate = useRouter();
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, type: "spring" },
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-teal-50 via-white to-indigo-50">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full flex justify-between items-center px-4 md:px-12 py-3 bg-white/95 backdrop-blur-md shadow-xl sticky top-0 z-50 border-b border-indigo-100"
      >
        {/* Logo */}
        <h1
          onClick={() => navigate.push("/")}
          className="flex items-center gap-2 md:gap-3 text-xl md:text-3xl font-extrabold cursor-pointer"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 10 }}
            className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-gradient-to-br from-teal-500 to-indigo-600 rounded-lg shadow-lg"
          >
            <img
              src={"/logo.png"}
              alt="logo"
              className="w-6 h-6 md:w-8 md:h-8 object-contain"
            />
          </motion.div>
          <span className="bg-gradient-to-br from-teal-600 to-indigo-600 bg-clip-text text-transparent tracking-wide">
            My<span className="text-gray-900 ml-1">Hospital</span>
          </span>
        </h1>

        {/* Navbar */}
        <NavigationMenu>
          <NavigationMenuList className="flex flex-wrap gap-2 md:gap-4 text-gray-800 font-semibold">
            {["Home", "Doctors", "Services", "About Us", "Contact"].map(
              (item, index) => (
                <NavigationMenuItem key={index}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={
                        item === "Home"
                          ? "/"
                          : `/${item.toLowerCase().replace(" ", "-")}`
                      }
                      className="relative group px-2 py-1 text-sm md:text-base rounded-lg hover:bg-gradient-to-r from-teal-100 to-indigo-100 transition-all"
                    >
                      {item}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-500 group-hover:w-full transition-all duration-300" />
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )
            )}
          </NavigationMenuList>
        </NavigationMenu>
        
        {/* Auth */}
        <div className="flex gap-2 md:gap-3">
          <Button
            variant="outline"
            className="border-teal-500 text-teal-600 hover:bg-teal-50 hover:scale-105 transition-transform text-sm md:text-base px-3 py-1 md:px-4 md:py-2 rounded-md"
            onClick={() => navigate.push("/login")}
          >
            Sign In
          </Button>
          <Button
            className="bg-gradient-to-br from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white hover:scale-105 transition-transform text-sm md:text-base px-3 py-1 md:px-4 md:py-2 rounded-md"
            onClick={() => navigate.push("/register")}
          >
            Get Started
          </Button>
        </div>
      </motion.header>

      {/* Hero */}
      <main className="flex-1 flex flex-col md:flex-row items-center justify-between px-4 md:px-20 py-12 md:py-20 bg-gradient-to-r from-teal-600 via-indigo-600 to-purple-600 text-white overflow-hidden">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-lg md:max-w-xl text-center md:text-left"
        >
          <h1 className="font-extrabold text-3xl md:text-5xl leading-tight mb-4 md:mb-6 bg-gradient-to-r from-teal-100 to-white bg-clip-text">
            Book Your Doctor <br /> Appointment with Ease
          </h1>
          <p className="text-base md:text-lg mb-4 md:mb-8 text-white/80 leading-relaxed">
            Your health, our priority. Schedule appointments seamlessly and take
            the first step toward a healthier you.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#e0f2f7" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate.push("/book-appointment")}
              className="w-full sm:w-[190px] flex items-center justify-center gap-2 rounded-xl h-10 md:h-[55px] bg-white text-teal-600 font-semibold shadow-lg hover:bg-teal-50 transition-all text-sm md:text-base"
            >
              <Calendar className="w-4 h-4 md:w-5 md:h-5" />
              Book Appointment
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "" }}
              whileTap={{ scale: 0.95 }}
              className="relative group w-full sm:w-[150px] flex items-center justify-center gap-2 rounded-xl h-10 md:h-[55px] bg-teal-600/10 border-2 border-teal-200 text-white font-semibold hover:bg-teal-600/20 shadow-md transition-all text-sm md:text-base"
            >
              <Phone className="w-4 h-4 md:w-5 md:h-5" />
              Call Now
              <span className="absolute w-[180px] -top-12 left-1/2 -translate-x-1/2 bg-white text-teal-600 text-xs md:text-sm font-semibold px-2 py-1 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                +998 95 939 21 21
              </span>
            </motion.button>
          </div>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative mt-6 md:mt-0"
        >
          <img
            src={"/second.png"}
            alt="Doctor illustration"
            className="w-[250px] md:w-[400px] rounded-2xl shadow-2xl border-4 border-teal-100/70"
          />
          <motion.div
            whileHover={{ scale: 1.1, rotate: 15 }}
            className="absolute -bottom-5 -left-5 w-20 h-20 md:w-28 md:h-28 bg-teal-100/30 backdrop-blur-md rounded-xl shadow-lg flex items-center justify-center"
          >
            <Stethoscope className="w-6 h-6 md:w-10 md:h-10 text-teal-600" />
          </motion.div>
        </motion.div>
      </main>
      
      {/* How it Works */}
      <motion.section
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="w-full py-12 md:py-20 bg-gradient-to-b from-teal-50 to-white"
      >
        <h2 className="text-gray-800 text-3xl md:text-5xl font-extrabold text-center mb-4 bg-gradient-to-r from-teal-600 to-indigo-600 bg-clip-text">
          How It Works
        </h2>
        <p className="w-[90%] md:w-[600px] text-center mx-auto text-gray-600 mt-2 md:mt-4 text-sm md:text-base">
          Seamlessly discover, book, and experience personalized healthcare with
          our intuitive platform.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-between px-4 md:px-20 mt-10 md:mt-16 gap-10 md:gap-8">
          {[
            {
              step: "1",
              title: "Find A Doctor",
              desc: "Discover skilled doctors based on specialization and location.",
              color: "teal-600",
            },
            {
              step: "2",
              title: "Book Appointment",
              desc: "Effortlessly book appointments at your convenience.",
              color: "indigo-600",
            },
            {
              step: "3",
              title: "Get Services",
              desc: "Receive personalized healthcare services tailored to your needs.",
              color: "purple-600",
            },
          ].map((item, index) => (
            <React.Fragment key={index}>
              <motion.div
                variants={itemVariants}
                className="relative flex-1 text-center group"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 bg-white/90 rounded-2xl shadow-lg flex items-center justify-center mb-4 md:mb-6 mx-auto border-2 border-teal-100 group-hover:border-teal-500 transition-all">
                  <span
                    className={`absolute -top-2 -right-2 md:-top-3 md:-right-3 w-6 h-6 md:w-8 md:h-8 bg-${item.color} text-white font-bold flex items-center justify-center rounded-full shadow-md`}
                  >
                    {item.step}
                  </span>
                  <Stethoscope
                    className={`w-8 h-8 md:w-12 md:h-12 text-${item.color}`}
                  />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  {item.desc}
                </p>
              </motion.div>
              {index < 2 && (
                <motion.div
                  className="hidden md:block flex-1 h-1 bg-gradient-to-r from-teal-500 to-indigo-500 relative rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 md:w-4 md:h-4 bg-white border-2 border-teal-500 rounded-full animate-pulse" />
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </div>
      </motion.section>

      {/* Doctor Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        viewport={{ once: true }}
        className="w-full max-w-4xl mx-auto my-8 md:my-12 bg-gradient-to-br from-teal-50/90 to-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-8 border border-teal-100/50"
      >
        {/* Doctor Image */}
        <div className="w-full md:w-48 h-48 md:h-56 overflow-hidden rounded-xl shadow-md">
          <img
            src={"/doctor.png"}
            alt="Dr. Michael Vitalis"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        {/* Doctor Info */}
        <div className="flex-1 text-center md:text-left">
          <h3 className="font-bold text-gray-900 text-xl md:text-3xl mb-2 bg-gradient-to-r from-teal-600 to-indigo-600 bg-clip-text">
            Dr. Michael Vitalis
          </h3>
          <p className="text-gray-600 text-xs md:text-sm mb-2">
            Physician | Royal Brompton Hospital
          </p>

          {/* Rating */}
          <div className="flex items-center justify-center md:justify-start gap-1 md:gap-2 text-yellow-500 mb-2">
            <Star className="w-4 h-4 md:w-5 md:h-5 fill-current" />
            <span className="text-black font-medium text-sm md:text-base">
              4.5
            </span>
            <span className="text-gray-500 text-xs md:text-sm">
              (1200 reviews)
            </span>
          </div>

          {/* Working Hours */}
          <div className="flex items-center justify-center md:justify-start gap-1 md:gap-2 text-gray-600 mb-3 md:mb-4">
            <Clock className="w-4 h-4 md:w-5 md:h-5" />
            <span className="text-sm md:text-base">8 am - 8 pm</span>
          </div>

          {/* Bio */}
          <p className="text-gray-700 text-xs md:text-sm mb-4 md:mb-6 leading-relaxed">
            A general practitioner, or GP, serves as the primary point of entry
            for healthcare. They provide care for individuals of all age groups
            and diagnose various illnesses.
          </p>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#2dd4bf" }}
            whileTap={{ scale: 0.95 }}
            className="w-full md:w-auto px-4 md:px-8 py-2 md:py-3 bg-teal-600 text-white rounded-lg font-semibold shadow-lg hover:bg-teal-700 transition-all text-sm md:text-base"
          >
            Consult now →
          </motion.button>
        </div>
      </motion.div>

      {/* Services Section */}
      <section className="py-10 md:py-16 bg-gradient-to-b from-teal-50 to-indigo-50">
        <div className="text-center mb-6 md:mb-10">
          <h2 className="text-teal-500 text-sm md:text-base font-medium">
            Our Services
          </h2>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xl md:text-4xl font-extrabold text-gray-900 bg-gradient-to-r from-teal-600 to-indigo-600 bg-clip-text"
          >
            We Provide Various Kind Of Service For You
          </motion.h1>
        </div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-4 md:px-12 max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.2 },
            },
          }}
        >
          {[
            {
              icon: "M12 6v6m0 0v6m0-6h6m-6 0H6",
              title: "Graphic Design",
              description: "Creative designs to enhance your visual identity.",
            },
            {
              icon: "M19 7l-7 5m0 0l7 5m-7-5H5",
              title: "Web Development",
              description: "Building responsive and dynamic websites.",
            },
            {
              icon: "M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10m0 0l-3 3m3-3l-3-3m9 9l-3 3m0 0l3-3m-9 9l-3-3",
              title: "Digital Marketing",
              description: "Boost your brand with targeted strategies.",
            },
            {
              icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z",
              title: "Healthcare Consultation",
              description: "Expert advice for your health needs.",
            },
            {
              icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z",
              title: "UI/UX Design",
              description: "User-friendly interfaces with stunning aesthetics.",
            },
            {
              icon: "M9 14l6-6m-6 6l6 6",
              title: "Customer Support",
              description: "Round-the-clock assistance for your queries.",
            },
          ].map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white/95 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all border border-teal-100/50"
            >
              <svg
                className="w-10 h-10 md:w-12 md:h-12 mx-auto text-teal-600 mb-3 md:mb-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={service.icon}
                />
              </svg>
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1 md:mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 text-xs md:text-sm">
                {service.description}
              </p>
              <motion.button
                whileHover={{ scale: 1.1, color: "#2dd4bf" }}
                whileTap={{ scale: 0.95 }}
                className="mt-2 md:mt-3 inline-block text-teal-600 font-medium text-xs md:text-sm hover:underline"
              >
                →
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </section>
      <footer className="bg-gradient-to-r from-teal-600 via-indigo-600 to-purple-600 text-white py-10 md:py-14 mt-16">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-white/20 pb-8">
            {/* Brand */}
            <div>
              <h1 className="text-2xl font-extrabold mb-3">
                <span className="bg-gradient-to-r from-teal-200 to-white bg-clip-text text-transparent">
                  MyHospital
                </span>
              </h1>
              <p className="text-white/80 text-sm leading-relaxed">
                Your trusted partner in health. Seamlessly book appointments and
                get expert medical care anytime, anywhere.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h2 className="text-lg font-semibold mb-3">Quick Links</h2>
              <ul className="space-y-2 text-white/80 text-sm">
                <li className="hover:text-white cursor-pointer transition">
                  Home
                </li>

                <li className="hover:text-white cursor-pointer transition">
                  Services
                </li>
                <li className="hover:text-white cursor-pointer transition">
                  About Us
                </li>
                <li className="hover:text-white cursor-pointer transition">
                  Contact
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h2 className="text-lg font-semibold mb-3">Services</h2>
              <ul className="space-y-2 text-white/80 text-sm">
                <li className="hover:text-white cursor-pointer transition">
                  Healthcare Consultation
                </li>
                <li className="hover:text-white cursor-pointer transition">
                  Emergency Care
                </li>
                <li className="hover:text-white cursor-pointer transition">
                  Diagnostics
                </li>
                <li className="hover:text-white cursor-pointer transition">
                  Pharmacy
                </li>
                <li className="hover:text-white cursor-pointer transition">
                  Therapy
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h2 className="text-lg font-semibold mb-3">Contact</h2>
              <p className="text-white/80 text-sm">📍 Tashkent, Uzbekistan</p>
              <p className="text-white/80 text-sm">📞 +998 95 939 21 21</p>
              <p className="text-white/80 text-sm">✉️ info@myhospital.com</p>

              {/* Social Links */}
              <div className="flex gap-3 mt-4">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-9 h-9 flex items-center justify-center bg-white/10 rounded-lg hover:bg-white/20 transition"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-white/70 text-sm">
            <p>© {new Date().getFullYear()} MyHospital. All rights reserved.</p>
            <div className="flex gap-4 mt-3 md:mt-0">
              <a href="#" className="hover:text-white transition">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;