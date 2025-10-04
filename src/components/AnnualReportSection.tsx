import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Link } from "react-router-dom";
import useReportStore from '@/store/useReportStore';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useEffect } from 'react';

interface AnnualReport {
  id: number;
  year: string;
  title: string;
  description: string;
  coverImage: string;
  downloadUrl: string;
}

const reports: AnnualReport[] = [
  {
    id: 1,
    year: "2023-24",
    title: "Annual Report 2023-24",
    description: "Comprehensive overview of our programs, impact, and achievements in the fiscal year 2023-24",
    coverImage: "/api/placeholder/300/400",
    downloadUrl: "#"
  },
  {
    id: 2,
    year: "2022-23",
    title: "Annual Report 2022-23", 
    description: "Detailed insights into our community development initiatives and measurable outcomes",
    coverImage: "/api/placeholder/300/400",
    downloadUrl: "#"
  },
  {
    id: 3,
    year: "2021-22",
    title: "Annual Report 2021-22",
    description: "Showcasing our resilience and continued impact during challenging times",
    coverImage: "/api/placeholder/300/400",
    downloadUrl: "#"
  },
  {
    id: 4,
    year: "2020-21",
    title: "Annual Report 2020-21",
    description: "Highlighting our adaptive strategies and innovative approaches to community development",
    coverImage: "/api/placeholder/300/400", 
    downloadUrl: "#"
  },
  {
    id: 5,
    year: "2019-20",
    title: "Annual Report 2019-20",
    description: "Demonstrating sustained growth and expanding reach across northeastern India",
    coverImage: "/api/placeholder/300/400",
    downloadUrl: "#"
  }
];

const AnnualReportSection = () => {
      const { reports, fetchReports, loading, error } = useReportStore();

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);
  return (
    <section className="py-6 ">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-body-header mb-6">
            <span className="text-cml-orange">ANNUAL</span> REPORT
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
              nextEl: '.reports-button-next',
              prevEl: '.reports-button-prev',
            }}
            pagination={{
              clickable: true,
              el: '.reports-pagination',
            }}
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 30 },
              1024: { slidesPerView: 3, spaceBetween: 40 },
              1280: { slidesPerView: 3, spaceBetween: 50 },
            }}
            className="reports-swiper"
          >
            {reports?.slice().reverse().map((report:any) => (
              <SwiperSlide key={report.id}>
                <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-full group">
                  <div className="relative">
                    <img
                      src={report.thumbnail || ''}
                      alt={'report'}  
                      className='w-full'/>
              
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button 
                        className="bg-cml-orange text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors"
                        onClick={() => window.open(report.pdf, '_blank')}
                      >
                        VIEW REPORT
                      </button>
                    </div>
                  </div>

                 
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

        </div>

        <div className="flex justify-center mt-8">
          <Link
            to="/AnnualReports"
            className="inline-block bg-cml-green text-white text-cta font-semibold px-8 py-3 rounded-full shadow hover:bg-cml-green/90 transition-colors"
            style={{ minWidth: 180, textAlign: 'center' }}
          >
            VIEW MORE
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AnnualReportSection;