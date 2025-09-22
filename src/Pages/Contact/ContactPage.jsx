import { useEffect, useState, useRef } from "react";
import { useAnimation } from "framer-motion";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { useInView } from "react-intersection-observer";
import { Phone, Mail, MapPin, Clock, User, ChevronRight, Send } from "lucide-react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";
import { basketball, ssk_club5 } from "../../assets";
import axiosInstance from "../../services/api"

const ContactPage = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [contactInfo, setContactInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.4 });
  const contactGridRef = useRef(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8 }
    }
  };

  const scaleUp = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
  };

  const maskVariants = {
    hidden: { width: 0 },
    visible: {
      width: "100%",
      transition: {
        duration: 1.2,
        ease: [0.19, 1, 0.22, 1]
      }
    }
  };

  const socialLinkVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.1 * i,
        type: "spring",
        stiffness: 200,
        damping: 10
      }
    }),
    hover: {
      scale: 1.1,
      y: -5,
      transition: { duration: 0.1 }
    }
  };

  // Fetch contact information
  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/contact-info');

        if (response.data.success) {
          setContactInfo(response.data.data);
        } else {
          setError('Failed to load contact information');
        }
      } catch (err) {
        console.error('Error fetching contact information:', err);
        setError('Failed to load contact information');
      } finally {
        setLoading(false);
      }
    };

    fetchContactInfo();
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post('/enquiries', data);

      if (response.data.success) {
        setFormSubmitted(true);
        reset();
      } else {
        setError('Failed to submit enquiry. Please try again.');
      }
    } catch (err) {
      console.error('Error submitting enquiry:', err);
      if (err.response?.data?.errors) {
        setError('Please check the form for errors');
      } else {
        setError('Failed to submit enquiry. Please try again.');
      }
    }
  };

  // Social media icons mapping
  const socialIcons = {
    facebook: FaFacebook,
    instagram: FaInstagram,
    twitter: FaTwitter,
    linkedin: FaLinkedin,
    youtube: FaYoutube
  };

  // Default social links as fallback
  const defaultSocialLinks = [
    { platform: 'facebook', url: "https://facebook.com/sskworldclub", color: "#3b5998" },
    { platform: 'instagram', url: "https://instagram.com/sskworldclub", color: "#E1306C" },
    { platform: 'twitter', url: "https://twitter.com/sskworldclub", color: "#1DA1F2" },
    { platform: 'linkedin', url: "https://linkedin.com/company/sskworldclub", color: "#0077B5" },
    { platform: 'youtube', url: "https://youtube.com/sskworldclub", color: "#FF0000" }
  ];

  // Get social links from API or use defaults
  const socialLinks = contactInfo?.social_links
    ? Object.entries(contactInfo.social_links)
      .filter(([_, url]) => url)
      .map(([platform, url]) => ({
        platform,
        url,
        color: defaultSocialLinks.find(s => s.platform === platform)?.color || "#666",
        icon: socialIcons[platform]
      }))
    : defaultSocialLinks;

  if (loading) {
    return (
      <section className="relative h-screen w-full overflow-hidden bg-white flex items-center justify-center">

        <div className="flex flex-col items-center justify-center relative z-10">
          {/* Animated Spinner */}
          <div className="relative mx-auto mb-6">
            <div className="w-16 h-16 border-4 border-white rounded-full"></div>
            <div className="w-16 h-16 border-4 border-[#FFC857] border-t-transparent rounded-full absolute top-0 left-0 animate-spin"></div>
          </div>

          <motion.p
            className="text-[#0A2463] text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Loading premium content...
          </motion.p>

        </div>
      </section>
    );
  }

  return (
    <div className="relative">
      {/* Hero Section */}
      <section
        ref={ref}
        className="relative pt-20 md:pt-0 h-96 w-full overflow-hidden bg-black"
      >
        {/* Background Image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              transition: { duration: 1.5 }
            }
          }}
          className="absolute inset-0 z-0"
        >
          <img
            src={ssk_club5}
            alt="Contact The SSK World Club"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />
        </motion.div>

        {/* Content */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="relative z-10 h-full flex items-center justify-center text-white px-6"
        >
          <div className="max-w-4xl mx-auto text-center mt-10 md:mt-0">
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-4"
              variants={itemVariants}
            >
              CONTACT <span className="text-[#FFC857]">The SSK World Club</span>
            </motion.h1>

            <motion.p
              className="text-lg text-white max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Our team is ready to assist you with membership, events, and all club inquiries
            </motion.p>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={controls}
          variants={{
            visible: {
              scale: 1,
              opacity: 0.3,
              transition: { delay: 1, duration: 1 }
            }
          }}
          className="absolute top-1/4 right-10 w-32 h-32 border-2 border-[#FFC857] rounded-full"
        />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={controls}
          variants={{
            visible: {
              scale: 1,
              opacity: 0.2,
              transition: { delay: 1.2, duration: 1 }
            }
          }}
          className="absolute bottom-1/3 left-8 w-16 h-16 border border-[#FFC857] rounded-full"
        />
      </section>

      {/* Contact Content */}
      <section
        ref={contactGridRef}
        className="relative py-24 bg-white overflow-hidden"
      >
        {/* Decorative elements */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.2 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute top-20 left-10 w-64 h-64 border border-[#FFC857] rounded-full z-20"
        />

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.2 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute bottom-1/3 right-8 w-48 h-48 border border-[#0A2463] rounded-full"
        />

        <div className="container mx-auto px-6 relative z-10">
          {/* Error message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6"
            >
              {error}
            </motion.div>
          )}

          {/* First Row - Form and Contact Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gray-50 rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-8">
                {formSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-[#4CB944]/10 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6"
                    >
                      <Send className="h-10 w-10 text-[#4CB944]" />
                    </motion.div>
                    <motion.h3
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="text-2xl font-bold text-[#0A2463] mb-3"
                    >
                      Thank You for Your Enquiry!
                    </motion.h3>
                    <motion.p
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-gray-600 mb-6"
                    >
                      Our team will contact you within 24 hours. For urgent matters, please call our office directly.
                    </motion.p>
                    <motion.button
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 5px 15px rgba(244, 162, 97, 0.4)"
                      }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setFormSubmitted(false)}
                      className="bg-[#0A2463] hover:bg-[#0A2463]/90 text-white px-6 py-3 rounded-sm font-medium"
                    >
                      Send Another Message
                    </motion.button>
                  </motion.div>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold text-[#0A2463] mb-6">
                      Send Us a Message
                    </h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      <div>
                        <label className="block text-gray-700 mb-2">Full Name *</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            {...register("full_name", { required: "Full name is required" })}
                            type="text"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#FFC857] focus:border-transparent"
                            placeholder="John Doe"
                          />
                        </div>
                        {errors.full_name && <p className="text-red-500 text-sm mt-1">{errors.full_name.message}</p>}
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">Email Address *</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            {...register("email", {
                              required: "Email is required",
                              pattern: {
                                value: /^\S+@\S+$/i,
                                message: "Invalid email address"
                              }
                            })}
                            type="email"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#FFC857] focus:border-transparent"
                            placeholder="john@example.com"
                          />
                        </div>
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">Phone Number</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            {...register("phone")}
                            type="tel"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#FFC857] focus:border-transparent"
                            placeholder="+91 9876543210"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">Subject *</label>
                        <select
                          {...register("subject", { required: "Subject is required" })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#FFC857] focus:border-transparent"
                        >
                          <option value="">Select a subject</option>
                          <option value="Membership Enquiry">Membership Enquiry</option>
                          <option value="Event Booking">Event Booking</option>
                          <option value="Facilities Information">Facilities Information</option>
                          <option value="Feedback/Suggestions">Feedback/Suggestions</option>
                          <option value="Other">Other</option>
                        </select>
                        {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">Message *</label>
                        <textarea
                          {...register("message", { required: "Message is required" })}
                          rows="4"
                          className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#FFC857] focus:border-transparent"
                          placeholder="Your message here..."
                        ></textarea>
                        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                      </div>
                      <motion.button
                        type="submit"
                        whileHover={{
                          scale: 1.02,
                          boxShadow: "0 8px 25px rgba(255, 200, 87, 0.4)"
                        }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-[#FFC857] to-[#F4A261] hover:from-[#F4A261] hover:to-[#FFC857] text-[#0A2463] px-8 py-4 rounded-sm font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                      >
                        <Send className="h-5 w-5" />
                        Send Message
                      </motion.button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              <motion.h2
                className="text-3xl font-bold text-[#0A2463] mb-8"
                variants={itemVariants}
              >
                Club Information
              </motion.h2>

              <motion.div
                className="space-y-8"
                variants={containerVariants}
              >
                {/* Club Address */}
                {contactInfo?.club_address && contactInfo.club_address.length > 0 && (
                  <motion.div
                    className="flex items-start gap-4"
                    variants={itemVariants}
                  >
                    <motion.div
                      className="bg-[#0A2463]/10 p-3 rounded-full"
                      whileHover={{ scale: 1.1 }}
                    >
                      <MapPin className="h-6 w-6 text-[#FFC857]" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold text-[#0A2463] mb-2">Club Address</h3>
                      <p className="text-gray-600">
                        {contactInfo.club_address.map((line, index) => (
                          <span key={index}>
                            {line}
                            <br />
                          </span>
                        ))}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Office Address */}
                {contactInfo?.office_address && contactInfo.office_address.length > 0 && (
                  <motion.div
                    className="flex items-start gap-4"
                    variants={itemVariants}
                  >
                    <motion.div
                      className="bg-[#0A2463]/10 p-3 rounded-full"
                      whileHover={{ scale: 1.1 }}
                    >
                      <MapPin className="h-6 w-6 text-[#FFC857]" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold text-[#0A2463] mb-2">Office Address</h3>
                      <p className="text-gray-600">
                        {contactInfo.office_address.map((line, index) => (
                          <span key={index}>
                            {line}
                            <br />
                          </span>
                        ))}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Contact Details */}
                {contactInfo?.contact && (
                  <motion.div
                    className="flex items-start gap-4"
                    variants={itemVariants}
                  >
                    <motion.div
                      className="bg-[#0A2463]/10 p-3 rounded-full"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Phone className="h-6 w-6 text-[#FFC857]" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold text-[#0A2463] mb-2">Contact</h3>
                      {contactInfo.contact.phone && (
                        <p className="text-gray-600 mb-2">
                          <span className="font-medium">Phone:</span> {contactInfo.contact.phone}
                        </p>
                      )}
                      {contactInfo.contact.whatsapp && (
                        <p className="text-gray-600 mb-2">
                          <span className="font-medium">WhatsApp:</span> {contactInfo.contact.whatsapp}
                        </p>
                      )}
                      {contactInfo.contact.email && (
                        <p className="text-gray-600">
                          <span className="font-medium">Email:</span> {contactInfo.contact.email}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Hours */}
                {contactInfo?.hours && (
                  <motion.div
                    className="flex items-start gap-4"
                    variants={itemVariants}
                  >
                    <motion.div
                      className="bg-[#0A2463]/10 p-3 rounded-full"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Clock className="h-6 w-6 text-[#FFC857]" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold text-[#0A2463] mb-2">Hours</h3>
                      {contactInfo.hours.sports_facilities && (
                        <p className="text-gray-600 mb-1">
                          <span className="font-medium">Sports Facilities:</span> {contactInfo.hours.sports_facilities}
                        </p>
                      )}
                      {contactInfo.hours.club_office && (
                        <p className="text-gray-600 mb-1">
                          <span className="font-medium">Club Office:</span> {contactInfo.hours.club_office}
                        </p>
                      )}
                      {contactInfo.hours.restaurants && (
                        <p className="text-gray-600">
                          <span className="font-medium">Restaurants:</span> {contactInfo.hours.restaurants}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Social Media Links */}
                <motion.div
                  className="flex items-start gap-4"
                  variants={itemVariants}
                >
                  <motion.div
                    className="bg-[#0A2463]/10 p-3 rounded-full"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="h-6 w-6 flex items-center justify-center text-[#FFC857]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                      </svg>
                    </div>
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0A2463] mb-3">Connect With Us</h3>
                    <motion.div
                      className="flex gap-4"
                      initial="hidden"
                      animate="visible"
                    >
                      {socialLinks.map((social, index) => {
                        const IconComponent = social.icon;
                        return (
                          <motion.a
                            key={social.platform}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            custom={index}
                            variants={socialLinkVariants}
                            whileHover="hover"
                            className="p-2 rounded-full bg-gray-100 hover:shadow-md"
                            style={{ color: social.color }}
                          >
                            <IconComponent className="h-6 w-6" />
                          </motion.a>
                        );
                      })}
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Second Row - Full Width Map */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h2
              className="text-3xl font-bold text-[#0A2463] mb-8"
              variants={itemVariants}
            >
              Find Us On Map
            </motion.h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-96 rounded-xl overflow-hidden shadow-lg border border-gray-200"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3750.796060498386!2d73.7614670750005!3d19.93299708145612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdd94bc37eb91ff%3A0x576425262ba1f1a!2sThe%20SSK%20World%20Club!5e0!3m2!1sen!2sin!4v1755022574999!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="The SSK World Club Location"
            ></iframe>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-br from-[#0A2463] to-[#2E4052] overflow-hidden">
        {/* Decorative elements */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.2 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute top-20 right-10 w-64 h-64 border border-[#FFC857] rounded-full"
        />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="text-center text-white"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold text-white mb-6"
            >
              Ready to Visit The SSK World Club?
            </motion.h2>
            <motion.div
              variants={itemVariants}
              className="w-20 h-1 bg-[#FFC857] mx-auto mb-8"
            />
            <motion.p
              variants={itemVariants}
              className="text-xl text-[#FFC857] mb-8 max-w-2xl mx-auto"
            >
              Schedule a private tour to experience our world-class facilities firsthand
            </motion.p>
            <motion.div
              variants={containerVariants}
              className="flex flex-wrap justify-center gap-6"
            >
              {contactInfo?.contact?.phone && (
                <motion.button
                  variants={itemVariants}
                  onClick={() => window.location.href = `tel:${contactInfo.contact.phone}`}
                  whileHover={{
                    backgroundColor: "rgba(255, 200, 87, 0.1)",
                    scale: 1.02,
                    borderColor: "#FFD700"
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="border-2 border-[#FFC857] text-[#FFC857] px-8 py-4 rounded-sm font-bold uppercase tracking-wider"
                >
                  Call Now: {contactInfo.contact.phone}
                </motion.button>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;