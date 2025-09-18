import React, { useState, useEffect } from "react";
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
import axiosInstance from "../../services/api";

const Footer = () => {
  const [sports, setSports] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [contactInfo, setContactInfo] = useState(null);
  const [loading, setLoading] = useState({ 
    sports: true, 
    amenities: true, 
    contact: true 
  });
  const [error, setError] = useState({ 
    sports: null, 
    amenities: null, 
    contact: null 
  });

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        // Fetch contact information
        const contactResponse = await axiosInstance.get('/contact-info');
        if (contactResponse.data.success) {
          setContactInfo(contactResponse.data.data);
          setError(prev => ({ ...prev, contact: null }));
        }
      } catch (err) {
        console.error('Error fetching contact info:', err);
        setError(prev => ({ ...prev, contact: 'Failed to load contact information' }));
        // Fallback to static data
        setContactInfo({
          club_address: ["THE SSK WORLD CLUB", "Pathardi Gaulane Road", "Pathardi", "Nashik."],
          contact: {
            phone: "+91 77700 01005",
            whatsapp: "+91 77700 01005",
            email: "info@thesskworld.com"
          },
          hours: {
            sports_facilities: "Daily: 6:00 AM - 11:00 PM",
            club_office: "9:00 AM - 6:00 PM (Mon-Sat)",
            restaurants: "7:30 AM - 11:00 PM"
          },
          social_links: {
            facebook: "#",
            instagram: "#",
            twitter: "#",
            linkedin: "#",
            youtube: "#"
          }
        });
      } finally {
        setLoading(prev => ({ ...prev, contact: false }));
      }

      try {
        // Fetch sports for footer
        const sportsResponse = await axiosInstance.get('/sports/footer');
        setSports(sportsResponse.data);
        setError(prev => ({ ...prev, sports: null }));
      } catch (err) {
        console.error('Error fetching footer sports:', err);
        setError(prev => ({ ...prev, sports: 'Failed to load sports' }));
        // Fallback to static data
        setSports([
          { id: 1, name: "Badminton", slug: "badminton", category: "indoor" },
          { id: 2, name: "Table Tennis", slug: "table-tennis", category: "indoor" },
          { id: 3, name: "Squash", slug: "squash", category: "indoor" },
          { id: 4, name: "Gym", slug: "gym", category: "indoor" },
          { id: 5, name: "Tennis", slug: "tennis", category: "outdoor" },
          { id: 6, name: "Swimming", slug: "swimming", category: "outdoor" },
          { id: 7, name: "Basketball", slug: "basketball", category: "outdoor" },
          { id: 8, name: "Cricket Nets", slug: "net-cricket", category: "outdoor" }
        ]);
      } finally {
        setLoading(prev => ({ ...prev, sports: false }));
      }

      try {
        // Fetch amenities for footer
        const amenitiesResponse = await axiosInstance.get('/amenities/footer');
        setAmenities(amenitiesResponse.data);
        setError(prev => ({ ...prev, amenities: null }));
      } catch (err) {
        console.error('Error fetching footer amenities:', err);
        setError(prev => ({ ...prev, amenities: 'Failed to load amenities' }));
        // Fallback to static data
        setAmenities([
          { id: 1, name: "Billiards & Snooker", slug: "billiards-and-snooker" },
          { id: 2, name: "Kids Play Area", slug: "kids-play-area" },
          { id: 3, name: "Mini Theatre", slug: "mini-theatre" },
          { id: 4, name: "Spa", slug: "spa" },
          { id: 5, name: "Wifi Library", slug: "wifi-library" }
        ]);
      } finally {
        setLoading(prev => ({ ...prev, amenities: false }));
      }
    };

    fetchFooterData();
  }, []);

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

  // Social links from API data
  const socialLinks = contactInfo ? [
    { icon: <FaFacebook className="h-5 w-5" />, name: "Facebook", url: contactInfo.social_links?.facebook || "#" },
    { icon: <FaInstagram className="h-5 w-5" />, name: "Instagram", url: contactInfo.social_links?.instagram || "#" },
    { icon: <FaTwitter className="h-5 w-5" />, name: "Twitter", url: contactInfo.social_links?.twitter || "#" },
    { icon: <FaLinkedin className="h-5 w-5" />, name: "LinkedIn", url: contactInfo.social_links?.linkedin || "#" },
    { icon: <FaYoutube className="h-5 w-5" />, name: "YouTube", url: contactInfo.social_links?.youtube || "#" }
  ] : [
    { icon: <FaFacebook className="h-5 w-5" />, name: "Facebook", url: "#" },
    { icon: <FaInstagram className="h-5 w-5" />, name: "Instagram", url: "#" },
    { icon: <FaTwitter className="h-5 w-5" />, name: "Twitter", url: "#" },
    { icon: <FaLinkedin className="h-5 w-5" />, name: "LinkedIn", url: "#" },
    { icon: <FaYoutube className="h-5 w-5" />, name: "YouTube", url: "#" }
  ];

  // Contact info from API data
  const contactInfoItems = contactInfo ? [
    {
      icon: <MapPin className="h-5 w-5 text-[#FFC857]" />,
      text: contactInfo.club_address?.join(" ") || "THE SSK WORLD CLUB, Pathardi Gaulane Road, Pathardi Nashik."
    },
    {
      icon: <Phone className="h-5 w-5 text-[#FFC857]" />,
      text: contactInfo.contact?.phone || "+91 77700 01005",
      link: contactInfo.contact?.phone ? `tel:${contactInfo.contact.phone}` : "tel:+917770001005"
    },
    {
      icon: <Mail className="h-5 w-5 text-[#FFC857]" />,
      text: contactInfo.contact?.email || "info@thesskworld.com",
      link: contactInfo.contact?.email ? `mailto:${contactInfo.contact.email}` : "mailto:info@thesskworld.com"
    },
    {
      icon: <Clock className="h-5 w-5 text-[#FFC857]" />,
      text: contactInfo.hours?.club_office || "Daily: 6:00 AM - 11:00 PM"
    }
  ] : [
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
      links: sports.slice(0, 9).map(sport => ({
        name: sport.name,
        url: `/sports/${sport.category}/${sport.slug}`
      }))
    },
    {
      title: "Amenities",
      links: amenities.slice(0, 9).map(amenity => ({
        name: amenity.name,
        url: `/amenities/${amenity.slug}`
      }))
    }
  ];

  return (
    <footer className="bg-[#0A2463] text-white pt-16 pb-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-100px" }}
        variants={footerVariants}
        className="container mx-auto px-6 lg:px-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Club Logo Column */}
          <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-1">
            <motion.a
              href="/"
              className="block mb-4"
              // whileHover={{ scale: 1.03 }}
            >
              <motion.img
                src={LogoWhite}
                alt="SSK World Club Logo"
                className="h-35 w-auto"
                whileHover={{ scale: 1.05 }}
                transition={{ stiffness: 400 }}
              />
            </motion.a>

            <motion.p
              className="text-gray-300 mb-6 leading-relaxed pr-4"
              // whileHover={{ scale: 1.01 }}
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
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  target="_blank"
                  rel="noopener noreferrer"
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
                // whileHover={{ x: 3 }}
              >
                {section.title}
              </motion.h3>
              {loading[section.title.toLowerCase()] ? (
                <div className="space-y-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center">
                      <span className="w-2 h-2 bg-gray-600 rounded-full mr-2 animate-pulse"></span>
                      <div className="h-4 bg-gray-600 rounded w-24 animate-pulse"></div>
                    </div>
                  ))}
                </div>
              ) : error[section.title.toLowerCase()] ? (
                <p className="text-red-400 text-sm">{error[section.title.toLowerCase()]}</p>
              ) : (
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
              )}
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
              // whileHover={{ x: 3 }}
            >
              Contact Us
            </motion.h3>
            
            {loading.contact ? (
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-start">
                    <div className="w-5 h-5 bg-gray-600 rounded-full animate-pulse mt-0.5"></div>
                    <div className="ml-3 h-4 bg-gray-600 rounded w-32 animate-pulse"></div>
                  </div>
                ))}
              </div>
            ) : error.contact ? (
              <p className="text-red-400 text-sm">{error.contact}</p>
            ) : (
              <motion.div
                className="space-y-3"
                variants={footerVariants}
              >
                {contactInfoItems.map((info, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start"
                    variants={itemVariants}
                    // whileHover={{ x: 3 }}
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
            )}

            {/* Newsletter Subscription */}
            <motion.div
              className="mt-6"
              variants={itemVariants}
            >
              <motion.h4
                className="text-sm font-semibold mb-2 text-[#FFC857] uppercase tracking-wider"
                // whileHover={{ x: 3 }}
              >
                Newsletter
              </motion.h4>
              <motion.p
                className="text-gray-300 text-sm mb-2"
                // whileHover={{ scale: 1.01 }}
              >
                Subscribe for exclusive offers and club updates
              </motion.p>
              <motion.form
                className="flex"
                // whileHover={{ scale: 1.01 }}
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
                  className="bg-gradient-to-r from-[#FFC857] to-[#F4A261] hover:from-[#F4A261] hover:to-[#FFC857] text-[#0A2463] px-5 py-2.5 font-bold uppercase tracking-wider text-sm transition-all rounded-r-sm shadow-md hover:shadow-lg"
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
          className="border-t border-[#1E3A8A] my-8"
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
            className="text-gray-400 text-sm mb-3 md:mb-0 text-center"
            variants={itemVariants}
          >
            &copy; {new Date().getFullYear()} The SSK World Club. All rights reserved by Rich Systems Solutions.
          </motion.p>
          <motion.div
            className="flex space-x-6"
            variants={footerVariants}
          >
            {["Terms of Service", "Privacy Policy", "Cancellation Policy"].map((item, index) => (
              <motion.a
                key={index}
                href="#"
                className="text-gray-400 hover:text-[#FFC857] text-sm text-center"
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