import { useEffect,useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { affiliated_logo, affiliated_logo1, affiliated_logo2, affiliated_logo3, affiliated_logo4, affiliated_logo5, affiliated_logo6, affiliated_logo7 } from "../../assets";
import axiosInstance from "../../services/api";

const PartnershipsSection = () => {
  const [logos, setLogos] = useState([]);
  const [doubledLogos, setDoubledLogos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch logos from API
  useEffect(() => {
    const fetchLogos = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/affiliations/logos');
        
        if (response.data.success) {
          const logoData = response.data.data;
          setLogos(logoData);
          // Double the array for seamless looping
          setDoubledLogos([...logoData, ...logoData]);
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

  if (loading) {
    return (
      <section className="relative py-20 bg-gray-50 overflow-hidden" id="partnerships">
        <div className="container px-6 mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFC857] mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading partners...</p>
          </div>
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
            <button
              onClick={() => window.location.reload()}
              className="bg-[#FFC857] text-[#0A2463] px-6 py-2 rounded-sm font-bold"
            >
              Try Again
            </button>
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
                key={`${logo.id}-${index}`}
                className="flex-shrink-0 px-10 hover:scale-105 transition-transform duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <div className="h-32 w-48 flex items-center justify-center">
                  <img
                    src={logo.logo_url}
                    alt={logo.name}
                    className="max-h-40 object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
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
          className="group text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="/affiliations"
            className="inline-flex items-center text-[#0A2463] group-hover:text-[#FFC857] transition-colors font-medium group"
          // whileHover={{ x: 5 }}
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