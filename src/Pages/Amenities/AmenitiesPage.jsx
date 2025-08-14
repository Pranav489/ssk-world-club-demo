import { motion, useAnimation } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { ChevronRight, Play, Wifi, Film, Utensils, Hotel, ShoppingBag, Tent, BookOpen, Users, Coffee, Briefcase, Table2, Flower } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ac_tents, billiards, business_center, card_room, conference_room, dining, foosball, mini_theatre, mini_theatre1, play_area, room_suites, spa, sports_shop, wifi_library } from "../../assets";
// import { amenitiesHero1, amenitiesHero2, amenitiesHero3 } from "../../assets";

const AmenitiesPage = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.4 });
  const [activeSlide, setActiveSlide] = useState(0);
  const navigate = useNavigate();

  // Hero carousel images
  const heroImages = [
    {
      image: conference_room,
      title: "Unmatched Luxury Amenities",
      subtitle: "Where every detail caters to your comfort and pleasure"
    },
    {
      image: wifi_library,
      title: "Beyond Sports Excellence",
      subtitle: "Discover our premium lifestyle facilities"
    },
    {
      image: mini_theatre1,
      title: "Five-Star Club Experience",
      subtitle: "World-class amenities for discerning members"
    }
  ];

  // Amenities data
  const amenities = [
    {
      name: "Billiards and Snooker",
      icon: <Table2 className="h-8 w-8 text-[#FFC857]" />,
      description: "Professional-grade tables in our sophisticated games lounge",
      image: billiards
    },
    {
      name: "Business Center",
      icon: <Briefcase className="h-8 w-8 text-[#FFC857]" />,
      description: "Fully equipped workspace with meeting rooms and tech support",
      image: business_center
    },
    {
      name: "Card Room",
      icon: <Users className="h-8 w-8 text-[#FFC857]" />,
      description: "Elegant space for bridge, poker and other card games",
      image: card_room
    },
    {
      name: "Conference Room",
      icon: <Briefcase className="h-8 w-8 text-[#FFC857]" />,
      description: "State-of-the-art meeting facilities for corporate events",
      image: conference_room
    },
    {
      name: "Foosball",
      icon: <Table2 className="h-8 w-8 text-[#FFC857]" />,
      description: "Premium foosball tables in our games lounge",
      image: foosball
    },
    {
      name: "Kids Play Area",
      icon: <Users className="h-8 w-8 text-[#FFC857]" />,
      description: "Supervised play zone with engaging activities for children",
      image: play_area
    },
    {
      name: "Mini Theatre",
      icon: <Film className="h-8 w-8 text-[#FFC857]" />,
      description: "Private cinema with plush seating and premium sound",
      image: mini_theatre
    },
    {
      name: "Restaurant & Cafe",
      icon: <Utensils className="h-8 w-8 text-[#FFC857]" />,
      description: "Gourmet dining experiences with seasonal menus",
      image: dining
    },
    {
      name: "Room Suites",
      icon: <Hotel className="h-8 w-8 text-[#FFC857]" />,
      description: "Luxury accommodations for members and guests",
      image: room_suites
    },
    {
      name: "Spa",
      icon: <Flower className="h-8 w-8 text-[#FFC857]" />,
      description: "Holistic wellness treatments in a serene environment",
      image: spa
    },
    {
      name: "Sports Shop",
      icon: <ShoppingBag className="h-8 w-8 text-[#FFC857]" />,
      description: "Premium equipment and apparel from top brands",
      image: sports_shop
    },
    {
      name: "A/C Tents",
      icon: <Tent className="h-8 w-8 text-[#FFC857]" />,
      description: "Climate-controlled outdoor spaces for events",
      image: ac_tents
    },
    {
      name: "Wifi Library",
      icon: <BookOpen className="h-8 w-8 text-[#FFC857]" />,
      description: "Tranquil reading space with high-speed internet",
      image: wifi_library
    }
  ];

  // Auto-rotate carousel
  useEffect(() => {
    if (inView) {
      controls.start("visible");
      const interval = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % heroImages.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [controls, inView]);

  // Create a ref for the amenities section
  const amenitiesSectionRef = useRef(null);

  // Function to scroll to amenities
  const scrollToAmenities = () => {
    amenitiesSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

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

  const handleAmenityClick = (amenityName) => {
    const slug = amenityName
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')  // remove all non-alphanumeric & non-space
      .replace(/\s+/g, '-');         // replace spaces with dash
    navigate(`/amenities/${slug}`);
  };


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Carousel Section */}
      <section ref={ref} className="relative h-screen w-full overflow-hidden bg-black">
        {/* Sliding Background Images */}
        <div className="absolute inset-0 flex">
          {heroImages.map((slide, index) => (
            <motion.div
              key={index}
              className={`h-full relative overflow-hidden transition-all duration-1000 ${index === activeSlide ? 'w-full' : 'w-0'
                }`}
              initial={{ opacity: 0 }}
              animate={{
                opacity: index === activeSlide ? 1 : 0,
                zIndex: index === activeSlide ? 10 : 1
              }}
              transition={{ duration: 1.5 }}
            >
              <img
                src={slide.image}
                alt=""
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
                onClick={scrollToAmenities} // Use the new scroll function
              >
                Explore Amenities
                {/* <ChevronRight className="h-5 w-5" /> */}
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
                {/* <Play className="h-5 w-5" /> */}
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
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`h-3 w-3 rounded-full transition-all ${index === activeSlide ? 'bg-[#FFC857] w-6' : 'bg-white/50'
                }`}
              aria-label={`View ${heroImages[index].title}`}
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
      </section>

      {/* Amenities Grid Section */}
      <section
        ref={amenitiesSectionRef}
        className="relative py-24 bg-white overflow-hidden"
      >        <div className="container mx-auto px-6">
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
            <div className="w-20 h-1 bg-[#FFC857] mx-auto mb-6" />
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Experience unparalleled comfort and convenience with our exclusive range of premium facilities
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            {amenities.map((amenity, index) => (
              <motion.div
                key={amenity.name}
                variants={itemVariants}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer group border border-gray-100"
                whileHover={{ y: -5 }}
                onClick={() => handleAmenityClick(amenity.name)}
              >
                {/* Image Container */}
                <div className="h-48 relative overflow-hidden">
                  <motion.img
                    src={amenity.image}
                    alt={amenity.name}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 bg-[#FFC857] text-[#0A2463] px-4 py-1 rounded-full text-sm font-bold">
                    {amenity.name}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="bg-[#0A2463]/10 p-2 rounded-full">
                      {amenity.icon}
                    </div>
                    <h3 className="text-lg font-bold text-[#0A2463]">
                      {amenity.name}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-6">{amenity.description}</p>
                  <div className="flex items-center text-[#0A2463] font-medium group-hover:text-[#FFC857] transition-colors">
                    View details
                    <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-br from-[#0A2463]/95 to-[#2E4052] overflow-hidden">
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