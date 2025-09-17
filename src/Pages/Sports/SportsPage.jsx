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
    SquareDashedBottom,
    Briefcase
} from 'lucide-react';
import { useNavigate } from 'react-router';

const SportsPage = () => {
    const [contactInfo, setContactInfo] = useState(null);
    const [sportsFacilitiesHero, setSportsFacilitiesHero] = useState([]);
    const [sportsData, setSportsData] = useState({ indoor: [], outdoor: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Animation controls
    const controls = useAnimation();
    const [ref, inView] = useInView({ threshold: 0.4 });
    const [activeSlide, setActiveSlide] = useState(0);
    const [activeCategory, setActiveCategory] = useState('indoor');
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
        hidden: { y: 30, opacity: 0 },
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

    // Fetch contact information
    useEffect(() => {
        const fetchContactInfo = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get('/contact-info');
                
                if (response.data.success) {
                    setContactInfo(response.data.data);
                } else {
                    setError('Failed to load contact information');
                }
            } catch (err) {
                console.error('Error fetching contact information:', err);
                setError('Failed to load contact information');
            } finally {
                setLoading(false);
            }
        };

        fetchContactInfo();
    }, []);

    // Icon mapping function
    const getSportIcon = (iconName, props = { className: "h-8 w-8 text-[#FFC857]" }) => {
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

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="rounded-full h-12 w-12 border-b-2 border-[#FFC857] mx-auto mb-4"
                    />
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[#0A2463] font-medium"
                    >
                        Loading sports facilities...
                    </motion.p>
                </div>
            </div>
        );
    }

    // Error state
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
                        onClick={fetchSportsData}
                        className="bg-[#FFC857] text-[#0A2463] px-6 py-2 rounded-md font-medium hover:bg-amber-400 transition-colors"
                    >
                        Try Again
                    </motion.button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section ref={ref} className="relative h-screen w-full overflow-hidden bg-black">
                {/* Show placeholder if no hero images */}
                {sportsFacilitiesHero.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-gradient-to-br from-[#0A2463] to-[#2E4052] flex items-center justify-center"
                    >
                        <div className="text-center text-white">
                            <motion.h2
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="text-4xl font-bold mb-4"
                            >
                                Sports Facilities
                            </motion.h2>
                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-xl"
                            >
                                World-class athletic amenities
                            </motion.p>
                        </div>
                    </motion.div>
                ) : (
                    <>
                        {/* Sliding Background Images */}
                        <div className="absolute inset-0 flex">
                            {sportsFacilitiesHero.map((facility, index) => (
                                <motion.div
                                    key={index}
                                    className={`h-full relative overflow-hidden transition-all duration-1000 ${index === activeSlide ? 'w-full' : 'w-0'}`}
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
                                <motion.button
                                    key={index}
                                    onClick={() => setActiveSlide(index)}
                                    className={`h-3 w-3 rounded-full transition-all ${index === activeSlide ? 'bg-[#FFC857] w-6' : 'bg-white/50'}`}
                                    aria-label={`View ${sportsFacilitiesHero[index].title}`}
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
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
                variants={containerVariants}
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
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-16"
                        >
                            <div className="bg-white rounded-xl p-8 shadow-md max-w-md mx-auto">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="text-[#0A2463] mb-4"
                                >
                                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </motion.div>
                                <motion.h3
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-xl font-bold text-[#0A2463] mb-2"
                                >
                                    No {activeCategory} sports available
                                </motion.h3>
                                <motion.p
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-gray-600"
                                >
                                    Check back later for our latest sports facilities.
                                </motion.p>
                            </div>
                        </motion.div>
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
                                        className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer group border border-gray-100"
                                        variants={itemVariants}
                                        initial={{ opacity: 0, y: 50 }}
                                        whileHover={{ y: -5 }}
                                        onClick={() => handleSportClick(sport)}
                                        layout
                                    >
                                        <div className="h-48 relative overflow-hidden">
                                            <motion.img
                                                src={sport.main_image}
                                                alt={sport.name}
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                whileHover={{ scale: 1.05 }}
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
                                                <motion.div 
                                                    className="bg-[#0A2463]/10 p-2 rounded-full transition-transform duration-300 group-hover:scale-110"
                                                    whileHover={{ scale: 1.1 }}
                                                >
                                                    {getSportIcon(sport.icon)}
                                                </motion.div>
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
                                        </motion.div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    )}
                </div>
            </motion.section>

            {/* Enhanced CTA Section */}
            <motion.section
                className="relative py-24 overflow-hidden bg-gradient-to-br from-[#0A2463]/95 to-[#2E4052]"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={containerVariants}
            >
                {/* Decorative Elements */}
                <motion.div
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

                            {contactInfo?.contact?.phone && (
                                <motion.a
                                    href={`tel:${contactInfo?.contact?.phone}`}
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
                                </motion.a>
                            )}
                        </motion.div>
                    </motion.div>
                </div>
            </motion.section>
        </div>
    );
};

export default SportsPage;