import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Trophy, Users, Clock, Star, ChevronRight, Sparkles } from "lucide-react";
import { ssk_club } from "../../assets";
import axiosInstance from "../../services/api";

const AboutUs = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2
  });

  useEffect(() => {
    const fetchAboutUs = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axiosInstance('/about-us');

        if (response.data.success) {
          setAboutData(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch about us content');
      } finally {
        setLoading(false);
      }
    };

    fetchAboutUs();
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

  if (loading) {
    return (
      <section className="relative py-24 bg-white overflow-hidden" id="about">
        <div className="container px-6 mx-auto">
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFC857]"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative py-24 bg-white overflow-hidden" id="about">
        <div className="container px-6 mx-auto">
          <div className="text-center text-red-500">
            <p>Error loading content: {error}</p>
          </div>
        </div>
      </section>
    );
  }

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
            opacity: 0.3,
            transition: { delay: 0.5, duration: 1 }
          }
        }}
        className="absolute top-20 right-10 w-64 h-64 border border-[#FFC857] rounded-full"
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
        className="absolute bottom-1/3 left-8 w-48 h-48 border border-[#0A2463] rounded-full z-20"
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
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-20">
          {/* Image */}
          <motion.div
            className="relative h-96 rounded-xl overflow-hidden shadow-2xl"
            variants={scaleUp}
          >
            {aboutData?.image && (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-[#0A2463]/80 to-[#2E4052]/80" />
                <img
                  src={aboutData.image}
                  alt="SSK World Club"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </>
            )}

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
            className="group lg:pl-12 z-10"
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
              dangerouslySetInnerHTML={{ __html: aboutData?.content || "" }}
            />
              
            <motion.div
              className="grid grid-cols-2 gap-6 mb-8"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.div
                className="bg-gray-50 p-6 hover:shadow-lg transition-shadow rounded-lg"
                variants={itemVariants}
              // whileHover={{ y: -5 }}
              >
                <div className="bg-[#FFC857] text-[#0A2463] p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Trophy className="h-6 w-6" />
                </div>
                <h4 className="font-bold text-[#0A2463] mb-2">
                  {aboutData?.stats?.championships}+ Championships
                </h4>
                <p className="text-gray-600 text-sm">Trained by our coaches</p>
              </motion.div>

              <motion.div
                className="bg-gray-50 p-6 hover:shadow-lg transition-shadow rounded-lg"
                variants={itemVariants}
              // whileHover={{ y: -5 }}
              >
                <div className="bg-[#FFC857] text-[#0A2463] p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6" />
                </div>
                <h4 className="font-bold text-[#0A2463] mb-2"> {aboutData?.stats?.members}+ Members</h4>
                <p className="text-gray-600 text-sm">Global community</p>
              </motion.div>
            </motion.div>

            <motion.a
              href="/about-us"
              className="inline-flex items-center text-[#0A2463] group-hover:text-[#FFC857] transition-colors font-medium group"
              // whileHover={{ x: 5 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Discover Our Full Story
              <motion.span
                className="ml-2 group-hover:translate-x-1 transition-transform"
                // animate={{
                //   x: [0, 5, 0],
                // }}
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
              icon: <Star className="h-8 w-8 text-[#FFC857] hover:shadow-lg transition-shadow" />,
              title: "Excellence",
              description: "Uncompromising standards in facilities, coaching, and service"
            },
            {
              icon: <Sparkles className="h-8 w-8 text-[#FFC857] hover:shadow-lg transition-shadow" />,
              title: "Spirit",
              description: "Built on passion and progress, uniting members through modern facilities and shared experiences."
            },
            {
              icon: <Users className="h-8 w-8 text-[#FFC857] hover:shadow-lg transition-shadow" />,
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