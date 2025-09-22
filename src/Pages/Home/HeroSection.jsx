import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useNavigate } from "react-router";
import { useInView } from "react-intersection-observer";
import { Play, ChevronRight, Phone, X } from "lucide-react";
import axiosInstance from "../../services/api"

const HeroSection = () => {
  const [videoData, setVideoData] = useState(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const heroControls = useAnimation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHeroVideo = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance('/hero-video');

        if (response.data.success) {
          setVideoData(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch hero video');
      } finally {
        setLoading(false);
      }
    };

    fetchHeroVideo();
  }, []);

  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.4
  });

  useEffect(() => {
    if (heroInView) {
      heroControls.start("visible");
    }
  }, [heroControls, heroInView]);

  // Set timeout for fallback in case video fails to load
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!videoLoaded && videoData?.video_url) {
        setShowFallback(true);
      }
    }, 5000); // 5 second timeout

    return () => clearTimeout(timer);
  }, [videoLoaded, videoData]);

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

  // Function to extract YouTube ID from URL
  const getYouTubeId = (url) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url?.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  // Function to check if URL is YouTube
  const isYouTubeUrl = (url) => {
    return url?.includes('youtube.com') || url?.includes('youtu.be');
  };

  // Render appropriate video element based on URL type
  const renderVideoContent = () => {
    if (!videoData?.video_url) {
      return (
        <div className="bg-[#0A2463] w-full h-full" />
      );
    }

    if (isYouTubeUrl(videoData.video_url)) {
      const videoId = getYouTubeId(videoData.video_url);
      return (
        <div className="relative w-full h-screen overflow-hidden">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0&fs=0&disablekb=1`}
            className="absolute top-0 left-0 w-full h-full object-cover opacity-70"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen={true}
          />

          {/* Transparent overlay to hide watermark */}
          <div className="absolute inset-0 pointer-events-none bg-black/0" />
        </div>


      );
    }

    return (
      <>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-70"
          onLoadedData={() => setVideoLoaded(true)}
          onError={() => setShowFallback(true)}
        >
          <source src={videoData.video_url} type={`video/${videoData.video_type || 'mp4'}`} />
          Your browser does not support the video tag.
        </video>
        {showFallback && (
          <div className="bg-[#0A2463] w-full h-full" />
        )}
      </>
    );
  };

  if (loading) {
    return (
      <section className="relative h-screen w-full overflow-hidden bg-[#0A2463] flex items-center justify-center">

        <div className="flex flex-col items-center justify-center relative z-10">
          {/* Animated Spinner */}
          <div className="relative mx-auto mb-6">
            <div className="w-16 h-16 border-4 border-[#0A2463]/20 rounded-full"></div>
            <div className="w-16 h-16 border-4 border-[#FFC857] border-t-transparent rounded-full absolute top-0 left-0 animate-spin"></div>
          </div>

          <motion.p
            className="text-white/80 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Loading premium content...
          </motion.p>

        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative h-screen w-full overflow-hidden bg-[#0A2463] flex items-center justify-center">
        <div className="text-white text-center">
          <p className="text-red-300 mb-4">Error loading content</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#FFC857] text-[#0A2463] px-4 py-2 rounded-sm font-bold"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }


  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden bg-[#0A2463]"
    >
      {/* Background Video/Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={heroControls}
        variants={{
          visible: {
            opacity: 1,
            transition: { delay: 0.5, duration: 1.5 }
          }
        }}
        className="absolute inset-0 z-0"
      >
        {renderVideoContent()}
        {/* <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40" /> */}


      </motion.div>

      {/* Content Container */}
      <motion.div
        initial="hidden"
        animate={heroControls}
        variants={containerVariants}
        className="relative z-10 h-full flex items-center justify-center text-white"
      >
        <div className="container px-6 mx-auto ">
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
            className="flex flex-wrap gap-4 "
          >
            <motion.button
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 20px rgba(255, 200, 87, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#FFC857] text-[#0A2463] px-8 py-4 rounded-sm font-bold flex items-center gap-2"
            >
              Explore Memberships
              <ChevronRight className="h-5 w-5" />
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
              <Phone className="h-5 w-5" />
              Book Private Tour
            </motion.button>
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
        animate={heroControls}
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
        animate={heroControls}
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
