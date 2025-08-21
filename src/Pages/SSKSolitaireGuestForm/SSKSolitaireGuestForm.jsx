import { motion } from "framer-motion";
import { MapPin, Clock, User, Shield, ChevronRight } from "lucide-react";
import { ssk_club } from "../../assets"; // Replace with your Solitaire club image

const SSKSolitaireGuestForm = () => {
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

  const clubInfo = {
    name: "SSK Solitaire Club",
    address: "Exclusive Location, Nashik",
    hours: "Daily: 7 AM - 11 PM",
    phone: "+91 555 987 6543",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative pt-20 md:pt-0 h-96 w-full overflow-hidden bg-black">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={ssk_club}
            alt="SSK Solitaire Club"
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
            className="max-w-4xl mx-auto text-center mt-10 md:mt-0"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              <span className="text-[#FFC857]">Solitaire</span> Guest Registration
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-[#FFC857] max-w-2xl mx-auto"
            >
              Exclusive access for members and their distinguished guests
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
        <motion.div
        initial={{ scale: 0.8, opacity:0}}
        animate={{
          scale: 1,
          opacity: 0.3,
          transition: { delay: 0.8, duration: 1 }
        }}
        className="absolute bottom-1/3 left-8 w-16 h-16 border border-[#FFC857] rounded-full"
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
                Guest <span className="text-[#FFC857]">Registration</span>
              </motion.h2>
              <motion.div
                variants={fadeInUp}
                className="w-20 h-1 bg-[#FFC857] mx-auto mb-6"
              />
              <motion.p variants={fadeInUp} className="text-lg text-gray-600 max-w-2xl mx-auto">
                Please complete this form to register your guest at SSK World Club
              </motion.p>
            </motion.div>

            {/* Embedded Form */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-50 rounded-xl shadow-md overflow-hidden border border-gray-200"
            >
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
        Solitaire <span className="text-[#FFC857]">Location</span>
      </h2>
      <div className="h-96 rounded-xl overflow-hidden shadow-lg border border-gray-200">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3750.796060498386!2d73.7614670750005!3d19.93299708145612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdd94bc37eb91ff%3A0x576425262ba1f1a!2sThe%20SSK%20World%20Club!5e0!3m2!1sen!2sin!4v1755022574999!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="SSK Solitaire Club Location"
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
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                <h3 className="text-xl font-bold mb-2">Location</h3>
                <p className="text-gray-300">{clubInfo.address}</p>
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
                <h3 className="text-xl font-bold mb-2">Hours</h3>
                <p className="text-gray-300">{clubInfo.hours}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-start gap-4"
            >
              <div className="bg-[#FFC857]/10 p-3 rounded-full">
                <User className="h-6 w-6 text-[#FFC857]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Guest Policy</h3>
                <p className="text-gray-300">Members may bring up to 2 guests</p>
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
                <Shield className="h-6 w-6 text-[#FFC857]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Dress Code</h3>
                <p className="text-gray-300">Smart casual or business attire</p>
              </div>
            </motion.div>
          </div>

          {/* <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="text-[#FFC857] italic max-w-3xl mx-auto">
              "{clubInfo.description}"
            </p>
          </motion.div> */}
        </div>
      </section>
    </div>
  );
};

export default SSKSolitaireGuestForm;