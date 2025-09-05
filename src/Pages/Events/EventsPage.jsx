import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Calendar, Clock, MapPin, ChevronRight, Play, Trophy, Users, Film, Waves } from "lucide-react";
import { ssk_club } from "../../assets";
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
            // Simple date parsing (you might want to improve this based on your date format)
            const eventDate = new Date(event.date.split(' ').pop()); // Extract year
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

  const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", damping: 12, stiffness: 100 }
        }
    };

  // const tabContentVariants = {
  //   hidden: { opacity: 0, y: 20 },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     transition: {
  //       duration: 0.5,
  //       ease: "easeInOut"
  //     }
  //   },
  //   exit: {
  //     opacity: 0,
  //     y: -20,
  //     transition: {
  //       duration: 0.3,
  //       ease: "easeInOut"
  //     }
  //   }
  // };

//   const eventsData = {
//   upcoming: [
//     {
//       id: 1,
//       title: "Monsoon Football League",
//       slug: "monsoon-football-league-2025",
//       date: "5-20 September 2025",
//       time: "4:00 PM - 8:00 PM",
//       location: "SSK Football Ground",
//       description: "Inter-club football tournament with senior and junior divisions",
//       image: monsoon_soccer,
//       type: "tournament"
//     },
//     {
//       id: 2,
//       title: "Autumn Badminton Open",
//       slug: "autumn-badminton-open-2025",
//       date: "10-15 October 2025",
//       time: "9:00 AM - 6:00 PM",
//       location: "Indoor Badminton Arena",
//       description: "Open tournament for men’s, women’s, and mixed doubles categories",
//       image: badminton,
//       type: "tournament"
//     },
//     {
//       id: 3,
//       title: "Winter Swimming Workshop",
//       slug: "winter-swimming-workshop-2025",
//       date: "1-10 December 2025",
//       time: "7:00 AM - 9:00 AM",
//       location: "Olympic Swimming Pool",
//       description: "Special training sessions with certified coaches to improve speed and endurance",
//       image: swimming,
//       type: "workshop"
//     },
//     {
//       id: 4,
//       title: "Holiday Fitness Bootcamp",
//       slug: "holiday-fitness-bootcamp-2025",
//       date: "20-30 December 2025",
//       time: "6:00 AM - 8:00 AM",
//       location: "SSK Fitness Center",
//       description: "High-intensity group workouts to stay in shape during the festive season",
//       image: fitness,
//       type: "camp"
//     },
//     {
//       id: 5,
//       title: "New Year Fun Marathon",
//       slug: "new-year-fun-marathon-2026",
//       date: "5 January 2026",
//       time: "6:00 AM - 10:00 AM",
//       location: "City Marathon Track",
//       description: "A 5K and 10K fun run to kickstart the year with energy and community spirit",
//       image: marathon,
//       type: "social"
//     },
//     {
//       id: 6,
//       title: "Spring Cricket Carnival",
//       slug: "spring-cricket-carnival-2026",
//       date: "15-20 February 2026",
//       time: "8:00 AM - 6:00 PM",
//       location: "SSK Cricket Ground",
//       description: "Friendly matches, food stalls, and music for a fun-filled cricket week",
//       image: net_cricket,
//       type: "tournament"
//     }
//   ],
//   past: [
//     {
//       id: 5,
//       title: "Spring Tennis Doubles Championship",
//       slug: "spring-tennis-doubles-championship-2025",
//       date: "15-18 March 2025",
//       time: "9:00 AM - 6:00 PM",
//       location: "SSK Tennis Courts",
//       description: "Competitive doubles matches with players from across the city",
//       image: tennis_league,
//       type: "tournament",
//       media: [
//         { type: "image", src: tennis_league },
//         { type: "video", src: hero_video_1 }
//       ]
//     },
//     {
//       id: 6,
//       title: "Yoga & Wellness Day",
//       slug: "yoga-and-wellness-day-2025",
//       date: "2 February 2025",
//       time: "6:30 AM - 10:00 AM",
//       location: "Clubhouse Lawn",
//       description: "Morning yoga session followed by nutrition workshops and meditation",
//       image: yoga,
//       type: "wellness",
//       media: [
//         { type: "image", src: seniors_yoga },
//         { type: "image", src: hero_video_1 }
//       ]
//     },
//     {
//       id: 7,
//       title: "National Table Tennis Qualifiers",
//       slug: "national-table-tennis-qualifiers-2024",
//       date: "12-15 November 2024",
//       time: "10:00 AM - 5:00 PM",
//       location: "Indoor Sports Complex",
//       description: "Qualifier matches for the National Table Tennis Championship",
//       image: table_tennis,
//       type: "tournament",
//       media: [
//         { type: "image", src: tt_tournament },
//         { type: "video", src: hero_video_1 }
//       ]
//     },
//     {
//       id: 8,
//       title: "Annual Sports Gala",
//       slug: "annual-sports-gala-2024",
//       date: "20 December 2024",
//       time: "7:00 PM - 11:00 PM",
//       location: "SSK Banquet Hall",
//       description: "An evening of celebration with award distribution, performances, and dinner",
//       image: tt_tournament,
//       type: "social",
//       media: [
//         { type: "image", src: diwali_sports },
//         { type: "video", src: hero_video_1 }
//       ]
//     },
//     {
//       id: 11,
//       title: "Independence Day Sports Meet",
//       slug: "independence-day-sports-meet-2024",
//       date: "15 August 2024",
//       time: "8:00 AM - 1:00 PM",
//       location: "SSK Sports Grounds",
//       description: "Track & field events, tug-of-war, and fun games for all members",
//       image: ssk_club,
//       type: "tournament",
//       media: [
//         { type: "image", src: badminton },
//         { type: "image", src: swimming }
//       ]
//     },
//     {
//       id: 12,
//       title: "Club Anniversary Celebration",
//       slug: "club-anniversary-celebration-2024",
//       date: "1 July 2024",
//       time: "6:00 PM - 10:00 PM",
//       location: "Main Lawn",
//       description: "Live band, fireworks, and dinner to mark the club's anniversary",
//       image: diwali_sports,
//       type: "social",
//       media: [
//         { type: "image", src: holi_fest },
//         { type: "video", src: hero_video_1 }
//       ]
//     }
//   ]
// };

