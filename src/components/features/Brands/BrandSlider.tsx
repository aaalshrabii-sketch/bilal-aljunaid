'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import brandsData from '@/data/brands.json';

export default function BrandSlider() {
  // مضاعفة البيانات للحصول على تأثير لا نهائي
  const doubledBrands = [...brandsData, ...brandsData];

  return (
    <div className="w-full overflow-hidden py-4">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView={4}
        loop={true}
        autoplay={{
          delay: 1,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
          stopOnLastSlide: false,
        }}
        speed={3000}
        breakpoints={{
          320: { slidesPerView: 2, spaceBetween: 20 },
          640: { slidesPerView: 3, spaceBetween: 25 },
          1024: { slidesPerView: 4, spaceBetween: 30 },
          1280: { slidesPerView: 5, spaceBetween: 30 },
        }}
        className="cursor-grab active:cursor-grabbing"
      >
        {doubledBrands.map((brand, index) => (
          <SwiperSlide key={`${brand.id}-${index}`}>
            <div className="flex items-center justify-center p-4 bg-cards rounded-xl border border-border hover:border-accent/30 transition-all duration-300 h-24">
              <div className="relative w-24 h-12">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  fill
                  className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  sizes="(max-width: 768px) 80px, 120px"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export { BrandSlider };
