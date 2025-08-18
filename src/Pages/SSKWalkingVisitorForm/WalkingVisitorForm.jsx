import { motion } from "framer-motion";
import { MapPin, Clock, Users, ChevronRight } from "lucide-react";
import { ssk_club } from "../../assets";

const WalkingVisitorForm = () => {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const contactInfo = {
    address: "Pathardi - Gaulane road, Pathardi, Nashik, Maharashtra, India",
    hours: "Daily: 6:00 AM - 10:00 PM",
    phone: "+91 77700 01005"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-96 w-full overflow-hidden bg-black">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={ssk_club}
            alt="SSK World Club Visitor Registration"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center text-white px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              <span className="text-[#FFC857]">Visitor</span> Registration
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-[#FFC857] max-w-2xl mx-auto"
            >
              Register your visit to experience our world-class facilities
            </motion.p>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 0.3,
            transition: { delay: 0.8, duration: 1 }
          }}
          className="absolute top-1/4 right-10 w-32 h-32 border-2 border-[#FFC857] rounded-full"
        />
      </section>

      {/* Registration Form Section */}
      <section className="relative py-16 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="mb-12 text-center"
            >
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-[#0A2463] mb-4">
                Register Your <span className="text-[#FFC857]">Visit</span>
              </motion.h2>
              <motion.div
                variants={fadeInUp}
                className="w-20 h-1 bg-[#FFC857] mx-auto mb-6"
              />
              <motion.p variants={fadeInUp} className="text-lg text-gray-600 max-w-2xl mx-auto">
                Please complete the form below to schedule your visit to SSK World Club
              </motion.p>
            </motion.div>

            {/* Embedded Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-50 rounded-xl shadow-md overflow-hidden"
            >
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
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-[#0A2463] mb-6 text-center">
              Our <span className="text-[#FFC857]">Location</span>
            </h2>
            <div className="h-96 rounded-xl overflow-hidden shadow-lg border border-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3750.796060498386!2d73.7614670750005!3d19.93299708145612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdd94bc37eb91ff%3A0x576425262ba1f1a!2sThe%20SSK%20World%20Club!5e0!3m2!1sen!2sin!4v1755022574999!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="SSK World Club Location"
              />
            </div>
            <div className="mt-6 text-center">
              <a
                href="https://maps.google.com?q=SSK+World+Club"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-[#0A2463] font-medium hover:text-[#FFC857] transition-colors"
              >
                Open in Google Maps
                <ChevronRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Club Information Section */}
      <section className="relative py-24 bg-gradient-to-br from-[#0A2463] to-[#2E4052] text-white overflow-hidden">
        {/* Decorative elements */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute top-2 right-30 w-64 h-64 border-2 border-[#FFC857] rounded-full"
        />
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-start gap-4"
            >
              <div className="bg-[#FFC857]/10 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-[#FFC857]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Club Location</h3>
                <p>{contactInfo.address}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-start gap-4"
            >
              <div className="bg-[#FFC857]/10 p-3 rounded-full">
                <Clock className="h-6 w-6 text-[#FFC857]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Visiting Hours</h3>
                <p>{contactInfo.hours}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-start gap-4"
            >
              <div className="bg-[#FFC857]/10 p-3 rounded-full">
                <Users className="h-6 w-6 text-[#FFC857]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Visitor Policy</h3>
                <p>All visitors must register prior to arrival</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WalkingVisitorForm;