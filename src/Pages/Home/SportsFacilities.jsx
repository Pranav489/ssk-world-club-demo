import React from "react";
import { motion, useAnimation, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { ChevronRight, Dumbbell, Waves, Volleyball, Flag, Trophy, Infinity } from "lucide-react";
import { basketball, fitness, squash, swimming, table_tennis, yoga } from "../../assets";

const AnimatedCounter = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (!inView) return;

    const duration = 2000; // 2 seconds
    const start = 0;
    const end = typeof value === 'number' ? value : parseInt(value) || 0;
    const increment = end / (duration / 16); // 60fps

    let current = start;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        current = end;
        clearInterval(timer);
      }
      setDisplayValue(Math.floor(current));
    }, 16);

    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {typeof value === 'string' && value.includes('/') ? value : displayValue}
      {typeof value === 'number' && value === 25}
    </span>
  );
};

const SportsFacilities = () => {
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

  const sports = [
    {
      name: "All India Tennis Pavilion",
      icon: <Trophy className="h-8 w-8 text-[#FFC857]" />,
      image: table_tennis,
      description: "10 international-standard courts (6 clay, 4 synthetic) with floodlights and VIP viewing deck. Hosts AITA and ITF tournaments annually.",
      features: [
        "Certified AITA coaching",
        "Ball machine services",
        "Weekend league matches",
        "Court-side chai and snacks"
      ]
    },
    {
      name: "Olympic Aquatics Dome",
      icon: <Waves className="h-8 w-8 text-[#FFC857]" />,
      image: swimming,
      description: "FINA-compliant 50m pool with temperature control, plus a kids’ training pool and hydrotherapy area for recovery.",
      features: [
        "Swim coaching by ex-national athletes",
        "Underwater video analysis",
        "Separate ladies' swimming hours",
        "Aqua Zumba & fitness sessions"
      ]
    },
    {
      name: "Fit Bharat Training Hub",
      icon: <Dumbbell className="h-8 w-8 text-[#FFC857]" />,
      image: fitness,
      description: "6,000 sq ft high-performance gym with Indian & international equipment, sports rehab zone, and recovery pods.",
      features: [
        "Kinesiology taping services",
        "Desi diet & fitness plans",
        "Altitude training chamber",
        "On-site physiotherapy"
      ]
    },
    {
      name: "National Basketball Arena",
      icon: <Volleyball className="h-8 w-8 text-[#FFC857]" />,
      image: basketball,
      description: "FIBA-approved indoor court with LED scoreboard, wooden flooring, and retractable seating for 300+ fans.",
      features: [
        "Coaching camps by ex-NBA pros",
        "State-level league matches",
        "Youth & school training programs",
        "VIP lounge with refreshments"
      ]
    },
    {
      name: "Squash Excellence Court",
      icon: <Dumbbell className="h-8 w-8 text-[#FFC857]" />, // Substitute with better icon if available
      image: squash,
      description: "Air-conditioned glass courts with certified wooden flooring and HD playback systems for performance tracking.",
      features: [
        "4 PSA-compliant courts",
        "Private and group lessons",
        "Weekend tournaments",
        "Performance video reviews"
      ]
    },
    {
      name: "Yoga & Wellness Shala",
      icon: <Infinity className="h-8 w-8 text-[#FFC857]" />,
      image: yoga,
      description: "Tranquil studio overlooking landscaped gardens, offering ancient Indian wellness practices and modern techniques.",
      features: [
        "Hatha & Ashtanga yoga",
        "Pranayama and meditation",
        "Ayurvedic wellness sessions",
        "Aerial yoga and sound healing"
      ]
    }

  ];

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
            variants={fadeInVariants}
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
            key={sport.name}
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
                src={sport.image}
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
              className={`flex flex-col justify-center ${index % 2 === 0 ? "lg:order-2 lg:pl-12" : "lg:order-1 lg:pr-12"
                }`}
              variants={itemVariants}
            >
              <motion.div
                className="mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                {sport.icon}
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
                {sport.features.map((feature, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start"
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                  >
                    <div className="bg-[#FFC857] rounded-full p-1 mr-3 mt-1">
                      <ChevronRight className="h-3 w-3 text-[#0A2463]" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.a
                href={`/facilities/${sport.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="flex items-center text-[#0A2463] font-medium group w-fit"
                variants={itemVariants}
                whileHover={{ x: 5 }}
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

      {/* Background pattern that scales with content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={controls}
        variants={{
          visible: {
            opacity: 0.03,
            transition: { delay: 0.8, duration: 1.5 }
          }
        }}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#FFC857] rounded-full mix-blend-multiply filter blur-xl opacity-20" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#0A2463] rounded-full mix-blend-multiply filter blur-xl opacity-20" />
      </motion.div>

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
          {[
            { value: 25, label: "Sports Offered" },
            { value: 50, label: "Professional Coaches" },
            { value: 12, label: "Championship Courts" },
            { value: "24/7", label: "Member Access" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              variants={{
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.7 + index * 0.15,
                    type: "spring",
                    stiffness: 150
                  }
                }
              }}
            >
              <p className="text-4xl font-bold text-[#FFC857] mb-2">
                <AnimatedCounter value={stat.value} />
                {stat.value === 25 && '+'}
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