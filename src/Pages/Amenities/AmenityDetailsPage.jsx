import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import {  Activity, Brain, Disc, Dumbbell, Image as ImageIcon, Info, Square, SquareDashedBottom, Table, Target, Waves } from "lucide-react";
import { Flower, Briefcase, Film, Table2, Hotel, ShoppingBag, Tent, BookOpen, Trophy, Crosshair, Volleyball, Leaf, Eclipse, Calendar, Phone, MapPin, Star, ChevronRight, Clock, Users, Coffee, Utensils, } from "lucide-react";
import axiosInstance from "../../services/api";

const AmenityDetailsPage = () => {
  const [contactInfo, setContactInfo] = useState(null);
  const { amenitySlug } = useParams();
  const navigate = useNavigate();
  const [amenity, setAmenity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

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

  // Fetch amenity data
  useEffect(() => {
    const fetchAmenityData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/amenities/${amenitySlug}`);

        if (response.status !== 200) {
          throw new Error('Failed to fetch amenity data');
        }

        // Transform data to ensure content items are properly formatted
        const amenityData = response.data;
        
        // Ensure sections and details are properly formatted
        if (amenityData.sections) {
          amenityData.sections = amenityData.sections.map(section => {
            if (section.details) {
              section.details = section.details.map(detail => {
                if (detail.content) {
                  // Convert content objects to strings if needed
                  detail.content = detail.content.map(item => {
                    if (typeof item === 'object' && item !== null) {
                      return item.item || item.text || item.content || JSON.stringify(item);
                    }
                    return item;
                  });
                }
                return detail;
              });
            }
            return section;
          });
        }

        setAmenity(amenityData);
        setError(null);
      } catch (err) {
        console.error('Error fetching amenity data:', err);
        setError('Amenity not found. Please try again.');
        setTimeout(() => {
          navigate('/amenities');
        }, 3000);
      } finally {
        setLoading(false);
      }
    };

    if (amenitySlug) {
      fetchAmenityData();
    }
  }, [amenitySlug, navigate]);

  // Function to get icon component based on icon name or string
  const getIconComponent = (iconName, props = { className: "h-5 w-5 text-[#0A2463]" }) => {
    if (!iconName) return <ChevronRight {...props} />;
    
    const iconMap = {
      briefcase: Briefcase,
      brain: Brain,
      activity: Activity,
      chevronright: ChevronRight,
      dumbbell: Dumbbell,
      square: Square,
      mappin: MapPin,
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

    // Check if it's a Lucide icon name
    const IconComponent = iconMap[iconName.toLowerCase()];
    if (IconComponent) {
      return <IconComponent {...props} />;
    }

    // If it's an emoji or unknown, return as text
    return <span {...props}>{iconName}</span>;
  };

   // Get all images (hero image + gallery images) - with null check
  const allImages = amenity ? [
    amenity.hero_image,
    ...(amenity.gallery_images || [])
  ].filter(Boolean) : [];
  

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
            Loading amenity details...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  // Error state
  if (error || !amenity) {
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
            Amenity Not Found
          </motion.h3>
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 mb-6"
          >
            {error || 'The amenity you are looking for does not exist.'}
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
            onClick={() => navigate('/amenities')}
            className="bg-[#FFC857] text-[#0A2463] px-6 py-2 rounded-md font-medium hover:bg-amber-400 transition-colors"
          >
            Back to Amenities
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
  {/* Hero Section */}
  <section className="relative h-96 w-full overflow-hidden bg-black">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="absolute inset-0"
    >
      <img
        src={amenity.hero_image}
        alt={amenity.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />
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
          {amenity.title}
        </motion.h1>
        <motion.div
          variants={itemVariants}
          className="w-20 h-1 bg-[#FFC857] mx-auto"
        />
      </motion.div>
    </div>
  </section>

  {/* Content Section */}
  <section className="relative py-16 bg-white overflow-hidden">
    {/* Decorative Elements */}
    <motion.div
      className="absolute -top-6 -right-6 w-40 h-40 border-2 border-[#FFC857]/20 rounded-full z-20"
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
    />
    <motion.div
      className="absolute bottom-[-20px] left-[-20px] w-32 h-32 border border-[#0A2463]/15 rounded-full z-20"
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.4 }}
    />

    <div className="container mx-auto px-6 relative z-10">
      {/* Two Column Layout - Gallery and Description */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Gallery Column */}
        <motion.div
          className="lg:sticky lg:top-24 lg:self-start"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Main Image */}
          <motion.div
            className="relative rounded-xl overflow-hidden mb-6 shadow-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <img
              src={allImages[selectedImage]}
              alt={`${amenity.title} ${selectedImage + 1}`}
              className="w-full h-auto object-cover max-h-96 mx-auto"
            />
          </motion.div>

          {/* Thumbnail Grid - Only show if multiple images */}
          {allImages.length > 1 && (
            <motion.div
              className="grid grid-cols-3 md:grid-cols-4 gap-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {allImages.map((img, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative h-24 cursor-pointer rounded-md overflow-hidden border-2 ${selectedImage === index ? 'border-[#FFC857]' : 'border-transparent'}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {selectedImage === index && (
                    <div className="absolute inset-0 bg-[#FFC857]/30" />
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Description Column */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col"
        >
          <div className="flex items-center gap-3 mb-6">
            <Info className="h-6 w-6 text-[#FFC857]" />
            <h2 className="text-2xl font-bold text-[#0A2463]">About</h2>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 mb-8">
            <p className="leading-relaxed">
              {amenity.description}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Details Sections - Below the two columns */}
      {amenity.sections && amenity.sections.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {amenity.sections.map((section, sectionIndex) => (
            <motion.div
              key={sectionIndex}
              variants={itemVariants}
              className="mb-12 last:mb-0"
            >
              <div className="flex items-center gap-3 mb-6">
                <motion.div 
                  className="bg-[#0A2463] p-2 rounded-full"
                  whileHover={{ scale: 1.1 }}
                >
                  {getIconComponent(section.icon, { className: "h-6 w-6 text-[#FFC857]" })}
                </motion.div>
                <h2 className="text-2xl font-bold text-[#0A2463]">
                  {section.title}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {section.details && section.details.map((detail, detailIndex) => (
                  <motion.div
                    key={detailIndex}
                    className="bg-gray-50 p-6 rounded-lg shadow-sm relative"
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                  >                       
                    <div className="flex items-center gap-3 mb-4">
                      {getIconComponent(detail.icon)}
                      <h3 className="font-bold text-[#0A2463]">
                        {detail.title}
                      </h3>
                    </div>
                    <ul className="space-y-2">
                      {detail.content && detail.content.map((item, itemIndex) => {
                        // Safely extract content text from objects
                        const contentText = typeof item === 'object' && item !== null
                          ? item.item || item.text || item.content || JSON.stringify(item)
                          : item;
                        
                        return (
                          <motion.li
                            key={itemIndex}
                            className="text-gray-600"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: itemIndex * 0.1 }}
                          >
                            {contentText}
                          </motion.li>
                        );
                      })}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        // Default sections if none are provided
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            variants={itemVariants}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div 
                className="bg-[#0A2463] p-3 rounded-full text-white"
                whileHover={{ scale: 1.1 }}
              >
                <Clock className="h-6 w-6" />
              </motion.div>
              <h2 className="text-2xl font-bold text-[#0A2463]">
                Operating Hours
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                className="bg-gray-50 p-6 rounded-lg shadow-sm"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="h-5 w-5 text-[#0A2463]" />
                  <h3 className="font-bold text-[#0A2463]">Timings</h3>
                </div>
                <ul className="space-y-2">
                  <li className="text-gray-600">Daily: 8:00 AM - 10:00 PM</li>
                </ul>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div 
                className="bg-[#0A2463] p-3 rounded-full text-white"
                whileHover={{ scale: 1.1 }}
              >
                <Users className="h-6 w-6" />
              </motion.div>
              <h2 className="text-2xl font-bold text-[#0A2463]">
                Access Information
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                className="bg-gray-50 p-6 rounded-lg shadow-sm"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Users className="h-5 w-5 text-[#0A2463]" />
                  <h3 className="font-bold text-[#0A2463]">Access</h3>
                </div>
                <ul className="space-y-2">
                  <li className="text-gray-600">Members only</li>
                  <li className="text-gray-600">Guests allowed with members</li>
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  </section>
  
  {/* CTA Section */}
  <section className="relative py-16 bg-gradient-to-br from-[#0A2463] to-[#2E4052]">
    <div className="container mx-auto px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-white mb-6">
          Experience {amenity.title} at SSK World Club
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 8px 25px rgba(255, 200, 87, 0.4)"
            }}
            whileTap={{ scale: 0.98 }}
            className="bg-[#FFC857] text-[#0A2463] px-8 py-3 rounded-sm font-bold"
            onClick={() => navigate('/contact')}
          >
            Book a Visit
          </motion.button>
          {contactInfo && contactInfo.contact && contactInfo.contact.phone && (
            <motion.a
              href={`tel:${contactInfo.contact.phone}`}
              whileHover={{
                backgroundColor: "rgba(255,255,255,0.1)",
                scale: 1.02
              }}
              whileTap={{ scale: 0.98 }}
              className="border-2 border-white text-white px-8 py-3 rounded-sm font-bold"
            >
              Contact Manager
            </motion.a>
          )}
        </div>
      </motion.div>
    </div>
  </section>
</div>
  );
};

export default AmenityDetailsPage;