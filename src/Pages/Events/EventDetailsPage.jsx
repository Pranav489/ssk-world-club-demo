import { useState } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import {
    Calendar,
    Clock,
    MapPin,
    ChevronRight,
    Play,
    Trophy,
    Users,
    Film,
    ArrowLeft,
    Share2,
    Bookmark,
    Instagram,
    Facebook,
    Twitter
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { basketball, green_sport_campus, hero_video_1, monsoon_soccer, sport_turf, table_tennis, tennis_league, tt_tournament } from "../../assets";

const EventDetailsPage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const controls = useAnimation();
    const [ref, inView] = useInView({ threshold: 0.3 });
    const [activeMedia, setActiveMedia] = useState(0);

    // Sample event data - in a real app, you'd fetch this based on the slug
    const event = {
        id: 1,
        title: "Annual Tennis Tournament",
        slug: "annual-tennis-tournament-2024",
        date: "15-18 March 2024",
        time: "9:00 AM - 6:00 PM",
        location: "SSK Tennis Courts",
        description: "Open to all members with prizes for winners in multiple categories",
        longDescription: "The SSK World Club Annual Tennis Tournament is our flagship sporting event, featuring competitive matches across singles, doubles, and mixed doubles categories. With over 200 participants expected, this four-day event will showcase thrilling matches on our championship courts.\n\nThe tournament includes:\n\n• Professional referees and line judges\n• Prize money totaling ₹5,00,000\n• Catered lunches for all participants\n• Evening social mixers\n\nRegistration closes March 1st. Members receive 20% discount on entry fees.",
        image: tennis_league,
        type: "tournament",
        status: "upcoming", // or "past"
        gallery: [
            { type: "image", src: monsoon_soccer, caption: "Championship Court" },
            { type: "image", src: sport_turf, caption: "Previous Winner" },
            { type: "video", src: hero_video_1, poster: green_sport_campus, caption: "2023 Highlights" }
        ],
    };

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
                staggerChildren: 0.1,
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

    const fadeInVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.8 }
        }
    };

    const galleryItemVariants = {
        hidden: { scale: 0.9, opacity: 0 },
        visible: (i) => ({
            scale: 1,
            opacity: 1,
            transition: {
                delay: 0.1 * i,
                type: "spring",
                stiffness: 200,
                damping: 10
            }
        }),
        hover: {
            scale: 1.02,
            zIndex: 1,
            transition: { duration: 0.2 }
        }
    };

    const formatDescription = (text) => {
        return text.split('\n').map((paragraph, i) => (
            <p key={i} className="mb-4 last:mb-0">
                {paragraph}
            </p>
        ));
    };

    return (
        <div className="relative">
            {/* Hero Section */}
            <section
                ref={ref}
                className="relative h-96 w-full overflow-hidden bg-black"
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
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />
                </motion.div>

                {/* Back Button */}
                <motion.button
                    onClick={() => navigate(-1)}
                    className="absolute top-6 left-6 z-10 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <ArrowLeft className="h-5 w-5" />
                </motion.button>

                {/* Content */}
                <motion.div
                    initial="hidden"
                    animate={controls}
                    variants={containerVariants}
                    className="relative z-10 h-full flex items-end justify-center text-white px-6 pb-12"
                >
                    <div className="max-w-4xl w-full">
                        <motion.div variants={itemVariants}>
                            <div className="flex items-center gap-3 mb-4">
                                {event.type === 'tournament' && <Trophy className="h-6 w-6 text-[#FFC857]" />}
                                {event.type === 'social' && <Users className="h-6 w-6 text-[#FFC857]" />}
                                <span className="bg-[#0A2463] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                    {event.status === 'upcoming' ? 'UPCOMING' : 'PAST EVENT'}
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold mb-4">{event.title}</h1>
                            <div className="flex flex-wrap gap-4 text-sm md:text-base">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-[#FFC857]" />
                                    <span>{event.date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-[#FFC857]" />
                                    <span>{event.time}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-[#FFC857]" />
                                    <span>{event.location}</span>
                                </div>
                            </div>
                        </motion.div>
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
            </section>

            {/* Main Content */}
            <section className="relative py-16 bg-white overflow-hidden">
                {/* Decorative elements */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 0.1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="absolute top-20 left-10 w-64 h-64 border-2 border-[#FFC857] rounded-full"
                />

                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 0.1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="absolute bottom-1/3 right-8 w-48 h-48 border border-[#0A2463] rounded-full"
                />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={containerVariants}
                            className="lg:col-span-2"
                        >
                            <motion.article variants={itemVariants} className="prose max-w-none">
                                <h2 className="text-2xl font-bold text-[#0A2463] mb-6">Event Details</h2>
                                {formatDescription(event.longDescription)}
                            </motion.article>

                            {/* Gallery Section */}
                            <motion.div variants={itemVariants} className="mt-12">
                                <h2 className="text-2xl font-bold text-[#0A2463] mb-6 flex items-center gap-2">
                                    <Film className="h-6 w-6 text-[#FFC857]" />
                                    Event Gallery
                                </h2>

                                {/* Featured Media */}
                                <motion.div
                                    className="relative h-96 rounded-xl overflow-hidden mb-6 shadow-lg"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8 }}
                                >
                                    {event.gallery[activeMedia].type === 'image' ? (
                                        <img
                                            src={event.gallery[activeMedia].src}
                                            alt={event.gallery[activeMedia].caption}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : event.gallery[activeMedia].type === 'video' ? (
                                        <video
                                            src={event.gallery[activeMedia].src}
                                            controls
                                            className="w-full h-full object-cover"
                                        >
                                            Your browser does not support the video tag.
                                        </video>
                                    ) : (
                                        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                                            <button className="bg-[#FFC857] text-[#0A2463] p-4 rounded-full">
                                                <Play className="h-8 w-8 fill-current" />
                                            </button>
                                        </div>
                                    )}

                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                                        <p className="text-white font-medium">{event.gallery[activeMedia].caption}</p>
                                    </div>
                                </motion.div>

                                {/* Thumbnail Grid */}
                                <motion.div
                                    className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.1 }}
                                    variants={containerVariants}
                                >
                                    {event.gallery.map((media, index) => (
                                        <motion.button
                                            key={index}
                                            custom={index}
                                            variants={galleryItemVariants}
                                            whileHover="hover"
                                            onClick={() => setActiveMedia(index)}
                                            className={`relative aspect-square overflow-hidden rounded-lg ${activeMedia === index ? 'ring-2 ring-[#FFC857]' : ''}`}
                                        >
                                            {media.type === 'image' ? (
                                                <img
                                                    src={media.src}
                                                    alt={media.caption || 'Image'}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : media.type === 'video' ? (
                                                <div className="relative w-full h-full">
                                                    <img
                                                        src={media.poster || '/placeholder-video-thumb.jpg'}
                                                        alt={media.caption || 'Video thumbnail'}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                                        <Play className="h-8 w-8 text-white" />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                                                    <Play className="h-5 w-5 text-white" />
                                                </div>
                                            )}

                                        </motion.button>
                                    ))}
                                </motion.div>
                            </motion.div>
                        </motion.div>

                        {/* Sidebar */}
                        <motion.aside
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={containerVariants}
                            className="space-y-8"
                        >
                            {/* Event Info Card */}
                            <motion.div
                                variants={itemVariants}
                                className="bg-gray-50 rounded-xl p-6 border border-gray-200"
                            >
                                <h3 className="text-xl font-bold text-[#0A2463] mb-4">Event Information</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <Calendar className="h-5 w-5 text-[#FFC857] mt-0.5" />
                                        <div>
                                            <h4 className="font-medium text-gray-700">Date</h4>
                                            <p>{event.date}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Clock className="h-5 w-5 text-[#FFC857] mt-0.5" />
                                        <div>
                                            <h4 className="font-medium text-gray-700">Time</h4>
                                            <p>{event.time}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <MapPin className="h-5 w-5 text-[#FFC857] mt-0.5" />
                                        <div>
                                            <h4 className="font-medium text-gray-700">Location</h4>
                                            <p>{event.location}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* CTA Card */}
                            {event.status === 'upcoming' && (
                                <motion.div
                                    variants={itemVariants}
                                    className="bg-gradient-to-br from-[#0A2463] to-[#2E4052] rounded-xl p-6 text-white"
                                >
                                    <h3 className="text-xl font-bold mb-4">Join This Event</h3>
                                    <p className="mb-6">Reserve your spot for this exclusive SSK World Club experience</p>
                                    <motion.button
                                        whileHover={{
                                            scale: 1.03,
                                            boxShadow: "0 4px 15px rgba(255, 200, 87, 0.3)"
                                        }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full bg-[#FFC857] text-[#0A2463] px-6 py-3 rounded-sm font-bold"
                                        onClick={() => navigate('/contact')}
                                    >
                                        Contact Now
                                    </motion.button>
                                </motion.div>
                            )}

                            {/* Share Card */}
                            <motion.div
                                variants={itemVariants}
                                className="bg-gray-50 rounded-xl p-6 border border-gray-200"
                            >
                                <h3 className="text-xl font-bold text-[#0A2463] mb-4">Share This Event</h3>
                                <div className="flex flex-wrap gap-3">
                                    {[
                                        { icon: <Facebook className="h-5 w-5" />, color: "bg-[#3b5998]", name: "Facebook" },
                                        { icon: <Twitter className="h-5 w-5" />, color: "bg-[#1DA1F2]", name: "Twitter" },
                                        { icon: <Instagram className="h-5 w-5" />, color: "bg-[#E1306C]", name: "Instagram" },
                                        { icon: <Share2 className="h-5 w-5" />, color: "bg-[#0A2463]", name: "Copy Link" }
                                    ].map((social, index) => (
                                        <motion.button
                                            key={social.name}
                                            custom={index}
                                            variants={galleryItemVariants}
                                            whileHover={{ y: -3 }}
                                            className={`${social.color} text-white p-3 rounded-full`}
                                        >
                                            {social.icon}
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.aside>
                    </div>
                </div>
            </section>

            {/* Related Events Section */}
            <section className="relative py-16 bg-gray-50 overflow-hidden">
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
                        viewport={{ once: true }}
                        variants={containerVariants}
                    >
                        <motion.h2 variants={itemVariants} className="text-3xl font-bold text-[#0A2463] mb-8 text-center">
                            You Might Also Like
                        </motion.h2>

                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            variants={containerVariants}
                        >
                            {/* Sample related events - in a real app you'd fetch these */}
                            {[1, 2, 3].map((i) => (
                                <motion.div
                                    key={i}
                                    variants={itemVariants}
                                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-100"
                                    whileHover={{ y: -5 }}
                                    onClick={() => navigate(`/events/event-${i}`)}
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={table_tennis}
                                            alt={`Event ${i}`}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-[#0A2463] mb-3">Related Event {i}</h3>
                                        <div className="flex items-center gap-2 text-gray-600 mb-4">
                                            <Calendar className="h-4 w-4" />
                                            <span>Date TBD</span>
                                        </div>
                                        <p className="text-gray-600 line-clamp-2 mb-4">Sample description for related event</p>
                                        <div className="flex items-center text-[#0A2463] font-medium">
                                            View details <ChevronRight className="ml-2 h-5 w-5" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default EventDetailsPage;