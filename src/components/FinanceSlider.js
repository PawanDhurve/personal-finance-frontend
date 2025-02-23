import React from "react";
import "./FinanceSlider.css";

const slides = [
  { id: 1, image: "/images/finance1.jpg", title: "Smart Budgeting" },
  { id: 2, image: "/images/finance2.jpg", title: "Investment Tips" },
  { id: 3, image: "/images/finance3.jpg", title: "Save More Money" },
];

function FinanceSlider() {
  return (
    <div className="slider-container">
      <div className="slides">
        {slides.map((slide) => (
          <div key={slide.id} className="slide">
            <img src={slide.image} alt={slide.title} />
            <h3>{slide.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FinanceSlider;
