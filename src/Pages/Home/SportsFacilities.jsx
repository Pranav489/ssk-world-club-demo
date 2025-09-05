import React from "react";
import { motion, useAnimation } from "framer-motion";
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
  ChevronDown,
  X
} from 'lucide-react';
import { basketball, fitness, squash, swimming, table_tennis, tennis_league, yoga } from "../../assets";
import { useNavigate } from "react-router";
import AnimatedCounter from "./AnimatedCounter";
import axiosInstance from "../../services/api";

const SportsFacilities = () => {
  const [sports, setSports] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [sportsLoading, setSportsLoading] = useState(true);
  const [sportsError, setSportsError] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState(null);

  useEffect(() => {
    const fetchSportsData = async () => {
      try {
        setSportsLoading(true)
        setSportsError(null)
        setStatsLoading(true);
        setStatsError(null);
        const [sportsResponse, statsResponse] = await Promise.all([
          axiosInstance.get("/sports/featured/6"),
          axiosInstance.get("/statistics"),
        ]);

        if (sportsResponse.data && statsResponse.data.success) {
          // Combine indoor and outdoor sports
          const allSports = [
            ...(sportsResponse.data.indoor || []),
            ...(sportsResponse.data.outdoor || [])
          ];
          setSports(allSports);
          setStatistics(statsResponse.data.data);
        } else {
          setSportsError(sportsResponse.data.message)
          setStatsError(statsResponse.data.message);
        }
      } catch (err) {
        setSportsError(err.response?.data?.message || 'Failed to fetch sports')
        setStatsError(err.response?.data?.message || 'Failed to fetch statistics');
      } finally {
        setSportsLoading(false);
        setStatsLoading(false);
      }
    };

    fetchSportsData();
  }, []);

  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1
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
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 80, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
        mass: 0.5
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

  // Icon mapping function
  const getSportIcon = (iconName, props = { className: "h-8 w-8 text-[#FFC857]" }) => {
    const iconMap = {
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
      // Add other icon mappings as needed
    };

    const IconComponent = iconMap[iconName?.toLowerCase()] || Trophy;
    return <IconComponent {...props} />;
  };


  // Statistics data from API with fallbacks
  const statsData = [
    {
      value: statistics?.sports_offered || 25,
      label: "Sports Offered",
      showPlus: true // Add this property
    },
    {
      value: statistics?.professional_coaches || 50,
      label: "Professional Coaches",
      showPlus: false
    },
    {
      value: statistics?.championship_courts || 12,
      label: "Championship Courts",
      showPlus: false
    },
    {
      value: "24/7",
      label: "Member Access",
      showPlus: false
    }
  ];

  if (sportsLoading && statsLoading) {
    return (
      <section className="relative py-24 bg-white overflow-hidden" id="sports-facilities">
        <div className="container px-6 mx-auto">
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFC857]"></div>
          </div>
        </div>
      </section>
    );
  }

  if (sportsError && statsError) {
    return (
      <section className="relative py-24 bg-white overflow-hidden" id="sports-facilities">
        <div className="container px-6 mx-auto">
          <div className="text-center text-red-500">
            <p>Error loading sports: {sportsError}</p>
            <p>Error loading statistics: {statsError}</p>
          </div>
        </div>
      </section>
    );
  }

  // Empty state
  if (sports.length === 0) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container px-6 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0A2463]">SPORTS FACILITIES</h2>
            <div className="w-20 h-1 bg-[#FFC857] mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              World-class athletic amenities for every enthusiast
            </p>
          </div>
          <div className="text-center p-8 bg-white rounded-xl shadow-md max-w-md mx-auto">
            <div className="text-[#0A2463] mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#0A2463] mb-2">No Sports Facilities Available</h3>
            <p className="text-gray-600">Check back later for our latest sports facilities.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className="relative py-24 bg-white overflow-hidden"
      id="sports-facilities"
    >
      {/* Section Header */}
      <div className="container px-6 mx-auto mb-20">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center"
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 text-[#0A2463]"
            variants={itemVariants}
          >
            WORLD-CLASS SPORTS FACILITIES
          </motion.h2>
          <motion.div
            className="w-20 h-1 bg-[#FFC857] mx-auto mb-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          />
          <motion.p
            className="text-lg text-gray-600 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Where champions train and enthusiasts discover their potential
          </motion.p>
        </motion.div>
      </div>

      {/* Sports Facilities Stack */}
      <div className="container px-6 mx-auto space-y-28">
        {sports.map((sport, index) => (
          <motion.div
            key={sport.id}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            custom={index}
          >
            {/* Image Column - Alternates sides */}
            <motion.div
              className={`relative h-96 rounded-xl overflow-hidden shadow-2xl ${index % 2 === 0 ? "lg:order-1" : "lg:order-2"
                }`}
              variants={fadeInVariants}
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#0A2463]/80 to-[#2E4052]/80" />
              <img
                src={sport.main_image}
                alt={sport.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <motion.div
                className="absolute top-6 left-6 bg-[#FFC857] text-[#0A2463] px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                Facility #{index + 1}
              </motion.div>
            </motion.div>

            {/* Content Column */}
            <motion.div
              className={`group flex flex-col justify-center ${index % 2 === 0 ? "lg:order-2 lg:pl-12" : "lg:order-1 lg:pr-12"
                }`}
              variants={itemVariants}
            >
              <motion.div
                className="mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                {getSportIcon(sport.icon)}
              </motion.div>

              <motion.h3
                className="text-2xl md:text-3xl font-bold text-[#0A2463] mb-4"
                variants={itemVariants}
              >
                {sport.name}
              </motion.h3>

              <motion.p
                className="text-gray-600 mb-6"
                variants={itemVariants}
              >
                {sport.description}
              </motion.p>

              <motion.ul
                className="space-y-3 mb-8"
                variants={containerVariants}
              >
                {sport.features && sport.features.slice(0, 4).map((feature, i) => {
                  // Extract feature text safely regardless of format
                  let featureText = '';

                  if (typeof feature === 'string') {
                    featureText = feature;
                  } else if (typeof feature === 'object' && feature !== null) {
                    featureText = feature.feature || feature.text || feature.name || JSON.stringify(feature);
                  } else {
                    featureText = String(feature);
                  }

                  return (
                    <motion.li
                      key={i}
                      className="flex items-start"
                      variants={itemVariants}
                    >
                      <div className="bg-[#FFC857] rounded-full p-1 mr-3 mt-1">
                        <ChevronRight className="h-3 w-3 text-[#0A2463]" />
                      </div>
                      <span className="text-gray-700">{featureText}</span>
                    </motion.li>
                  );
                })}
              </motion.ul>

              <motion.a
                href={`/sports/${sport.category}/${sport.slug}`}
                className="flex items-center text-[#0A2463] group-hover:text-[#FFC857] transition-colors font-medium group w-fit"
                variants={itemVariants}
              >
                Explore Facility
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
          </motion.div>
        ))}

        <motion.div
          className="text-center pt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.a
            href="/sports"
            className="inline-flex items-center text-[#0A2463] hover:text-[#FFC857] transition-colors font-medium group text-lg"
          >
            Explore All Sports Facilities
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

      {/* Enhanced Decorative Elements */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={controls}
        variants={{
          visible: {
            scale: 1,
            opacity: 0.1,
            transition: { delay: 0.5, duration: 1 }
          }
        }}
        className="absolute top-20 -right-20 w-64 h-64 border-2 border-[#FFC857] rounded-full"
      />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={controls}
        variants={{
          visible: {
            scale: 1,
            opacity: 0.1,
            transition: { delay: 0.7, duration: 1 }
          }
        }}
        className="absolute bottom-1/4 -left-20 w-48 h-48 border border-[#0A2463] rounded-full"
      />


      {/* New elements that repeat throughout the section */}
      {[...Array(Math.ceil(sports.length / 2))].map((_, i) => (
        <React.Fragment key={`deco-${i}`}>
          {/* Right side elements */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={controls}
            variants={{
              visible: {
                scale: 1,
                opacity: 0.05,
                transition: {
                  delay: 0.3 + i * 0.3,
                  duration: 1
                }
              }
            }}
            className="absolute"
            style={{
              top: `${30 + i * 30}%`,
              right: '5%',
              width: '120px',
              height: '120px',
              border: '1px dashed #FFC857',
              borderRadius: '50%'
            }}
          />

          {/* Left side elements */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={controls}
            variants={{
              visible: {
                scale: 1,
                opacity: 0.05,
                transition: {
                  delay: 0.4 + i * 0.3,
                  duration: 1
                }
              }
            }}
            className="absolute"
            style={{
              top: `${35 + i * 30}%`,
              left: '5%',
              width: '80px',
              height: '80px',
              border: '1px dashed #0A2463',
              borderRadius: '50%'
            }}
          />
        </React.Fragment>
      ))}
      {/* Stats Footer */}
      <motion.div
        className="bg-[#0A2463] text-white py-16 mt-28"
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        variants={{
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              delay: 0.5,
              type: "spring",
              stiffness: 100,
              damping: 10
            }
          }
        }}
      >
        <div className="container px-6 mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <motion.div key={stat.label} className="text-center">
              <p className="text-4xl font-bold text-[#FFC857] mb-2">
                <AnimatedCounter
                  value={stat.value}
                  duration={1500}
                  showPlus={stat.showPlus}
                />
              </p>
              <p className="text-sm uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default SportsFacilities;