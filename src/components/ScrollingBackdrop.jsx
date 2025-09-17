import React, { useEffect, useState } from "react";
import "./ScrollingBackdrop.css";
import { auth, BASE_URL } from "../data/allapi";

const ScrollingBackdrop = () => {
  const [images, setImages] = useState([]);
  const [videoUrl, setVideoUrl] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${BASE_URL}${auth.getmdeia}`);
        const data = await response.json();

        if (data.images && Array.isArray(data.images)) {
          setImages(data.images.map((img) => img.url));
        }

        if (data.video) {
          setVideoUrl(data.video);
        }
      } catch (error) {
        console.error("Failed to fetch backdrop images", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="backdrop-container">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className={`scrolling-layer ${index % 2 === 0 ? "scroll-left" : "scroll-right"}`}
        >
          <div className="scrolling-images">
            {[...images, ...images].map((src, i) => (
              <img src={src} alt={`bg-${i}`} key={i} />
            ))}
          </div>
        </div>
      ))}

      <div className="video-overlay">
        {videoUrl ? (
          <iframe
            width="720"
            height="405"
            src={videoUrl}
            title="Video player"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        ) : (
          <iframe
            width="720"
            height="405"
            src="https://www.youtube.com/embed/Kh4mnHfup3o?autoplay=1&mute=1&controls=1&loop=1&playlist=Kh4mnHfup3o"
            title="YouTube video player"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        )}
      </div>
    </div>
  );
};

export default ScrollingBackdrop;
