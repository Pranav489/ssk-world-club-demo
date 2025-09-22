import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
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
import axiosInstance from "../../services/api";

const LuxuryAmenities = () => {
  const [amenities, setAmenities] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  useEffect(() => {
    const fetchAmenityData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/amenities/featured/6`);

        if (response.status !== 200) {
          throw new Error('Failed to fetch amenity data');
        }

        // Transform data to ensure content items are properly formatted
        const amenityData = response.data;
        setAmenities(amenityData);
        setError(null);
      } catch (err) {
        console.error('Error fetching amenity data:', err);
        setError('Amenities not found. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchAmenityData();
  }, []);

  const getAmenityIcon = (iconName, props = { className: "h-8 w-8" }) => {
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
        <div className="text-center p-8 bg-white rounded-xl shadow-md max-w-md mx-auto">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-[#0A2463] mb-2">Oops! Something went wrong</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#FFC857] text-[#0A2463] px-6 py-2 rounded-md font-medium hover:bg-amber-400 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <section
      ref={ref}
      className="relative py-24 bg-white overflow-hidden"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container px-6 mx-auto mb-16 text-center"
      >
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-4 text-[#0A2463]"
        >
          LUXURY AMENITIES
        </motion.h2>
        <motion.div
          className="w-20 h-1 bg-[#FFC857] mx-auto mb-6"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        />
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-lg text-gray-600 max-w-3xl mx-auto"
        >
          Premium experiences beyond athletics
        </motion.p>
      </motion.div>

      {/* Amenities Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container px-6 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {amenities.map((amenity, index) => (
          <motion.div
            key={index}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: index * 0.1,
              type: "spring",
              damping: 10,
              stiffness: 80
            }}
            viewport={{ once: true, margin: "-50px" }}
            className="relative bg-white rounded-xl overflow-hidden border border-gray-100 shadow-md hover:shadow-lg transition-shadow"
            whileHover={{
              y: -5,
              transition: { duration: 0.2 }
            }}
          >
            {/* Color Accent */}
            <motion.div
              className={`absolute top-0 left-0 w-full h-1 ${index % 2 === 0 ? 'bg-[#FFC857]' : 'bg-[#0A2463]'}`}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
              viewport={{ once: true }}
            />

            {/* Content */}
            <div className="p-8">
              <motion.div
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                viewport={{ once: true }}
                className={`w-16 h-16 ${index % 2 === 0 ? 'bg-[#FFC857]' : 'bg-[#0A2463]'} rounded-full flex items-center justify-center mb-6`}
              >
                {getAmenityIcon(amenity.icon)}
              </motion.div>
              <h3 className="text-xl font-bold mb-3 text-[#0A2463]">{amenity.title}</h3>
              <p className="text-gray-600 mb-4">{amenity.short_description}</p>
              <p className="text-sm font-medium text-[#FFC857]">{amenity.highlight}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        viewport={{ once: true }}
        className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-[#FFC857]/10 blur-xl"
      />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        viewport={{ once: true }}
        className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-[#0A2463]/10 blur-lg"
      />
    </section>
  );
};

export default LuxuryAmenities;