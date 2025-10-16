"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";
import { sliderLists } from "../constants";

const Menu = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const contentRef = useRef();

  useGSAP(() => {
    gsap.fromTo(
      "#title",
      {
        opacity: 0,
      },
      { opacity: 1, duration: 1 }
    );

    gsap.fromTo(
      ".cocktail img",
      {
        opacity: 0,
        xPercent: -100,
      },
      { xPercent: 0, opacity: 1, duration: 1, ease: "power1.inOut" }
    );
    gsap.fromTo(
      ".details h2",
      {
        opacity: 0,
        yPercent: 100,
      },
      { yPercent: 0, opacity: 100, duration: 1, ease: "power1.inOut" }
    );
    gsap.fromTo(
      ".details p",
      {
        opacity: 0,
        yPercent: 100,
      },
      { yPercent: 0, opacity: 100, duration: 1, ease: "power1.inOut" }
    );
  }, [currentIndex]);

  const totalSlides = sliderLists.length;

  function goToSlide(index) {
    const newIndex = (index + totalSlides) % totalSlides;

    setCurrentIndex(newIndex);
  }

  function getSlideAt(indexOffset) {
    // console.log("slides", (currentIndex + 1 + totalSlides) % totalSlides);

    return sliderLists[
      (currentIndex + indexOffset + totalSlides) % totalSlides
    ];
  }

  const currentSlide = getSlideAt(0);
  const prevSlide = getSlideAt(-1);
  const nextSlide = getSlideAt(1);
  return (
    <section id="menu" aria-labelledby="menu-heading">
      <img
        src="/images/slider-left-leaf.png"
        alt="left-leaf"
        id="m-left-leaf"
      />
      <img
        src="/images/slider-right-leaf.png"
        alt="right-leaf"
        id="m-right-leaf"
      />

      <h2 id="menu-heading" className="sr-only">
        Cocktail Menu
      </h2>

      <nav className="cocktail-tabs" arail-label="Cocktail Navigation">
        {sliderLists.map((slide, index) => {
          const isActive = index === currentIndex;

          return (
            <button
              key={slide.id}
              className={`${
                isActive
                  ? "text-white border-white"
                  : "text-white/50 border-white/50"
              }`}
              onClick={() => goToSlide(index)}
            >
              {slide.name}
            </button>
          );
        })}
      </nav>

      <div className="content">
        <div className="arrows">
          <button
            className="text-right"
            onClick={() => goToSlide(currentIndex - 1)}
          >
            <span>{prevSlide.name}</span>
            <img
              src="/images/right-arrow.png"
              alt="right-arrow"
              aria-hidden="true"
            />
          </button>
          <button
            className="text-left"
            onClick={() => goToSlide(currentIndex + 1)}
          >
            <span>{nextSlide.name}</span>
            <img
              src="/images/left-arrow.png"
              alt="left-arrow"
              aria-hidden="true"
            />
          </button>
        </div>

        <div className="cocktail">
          <img src={currentSlide.image} alt="" className="object-contain" />
        </div>

        <div className="recipe">
          <div ref={contentRef} className="info">
            <p>Recipe for:</p>
            <p id="title">{currentSlide.name}</p>
          </div>

          <div className="details">
            <h2>{currentSlide.title}</h2>
            <p>{currentSlide.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
