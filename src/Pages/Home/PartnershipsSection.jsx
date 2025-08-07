import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8 } from "../../assets";

const PartnershipsSection = () => {
  const logos = [
    logo1,
    logo2,
    logo3,
    logo4,
    logo5,
    logo6,
    logo7,
    logo8
  ];

  // Double the array for seamless looping
  const doubledLogos = [...logos, ...logos];

  return (
    <section 
      className="relative py-20 bg-gray-50 overflow-hidden"
      id="partnerships"
    >
      {/* Decorative Elements */}
      <div className="absolute top-20 -right-20 w-64 h-64 border-2 border-[#FFC857] rounded-full opacity-10" />
      <div className="absolute bottom-1/4 -left-20 w-48 h-48 border border-[#0A2463] rounded-full opacity-10" />

      <div className="container px-6 mx-auto">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0A2463]">
            OUR PARTNERS
          </h2>
          <motion.div 
            className="w-20 h-1 bg-[#FFC857] mx-auto mb-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          />
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Aligned with the finest brands in sports and luxury
          </p>
        </motion.div>

        {/* Infinite Logo Carousel */}
        <div className="relative py-8 overflow-hidden">
          <div className="flex items-center animate-marquee whitespace-nowrap">
            {doubledLogos.map((logo, index) => (
              <motion.div
                key={`${logo}-${index}`}
                className="flex-shrink-0 px-10 hover:scale-105 transition-transform duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <div className="h-32 w-48 flex items-center justify-center">
                  <img 
                    src={logo} 
                    alt="Partner logo" 
                    className="max-h-20 object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" 
                    style={{ 
                      filter: "grayscale(30%)",
                      transition: "filter 0.3s ease"
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="/partnerships"
            className="inline-flex items-center text-[#0A2463] font-medium group"
            whileHover={{ x: 5 }}
          >
            Explore partnership opportunities
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
          </motion.a>
        </motion.div>
      </div>

      {/* CSS Animation for marquee */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 10s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default PartnershipsSection;