import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
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
    ChevronDown,
    X,
    SquareDashedBottom,
    Briefcase
} from 'lucide-react';
import axiosInstance from "../../services/api";

const SportsDetailPage = () => {
  const { category, sportSlug } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [sport, setSport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allImages, setAllImages] = useState([]);
  const [sportNotFound, setSportNotFound] = useState(false);

  const navigate = useNavigate();

  // Animation variants
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
        stiffness: 100,
        damping: 12
      }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8 }
    }
  };

  const slideUp = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  const galleryItem = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.3
      }
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

  // Fetch sport data
  useEffect(() => {
    const fetchSportData = async () => {
      try {
        setLoading(true);
        setSportNotFound(false);
        setError(null);
        
        const response = await axiosInstance.get(`/sports/${category}/${sportSlug}`);

        // Transform data if features/requirements are objects
        let sportData = response.data;
        if (sportData.features && sportData.features.length > 0 && typeof sportData.features[0] === 'object') {
          sportData = {
            ...sportData,
            features: sportData.features.map(feature =>
              typeof feature === 'object' ? feature.feature || feature.text || JSON.stringify(feature) : feature
            ),
            requirements: sportData.requirements.map(requirement =>
              typeof requirement === 'object' ? requirement.requirement || requirement.text || JSON.stringify(requirement) : requirement
            )
          };
        }

        setSport(sportData);

        // Create array with ALL images including main image and gallery images
        const images = [sportData.main_image]; // Start with main image
        
        // Add gallery images if available
        if (sportData.gallery_images && sportData.gallery_images.length > 0) {
          images.push(...sportData.gallery_images);
        }

        setAllImages(images);
      } catch (err) {
        console.error('Error fetching sport data:', err);
        if (err.response && err.response.status === 404) {
          setSportNotFound(true);
        } else {
          setError('Failed to load sport details. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    if (category && sportSlug) {
      fetchSportData();
    }
  }, [category, sportSlug]);

  // Icon mapping function
  const getSportIcon = (iconName, props = { className: "h-8 w-8 text-[#FFC857]" }) => {
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

  const openImage = (index) => {
    setSelectedImage(allImages[index]);
    setGalleryIndex(index);
  };

  const navigateGallery = (direction) => {
    let newIndex;
    if (direction === 'next') {
      newIndex = (galleryIndex + 1) % allImages.length;
    } else {
      newIndex = (galleryIndex - 1 + allImages.length) % allImages.length;
    }
    setSelectedImage(allImages[newIndex]);
    setGalleryIndex(newIndex);
  };

  // Loading state
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
            Loading sport details...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  // Error state
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

  // Sport not found state
  if (sportNotFound || !sport) {
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
            className="text-[#0A2463] mb-4"
          >
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </motion.div>
          <motion.h3
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-xl font-bold text-[#0A2463] mb-2"
          >
            Sport Not Found
          </motion.h3>
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 mb-6"
          >
            The sport you're looking for doesn't exist.
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
            onClick={() => navigate('/sports')}
            className="bg-[#FFC857] text-[#0A2463] px-6 py-2 rounded-md font-medium hover:bg-amber-400 transition-colors"
          >
            Back to Sports
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full overflow-hidden bg-black">
        {/* Background Image with Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={sport.main_image}
            alt={sport.name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 0.2,
            transition: { delay: 0.5, duration: 1 }
          }}
          className="absolute top-1/4 right-10 w-32 h-32 border-2 border-[#FFC857] rounded-full"
        />

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 0.15,
            transition: { delay: 0.7, duration: 1 }
          }}
          className="absolute bottom-1/3 left-8 w-16 h-16 border border-[#FFC857] rounded-full"
        />

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-end pb-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="max-w-3xl"
            >
              {/* Sport Name */}
              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-6xl font-bold text-white mb-4"
              >
                {sport.name} <span className="text-[#FFC857]">Facilities</span>
              </motion.h1>

              {/* Timing Badge */}
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center bg-[#FFC857] text-[#0A2463] px-4 py-2 rounded-full mb-6"
              >
                <Clock className="h-4 w-4 mr-2" />
                <span className="font-medium">{sport.timing}</span>
              </motion.div>

              {/* Short Description */}
              <motion.p
                variants={itemVariants}
                className="text-xl text-white/90 mb-8"
              >
                {sport.description}
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                variants={containerVariants}
                className="flex flex-wrap gap-4"
              >
                <motion.button
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 8px 20px rgba(255, 200, 87, 0.4)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-[#FFC857] text-[#0A2463] px-6 py-3 rounded-sm font-bold flex items-center gap-2"
                  onClick={() => navigate('/contact')}
                >
                  Book Facility
                  <ChevronRight className="h-5 w-5" />
                </motion.button>

                <motion.button
                  variants={itemVariants}
                  whileHover={{
                    backgroundColor: "rgba(255,255,255,0.1)",
                    scale: 1.02
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="border-2 border-white text-white px-6 py-3 rounded-sm font-bold flex items-center gap-2"
                  onClick={() => navigate('/gallery')}
                >
                  View Gallery
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
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
      </section>

      {/* Main Content Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        className="container mx-auto px-6 py-12 relative overflow-hidden"
      >
        <motion.div
          className="bg-white rounded-xl shadow-xl overflow-hidden"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Image Column */}
            <motion.div
              className="lg:order-1 space-y-4"
              variants={itemVariants}
            >
              <motion.div
                className="relative rounded-lg overflow-hidden shadow-md cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                onClick={() => openImage(0)} // Open first image (main image)
              >
                <img
                  src={sport.main_image}
                  alt={sport.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent flex items-end p-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white">{sport.name}</h2>
                    <p className="text-[#FFC857]">{sport.timing}</p>
                  </div>
                </div>
              </motion.div>

              {/* Additional Images Gallery - Show if we have more than just the main image */}
              {allImages.length > 1 && (
                <motion.div
                  className="grid grid-cols-3 gap-3 mt-4"
                  variants={fadeIn}
                >
                  {/* Show first 3 images including main image */}
                  {allImages.slice(0, 3).map((img, index) => (
                    <motion.div
                      key={index}
                      className="aspect-square rounded-md overflow-hidden relative cursor-pointer"
                      variants={galleryItem}
                      initial="hidden"
                      animate="visible"
                      whileHover={{ scale: 1.05 }}
                      onClick={() => openImage(index)}
                    >
                      <img
                        src={img}
                        alt={`${sport.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {/* Show +X indicator if there are more than 3 images */}
                      {index === 2 && allImages.length > 3 && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <span className="text-white font-bold text-lg">
                            +{allImages.length - 3}
                          </span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>

            {/* Content Column */}
            <motion.div
              className="lg:order-2 space-y-6"
              variants={itemVariants}
            >
              <motion.div
                className="flex items-center gap-4"
                variants={slideUp}
              >
                {getSportIcon(sport.icon)}
                <h2 className="text-2xl font-bold text-[#0A2463]">{sport.name} Facilities</h2>
              </motion.div>

              {/* Description Section */}
              <motion.div
                className="prose max-w-none"
                variants={fadeIn}
              >
                <p 
                className="text-gray-700"
                dangerouslySetInnerHTML={{ __html: sport.extended_description }}
                />
              </motion.div>

              {/* Key Features */}
              <motion.div
                className="bg-[#F8F9FA] p-5 rounded-lg border border-[#E9ECEF]"
                variants={slideUp}
              >
                <h3 className="text-lg font-semibold text-[#0A2463] mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#FFC857] rounded-full"></div>
                  Facility Specifications
                </h3>
                <ul className="space-y-3">
                  {sport.features && sport.features.map((feature, index) => {
                    // Extract the feature text if it's an object
                    const featureText = typeof feature === 'object' ? feature.feature || feature.text || JSON.stringify(feature) : feature;

                    return (
                      <motion.li
                        key={index}
                        className="flex items-start"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="bg-[#FFC857] rounded-full p-1 mr-3 mt-1">
                          <ChevronRight className="h-3 w-3 text-[#0A2463]" />
                        </div>
                        <span className="text-gray-700">{featureText}</span>
                      </motion.li>
                    );
                  })}
                </ul>
              </motion.div>

              {/* Detailed Information Sections */}
              <motion.div
                className="space-y-6"
                variants={containerVariants}
              >
                {/* Rules & Requirements */}
                <motion.div variants={itemVariants}>
                  <h3 className="text-lg font-semibold text-[#0A2463] mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#FFC857] rounded-full"></div>
                    Rules & Requirements
                  </h3>
                  <div className="prose max-w-none text-gray-700">
                    <p>{sport.rules}</p>
                    {sport.requirements && sport.requirements.length > 0 && (
                      <ul className="mt-2 space-y-1">
                        {sport.requirements.map((item, i) => {
                          // Extract the requirement text if it's an object
                          const requirementText = typeof item === 'object' ? item.requirement || item.text || JSON.stringify(item) : item;

                          return (
                            <motion.li
                              key={i}
                              className="flex items-start"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                            >
                              <span className="mr-2">•</span>
                              <span>{requirementText}</span>
                            </motion.li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                </motion.div>

                {/* Equipment Provision */}
                <motion.div variants={itemVariants}>
                  <h3 className="text-lg font-semibold text-[#0A2463] mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#FFC857] rounded-full"></div>
                    Equipment & Services
                  </h3>
                  <div className="prose max-w-none text-gray-700">
                    <p>{sport.equipment}</p>
                  </div>
                </motion.div>

                {/* Events & Tournaments */}
                <motion.div variants={itemVariants}>
                  <h3 className="text-lg font-semibold text-[#0A2463] mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#FFC857] rounded-full"></div>
                    Events & Tournaments
                  </h3>
                  <div className="prose max-w-none text-gray-700">
                    <p>{sport.events}</p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.button
              className="absolute top-6 right-6 text-white z-50"
              onClick={() => setSelectedImage(null)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="h-8 w-8" />
            </motion.button>

            <motion.div
              className="relative max-w-4xl w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <img
                src={selectedImage}
                alt={sport.name}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />

              {/* Navigation Arrows - Only show if more than one image */}
              {allImages.length > 1 && (
                <>
                  <motion.button
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-[#FFC857] hover:text-[#0A2463] transition-all"
                    onClick={() => navigateGallery('prev')}
                    whileHover={{ scale: 1.1, backgroundColor: "#FFC857", color: "#0A2463" }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronRight className="h-6 w-6 rotate-180" />
                  </motion.button>
                  <motion.button
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-[#FFC857] hover:text-[#0A2463] transition-all"
                    onClick={() => navigateGallery('next')}
                    whileHover={{ scale: 1.1, backgroundColor: "#FFC857", color: "#0A2463" }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </motion.button>
                </>
              )}

              {/* Image Counter - Only show if more than one image */}
              {allImages.length > 1 && (
                <motion.div
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {galleryIndex + 1} / {allImages.length}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SportsDetailPage;