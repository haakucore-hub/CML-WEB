import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useParams } from "react-router-dom";
import { useSingleNewsStore, useNewsStore } from "@/store/useNewsStore";
import { useNavigate } from "react-router-dom";



const NewsArticleComponent = () => {
  const { id } = useParams();
  const { article, fetchNewsById } = useSingleNewsStore();
  const navigate = useNavigate();
  const { news, fetchNews } = useNewsStore();

  useEffect(() => {
    if (id) {
      fetchNewsById(id);
    }
    fetchNews();
  }, [id]);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 ">

        {/* Article Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-cml-black mb-4 leading-tight">
            {article?.title}
          </h1>
          <div className="text-gray-600 mb-6">
            <span>Written By: <span className="font-semibold">{article?.author}</span></span>
            <span className="mx-2">|</span>
            <span>Published on: <span className="font-semibold">{article?.date ? new Date(article.date).toLocaleDateString() : ''}</span></span>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Article */}
          <div className="lg:col-span-2">
            {/* Main Image (first image) */}
            {article?.images && article.images.length > 0 && (
              <div className="mb-6">
                <img
                  src={article.images[0]}
                  alt="Main article image"
                  className="w-full h-auto rounded-lg shadow-sm"
                />
              </div>
            )}
            {/* Article Content */}
            <div className="prose prose-gray max-w-none">
              {article?.desc && article.desc.map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-700 leading-relaxed text-base">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          {/* Right Column - Side Images (rest of images) */}
          <div className="lg:col-span-1">
            <div className="space-y-4">
              {article?.images && article.images.slice(1).map((image, index) => (
                <div key={index} className="overflow-hidden rounded-lg shadow-sm">
                  <img
                    src={image}
                    alt={`Side image ${index + 1}`}
                    className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16">
          {/* Heading */}
          <h2 className="text-3xl font-bold text-cml-black mb-8">
            MEDIA <span className="text-cml-orange">OUTREACH</span>
          </h2>

          {/* Carousel */}
          <div className="relative">
            <Swiper
              modules={[Autoplay, Navigation, Pagination]}
              spaceBetween={20}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              speed={800}
              pagination={{ clickable: true }}
              navigation={{
                prevEl: ".custom-prev",
                nextEl: ".custom-next",
              }}
              breakpoints={{
                320: { slidesPerView: 1 }, // mobile
                640: { slidesPerView: 2 }, // small tablets
                768: { slidesPerView: 3 }, // tablets
                1024: { slidesPerView: 4 }, // desktops
              }}
              className="px-8"
            >
              {news?.map((item) =>
                item.id === id ? null : ( // 👈 skip this slide if id matches
                  <SwiperSlide key={item.id}    onClick={() => navigate(`/NewsArticle/${item.id}`)}>
     
                    <div className="bg-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
                      <div className="relative overflow-hidden">
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-sm font-semibold text-cml-green leading-tight">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </SwiperSlide>
                )
              )}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <button className="custom-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors">
              <ChevronLeft className="w-6 h-6 text-cml-green" />
            </button>

            <button className="custom-next absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors">
              <ChevronRight className="w-6 h-6 text-cml-green" />
            </button>
          </div>
        </div>



      </div>
    </div>
  );
};

export default NewsArticleComponent;