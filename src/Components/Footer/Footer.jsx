import React from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaYoutube
} from "react-icons/fa";
import { LogoGold, LogoWhite } from "../../assets";


const Footer = () => {
  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300 }
    }
  };

  const socialLinks = [
    { icon: <FaFacebook className="h-5 w-5" />, name: "Facebook", url: "#" },
    { icon: <FaInstagram className="h-5 w-5" />, name: "Instagram", url: "#" },
    { icon: <FaTwitter className="h-5 w-5" />, name: "Twitter", url: "#" },
    { icon: <FaLinkedin className="h-5 w-5" />, name: "LinkedIn", url: "#" },
    { icon: <FaYoutube className="h-5 w-5" />, name: "YouTube", url: "#" }
  ];

  const contactInfo = [
    {
      icon: <MapPin className="h-5 w-5 text-[#FFC857]" />,
      text: "THE SSK WORLD CLUB, Pathardi Gaulane Road, Pathardi Nashik."
    },
    {
      icon: <Phone className="h-5 w-5 text-[#FFC857]" />,
      text: "+91 77700 01005",
      link: "tel:+917770001005"
    },
    {
      icon: <Mail className="h-5 w-5 text-[#FFC857]" />,
      text: "info@thesskworld.com",
      link: "mailto:info@thesskworld.com"
    },
    {
      icon: <Clock className="h-5 w-5 text-[#FFC857]" />,
      text: "Daily: 6:00 AM - 11:00 PM"
    }
  ];

  const footerLinks = [
    {
      title: "Sports",
      links: [
        { name: "Tennis", url: "#" },
        { name: "Squash", url: "#" },
        { name: "Swimming", url: "#" },
        { name: "Fitness Center", url: "#" }
      ]
    },
    {
      title: "Amenities",
      links: [
        { name: "Restaurants", url: "#" },
        { name: "Luxury Suites", url: "#" },
        { name: "Spa & Wellness", url: "#" },
        { name: "Private Theater", url: "#" }
      ]
    },
    {
      title: "Membership",
      links: [
        { name: "Individual Plans", url: "#" },
        { name: "Family Packages", url: "#" },
        { name: "Corporate", url: "#" },
        { name: "Day Pass", url: "#" }
      ]
    }
  ];

  return (
    <footer className="bg-[#0A2463] text-white pt-16 pb-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-100px" }} 
        variants={footerVariants}
        className="container mx-auto px-6 lg:px-12" // Increased side padding
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8"> {/* Reduced gap between columns */}
          {/* Club Logo Column */}
<motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-1">
  <motion.a 
    href="/" 
    className="block mb-4"
    whileHover={{ scale: 1.03 }}
  >
    <motion.img
      src={LogoWhite}
      alt="SSK World Club Logo"
      className="h-35 w-auto " // Adjust height as needed
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400 }}
    />
  </motion.a>
  
  <motion.p 
    className="text-gray-300 mb-6 leading-relaxed pr-4"
    whileHover={{ scale: 1.01 }}
  >
    Experience unparalleled athletic luxury at our award-winning sports club.
    Where peak performance meets premium comfort.
  </motion.p>
  
  <motion.div 
    className="flex space-x-4"
    variants={footerVariants}
  >
    {socialLinks.map((social, index) => (
      <motion.a
        key={index}
        href={social.url}
        className="text-gray-300 hover:text-[#FFC857] transition-colors"
        variants={itemVariants}
        whileHover={{ y: -3, scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {social.icon}
        <span className="sr-only">{social.name}</span>
      </motion.a>
    ))}
  </motion.div>
</motion.div>

          {/* Footer Links */}
          {footerLinks.map((section, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="lg:col-span-1"
              viewport={{ once: false }} 
            >
              <motion.h3
                className="text-lg font-semibold mb-4 text-[#FFC857] uppercase tracking-wider" 
                whileHover={{ x: 3 }}
              >
                {section.title}
              </motion.h3>
              <motion.ul
                className="space-y-2" 
                variants={footerVariants}
              >
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={linkIndex}
                    variants={itemVariants}
                  >
                    <motion.a
                      href={link.url}
                      className="text-gray-300 hover:text-[#FFC857] transition-colors flex items-center"
                      whileHover={{ x: 5 }}
                    >
                      <span className="w-2 h-2 bg-[#FFC857] rounded-full mr-2"></span>
                      {link.name}
                    </motion.a>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ))}

          {/* Contact Information */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-1"
            viewport={{ once: false }} 
          >
            <motion.h3
              className="text-lg font-semibold mb-4 text-[#FFC857] uppercase tracking-wider" 
              whileHover={{ x: 3 }}
            >
              Contact Us
            </motion.h3>
            <motion.div
              className="space-y-3" 
              variants={footerVariants}
            >
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  className="flex items-start"
                  variants={itemVariants}
                  whileHover={{ x: 3 }}
                >
                  <span className="mt-0.5">{info.icon}</span>
                  {info.link ? (
                    <motion.a
                      href={info.link}
                      className="text-gray-300 hover:text-[#FFC857] ml-3"
                      whileHover={{ scale: 1.01 }}
                    >
                      {info.text}
                    </motion.a>
                  ) : (
                    <p className="text-gray-300 ml-3">{info.text}</p>
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* Newsletter Subscription */}
            <motion.div
              className="mt-6" 
              variants={itemVariants}
            >
              <motion.h4
                className="text-sm font-semibold mb-2 text-[#FFC857] uppercase tracking-wider" 
                whileHover={{ x: 3 }}
              >
                Newsletter
              </motion.h4>
              <motion.p
                className="text-gray-300 text-sm mb-2"
                whileHover={{ scale: 1.01 }}
              >
                Subscribe for exclusive offers and club updates
              </motion.p>
              <motion.form
                className="flex"
                whileHover={{ scale: 1.01 }}
              >
                <motion.input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2.5 lg:w-full md:w-0.5 bg-white/90 text-[#0A2463] placeholder-[#0A2463]/70 focus:outline-none focus:ring-2 focus:ring-[#FFC857] rounded-l-sm border border-transparent focus:border-[#FFC857]"
                  whileFocus={{
                    scale: 1.02,
                    backgroundColor: "rgba(255, 255, 255, 1)"
                  }}
                />
                <motion.button
                  type="submit"
                  className="bg-gradient-to-r from-[#FFC857] to-[#F4A261] hover:from-[#F4A261] hover:to-[#FFC857] text-[#0A2463] px-5 py-2.5 font-bold uppercase tracking-wider text-sm transition-all duration-300 rounded-r-sm shadow-md hover:shadow-lg"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 4px 12px rgba(244, 162, 97, 0.3)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Join
                </motion.button>
              </motion.form>
            </motion.div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          className="border-t border-[#1E3A8A] my-8" // Slightly increased margin
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false }} 
          transition={{ duration: 0.5 }}
        />

        {/* Bottom Footer */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center"
          variants={footerVariants}
          viewport={{ once: false }}
        >
          <motion.p
            className="text-gray-400 text-sm mb-3 md:mb-0" 
            variants={itemVariants}
          >
            &copy; {new Date().getFullYear()} The SSK Sports Club. All rights reserved by Rich Systems Solutions.
          </motion.p>
          <motion.div
            className="flex space-x-6" // Increased space between links
            variants={footerVariants}
          >
            {["Terms of Service", "Privacy Policy", "Cancellation Policy"].map((item, index) => (
              <motion.a
                key={index}
                href="#"
                className="text-gray-400 hover:text-[#FFC857] text-sm"
                variants={itemVariants}
                whileHover={{ y: -2 }}
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;