"use client";

import React, { useEffect, useRef } from "react";
// import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SparklesCore } from "../components/ui/sparkles";
import { Button as AcButton } from "../components/ui/moving-border";
import Image from "next/image";

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="w-full pt-36 md:pt-48 pb-10 overflow-hidden">
      <div className="space-y-6 text-center">
        <div className="space-y-6 mx-auto">
          <div className="h-[40rem] w-full  flex flex-col items-center justify-center overflow-hidden rounded-md">
            <h1 className="text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl gradient-title animate-gradient">
              Your AI Career Coach for
              <br />
              Professional Success
            </h1>
            <div className="w-[40rem] h-40 relative">
              {/* Gradients */}
              <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
              <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
              <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
              <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

              {/* Core component */}
              {/* <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={1200}
                className="w-full h-full 
    [mask-image:linear-gradient(to top, transparent, white 50%, #050505)] 
    [mask-image:radial-gradient(600px_300px_at_bottom, #050505 10%, transparent)] 
    rounded-b-2xl overflow-hidden"
                particleColor="#FFFFFF"
              /> */}

              {/* Radial Gradient to prevent sharp edges */}
              {/* <div
                className="absolute inset-0 w-full h-full bg-[#0A0A0A] bg-opacity-30 rounded-b-[2rem] 
  [mask-image:linear-gradient(to bottom, transparent, white 60%, #050505)] 
  [mask-image:radial-gradient(600px_300px_at_bottom, white 20%, transparent)] rounded-b-2xl overflow-hidden"
              ></div> */}
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl mt-14">
                Advance your career with personalized guidance, interview prep,
                and AI-powered tools for job success.
              </p>
              <div className="flex justify-center space-x-4 mt-10">
                <Link href="/dashboard">
                  <AcButton
                    borderRadius="1.5rem"
                    className="bg-white dark:bg-slate-900 text-black dark:text-white border border-neutral-200 dark:border-slate-800 rounded-lg px-5 py-2"
                  >
                    Get Started
                  </AcButton>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="hero-image-wrapper mt-5 md:mt-0">
          <div ref={imageRef} className="hero-image">
            <Image
              src="/banner.jpeg"
              width={1280}
              height={720}
              alt="Dashboard Preview"
              className="rounded-lg shadow-2xl border mx-auto"
              priority
            />
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default HeroSection;
