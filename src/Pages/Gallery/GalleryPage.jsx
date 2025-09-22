import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronRight, Image as ImageIcon, ArrowRight, ArrowLeft, Phone, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { ssk_club, ssk_club1 } from "../../assets";
import axiosInstance from "../../services/api";

const GalleryPage = () => {
  const [contactInfo, setContactInfo] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredImages, setFilteredImages] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const navigate = useNavigate();
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.4
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const lightboxVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const imageVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
    exit: { scale: 0.9, opacity: 0 }
  };

  // Fetch contact information
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

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const response = await axiosInstance.get('/gallery');
        if (response.data.success) {
          // Check if response has the new structure (array) or old structure (object with images property)
          const imagesData = Array.isArray(response.data.data)
            ? response.data.data  // New structure without pagination
            : response.data.data.images; // Old structure with pagination

          const images = imagesData.map(img => ({
            id: img.id,
            src: img.image_url,
            alt: img.alt_text || img.title || 'Gallery image',
            category: img.category,
            title: img.title,
            description: img.description
          }));

          setGalleryImages(images);
          setFilteredImages(images);
        }
      } catch (err) {
        console.error('Error fetching gallery data:', err);
        setError('Failed to load gallery. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, []);
  // Open lightbox with clicked image
  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
  };

  // Close lightbox
  const closeLightbox = () => {
    setIsLightboxOpen(false);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  // Navigate between images
  const goToPrevious = () => {
    setCurrentImageIndex(prevIndex =>
      prevIndex === 0 ? filteredImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex(prevIndex =>
      prevIndex === filteredImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isLightboxOpen) return;

      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, currentImageIndex, filteredImages]);

  // Update filtered images when category changes
  useEffect(() => {
    const newFilteredImages = selectedCategory === 'all'
      ? galleryImages
      : galleryImages.filter(img => img.category === selectedCategory);

    setFilteredImages(newFilteredImages);
  }, [selectedCategory, galleryImages]);

  if (loading) {
      return (
        <section className="relative h-screen w-full overflow-hidden bg-white flex items-center justify-center">
          
          <div className="flex flex-col items-center justify-center relative z-10">
            {/* Animated Spinner */}
            <div className="relative mx-auto mb-6">
              <div className="w-16 h-16 border-4 border-white rounded-full"></div>
              <div className="w-16 h-16 border-4 border-[#FFC857] border-t-transparent rounded-full absolute top-0 left-0 animate-spin"></div>
            </div>
            
            <motion.p 
              className="text-[#0A2463] text-sm"
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
      {/* Lightbox Slider */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={lightboxVariants}
          >
            {/* Close Button */}
            <motion.button
              onClick={closeLightbox}
              className="absolute top-4 right-4 md:top-6 md:right-6 text-white hover:text-[#FFC857] transition-colors z-10 bg-black/50 rounded-full p-2"
              aria-label="Close lightbox"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="h-6 w-6 md:h-8 md:w-8" />
            </motion.button>

            {/* Navigation Arrows */}
            <motion.button
              onClick={goToPrevious}
              className="absolute left-2 md:left-6 text-white hover:text-[#FFC857] transition-colors z-10 bg-black/50 rounded-full p-2 md:p-3"
              aria-label="Previous image"
              whileHover={{ scale: 1.1, backgroundColor: "#FFC857", color: "#0A2463" }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowLeft className="h-5 w-5 md:h-8 md:w-8" />
            </motion.button>

            <motion.button
              onClick={goToNext}
              className="absolute right-2 md:right-6 text-white hover:text-[#FFC857] transition-colors z-10 bg-black/50 rounded-full p-2 md:p-3"
              aria-label="Next image"
              whileHover={{ scale: 1.1, backgroundColor: "#FFC857", color: "#0A2463" }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowRight className="h-5 w-5 md:h-8 md:w-8" />
            </motion.button>

            {/* Current Image Container */}
            <motion.div
              key={currentImageIndex}
              className="relative w-full h-full flex items-center justify-center p-4 md:p-8"
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="relative max-w-full max-h-full flex flex-col items-center">
                {/* Image */}
                <img
                  src={filteredImages[currentImageIndex]?.src}
                  alt={filteredImages[currentImageIndex]?.alt}
                  className="max-w-full max-h-[70vh] md:max-h-[80vh] object-contain rounded-lg"
                />

                {/* Caption Below Image */}
                <motion.div
                  className="mt-4 text-center text-white max-w-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-base md:text-lg font-medium">
                    {filteredImages[currentImageIndex]?.title}
                  </p>
                  {filteredImages[currentImageIndex]?.description && (
                    <p className="text-sm mt-2 text-gray-300">
                      {filteredImages[currentImageIndex]?.description}
                    </p>
                  )}
                  <p className="text-sm mt-2 text-[#FFC857]">
                    {currentImageIndex + 1} of {filteredImages.length}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section
        ref={ref}
        className="relative pt-20 md:pt-0 h-96 w-full overflow-hidden bg-black">
        {/* Hero Image */}
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
          <img
            src={ssk_club1}
            alt="The SSK World Club Membership"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center text-white px-6">
          <motion.div
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className="max-w-4xl mx-auto text-center mt-10 md:mt-0"
          >
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Explore Our World
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-xl text-[#FFC857] max-w-2xl mx-auto"
            >
              A visual journey through The SSK World Club's premium facilities
            </motion.p>
          </motion.div>
        </div>

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
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={controls}
          variants={{
            visible: {
              scale: 1,
              opacity: 0.2,
              transition: { delay: 1.2, duration: 1 }
            }
          }}
          className="absolute bottom-1/3 left-8 w-16 h-16 border border-[#FFC857] rounded-full"
        />
      </section>

      {/* Gallery Section */}
      <section className="relative py-24 bg-white overflow-hidden">
        {/* Decorative Elements */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.2 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute top-20 -left-20 w-64 h-64 border border-[#0A2463] rounded-full"
        />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.2 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute bottom-2 -right-16 w-48 h-48 border border-[#FFC857] rounded-full"
        />

        <div className="container mx-auto px-6 relative z-10">
          {/* Category Filters */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {['all', 'premises', 'sports', 'amenities', 'dining', 'events'].map((category) => (
              <motion.div key={category} variants={itemVariants}>
                <motion.button
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium uppercase tracking-wider text-sm relative ${selectedCategory === category
                    ? 'bg-[#0A2463] text-white'
                    : 'bg-gray-100 text-[#0A2463] hover:bg-gray-200'
                    }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                  {selectedCategory === category && (
                    <motion.div
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-0.5 bg-[#FFC857]"
                      layoutId="categoryUnderline"
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />
                  )}
                </motion.button>
              </motion.div>
            ))}
          </motion.div>

          {/* Image Grid */}
          {filteredImages.length > 0 ? (
            <motion.div
              key={selectedCategory}
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  variants={itemVariants}
                  className="relative group overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  onClick={() => openLightbox(index)}
                >
                  <motion.img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-64 object-cover cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <p className="text-gray-500 text-lg">No images found for this category</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-br from-[#0A2463] to-[#2E4052] overflow-hidden">
        {/* Decorative Elements */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute top-20 left-1/4 w-64 h-64 border-2 border-[#FFC857] rounded-full"
        />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute bottom-1/3 right-1/4 w-48 h-48 border border-white rounded-full"
        />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="text-center text-white"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold text-white mb-6"
            >
              Ready to Experience <span className="text-[#FFC857]">The SSK World Club</span> in Person?
            </motion.h2>
            <motion.div
              variants={itemVariants}
              className="w-20 h-1 bg-[#FFC857] mx-auto mb-8"
            />
            <motion.p
              variants={itemVariants}
              className="text-xl text-[#FFC857] mb-8 max-w-2xl mx-auto"
            >
              Our gallery showcases just a glimpse of what awaits you. Schedule a visit to see our world-class facilities firsthand.
            </motion.p>

            <motion.div
              variants={containerVariants}
              className="flex flex-wrap justify-center gap-6"
            >
              <motion.button
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 25px rgba(255, 200, 87, 0.4)"
                }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#FFC857] text-[#0A2463] px-8 py-4 rounded-sm font-bold uppercase tracking-wider flex items-center gap-2"
                onClick={() => navigate('/contact')}
              >
                Book a Private Tour
                <ChevronRight className="h-5 w-5" />
              </motion.button>

              {contactInfo && contactInfo.contact && contactInfo.contact.phone && (
                <a href={`tel:${contactInfo.contact.phone}`}>
                  <motion.button
                    variants={itemVariants}
                    whileHover={{
                      backgroundColor: "rgba(255, 200, 87, 0.1)",
                      scale: 1.02,
                      borderColor: "#FFD700"
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="border-2 border-[#FFC857] text-[#FFC857] px-8 py-4 rounded-sm font-bold uppercase tracking-wider flex items-center gap-2"
                  >
                    <Phone className="h-5 w-5" />
                    Contact Membership
                  </motion.button>
                </a>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;