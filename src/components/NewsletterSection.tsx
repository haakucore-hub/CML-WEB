import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { ArrowUpRight, CloudCog } from "lucide-react"; 
import useNewsletterStore from '@/store/useNewsletterStore';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useEffect } from 'react';

import useOurWorkStore from '@/store/useOurWorkStore';
interface Newsletter {
  id: number;
  title: string;
  subtitle: string;
  coverImage: string;
  downloadUrl: string;
}

const newsletters: Newsletter[] = [
  {
    id: 1,
    title: "CML chronicle",
    subtitle: "Self Help group Mahadivhesan at Gamerimura Village in Boko, Assam",
    coverImage: "81c9c1f299b78597f8a783308b64b933f2af678b.png",
    downloadUrl: "#"
  },
  {
    id: 2,
    title: "CML chronicle",
    subtitle: "Self Help group Mahadivhesan at Gamerimura Village in Boko, Assam",
    coverImage: "81c9c1f299b78597f8a783308b64b933f2af678b.png",
    downloadUrl: "#"
  },
  {
    id: 3,
    title: "CML chronicle",
    subtitle: "Self Help group Mahadivhesan at Gamerimura Village in Boko, Assam",
    coverImage: "81c9c1f299b78597f8a783308b64b933f2af678b.png",
    downloadUrl: "#"
  },
  {
    id: 4,
    title: "CML chronicle",
    subtitle: "Self Help group Mahadivhesan at Gamerimura Village in Boko, Assam",
    coverImage: "81c9c1f299b78597f8a783308b64b933f2af678b.png",
    downloadUrl: "#"
  }
];

const NewsletterSection = () => {

  const { newsLetter, fetchNewsLetter, loading, error } = useNewsletterStore();

  useEffect(() => {
    fetchNewsLetter();

  }, [fetchNewsLetter]);

console.log("Newsletters from store:", newsLetter);

  return (
    <section className="py-6 ">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-body-header mb-6">
            OUR <span className="text-cml-orange">NEWSLETTER</span>
          </h2>
        </div>

        <div className="relative">
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            loop={true}
            speed={1000}
            navigation={{
              nextEl: '.newsletter-button-next',
              prevEl: '.newsletter-button-prev',
            }}
            pagination={{
              clickable: true,
              el: '.newsletter-pagination',
            }}
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 30 },
              1024: { slidesPerView: 3, spaceBetween: 40 },
              1280: { slidesPerView: 4, spaceBetween: 50 },
            }}
            className="newsletter-swiper"
          >
            {newsLetter?.map((newsletter) => (
              <SwiperSlide key={newsletter.id}>
                <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-full group cursor-pointer">
                  <div className="relative">
                    {/* Newsletter Cover Design */}
                    <div className=" bg-gradient-to-br from-white to-gray-100 relative overflow-hidden rounded-t-xl">
                      {/* Header */}
                   
                       <img src={newsletter.thumbnail || ''} alt=""  className='w-full'/>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center px-4">
        {/* <h3 className="text-white  text-[12px] md:text-base mb-2">
          {newsletter.subtitle || ''}
        </h3> */}
        <a
          href={newsletter.pdf}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-white text-sm underline hover:text-gray-200"
        >
          Read now <ArrowUpRight size={14} />
        </a>
      </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation */}
          <div className="newsletter-button-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
            <svg className="w-6 h-6 text-cml-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          
          <div className="newsletter-button-next absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
            <svg className="w-6 h-6 text-cml-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>

          {/* Custom Pagination */}
          <div className="newsletter-pagination flex justify-center mt-8"></div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;