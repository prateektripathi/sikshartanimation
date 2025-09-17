import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, BASE_URL } from "../data/allapi";

export default function Events() {
  const [eventsData, setEventsData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [flippedCard, setFlippedCard] = useState(null); // ✅ flip state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${BASE_URL}${auth.getallhackathon}`);
        if (!response.ok) throw new Error("Failed to fetch events");
        const data = await response.json();
        setEventsData(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  const filters = ["all", "ongoing", "upcoming", "finished", "hackathon", "techfest", "ideathon"];

  const getStatus = (event) => {
    const now = new Date();
    const start = new Date(event.hackathon_dates.start_date);
    const end = new Date(event.hackathon_dates.end_date);
    if (now < start) return "upcoming";
    else if (now >= start && now <= end) return "ongoing";
    else return "finished";
  };

  const filteredEvents = eventsData.filter((event) => {
    if (selectedFilter === "all") return true;
    if (["ongoing", "upcoming", "finished"].includes(selectedFilter)) {
      return getStatus(event) === selectedFilter;
    }
    if (["hackathon", "techfest", "ideathon"].includes(selectedFilter)) {
      return event.event_type === selectedFilter;
    }
    return false;
  });

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10 max-w-screen-2xl mx-auto font-sans">
      <h1 className="text-5xl font-bold text-center mb-10 tracking-widest">EVENTS</h1>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {filters.map((filter) => (
          <button
            key={filter}
            className={`px-5 py-2 border rounded-md font-medium transition-colors duration-300 tracking-wide
              ${
                selectedFilter === filter
                  ? "bg-white text-black"
                  : "border-white text-white hover:bg-white hover:text-black"
              }`}
            onClick={() => setSelectedFilter(filter)}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      {/* Flip Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {filteredEvents.map((event, index) => {
          const isFlipped = flippedCard === index;
          return (
            <div
              key={event._id}
              className="group [perspective:1000px] cursor-pointer"
              onClick={() => {
                if (window.innerWidth <= 640) {
                  setFlippedCard(isFlipped ? null : index);
                }
              }}
            >
              <div
                className={`relative w-full h-80 duration-500 [transform-style:preserve-3d] ${
                  isFlipped ? "[transform:rotateY(180deg)]" : ""
                } group-hover:[transform:rotateY(180deg)]`}
              >
                {/* Front */}
                <div className="absolute inset-0 [backface-visibility:hidden] bg-[#111] rounded-xl overflow-hidden border border-[#333]">
                  <img
                    src={event.poster_image?.url}
                    alt={event.name}
                    onError={(e) => (e.target.src = "/images/default.jpg")}
                    className="w-full h-[80%] object-cover"
                  />
                  <div className="absolute bottom-0 bg-black bg-opacity-70 w-full text-center py-2">
                    <h3 className="text-md font-semibold">{event.name}</h3>
                  </div>
                </div>

                {/* Back */}
                <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#111] rounded-xl border border-[#333] p-4 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-center mb-2">{event.name}</h3>
                    <p className="text-sm text-gray-300 line-clamp-4 text-center">
                      {event.description}
                    </p>
                  </div>
                  <button
                    className="bg-white text-black py-2 px-4 rounded-md font-medium hover:bg-gray-200 transition mt-4"
                    onClick={(e) => {
                      e.stopPropagation(); // ✅ Prevent card flip on button click
                      navigate(`/eventdetail/${event._id}`);
                    }}
                  >
                    Register Now
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
