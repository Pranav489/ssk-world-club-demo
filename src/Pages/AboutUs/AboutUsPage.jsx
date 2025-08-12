import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Play, ChevronRight, Target, Globe, Sparkles, MapPin, Shield, Clock, Award, HeartPulse, Utensils, Trophy, Activity, Medal, Waves, Briefcase, Users } from "lucide-react";
import { founder, hero_video_1, leader2, leader3, ssk_club } from "../../assets";

const AboutUsPage = () => {
  const heroControls = useAnimation();
  const storyControls = useAnimation();
  const clubControls = useAnimation();

  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.4
  });

  const [storyRef, storyInView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  const [clubRef, clubInView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  useEffect(() => {
    if (heroInView) heroControls.start("visible");
    if (storyInView) storyControls.start("visible");
    if (clubInView) clubControls.start("visible");
  }, [heroControls, storyControls, clubControls, heroInView, storyInView, clubInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.4
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
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
      transition: { duration: 1.2 }
    }
  };

  const slideInFromLeft = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const slideInFromRight = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-screen w-full overflow-hidden"
      >
        {/* Background Video */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={heroControls}
          variants={{
            visible: {
              opacity: 1,
              transition: { duration: 1.5 }
            }
          }}
          className="absolute inset-0 z-0"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={hero_video_1} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40" />
        </motion.div>

        {/* Content */}
        <motion.div
          initial="hidden"
          animate={heroControls}
          variants={containerVariants}
          className="relative z-10 h-full flex items-center justify-center text-white px-6"
        >
          <div className="max-w-4xl mx-auto text-center">
            {/* EST. 2020 Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-block bg-[#FFC857] text-[#0A2463] px-6 py-2 rounded-full mb-8 font-bold uppercase tracking-wider text-sm"
            >
              EST. 2020
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6"
              variants={itemVariants}
            >
              <span className="block">REDEFINING</span>
              <span className="block text-[#FFC857]">SPORTS LUXURY</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              className="text-xl md:text-2xl max-w-2xl mx-auto mb-10"
              variants={itemVariants}
            >
              Where cutting-edge athletic performance meets contemporary luxury
            </motion.p>

            {/* CTA Buttons */}
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
              >
                Watch Our Story
                <Play className="h-5 w-5" />
              </motion.button>

              <motion.button
                variants={itemVariants}
                whileHover={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  scale: 1.02
                }}
                whileTap={{ scale: 0.98 }}
                className="border-2 border-white px-8 py-4 rounded-sm font-bold flex items-center gap-2"
              >
                Explore Facilities
                <ChevronRight className="h-5 w-5" />
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Scrolling Indicator */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: "easeOut" }
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-[#FFC857] rounded-full flex justify-center">
            <motion.div
              className="w-1 h-2 bg-[#FFC857] rounded-full mt-2"
              initial={{ y: 0 }}
              animate={{
                y: [0, 4, 0],
                transition: {
                  delay: 0.8,
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            />
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={heroControls}
          variants={{
            visible: {
              scale: 1,
              opacity: 0.3,
              transition: { delay: 1, duration: 1 }
            }
          }}
          className="absolute top-1/4 right-10 w-32 h-32 border-2 border-[#FFC857] rounded-full"
        />
      </section>

      {/* Our Story Section */}
      <section
        ref={storyRef}
        className="relative py-24 bg-white overflow-hidden"
      >
        {/* Decorative elements */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={storyControls}
          variants={{
            visible: {
              scale: 1,
              opacity: 0.1,
              transition: { delay: 0.5, duration: 1 }
            }
          }}
          className="absolute top-20 left-10 w-64 h-64 border-2 border-[#FFC857] rounded-full"
        />

        <div className="container px-6 mx-auto">
          <motion.div
            initial="hidden"
            animate={storyControls}
            variants={containerVariants}
            className="flex flex-col lg:flex-row gap-16 items-center"
          >
            {/* Founder Image */}
            <motion.div
              className="relative lg:w-1/2 h-96 rounded-xl overflow-hidden shadow-2xl"
              variants={fadeInVariants}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#0A2463]/80 to-[#2E4052]/80" />
              <img
                src={leader3}
                alt="Founder"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <motion.div
                className="absolute bottom-6 left-6 bg-[#FFC857] text-[#0A2463] px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                Founder & CEO
              </motion.div>
            </motion.div>

            {/* Content */}
            <motion.div
              className="lg:w-1/2"
              variants={itemVariants}
            >
              <motion.h2
                className="text-3xl font-bold text-[#0A2463] mb-6"
                variants={itemVariants}
              >
                Our Vision for the Future
              </motion.h2>

              <motion.div
                className="relative mb-8"
                variants={fadeInVariants}
              >
                <motion.blockquote
                  className="text-2xl italic text-gray-700 relative z-10 pl-8 border-l-4 border-[#FFC857]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  "To create a new standard where world-class athletic training and contemporary luxury coexist seamlessly for the modern enthusiast."
                </motion.blockquote>
              </motion.div>

              <motion.p
                className="text-gray-600 mb-8"
                variants={itemVariants}
              >
                Founded in 2020, SSK World Club was born from a vision to disrupt traditional sports clubs by combining cutting-edge facilities with boutique hospitality. We're pioneering a movement where performance and lifestyle elevate each other.
              </motion.p>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
                variants={containerVariants}
              >
                {[
                  {
                    icon: <Target className="h-6 w-6 text-[#FFC857]" />,
                    title: "Athletic Excellence",
                    description: "Olympic-grade training infrastructure"
                  },
                  {
                    icon: <Sparkles className="h-6 w-6 text-[#FFC857]" />,
                    title: "Luxury Experience",
                    description: "Five-star amenities and service"
                  },
                  {
                    icon: <Globe className="h-6 w-6 text-[#FFC857]" />,
                    title: "Global Community",
                    description: "Connecting passionate individuals"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    className="bg-gray-50 p-6 rounded-lg transition-shadow duration-300 hover:shadow-md"
                    variants={itemVariants}
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <div className="bg-[#0A2463] p-2 rounded-full">
                        {item.icon}
                      </div>
                      <h3 className="font-bold text-[#0A2463]">{item.title}</h3>
                    </div>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Club Section */}
      <section
        ref={clubRef}
        className="relative py-24 bg-gray-50 overflow-hidden"
      >
        {/* Decorative elements */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={clubControls}
          variants={{
            visible: {
              scale: 1,
              opacity: 0.1,
              transition: { delay: 0.5, duration: 1 }
            }
          }}
          className="absolute bottom-20 right-10 w-64 h-64 border-2 border-[#0A2463] rounded-full z-0"
        />

        <div className="container px-6 mx-auto relative z-10">
          {/* Inauguration Highlight */}
          <motion.div
            initial="hidden"
            animate={clubControls}
            variants={containerVariants}
            className="text-center mb-20"
          >
            <motion.div
              className="flex items-center justify-center gap-4 mb-6"
              variants={itemVariants}
            >
              <Award className="h-8 w-8 text-[#FFC857]" />
              <h2 className="text-3xl md:text-4xl font-bold text-[#0A2463]">
                Our Inauguration
              </h2>
            </motion.div>

            <motion.p
              className="text-lg text-gray-600 max-w-4xl mx-auto"
              variants={itemVariants}
            >
              Inaugurated by the hands of honourable Deputy CM of Maharashtra, <span className="font-semibold text-[#0A2463]">Mr. Ajit (Dada) Pawar</span> on <span className="font-semibold">31st Jan 2020</span>, The SSK World Club opened its gates to Nashik City.
            </motion.p>
          </motion.div>

          {/* Main Content Grid */}
          <motion.div
            initial="hidden"
            animate={clubControls}
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10"
          >
            {/* Left Column - Image */}
            <motion.div
              className="relative h-96 rounded-xl overflow-hidden shadow-2xl z-10"
              variants={slideInFromLeft}
            >
              <img
                src={ssk_club}
                alt="SSK World Club aerial view"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2463]/80 via-transparent to-transparent" />
              <motion.div
                className="absolute bottom-6 left-6 text-white z-10"
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-5 w-5" />
                  <span>Pathardi, Nashik</span>
                </div>
                <p className="text-sm">10 acres of lush greenery</p>
              </motion.div>
            </motion.div>

            {/* Right Column - Content */}
            <motion.div
              className="flex flex-col justify-center relative z-10"
              variants={slideInFromRight}
            >
              {/* Club Description */}
              <motion.div
                className="mb-8"
                variants={containerVariants}
              >
                <motion.h3
                  className="text-2xl font-bold text-[#0A2463] mb-4"
                  variants={itemVariants}
                >
                  Maharashtra's Premier Sports Destination
                </motion.h3>
                <motion.p
                  className="text-gray-600 mb-4"
                  variants={itemVariants}
                >
                  Nestled in the peaceful tranquility of lush green Pathardi, overlooking the historical Pandav Leni, our 10-acre property offers:
                </motion.p>
                <motion.ul
                  className="space-y-3 mb-6"
                  variants={containerVariants}
                >
                  {[
                    "Plethora of world-class sports facilities",
                    "Five-star relaxation in luxurious surroundings",
                    "Wellness center, restaurant & mini theatre",
                    "Upcoming nightclub and banquet hall"
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start"
                      variants={itemVariants}
                      custom={index}
                    >
                      <div className="bg-[#FFC857] rounded-full p-1 mr-3 mt-1">
                        <ChevronRight className="h-3 w-3 text-[#0A2463]" />
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>

              {/* Safety & Features - Cards with shadow hover */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                variants={containerVariants}
              >
                <motion.div
                  className="bg-white p-6 rounded-xl shadow-sm relative z-20 transition-all duration-300 hover:shadow-lg"
                  variants={itemVariants}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="h-6 w-6 text-[#FFC857]" />
                    <h4 className="font-bold text-[#0A2463]">Safety First</h4>
                  </div>
                  <p className="text-gray-600 text-sm">
                    First Aid facilities at reception, fire protocols, and trained staff ready for emergencies. Your safety is our priority.
                  </p>
                </motion.div>

                <motion.div
                  className="bg-white p-6 rounded-xl shadow-sm relative z-20 transition-all duration-300 hover:shadow-lg"
                  variants={itemVariants}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="h-6 w-6 text-[#FFC857]" />
                    <h4 className="font-bold text-[#0A2463]">Club Timings</h4>
                  </div>
                  <ul className="text-gray-600 text-sm space-y-2">
                    <li>Sports: 7AM-12PM / 4PM-7PM</li>
                    <li>Wellness & Dining: 8AM-11PM</li>
                  </ul>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Club Rules CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={clubControls}
            variants={{
              visible: {
                opacity: 1,
                y: 0,
                transition: { delay: 0.6 }
              }
            }}
            className="text-center mt-16 relative z-10"
          >
            <motion.a
              href="/club-rules"
              className="inline-flex items-center border border-[#0A2463] text-[#0A2463] px-6 py-3 rounded-sm font-medium group relative z-20 transition-colors duration-300 hover:bg-[#0A2463] hover:text-white"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Review Full Club Guidelines
              <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Leadership Section */}
      <LeadershipSection />
    </div>
  );
};

// Leadership Component (paste this at the bottom of your file)
const LeadershipSection = () => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: true,
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

    const fadeInVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.8 }
        }
    };

    const leadershipTeam = [
        {
            name: "Mr. Shailesh Shrihari Kute",
            title: "Managing Director",
            image: leader3,
            bio: "Former Trustee for Shirdi Sai Baba Board with eight years of distinguished service. Political leader who has championed economic modernization.",
            roles: [
                "Youth Congress President for District",
                "District Congress President",
                "State Secretary for Congress",
                "Counselor"
            ],
            personal: [
                { icon: <HeartPulse className="h-4 w-4" />, text: "Believes a fit body is the best fashion statement" },
                { icon: <Utensils className="h-4 w-4" />, text: "Self-proclaimed foodie with a focus on flavorful, portion-controlled meals" }
            ]
        },
        {
            name: "Mr. Suraj Dhananjay Kute",
            title: "Operational Director",
            image: leader2,
            bio: "Diploma in Mechanical Engineering and Post Graduate Diploma in Business Management. Entrepreneur, motorsports champion, and active contributor to social and sporting communities.",
            roles: [
                "Founder Member of Patanjali Yogpeeth Haridwar",
                "Director at Jay Malhar Nagari Sahakari Patsanstha, Nasik",
                "Member of Nasik Automotive Sports Association"
            ],
            personal: [
                { icon: <Trophy className="h-4 w-4" />, text: "Multiple-time winner in national rallies and off-road racing events" },
                { icon: <Activity className="h-4 w-4" />, text: "Passionate basketball and skating enthusiast" }
            ]
        },
        {
            name: "Mr. Swapnil Dhananjay Kute",
            title: "Operational Director",
            image: founder,
            bio: "Bachelor's degree in Business Administration from London. A dynamic sports enthusiast with a love for both team and individual challenges.",
            roles: [
                "Alumnus of London-based Business Administration program"
            ],
            personal: [
                { icon: <Medal className="h-4 w-4" />, text: "Passionate football player with a competitive spirit" },
                { icon: <Waves className="h-4 w-4" />, text: "Enjoys swimming as a way to stay fit and focused" }
            ]
        }
    ];

    return (
        <section
            ref={ref}
            className="relative py-24 bg-white overflow-hidden"
            id="leadership"
        >
            {/* Decorative elements */}
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
                className="absolute top-20 right-10 w-64 h-64 border-2 border-[#FFC857] rounded-full z-0"
            />

            <div className="container px-6 mx-auto">
                {/* Section Header */}
                <motion.div
                    initial="hidden"
                    animate={controls}
                    variants={containerVariants}
                    className="text-center mb-16"
                >
                    <motion.h2
                        className="text-3xl md:text-4xl font-bold mb-4 text-[#0A2463]"
                        variants={itemVariants}
                    >
                        OUR LEADERSHIP
                    </motion.h2>
                    <motion.div
                        className="w-20 h-1 bg-[#FFC857] mx-auto mb-6"
                        variants={fadeInVariants}
                    />
                    <motion.p
                        className="text-lg text-gray-600 max-w-3xl mx-auto"
                        variants={itemVariants}
                    >
                        Visionary leaders combining sports excellence and community development
                    </motion.p>
                </motion.div>

                {/* Leadership Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {leadershipTeam.map((leader, index) => (
                        <motion.div
                            key={leader.name}
                            className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                            initial="hidden"
                            animate={controls}
                            variants={itemVariants}
                            custom={index}
                        >
                            {/* Leader Photo */}
                            <div className="relative h-64 w-full">
                                <img
                                    src={leader.image}
                                    alt={leader.name}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0A2463]/80 to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4">
                                    <div className="bg-[#FFC857] text-[#0A2463] px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider inline-block">
                                        {leader.title}
                                    </div>
                                </div>
                            </div>

                            {/* Leader Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-[#0A2463] mb-2">
                                    {leader.name}
                                </h3>

                                <p className="text-gray-600 mb-4 text-sm">
                                    {leader.bio}
                                </p>

                                {/* Professional Roles */}
                                <div className="mb-4">
                                    <h4 className="flex items-center gap-2 text-[#0A2463] font-medium mb-2 text-sm">
                                        <Briefcase className="h-4 w-4 text-[#FFC857]" />
                                        Key Positions:
                                    </h4>
                                    <ul className="space-y-2">
                                        {leader.roles.map((role, i) => (
                                            <li key={i} className="flex items-start">
                                                <div className="flex-shrink-0 mr-2 mt-0.5">
                                                    <div className="bg-[#0A2463] rounded-full p-1">
                                                        <Award className="h-3 w-3 text-[#FFC857]" />
                                                    </div>
                                                </div>
                                                <span className="text-gray-700 text-xs">{role}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Personal Insights */}
                                <div>
                                    <h4 className="flex items-center gap-2 text-[#0A2463] font-medium mb-2 text-sm">
                                        <Users className="h-4 w-4 text-[#FFC857]" />
                                        Personal:
                                    </h4>
                                    <div className="space-y-2">
                                        {leader.personal.map((item, i) => (
                                            <div key={i} className="flex items-start">
                                                <div className="flex-shrink-0 mr-2 mt-0.5">
                                                    <div className="bg-[#0A2463] text-[#FFC857] p-1 rounded-full">
                                                        {React.cloneElement(item.icon, { className: "h-3 w-3" })}
                                                    </div>
                                                </div>
                                                <span className="text-gray-700 text-xs">{item.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutUsPage;