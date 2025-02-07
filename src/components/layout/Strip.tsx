"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { client } from '@/lib/sanityClient';

export interface HomeImage {
  stripTexts: string[];
}

const getStripText = async () => {
  const res = await client.fetch(`*[_type=="general" && type=="Strip texts" && !(_id in path("drafts.**"))] {
      stripTexts
    }`);
  return res;
};

export default function Strip() {
  const [messages, setMessages] = useState<HomeImage>({ stripTexts: [] });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getStripText();
      // console.log(data[0]);
      if (data && data.length > 0) {
        setMessages(data[0]);
      }
    };
    fetchData();
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.stripTexts.length);
    resetInterval();
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + messages.stripTexts.length) % messages.stripTexts.length);
    resetInterval();
  };

  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    startInterval();
  };

  const startInterval = () => {
    if (messages.stripTexts.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.stripTexts.length);
      }, 5000);
    }
  };

  useEffect(() => {
    if (messages.stripTexts.length > 0) {
      startInterval();
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [messages.stripTexts]);

  return (
    <div className="flex items-center justify-between sm:justify-center bg-white text-black py-0 px-6 shadow-md max-w-full">
      {/* Previous Button */}
      <button
        className="py-2 text-gray-500 hover:text-black transition duration-300"
        onClick={handlePrev}
        aria-label="Previous"
      >
        <ChevronLeft className="w-5 h-5 text-black" />
      </button>

      {/* Message */}
      <div className=" text-center text-sm sm:text-base font-semibold transition duration-300 sm:min-w-[400px]">
        {messages.stripTexts[currentIndex]}
      </div>

      {/* Next Button */}
      <button
        className="py-2 text-gray-500 hover:text-black transition duration-300"
        onClick={handleNext}
        aria-label="Next"
      >
        <ChevronRight className="w-5 h-5 text-black" />
      </button>
    </div>
  );
};