if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFC857]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#FFC857] text-[#0A2463] px-6 py-2 rounded-sm font-bold"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Hero Section - now h-96 */}
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
            src={ssk_club}
            alt="SSK World Club Events"
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
              className="text-4xl md:text-5xl font-bold mb-4  "
              variants={itemVariants}
            >
              EXCLUSIVE <span className="text-[#FFC857]">EVENTS</span>
            </motion.h1>

            <motion.p
              className="text-lg text-white max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Tournaments, social gatherings, and special occasions at SSK World Club
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
          className="absolute top-20 left-10 w-64 h-64 border border-[#FFC857] rounded-full z-20"
        />
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute bottom-1/3 right-8 w-48 h-48 border border-[#0A2463] rounded-full z-20"
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
                className={`px-8 py-3 font-medium uppercase tracking-wider relative ${
                  activeTab === tab
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

          {/* Events Grid with AnimatePresence for smooth tab transitions */}
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
                  // whileHover={{ y: -5 }}
                  onClick={() => handleEventClick(event)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.image_url}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    {/* {activeTab === 'past' && (
                      <div className="absolute top-4 left-4 bg-[#0A2463] text-white px-3 py-1 rounded-full text-xs font-bold">
                        PAST EVENT
                      </div>
                    )} */}
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
                    <div className="flex items-center text-[#0A2463] font-medium group-hover:text-[#FFC857] transition-colors">
                    View details
                    <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </div>
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Host Your Next Event at SSK World Club
            </h2>
            <p className="text-xl text-[#FFC857] mb-8 max-w-2xl mx-auto">
              Our premium facilities are available for private tournaments, corporate events, and social gatherings
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <motion.button
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
              {/* <motion.button
                whileHover={{
                  backgroundColor: "rgba(255, 200, 87, 0.1)",
                  scale: 1.02,
                  borderColor: "#FFD700"
                }}
                whileTap={{ scale: 0.98 }}
                className="border-2 border-[#FFC857] text-[#FFC857] px-8 py-4 rounded-sm font-bold uppercase tracking-wider"
              >
                View Event Packages
              </motion.button> */}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default EventsPage;