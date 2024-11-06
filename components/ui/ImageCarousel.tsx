import React, { MouseEvent, useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { FaCircle, FaCircleDot } from 'react-icons/fa6';

interface ShortScreenshots {
  id: number;
  image: string;
}

const ImageCarousel = ({ short_screenshots }: { short_screenshots: ShortScreenshots[] }) => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mouseX, setMouseX] = useState(0);

  // Mouse hareketi ile index'i güncelleme
  const handleMouseMove = (e: MouseEvent) => {
    setMouseX(e.clientX);
  };

  // Carousel geçişini sağlamak için fonksiyon
  const updateIndexBasedOnMouse = () => {
    if (!divRef.current) return;

    const rect = divRef.current.getBoundingClientRect(); // Div'in ekran koordinatları
    const relativeX = mouseX - rect.left; // Mouse hareketinin div'in içindeki x pozisyonu
    console.log(relativeX)
    // Ekranın sağ ve sol tarafındaki pozisyonlara göre geçişi yapıyoruz
    const newIndex = Math.floor((relativeX / rect.width) * short_screenshots.length);
    setCurrentIndex(Math.min(Math.max(newIndex, 0), short_screenshots.length - 1));
  };

  // Mouse hareketi sonrasında index'i güncelle
  useEffect(() => {
    updateIndexBasedOnMouse();
  }, [mouseX]);

  return (
    <div
      className="relative h-48 sm:h-72 md:h-44 lg:h-48 xl:h-56 w-full"
      onMouseMove={handleMouseMove} // Mouse hareketini takip et
      ref={divRef}
    >
      <Image
        src={short_screenshots[currentIndex]?.image || '/placeholder.png'}
        alt={`gallery-${currentIndex}`}
        fill
        objectFit="cover"
        className="rounded-t-lg transition-all duration-500 ease-in-out"
      />
      <div className="absolute bottom-2 justify-center items-end left-1/2 transform -translate-x-1/2 text-4 flex">
        {short_screenshots.map((image, index) => (
          <div key={image.id} className="mx-1">
            {index === currentIndex ? (
              <FaCircle size={24} />
            ) : (
              <FaCircleDot size={16} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
