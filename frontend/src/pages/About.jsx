import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Welcome to Vivera Style, where fashion meets individuality. Our
            mission is to craft unique, high-quality designs that empower you to
            express your personality through every outfit.
          </p>
          <p>
            Founded with a passion for style and a commitment to excellence, we
            pride ourselves on offering collections that cater to every occasion
            – from casual chic to elegant sophistication. Each piece is
            thoughtfully designed to blend comfort, durability, and trendsetting
            aesthetics, ensuring you look and feel your best every day.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            At Vivera Style, our mission is to empower individuals to express
            their unique identities through fashion. We are dedicated to
            creating high-quality, stylish, and inclusive clothing that inspires
            confidence and celebrates diversity. With a focus on innovation,
            sustainability, and exceptional customer experiences, we strive to
            redefine how fashion enhances everyday life while leaving a positive
            impact on the world.
          </p>
        </div>
      </div>

      <div className=" text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className=" text-gray-600">
            We meticulously select and vet each product to ensure it meets our
            stringent quality standards.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className=" text-gray-600">
            With our user-friendly interface and hassle-free ordering process,
            shopping has never been easier.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className=" text-gray-600">
            Our team of dedicated professionals is here to assist you the way,
            ensuring your satisfaction is our top priority.
          </p>
        </div>
      </div>

      {/* <NewsletterBox/> */}
    </div>
  );
};

export default About;
