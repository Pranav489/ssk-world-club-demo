import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Award, Users, Briefcase, HeartPulse, Utensils, Trophy, Zap, Activity, Waves, Medal } from "lucide-react";
import { founder, leader1, leader2, leader3 } from "../../assets";

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
            bio: "Bachelor’s degree in Business Administration from London. A dynamic sports enthusiast with a love for both team and individual challenges.",
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

                                {/* Professional Roles - Adjusted alignment */}
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

                                {/* Personal Insights - Adjusted alignment */}
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

export default LeadershipSection;