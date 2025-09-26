import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Trophy, Globe, Shield, ChevronRight, X, Phone } from "lucide-react";
import { useNavigate } from "react-router";
import { hero_home, ssk_club3 } from "../../assets";
import DownloadPDFButton from "../../Components/DownloadPDFButton/DownloadPDFButton";
import axiosInstance from "../../services/api";

const AffiliationsPage = () => {
    const [affiliations, setAffiliations] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone_number: ''
    });
    const [formLoading, setFormLoading] = useState(false);
    const [formError, setFormError] = useState('');
    const navigate = useNavigate();
    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.4
    });

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

    const fadeIn = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.8 }
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


    // Fetch affiliations data
    useEffect(() => {
        const fetchAffiliations = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get('/affiliations');

                if (response.data.success) {
                    setAffiliations(response.data.data);
                }
            } catch (err) {
                console.error('Error fetching affiliations:', err);
                setError('Failed to load affiliations. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchAffiliations();
    }, []);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormLoading(true);
        setFormError('');

        try {
            const response = await axiosInstance.post('/partnership/enquiry', formData);

            if (response.data.success) {
                setFormSubmitted(true);
                setFormData({
                    full_name: '',
                    email: '',
                    phone_number: ''
                });
            }
        } catch (err) {
            console.error('Form submission error:', err);
            setFormError(err.response?.data?.message || 'Failed to submit enquiry. Please try again.');
        } finally {
            setFormLoading(false);
        }
    };

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    if (loading) {
        return (
            <section className="relative h-screen w-full overflow-hidden bg-white flex items-center justify-center">

                <div className="flex flex-col items-center justify-center relative z-10">
                    {/* Animated Spinner */}
                    <div className="relative mx-auto mb-6">
                        <div className="w-16 h-16 border-4 border-white rounded-full"></div>
                        <div className="w-16 h-16 border-4 border-[#FFC857] border-t-transparent rounded-full absolute top-0 left-0 animate-spin"></div>
                    </div>

                    <motion.p
                        className="text-[#0A2463] text-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        Loading premium content...
                    </motion.p>

                </div>
            </section>
        );
    }

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
                        onClick={() => window.location.reload()}
                        className="bg-[#FFC857] text-[#0A2463] px-6 py-2 rounded-md font-medium hover:bg-amber-400 transition-colors"
                    >
                        Try Again
                    </motion.button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="relative">
            {/* Hero Section */}
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
                        src={ssk_club3}
                        alt="The SSK World Club Affiliations"
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
                    <div className="max-w-4xl mx-auto text-center mt-14 md:mt-0">
                        {/* Badge */}
                        <motion.div
                            variants={itemVariants}
                            className="inline-block border-2 border-[#FFC857] text-[#FFC857] px-6 py-1 rounded-full mb-4 font-bold uppercase tracking-wider text-sm"
                        >
                            GLOBAL NETWORK
                        </motion.div>

                        {/* Main Heading */}
                        <motion.h1
                            className="text-3xl md:text-5xl font-bold mb-4"
                            variants={itemVariants}
                        >
                            PRESTIGIOUS <span className="text-[#FFC857]">AFFILIATIONS</span>
                        </motion.h1>

                        {/* Subheading */}
                        <motion.p
                            className="text-lg md:text-xl max-w-2xl mx-auto"
                            variants={itemVariants}
                        >
                            Partnered with elite sports associations and luxury brands worldwide
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

            <section className="relative py-24 bg-white overflow-hidden">
                {/* Decorative elements */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 0.3 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="absolute top-15 left-10 w-64 h-64 border border-[#FFC857] rounded-full z-20"
                />

                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 0.1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="absolute bottom-1/3 right-8 w-48 h-48 border border-[#0A2463] rounded-full z-20"
                />

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={containerVariants}
                        className="mb-16 text-center"
                    >
                        <motion.div>
                            <motion.h2
                                variants={itemVariants}
                                className="text-3xl md:text-4xl font-bold mb-4 text-[#0A2463]"
                            >
                                OUR <span className="text-[#FFC857]">PARTNERSHIPS</span>
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
                            className="text-lg text-gray-600 max-w-3xl mx-auto mb-6 md:mb-4"
                        >
                            The SSK World Club collaborates with prestigious organizations to deliver exceptional experiences
                        </motion.p>

                        {/* Fixed spacing for Download button */}
                        <motion.div
                            variants={itemVariants}
                            className="mt-6 md:mt-4"
                        >
                            <DownloadPDFButton />
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {affiliations.map((partner, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="group bg-white p-6 rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow"
                                whileHover={{ y: -5 }}
                            >
                                {/* Logo Display */}
                                <div className="h-40 mb-6 flex items-center justify-center p-4 rounded-lg">
                                    {partner.logo ? (
                                        <motion.img
                                            src={partner.logo}
                                            alt={`${partner.name} logo`}
                                            className="h-50 w-auto max-w-full object-contain"
                                            transition={{ duration: 0.3 }}
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center">
                                            <motion.div
                                                className="bg-[#0A2463]/10 p-5 rounded-full mb-3"
                                                whileHover={{ scale: 1.1 }}
                                            >
                                                <Shield className="h-10 w-10 text-[#FFC857]" />
                                            </motion.div>
                                            <span className="text-sm text-gray-500">Logo Coming Soon</span>
                                        </div>
                                    )}
                                </div>

                                {/* Partner Info */}
                                <div className="text-center">
                                    <h4 className="text-xl uppercase font-bold text-[#0A2463] mb-2 transition-colors group-hover:text-[#FFC857]">
                                        {partner.name}
                                    </h4>
                                    <p className="text-gray-600 text-sm uppercase">{partner.location}</p>
                                    {partner.contact_number && (
                                        <motion.a
                                            href={`tel:${partner.contact_number}`}
                                            className="text-[#0A2463] transition flex items-center justify-center text-sm mt-1 group"
                                            whileHover={{ x: 5 }}
                                        >
                                            <Phone className="h-4 w-4 mr-2 text-[#0A2463] transition-colors group-hover:text-[#FFC857]" />
                                            <span className="transition-colors group-hover:text-[#FFC857]">
                                                {partner.contact_number}
                                            </span>
                                        </motion.a>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-24 bg-gradient-to-br from-[#0A2463] to-[#2E4052] overflow-hidden">
                {/* Decorative elements */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 0.3 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="absolute top-20 right-10 w-64 h-64 border border-[#FFC857] rounded-full"
                />

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={containerVariants}
                        className="text-center text-white"
                    >
                        <motion.h2
                            variants={itemVariants}
                            className="text-3xl md:text-4xl font-bold text-white mb-6"
                        >
                            Interested in Becoming a Partner?
                        </motion.h2>
                        <motion.div
                            variants={itemVariants}
                            className="w-20 h-1 bg-[#FFC857] mx-auto mb-8"
                        />
                        <motion.p
                            variants={itemVariants}
                            className="text-xl text-[#FFC857] mb-8 max-w-2xl mx-auto"
                        >
                            Join our network of elite affiliates and reach discerning members
                        </motion.p>
                        <motion.div
                            variants={containerVariants}
                            className="flex flex-wrap justify-center gap-6"
                        >
                            <motion.button
                                variants={itemVariants}
                                onClick={() => setShowForm(true)}
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: "0 8px 25px rgba(255, 200, 87, 0.4)"
                                }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-[#FFC857] text-[#0A2463] px-8 py-4 rounded-sm font-bold uppercase tracking-wider"
                            >
                                Partnership Inquiry
                            </motion.button>
                            <motion.button
                                variants={itemVariants}
                                whileHover={{
                                    backgroundColor: "rgba(255, 200, 87, 0.1)",
                                    scale: 1.02,
                                    borderColor: "#FFD700"
                                }}
                                whileTap={{ scale: 0.98 }}
                                className="border-2 border-[#FFC857] text-[#FFC857] px-8 py-4 rounded-sm font-bold uppercase tracking-wider"
                                onClick={() => navigate('/contact')}
                            >
                                Contact Us
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Partnership Form Modal */}
            <AnimatePresence>
                {showForm && (
                    <motion.div
                        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="relative bg-white rounded-xl max-w-md w-full p-8"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                        >
                            <motion.button
                                className="absolute top-4 right-4 text-gray-500 hover:text-[#0A2463]"
                                onClick={() => {
                                    setShowForm(false);
                                    setFormSubmitted(false);
                                    setFormError('');
                                }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <X className="h-6 w-6" />
                            </motion.button>

                            {formSubmitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-8"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="bg-[#4CB944]/10 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6"
                                    >
                                        <Shield className="h-10 w-10 text-[#4CB944]" />
                                    </motion.div>
                                    <motion.h3
                                        initial={{ y: 10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.1 }}
                                        className="text-2xl font-bold text-[#0A2463] mb-3"
                                    >
                                        Thank You!
                                    </motion.h3>
                                    <motion.p
                                        initial={{ y: 10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-gray-600 mb-6"
                                    >
                                        Our partnership team will contact you shortly.
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
                                        onClick={() => setShowForm(false)}
                                        className="bg-[#0A2463] hover:bg-[#0A2463]/90 text-white px-6 py-3 rounded-sm font-medium"
                                    >
                                        Close
                                    </motion.button>
                                </motion.div>
                            ) : (
                                <>
                                    <motion.h3
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        className="text-2xl font-bold text-[#0A2463] mb-6"
                                    >
                                        Partnership Inquiry
                                    </motion.h3>

                                    {formError && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6"
                                        >
                                            {formError}
                                        </motion.div>
                                    )}

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div>
                                            <label className="block text-gray-700 mb-2">Your Name *</label>
                                            <input
                                                type="text"
                                                name="full_name"
                                                value={formData.full_name}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#FFC857] focus:border-transparent"
                                                placeholder="Full Name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 mb-2">Your Email *</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#FFC857] focus:border-transparent"
                                                placeholder="email@example.com"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 mb-2">Your Number *</label>
                                            <input
                                                type="tel"
                                                name="phone_number"
                                                value={formData.phone_number}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#FFC857] focus:border-transparent"
                                                placeholder="+91 9876543210"
                                            />
                                        </div>
                                        <motion.button
                                            type="submit"
                                            disabled={formLoading}
                                            whileHover={!formLoading ? { scale: 1.02 } : {}}
                                            whileTap={!formLoading ? { scale: 0.98 } : {}}
                                            className="w-full bg-[#FFC857] hover:bg-[#FFD700] disabled:bg-gray-400 disabled:cursor-not-allowed text-[#0A2463] px-8 py-3 rounded-sm font-bold uppercase tracking-wider transition-colors"
                                        >
                                            {formLoading ? (
                                                <div className="flex items-center justify-center">
                                                    <motion.div
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                        className="rounded-full h-5 w-5 border-b-2 border-[#0A2463] mr-2"
                                                    />
                                                    Submitting...
                                                </div>
                                            ) : (
                                                'Submit Inquiry'
                                            )}
                                        </motion.button>
                                    </form>
                                </>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AffiliationsPage;