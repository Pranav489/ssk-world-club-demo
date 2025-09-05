import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import {  Image as ImageIcon } from "lucide-react";
import { Flower, Briefcase, Film, Table2, Hotel, ShoppingBag, Tent, BookOpen, Trophy, Crosshair, Volleyball, Leaf, Eclipse, Calendar, Phone, MapPin, Star, ChevronRight, Clock, Users, Coffee, Utensils, } from "lucide-react";
// import { ac_tents, ac_tents1, billiards, billiards1, business_center, business_center1, card_room, card_room1, conference_room, conference_room1, dining, foosball, foosball1, midnight_lounge, mini_theatre, mini_theatre1, play_area, play_area1, restaurant, room_suites, room_suites1, spa, spa1, sports_shop, sports_shop1, wifi_library, wifi_library1 } from "../../assets";
import axiosInstance from "../../services/api";

const AmenityDetailsPage = () => {
  const { amenitySlug } = useParams();
  const navigate = useNavigate();
  const [amenity, setAmenity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

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
      // Lucide icons
      coffee: Coffee,
      utensils: Utensils,
      flower: Flower,
      briefcase: Briefcase,
      film: Film,
      table2: Table2,
      hotel: Hotel,
      shoppingbag: ShoppingBag,
      tent: Tent,
      bookopen: BookOpen,
      clock: Clock,
      users: Users,
      calendar: Calendar,
      phone: Phone,
      mapPin: MapPin,
      star: Star,
      crosshair: Crosshair,
      volleyball: Volleyball,
      leaf: Leaf,
      eclipse: Eclipse,
      trophy: Trophy,
      chevronright: ChevronRight,
      
      // Add other icon mappings as needed
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

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFC857] mx-auto mb-4"></div>
          <p className="text-[#0A2463] font-medium">Loading amenity details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !amenity) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-xl shadow-md max-w-md mx-auto">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-[#0A2463] mb-2">Amenity Not Found</h3>
          <p className="text-gray-600 mb-6">{error || 'The amenity you are looking for does not exist.'}</p>
          <button
            onClick={() => navigate('/amenities')}
            className="bg-[#FFC857] text-[#0A2463] px-6 py-2 rounded-md font-medium hover:bg-amber-400 transition-colors"
          >
            Back to Amenities
          </button>
        </div>
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
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              {amenity.title}
            </motion.h1>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6 }}
              className="w-20 h-1 bg-[#FFC857] mx-auto"
            />
          </div>
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
          {/* Image Gallery */}
          {allImages.length > 0 && (
            <motion.div
              className="mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <ImageIcon className="h-6 w-6 text-[#FFC857]" />
                <h2 className="text-2xl font-bold text-[#0A2463]">Gallery</h2>
              </div>

              {/* Main Image */}
              <div className="relative h-96 w-full rounded-xl overflow-hidden mb-4">
                <img
                  src={allImages[selectedImage]}
                  alt={`${amenity.title} ${selectedImage + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Thumbnail Grid - Only show if multiple images */}
              {allImages.length > 1 && (
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                  {allImages.map((img, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`relative h-24 cursor-pointer rounded-md overflow-hidden border-2 ${selectedImage === index ? 'border-[#FFC857]' : 'border-transparent'
                        }`}
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
                </div>
              )}
            </motion.div>
          )}

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto mb-16"
          >
            <p className="text-lg text-gray-700 leading-relaxed">
              {amenity.description}
            </p>
          </motion.div>

         {/* Details Sections */}
          {amenity.sections && amenity.sections.length > 0 ? (
            amenity.sections.map((section, sectionIndex) => (
              <motion.div
                key={sectionIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                className="mb-12 last:mb-0"
              >
                <div className="flex items-center gap-3 mb-6">
                    <div className="bg-[#0A2463] p-2 rounded-full">
                      {getIconComponent(section.icon, { className: "h-6 w-6 text-[#FFC857]" })}
                    </div>
                    <h2 className="text-2xl font-bold text-[#0A2463]">
                      {section.title}
                    </h2>
                  </div>

                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {section.details && section.details.map((detail, detailIndex) => (
                    <motion.div
                      key={detailIndex}
                      className="bg-gray-50 p-6 rounded-lg shadow-sm relative"
                    >
                        {/* Small decorative circle inside detail cards */}
                        <motion.div
                          className="absolute -top-2 -right-2 w-4 h-4 border border-[#FFC857]/20 rounded-full"
                          initial={{ scale: 0, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: detailIndex * 0.1 + 0.6 }}
                        />
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
                            <li key={itemIndex} className="text-gray-600">
                              {contentText}
                            </li>
                          );
                        })}
                        </ul>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))) :(// Default sections if none are provided
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-[#0A2463] p-3 rounded-full text-white">
                    <Clock className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#0A2463]">
                    Operating Hours
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <Clock className="h-5 w-5 text-[#0A2463]" />
                      <h3 className="font-bold text-[#0A2463]">Timings</h3>
                    </div>
                    <ul className="space-y-2">
                      <li className="text-gray-600">Daily: 8:00 AM - 10:00 PM</li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-12"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-[#0A2463] p-3 rounded-full text-white">
                    <Users className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#0A2463]">
                    Access Information
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <Users className="h-5 w-5 text-[#0A2463]" />
                      <h3 className="font-bold text-[#0A2463]">Access</h3>
                    </div>
                    <ul className="space-y-2">
                      <li className="text-gray-600">Members only</li>
                      <li className="text-gray-600">Guests allowed with members</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </>
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
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#FFC857] text-[#0A2463] px-8 py-3 rounded-sm font-bold"
                onClick={() => navigate('/contact')}
              >
                Book a Visit
              </motion.button>
              <motion.button
                whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.98 }}
                className="border-2 border-white text-white px-8 py-3 rounded-sm font-bold"
                onClick={() => navigate('/contact')}
              >
                Contact Manager
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AmenityDetailsPage;