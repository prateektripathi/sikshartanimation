import React from "react";

const RefundPolicy = () => {
  return (
    <section className="relative bg-black text-white min-h-screen px-6 md:px-16 py-24 font-sans overflow-hidden">
      {/* --- Animated Background Glow Blobs --- */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute w-[400px] h-[400px] bg-purple-700 rounded-full opacity-20 blur-[180px] top-[-100px] left-[-100px]" />
        <div className="absolute w-[300px] h-[300px] bg-pink-500 rounded-full opacity-10 blur-[160px] top-[40%] right-[-80px]" />
        <div className="absolute w-[350px] h-[350px] bg-blue-500 rounded-full opacity-10 blur-[160px] bottom-[-100px] left-[30%]" />
      </div>

      <div className="max-w-5xl mx-auto space-y-16 relative z-10">
        {/* --- Main Heading --- */}
        <h1 className="text-[48px] md:text-[90px] leading-none uppercase font-extrabold tracking-tight bg-gradient-to-br from-purple-700  to-blue-400 bg-clip-text text-transparent text-center animate-fade-in opacity-20 select-none">
          Refund Policy
        </h1>

        <div className="space-y-12 text-white animate-fade-in-up">
          {/* --- Intro --- */}
          <p className="text-xl md:text-2xl font-light text-gray-300 max-w-3xl mx-auto text-center">
            At <span className="font-semibold text-purple-400">Shikshart</span>, we value your trust and are committed to delivering a quality AI education experience.
          </p>

          {/* --- Policy Sections --- */}
          {[
            {
              title: "Eligibility",
              content:
                "Refunds are applicable only for subscription-based services and programs purchased directly from Shikshart.",
            },
            {
              title: "Request Window",
              content:
                "A refund request must be raised within 3 days of purchase/enrollment. After this period, the amount is non-refundable.",
            },
            {
              title: "Processing Time",
              content:
                "Once approved, the refunded amount will be credited to the customer’s bank account within 3–4 business days.",
            },
            {
              title: "Non-Refundable Services",
              content:
                "One-time workshops, hackathon registrations, and special events are non-refundable.",
            },
            {
              title: "Contact",
              content: (
                <>
                  For any refund-related queries, please email us at{" "}
                  <a
                    href="mailto:support@shikshart.com"
                    className="text-purple-300 underline hover:text-purple-500 transition"
                  >
                    support@shikshart.com
                  </a>
                  .
                </>
              ),
            },
          ].map((section, idx) => (
            <div
              key={idx}
              className="border-t border-gray-700 pt-6 group transition duration-300 hover:border-purple-500"
            >
              <h2 className="text-lg md:text-xl font-semibold uppercase text-purple-400 group-hover:text-purple-300 transition mb-2 tracking-wide">
                {section.title}
              </h2>
              <p className="text-base md:text-lg text-gray-400 leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* --- Custom Animations --- */}
      <style jsx>{`
        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: scale(0.98);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fade-in-up 1.2s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default RefundPolicy;