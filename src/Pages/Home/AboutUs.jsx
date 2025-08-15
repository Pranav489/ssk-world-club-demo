import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Trophy, Users, Clock, Star, ChevronRight } from "lucide-react";
import { ssk_club } from "../../assets";

const AboutUs = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2
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
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
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
      className="relative py-24 bg-white overflow-hidden"
      id="about"
    >
      {/* Decorative elements */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={controls}
        variants={{
          visible: {
            scale: 1,
            opacity: 0.1,
            transition: { delay: 0.5, duration: 1 }
          }
        }}
        className="absolute top-20 right-10 w-64 h-64 border-2 border-[#FFC857] rounded-full"
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
        className="absolute bottom-1/3 left-8 w-48 h-48 border border-[#0A2463] rounded-full"
      />

      <div className="container px-6 mx-auto">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants}>
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4 text-[#0A2463]"
            >
              THE SSK LEGACY
            </motion.h2>
            <motion.div 
              className="w-20 h-1 bg-[#FFC857] mx-auto mb-6"
              initial={{ scaleX: 0 }}
              animate={controls}
              variants={{
                visible: {
                  scaleX: 1,
                  transition: { delay: 0.3, type: "spring", stiffness: 200 }
                }
              }}
              style={{ originX: 0 }}
            />
          </motion.div>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Where athletic excellence meets uncompromising luxury since 2020
          </motion.p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            className="relative h-96 rounded-xl overflow-hidden shadow-2xl"
            variants={scaleUp}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#0A2463]/80 to-[#2E4052]/80" />
            <img 
              src={ssk_club} 
              alt="SSK World Club founders"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <motion.div
              className="absolute bottom-6 left-6 bg-[#FFC857] text-[#0A2463] px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              Est. 2020
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            variants={itemVariants}
            className="lg:pl-12"
          >
            <motion.h3
              className="text-2xl font-bold text-[#0A2463] mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Redefining the Sports Club Experience
            </motion.h3>

            <motion.p
              className="text-gray-600 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Founded by Shailesh Shrihari Kute, SSK World Club began as a vision to create a sanctuary where world-class athletic training meets five-star hospitality. Today, we stand as the premier destination for discerning athletes and enthusiasts across Nashik.
            </motion.p>

            <motion.div
              className="grid grid-cols-2 gap-6 mb-8"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.div
                className="bg-gray-50 p-6 rounded-lg"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="bg-[#FFC857] text-[#0A2463] p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Trophy className="h-6 w-6" />
                </div>
                <h4 className="font-bold text-[#0A2463] mb-2">150+ Championships</h4>
                <p className="text-gray-600 text-sm">Trained by our coaches</p>
              </motion.div>

              <motion.div
                className="bg-gray-50 p-6 rounded-lg"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="bg-[#FFC857] text-[#0A2463] p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6" />
                </div>
                <h4 className="font-bold text-[#0A2463] mb-2">3,000+ Members</h4>
                <p className="text-gray-600 text-sm">Global community</p>
              </motion.div>
            </motion.div>

            <motion.a
              href="/about-us"
              className="inline-flex items-center text-[#0A2463] font-medium group"
              whileHover={{ x: 5 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Discover Our Full Story
              <motion.span
                className="ml-2 group-hover:translate-x-1 transition-transform"
                animate={{
                  x: [0, 5, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut"
                }}
              >
                <ChevronRight className="h-5 w-5" />
              </motion.span>
            </motion.a>
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24"
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        {[
          {
            icon: <Star className="h-8 w-8 text-[#FFC857]" />,
            title: "Excellence",
            description: "Uncompromising standards in facilities, coaching, and service"
          },
          {
            icon: <Clock className="h-8 w-8 text-[#FFC857]" />,
            title: "Tradition",
            description: "Three decades of sporting heritage and member camaraderie"
          },
          {
            icon: <Users className="h-8 w-8 text-[#FFC857]" />,
            title: "Community",
            description: "A global network of passionate athletes and connoisseurs"
          }
        ].map((value, index) => (
          <motion.div
            key={value.title}
            className="bg-gray-50 p-8 rounded-xl"
            variants={itemVariants}
            whileHover={{ 
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
              transition: { duration: 0.1 } // This makes the shadow appear instantly
            }}
          >
            <div className="mb-4">
              {value.icon}
            </div>
            <h3 className="text-xl font-bold text-[#0A2463] mb-3">{value.title}</h3>
            <p className="text-gray-600">{value.description}</p>
          </motion.div>
        ))}
      </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;