import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { ChevronRight, User, Phone, Mail, Home, Users, Heart, Shield, ArrowDown } from "lucide-react";
import { ssk_club } from "../../assets";

const MembershipPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const formRef = useRef(null);

  const onSubmit = (data) => {
    console.log(data);
    setFormSubmitted(true);
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePlanSelect = (planName) => {
    setSelectedPlan(planName);
    setTimeout(scrollToForm, 100); // Small delay to ensure state update
  };

  const membershipPlans = [
    {
      name: "Family Membership",
      price: "₹25,000",
      period: "per year",
      icon: <Users className="h-8 w-8 text-[#FFC857]" />,
      features: [
        "Access for 2 adults + 2 children",
        "All sports facilities",
        "Priority booking",
        "10% discount on F&B",
        "Free kids club access"
      ],
      bestValue: true
    },
    {
      name: "Senior Citizen Membership",
      price: "₹18,000",
      period: "per year",
      icon: <Heart className="h-8 w-8 text-[#FFC857]" />,
      features: [
        "Single membership",
        "Special morning hours",
        "Senior-friendly activities",
        "Health checkups",
        "15% spa discount"
      ]
    },
    {
      name: "Couple Membership",
      price: "₹20,000",
      period: "per year",
      icon: <User className="h-8 w-8 text-[#FFC857]" />,
      features: [
        "Access for 2 adults",
        "All sports facilities",
        "Date night discounts",
        "Free valet parking",
        "Spa package included"
      ]
    }
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const scaleUp = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative pt-20 md:pt-0 h-96 w-full overflow-hidden bg-black">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <img
            src={ssk_club}
            alt="SSK World Club Membership"
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

        <div className="relative z-10 h-full flex items-center justify-center text-white px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center mt-10 md:mt-0"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Join Our <span className="text-[#FFC857]">Exclusive</span> Community
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-[#FFC857] max-w-2xl mx-auto"
            >
              Experience premium sports and luxury amenities with SSK World Club membership
            </motion.p>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 0.3,
            transition: { delay: 0.8, duration: 1 }
          }}
          className="absolute top-1/4 right-10 w-32 h-32 border-2 border-[#FFC857] rounded-full"
        />

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 0.2,
            transition: { delay: 1, duration: 1 }
          }}
          className="absolute bottom-1/3 left-8 w-16 h-16 border border-[#FFC857] rounded-full"
        />


      </section>

      {/* Membership Plans */}
      <section className="relative py-24 bg-white overflow-hidden">
        {/* Decorative Elements */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{
            scale: 1,
            opacity: 0.1,
            transition: { delay: 0.3, duration: 1 }
          }}
          viewport={{ once: true }}
          className="absolute top-20 right-10 w-64 h-64 border-2 border-[#FFC857] rounded-full"
        />

        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-[#0A2463] mb-4">
              Membership <span className="text-[#FFC857]">Plans</span>
            </motion.h2>
            <motion.div
              variants={fadeInUp}
              className="w-20 h-1 bg-[#FFC857] mx-auto mb-6"
            />
            <motion.p variants={fadeInUp} className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose the plan that fits your lifestyle and enjoy unlimited access to our world-class facilities
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {membershipPlans.map((plan, index) => (
              <motion.div
                key={index}
                variants={scaleUp}
                whileHover={{
                  y: -8,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 10,
                    mass: 0.5
                  }
                }}
                className={`relative rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ${plan.bestValue ? "border-2 border-[#FFC857]" : "border border-gray-200"
                  }`}
              >
                {plan.bestValue && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="absolute top-0 right-0 bg-[#FFC857] text-[#0A2463] px-4 py-1 font-bold text-sm"
                  >
                    BEST VALUE
                  </motion.div>
                )}
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div
                      className="bg-[#0A2463]/10 p-3 rounded-full"
                    >
                      {plan.icon}
                    </motion.div>
                    <h3 className="text-2xl font-bold text-[#0A2463]">
                      {plan.name}
                    </h3>
                  </div>
                  <div className="mb-6">
                    <span className="text-3xl font-bold text-[#0A2463]">
                      {plan.price}
                    </span>
                    <span className="text-gray-600"> {plan.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start"
                        whileHover={{ x: 5 }}
                      >
                        <ChevronRight className="h-5 w-5 text-[#FFC857] mr-2 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "#0A2463"
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handlePlanSelect(plan.name)}
                    className="w-full bg-[#0A2463] hover:bg-[#0A2463]/90 text-white py-3 rounded-sm font-bold transition-colors"
                  >
                    Select Plan
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enrollment Form */}
      <section ref={formRef} className="relative py-24 bg-gray-50 overflow-hidden">
        {/* Floating decorative elements */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{
            scale: 1,
            opacity: 0.1,
            transition: { delay: 0.5, duration: 1 }
          }}
          viewport={{ once: true }}
          className="absolute bottom-1/3 left-8 w-48 h-48 border border-[#FFC857] rounded-full"
        />

        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scaleUp}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-8 md:p-12">
              {formSubmitted ? (
                <div className="text-center py-12">
                  <div className="bg-[#4CB944]/10 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <Shield className="h-10 w-10 text-[#4CB944]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0A2463] mb-3">
                    Thank You for Your Interest!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Our membership team will contact you within 24 hours to complete your enrollment.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="bg-[#0A2463] hover:bg-[#0A2463]/90 text-white px-6 py-3 rounded-sm font-medium"
                  >
                    Back to Membership
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl font-bold text-[#0A2463] mb-2">
                    Enroll for Membership
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Complete the form below to begin your SSK World Club journey
                  </p>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 mb-2">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            {...register("name", { required: true })}
                            type="text"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#FFC857] focus:border-transparent"
                            placeholder="John Doe"
                          />
                        </div>
                        {errors.name && <p className="text-red-500 text-sm mt-1">Name is required</p>}
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">Phone Number</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            {...register("phone", { required: true })}
                            type="tel"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#FFC857] focus:border-transparent"
                            placeholder="+91 9876543210"
                          />
                        </div>
                        {errors.phone && <p className="text-red-500 text-sm mt-1">Phone is required</p>}
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                            type="email"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#FFC857] focus:border-transparent"
                            placeholder="john@example.com"
                          />
                        </div>
                        {errors.email && <p className="text-red-500 text-sm mt-1">Valid email is required</p>}
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">Address</label>
                        <div className="relative">
                          <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            {...register("address", { required: true })}
                            type="text"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#FFC857] focus:border-transparent"
                            placeholder="123 Main St, Nashik"
                          />
                        </div>
                        {errors.address && <p className="text-red-500 text-sm mt-1">Address is required</p>}
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Membership Type</label>
                      <select
                        {...register("membershipType", { required: true })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#FFC857] focus:border-transparent"
                        value={selectedPlan || ""}
                        onChange={(e) => setSelectedPlan(e.target.value)}
                      >
                        <option value="">Select a membership plan</option>
                        {membershipPlans.map((plan, index) => (
                          <option key={index} value={plan.name}>
                            {plan.name} ({plan.price})
                          </option>
                        ))}
                      </select>
                      {errors.membershipType && <p className="text-red-500 text-sm mt-1">Membership type is required</p>}
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#FFC857] to-[#F4A261] hover:from-[#F4A261] hover:to-[#FFC857] text-[#0A2463] px-8 py-4 rounded-sm font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
                    >
                      Submit Application
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Rules & Regulations */}
      <section id="club-rules" className="relative py-24 bg-white overflow-hidden">
        {/* Decorative elements */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{
            scale: 1,
            opacity: 0.1,
            transition: { delay: 0.3, duration: 1 }
          }}
          viewport={{ once: true }}
          className="absolute top-1/4 right-10 w-32 h-32 border-2 border-[#FFC857] rounded-full"
        />

        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scaleUp}
            className="bg-[#F8F9FA] rounded-xl p-8 md:p-12"
          >
            <h2 className="text-3xl font-bold text-[#0A2463] mb-6 flex items-center gap-3">
              <Shield className="h-8 w-8 text-[#FFC857]" />
              Rules and Regulations
            </h2>
            <p className="text-gray-700 mb-6">
              Patrons are required to abide by the rules and regulations laid down by The SSK Club. Here are the rules and regulations:
            </p>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[#0A2463] mb-3">General Conduct</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <ChevronRight className="h-4 w-4 text-[#FFC857] mr-2 mt-1" />
                    <span>Members must carry their membership cards at all times</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-4 w-4 text-[#FFC857] mr-2 mt-1" />
                    <span>Proper sports attire is required in all activity areas</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-4 w-4 text-[#FFC857] mr-2 mt-1" />
                    <span>Smoking is prohibited in all indoor areas</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#0A2463] mb-3">Facility Usage</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <ChevronRight className="h-4 w-4 text-[#FFC857] mr-2 mt-1" />
                    <span>Court bookings are limited to 2 hours during peak times</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-4 w-4 text-[#FFC857] mr-2 mt-1" />
                    <span>Equipment must be returned after use</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-4 w-4 text-[#FFC857] mr-2 mt-1" />
                    <span>Children under 12 must be supervised at all times</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#0A2463] mb-3">Guest Policy</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <ChevronRight className="h-4 w-4 text-[#FFC857] mr-2 mt-1" />
                    <span>Members may bring up to 3 guests per visit</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-4 w-4 text-[#FFC857] mr-2 mt-1" />
                    <span>Guest fees apply for certain facilities</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-4 w-4 text-[#FFC857] mr-2 mt-1" />
                    <span>Members are responsible for their guests' conduct</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default MembershipPage;