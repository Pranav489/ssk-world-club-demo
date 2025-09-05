import { motion, useAnimation } from "framer-motion";
// import { fadeIn, staggerContainer, zoomIn } from "../../utils/motion";

import {
  Phone,
  Mail,
  MapPin,
  User,
  Calendar,
  Clock,
  ArrowRight,
} from "lucide-react";
import { useRef } from "react";
import { ssk_club } from "../../assets";

const SSKSolitaireGuestForm = () => {
  const formRef = useRef(null);
  const controls = useAnimation();



  const staggerContainer = (staggerChildren, delayChildren) => {
    return {
      hidden: {},
      show: {
        transition: {
          staggerChildren: staggerChildren,
          delayChildren: delayChildren || 0,
        },
      },
    };
  };

  const fadeIn = (direction, type, delay, duration) => {
    return {
      hidden: {
        x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
        y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
        opacity: 0,
      },
      show: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
          type: type,
          delay: delay,
          duration: duration,
          ease: "easeOut",
        },
      },
    };
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="relative overflow-hidden"
    >
      <div className="relative overflow-hidden">
  {/* Hero Section */}
  <div className="relative">
    <motion.section
      className="relative pt-20 md:pt-0 h-96 w-full overflow-hidden bg-black"
      style={{
        backgroundImage: `url(${ssk_club})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40 z-0" />
      
      {/* Content */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="relative z-10 h-full flex items-center justify-center text-white px-6"
      >
        <div className="max-w-4xl mx-auto text-center mt-10 md:mt-0">
          <motion.h1
            variants={fadeIn("up", "spring", 0.2, 1)}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            The SSK World Club
          </motion.h1>

          <motion.p
            variants={fadeIn("up", "spring", 0.4, 1)}
            className="text-lg text-[#FFC857] max-w-2xl mx-auto"
          >
            Register for exclusive access to our premium sports and wellness
            facilities
          </motion.p>
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.3 }}
        viewport={{ once: true }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute top-1/4 right-10 w-32 h-32 border-2 border-[#FFC857] rounded-full"
      />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.2 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-1/3 left-8 w-16 h-16 border border-[#FFC857] rounded-full"
      />
    </motion.section>
  </div>
</div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1  gap-12">
          {/* Form Section */}
          <motion.div
            ref={formRef}
            variants={fadeIn("right", "spring", 0.2, 1)}
            className="bg-white p-8 rounded-xl  border border-gray-100 relative overflow-hidden"
          >
            {/* Glowing accent */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#FFC857]/10 rounded-full filter blur-3xl" />
            <h2 className="text-3xl font-bold text-[#0A2463] mb-6 relative z-10">
              SSK World Club Information Form
            </h2>
            <div className="relative z-10">
              <iframe
                src="https://admin.masteraix.io/widget/form/6891f916306bf"
                style={{
                  width: "100%",
                  height: "600px",
                  border: "none",
                  borderRadius: "3px",
                }}
                id="inline-6891f916306bf"
                data-form-name="SSK-solitaire-Guest-Form"
                data-layout-iframe-id="inline-6891f916306bf"
                data-form-id="6891f916306bf"
                data-height="600"
                title="SSK-solitaire-Guest-Form"
              />
            </div>
          </motion.div>
        </div>
        <motion.section
          variants={fadeIn("up", "spring", 1, 1)}
          className="mt-16 bg-[#0A2463] rounded-xl overflow-hidden shadow-xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12 text-white">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <MapPin className="text-[#FFC857]" />
                Our Location
              </h2>
              <div className="space-y-4 mb-6">
                <p className="text-xl font-medium">The SSK WORLD CLUB</p>
                <p className="text-white/90">
                  Pathardi - Gaulane road, Pathardi,
                  <br />
                  Nashik, Maharashtra, India
                </p>
                <div className="flex items-center gap-3 mt-4">
                  <Phone className="text-[#FFC857] flex-shrink-0" />
                  <span>+91 77700 01005</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="text-[#FFC857] flex-shrink-0" />
                  <span>info@thesskworld.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="text-[#FFC857] flex-shrink-0" />
                  <span>Daily: 6:00 AM - 10:00 PM</span>
                </div>
              </div>
              <motion.button whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 25px rgba(255, 200, 87, 0.4)"
              }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#FFC857] text-[#0A2463] px-6 py-3 rounded-sm font-bold flex items-center gap-2" >
                Get Directions
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </div>
            <div className="h-96 md:h-auto">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3750.796060058151!2d73.76185331744385!3d19.932997099999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdd94bc37eb91ff%3A0x576425262ba1f1a!2sThe%20SSK%20World%20Club!5e0!3m2!1sen!2sin!4v1754631508587!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="SSK World Club Location"
              />
            </div>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default SSKSolitaireGuestForm;
