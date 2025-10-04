import { useEffect } from "react";
import usePartnerStore from "@/store/ourPartnerStore";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const PartnersSection = () => {
  const { partners, fetchPartners, loading, error } = usePartnerStore();

  useEffect(() => {
    fetchPartners();
  }, [fetchPartners]);
    
  const fallbackPartners = [
    { title: "SBI", image: "/ourPatnars/sbi.jpg" },
    { title: "TCP", image: "/ourPatnars/tcp.jpg" },
    { title: "ILRI", image: "/ourPatnars/ilri.jpeg" },
    { title: "SBI", image: "/ourPatnars/sbi.jpg" },
    { title: "TCP", image: "/ourPatnars/tcp.jpg" },
    { title: "ILRI", image: "/ourPatnars/ilri.jpeg" },
   
  ];

  const displayPartners = partners && partners.length > 0 ? partners : fallbackPartners;

  return (
    <section className="py-4 bg-white ">
      <div className="container mx-auto ">
        <div className="text-center mb-6">
          <h2 className="  text-body-header mb-4">
            OUR <span className="text-cml-orange">PARTNERS</span>
          </h2>
        </div>

        <div className="relative">
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={2}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            speed={1000}
            navigation={{
              nextEl: '.partners-button-next',
              prevEl: '.partners-button-prev',
            }}
            pagination={{
              clickable: true,
              el: '.partners-pagination',
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
              1280: {
                slidesPerView: 5,
                spaceBetween: 50,
              },
            }}
            className="partners-swiper"
          >
            {displayPartners.map((partner, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col items-center space-y-2 hover:transform hover:scale-105 transition-transform duration-300">
                  <div className="h-20 md:h-36 w-auto flex items-center justify-center  rounded-lg shadow-sm">
                    <img
                      src={partner.image}
                      alt={partner.title}
                      className="max-h-full max-w-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <p className="hidden md:block md:text-[22px] font-semibold text-center text-cml-black">
                    {partner.title.toUpperCase()}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

  
        </div>

        {/* Custom Pagination */}
        {/* <div className="partners-pagination flex justify-center mt-8 space-x-2"></div> */}
      </div>

      {/* <style jsx>{`
        .partners-swiper .swiper-pagination-bullet {
          background-color: #ccc;
          opacity: 0.5;
        }
        .partners-swiper .swiper-pagination-bullet-active {
          background-color: var(--cml-orange, #ff6b35);
          opacity: 1;
        }
      `}</style> */}
    </section>
  );
};

export default PartnersSection;