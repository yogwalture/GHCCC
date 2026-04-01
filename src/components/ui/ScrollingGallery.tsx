import React from 'react';

const images = [
  "https://storage.googleapis.com/aistudio-user-content/0-1a61361b-90c0-48e0-a541-60a611765c92.jpeg",
  "https://storage.googleapis.com/aistudio-user-content/1-1a61361b-90c0-48e0-a541-60a611765c92.jpeg",
  "https://storage.googleapis.com/aistudio-user-content/2-1a61361b-90c0-48e0-a541-60a611765c92.jpeg",
  "https://storage.googleapis.com/aistudio-user-content/3-1a61361b-90c0-48e0-a541-60a611765c92.jpeg",
  "https://storage.googleapis.com/aistudio-user-content/4-1a61361b-90c0-48e0-a541-60a611765c92.jpeg",
  "https://storage.googleapis.com/aistudio-user-content/5-1a61361b-90c0-48e0-a541-60a611765c92.jpeg",
  "https://storage.googleapis.com/aistudio-user-content/6-1a61361b-90c0-48e0-a541-60a611765c92.jpeg",
  "https://storage.googleapis.com/aistudio-user-content/7-1a61361b-90c0-48e0-a541-60a611765c92.jpeg",
  "https://storage.googleapis.com/aistudio-user-content/8-1a61361b-90c0-48e0-a541-60a611765c92.jpeg",
  "https://storage.googleapis.com/aistudio-user-content/9-1a61361b-90c0-48e0-a541-60a611765c92.jpeg",
  "https://storage.googleapis.com/aistudio-user-content/10-1a61361b-90c0-48e0-a541-60a611765c92.jpeg",
  "https://storage.googleapis.com/aistudio-user-content/11-1a61361b-90c0-48e0-a541-60a611765c92.jpeg",
  "https://storage.googleapis.com/aistudio-user-content/12-1a61361b-90c0-48e0-a541-60a611765c92.jpeg",
];

export function ScrollingGallery() {
  return (
    <div className="w-full overflow-hidden bg-white py-12">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Our Facilities</h2>
        <p className="mt-4 text-lg text-gray-600">A glimpse into our state-of-the-art infrastructure</p>
      </div>
      
      <div className="relative flex w-full overflow-hidden">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {/* First set of images */}
          <div className="flex gap-4 px-2">
            {images.map((src, index) => (
              <div key={`first-${index}`} className="relative h-64 w-96 flex-none overflow-hidden rounded-xl shadow-md">
                <img
                  src={src}
                  alt={`Hospital facility ${index + 1}`}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
          {/* Second set of images for seamless loop */}
          <div className="flex gap-4 px-2">
            {images.map((src, index) => (
              <div key={`second-${index}`} className="relative h-64 w-96 flex-none overflow-hidden rounded-xl shadow-md">
                <img
                  src={src}
                  alt={`Hospital facility ${index + 1}`}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
