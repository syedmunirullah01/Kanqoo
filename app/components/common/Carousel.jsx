"use client";
import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import "../../../app/embla.css";

const SLIDES = [
  { src: "https://images.unsplash.com/photo-1522725539107-ed9cef5284d1?q=80&w=558&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Slide 1" },
  { src: "https://plus.unsplash.com/premium_photo-1664392193006-217f3ce4e2ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y3JlYXRvcnxlbnwwfDJ8MHx8fDA%3D", alt: "Slide 2" },
  { src: "https://plus.unsplash.com/premium_photo-1723600948888-cd98f71913a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGNyZWF0b3J8ZW58MHwyfDB8fHww", alt: "Slide 3" },
];

export default function Carousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, dragFree: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);
    return () => {
      clearInterval(interval);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="embla mt-8">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {SLIDES.map((slide, idx) => (
            <div
              className={`embla__slide carousel-card${selectedIndex === idx ? " is-selected" : ""}`}
              key={idx}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                width={320}
                height={190}
                className="embla__slide__img"
                priority
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}