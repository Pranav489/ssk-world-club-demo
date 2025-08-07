import React, { useState } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Home,
  Trophy,
  Utensils,
  Hotel,
  Leaf,
  BookOpen,
  Film,
  Calendar,
  Users,
  Phone,
  MapPin,
  Clock,
  Globe,
  Camera
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LogoWhite, LogoGold } from "../../assets";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  // Scroll effect with debounce
  React.useEffect(() => {
    let timeoutId;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setScrolled(window.scrollY > 50);
      }, 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const navItems = [
    { label: "Home", path: "/", icon: <Home className="h-4 w-4 mr-2" /> },
    {
      label: "About",
      path: "/about",
      icon: <Users className="h-4 w-4 mr-2" />,
      subItems: [
        { name: "Our Story", href: "/about/story" },
        { name: "Leadership", href: "/about/leadership" },
        { name: "Awards", href: "/about/awards" }
      ]
    },
  
    {
      label: "Sports",
      path: "/sports",
      icon: <Trophy className="h-4 w-4 mr-2" />,
      subItems: [
        { name: "Tennis", href: "/sports/tennis" },
        { name: "Squash", href: "/sports/squash" },
        { name: "Swimming", href: "/sports/swimming" },
        { name: "Fitness", href: "/sports/fitness" }
      ]
    },
    {
      label: "Amenities",
      path: "/amenities",
      icon: <Hotel className="h-4 w-4 mr-2" />,
      subItems: [
        { name: "Dining", href: "/amenities/dining" },
        { name: "Suites", href: "/amenities/suites" },
        { name: "Spa", href: "/amenities/spa" },
        { name: "Library", href: "/amenities/library" }
      ]
    },
    {
    label: "Gallery",
    path: "/gallery",
    icon: <Camera className="h-4 w-4 mr-2" />, // Import Camera from lucide-react
    subItems: [
      { name: "Sports Facilities", href: "/gallery/sports" },
      { name: "Luxury Amenities", href: "/gallery/amenities" },
      { name: "Events", href: "/gallery/events" },
      { name: "Member Moments", href: "/gallery/members" }
    ]
  },
    {
      label: "Membership",
      path: "/membership",
      icon: <Users className="h-4 w-4 mr-2" />,
      subItems: [
        { name: "Individual", href: "/membership/individual" },
        { name: "Family", href: "/membership/family" },
        { name: "Corporate", href: "/membership/corporate" }
      ]
    },
    {
      label: "Affiliations",
      path: "/affiliations",
      icon: <Globe className="h-4 w-4 mr-2" />, // Using Globe icon from lucide-react
      subItems: [
        { name: "Sports Associations", href: "/affiliations/sports" },
        { name: "Luxury Partners", href: "/affiliations/luxury" },
        { name: "Health & Wellness", href: "/affiliations/wellness" },
        { name: "Corporate Alliances", href: "/affiliations/corporate" }
      ]
    },
    {
      label: "Events",
      path: "/events",
      icon: <Calendar className="h-4 w-4 mr-2" />,
      subItems: [
        { name: "Tournaments", href: "/events/tournaments" },
        { name: "Galas", href: "/events/galas" }
      ]
    },
    {
      label: "Contact",
      path: "/contact",
      icon: <Phone className="h-4 w-4 mr-2" />,
      subItems: [
        { name: "Location", href: "/contact/location" },
        { name: "Inquiries", href: "/contact/inquiries" }
      ]
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <header className="fixed w-full z-50 font-sans">
      {/* Main Navbar */}
      <motion.nav
        className={`${scrolled ? 'bg-white shadow-sm' : 'bg-transparent'}`}
        initial={{ padding: "12px 0" }}
        animate={{
          padding: scrolled ? "8px 0" : "12px 0",
          backgroundColor: scrolled ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0)'
        }}
        transition={{ type: "tween", ease: "easeInOut" }}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <motion.a
            href="/"
            className="flex items-center"
            whileHover={{ scale: 1.03 }}
          >
            <motion.img
              src={scrolled ? LogoGold : LogoWhite}
              alt="Elite Sports Club"
              className={`h-auto ${scrolled ? 'w-40' : 'w-44'}`}
              transition={{ duration: 0.3 }}
            />
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-0">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setHoveredItem(item.label)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <motion.button
                  onClick={() => item.subItems ? toggleDropdown(item.label) : null}
                  className={`flex items-center ${scrolled ? 'text-[#0A2463]' : 'text-white'} hover:text-[#FFC857] transition-colors px-2.5 py-2 font-medium uppercase tracking-wider text-xs sm:text-sm relative`}
                  whileHover={{ scale: 1.05 }}
                >
                  {item.icon}
                  <span className="whitespace-nowrap">{item.label}</span>
                  {item.subItems && (
                    <ChevronDown className={`ml-1 h-3 w-3 transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`} />
                  )}

                  {hoveredItem === item.label && (
                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FFC857]"
                      layoutId="navUnderline"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />
                  )}
                </motion.button>

                {item.subItems && (
                  <AnimatePresence>
                    {openDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="absolute left-1/2 transform -translate-x-1/2 mt-1 w-48 bg-white rounded-sm shadow-xl z-50 border border-gray-100 origin-top"
                      >
                        <motion.div
                          variants={containerVariants}
                          initial="hidden"
                          animate="show"
                          className="py-1"
                        >
                          {item.subItems.map((subItem) => (
                            <motion.a
                              key={subItem.name}
                              href={subItem.href}
                              className="flex items-center px-4 py-2 text-xs sm:text-sm text-[#2E4052] hover:bg-[#F8F9FA] hover:text-[#0A2463] transition-colors border-b border-gray-100 last:border-0"
                              variants={itemVariants}
                              whileHover={{ x: 3 }}
                            >
                              {subItem.name}
                            </motion.a>
                          ))}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
            <motion.a
              href="/membership"
              className="ml-2 bg-gradient-to-r from-[#FFC857] to-[#F4A261] hover:from-[#F4A261] hover:to-[#FFC857] text-[#0A2463] px-4 py-2 rounded-sm font-bold uppercase tracking-wider text-xs sm:text-sm shadow-md hover:shadow-lg whitespace-nowrap"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 5px 15px rgba(244, 162, 97, 0.4)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              Join Now
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className={`lg:hidden ${scrolled ? 'text-[#0A2463]' : 'text-white'} focus:outline-none`}
            onClick={toggleMenu}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", ease: "easeInOut" }}
            className="fixed inset-0 bg-white z-40 lg:hidden overflow-y-auto pt-20"
          >
            <div className="container mx-auto px-4">
              <motion.div
                className="grid gap-1"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                {navItems.map((item) => (
                  <motion.div
                    key={item.label}
                    className="border-b border-[#F1F1F1]"
                    variants={itemVariants}
                  >
                    {item.subItems ? (
                      <>
                        <motion.button
                          onClick={() => toggleDropdown(item.label)}
                          className="flex items-center justify-between w-full py-3 text-[#0A2463] font-medium uppercase tracking-wider text-left text-sm"
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center">
                            {item.icon}
                            <span className="ml-3">{item.label}</span>
                          </div>
                          <ChevronDown className={`h-4 w-4 transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`} />
                        </motion.button>
                        <AnimatePresence>
                          {openDropdown === item.label && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="pl-10 overflow-hidden"
                              transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            >
                              <div className="pb-2 space-y-1">
                                {item.subItems.map((subItem) => (
                                  <motion.a
                                    key={subItem.name}
                                    href={subItem.href}
                                    className="block py-2 text-xs text-[#2E4052] hover:text-[#0A2463] transition-colors"
                                    onClick={toggleMenu}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    {subItem.name}
                                  </motion.a>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <motion.a
                        href={item.path}
                        className="flex items-center py-3 text-sm text-[#0A2463] font-medium uppercase tracking-wider"
                        onClick={toggleMenu}
                        whileTap={{ scale: 0.98 }}
                      >
                        {item.icon}
                        <span className="ml-3">{item.label}</span>
                      </motion.a>
                    )}
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                className="mt-6 grid grid-cols-2 gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.a
                  href="/membership"
                  className="col-span-2 bg-gradient-to-r from-[#FFC857] to-[#F4A261] text-[#0A2463] px-4 py-2 rounded-sm font-bold uppercase tracking-wider text-center text-sm shadow-md"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Join Now
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;