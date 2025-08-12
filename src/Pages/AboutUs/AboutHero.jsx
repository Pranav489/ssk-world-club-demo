import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Play, ChevronRight } from "lucide-react";
import { hero_video_1 } from "../../assets";

const AboutHero = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.4
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
        delayChildren: 0.4
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

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 1.2 }
    }
  };

  return (
    <section 
      ref={ref}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background Video */}
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
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={hero_video_1} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40" />
      </motion.div>

      {/* Content */}
      <motion.div
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="relative z-10 h-full flex items-center justify-center text-white px-6"
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* EST. 2020 Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-block bg-[#FFC857] text-[#0A2463] px-6 py-2 rounded-full mb-8 font-bold uppercase tracking-wider text-sm"
          >
            EST. 2020
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6"
            variants={itemVariants}
          >
            <span className="block">REDEFINING</span>
            <span className="block text-[#FFC857]">SPORTS LUXURY</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="text-xl md:text-2xl max-w-2xl mx-auto mb-10"
            variants={itemVariants}
          >
            Where cutting-edge athletic performance meets contemporary luxury
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-6"
            variants={containerVariants}
          >
            <motion.button
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 25px rgba(255, 200, 87, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#FFC857] text-[#0A2463] px-8 py-4 rounded-sm font-bold flex items-center gap-2"
            >
              Watch Our Story
              <Play className="h-5 w-5" />
            </motion.button>

            <motion.button
              variants={itemVariants}
              whileHover={{
                backgroundColor: "rgba(255,255,255,0.1)",
                scale: 1.02
              }}
              whileTap={{ scale: 0.98 }}
              className="border-2 border-white px-8 py-4 rounded-sm font-bold flex items-center gap-2"
            >
              Explore Facilities
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Scrolling Indicator */}
<motion.div
  initial={{ y: 20, opacity: 0 }}
  animate={{ 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" }
  }}
  className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
>
  <div className="w-6 h-10 border-2 border-[#FFC857] rounded-full flex justify-center">
    <motion.div
      className="w-1 h-2 bg-[#FFC857] rounded-full mt-2"
      initial={{ y: 0 }}
      animate={{ 
        y: [0, 4, 0],
        transition: {
          delay: 0.8, // Wait for container animation to finish
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
    />
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
    </section>
  );
};

export default AboutHero;