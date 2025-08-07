import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { CheckCircle, Star, Award, Gem } from "lucide-react";

const MembershipTiers = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const cardVariants = {
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

  const tiers = [
    {
      name: "Silver",
      price: 50,
      icon: <Star className="h-6 w-6 text-gray-400" />,
      benefits: [
        "5 Guest Passes/Month",
        "Basic Court Access",
        "Fitness Center",
        "10% F&B Discount"
      ],
      highlight: false
    },
    {
      name: "Gold",
      price: 100,
      icon: <Award className="h-6 w-6 text-[#FFC857]" />,
      benefits: [
        "10 Guest Passes/Month",
        "Priority Booking",
        "Spa Credit",
        "20% F&B Discount",
        "Private Locker"
      ],
      highlight: true
    },
    {
      name: "Platinum",
      price: 200,
      icon: <Gem className="h-6 w-6 text-[#0A2463]" />,
      benefits: [
        "Unlimited Guests",
        "24/7 Concierge",
        "VIP Event Access",
        "30% F&B Discount",
        "Personal Trainer Sessions"
      ],
      highlight: false
    }
  ];

  return (
    <motion.section 
      ref={ref}
      className="py-24 bg-gray-50 relative overflow-hidden"
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          variants={cardVariants}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0A2463]">
            EXCLUSIVE MEMBERSHIP TIERS
          </h2>
          <div className="w-20 h-1 bg-[#FFC857] mx-auto mb-6" />
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose your level of luxury access
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              variants={cardVariants}
              whileHover={{ 
                y: -15,
                boxShadow: "0 20px 40px rgba(10, 36, 99, 0.15)"
              }}
              className={`relative bg-white rounded-xl p-8 border-2 ${
                tier.highlight 
                  ? "border-[#FFC857] scale-105 z-10" 
                  : "border-transparent"
              } transition-all duration-300`}
            >
              {/* Ribbon for highlighted tier */}
              {tier.highlight && (
                <motion.div 
                  className="absolute top-0 right-0 bg-[#FFC857] text-[#0A2463] px-4 py-1 font-bold text-sm"
                  initial={{ x: 50 }}
                  whileInView={{ x: 0 }}
                  transition={{ type: "spring", delay: 0.3 }}
                  viewport={{ once: false }}
                >
                  MOST POPULAR
                </motion.div>
              )}

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  {tier.icon}
                  <h3 className="text-2xl font-bold ml-3">{tier.name}</h3>
                </div>
                <motion.p 
                  className="text-3xl font-bold text-[#0A2463]"
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring" }}
                  viewport={{ once: false }}
                >
                  ${tier.price}<span className="text-sm">/mo</span>
                </motion.p>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.benefits.map((benefit, i) => (
                  <motion.li
                    key={benefit}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ 
                      opacity: 1, 
                      x: 0,
                      transition: { delay: 0.1 * i }
                    }}
                    viewport={{ once: false }}
                  >
                    <CheckCircle className="h-5 w-5 text-[#FFC857] mr-2 mt-0.5 flex-shrink-0" />
                    <span>{benefit}</span>
                  </motion.li>
                ))}
              </ul>

              <motion.button
                className={`w-full py-3 rounded-lg font-bold ${
                  tier.highlight
                    ? "bg-[#FFC857] text-[#0A2463]"
                    : "bg-[#0A2463] text-white"
                }`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Join {tier.name}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative elements - now constrained to the container */}
      <motion.div
        className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#FFC857]/10 blur-xl -translate-x-1/2 translate-y-1/2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
      />
      <motion.div
        className="absolute top-0 right-0 w-40 h-40 rounded-full bg-[#0A2463]/10 blur-lg translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
      />
    </motion.section>
  );
};

export default MembershipTiers;