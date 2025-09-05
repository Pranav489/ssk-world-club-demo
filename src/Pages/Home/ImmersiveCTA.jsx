import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { ChevronRight, Phone, MapPin, Clock } from "lucide-react";
import { hero_home } from "../../assets";
import axiosInstance from "../../services/api";

const ImmersiveCTA = () => {
  const [contactInfo, setContactInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2
  });

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
    hidden: { y: 50, opacity: 0 },
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

  const fadeInVariants = {
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

  return (
    <section
      ref={ref}
      className="relative py-32 overflow-hidden"
      style={{
        backgroundImage: `url(${hero_home})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      {/* Dark overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-black"
      />

      {/* Decorative elements */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={controls}
        variants={{
          visible: {
            scale: 1,
            opacity: 0.2,
            transition: { delay: 0.5, duration: 1 }
          }
        }}
        className="absolute top-1/4 left-1/4 w-64 h-64 border border-[#FFC857] rounded-full"
      />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={controls}
        variants={{
          visible: {
            scale: 1,
            opacity: 0.1,
            transition: { delay: 0.7, duration: 1 }
          }
        }}
        className="absolute bottom-1/3 right-1/4 w-48 h-48 border border-[#FFC857] rounded-full"
      />

      <div className="container px-6 mx-auto relative z-10">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            variants={itemVariants}
          >
            EXPERIENCE THE SSK DIFFERENCE
          </motion.h2>

          <motion.div
            className="w-20 h-1 bg-[#FFC857] mx-auto mb-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          />

          <motion.p
            className="text-xl text-white/90 max-w-3xl mx-auto mb-12"
            variants={itemVariants}
          >
            Experience the pinnacle of athletic luxury. Schedule your private tour today.
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-6 mb-16"
            variants={containerVariants}
          >
            <motion.a
              href="/membership"
              className="bg-[#FFC857] text-[#0A2463] px-8 py-4 rounded-sm font-bold uppercase tracking-wider flex items-center gap-2"
              variants={scaleUp}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 25px rgba(255, 200, 87, 0.5)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              Join The Club
              <motion.span
              // animate={{
              //   x: [0, 5, 0],
              // }}
              // transition={{
              //   repeat: Infinity,
              //   duration: 1.5,
              //   ease: "easeInOut"
              // }}
              >
                <ChevronRight className="h-5 w-5" />
              </motion.span>
            </motion.a>

            <motion.a
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-sm font-bold uppercase tracking-wider flex items-center gap-2"
              variants={scaleUp}
              whileHover={{
                backgroundColor: "rgba(255,255,255,0.1)",
                scale: 1.02
              }}
              whileTap={{ scale: 0.98 }}
            >
              Schedule A Tour
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto pt-8 border-t border-white/20"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {contactInfo?.contact && (
            <motion.div
              className="flex flex-col items-center text-center"
              variants={itemVariants}
            >
              <div className="bg-[#FFC857] text-[#0A2463] p-3 rounded-full mb-4">
                <Phone className="h-6 w-6" />
              </div>
              <h3 className="text-white font-medium mb-2">CALL US</h3>
              {contactInfo.contact.phone && (
                <a
                  href={`tel:${contactInfo.contact.phone}`}
                  className="text-white/80 hover:text-[#FFC857] transition-colors"
                >
                  {contactInfo.contact.phone}
                </a>
              )}
            </motion.div>
          )}

          {contactInfo?.club_address && contactInfo.club_address.length > 0 && (
            <motion.div
              className="flex flex-col items-center text-center"
              variants={itemVariants}
            >
              <div className="bg-[#FFC857] text-[#0A2463] p-3 rounded-full mb-4">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="text-white font-medium mb-2">VISIT US</h3>
              <p className="text-white/80">
                {contactInfo.club_address.map((line, index) => (
                  <span key={index}>
                    {line}
                  </span>
                ))}
              </p>
            </motion.div>
          )}

          {contactInfo?.hours && (
            <motion.div
              className="flex flex-col items-center text-center"
              variants={itemVariants}
            >
              <div className="bg-[#FFC857] text-[#0A2463] p-3 rounded-full mb-4">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-white font-medium mb-2">HOURS</h3>
              {contactInfo.hours.sports_facilities && (
                <p className="text-white/80">
                  <span>Sports Facilities: </span>{ contactInfo.hours.sports_facilities }
                </p>
              )}
              
              {contactInfo.hours.club_office && (
              <p className= "text-white/80">
                  <span>Club Office: </span>{ contactInfo.hours.club_office }
                </p>
              )}
            
          </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ImmersiveCTA;