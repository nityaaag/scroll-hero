"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef();
  const textRef = useRef();
  const statsRef = useRef();
  const imageRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current.children, {
        opacity: 0,
        y: 50,
        stagger: 0.05,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(statsRef.current.children, {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        delay: 0.5,
        duration: 0.8,
      });

      gsap.to(imageRef.current, {
        y: -200,
        scale: 1.2,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const text = "WELCOME ITZ FIZZ".split("");

  return (
    <section
      ref={heroRef}
      className="h-screen flex flex-col justify-center items-center relative overflow-hidden bg-black text-white"
    >
      <div className="absolute w-[400px] h-[400px] bg-blue-500 opacity-20 blur-3xl rounded-full top-20"></div>

      <h1
        ref={textRef}
        className="text-4xl md:text-6xl tracking-[0.5em] flex flex-wrap justify-center z-10"
      >
        {text.map((char, i) => (
          <span key={i}>{char === " " ? "\u00A0" : char}</span>
        ))}
      </h1>

      <div
        ref={statsRef}
        className="flex gap-10 mt-10 text-center z-10"
      >
        <div>
          <h2 className="text-3xl font-bold text-blue-400">95%</h2>
          <p className="text-sm">User Satisfaction</p>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-blue-400">120K</h2>
          <p className="text-sm">Active Users</p>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-blue-400">4.9★</h2>
          <p className="text-sm">Ratings</p>
        </div>
      </div>

      <img
        ref={imageRef}
        src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
        className="absolute bottom-0 w-[400px] md:w-[600px] object-contain"
        alt="car"
      />
    </section>
  );
}