import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import axiosInstance from '../../services/api';
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
    SquareDashedBottom
} from 'lucide-react';
// import { badminton, basketball, carrom, chess, crossfit, fitness, green_sport_campus, hero_home, net_cricket, shooting, skating, squash, ssk_club, swimming, table_tennis, tennis_league, volleyball } from '../../assets';
import { useNavigate } from 'react-router';

const SportsPage = () => {
    const [sportsFacilitiesHero, setSportsFacilitiesHero] = useState([]);
    const [sportsData, setSportsData] = useState({ indoor: [], outdoor: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // Hero section controls
    const controls = useAnimation();
    const [ref, inView] = useInView({ threshold: 0.4 });
    const [activeSlide, setActiveSlide] = useState(0);

    // Sports listing controls
    const [activeCategory, setActiveCategory] = useState('indoor');
    const navigate = useNavigate();

    // Icon mapping function
    const getSportIcon = (iconName, props = { className:"h-8 w-8 text-[#FFC857]"}) => {
        const iconMap = {
            brain: Brain,
            activity: Activity,
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
            // Add other icon mappings as needed
        };

        const IconComponent = iconMap[iconName?.toLowerCase()] || Trophy;
        return <IconComponent {...props} />;
    };

    // Fetch data on component mount
    useEffect(() => {
    fetchSportsData();
}, []);

// Fetch all sports data
const fetchSportsData = async () => {
    try {
        setLoading(true);

        // Fetch hero slider data and sports data in parallel
        const [heroResponse, sportsResponse] = await Promise.all([
            axiosInstance.get("/sports-facilities-hero"),
            axiosInstance.get("/sports"),
        ]);

        setSportsFacilitiesHero(heroResponse.data);
        setSportsData(sportsResponse.data);
        setError(null);
    } catch (err) {
        console.error("Error fetching sports data:", err);
        setError("Failed to load sports data. Please try again later.");

        // Fallback to empty data to prevent crashes
        setSportsFacilitiesHero([]);
        setSportsData({ indoor: [], outdoor: [] });
    } finally {
        setLoading(false);
    }
};

    // Handle sport click navigation
    const handleSportClick = (sport) => {
        navigate(`/sports/${sport.category}/${sport.slug}`);
    };

    // const sportsFacilitiesHero = [
    //     {
    //         title: "Professional Basketball Court",
    //         image: basketball,
    //         stats: "FIBA-Standard Indoor & Outdoor Courts"
    //     },
    //     {
    //         title: "Eco-Friendly Green Campus",
    //         image: green_sport_campus,
    //         stats: "Lush Landscaped Spaces & Sustainability Initiatives"
    //     },
    //     {
    //         title: "Net Cricket Practice Zone",
    //         image: net_cricket,
    //         stats: "6 Nets with Turf & Bowling Machines"
    //     },
    //     {
    //         title: "Skating Rink",
    //         image: skating,
    //         stats: "Smooth Track for Artistic & Speed Skating"
    //     },
    //     {
    //         title: "Olympic Swimming Pool",
    //         image: swimming,
    //         stats: "50m Heated Pool with Diving Platforms"
    //     },
    //     {
    //         title: "Championship Tennis Courts",
    //         image: tennis_league,
    //         stats: "12 Clay & Hard Courts"
    //     },
    //     {
    //         title: "Beach & Indoor Volleyball Courts",
    //         image: volleyball,
    //         stats: "Professional Sand & Wooden Surfaces"
    //     }
    // ];

    // const sportsData = {
    //     indoor: [
    //         {
    //             name: 'Badminton',
    //             icon: <Trophy className="h-8 w-8 text-[#FFC857]" />,
    //             image: badminton,
    //             description: 'Professional-grade badminton courts with tournament-quality lighting and flooring.',
    //             extendedDescription: `The Badminton room is a must-see for sports enthusiasts. Boasting the tallest ceiling height in the entire club, players truly feel the space while enjoying the game. The 2 courts use premium Hevea wood flooring imported from Poland, ensuring excellent bounce and durability.`,
    //             features: [
    //                 '2 Hevea wooden courts',
    //                 'Tallest ceiling height in the club',
    //                 'Terrace with 180° views',
    //                 '36 lockers available'
    //             ],
    //             timing: '7am – 12noon / 4pm – 7pm',
    //             rules: 'Players must wear special non-marking/gumsole shoes during play and follow club rules.',
    //             requirements: [
    //                 'Non-marking/gumsole shoes mandatory',
    //                 'Proper sports attire required',
    //                 'Respect court booking times'
    //             ],
    //             equipment: 'Racquets, non-marking shoes, and shuttlecocks available on a chargeable basis.',
    //             events: 'The club organizes badminton tournaments for doctors and plans state-level competitions.'
    //         },
    //         {
    //             name: 'Carrom',
    //             icon: <Crosshair className="h-8 w-8 text-[#FFC857]" />,
    //             image: carrom,
    //             description: 'Premium carrom boards in our dedicated games lounge with professional equipment.',
    //             extendedDescription: `The Carrom Lounge offers a comfortable environment for both casual and competitive play. Equipped with tournament-standard boards, members can enjoy friendly matches or participate in organized events.`,
    //             features: [
    //                 '8 championship boards',
    //                 'Dedicated tournament space',
    //                 'Casual play areas',
    //                 'Equipment rental'
    //             ],
    //             timing: '9AM – 11PM',
    //             rules: 'Follow official carrom rules and club guidelines. No food or drinks on the tables.',
    //             requirements: [
    //                 'Use carrom powder provided by the club',
    //                 'Respect match schedules',
    //                 'Return borrowed equipment after use'
    //             ],
    //             equipment: 'Carrom coins, strikers, and powder available at the lounge.',
    //             events: 'Monthly carrom championships and inter-club competitions.'
    //         },
    //         {
    //             name: 'Chess',
    //             icon: <Brain className="h-8 w-8 text-[#FFC857]" />,
    //             image: chess,
    //             description: 'Quiet, focused environment for chess players of all levels, with regular competitions.',
    //             extendedDescription: `The Chess Room is designed for deep thinking and intense matches. Comfortable seating and tournament clocks ensure a professional playing experience.`,
    //             features: [
    //                 'Tournament boards',
    //                 'Digital timers',
    //                 'Weekly matches',
    //                 'Coaching sessions'
    //             ],
    //             timing: '9AM – 10PM',
    //             rules: 'Maintain silence during ongoing matches. No external distractions allowed.',
    //             requirements: [
    //                 'Respect the time controls',
    //                 'Follow FIDE rules',
    //                 'Proper conduct with opponents'
    //             ],
    //             equipment: 'High-quality chess boards, pieces, and clocks provided.',
    //             events: 'Weekly chess meet-ups, monthly rated tournaments, and simultaneous exhibitions.'
    //         },
    //         {
    //             name: 'Crossfit',
    //             icon: <Activity className="h-8 w-8 text-[#FFC857]" />,
    //             image: crossfit,
    //             description: 'High-intensity CrossFit zone with professional coaching and modern equipment.',
    //             extendedDescription: `The CrossFit Zone offers functional training rigs, Olympic weights, and a motivating environment for all fitness levels. Certified trainers lead both group and one-on-one sessions.`,
    //             features: [
    //                 'Functional training rigs',
    //                 'Olympic weightlifting gear',
    //                 'Group WODs',
    //                 'Personalized coaching'
    //             ],
    //             timing: '5AM – 10PM',
    //             rules: 'Follow trainer’s safety instructions at all times.',
    //             requirements: [
    //                 'Sports shoes and fitness attire',
    //                 'Hydration bottle',
    //                 'Warm-up before workouts'
    //             ],
    //             equipment: 'Kettlebells, barbells, ropes, and resistance bands provided.',
    //             events: 'Weekly CrossFit challenges and seasonal fitness bootcamps.'
    //         },
    //         {
    //             name: 'Gym',
    //             icon: <Dumbbell className="h-8 w-8 text-[#FFC857]" />,
    //             image: fitness,
    //             description: 'State-of-the-art fitness center with cutting-edge equipment and personal training.',
    //             extendedDescription: `Our gym features a spacious layout with dedicated zones for cardio, strength training, and functional fitness. Members can opt for personal trainers for customized programs.`,
    //             features: [
    //                 '5000 sq ft space',
    //                 'Cardio & strength zones',
    //                 'Personal trainers',
    //                 'Group classes'
    //             ],
    //             timing: '5AM – 11PM',
    //             rules: 'Wipe down equipment after use and re-rack weights.',
    //             requirements: [
    //                 'Sports shoes mandatory',
    //                 'Gym attire required',
    //                 'Follow equipment safety guidelines'
    //             ],
    //             equipment: 'Treadmills, dumbbells, machines, and free weights available.',
    //             events: 'Monthly fitness challenges and transformation programs.'
    //         },
    //         {
    //             name: 'Squash',
    //             icon: <Square className="h-8 w-8 text-[#FFC857]" />,
    //             image: squash,
    //             description: 'Glass-walled squash courts with professional-grade flooring and lighting.',
    //             extendedDescription: `Experience the thrill of fast-paced rallies on our premium squash courts. Climate control ensures comfort even during intense matches.`,
    //             features: [
    //                 '4 air-conditioned courts',
    //                 'Coaching available',
    //                 'Leagues & tournaments',
    //                 'Racket rental'
    //             ],
    //             timing: '6AM – 10PM',
    //             rules: 'Non-marking shoes required; follow official squash rules.',
    //             requirements: [
    //                 'Proper squash attire',
    //                 'Eye protection for juniors',
    //                 'Book courts in advance'
    //             ],
    //             equipment: 'Rackets and balls available on rent.',
    //             events: 'Annual squash championship and inter-club leagues.'
    //         },
    //         {
    //             name: 'Shooting',
    //             icon: <Target className="h-8 w-8 text-[#FFC857]" />,
    //             image: shooting,
    //             description: 'Indoor air rifle and pistol shooting range for beginners and professionals.',
    //             extendedDescription: `Our shooting range is equipped with 10m lanes, safety partitions, and precision scoring systems. Instructors provide training for all levels.`,
    //             features: [
    //                 '10m air rifle range',
    //                 'Certified instructors',
    //                 'Safety gear provided',
    //                 'Competition training'
    //             ],
    //             timing: '10AM – 8PM',
    //             rules: 'Strictly follow safety protocols and instructor guidance.',
    //             requirements: [
    //                 'Closed-toe shoes',
    //                 'No loose clothing',
    //                 'Sign safety waiver before practice'
    //             ],
    //             equipment: 'Air rifles, pistols, pellets, and safety gear available.',
    //             events: 'Annual shooting competition and skills workshops.'
    //         },
    //         {
    //             name: 'Table Tennis',
    //             icon: <Table className="h-8 w-8 text-[#FFC857]" />,
    //             image: table_tennis,
    //             description: 'Multiple indoor table tennis setups with pro-grade tables and accessories.',
    //             extendedDescription: `Our table tennis facility is perfect for both casual rallies and high-level matches, featuring international-standard tables and lighting.`,
    //             features: [
    //                 '6 competition tables',
    //                 'Coaching programs',
    //                 'Friendly matches',
    //                 'Club tournaments'
    //             ],
    //             timing: '8AM – 10PM',
    //             rules: 'Follow official ITTF rules during matches.',
    //             requirements: [
    //                 'Sports shoes with non-marking soles',
    //                 'Use club-provided balls for tournaments',
    //                 'Respect booking slots'
    //             ],
    //             equipment: 'Table tennis bats and balls available for rent.',
    //             events: 'Weekly club ladder matches and inter-club championships.'
    //         }
    //     ],

    //     outdoor: [
    //         {
    //             name: 'Basketball',
    //             icon: <Volleyball className="h-8 w-8 text-[#FFC857]" />,
    //             image: basketball,
    //             description: 'Full-sized basketball courts with evening floodlights for extended play.',
    //             extendedDescription: `Our outdoor courts are built to professional standards with durable surfaces and bright floodlights, enabling games well into the evening.`,
    //             features: [
    //                 '2 outdoor courts',
    //                 'Night lighting',
    //                 'Coaching for kids & adults',
    //                 'Weekend leagues'
    //             ],
    //             timing: '6AM – 9PM',
    //             rules: 'Sports shoes required; avoid hanging on rims.',
    //             requirements: [
    //                 'Proper basketball attire',
    //                 'Respect game rotation',
    //                 'No food or drinks on the court'
    //             ],
    //             equipment: 'Basketballs available at the sports desk.',
    //             events: 'Weekend league matches and annual basketball tournaments.'
    //         },
    //         {
    //             name: 'Green Campus',
    //             icon: <Leaf className="h-8 w-8 text-[#FFC857]" />,
    //             image: green_sport_campus,
    //             description: 'Beautifully landscaped green campus for walking, jogging, and outdoor relaxation.',
    //             extendedDescription: `A lush green expanse perfect for morning walks, yoga sessions, or simply relaxing in nature. Designed to promote eco-friendly living.`,
    //             features: [
    //                 'Walking tracks',
    //                 'Picnic spots',
    //                 'Outdoor yoga areas',
    //                 'Eco-friendly design'
    //             ],
    //             timing: '5AM – 9PM',
    //             rules: 'Help maintain cleanliness; no littering.',
    //             requirements: [
    //                 'Wear comfortable walking shoes',
    //                 'No loud music',
    //                 'Respect nature and other visitors'
    //             ],
    //             equipment: 'Yoga mats available on request.',
    //             events: 'Weekend yoga sessions and eco-awareness walks.'
    //         },
    //         {
    //             name: 'Net Cricket',
    //             icon: <Eclipse className="h-8 w-8 text-[#FFC857]" />,
    //             image: net_cricket,
    //             description: 'Practice cricket nets with turf pitches for batting and bowling practice.',
    //             extendedDescription: `Our cricket nets feature high-quality turf pitches and netting, perfect for improving batting and bowling skills.`,
    //             features: [
    //                 '4 net lanes',
    //                 'Bowling machine',
    //                 'Coaching available',
    //                 'Floodlit for night practice'
    //             ],
    //             timing: '6AM – 9PM',
    //             rules: 'Wear protective gear during batting practice.',
    //             requirements: [
    //                 'Sports shoes',
    //                 'Cricket attire',
    //                 'Follow coach’s safety instructions'
    //             ],
    //             equipment: 'Bats, balls, and pads available for rent.',
    //             events: 'Club cricket league and practice matches.'
    //         },
    //         {
    //             name: 'Skating',
    //             icon: <Disc className="h-8 w-8 text-[#FFC857]" />,
    //             image: skating,
    //             description: 'Smooth-surfaced skating rink for beginners and advanced skaters.',
    //             extendedDescription: `Our skating rink offers a safe and smooth surface for all levels, with coaches available for lessons.`,
    //             features: [
    //                 'Protective gear rental',
    //                 'Inline & quad skating',
    //                 'Coaching sessions',
    //                 'Weekend competitions'
    //             ],
    //             timing: '6AM – 8PM',
    //             rules: 'Protective gear must be worn at all times.',
    //             requirements: [
    //                 'Skates (own or rented)',
    //                 'Helmet, knee and elbow guards',
    //                 'Follow instructor’s guidelines'
    //             ],
    //             equipment: 'Skates and safety gear available for hire.',
    //             events: 'Annual skating championship and fun races.'
    //         },
    //         {
    //             name: 'Swimming',
    //             icon: <Waves className="h-8 w-8 text-[#FFC857]" />,
    //             image: swimming,
    //             description: 'Olympic-sized 50m pool with dedicated lanes and professional coaching staff.',
    //             extendedDescription: `Our swimming pool meets international dimensions and includes temperature control, making it ideal year-round.`,
    //             features: [
    //                 'Heated pool',
    //                 'Diving area',
    //                 'Swim lessons',
    //                 'Aqua aerobics'
    //             ],
    //             timing: '6AM – 8PM',
    //             rules: 'Swim cap required; shower before entering pool.',
    //             requirements: [
    //                 'Proper swimwear',
    //                 'Towel and cap',
    //                 'Follow lifeguard instructions'
    //             ],
    //             equipment: 'Kickboards, pull buoys, and fins available.',
    //             events: 'Swim meets, aqua fitness sessions, and diving workshops.'
    //         },
    //         {
    //             name: 'Tennis',
    //             icon: <Trophy className="h-8 w-8 text-[#FFC857]" />,
    //             image: tennis_league,
    //             description: 'Championship tennis courts with professional coaching and tournament facilities.',
    //             extendedDescription: `Our tennis facility includes both clay and hard courts maintained to professional standards, suitable for all levels.`,
    //             features: [
    //                 '6 clay courts',
    //                 '6 hard courts',
    //                 'Ball machines',
    //                 'Junior programs'
    //             ],
    //             timing: '6AM – 9PM',
    //             rules: 'Non-marking tennis shoes required.',
    //             requirements: [
    //                 'Tennis attire',
    //                 'Bring own racket or rent from club',
    //                 'Respect court booking times'
    //             ],
    //             equipment: 'Rackets, balls, and grips available for rent.',
    //             events: 'Club championships, coaching camps, and junior tournaments.'
    //         }
    //     ]
    // };

    // Hero section animations
    useEffect(() => {
        if (inView && sportsFacilitiesHero.length > 0) {
            controls.start("visible");
            const interval = setInterval(() => {
                setActiveSlide((prev) => (prev + 1) % sportsFacilitiesHero.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [controls, inView, sportsFacilitiesHero]);


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

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFC857] mx-auto mb-4"></div>
                    <p className="text-[#0A2463] font-medium">Loading sports facilities...</p>
                </div>
            </div>
        );
    }

    // Error state
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
                        onClick={fetchSportsData}
                        className="bg-[#FFC857] text-[#0A2463] px-6 py-2 rounded-md font-medium hover:bg-amber-400 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section ref={ref} className="relative h-screen w-full overflow-hidden bg-black">
                {/* Show placeholder if no hero images */}
                {sportsFacilitiesHero.length === 0 ? (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0A2463] to-[#2E4052] flex items-center justify-center">
                        <div className="text-center text-white">
                            <h2 className="text-4xl font-bold mb-4">Sports Facilities</h2>
                            <p className="text-xl">World-class athletic amenities</p>
                        </div>
                    </div>
                ) : (
                    <>


                        {/* Sliding Background Images */}
                        <div className="absolute inset-0 flex">
                            {sportsFacilitiesHero.map((facility, index) => (
                                <motion.div
                                    key={index}
                                    className={`h-full relative overflow-hidden transition-all duration-1000 ${index === activeSlide ? 'w-full' : 'w-0'
                                        }`}
                                    initial={{ opacity: 0 }}
                                    animate={{
                                        opacity: index === activeSlide ? 1 : 0,
                                        zIndex: index === activeSlide ? 10 : 1
                                    }}
                                    transition={{ duration: 1.5 }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />
                                    <img
                                        src={facility.image}
                                        alt={facility.title}
                                        className="w-full h-full object-cover"
                                    />
                                </motion.div>
                            ))}
                        </div>

                        {/* Content */}
                        <motion.div
                            initial="hidden"
                            animate={controls}
                            variants={containerVariants}
                            className="relative z-20 h-full flex items-center justify-center text-white px-6"
                        >
                            <div className="max-w-4xl mx-auto text-center">
                                {/* Sports Club Tag */}
                                <motion.div
                                    variants={itemVariants}
                                    className="inline-block border-2 border-[#FFC857] text-[#FFC857] px-6 py-1 rounded-full mb-8 font-bold uppercase tracking-wider text-sm"
                                >
                                    PREMIUM SPORTS CLUB
                                </motion.div>

                                {/* Main Heading */}
                                <motion.h1
                                    className="text-4xl md:text-6xl font-bold mb-6"
                                    variants={itemVariants}
                                >
                                    <span className="block">EXPERIENCE</span>
                                    <span className="block text-[#FFC857]">CHAMPION-CLASS FACILITIES</span>
                                </motion.h1>


                                {/* Current Facility Highlight */}
                                <motion.div
                                    className="mb-10"
                                    variants={itemVariants}
                                >
                                    <h3 className="text-xl md:text-2xl font-medium mb-2">
                                        {sportsFacilitiesHero[activeSlide].title}
                                    </h3>
                                    <p className="text-[#FFC857] font-medium">
                                        {sportsFacilitiesHero[activeSlide].stats}
                                    </p>
                                </motion.div>


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
                                        onClick={() => navigate('/membership')}
                                    >
                                        Explore Our Plans
                                        <ChevronRight className="h-5 w-5" />
                                    </motion.button>

                                    <motion.button
                                        variants={itemVariants}
                                        whileHover={{
                                            backgroundColor: "rgba(255,255,255,0.1)",
                                            scale: 1.02
                                        }}
                                        whileTap={{ scale: 0.98 }}
                                        className="border-2 border-white px-8 py-4 rounded-sm font-bold flex items-center gap-2"
                                        onClick={() => navigate('/gallery')}
                                    >
                                        <Play className="h-5 w-5" />
                                        View Gallery
                                    </motion.button>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Slide Navigation */}
                        <motion.div
                            className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 flex gap-3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                        >
                            {sportsFacilitiesHero.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveSlide(index)}
                                    className={`h-3 w-3 rounded-full transition-all ${index === activeSlide ? 'bg-[#FFC857] w-6' : 'bg-white/50'
                                        }`}
                                    aria-label={`View ${sportsFacilitiesHero[index].title}`}
                                />
                            ))}
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
                            className="absolute top-1/4 right-10 w-32 h-32 border-2 border-[#FFC857] rounded-full z-10"
                        />
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
                            className="absolute bottom-1/3 left-8 w-16 h-16 border border-[#FFC857] rounded-full z-10"
                        />
                    </>
                )}
            </section>

            {/* Sports Grid Section */}
            <motion.section
                className="relative py-24 bg-gray-50 overflow-hidden"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                {/* Decorative Elements */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                        scale: 1,
                        opacity: 0.2,
                        transition: { delay: 0.3, duration: 1 }
                    }}
                    className="absolute top-20 -left-20 w-64 h-64 border border-[#FFC857] rounded-full z-20"
                />

                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                        scale: 1,
                        opacity: 0.1,
                        transition: { delay: 0.5, duration: 1 }
                    }}
                    className="absolute bottom-1/3 -right-20 w-48 h-48 border border-[#0A2463] rounded-full z-10"
                />

                <div className="container mx-auto px-6">
                    {/* Category Tabs with Animation */}
                    <motion.div
                        className="flex justify-center mb-12 border-b border-gray-200"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {Object.keys(sportsData).map((category) => (
                            <motion.button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-8 py-3 font-medium uppercase tracking-wider relative ${activeCategory === category
                                    ? 'text-[#0A2463]'
                                    : 'text-gray-500 hover:text-[#0A2463]'
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {category} Sports
                                {activeCategory === category && (
                                    <motion.div
                                        className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FFC857]"
                                        layoutId="categoryUnderline"
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    />
                                )}
                            </motion.button>
                        ))}
                    </motion.div>

                    {/* Empty state for no sports */}
                    {sportsData[activeCategory].length === 0 ? (
                        <div className="text-center py-16">
                            <div className="bg-white rounded-xl p-8 shadow-md max-w-md mx-auto">
                                <div className="text-[#0A2463] mb-4">
                                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-[#0A2463] mb-2">No {activeCategory} sports available</h3>
                                <p className="text-gray-600">Check back later for our latest sports facilities.</p>
                            </div>
                        </div>
                    ) : (
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeCategory}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                                initial="hidden"
                                animate="visible"
                                viewport={{ once: true, amount: 0.2 }}
                                variants={containerVariants}
                            >
                                {sportsData[activeCategory].map((sport, index) => (
                                    <motion.div
                                        key={sport.id}
                                        className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer group border border-gray-100 "
                                        initial={{
                                            opacity: 0,
                                            y: 50,
                                        }}
                                        variants={itemVariants}
                                        onClick={() => handleSportClick(sport)}
                                        layout
                                    >
                                        <div className="h-48 relative overflow-hidden">
                                            <img
                                                src={sport.main_image}
                                                alt={sport.name}
                                                className="w-full h-full object-cover transition-transform duration-300"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                                            <motion.div
                                                className="absolute bottom-4 left-4 bg-[#FFC857] text-[#0A2463] px-4 py-1 rounded-full text-sm font-bold"
                                                initial={{ x: -20, opacity: 0 }}
                                                animate={{
                                                    x: 0,
                                                    opacity: 1,
                                                    transition: { delay: index * 0.1 + 0.3 }
                                                }}
                                            >
                                                {sport.name}
                                            </motion.div>
                                        </div>

                                        <motion.div
                                            className="p-6"
                                            initial={{ opacity: 0 }}
                                            animate={{
                                                opacity: 1,
                                                transition: { delay: index * 0.1 + 0.4 }
                                            }}
                                        >
                                            <div className="flex items-center gap-4 mb-3">
                                                <div className="bg-[#0A2463]/10 p-2 rounded-full transition-transform duration-300">
                                                    {getSportIcon(sport.icon)}
                                                </div>
                                                <h3 className="text-xl font-bold text-[#0A2463]">{sport.name}</h3>
                                            </div>
                                            <p className="text-gray-600 line-clamp-2 mb-4">{sport.description}</p>

                                            <motion.div
                                                className="flex items-center text-[#0A2463] font-medium group-hover:text-[#FFC857] transition-colors"
                                                initial={{ opacity: 0 }}
                                                animate={{
                                                    opacity: 1,
                                                    transition: { delay: index * 0.1 + 0.5 }
                                                }}
                                            >
                                                View details
                                                <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                            </motion.div>
                                        </motion.div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    )}
                </div>
            </motion.section>

            {/* Enhanced CTA Section */}
            < motion.section
                className="relative py-24 overflow-hidden bg-gradient-to-br from-[#0A2463]/95 to-[#2E4052]"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                {/* Decorative Elements */}
                < motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                        scale: 1,
                        opacity: 0.2,
                        transition: { delay: 0.3, duration: 1 }
                    }}
                    className="absolute top-20 right-10 w-64 h-64 border border-[#FFC857] rounded-full"
                />

                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                        scale: 1,
                        opacity: 0.2,
                        transition: { delay: 0.5, duration: 1 }
                    }}
                    className="absolute bottom-1/3 left-8 w-48 h-48 border border-[#FFC857] rounded-full"
                />

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        className="text-center"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.2, delayChildren: 0.3 }
                            }
                        }}
                    >
                        <motion.div
                            className="inline-block bg-[#FFC857] text-[#0A2463] px-6 py-1 rounded-full mb-6 font-bold uppercase tracking-wider text-sm"
                            variants={{
                                hidden: { y: 20, opacity: 0 },
                                visible: {
                                    y: 0,
                                    opacity: 1,
                                    transition: { type: "spring", stiffness: 200 }
                                }
                            }}
                        >
                            LIMITED MEMBERSHIPS
                        </motion.div>

                        <motion.h2
                            className="text-3xl md:text-4xl font-bold mb-6 text-white"
                            variants={{
                                hidden: { y: 30, opacity: 0 },
                                visible: {
                                    y: 0,
                                    opacity: 1,
                                    transition: { type: "spring", stiffness: 100, damping: 12 }
                                }
                            }}
                        >
                            WHERE <span className="text-[#FFC857]">PERFORMANCE</span> MEETS <span className="text-[#FFC857]">PRESTIGE</span>
                        </motion.h2>

                        <motion.p
                            className="text-lg text-[#FFC857] mb-8 max-w-2xl mx-auto"
                            variants={{
                                hidden: { y: 20, opacity: 0 },
                                visible: {
                                    y: 0,
                                    opacity: 1,
                                    transition: { delay: 0.2 }
                                }
                            }}
                        >
                            Discover why elite athletes and discerning members choose SSK World Club
                        </motion.p>

                        <motion.div
                            className="flex flex-wrap justify-center gap-6"
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: { staggerChildren: 0.1 }
                                }
                            }}
                        >
                            <motion.button
                                variants={{
                                    hidden: { y: 20, opacity: 0 },
                                    visible: {
                                        y: 0,
                                        opacity: 1,
                                        transition: { type: "spring", stiffness: 300 }
                                    }
                                }}
                                whileHover={{
                                    scale: 1.05,
                                    backgroundColor: "#FFD700",
                                    boxShadow: "0 8px 25px rgba(255, 200, 87, 0.4)"
                                }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-[#FFC857] text-[#0A2463] px-8 py-4 rounded-sm font-bold uppercase tracking-wider flex items-center gap-2"
                                onClick={() => navigate('/membership')}
                            >
                                Explore Plans
                                <ChevronRight className="h-5 w-5" />
                            </motion.button>

                            <a href='tel:+91 555 123 4567'>
                                <motion.button
                                    variants={{
                                        hidden: { y: 20, opacity: 0 },
                                        visible: {
                                            y: 0,
                                            opacity: 1,
                                            transition: { type: "spring", stiffness: 300, delay: 0.1 }
                                        }
                                    }}
                                    whileHover={{
                                        backgroundColor: "rgba(255, 200, 87, 0.2)",
                                        scale: 1.02,
                                        borderColor: "#FFD700"
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                    className="border-2 border-[#FFC857] text-[#FFC857] px-8 py-4 rounded-sm font-bold uppercase tracking-wider flex items-center gap-2"
                                >
                                    <Phone className="h-5 w-5" />
                                    Call Us
                                </motion.button>
                            </a>
                        </motion.div>
                    </motion.div>
                </div>


            </motion.section >
        </div >
    );
};

export default SportsPage;