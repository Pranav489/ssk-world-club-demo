import { motion, useAnimation } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../services/api";
import {
    Dumbbell,
    Waves,
    Crosshair,
    Volleyball,
    Trophy,
    Brain,
    Activity,
    Square,
    Target,
    Table,
    Leaf,
    Eclipse,
    Utensils,
    Hotel,
    BookOpen,
    Film,
    Calendar,
    Users,
    MapPin,
    Clock,
    Star,
    Disc,
    ChevronRight,
    ChevronLeft,
    Play,
    Contact,
    Phone,
    Briefcase,
    SquareDashedBottom
} from 'lucide-react';

const AmenitiesPage = () => {
  const [heroImages, setHeroImages] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.4 });
  const [amenitiesSectionRef, amenitiesInView] = useInView({ threshold: 0.2 });

  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", damping: 12, stiffness: 100 }
    }
  };

  const fadeIn = {
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

  const getAmenityIcon = (iconName, props = { className: "h-8 w-8 text-[#FFC857]" }) => {
    const iconMap = {
      briefcase: Briefcase,
      brain: Brain,
      activity: Activity,
      chevronright: ChevronRight,
      dumbbell: Dumbbell,
      square: Square,
      target: Target,
      table: Table,
      disc: Disc,
      waves: Waves,
      trophy: Trophy,
      crosshair: Crosshair,
      volleyball: Volleyball,
      leaf: Leaf,
      eclipse: Eclipse,
      utensils: Utensils,
      hotel: Hotel,
      bookopen: BookOpen,
      film: Film,
      calendar: Calendar,
      users: Users,
      phone: Phone,
      mapPin: MapPin,
      clock: Clock,
      star: Star,
      squaredashedbottom: SquareDashedBottom
    };

    const IconComponent = iconMap[iconName?.toLowerCase()] || Trophy;
    return <IconComponent {...props} />;
  };

  // Hero section animations
  useEffect(() => {
    if (inView && heroImages.length > 0) {
      controls.start("visible");
      const interval = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % heroImages.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [controls, inView, heroImages]);

  const handleAmenityClick = (amenity) => {
    navigate(`/amenities/${amenity.slug}`);
  };

  useEffect(() => {
    const fetchAmenitiesData = async () => {
      try {
        setLoading(true);

        // Fetch hero slider and amenities data in parallel
        const [heroResponse, amenitiesResponse] = await Promise.all([
          axiosInstance.get('/amenities-hero-slider'),
          axiosInstance.get('/amenities')
        ]);

        if (heroResponse.status !== 200 || amenitiesResponse.status !== 200) {
          throw new Error('Failed to fetch data');
        }

        setHeroImages(heroResponse.data);
        setAmenities(amenitiesResponse.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching amenities data:', err);
        setError('Failed to load amenities. Please try again later.');

        // Fallback to empty data
        setHeroImages([]);
        setAmenities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAmenitiesData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="rounded-full h-12 w-12 border-b-2 border-[#FFC857] mx-auto mb-4"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[#0A2463] font-medium"
          >
            Loading amenities...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8 bg-white rounded-xl shadow-md max-w-md mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-red-500 mb-4"
          >
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </motion.div>
          <motion.h3
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-xl font-bold text-[#0A2463] mb-2"
          >
            Oops! Something went wrong
          </motion.h3>
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 mb-6"
          >
            {error}
          </motion.p>
          <motion.button
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 5px 15px rgba(244, 162, 97, 0.4)"
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.location.reload()}
            className="bg-[#FFC857] text-[#0A2463] px-6 py-2 rounded-md font-medium hover:bg-amber-400 transition-colors"
          >
            Try Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Carousel Section */}
      <section ref={ref} className="relative h-screen w-full overflow-hidden bg-black">
        {heroImages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-gradient-to-br from-[#0A2463] to-[#2E4052] flex items-center justify-center"
          >
            <div className="text-center text-white">
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-4xl font-bold mb-4"
              >
                Premium Amenities
              </motion.h2>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xl"
              >
                Luxury facilities for our members
              </motion.p>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Sliding Background Images */}
            <div className="absolute inset-0 flex">
              {heroImages.map((slide, index) => (
                <motion.div
                  key={index}
                  className={`h-full relative overflow-hidden transition-all duration-1000 ${index === activeSlide ? 'w-full' : 'w-0'}`}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: index === activeSlide ? 1 : 0,
                    zIndex: index === activeSlide ? 10 : 1
                  }}
                  transition={{ duration: 1.5 }}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />
                </motion.div>
              ))}
            </div>
            {/* Content Overlay */}
            <motion.div
              initial="hidden"
              animate={controls}
              variants={containerVariants}
              className="relative z-10 h-full flex items-center justify-center text-white px-6"
            >
              <div className="max-w-4xl mx-auto text-center">
                <motion.div
                  variants={itemVariants}
                  className="inline-block border-2 border-[#FFC857] text-[#FFC857] px-6 py-1 rounded-full mb-8 font-bold uppercase tracking-wider text-sm"
                >
                  PREMIUM AMENITIES
                </motion.div>

                <motion.h1
                  className="text-4xl md:text-6xl font-bold mb-6"
                  variants={itemVariants}
                >
                  {heroImages[activeSlide].title}
                </motion.h1>

                <motion.p
                  className="text-xl md:text-2xl max-w-2xl mx-auto mb-10 text-[#FFC857] font-medium"
                  variants={itemVariants}
                >
                  {heroImages[activeSlide].subtitle}
                </motion.p>

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
                    onClick={() => navigate('/membership')}
                  >
                    Explore Plans
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
                    onClick={() => navigate('/contact')}
                  >
                    Schedule a Tour
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>

            {/* Carousel Indicators */}
            <motion.div
              className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 flex gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {heroImages.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`h-3 w-3 rounded-full transition-all ${index === activeSlide ? 'bg-[#FFC857] w-6' : 'bg-white/50'}`}
                  aria-label={`View ${heroImages[index].title}`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
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
              className="absolute top-1/4 right-10 w-32 h-32 border-2 border-[#FFC857] rounded-full z-10"
            />
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
              className="absolute bottom-1/3 left-8 w-16 h-16 border border-[#FFC857] rounded-full z-10"
            />
          </>
        )}
      </section>

      {/* Amenities Grid Section */}
      <section
        ref={amenitiesSectionRef}
        className="relative py-24 bg-white overflow-hidden"
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A2463] mb-4">
              Curated <span className="text-[#FFC857]">Luxury</span> Amenities
            </h2>
            <motion.div
              className="w-20 h-1 bg-[#FFC857] mx-auto mb-6"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            />
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Experience unparalleled comfort and convenience with our exclusive range of premium facilities
            </p>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 0.2,
              transition: { delay: 0.3, duration: 1 }
            }}
            className="absolute top-5 -left-20 w-64 h-64 border border-[#FFC857] rounded-full z-20"
          />

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 0.1,
              transition: { delay: 0.5, duration: 1 }
            }}
            className="absolute bottom-1/8 -right-20 w-64 h-64 border border-[#0A2463] rounded-full z-10"
          />

          {/* Empty state for no amenities */}
          {amenities.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="bg-gray-50 rounded-xl p-8 shadow-md max-w-md mx-auto">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-[#0A2463] mb-4"
                >
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-2m2 0v-5a1 1 0 00-1-1h-1a1 1 0 00-1 1v5m4 0h-4m-4 0H9m4 0v-5a1 1 0 00-1-1h-1a1 1 0 00-1 1v5m4 0H9" />
                  </svg>
                </motion.div>
                <motion.h3
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-xl font-bold text-[#0A2463] mb-2"
                >
                  No Amenities Available
                </motion.h3>
                <motion.p
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-gray-600"
                >
                  Check back later for our luxury amenities.
                </motion.p>
              </div>
            </motion.div>
          ) : (
            /* Amenities Grid */
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate={amenitiesInView ? "visible" : "hidden"}
            >
              {amenities.map((amenity, index) => (
                <motion.div
                  key={amenity.id}
                  variants={itemVariants}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer group border border-gray-100"
                  whileHover={{ y: -5 }}
                  onClick={() => handleAmenityClick(amenity)}
                >
                  {/* Image Container */}
                  <div className="h-48 relative overflow-hidden">
                    <motion.img
                      src={amenity.hero_image || "https://via.placeholder.com/400x300?text=No+Image"}
                      alt={amenity.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/400x300?text=Image+Error";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <motion.div
                      className="absolute bottom-4 left-4 bg-[#FFC857] text-[#0A2463] px-4 py-1 rounded-full text-sm font-bold"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{
                        x: 0,
                        opacity: 1,
                        transition: { delay: index * 0.1 + 0.3 }
                      }}
                    >
                      {amenity.title}
                    </motion.div>
                  </div>

                  {/* Content */}
                  <motion.div
                    className="p-6"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { delay: index * 0.1 + 0.4 }
                    }}
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <motion.div 
                        className="bg-[#0A2463]/10 p-3 rounded-full text-xl"
                        whileHover={{ scale: 1.1 }}
                      >
                        {getAmenityIcon(amenity.icon)}
                      </motion.div>
                      <h3 className="text-lg font-bold text-[#0A2463]">
                        {amenity.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 mb-6 line-clamp-2">
                      {amenity.short_description}
                    </p>
                    
                    <motion.div
                      className="flex items-center text-[#0A2463] font-medium group-hover:text-[#FFC857] transition-colors"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                        transition: { delay: index * 0.1 + 0.5 }
                      }}
                      whileHover={{ x: 5 }}
                    >
                      View details
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
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-br from-[#0A2463]/95 to-[#2E4052] overflow-hidden">
        {/* Decorative Elements */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 0.2,
            transition: { delay: 0.3, duration: 1 }
          }}
          className="absolute top-20 right-10 w-64 h-64 border border-[#FFC857] rounded-full"
        />

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 0.2,
            transition: { delay: 0.5, duration: 1 }
          }}
          className="absolute bottom-1/3 left-8 w-48 h-48 border border-[#FFC857] rounded-full"
        />

        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Experience <span className="text-[#FFC857]">SSK World Club</span>?
            </h2>
            <p className="text-lg text-[#FFC857] mb-8">
              Become a member today and unlock access to all these premium amenities
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 25px rgba(255, 200, 87, 0.4)"
                }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#FFC857] text-[#0A2463] px-8 py-4 rounded-sm font-bold uppercase tracking-wider"
                onClick={() => navigate('/membership')}
              >
                Join Now
              </motion.button>
              <motion.button
                whileHover={{
                  backgroundColor: "rgba(255, 200, 87, 0.1)",
                  scale: 1.02,
                  borderColor: "#FFD700"
                }}
                whileTap={{ scale: 0.98 }}
                className="border-2 border-[#FFC857] text-[#FFC857] px-8 py-4 rounded-sm font-bold uppercase tracking-wider"
                onClick={() => navigate('/contact')}
              >
                Schedule a Tour
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AmenitiesPage;