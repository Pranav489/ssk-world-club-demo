import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Calendar, Clock, MapPin, ChevronRight, Play, Trophy, Users, Film, Waves } from "lucide-react";
import { ssk_club, ssk_club4 } from "../../assets";
import { useNavigate } from "react-router";
import axiosInstance from "../../services/api";

const EventsPage = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [events, setEvents] = useState({ upcoming: [], past: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.4 });
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

  // Fetch events data
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axiosInstance.get('/events');

        if (response.data.success) {
          const allEvents = response.data.data;

          // Categorize events into upcoming and past
          const now = new Date();
          const categorizedEvents = {
            upcoming: [],
            past: []
          };

          allEvents.forEach(event => {
            const eventDate = new Date(event.date.split(' ').pop());
            if (eventDate >= now || event.status === 'upcoming' || event.status === 'ongoing') {
              categorizedEvents.upcoming.push(event);
            } else {
              categorizedEvents.past.push(event);
            }
          });

          setEvents(categorizedEvents);
        }
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to load events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const handleEventClick = (event) => {
    navigate(`/events/${event.slug}`);
  };

  const getEventIcon = (type) => {
    switch (type) {
      case 'tournament': return <Trophy className="h-5 w-5 text-[#FFC857]" />;
      case 'social': return <Users className="h-5 w-5 text-[#FFC857]" />;
      case 'workshop': return <Waves className="h-5 w-5 text-[#FFC857]" />;
      case 'gala': return <Film className="h-5 w-5 text-[#FFC857]" />;
      case 'exhibition': return <Users className="h-5 w-5 text-[#FFC857]" />;
      default: return <Users className="h-5 w-5 text-[#FFC857]" />;
    }
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
    <div className="relative">
      {/* Hero Section */}
      <section
        ref={ref}
        className="relative pt-20 md:pt-0 h-96 w-full overflow-hidden bg-black"
      >
        {/* Background Image */}
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
            src={ssk_club4}
            alt="The SSK World Club Events"
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
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="relative z-10 h-full flex items-center justify-center text-white px-6"
        >
          <div className="max-w-4xl mx-auto text-center mt-10 md:mt-0">
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-4"
              variants={itemVariants}
            >
              EXCLUSIVE <span className="text-[#FFC857]">EVENTS</span>
            </motion.h1>

            <motion.p
              className="text-lg text-white max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Tournaments, social gatherings, and special occasions at The SSK World Club
            </motion.p>
          </div>
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

      {/* Events Content */}
      <section className="relative py-24 bg-white overflow-hidden">
        {/* Decorative elements */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.2 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute top-20 left-10 w-64 h-64 border border-[#FFC857] rounded-full"
        />

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute bottom-1/3 right-8 w-48 h-48 border border-[#0A2463] rounded-full"
        />

        <div className="container mx-auto px-6 relative z-10">
          {/* Tabs */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="flex justify-center mb-12 border-b border-gray-200"
          >
            {['upcoming', 'past'].map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 font-medium uppercase tracking-wider relative ${activeTab === tab
                  ? 'text-[#0A2463]'
                  : 'text-gray-500 hover:text-[#0A2463]'
                  }`}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)} Events
                {activeTab === tab && (
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FFC857]"
                    layoutId="eventTabUnderline"
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>

          {/* Events Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {events[activeTab]?.length > 0 ? (
                events[activeTab].map((event) => (
                  <motion.div
                    key={event.id}
                    variants={itemVariants}
                    className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-100"
                    whileHover={{ y: -5 }}
                    onClick={() => handleEventClick(event)}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <motion.img
                        src={event.image_url}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        {getEventIcon(event.type)}
                        <h3 className="text-xl font-bold text-[#0A2463]">{event.title}</h3>
                      </div>
                      <div className="space-y-3 text-gray-600 mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 line-clamp-2 mb-4">{event.description}</p>
                      <motion.div
                        className="flex items-center text-[#0A2463] font-medium group-hover:text-[#FFC857] transition-colors"
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
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  variants={itemVariants}
                  className="col-span-full text-center py-12"
                >
                  <p className="text-gray-500 text-lg">
                    {activeTab === 'upcoming'
                      ? 'No upcoming events at the moment. Check back soon!'
                      : 'No past events to display.'
                    }
                  </p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-br from-[#0A2463] to-[#2E4052] overflow-hidden">
        {/* Decorative elements */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute top-20 right-10 w-64 h-64 border-2 border-[#FFC857] rounded-full"
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
              Host Your Next Event at The SSK World Club
            </motion.h2>
            <motion.div
              variants={itemVariants}
              className="w-20 h-1 bg-[#FFC857] mx-auto mb-8"
            />
            <motion.p
              variants={itemVariants}
              className="text-xl text-[#FFC857] mb-8 max-w-2xl mx-auto"
            >
              Our premium facilities are available for private tournaments, corporate events, and social gatherings
            </motion.p>
            <motion.div
              variants={containerVariants}
              className="flex flex-wrap justify-center gap-6"
            >
              <motion.button
                variants={itemVariants}
                onClick={() => navigate('/contact')}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 25px rgba(255, 200, 87, 0.4)"
                }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#FFC857] text-[#0A2463] px-8 py-4 rounded-sm font-bold uppercase tracking-wider"
              >
                Inquire About Venue Booking
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default EventsPage;