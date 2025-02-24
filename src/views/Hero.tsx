import React from "react";

export default function Hero() {
  const videoSrc = "/videos/particles_logo_1.mp4"
  return (
    <section className="h-screen bg-black overflow-hidden">
      <div className="flex justify-center items-start h-full">
        <video 
          className="w-full h-full sm:h-screen object-cover"
          src={videoSrc}
          autoPlay
          loop
          muted
          controls={false}
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
}
