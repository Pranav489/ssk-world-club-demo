import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Calendar, Clock, MapPin, ChevronRight, ChevronLeft, Signature } from "lucide-react";
// import { badminton, diwali_sports, fitness, hero_video_1, holi_fest, marathon, monsoon_soccer, net_cricket, retro_night, seniors_yoga, ssk_club, swimming, table_tennis, tennis_league, tt_tournament, yoga } from "../../assets";
import axiosInstance from "../../services/api";

const SignatureEvents = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,  // Only trigger once
    threshold: 0.2
  });
  const [events, setEvents] = useState({
    upcoming: [],
    past: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeTab, setActiveTab] = useState("upcoming");
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        
        // Fetch upcoming events
        const upcomingResponse = await axiosInstance.get('/events/homepage/4');
        const upcomingEvents = upcomingResponse.data.success ? upcomingResponse.data.data : [];
        
        // Fetch past events
        const pastResponse = await axiosInstance.get('/events', {
          params: {
            status: 'past',
            per_page: 4
          }
        });
        const pastEvents = pastResponse.data.success ? pastResponse.data.data : [];
        
        setEvents({
          upcoming: upcomingEvents,
          past: pastEvents
        });
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to load events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []); // Empty dependency array to run only on mount

  
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Animation variants (same as before)
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

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8 }
    }
  };

  const slideHorizontal = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  // Navigation functions (same as before)
  const nextEvent = () => {
    setCurrentEventIndex(prev =>
      (prev + 1) % events[activeTab].length
    );
  };

  const prevEvent = () => {
    setCurrentEventIndex(prev =>
      (prev - 1 + events[activeTab].length) % events[activeTab].length
    );
  };

  if (loading) {
    return (
      <section className="relative py-24 bg-white overflow-hidden" id="events">
        <div className="container px-6 mx-auto">
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFC857]"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error || (events.upcoming.length === 0 && events.past.length === 0)) {
    return (
      <section className="relative py-24 bg-white overflow-hidden" id="events">
        <div className="container px-6 mx-auto text-center">
          <Sparkles className="h-12 w-12 text-[#FFC857] mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-[#0A2463] mb-4">Signature Events</h2>
          <p className="text-gray-600">No events available at the moment. Check back soon!</p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className="relative py-24 bg-white overflow-hidden"
      id="events"
    >
      {/* Decorative elements - only animate once */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={inView ? {
          scale: 1,
          opacity: 0.1,
          transition: { delay: 0.5, duration: 1 }
        } : {}}
        className="absolute top-20 -right-20 w-64 h-64 border-2 border-[#FFC857] rounded-full"
      />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={inView ? {
          scale: 1,
          opacity: 0.1,
          transition: { delay: 0.7, duration: 1 }
        } : {}}
        className="absolute bottom-1/8 -left-20 w-48 h-48 border border-[#0A2463] rounded-full z-20"
      />

      <div className="container px-6 mx-auto">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants}>
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4 text-[#0A2463]"
            >
              EXCLUSIVE CLUB EVENTS
            </motion.h2>
            <motion.div
              className="w-20 h-1 bg-[#FFC857] mx-auto mb-6"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            />
          </motion.div>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            From championship tournaments to elegant social gatherings, experience the pinnacle of club life
          </motion.p>
        </motion.div>

        {/* Event Tabs */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="flex justify-center mb-12"
        >
          <motion.div
            className="flex border-b border-gray-200"
            variants={itemVariants}
          >
            {["upcoming", "past"].map((tab) => (
              <motion.button
                key={tab}
                className={`px-6 py-3 font-medium uppercase tracking-wider text-sm relative ${activeTab === tab
                  ? "text-[#0A2463]"
                  : "text-gray-500 hover:text-[#0A2463]"
                  }`}
                onClick={() => {
                  setActiveTab(tab);
                  setCurrentEventIndex(0);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab === "upcoming" ? "Upcoming Events" : "Past Events"}
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
        </motion.div>

        {/* Event Carousel */}
        <div className="relative">
          {events[activeTab].length > 0 ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTab}-${currentEventIndex}`}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              {/* Event Image */}
              <motion.div
                className="relative h-96 rounded-xl overflow-hidden shadow-2xl"
                variants={fadeInVariants}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#0A2463] to-[#2E4052] opacity-70" />
                <motion.img
                      src={events[activeTab][currentEventIndex].image_url}
                      alt={events[activeTab][currentEventIndex].title}
                      className="absolute inset-0 w-full h-full object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                <motion.div
                  className="absolute top-6 right-6 bg-[#FFC857] text-[#0A2463] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {events[activeTab][currentEventIndex].type_label || events[activeTab][currentEventIndex].type}
                </motion.div>
              </motion.div>

              {/* Event Content */}
              <motion.div
                variants={slideHorizontal}
                className="lg:pl-8"
              >
                <motion.h3
                  className="text-3xl font-bold text-[#0A2463] mb-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {events[activeTab][currentEventIndex].title}
                </motion.h3>

                <motion.div
                  className="flex flex-wrap gap-4 mb-6"
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                >
                  <motion.div
                    className="flex items-center text-gray-700"
                    variants={itemVariants}
                  >
                    <Calendar className="h-5 w-5 mr-2 text-[#FFC857]" />
                    {new Date(events[activeTab][currentEventIndex].date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </motion.div>
                  <motion.div
                    className="flex items-center text-gray-700"
                    variants={itemVariants}
                  >
                    <Clock className="h-5 w-5 mr-2 text-[#FFC857]" />
                    {events[activeTab][currentEventIndex].time}
                  </motion.div>
                  <motion.div
                    className="flex items-center text-gray-700"
                    variants={itemVariants}
                  >
                    <MapPin className="h-5 w-5 mr-2 text-[#FFC857]" />
                    {events[activeTab][currentEventIndex].location}
                  </motion.div>
                </motion.div>

                <motion.p
                  className="text-gray-600 mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {events[activeTab][currentEventIndex].description}
                </motion.p>

                <motion.div
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {activeTab === "upcoming" ? (
                        <motion.button
                          onClick={() => window.location.href = "/membership"}
                          whileHover={{
                            scale: 1.05,
                            boxShadow: "0 5px 15px rgba(255, 200, 87, 0.4)"
                          }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-[#FFC857] text-[#0A2463] px-8 py-3 rounded-sm font-bold"
                        >
                          Register Now
                        </motion.button>
                      ) : null}
                  <motion.button
                        onClick={() => window.location.href = `/events/${events[activeTab][currentEventIndex].slug}`}
                        whileHover={{
                          backgroundColor: "rgba(10, 36, 99, 0.05)",
                          scale: 1.02
                        }}
                        whileTap={{ scale: 0.98 }}
                        className="border border-[#0A2463] text-[#0A2463] px-8 py-3 rounded-sm font-bold"
                      >
                        Learn More
                      </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
          ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  No {activeTab} events available at the moment.
                </p>
              </div>
            )}

          {/* Navigation Arrows - Desktop */}
          {events[activeTab].length > 1 && (
            <>
              <motion.button
                onClick={prevEvent}
                className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 p-3 rounded-full z-10 hover:bg-white/30 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                style={{ left: '-40px' }}
              >
                <ChevronLeft className="h-6 w-6 text-[#0A2463] drop-shadow-lg" />
              </motion.button>
              <motion.button
                onClick={nextEvent}
                className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 p-3 rounded-full z-10 hover:bg-white/30 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                style={{ right: '-40px' }}
              >
                <ChevronRight className="h-6 w-6 text-[#0A2463] drop-shadow-lg" />
              </motion.button>
            </>
          )}

          {/* Navigation Arrows - Mobile */}
          {events[activeTab].length > 1 && (
            <div className="lg:hidden flex justify-center mt-8 space-x-4">
              <motion.button
                onClick={prevEvent}
                className="p-3 rounded-full bg-white shadow-md hover:bg-gray-50"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="h-6 w-6 text-[#0A2463]" />
              </motion.button>
              <motion.button
                onClick={nextEvent}
                className="p-3 rounded-full bg-white shadow-md hover:bg-gray-50"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="h-6 w-6 text-[#0A2463]" />
              </motion.button>
            </div>
          )}
        </div>
        {/* Mobile Indicators */}
        {events[activeTab].length > 1 && (
          <motion.div
            className="flex justify-center mt-12 space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {events[activeTab].map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${index === currentEventIndex ? 'bg-[#FFC857]' : 'bg-gray-300'}`}
                onClick={() => setCurrentEventIndex(index)}
                aria-label={`Go to event ${index + 1}`}
              />
            ))}
          </motion.div>
        )}

        {/* All Events Link */}
        <motion.div
          className="group text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <motion.a
            href="/events"
            className="inline-flex items-center text-[#0A2463] group-hover:text-[#FFC857] transition-colors font-bold uppercase tracking-wider group"
          // whileHover={{ x: 5 }}
          >
            View All Club Events
            <motion.span
              className="ml-2 group-hover:translate-x-1 transition-transform"
            // animate={{
            //   x: [0, 5, 0],
            // }}
            // transition={{
            //   repeat: Infinity,
            //   duration: 1.5,
            //   ease: "easeInOut"
            // }}
            >
              <ChevronRight className="h-5 w-5" />
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default SignatureEvents;