import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Calendar, Clock, MapPin, ChevronRight, ChevronLeft, Signature } from "lucide-react";
import { badminton, diwali_sports, fitness, hero_video_1, holi_fest, marathon, monsoon_soccer, net_cricket, retro_night, seniors_yoga, ssk_club, swimming, table_tennis, tennis_league, tt_tournament, yoga } from "../../assets";

const SignatureEvents = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,  // Only trigger once
    threshold: 0.2
  });

  const [activeTab, setActiveTab] = useState("upcoming");
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  const events = {
  upcoming: [
    {
      id: 1,
      title: "Monsoon Football League",
      date: "2025-09-05",
      time: "4:00 PM - 8:00 PM",
      location: "SSK Football Ground",
      description: "Inter-club football tournament with senior and junior divisions",
      image: monsoon_soccer,
      category: "tournament"
    },
    {
      id: 2,
      title: "Autumn Badminton Open",
      date: "2025-10-10",
      time: "9:00 AM - 6:00 PM",
      location: "Indoor Badminton Arena",
      description: "Open tournament for men's, women's, and mixed doubles categories",
      image: badminton,
      category: "tournament"
    },
    {
      id: 3,
      title: "Winter Swimming Workshop",
      date: "2025-12-01",
      time: "7:00 AM - 9:00 AM",
      location: "Olympic Swimming Pool",
      description: "Special training sessions with certified coaches to improve speed and endurance",
      image: swimming,
      category: "workshop"
    },
    {
      id: 4,
      title: "Holiday Fitness Bootcamp",
      date: "2025-12-20",
      time: "6:00 AM - 8:00 AM",
      location: "SSK Fitness Center",
      description: "High-intensity group workouts to stay in shape during the festive season",
      image: fitness,
      category: "camp"
    },
    {
      id: 5,
      title: "New Year Fun Marathon",
      date: "2026-01-05",
      time: "6:00 AM - 10:00 AM",
      location: "City Marathon Track",
      description: "A 5K and 10K fun run to kickstart the year with energy and community spirit",
      image: marathon,
      category: "social"
    },
    {
      id: 6,
      title: "Spring Cricket Carnival",
      date: "2026-02-15",
      time: "8:00 AM - 6:00 PM",
      location: "SSK Cricket Ground",
      description: "Friendly matches, food stalls, and music for a fun-filled cricket week",
      image: net_cricket,
      category: "tournament"
    }
  ],
  past: [
    {
      id: 7,
      title: "Spring Tennis Doubles Championship",
      date: "2025-03-15",
      time: "9:00 AM - 6:00 PM",
      location: "SSK Tennis Courts",
      description: "Competitive doubles matches with players from across the city",
      image: tennis_league,
      category: "tournament",
      media: [
        { type: "image", src: tennis_league },
        { type: "video", src: hero_video_1 }
      ]
    },
    {
      id: 8,
      title: "Yoga & Wellness Day",
      date: "2025-02-02",
      time: "6:30 AM - 10:00 AM",
      location: "Clubhouse Lawn",
      description: "Morning yoga session followed by nutrition workshops and meditation",
      image: yoga,
      category: "wellness",
      media: [
        { type: "image", src: seniors_yoga },
        { type: "image", src: hero_video_1 }
      ]
    },
    {
      id: 9,
      title: "National Table Tennis Qualifiers",
      date: "2024-11-12",
      time: "10:00 AM - 5:00 PM",
      location: "Indoor Sports Complex",
      description: "Qualifier matches for the National Table Tennis Championship",
      image: table_tennis,
      category: "tournament",
      media: [
        { type: "image", src: tt_tournament },
        { type: "video", src: hero_video_1 }
      ]
    },
    {
      id: 10,
      title: "Annual Sports Gala",
      date: "2024-12-20",
      time: "7:00 PM - 11:00 PM",
      location: "SSK Banquet Hall",
      description: "An evening of celebration with award distribution, performances, and dinner",
      image: tt_tournament,
      category: "social",
      media: [
        { type: "image", src: diwali_sports },
        { type: "video", src: hero_video_1 }
      ]
    },
    {
      id: 11,
      title: "Independence Day Sports Meet",
      date: "2024-08-15",
      time: "8:00 AM - 1:00 PM",
      location: "SSK Sports Grounds",
      description: "Track & field events, tug-of-war, and fun games for all members",
      image: ssk_club,
      category: "tournament",
      media: [
        { type: "image", src: badminton },
        { type: "image", src: swimming }
      ]
    },
    {
      id: 12,
      title: "Club Anniversary Celebration",
      date: "2024-07-01",
      time: "6:00 PM - 10:00 PM",
      location: "Main Lawn",
      description: "Live band, fireworks, and dinner to mark the club's anniversary",
      image: diwali_sports,
      category: "social",
      media: [
        { type: "image", src: holi_fest },
        { type: "video", src: hero_video_1 }
      ]
    }
  ]
};
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
        className="absolute bottom-1/4 -left-20 w-48 h-48 border border-[#0A2463] rounded-full"
      />

      <div className="container px-6 mx-auto">
        {/* Section Header - only animate once */}
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
              animate={controls}
              variants={{
                visible: {
                  scaleX: 1,
                  transition: { delay: 0.3, type: "spring", stiffness: 200 }
                }
              }}
              style={{ originX: 0 }}
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
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab}
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
                  src={events[activeTab][currentEventIndex].image}
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
                  {events[activeTab][currentEventIndex].category}
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
                  <motion.a
                  href="/membership"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 5px 15px rgba(255, 200, 87, 0.4)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#FFC857] text-[#0A2463] px-8 py-3 rounded-sm font-bold"
                  >
                    Register Now
                  </motion.a>
                  <motion.a
                  href="/events"
                    whileHover={{
                      backgroundColor: "rgba(10, 36, 99, 0.05)",
                      scale: 1.02
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="border border-[#0A2463] text-[#0A2463] px-8 py-3 rounded-sm font-bold"
                  >
                    Learn More
                  </motion.a>
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

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
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <motion.a
            href="/events"
            className="inline-flex items-center text-[#0A2463] font-bold uppercase tracking-wider group"
            whileHover={{ x: 5 }}
          >
            View All Club Events
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
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default SignatureEvents;