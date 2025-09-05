import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Play, Pause, ChevronRight, ChevronLeft, Quote } from "lucide-react";
import { hero_video_1, member1, member2, testimonial1, testimonial2 } from "../../assets";
import axiosInstance from "../../services/api";

const VideoTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axiosInstance.get('/video-testimonials');

        if (response.data.success) {
          setTestimonials(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch testimonials');
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start("visible");

      // Auto-advance carousel when in view (only if we have testimonials)
      if (testimonials.length > 0) {
        const interval = setInterval(() => {
          if (!isPlaying) {
            setActiveIndex(prev => (prev + 1) % testimonials.length);
          }
        }, 10000);

        return () => clearInterval(interval);
      }
    }
  }, [controls, inView, isPlaying, testimonials.length]);

  // Function to convert YouTube share links to embed URLs
  const convertToEmbedUrl = (url) => {
    if (!url) return null;

    // If it's already an embed URL, return as is
    if (url.includes('youtube.com/embed/')) {
      return url;
    }

    // Convert share links to embed URLs
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1];
      const ampersandPosition = videoId.indexOf('&');
      if (ampersandPosition !== -1) {
        return `https://www.youtube.com/embed/${videoId.substring(0, ampersandPosition)}`;
      }
      return `https://www.youtube.com/embed/${videoId}`;
    }

    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1];
      const ampersandPosition = videoId.indexOf('?');
      if (ampersandPosition !== -1) {
        return `https://www.youtube.com/embed/${videoId.substring(0, ampersandPosition)}`;
      }
      return `https://www.youtube.com/embed/${videoId}`;
    }

    // For non-YouTube videos, return original URL
    return url;
  };

  // Function to check if URL is YouTube
  const isYouTubeUrl = (url) => {
    return url && (url.includes('youtube.com') || url.includes('youtu.be'));
  };

  // Function to get YouTube video ID for thumbnail
  const getYouTubeThumbnail = (url) => {
    if (!isYouTubeUrl(url)) return null;

    let videoId = '';

    if (url.includes('youtube.com/embed/')) {
      videoId = url.split('embed/')[1];
    } else if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1];
      const ampersandPosition = videoId.indexOf('&');
      if (ampersandPosition !== -1) {
        videoId = videoId.substring(0, ampersandPosition);
      }
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1];
      const questionMarkPosition = videoId.indexOf('?');
      if (questionMarkPosition !== -1) {
        videoId = videoId.substring(0, questionMarkPosition);
      }
    }

    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };

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
    if (testimonials.length > 0) {
      setActiveIndex(prev => (prev + 1) % testimonials.length);
      setIsPlaying(false);
      setVideoReady(false);
    }
  };

  const prevTestimonial = () => {
    if (testimonials.length > 0) {
      setActiveIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
      setIsPlaying(false);
      setVideoReady(false);
    }
  };

  const togglePlay = () => {
    if (testimonials.length > 0 && testimonials[activeIndex]?.video_url) {
      setIsPlaying(!isPlaying);
      setVideoReady(true);
    }
  };

  // Safe access to current testimonial
  const currentTestimonial = testimonials[activeIndex] || {};
  const embedUrl = convertToEmbedUrl(currentTestimonial.video_url);
  const isYouTube = isYouTubeUrl(currentTestimonial.video_url);
  const youtubeThumbnail = isYouTube ? getYouTubeThumbnail(currentTestimonial.video_url) : null;

  if (loading) {
    return (
      <div className="relative py-20 bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFC857]"></div>
      </div>
    );
  }

  if (error && testimonials.length === 0) {
    return (
      <div className="relative py-20 bg-gray-50">
        <div className="text-center text-red-500">
          <p>Error loading testimonials: {error}</p>
        </div>
      </div>
    );
  }

  if (testimonials.length === 0) {
    return (
      <div className="relative py-20 bg-gray-50">
        <div className="text-center text-gray-500">
          <p>No testimonials available</p>
        </div>
      </div>
    );
  }

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
        className="absolute top-20 left-10 w-64 h-64 border-2 border-[#FFC857] rounded-full z-20"
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
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
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
              key={currentTestimonial.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 1 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              {/* Video Player */}
              <motion.div
                className="relative h-96 rounded-xl overflow-hidden shadow-2xl bg-gray-900"
                variants={fadeInVariants}
                whileHover={{ scale: 1.02 }}
              >
                {/* Thumbnail or Video */}
                {!isPlaying ? (
                  <>
                    {/* Show custom thumbnail for ALL videos if available */}
                    {currentTestimonial.thumbnail && (
                      <img
                        src={currentTestimonial.thumbnail}
                        alt={currentTestimonial.name}
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => {
                          console.error('Thumbnail failed to load:', currentTestimonial.thumbnail);
                          e.target.style.display = 'none';
                        }}
                        onLoad={() => console.log('Thumbnail loaded successfully:', currentTestimonial.thumbnail)}
                      />
                    )}

                    {/* For YouTube videos without custom thumbnail, use YouTube thumbnail */}
                    {isYouTube && !currentTestimonial.thumbnail && youtubeThumbnail && (
                      <img
                        src={youtubeThumbnail}
                        alt={currentTestimonial.name}
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => {
                          console.error('YouTube thumbnail failed to load:', youtubeThumbnail);
                          e.target.style.display = 'none';
                        }}
                      />
                    )}

                    {/* Fallback background - Show if no thumbnail available */}
                    <div
                      className="absolute inset-0 bg-gradient-to-br from-[#0A2463] to-[#2E4052] flex items-center justify-center"
                      style={{
                        display: (currentTestimonial.thumbnail || (isYouTube && youtubeThumbnail)) ? 'none' : 'flex'
                      }}
                    >
                      <div className="text-white text-4xl font-bold">
                        {currentTestimonial.name?.charAt(0) || 'M'}
                      </div>
                      <div className="absolute bottom-4 text-white text-sm opacity-75">
                        {!currentTestimonial.thumbnail && !youtubeThumbnail && 'No thumbnail available'}
                      </div>
                    </div>

                    {/* Video Play Button */}
                    <motion.button
                      onClick={togglePlay}
                      className="absolute inset-0 flex items-center justify-center z-10"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <motion.div
                        className="bg-white/90 rounded-full p-4 backdrop-blur-sm opacity-100 transition-opacity"
                        animate={{ scale: 1 }}
                      >
                        <Play className="h-8 w-8 text-[#0A2463] pl-1" />
                      </motion.div>
                    </motion.button>
                  </>
                ) : (
                  /* Video Player when playing */
                  <AnimatePresence>
                    {isPlaying && embedUrl && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 w-full h-full z-0"
                      >
                        {isYouTube ? (
                          <iframe
                            src={`${embedUrl}?autoplay=1&mute=1&rel=0&modestbranding=1&controls=1`}
                            className="w-full h-full"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            onLoad={() => setVideoReady(true)}
                          />
                        ) : (
                          <video
                            className="w-full h-full object-cover"
                            autoPlay
                            controls
                            muted
                            onEnded={() => setIsPlaying(false)}
                            onCanPlay={() => setVideoReady(true)}
                          >
                            <source src={embedUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}

                {/* Loading overlay for video */}
                {isPlaying && !videoReady && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FFC857]"></div>
                  </div>
                )}

                {/* Pause button when video is playing */}
                {isPlaying && videoReady && (
                  <motion.button
                    onClick={togglePlay}
                    className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full z-10"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Pause className="h-5 w-5" />
                  </motion.button>
                )}

                {/* Member Badge */}
                <motion.div
                  className="absolute bottom-6 left-6 bg-[#FFC857] text-[#0A2463] px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider z-10"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {currentTestimonial.role}
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
                  {[...Array(currentTestimonial.rating || 5)].map((_, i) => (
                    <span key={i} className="text-2xl">★</span>
                  ))}
                </motion.div>

                <motion.div
                  className="relative mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Quote className="absolute -top-6 -left-6 text-[#FFC857]/20 w-16 h-16 rotate-180" />
                  <p className="text-2xl italic text-gray-700 relative z-10">
                    "{currentTestimonial.quote}"
                  </p>
                  <Quote className="absolute -bottom-6 -right-6 text-[#FFC857]/20 w-16 h-16" />
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <h4 className="text-xl font-bold text-[#0A2463]">
                    {currentTestimonial.name}
                  </h4>
                  <p className="text-gray-600">
                    {currentTestimonial.role}
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots */}
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
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeIndex ? 'bg-[#FFC857] w-6' : 'bg-gray-300'
                    }`}
                  onClick={() => {
                    setActiveIndex(index);
                    setIsPlaying(false);
                    setVideoReady(false);
                  }}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </motion.div>
          )}

          {/* Navigation Arrows
          {testimonials.length > 1 && (
            <div className="absolute top-1/2 left-4 right-4 transform -translate-y-1/2 flex justify-between z-20">
              <button
                onClick={prevTestimonial}
                className="bg-white/80 hover:bg-white text-[#0A2463] p-3 rounded-full shadow-lg transition-all"
                aria-label="Previous testimonial"
              >
                ←
              </button>
              <button
                onClick={nextTestimonial}
                className="bg-white/80 hover:bg-white text-[#0A2463] p-3 rounded-full shadow-lg transition-all"
                aria-label="Next testimonial"
              >
                →
              </button>
            </div>
          )} */}
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
        </motion.div>
      </div>
    </section>
  );
};

export default VideoTestimonials;