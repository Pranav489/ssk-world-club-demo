import { motion } from "framer-motion";
import { fadeIn, staggerContainer, zoomIn } from "../../utils/motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  AlertCircle,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { useRef } from "react";
import { ssk_club } from "../../assets";

const WalkingVisitorForm = () => {
  const formRef = useRef(null);

  // Premium Unsplash images
  const images = {
    entrance: ssk_club, 
    tennis:
      "https://images.unsplash.com/photo-1547347298-4074fc3086f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    lounge:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2232&q=80",
  };

  const scrollToForm = () => {
    formRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="relative overflow-hidden"
    >
      {/* Hero with Tilt Effect */}
      <motion.section
        className="relative pt-20 md:pt-35 h-96 w-full overflow-hidden bg-black"
        style={{
          backgroundImage: `linear-gradient(rgba(10, 36, 99, 0.7), rgba(10, 36, 99, 0.7)), url(${images.entrance})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        initial={{ scale: 1 }}
        // whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          variants={staggerContainer}
          className="relative z-10 text-center px-6"
        >
          <motion.h1
            variants={fadeIn("up", "spring", 0.2, 1)}
            className="text-4xl md:text-6xl font-bold text-white mb-6 uppercase tracking-tight"
          >
            Visitor Entry Form
          </motion.h1>
          <motion.p
            variants={fadeIn("up", "spring", 0.4, 1)}
            className="text-xl text-white/90 max-w-2xl mx-auto mb-8"
          >
            Experience our world-class facilities with a day pass registration
          </motion.p>
          <motion.button
            // variants={fadeIn("up", "spring", 0.6, 1)}
            onClick={scrollToForm}
            whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 25px rgba(255, 200, 87, 0.4)"
                }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#FFC857] text-[#0A2463] px-8 py-4 rounded-sm font-bold mx-auto  flex items-center gap-2"
          >
            Register Now
            <CheckCircle className="h-5 w-5" />
          </motion.button>
        </motion.div>
      </motion.section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1  gap-12">
          {/* Form Section */}
          <motion.div
            ref={formRef}
            variants={fadeIn("right", "spring", 0.2, 1)}
            className="bg-white p-8 rounded-xl border border-gray-100 relative overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute -top-10 -left-10 w-20 h-20 bg-[#FFC857]/10 rounded-full filter blur-xl" />
            <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-[#0A2463]/10 rounded-full filter blur-xl" />

            <h2 className="text-3xl font-bold text-[#0A2463] mb-6 relative z-10">
              Visitor Registration
            </h2>
            <div className="relative z-10">
              <iframe
                src="https://admin.masteraix.io/widget/form/6887779168399"
                style={{
                  width: "100%",
                  height: "1200px",
                  border: "none",
                  borderRadius: "3px",
                }}
                id="inline-6887779168399"
                data-form-name="Walking-Visitor Form"
                data-layout-iframe-id="inline-6887779168399"
                data-form-id="6887779168399"
                data-height="600"
                title="Walking-Visitor Form"
              />
            </div>
          </motion.div>
        </div>

        {/* Location Section */}
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
              <a
          href="https://maps.google.com?q=SSK+World+Club"
          target="_blank"
          rel="noopener noreferrer"
          
        >
              <motion.button 
              whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 25px rgba(255, 200, 87, 0.4)"
                }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#FFC857] text-[#0A2463] px-6 py-3 rounded-sm font-bold flex items-center gap-2" >
                Get Directions
                <ArrowRight className="h-4 w-4" />
              </motion.button>
              </a>
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

export default WalkingVisitorForm;
