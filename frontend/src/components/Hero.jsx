import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import "./hero.css";

const Hero = () => {
  const images = [
    assets.hero_img, // Replace with your image paths
    assets.p_img2_1, // Example: Additional images
    assets.p_img3,
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  // Change image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // 3 seconds interval
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [images.length]);

  return (
    // <div className='flex flex-col sm:flex-row border border-gray-400'>
    <div className="hero-container flex flex-col sm:flex-row border border-gray-400">
      {/* Hero Left Side */}
      {/* <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
            <div className='text-[#414141]'>
                <div className='flex items-center gap-2'>
                    <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                    <p className=' font-medium text-sm md:text-base'>OUR BESTSELLERS</p>
                </div>
                <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Latest Arrivals</h1>
                <div className='flex items-center gap-2'>
                    <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
                    <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
                </div>
            </div>
      </div> */}
      <div className="w-full sm:w-1/2  flex items-center justify-center py-10 sm:py-0">
        <div className="text-[#414141]">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            <p className="font-medium text-sm md:text-base">
              Life Isn't perfect But
            </p>
          </div>
          <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed">
            Your OutFit Can be
          </h1>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm md:text-base">VIVERA STYLE</p>
            <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
          </div>
        </div>
      </div>
      {/* Hero Right Side with Image Slider */}
      <div className="w-full sm:w-1/2 relative h-[300px] sm:h-auto overflow-hidden">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index}`}
            className={`absolute top-0 left-0 w-full h-full object-cover  object-top transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          />
        ))}
      </div>
      {/* Hero Right Side */}
      {/* <img className="w-full sm:w-1/2" src={assets.hero_img} alt="" /> */}
    </div>
  );
};

export default Hero;
