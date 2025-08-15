import React, { useState, useEffect } from "react";
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
  Camera,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LogoWhite, LogoGold } from "../../assets";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSubDropdown, setOpenSubDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showNav, setShowNav] = useState(true);

  // Scroll effect for desktop
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Mobile scroll behavior
      if (window.innerWidth < 1024) {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY && currentScrollY > 50) {
          // Scrolling down
          setShowNav(false);
        } else {
          // Scrolling up
          setShowNav(true);
        }
        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  const handleDropdownToggle = (dropdown, hasSubItems) => (e) => {
    if (!hasSubItems) return;
    
    const isChevronClick = e.target.closest('.chevron-container') !== null;
    const isMobile = window.innerWidth < 1024;

    if (isMobile || isChevronClick) {
      e.preventDefault();
      e.stopPropagation();
      setOpenDropdown(openDropdown === dropdown ? null : dropdown);
      setOpenSubDropdown(null);
    }
  };

  const handleSubDropdownToggle = (subDropdown, hasSubItems) => (e) => {
    if (!hasSubItems) return;
    
    e.preventDefault();
    e.stopPropagation();
    setOpenSubDropdown(openSubDropdown === subDropdown ? null : subDropdown);
  };

  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
    setOpenSubDropdown(null);
    document.body.style.overflow = "auto";
  };

  const navItems = [
    { label: "Home", path: "/", icon: <Home className="h-4 w-4 mr-2" /> },
    {
      label: "About",
      path: "/about-us",
      icon: <Users className="h-4 w-4 mr-2" />,
    },
    {
      label: "Sports",
      path: "/sports",
      icon: <Trophy className="h-4 w-4 mr-2" />,
      subItems: [
        {
          name: "Indoor Sports",
          href: "/sports/indoor",
          subItems: [
            { name: "Badminton", href: "/sports/indoor/badminton" },
            { name: "Table Tennis", href: "/sports/indoor/table-tennis" },
            { name: "Squash", href: "/sports/indoor/squash" },
            { name: "Gym", href: "/sports/indoor/gym" }
          ]
        },
        {
          name: "Outdoor Sports",
          href: "/sports/outdoor",
          subItems: [
            { name: "Tennis", href: "/sports/outdoor/tennis" },
            { name: "Swimming", href: "/sports/outdoor/swimming" },
            { name: "Basketball", href: "/sports/outdoor/basketball" },
            { name: "Cricket Nets", href: "/sports/outdoor/net-cricket" }
          ]
        }
      ]
    },
    {
      label: "Amenities",
      path: "/amenities",
      icon: <Hotel className="h-4 w-4 mr-2" />,
      subItems: [
        { name: "Billiards & Snooker", href: "/amenities/billiards-and-snooker" },
        { name: "Kids Play Area", href: "/amenities/kids-play-area" },
        { name: "Mini Theatre", href: "/amenities/mini-theatre" },
        { name: "Spa", href: "/amenities/spa" },
        { name: "Wifi Library", href: "/amenities/wifi-library" }
      ]
    },
    {
      label: "Gallery",
      path: "/gallery",
      icon: <Camera className="h-4 w-4 mr-2" />,
    },
    {
      label: "Membership",
      path: "/membership",
      icon: <Users className="h-4 w-4 mr-2" />,
    },
    {
      label: "Affiliations",
      path: "/affiliations",
      icon: <Globe className="h-4 w-4 mr-2" />,
    },
    {
      label: "Events",
      path: "/events",
      icon: <Calendar className="h-4 w-4 mr-2" />,
    },
    {
      label: "Contact",
      path: "/contact",
      icon: <Phone className="h-4 w-4 mr-2" />,
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
        className={`${scrolled ? 'bg-white shadow-sm' : 'bg-transparent'} ${!showNav && 'lg:translate-y-0 -translate-y-full'} transition-transform duration-300`}
        initial={{ padding: "12px 0" }}
        animate={{
          padding: scrolled ? "8px 0" : "12px 0",
          backgroundColor: scrolled ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0)'
        }}
        transition={{ type: "tween", ease: "easeInOut" }}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo - hidden on mobile when scrolling */}
          <motion.a
            href="/"
            className="flex items-center"
            whileHover={{ scale: 1.03 }}
            animate={{ opacity: showNav ? 1 : 0 }}
            transition={{ duration: 0.2 }}
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
                onMouseEnter={() => {
                  setHoveredItem(item.label);
                  if (item.subItems) setOpenDropdown(item.label);
                }}
                onMouseLeave={() => {
                  setHoveredItem(null);
                  if (!openSubDropdown) setOpenDropdown(null);
                }}
              >
                {/* Main nav item */}
                <motion.a
                  href={item.path}
                  className={`flex items-center ${scrolled ? 'text-[#0A2463]' : 'text-white'} hover:text-[#FFC857] transition-colors px-2.5 py-2 font-medium uppercase tracking-wider text-xs sm:text-sm relative`}
                  whileHover={{ scale: 1.05 }}
                >
                  {item.icon}
                  <span className="whitespace-nowrap">{item.label}</span>
                  {item.subItems && (
                    <span
                      className="chevron-container ml-1"
                      onClick={handleDropdownToggle(item.label, true)}
                    >
                      <ChevronDown className={`h-3 w-3 transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`} />
                    </span>
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
                </motion.a>

                {/* First level dropdown */}
                {item.subItems && openDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="absolute left-1/2 transform -translate-x-1/2 mt-1 w-56 bg-white rounded-sm shadow-xl z-50 border border-gray-100 origin-top"
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => {
                      if (!openSubDropdown) setOpenDropdown(null);
                    }}
                  >
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="show"
                      className="py-1"
                    >
                      {item.subItems.map((subItem) => (
                        <div key={subItem.name} className="relative">
                          <motion.a
                            href={subItem.href}
                            onClick={subItem.subItems ? handleSubDropdownToggle(subItem.name, true) : undefined}
                            className={`flex items-center justify-between w-full px-4 py-2 text-xs sm:text-sm text-[#2E4052] hover:bg-[#F8F9FA] hover:text-[#0A2463] transition-colors`}
                            variants={itemVariants}
                            whileHover={{ x: 3 }}
                          >
                            <span>{subItem.name}</span>
                            {subItem.subItems && (
                              <ChevronRight className="h-3 w-3 ml-2" />
                            )}
                          </motion.a>

                          {/* Second level dropdown */}
                          {subItem.subItems && openSubDropdown === subItem.name && (
                            <motion.div
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 10 }}
                              transition={{ type: "spring", stiffness: 300, damping: 25 }}
                              className="absolute left-full top-0 ml-1 w-56 bg-white rounded-sm shadow-xl z-50 border border-gray-100 origin-top"
                              onMouseEnter={() => setOpenSubDropdown(subItem.name)}
                              onMouseLeave={() => setOpenSubDropdown(null)}
                            >
                              <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="show"
                                className="py-1"
                              >
                                {subItem.subItems.map((sport) => (
                                  <motion.a
                                    key={sport.name}
                                    href={sport.href}
                                    className="flex items-center px-4 py-2 text-xs sm:text-sm text-[#2E4052] hover:bg-[#F8F9FA] hover:text-[#0A2463] transition-colors"
                                    variants={itemVariants}
                                    whileHover={{ x: 3 }}
                                  >
                                    {sport.name}
                                  </motion.a>
                                ))}
                              </motion.div>
                            </motion.div>
                          )}
                        </div>
                      ))}
                    </motion.div>
                  </motion.div>
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

          {/* Mobile Menu Button - always visible */}
          <motion.button
            className={`lg:hidden ${scrolled ? 'text-[#0A2463]' : 'text-white'} focus:outline-none`}
            onClick={toggleMenu}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{ 
              opacity: 1,
              translateY: showNav ? 0 : 0 // Keep button visible
            }}
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
                        <div className="flex items-center">
                          <a
                            href={item.path}
                            className="flex-1 flex items-center py-3 text-sm text-[#0A2463] font-medium uppercase tracking-wider"
                            onClick={(e) => {
                              if (!item.subItems) closeAllMenus();
                              else e.preventDefault();
                            }}
                          >
                            {item.icon}
                            <span className="ml-3">{item.label}</span>
                          </a>
                          {item.subItems && (
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                setOpenDropdown(openDropdown === item.label ? null : item.label);
                                setOpenSubDropdown(null);
                              }}
                              className="p-2"
                            >
                              <ChevronDown className={`h-4 w-4 transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`} />
                            </button>
                          )}
                        </div>
                        <AnimatePresence>
                          {openDropdown === item.label && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="pl-10 overflow-hidden"
                              transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            >
                              {item.subItems.map((subItem) => (
                                <div key={subItem.name} className="border-t border-[#F1F1F1]">
                                  {subItem.subItems ? (
                                    <>
                                      <div className="flex items-center">
                                        <a
                                          href={subItem.href}
                                          className="flex-1 block py-2 text-sm text-[#0A2463]"
                                          onClick={(e) => {
                                            e.preventDefault();
                                          }}
                                        >
                                          {subItem.name}
                                        </a>
                                        <button
                                          onClick={(e) => {
                                            e.preventDefault();
                                            setOpenSubDropdown(openSubDropdown === subItem.name ? null : subItem.name);
                                          }}
                                          className="p-2"
                                        >
                                          <ChevronRight className={`h-4 w-4 transition-transform ${openSubDropdown === subItem.name ? "rotate-90" : ""}`} />
                                        </button>
                                      </div>
                                      <AnimatePresence>
                                        {openSubDropdown === subItem.name && (
                                          <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="pl-4 overflow-hidden"
                                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                          >
                                            {subItem.subItems.map((sport) => (
                                              <a
                                                key={sport.name}
                                                href={sport.href}
                                                className="block py-2 text-xs text-[#2E4052] hover:text-[#0A2463] transition-colors border-t border-[#F1F1F1]"
                                                onClick={closeAllMenus}
                                              >
                                                {sport.name}
                                              </a>
                                            ))}
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                    </>
                                  ) : (
                                    <a
                                      href={subItem.href}
                                      className="block py-2 text-xs text-[#2E4052] hover:text-[#0A2463] transition-colors"
                                      onClick={closeAllMenus}
                                    >
                                      {subItem.name}
                                    </a>
                                  )}
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <a
                        href={item.path}
                        className="flex items-center py-3 text-sm text-[#0A2463] font-medium uppercase tracking-wider"
                        onClick={closeAllMenus}
                      >
                        {item.icon}
                        <span className="ml-3">{item.label}</span>
                      </a>
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
                <a
                  href="/membership"
                  className="col-span-2 bg-gradient-to-r from-[#FFC857] to-[#F4A261] text-[#0A2463] px-4 py-2 rounded-sm font-bold uppercase tracking-wider text-center text-sm shadow-md"
                  onClick={closeAllMenus}
                >
                  Join Now
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;