import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import axiosInstance from "../../services/api";

const PartnershipsSection = () => {
  const [logos, setLogos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Fetch logos from API
  useEffect(() => {
    const fetchLogos = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/affiliations/logos');

        if (response.data.success) {
          const logoData = response.data.data;
          setLogos(logoData);
        }
      } catch (err) {
        console.error('Error fetching logos:', err);
        setError('Failed to load partner logos. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchLogos();
  }, []);

  // Check if all images are loaded
  useEffect(() => {
    if (logos.length > 0) {
      const imagePromises = logos.map(logo => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = logo.logo_url;
        });
      });

      Promise.all(imagePromises)
        .then(() => setImagesLoaded(true))
        .catch(() => setImagesLoaded(true)); // Continue even if some images fail
    }
  }, [logos]);

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
      <section className="relative py-20 bg-gray-50 overflow-hidden" id="partnerships">
        <div className="container px-6 mx-auto">
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">{error}</p>
            <motion.button
              onClick={() => window.location.reload()}
              className="bg-[#FFC857] text-[#0A2463] px-6 py-2 rounded-sm font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try Again
            </motion.button>
          </div>
        </div>
      </section>
    );
  }

  if (logos.length === 0) {
    return (
      <section className="relative py-20 bg-gray-50 overflow-hidden" id="partnerships">
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
          <div className="container px-6 mx-auto">
            <div className="text-center py-12">
              <p className="text-gray-600">No partner logos available at the moment.</p>
            </div>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="relative py-20 bg-gray-50 overflow-hidden" id="partnerships">
      {/* Decorative Elements */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.1 }}
        transition={{ delay: 0.5, duration: 1 }}
        viewport={{ once: true }}
        className="absolute top-20 -right-20 w-64 h-64 border-2 border-[#FFC857] rounded-full"
      />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.1 }}
        transition={{ delay: 0.7, duration: 1 }}
        viewport={{ once: true }}
        className="absolute bottom-1/4 -left-20 w-48 h-48 border border-[#0A2463] rounded-full"
      />

      <div className="container px-6 mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 text-[#0A2463]"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            OUR PARTNERS
          </motion.h2>
          <motion.div
            className="w-20 h-1 bg-[#FFC857] mx-auto mb-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          />
          <motion.p
            className="text-lg text-gray-600 max-w-3xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Aligned with the finest brands in sports and luxury
          </motion.p>
        </motion.div>

        {/* Infinite Logo Carousel */}
        <motion.div
          className="relative py-8 overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex">
            {/* Animated container */}
            <div
              className={`flex whitespace-nowrap ${imagesLoaded ? 'animate-marquee' : ''}`}
              style={{
                width: 'max-content',
                animationDuration: `${logos.length * 3}s` // Dynamic duration based on number of logos
              }}
            >
              {/* Original logos */}
              {logos.map((logo, index) => (
                <motion.div
                  key={`original-${logo.id}-${index}`}
                  className="inline-flex flex-shrink-0 px-8 md:px-12 lg:px-16"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className="h-20 w-32 md:h-24 md:w-40 flex items-center justify-center">
                    <img
                      src={logo.logo_url}
                      alt={logo.name}
                      className="max-h-16 md:max-h-20 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                      style={{
                        filter: "grayscale(30%)",
                        transition: "filter 0.3s ease"
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                      onLoad={() => {
                        if (index === logos.length - 1) {
                          setImagesLoaded(true);
                        }
                      }}
                    />
                  </div>
                </motion.div>
              ))}

              {/* Duplicated logos for seamless loop */}
              {logos.map((logo, index) => (
                <motion.div
                  key={`duplicate-${logo.id}-${index}`}
                  className="inline-flex flex-shrink-0 px-8 md:px-12 lg:px-16"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: (logos.length + index) * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className="h-20 w-32 md:h-24 md:w-40 flex items-center justify-center">
                    <img
                      src={logo.logo_url}
                      alt={logo.name}
                      className="max-h-16 md:max-h-20 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                      style={{
                        filter: "grayscale(30%)",
                        transition: "filter 0.3s ease"
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="group text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="/affiliations"
            className="inline-flex items-center text-[#0A2463] group-hover:text-[#FFC857] transition-colors font-medium group"
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
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-marquee {
          animation: marquee linear infinite;
        }
      `}</style>
    </section>
  );
};

export default PartnershipsSection;