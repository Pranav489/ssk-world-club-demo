// components/DownloadPDFButton.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import axiosInstance from '../../services/api';

const DownloadPDFButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDownload = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axiosInstance.get('/affiliations/pdf', {
        responseType: 'blob'
      });

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `club-affiliations-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
    } catch (err) {
      console.error('Download error:', err);
      setError(err.response?.data?.message || 'Failed to download PDF');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-end">
      <motion.button
        onClick={handleDownload}
        disabled={isLoading}
        className="bg-[#0A2463] text-white px-6 py-3 rounded-sm font-bold uppercase tracking-wider hover:bg-[#0A2463]/90 disabled:opacity-50 flex items-center gap-2 transition-colors"
        whileHover={!isLoading ? { scale: 1.05 } : {}}
        whileTap={!isLoading ? { scale: 0.98 } : {}}
      >
        {isLoading ? (
          <>
            <div className="relative flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-[#0A2463]/90 rounded-full"></div>
              <div className="w-5 h-5 border-2 border-[#FFC857] border-t-transparent rounded-full absolute top-0 left-0 animate-spin"></div>
            </div>
            Generating PDF...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download PDF
          </>
        )}
      </motion.button>
      
      {error && (
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm mt-2 bg-red-50 p-2 rounded"
        >
          Error: {error}
        </motion.p>
      )}
    </div>
  );
};

export default DownloadPDFButton;