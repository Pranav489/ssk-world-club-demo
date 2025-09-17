import React from "react";
import { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useForm } from "react-hook-form";
import { ChevronRight, User, Phone, Mail, Home, Users, Heart, Shield, ArrowDown, Award, Star, Clock, CheckCircle } from "lucide-react";
import { ssk_club } from "../../assets";
import axiosInstance from "../../services/api";
import { useNavigate } from "react-router";

const MembershipPage = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [membershipPlans, setMembershipPlans] = useState([]);
  const [membershipRules, setMembershipRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState('');
  const formRef = useRef(null);

  const { register, handleSubmit, formState: { errors }, setValue, reset, watch } = useForm();
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.4
  });

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

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePlanSelect = (planName) => {
    setSelectedPlan(planName);
    setValue('membershipType', planName);
    setTimeout(scrollToForm, 100);
  };

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Sync selectedPlan with form field
  useEffect(() => {
    if (selectedPlan) {
      setValue("membershipType", selectedPlan);
    }
  }, [selectedPlan, setValue]);

  // Form submission handler
  const onFormSubmit = async (data) => {
    setFormLoading(true);
    setFormError('');

    try {
      const response = await axiosInstance.post('/membership/enquiry', {
        full_name: data.name,
        phone_number: data.phone,
        email: data.email,
        address: data.address,
        membership_type: data.membershipType,
        message: data.message || ''
      });

      if (response.data.success) {
        setFormSubmitted(true);
        reset();
        setSelectedPlan(null);
      }
    } catch (err) {
      console.error('Form submission error:', err);
      setFormError(err.response?.data?.message || 'Failed to submit form. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  // Function to split content into individual points
  const splitContentIntoPoints = (content) => {
    return content.split(/\n|•|<\/?li>|<\/?ul>|<\/?ol>/)
      .map(point => point.trim())
      .filter(point => point.length > 0);
  };

  // Fetch membership data
  useEffect(() => {
    const fetchMembershipData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [plansResponse, rulesResponse] = await Promise.all([
          axiosInstance.get('/membership/plans'),
          axiosInstance.get('/membership/rules')
        ]);

        if (plansResponse.data.success) {
          const plansData = plansResponse.data.data;
          const processedPlans = plansData.map(plan => ({
            id: plan.id,
            type: plan.type,
            description: plan.description,
            validity: plan.validity,
            name: plan.type,
            features: plan.description ? [plan.description] : []
          }));

          setMembershipPlans(processedPlans);
        }

        if (rulesResponse.data.success) {
          setMembershipRules(rulesResponse.data.data);
        }
      } catch (err) {
        console.error('Error fetching membership data:', err);
        setError('Failed to load membership information. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMembershipData();
  }, []);

  // Get icon component based on plan type
  const getIconComponent = (planType) => {
    switch (planType.toLowerCase()) {
      case 'family membership':
        return <Users className="h-8 w-8 text-[#FFC857]" />;
      case 'senior citizen membership':
        return <Heart className="h-8 w-8 text-[#FFC857]" />;
      case 'couple membership':
        return <User className="h-8 w-8 text-[#FFC857]" />;
      default:
        return <User className="h-8 w-8 text-[#FFC857]" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
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
            Loading membership information...
          </motion.p>
        </motion.div>
      </div>
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        ref={ref}
        className="relative pt-20 md:pt-0 h-96 w-full overflow-hidden bg-black">
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
            animate={controls}
            variants={containerVariants}
            className="max-w-4xl mx-auto text-center mt-10 md:mt-0"
          >
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Join Our <span className="text-[#FFC857]">Exclusive</span> Community
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-xl text-[#FFC857] max-w-2xl mx-auto"
            >
              Experience premium sports and luxury amenities with SSK World Club membership
            </motion.p>
          </motion.div>
        </div>

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

      {/* Membership Plans */}
      <section className="relative py-24 bg-white overflow-hidden">
        {/* Decorative Elements */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{
            scale: 1,
            opacity: 0.2,
            transition: { delay: 0.3, duration: 1 }
          }}
          viewport={{ once: true }}
          className="absolute top-20 right-10 w-64 h-64 border border-[#FFC857] rounded-full"
        />

        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-[#0A2463] mb-4">
              Membership <span className="text-[#FFC857]">Plans</span>
            </motion.h2>
            <motion.div
              className="w-20 h-1 bg-[#FFC857] mx-auto mb-6"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            />
            <motion.p variants={itemVariants} className="text-lg text-gray-600 max-w-3xl mx-auto">
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
                key={plan.id}
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
                className="relative rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-200 min-h-[350px] flex flex-col"
              >
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div
                      className="bg-[#0A2463]/10 p-3 rounded-full"
                      whileHover={{ scale: 1.1 }}
                    >
                      {getIconComponent(plan.type)}
                    </motion.div>
                    <h3 className="text-2xl font-bold text-[#0A2463]">
                      {plan.type}
                    </h3>
                  </div>

                  <p className="text-gray-700 mb-4 text-sm flex-grow">
                    {plan.description}
                  </p>

                  <div className="bg-[#F8F9FA] p-4 rounded-lg mt-auto mb-4">
                    <span className="text-lg font-semibold text-[#0A2463]">
                      {plan.validity}
                    </span>
                  </div>

                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "#0A2463"
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handlePlanSelect(plan.type)}
                    className="w-full bg-[#0A2463] hover:bg-[#0A2463]/90 text-white py-3 rounded-sm font-bold transition-colors mt-auto"
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
            opacity: 0.3,
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
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
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
                    Thank You for Your Interest!
                  </motion.h3>
                  <motion.p
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-600 mb-6"
                  >
                    Our membership team will contact you within 24 hours to complete your enrollment.
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
                    onClick={() => setFormSubmitted(false)}
                    className="bg-[#0A2463] hover:bg-[#0A2463]/90 text-white px-6 py-3 rounded-sm font-medium"
                  >
                    Submit Another Enquiry
                  </motion.button>
                </motion.div>
              ) : (
                <>
                  <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold text-[#0A2463] mb-2"
                  >
                    Enroll for Membership
                  </motion.h2>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-gray-600 mb-8"
                  >
                    Complete the form below to begin your SSK World Club journey
                  </motion.p>

                  {formError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6"
                    >
                      {formError}
                    </motion.div>
                  )}

                  <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 mb-2">Full Name *</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            {...register("name", { required: "Name is required" })}
                            type="text"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#FFC857] focus:border-transparent"
                            placeholder="John Doe"
                          />
                        </div>
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-2">Phone Number *</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            {...register("phone", {
                              required: "Phone number is required",
                              pattern: {
                                value: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
                                message: "Please enter a valid phone number"
                              }
                            })}
                            type="tel"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#FFC857] focus:border-transparent"
                            placeholder="+91 9876543210"
                          />
                        </div>
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-2">Email Address *</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            {...register("email", {
                              required: "Email is required",
                              pattern: {
                                value: /^\S+@\S+$/i,
                                message: "Please enter a valid email address"
                              }
                            })}
                            type="email"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#FFC857] focus:border-transparent"
                            placeholder="john@example.com"
                          />
                        </div>
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-2">Address *</label>
                        <div className="relative">
                          <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            {...register("address", { required: "Address is required" })}
                            type="text"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#FFC857] focus:border-transparent"
                            placeholder="123 Main St, Nashik"
                          />
                        </div>
                        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">Membership Type *</label>
                      <select
                        {...register("membershipType", { required: "Please select a membership type" })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#FFC857] focus:border-transparent"
                        value={selectedPlan || ""}
                        onChange={(e) => setSelectedPlan(e.target.value)}
                      >
                        <option value="">Select a membership plan</option>
                        {membershipPlans.map((plan) => (
                          <option key={plan.id} value={plan.type}>
                            {plan.type}
                          </option>
                        ))}
                      </select>
                      {errors.membershipType && <p className="text-red-500 text-sm mt-1">{errors.membershipType.message}</p>}
                    </div>
                    <motion.button
                      type="submit"
                      disabled={formLoading}
                      whileHover={!formLoading ? { scale: 1.02 } : {}}
                      whileTap={!formLoading ? { scale: 0.98 } : {}}
                      className="w-full bg-gradient-to-r from-[#FFC857] to-[#F4A261] hover:from-[#F4A261] hover:to-[#FFC857] disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-[#0A2463] px-8 py-4 rounded-sm font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
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
                        'Submit Application'
                      )}
                    </motion.button>
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
            opacity: 0.3,
            transition: { delay: 0.3, duration: 1 }
          }}
          viewport={{ once: true }}
          className="absolute top-1/4 right-10 w-48 h-48 border border-[#FFC857] rounded-full"
        />

        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scaleUp}
            className="bg-[#F8F9FA] rounded-xl p-8 md:p-12"
          >
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-[#0A2463] mb-6 flex items-center gap-3"
            >
              <Shield className="h-8 w-8 text-[#FFC857]" />
              Rules and Regulations
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-700 mb-6"
            >
              Patrons are required to abide by the rules and regulations laid down by The SSK Club. Here are the rules and regulations:
            </motion.p>
            <div className="space-y-6">
              {membershipRules.map((categoryGroup) => (
                <motion.div
                  key={categoryGroup.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-xl font-bold text-[#0A2463] mb-3">
                    {categoryGroup.category}
                  </h3>
                  <div className="space-y-4">
                    {categoryGroup.rules.map((rule, index) => {
                      const points = splitContentIntoPoints(rule.content);
                      return (
                        <div key={rule.id || index}>
                          {points.map((point, pointIndex) => (
                            <motion.div
                              key={pointIndex}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: pointIndex * 0.1 }}
                              className="flex items-start mb-3 last:mb-0"
                            >
                              <ChevronRight className="h-5 w-5 text-[#FFC857] mr-3 mt-1 flex-shrink-0" />
                              <span className="text-gray-700">{point}</span>
                            </motion.div>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-br from-[#0A2463] to-[#2E4052] overflow-hidden">
        {/* Decorative elements */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{
            scale: 1,
            opacity: 0.1,
            transition: { delay: 0.3, duration: 1 }
          }}
          viewport={{ once: true }}
          className="absolute top-20 left-10 w-64 h-64 border-2 border-[#FFC857] rounded-full"
        />
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{
            scale: 1,
            opacity: 0.1,
            transition: { delay: 0.5, duration: 1 }
          }}
          viewport={{ once: true }}
          className="absolute bottom-20 right-10 w-48 h-48 border border-[#FFC857] rounded-full"
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
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Ready to Experience Premium Sports Luxury?
            </motion.h2>
            
            <motion.div
              variants={itemVariants}
              className="w-20 h-1 bg-[#FFC857] mx-auto mb-8"
            />
            
            <motion.p
              variants={itemVariants}
              className="text-xl mb-12 max-w-3xl mx-auto text-gray-200"
            >
              Join hundreds of satisfied members who have elevated their sports experience with our world-class facilities and exclusive amenities.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={containerVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.button
                variants={itemVariants}
                onClick={() => {
                  formRef.current?.scrollIntoView({ behavior: 'smooth' });
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 25px rgba(255, 200, 87, 0.4)"
                }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#FFC857] text-[#0A2463] px-8 py-4 rounded-sm font-bold uppercase tracking-wider flex items-center gap-2"
              >
                <CheckCircle className="h-5 w-5" />
                Join Now
              </motion.button>
              
              <motion.button
                variants={itemVariants}
                onClick={() => {navigate('/contact')}}                  
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 0.1)"
                }}
                whileTap={{ scale: 0.98 }}
                className="border-2 border-white text-white px-8 py-4 rounded-sm font-bold uppercase tracking-wider"
              >
                Schedule Tour
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default MembershipPage;