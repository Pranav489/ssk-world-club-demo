import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Phone, ArrowRight } from "lucide-react";
import { hero_video_1 } from "../../assets";

const HeroSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3
  });

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
    hidden: { y: 30, opacity: 0 },
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

  return (
    <section 
      ref={ref}
      className="relative h-screen w-full overflow-hidden bg-[#0A2463]"
    >
      {/* Background Video */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={controls}
        variants={{
          visible: { opacity: 1, transition: { delay: 0.5, duration: 1.5 } }
        }}
        className="absolute inset-0 z-0"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-70"
        >
          <source src={hero_video_1} type="video/mp4" />
        </video>
      </motion.div>

      {/* Content Container */}
      <motion.div
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="relative z-10 h-full flex items-center justify-center text-white"
      >
        <div className="container px-6 mx-auto">
          {/* Club Name with Mask Reveal */}
          <div className="overflow-hidden mb-4">
            <motion.div
              variants={maskVariants}
              className="h-1 bg-[#FFC857] mb-2"
            />
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold uppercase tracking-tight"
            >
              THE SSK WORLD CLUB
            </motion.h1>
          </div>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl max-w-2xl mb-8"
          >
            Where athletic excellence meets unmatched luxury
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={containerVariants}
            className="flex flex-wrap gap-4"
          >
            <motion.a
              variants={itemVariants}
              href="/memberships"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 20px rgba(255, 200, 87, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#FFC857] text-[#0A2463] px-8 py-4 rounded-sm font-bold flex items-center gap-2"
            >
              Explore Memberships
              <ArrowRight className="h-5 w-5" />
            </motion.a>

            <motion.a
              href="/contactus"
              variants={itemVariants}
              whileHover={{
                backgroundColor: "rgba(255,255,255,0.1)",
                scale: 1.02
              }}
              whileTap={{ scale: 0.98 }}
              className="border-2 border-white px-8 py-4 rounded-sm font-bold flex items-center gap-2"
            >
              <Phone className="h-5 w-5" />
              Book Private Tour
            </motion.a>
          </motion.div>

          {/* Scrolling Indicator */}
          <motion.div
            variants={itemVariants}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{
              y: [0, 10, 0],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-6 h-10 border-2 border-[#FFC857] rounded-full flex justify-center">
              <motion.div
                className="w-1 h-2 bg-[#FFC857] rounded-full mt-2"
                animate={{ y: [0, 4, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={controls}
        variants={{
          visible: {
            scale: 1,
            opacity: 1,
            transition: { delay: 0.8, duration: 1 }
          }
        }}
        className="absolute top-1/4 right-10 w-32 h-32 border-2 border-[#FFC857]/30 rounded-full"
      />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={controls}
        variants={{
          visible: {
            scale: 1,
            opacity: 1,
            transition: { delay: 1, duration: 1 }
          }
        }}
        className="absolute bottom-1/3 left-8 w-16 h-16 border border-[#FFC857]/20 rounded-full"
      />
    </section>
  );
};

export default HeroSection;