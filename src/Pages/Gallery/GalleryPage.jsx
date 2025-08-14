import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Image as ImageIcon, ArrowRight, ArrowLeft, Phone, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { tennis_league, swimming, fitness, green_sport_campus, ssk_club, spa, restaurant, midnight_lounge, dining, tt_tournament } from "../../assets";

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredImages, setFilteredImages] = useState([]);
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Gallery data with categories
  const galleryImages = [
    // Sports
    { id: 1, src: tennis_league, category: 'sports', alt: "Championship tennis courts at sunset" },
    { id: 2, src: swimming, category: 'sports', alt: "Olympic-sized swimming pool" },
    { id: 3, src: fitness, category: 'sports', alt: "State-of-the-art fitness center" },
    { id: 4, src: green_sport_campus, category: 'sports', alt: "Lush green sports campus" },

    // Amenities
    { id: 5, src: spa, category: 'amenities', alt: "Luxury spa with massage rooms" },
    { id: 6, src: spa, category: 'amenities', alt: "Quiet reading library with premium selections" },
    { id: 7, src: spa, category: 'amenities', alt: "Private mini theater with recliners" },

    // Dining
    { id: 8, src: restaurant, category: 'dining', alt: "Fine dining restaurant with panoramic views" },
    { id: 9, src: midnight_lounge, category: 'dining', alt: "Members-only lounge with craft cocktails" },

    // Events
    { id: 10, src: dining, category: 'events', alt: "Annual gala dinner with live music" },
    { id: 11, src: tt_tournament, category: 'events', alt: "International tennis tournament" },

    // Premises
    { id: 12, src: ssk_club, category: 'premises', alt: "SSK World Club grand entrance" },
    { id: 13, src: swimming, category: 'premises', alt: "Resort-style pool area" },
  ];


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
  }, [selectedCategory]);

  // Animation variants
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
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white hover:text-[#FFC857] transition-colors"
              aria-label="Close lightbox"
            >
              <X className="h-8 w-8" />
            </button>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-6 md:left-12 text-white hover:text-[#FFC857] transition-colors"
              aria-label="Previous image"
            >
              <ArrowLeft className="h-8 w-8" />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-6 md:right-12 text-white hover:text-[#FFC857] transition-colors"
              aria-label="Next image"
            >
              <ArrowRight className="h-8 w-8" />
            </button>

            {/* Current Image */}
            <motion.div
              key={currentImageIndex}
              className="relative max-w-4xl w-full max-h-[90vh]"
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <img
                src={filteredImages[currentImageIndex]?.src}
                alt={filteredImages[currentImageIndex]?.alt}
                className="w-full h-full object-contain"
              />

              {/* Caption Below Image */}
              <div className="mt-4 text-center text-white">
                <p className="text-lg font-medium">
                  {filteredImages[currentImageIndex]?.alt}
                </p>
                <p className="text-sm text-[#FFC857]">
                  {currentImageIndex + 1} of {filteredImages.length}
                </p>
              </div>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-96 w-full overflow-hidden bg-black">
        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <img
            src={ssk_club}
            alt="SSK World Club Membership"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />
        </motion.div>
        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center text-white px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-4xl mx-auto text-center"
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
              A visual journey through SSK World Club's premium facilities
            </motion.p>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 0.3,
            transition: { delay: 1, duration: 1 }
          }}
          className="absolute top-1/4 right-10 w-32 h-32 border-2 border-[#FFC857] rounded-full"
        />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 0.2,
            transition: { delay: 1.2, duration: 1 }
          }}
          className="absolute bottom-1/3 left-8 w-16 h-16 border border-[#FFC857] rounded-full"
        />
      </section>

      {/* Gallery Section */}
      <section className="relative py-24 bg-white overflow-hidden">
        {/* Decorative Elements */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute top-20 -left-20 w-64 h-64 border-2 border-[#0A2463] rounded-full"
        />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute bottom-1/3 -right-20 w-48 h-48 border border-[#FFC857] rounded-full"
        />

        <div className="container mx-auto px-6 relative z-10">
          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {['all', 'premises', 'sports', 'amenities', 'dining', 'events'].map((category) => (
              <motion.button
                key={category}
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
            ))}
          </motion.div>

          {/* Image Grid */}
          <motion.div
            key={selectedCategory}
            initial="hidden"
            animate="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                variants={itemVariants}
                className="relative group overflow-hidden rounded-xl shadow-md"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)"
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                onClick={() => openLightbox(index)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover cursor-pointer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center gap-2 text-white">
                    <ImageIcon className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      {image.category.charAt(0).toUpperCase() + image.category.slice(1)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
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
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Experience <span className="text-[#FFC857]">SSK World Club</span> in Person?
            </h2>
            <p className="text-xl text-[#FFC857] mb-8">
              Our gallery showcases just a glimpse of what awaits you. Schedule a visit to see our world-class facilities firsthand.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 25px rgba(255, 200, 87, 0.4)"
                }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#FFC857] text-[#0A2463] px-8 py-4 rounded-sm font-bold uppercase tracking-wider flex items-center gap-2"
                onClick={() => navigate('/contact')}              >
                Book a Private Tour
                <ChevronRight className="h-5 w-5" />
              </motion.button>

              <a href="tel:7770001005">
                <motion.button
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

            </div>
          </motion.div>
        </div>
      </section>


    </div>
  );
};

export default GalleryPage;