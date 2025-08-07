import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Play, Pause, ChevronRight, ChevronLeft, Quote } from "lucide-react";
import { hero_video_1, member1, member2, testimonial1, testimonial2 } from "../../assets";

const VideoTestimonials = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Testimonial data with video thumbnails
  const testimonials = [
    {
  id: 1,
  name: "Ananya Sharma",
  role: "National-Level Badminton Player",
  quote: "Training at this club helped me sharpen my skills with top-tier courts and expert coaches. It's been a game-changer in my career.",
  video: hero_video_1,
  thumbnail: member1,
  rating: 5
},
{
  id: 2,
  name: "Rajeev Mehta",
  role: "Corporate Platinum Member",
  quote: "Our team uses the club’s wellness and recreational facilities during offsites. It's perfect for work-life balance and networking.",
  video: hero_video_1,
  thumbnail: member2,
  rating: 5
},
{
  id: 3,
  name: "The Iyer Family",
  role: "Members Since 2019",
  quote: "From weekend cricket matches to yoga sessions and kids' art classes – the club has something for every member of our family.",
  video: hero_video_1,
  thumbnail: member1,
  rating: 5
},
{
  id: 4,
  name: "Dr. Neha Kulkarni",
  role: "Wellness Member",
  quote: "I joined for the spa and yoga, but stayed for the community. The serene environment makes it the perfect unwind zone after work.",
  video: hero_video_1,
  thumbnail: member2,
  rating: 5
},
{
  id: 5,
  name: "Aarav and Kavya",
  role: "Student Athletes",
  quote: "The swimming academy here has trained us for national meets. The guidance and support we get are unmatched.",
  video: hero_video_1,
  thumbnail: member1,
  rating: 5
}

  ];

  useEffect(() => {
    if (inView) {
      controls.start("visible");

      // Auto-advance carousel when in view
      const interval = setInterval(() => {
        if (!isPlaying) {
          setActiveIndex(prev => (prev + 1) % testimonials.length);
        }
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [controls, inView, isPlaying]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const slideHorizontal = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  const nextTestimonial = () => {
    setActiveIndex(prev => (prev + 1) % testimonials.length);
    setIsPlaying(false);
  };

  const prevTestimonial = () => {
    setActiveIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section
      ref={ref}
      className="relative py-24 bg-gray-50 overflow-hidden"
      id="testimonials"
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
        className="absolute top-20 left-10 w-64 h-64 border-2 border-[#FFC857] rounded-full"
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
        className="absolute bottom-1/4 right-10 w-48 h-48 border border-[#0A2463] rounded-full"
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
              MEMBER EXPERIENCES
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
            Hear from our members about their transformative experiences at the club
          </motion.p>
        </motion.div>

        {/* Video Testimonial Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonials[activeIndex].id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 1 }} 
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              {/* Video Player */}
              <motion.div
                className="relative h-96 rounded-xl overflow-hidden shadow-2xl"
                variants={fadeInVariants}
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#0A2463]/80 to-[#2E4052]/80" />
                <img
                  src={testimonials[activeIndex].thumbnail}
                  alt={testimonials[activeIndex].name}
                  className="absolute inset-0 w-full h-full object-contain"
                />

                {/* Video Play Button */}
                <motion.button
                  onClick={togglePlay}
                  className="absolute inset-0 flex items-center justify-center z-10"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.div
                    className={`bg-white/90 rounded-full p-4 backdrop-blur-sm ${isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'
                      } transition-opacity`}
                    animate={{ scale: isPlaying ? 0.9 : 1 }}
                  >
                    {isPlaying ? (
                      <Pause className="h-8 w-8 text-[#0A2463]" />
                    ) : (
                      <Play className="h-8 w-8 text-[#0A2463] pl-1" />
                    )}
                  </motion.div>
                </motion.button>

                {/* Video Element (conditionally rendered when playing) */}
                <AnimatePresence>
                  {isPlaying && (
                    <motion.video
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 w-full h-full object-cover z-0"
                      autoPlay
                      controls
                      onEnded={() => setIsPlaying(false)}
                    >
                      <source src={testimonials[activeIndex].video} type="video/mp4" />
                    </motion.video>
                  )}
                </AnimatePresence>

                {/* Member Badge */}
                <motion.div
                  className="absolute bottom-6 left-6 bg-[#FFC857] text-[#0A2463] px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Member Since {Math.floor(Math.random() * 5) + 2018}
                </motion.div>
              </motion.div>

              {/* Testimonial Content */}
              <motion.div
                variants={slideHorizontal}
                className="lg:pl-8"
              >
                <motion.div
                  className="mb-8 text-[#FFC857]"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <span key={i} className="text-2xl">★</span>
                  ))}
                </motion.div>

                <motion.div
                  className="relative mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  
                  <Quote className="absolute -top-6 -left-15 text-[#FFC857]/20 w-16 h-16 rotate-180" />
                  <p className="text-2xl italic text-gray-700 relative z-10">
                    "{testimonials[activeIndex].quote}"
                  </p>
                  <Quote className="absolute -bottom-6 -right-6 text-[#FFC857]/20 w-16 h-16" />
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <h4 className="text-xl font-bold text-[#0A2463]">
                    {testimonials[activeIndex].name}
                  </h4>
                  <p className="text-gray-600">
                    {testimonials[activeIndex].role}
                  </p>
                </motion.div>

                {/* Navigation Dots - Mobile
                <motion.div
                  className="lg:hidden flex justify-center mt-8 space-x-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      className={`w-3 h-3 rounded-full ${index === activeIndex ? 'bg-[#FFC857]' : 'bg-gray-300'
                        }`}
                      onClick={() => {
                        setActiveIndex(index);
                        setIsPlaying(false);
                      }}
                      aria-label={`View testimonial ${index + 1}`}
                    />
                  ))}
                </motion.div> */}
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {testimonials.length > 1 && (
            <motion.div
              className="flex justify-center mt-8 space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex ? 'bg-[#FFC857] w-6' : 'bg-gray-300'
                  }`}
                  onClick={() => {
                    setActiveIndex(index);
                    setIsPlaying(false);
                  }}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </motion.div>
          )}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <motion.a
            href="/membership"
            className="inline-flex items-center bg-[#0A2463] text-white px-8 py-4 rounded-sm font-bold uppercase tracking-wider group shadow-lg hover:shadow-xl transition-shadow"
            whileHover={{
              scale: 1.02,
              backgroundColor: "#0A2463",
            }}
            whileTap={{ scale: 0.98 }}
          >
            Become A Member
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
    </section>
  );
};

export default VideoTestimonials;