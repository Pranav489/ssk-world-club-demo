import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { Activity, Brain, ChevronRight, Clock, Crosshair, Disc, Dumbbell, Eclipse, Leaf, Square, Table, Target, Trophy, Volleyball, Waves, ChevronDown, X } from "lucide-react";
import { badminton, basketball, carrom, chess, crossfit, fitness, green_sport_campus, net_cricket, shooting, skating, squash, swimming, table_tennis, tennis_league, tt_tournament } from "../../assets";

const SportsDetailPage = () => {
  const { category, sportSlug } = useParams();
   const [selectedImage, setSelectedImage] = useState(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const navigate = useNavigate();

  

  const sportsData = {
        indoor: [
            {
                name: 'Badminton',
                icon: <Trophy className="h-8 w-8 text-[#FFC857]" />,
                image: badminton,
                description: 'Professional-grade badminton courts with tournament-quality lighting and flooring.',
                extendedDescription: `The Badminton room is a must-see for sports enthusiasts. Boasting the tallest ceiling height in the entire club, players truly feel the space while enjoying the game. The 2 courts use premium Hevea wood flooring imported from Poland, ensuring excellent bounce and durability.`,
                features: [
                    '2 Hevea wooden courts',
                    'Tallest ceiling height in the club',
                    'Terrace with 180° views',
                    '36 lockers available'
                ],
                timing: '7am – 12noon / 4pm – 7pm',
                rules: 'Players must wear special non-marking/gumsole shoes during play and follow club rules.',
                requirements: [
                    'Non-marking/gumsole shoes mandatory',
                    'Proper sports attire required',
                    'Respect court booking times'
                ],
                equipment: 'Racquets, non-marking shoes, and shuttlecocks available on a chargeable basis.',
                events: 'The club organizes badminton tournaments for doctors and plans state-level competitions.'
            },
            {
                name: 'Carrom',
                icon: <Crosshair className="h-8 w-8 text-[#FFC857]" />,
                image: carrom,
                description: 'Premium carrom boards in our dedicated games lounge with professional equipment.',
                extendedDescription: `The Carrom Lounge offers a comfortable environment for both casual and competitive play. Equipped with tournament-standard boards, members can enjoy friendly matches or participate in organized events.`,
                features: [
                    '8 championship boards',
                    'Dedicated tournament space',
                    'Casual play areas',
                    'Equipment rental'
                ],
                timing: '9AM – 11PM',
                rules: 'Follow official carrom rules and club guidelines. No food or drinks on the tables.',
                requirements: [
                    'Use carrom powder provided by the club',
                    'Respect match schedules',
                    'Return borrowed equipment after use'
                ],
                equipment: 'Carrom coins, strikers, and powder available at the lounge.',
                events: 'Monthly carrom championships and inter-club competitions.'
            },
            {
                name: 'Chess',
                icon: <Brain className="h-8 w-8 text-[#FFC857]" />,
                image: chess,
                description: 'Quiet, focused environment for chess players of all levels, with regular competitions.',
                extendedDescription: `The Chess Room is designed for deep thinking and intense matches. Comfortable seating and tournament clocks ensure a professional playing experience.`,
                features: [
                    'Tournament boards',
                    'Digital timers',
                    'Weekly matches',
                    'Coaching sessions'
                ],
                timing: '9AM – 10PM',
                rules: 'Maintain silence during ongoing matches. No external distractions allowed.',
                requirements: [
                    'Respect the time controls',
                    'Follow FIDE rules',
                    'Proper conduct with opponents'
                ],
                equipment: 'High-quality chess boards, pieces, and clocks provided.',
                events: 'Weekly chess meet-ups, monthly rated tournaments, and simultaneous exhibitions.'
            },
            {
                name: 'Crossfit',
                icon: <Activity className="h-8 w-8 text-[#FFC857]" />,
                image: crossfit,
                description: 'High-intensity CrossFit zone with professional coaching and modern equipment.',
                extendedDescription: `The CrossFit Zone offers functional training rigs, Olympic weights, and a motivating environment for all fitness levels. Certified trainers lead both group and one-on-one sessions.`,
                features: [
                    'Functional training rigs',
                    'Olympic weightlifting gear',
                    'Group WODs',
                    'Personalized coaching'
                ],
                timing: '5AM – 10PM',
                rules: 'Follow trainer’s safety instructions at all times.',
                requirements: [
                    'Sports shoes and fitness attire',
                    'Hydration bottle',
                    'Warm-up before workouts'
                ],
                equipment: 'Kettlebells, barbells, ropes, and resistance bands provided.',
                events: 'Weekly CrossFit challenges and seasonal fitness bootcamps.'
            },
            {
                name: 'Gym',
                icon: <Dumbbell className="h-8 w-8 text-[#FFC857]" />,
                image: fitness,
                description: 'State-of-the-art fitness center with cutting-edge equipment and personal training.',
                extendedDescription: `Our gym features a spacious layout with dedicated zones for cardio, strength training, and functional fitness. Members can opt for personal trainers for customized programs.`,
                features: [
                    '5000 sq ft space',
                    'Cardio & strength zones',
                    'Personal trainers',
                    'Group classes'
                ],
                timing: '5AM – 11PM',
                rules: 'Wipe down equipment after use and re-rack weights.',
                requirements: [
                    'Sports shoes mandatory',
                    'Gym attire required',
                    'Follow equipment safety guidelines'
                ],
                equipment: 'Treadmills, dumbbells, machines, and free weights available.',
                events: 'Monthly fitness challenges and transformation programs.'
            },
            {
                name: 'Squash',
                icon: <Square className="h-8 w-8 text-[#FFC857]" />,
                image: squash,
                description: 'Glass-walled squash courts with professional-grade flooring and lighting.',
                extendedDescription: `Experience the thrill of fast-paced rallies on our premium squash courts. Climate control ensures comfort even during intense matches.`,
                features: [
                    '4 air-conditioned courts',
                    'Coaching available',
                    'Leagues & tournaments',
                    'Racket rental'
                ],
                timing: '6AM – 10PM',
                rules: 'Non-marking shoes required; follow official squash rules.',
                requirements: [
                    'Proper squash attire',
                    'Eye protection for juniors',
                    'Book courts in advance'
                ],
                equipment: 'Rackets and balls available on rent.',
                events: 'Annual squash championship and inter-club leagues.'
            },
            {
                name: 'Shooting',
                icon: <Target className="h-8 w-8 text-[#FFC857]" />,
                image: shooting,
                description: 'Indoor air rifle and pistol shooting range for beginners and professionals.',
                extendedDescription: `Our shooting range is equipped with 10m lanes, safety partitions, and precision scoring systems. Instructors provide training for all levels.`,
                features: [
                    '10m air rifle range',
                    'Certified instructors',
                    'Safety gear provided',
                    'Competition training'
                ],
                timing: '10AM – 8PM',
                rules: 'Strictly follow safety protocols and instructor guidance.',
                requirements: [
                    'Closed-toe shoes',
                    'No loose clothing',
                    'Sign safety waiver before practice'
                ],
                equipment: 'Air rifles, pistols, pellets, and safety gear available.',
                events: 'Annual shooting competition and skills workshops.'
            },
            {
                name: 'Table Tennis',
                icon: <Table className="h-8 w-8 text-[#FFC857]" />,
                image: tt_tournament,
                description: 'Multiple indoor table tennis setups with pro-grade tables and accessories.',
                extendedDescription: `Our table tennis facility is perfect for both casual rallies and high-level matches, featuring international-standard tables and lighting.`,
                features: [
                    '6 competition tables',
                    'Coaching programs',
                    'Friendly matches',
                    'Club tournaments'
                ],
                timing: '8AM – 10PM',
                rules: 'Follow official ITTF rules during matches.',
                requirements: [
                    'Sports shoes with non-marking soles',
                    'Use club-provided balls for tournaments',
                    'Respect booking slots'
                ],
                equipment: 'Table tennis bats and balls available for rent.',
                events: 'Weekly club ladder matches and inter-club championships.'
            }
        ],

        outdoor: [
            {
                name: 'Basketball',
                icon: <Volleyball className="h-8 w-8 text-[#FFC857]" />,
                image: basketball,
                description: 'Full-sized basketball courts with evening floodlights for extended play.',
                extendedDescription: `Our outdoor courts are built to professional standards with durable surfaces and bright floodlights, enabling games well into the evening.`,
                features: [
                    '2 outdoor courts',
                    'Night lighting',
                    'Coaching for kids & adults',
                    'Weekend leagues'
                ],
                timing: '6AM – 9PM',
                rules: 'Sports shoes required; avoid hanging on rims.',
                requirements: [
                    'Proper basketball attire',
                    'Respect game rotation',
                    'No food or drinks on the court'
                ],
                equipment: 'Basketballs available at the sports desk.',
                events: 'Weekend league matches and annual basketball tournaments.'
            },
            {
                name: 'Green Campus',
                icon: <Leaf className="h-8 w-8 text-[#FFC857]" />,
                image: green_sport_campus,
                description: 'Beautifully landscaped green campus for walking, jogging, and outdoor relaxation.',
                extendedDescription: `A lush green expanse perfect for morning walks, yoga sessions, or simply relaxing in nature. Designed to promote eco-friendly living.`,
                features: [
                    'Walking tracks',
                    'Picnic spots',
                    'Outdoor yoga areas',
                    'Eco-friendly design'
                ],
                timing: '5AM – 9PM',
                rules: 'Help maintain cleanliness; no littering.',
                requirements: [
                    'Wear comfortable walking shoes',
                    'No loud music',
                    'Respect nature and other visitors'
                ],
                equipment: 'Yoga mats available on request.',
                events: 'Weekend yoga sessions and eco-awareness walks.'
            },
            {
                name: 'Net Cricket',
                icon: <Eclipse className="h-8 w-8 text-[#FFC857]" />,
                image: net_cricket,
                description: 'Practice cricket nets with turf pitches for batting and bowling practice.',
                extendedDescription: `Our cricket nets feature high-quality turf pitches and netting, perfect for improving batting and bowling skills.`,
                features: [
                    '4 net lanes',
                    'Bowling machine',
                    'Coaching available',
                    'Floodlit for night practice'
                ],
                timing: '6AM – 9PM',
                rules: 'Wear protective gear during batting practice.',
                requirements: [
                    'Sports shoes',
                    'Cricket attire',
                    'Follow coach’s safety instructions'
                ],
                equipment: 'Bats, balls, and pads available for rent.',
                events: 'Club cricket league and practice matches.'
            },
            {
                name: 'Skating',
                icon: <Disc className="h-8 w-8 text-[#FFC857]" />,
                image: skating,
                description: 'Smooth-surfaced skating rink for beginners and advanced skaters.',
                extendedDescription: `Our skating rink offers a safe and smooth surface for all levels, with coaches available for lessons.`,
                features: [
                    'Protective gear rental',
                    'Inline & quad skating',
                    'Coaching sessions',
                    'Weekend competitions'
                ],
                timing: '6AM – 8PM',
                rules: 'Protective gear must be worn at all times.',
                requirements: [
                    'Skates (own or rented)',
                    'Helmet, knee and elbow guards',
                    'Follow instructor’s guidelines'
                ],
                equipment: 'Skates and safety gear available for hire.',
                events: 'Annual skating championship and fun races.'
            },
            {
                name: 'Swimming',
                icon: <Waves className="h-8 w-8 text-[#FFC857]" />,
                image: swimming,
                description: 'Olympic-sized 50m pool with dedicated lanes and professional coaching staff.',
                extendedDescription: `Our swimming pool meets international dimensions and includes temperature control, making it ideal year-round.`,
                features: [
                    'Heated pool',
                    'Diving area',
                    'Swim lessons',
                    'Aqua aerobics'
                ],
                timing: '6AM – 8PM',
                rules: 'Swim cap required; shower before entering pool.',
                requirements: [
                    'Proper swimwear',
                    'Towel and cap',
                    'Follow lifeguard instructions'
                ],
                equipment: 'Kickboards, pull buoys, and fins available.',
                events: 'Swim meets, aqua fitness sessions, and diving workshops.'
            },
            {
                name: 'Tennis',
                icon: <Trophy className="h-8 w-8 text-[#FFC857]" />,
                image: tennis_league,
                description: 'Championship tennis courts with professional coaching and tournament facilities.',
                extendedDescription: `Our tennis facility includes both clay and hard courts maintained to professional standards, suitable for all levels.`,
                features: [
                    '6 clay courts',
                    '6 hard courts',
                    'Ball machines',
                    'Junior programs'
                ],
                timing: '6AM – 9PM',
                rules: 'Non-marking tennis shoes required.',
                requirements: [
                    'Tennis attire',
                    'Bring own racket or rent from club',
                    'Respect court booking times'
                ],
                equipment: 'Rackets, balls, and grips available for rent.',
                events: 'Club championships, coaching camps, and junior tournaments.'
            }
        ]
    };

    

  // Find the sport by slug
  const sport = sportsData[category]?.find(s => 
    s.name.toLowerCase().replace(/\s+/g, '-') === sportSlug
  );

  const getAdditionalImages = (sportName) => {
  switch(sportName.toLowerCase()) {
    case 'badminton':
      return [badminton, tt_tournament, fitness]; // Replace with actual badminton images
    case 'basketball':
      return [basketball, green_sport_campus, tennis_league];
    case 'carrom':
      return [carrom, chess, shooting];
    case 'chess':
      return [chess, carrom, table_tennis];
    case 'crossfit':
      return [crossfit, fitness, swimming];
    case 'gym':
      return [fitness, crossfit, squash];
    case 'squash':
      return [squash, tennis_league, badminton];
    case 'shooting':
      return [shooting, chess, carrom];
    case 'table tennis':
      return [table_tennis, tt_tournament, badminton];
    case 'net cricket':
      return [net_cricket, basketball, green_sport_campus];
    case 'skating':
      return [skating, swimming, tennis_league];
    case 'swimming':
      return [swimming, skating, green_sport_campus];
    case 'tennis':
      return [tennis_league, squash, badminton];
    case 'green campus':
      return [green_sport_campus, net_cricket, basketball];
    default:
      return [sport.image, fitness, tennis_league]; // fallback with different images
  }
};

  const additionalImages = getAdditionalImages(sport.name).filter(Boolean);


  if (!sport) {
    return <div className="min-h-screen flex items-center justify-center">Sport not found</div>;
  }

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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
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

  const slideUp = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  // Animation variants
  const galleryItem = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.3
      }
    }
  };

  const openImage = (index) => {
    setSelectedImage(additionalImages[index]);
    setGalleryIndex(index);
  };

  const navigateGallery = (direction) => {
    let newIndex;
    if (direction === 'next') {
      newIndex = (galleryIndex + 1) % additionalImages.length;
    } else {
      newIndex = (galleryIndex - 1 + additionalImages.length) % additionalImages.length;
    }
    setSelectedImage(additionalImages[newIndex]);
    setGalleryIndex(newIndex);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full overflow-hidden bg-black">
        {/* Background Image with Overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={sport.image}
            alt={sport.name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: 1,
            opacity: 0.2,
            transition: { delay: 0.5, duration: 1 }
          }}
          className="absolute top-1/4 right-10 w-32 h-32 border-2 border-[#FFC857] rounded-full"
        />
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: 1,
            opacity: 0.15,
            transition: { delay: 0.7, duration: 1 }
          }}
          className="absolute bottom-1/3 left-8 w-16 h-16 border border-[#FFC857] rounded-full"
        />

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-end pb-20">
          <div className="container mx-auto px-6">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="max-w-3xl"
            >
              {/* Sport Name */}
              <motion.h1 
                variants={itemVariants}
                className="text-4xl md:text-6xl font-bold text-white mb-4"
              >
                {sport.name} <span className="text-[#FFC857]">Facilities</span>
              </motion.h1>
              
              {/* Timing Badge */}
              <motion.div 
                variants={itemVariants}
                className="inline-flex items-center bg-[#FFC857] text-[#0A2463] px-4 py-2 rounded-full mb-6"
              >
                <Clock className="h-4 w-4 mr-2" />
                <span className="font-medium">{sport.timing}</span>
              </motion.div>
              
              {/* Short Description */}
              <motion.p 
                variants={itemVariants}
                className="text-xl text-white/90 mb-8"
              >
                {sport.description}
              </motion.p>
              
              {/* Action Buttons */}
              <motion.div 
                variants={containerVariants}
                className="flex flex-wrap gap-4"
              >
                <motion.button
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 8px 20px rgba(255, 200, 87, 0.4)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-[#FFC857] text-[#0A2463] px-6 py-3 rounded-sm font-bold flex items-center gap-2"
                  onClick={() => navigate('/contact')}
                >
                  Book Facility
                  <ChevronRight className="h-5 w-5" />
                </motion.button>
                
                <motion.button
                  variants={itemVariants}
                  whileHover={{ 
                    backgroundColor: "rgba(255,255,255,0.1)",
                    scale: 1.02
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="border-2 border-white text-white px-6 py-3 rounded-sm font-bold flex items-center gap-2"
                  onClick={() => navigate('/gallery')}
                >
                  View Gallery
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          // animate={{
          //   y: [0, 10, 0],
          // }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="h-8 w-8 text-white" />
        </motion.div>
      </section>

      {/* Main Content Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        className="container mx-auto px-6 py-12"
      >
        <motion.div 
          className="bg-white rounded-xl shadow-xl overflow-hidden"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {/* Sport Detail */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Image Column */}
            <motion.div 
              className="lg:order-1 space-y-4"
              variants={itemVariants}
            >
              <motion.div 
                className="relative rounded-lg overflow-hidden shadow-md cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                onClick={() => openImage(0)}
              >
                <img
                  src={sport.image}
                  alt={sport.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent flex items-end p-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white">{sport.name}</h2>
                    <p className="text-[#FFC857]">{sport.timing}</p>
                  </div>
                 
                </div>
              </motion.div>

              {/* Additional Images Gallery */}
<motion.div 
  className="grid grid-cols-3 gap-3 mt-4"
  variants={fadeIn}
>
  {additionalImages.slice(0, 3).map((img, index) => (
    img && ( // Add null check
      <motion.div
        key={index}
        className="aspect-square rounded-md overflow-hidden relative cursor-pointer"
        variants={galleryItem}
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.05 }}
        onClick={() => openImage(index)}
      >
        <img
          src={img}
          alt={`${sport.name} ${index + 1}`}
          className="w-full h-full object-cover"
        />
        {index === 2 && additionalImages.length > 3 && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="text-white font-bold text-lg">
              +{additionalImages.length - 3}
            </span>
          </div>
        )}
      </motion.div>
    )
  ))}
</motion.div>
            </motion.div>

            {/* Content Column */}
            <motion.div 
              className="lg:order-2 space-y-6"
              variants={itemVariants}
            >
              <motion.div 
                className="flex items-center gap-4"
                variants={slideUp}
              >
                {sport.icon}
                <h2 className="text-2xl font-bold text-[#0A2463]">{sport.name} Facilities</h2>
              </motion.div>
              
              {/* Description Section */}
              <motion.div 
                className="prose max-w-none"
                variants={fadeIn}
              >
                <p className="text-gray-700">
                  {sport.extendedDescription}
                </p>
              </motion.div>
              
              {/* Key Features */}
              <motion.div
                className="bg-[#F8F9FA] p-5 rounded-lg border border-[#E9ECEF]"
                variants={slideUp}
                // whileHover={{ y: -5 }}
              >
                <h3 className="text-lg font-semibold text-[#0A2463] mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#FFC857] rounded-full"></div>
                  Facility Specifications
                </h3>
                <ul className="space-y-3">
                  {sport.features.map((feature, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-start"
                      whileHover={{ x: 5 }}
                    >
                      <div className="bg-[#FFC857] rounded-full p-1 mr-3 mt-1">
                        <ChevronRight className="h-3 w-3 text-[#0A2463]" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              
              {/* Detailed Information Sections */}
              <motion.div 
                className="space-y-6"
                variants={containerVariants}
              >
                {/* Rules & Requirements */}
                <motion.div variants={itemVariants}>
                  <h3 className="text-lg font-semibold text-[#0A2463] mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#FFC857] rounded-full"></div>
                    Rules & Requirements
                  </h3>
                  <div className="prose max-w-none text-gray-700">
                    <p>{sport.rules}</p>
                    <ul className="mt-2 space-y-1">
                      {sport.requirements.map((item, i) => (
                        <motion.li 
                          key={i} 
                          className="flex items-start"
                          whileHover={{ x: 3 }}
                        >
                          <span className="mr-2">•</span>
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
                
                {/* Equipment Provision */}
                <motion.div variants={itemVariants}>
                  <h3 className="text-lg font-semibold text-[#0A2463] mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#FFC857] rounded-full"></div>
                    Equipment & Services
                  </h3>
                  <div className="prose max-w-none text-gray-700">
                    <p>{sport.equipment}</p>
                  </div>
                </motion.div>
                
                {/* Events & Tournaments */}
                <motion.div variants={itemVariants}>
                  <h3 className="text-lg font-semibold text-[#0A2463] mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#FFC857] rounded-full"></div>
                    Events & Tournaments
                  </h3>
                  <div className="prose max-w-none text-gray-700">
                    <p>{sport.events}</p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button 
              className="absolute top-6 right-6 text-white z-50"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-8 w-8" />
            </button>

            <motion.div
              className="relative max-w-4xl w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <img
                src={selectedImage}
                alt={sport.name}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />

              {/* Navigation Arrows - Only show if more than one image */}
{additionalImages.length > 1 && (
  <>
    <button
      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-[#FFC857] hover:text-[#0A2463] transition-all"
      onClick={() => navigateGallery('prev')}
    >
      <ChevronRight className="h-6 w-6 rotate-180" />
    </button>
    <button
      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-[#FFC857] hover:text-[#0A2463] transition-all"
      onClick={() => navigateGallery('next')}
    >
      <ChevronRight className="h-6 w-6" />
    </button>
  </>
)}

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {galleryIndex + 1} / {additionalImages.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default SportsDetailPage;