import React from "react";
import "./AdsSection.css";

const ads = [
  { id: 1, image: "/images/ad1.jpg", link: "#" },
  { id: 2, image: "/images/ad2.jpg", link: "#" },
  { id: 3, image: "/images/ad3.jpg", link: "#" },
];

function AdsSection() {
  return (
    <div className="ads-section">
      {ads.map((ad) => (
        <a key={ad.id} href={ad.link} className="ad">
          <img src={ad.image} alt={`Ad ${ad.id}`} />
        </a>
      ))}
    </div>
  );
}

export default AdsSection;
