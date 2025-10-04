import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect } from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import useAwardStore from '@/store/useAwardStore';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Award {
  id: number;
  title: string;
  description: string;
  year: string;
  image: string;
}

const awards: Award[] = [
  {
    id: 1,
    title: "Certificate of Appreciation",
    description: "Outstanding contribution to rural development and community empowerment",
    year: "2023",
    image: "/api/placeholder/400/300"
  },
  {
    id: 2,
    title: "Certificate of Appreciation", 
    description: "Excellence in microfinance and livelihood enhancement programs",
    year: "2022",
    image: "/api/placeholder/400/300"
  },
  {
    id: 3,
    title: "Certificate of Appreciation",
    description: "Innovation in sustainable agriculture and farmer training initiatives",
    year: "2021",
    image: "/api/placeholder/400/300"
  },
  {
    id: 4,
    title: "Certificate of Appreciation",
    description: "Leadership in women empowerment and skill development",
    year: "2020",
    image: "/api/placeholder/400/300"
  },
  {
    id: 5,
    title: "Certificate of Appreciation",
    description: "Excellence in community-based healthcare initiatives",
    year: "2019",
    image: "/api/placeholder/400/300"
  }
];

const AwardsSection = () => {
    const { awards, fetchAwards, loading, error } = useAwardStore();

  useEffect(() => {
    fetchAwards();
  }, [fetchAwards]);
  return (
    <section className="py-6 ">
      <div className="container mx-auto ">
        <div className="text-center mb-6">
          <h2 className="text-body-header mb-6">
            <span className="text-cml-orange">AWARDS</span> AND RECOGNITION
          </h2>
        </div>

        <div className="relative">
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            speed={1000}
            navigation={{
              nextEl: '.awards-button-next',
              prevEl: '.awards-button-prev',
            }}
            pagination={{
              clickable: true,
              el: '.awards-pagination',
            }}
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 30 },
              1024: { slidesPerView: 3, spaceBetween: 40 },
              1280: { slidesPerView: 3, spaceBetween: 50 },
            }}
            className="awards-swiper"
          >
            {awards.slice().reverse().map((award) => (
              <SwiperSlide key={award.id}>
                <div className="bg-gray-50 rounded-xl p-2 text-center h-full shadow-lg hover:shadow-xl transition-shadow">
                 <img
                      src={award.image || ''}
                      alt={'dd'}  />
                  
             
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation */}
          <div className="awards-button-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
            <svg className="w-6 h-6 text-cml-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          
          <div className="awards-button-next absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
            <svg className="w-6 h-6 text-cml-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>

     
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;