import React, { useState, useEffect } from 'react';
import { IoChevronDownOutline } from 'react-icons/io5';
import clsx from 'clsx';
import { auth, BASE_URL } from '../data/allapi';

const FloatingBubble = ({ delay, size, top, left }) => (
  <div
    className="absolute rounded-full bg-white opacity-10 blur-sm bubble"
    style={{
      animationDelay: `${delay}s`,
      width: `${size}px`,
      height: `${size}px`,
      top: `${top}%`,
      left: `${left}%`,
    }}
  />
);

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  const bubbles = Array.from({ length: 20 }).map(() => ({
    delay: Math.random() * 12,
    size: 6 + Math.random() * 14,
    top: Math.random() * 100,
    left: Math.random() * 100,
  }));

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await fetch(`${BASE_URL}${auth.getallfaqs}`);
     
        const data = await res.json();
        setFaqs(data);
      } catch (err) {
        console.error("Error fetching FAQ:", err);
        setError("Could not load FAQs.");
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  return (
    <div className="relative overflow-hidden bg-black text-white py-24 px-6 md:px-24 z-10">
      {/* Internal Animations */}
      <style>{`
        @keyframes pulseSlow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-30px); }
        }
        @keyframes bubble {
          0% { transform: translateY(0) scale(1); opacity: 0.1; }
          50% { opacity: 0.3; }
          100% { transform: translateY(-800px) scale(1.2); opacity: 0; }
        }
        .animate-pulse-slow {
          animation: pulseSlow 6s ease-in-out infinite;
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: floatSlow 10s ease-in-out infinite;
        }
        .bubble {
          animation: bubble 12s linear infinite;
        }
        .skeleton {
          background: linear-gradient(90deg, #2d2d2d 25%, #3d3d3d 50%, #2d2d2d 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>

      {/* Background Glow Blobs */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full opacity-30 blur-[120px] animate-pulse-slow" />
        <div className="absolute top-[20%] right-[-80px] w-[250px] h-[250px] bg-pink-700 rounded-full opacity-30 blur-[100px] animate-float" />
        <div className="absolute bottom-[-120px] left-[30%] w-[350px] h-[350px] bg-blue-700 rounded-full opacity-20 blur-[160px] animate-float-slow" />
      </div>

      {/* Floating Bubble Particles */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {bubbles.map((bubble, index) => (
          <FloatingBubble key={index} {...bubble} />
        ))}
      </div>

      {/* Title */}
      <h2 className="text-6xl md:text-7xl font-black text-center text-gray-300 mb-16 z-10 relative">
        FAQS
      </h2>

      {/* FAQ Items or Skeletons */}
      <div className="space-y-8 relative z-10">
        {loading && (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="border-b border-gray-700 py-4">
              <div className="h-6 w-3/4 mb-2 skeleton rounded" />
              <div className="h-4 w-1/2 skeleton rounded" />
            </div>
          ))
        )}

        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={faq._id} className="border-b border-gray-700 transition-all duration-300">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center py-4 focus:outline-none"
              >
                <span className="text-lg md:text-xl font-semibold text-left">
                  {faq.question}
                </span>
                <span
                  className={clsx(
                    "flex items-center justify-center w-7 h-7 rounded-full border border-blue-400 text-blue-400 transition-transform duration-300",
                    isOpen && "rotate-180"
                  )}
                >
                  <IoChevronDownOutline size={18} />
                </span>
              </button>

              <div
                className={clsx(
                  "transition-all duration-500 ease-in-out overflow-hidden text-gray-400 pl-1",
                  isOpen ? "max-h-96 opacity-100 mt-2 mb-4" : "max-h-0 opacity-0"
                )}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQ;