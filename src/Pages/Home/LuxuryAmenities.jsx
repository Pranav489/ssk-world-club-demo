import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { 
  Utensils, 
  Hotel, 
  Film, 
  BookOpen,
  Flower,
  Palette
} from "lucide-react";

const LuxuryAmenities = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true, // Changed to true for one-time trigger
    threshold: 0.2
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 80
      }
    }
  };

  const amenities = [
    {
  title: "Fine Dining Experience",
  icon: <Utensils className="h-8 w-8" />,
  description: "Multi-cuisine restaurants offering gourmet Indian and global dishes",
  highlight: "Curated chef specials & regional thalis",
  color: "bg-[#FFC857]"
},
{
  title: "Ayurveda & Spa Retreat",
  icon: <Flower className="h-8 w-8" />,
  description: "Traditional Indian therapies blended with modern wellness",
  highlight: "Kerala Panchakarma & detox packages",
  color: "bg-[#0A2463]"
},
{
  title: "Club Residences",
  icon: <Hotel className="h-8 w-8" />,
  description: "Premium stay with heritage aesthetics and modern luxury",
  highlight: "24/7 concierge & butler services",
  color: "bg-[#FFC857]"
},
{
  title: "Private Screening Lounge",
  icon: <Film className="h-8 w-8" />,
  description: "Personalized movie nights with Indian & international cinema",
  highlight: "4K projection with surround sound",
  color: "bg-[#0A2463]"
},
{
  title: "Heritage Reading Room",
  icon: <BookOpen className="h-8 w-8" />,
  description: "A quiet oasis with Indian literature, business titles, and biographies",
  highlight: "Tea lounge & cultural discussion evenings",
  color: "bg-[#FFC857]"
},
{
  title: "Art & Culture Gallery",
  icon: <Palette className="h-8 w-8" />, // Replace with correct icon import
  description: "A curated space showcasing Indian contemporary and traditional art",
  highlight: "Monthly exhibits & live artist sessions",
  color: "bg-[#0A2463]"
}

  ];

  return (
    <section 
      ref={ref}
      className="relative py-24 bg-white overflow-hidden"
    >
      {/* Section Header */}
      <motion.div
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="container px-6 mx-auto mb-16 text-center"
      >
        <motion.h2 
          variants={cardVariants}
          className="text-3xl md:text-4xl font-bold mb-4 text-[#0A2463]"
        >
          LUXURY AMENITIES
        </motion.h2>
        <motion.div 
          variants={cardVariants}
          className="w-20 h-1 bg-[#FFC857] mx-auto mb-6"
        />
        <motion.p
          variants={cardVariants}
          className="text-lg text-gray-600 max-w-3xl mx-auto"
        >
          Premium experiences beyond athletics
        </motion.p>
      </motion.div>

      {/* Amenities Grid */}
      <motion.div
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="container px-6 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {amenities.map((amenity, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ 
              boxShadow: "0 10px 20px rgba(10, 36, 99, 0.1)",
              transition: { 
                duration: 0.1,
                ease: "easeOut"
              }
            }}
            style={{
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
            }}
            className="relative bg-white rounded-xl overflow-hidden border border-gray-100"
          >
            {/* Color Accent */}
            <motion.div 
              className={`absolute top-0 left-0 w-full h-1 ${amenity.color}`}
              initial={{ scaleX: 0 }}
              animate={controls}
              variants={{
                hidden: { scaleX: 0 },
                visible: {
                  scaleX: 1,
                  transition: {
                    duration: 0.8,
                    delay: 0.3 + index * 0.1
                  }
                }
              }}
            />
            
            {/* Content */}
            <div className="p-8">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={controls}
                variants={{
                  hidden: { scale: 0.8 },
                  visible: {
                    scale: 1,
                    transition: {
                      delay: 0.4 + index * 0.1
                    }
                  }
                }}
                className={`w-16 h-16 ${amenity.color} rounded-full flex items-center justify-center mb-6`}
              >
                {amenity.icon}
              </motion.div>
              <h3 className="text-xl font-bold mb-3 text-[#0A2463]">{amenity.title}</h3>
              <p className="text-gray-600 mb-4">{amenity.description}</p>
              <p className="text-sm font-medium text-[#FFC857]">{amenity.highlight}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={controls}
        variants={{
          visible: { opacity: 1, transition: { delay: 0.8 } },
          hidden: { opacity: 0 }
        }}
        className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-[#FFC857]/10 blur-xl"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={controls}
        variants={{
          visible: { opacity: 1, transition: { delay: 1 } },
          hidden: { opacity: 0 }
        }}
        className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-[#0A2463]/10 blur-lg"
      />
    </section>
  );
};

export default LuxuryAmenities;