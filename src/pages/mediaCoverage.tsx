
import { Button } from "@/components/ui/button";
import { ChevronDown, Mail, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import  {useNewsStore } from '@/store/useNewsStore';
import { useNavigate } from "react-router-dom";

interface NewsEvent {
  id: number;
  date: string;
  time: string;
  title: string;
  description: string;
  image: string;
  readMoreUrl: string;
}

const MediaCoverage = () => {

     const navigate = useNavigate();
     const { news, fetchNews, loading, error } = useNewsStore();
  
    useEffect(() => {
      fetchNews();
    }, [fetchNews]);




  return (
    <div className="min-h-screen">

      {/* Hero Section */}
      <section
        className="relative h-64 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('/2487984edae468540f569b057a9d6ca7c30142ac(2).jpg')",
        }}
      >
        {/* Gradient + Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-cml-green/80 to-cml-green/60">
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Heading */}
        <h1 className="relative text-cml-orange text-4xl sm:text-5xl md:text-6xl font-bold  text-center">
          MEDIA <span className="text-white">COVERAGE</span>
        </h1>
      </section>

      <div className="p-6 md:p-16 bg-white grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left Column - Description */}
        <div className="bg-gray-200 p-5">
          <h2 className="text-body-header text-center md:text-start mb-6">
            <span className="text-cml-orange">LATEST</span> NEWS
          </h2>
          <div className="text-sm  mb-2 font-semibold text-cml-black">
               {new Date(news[0]?.date).toLocaleDateString("en-GB")}
          </div>
          <h3 className="font-semibold text-cml-green mb-2 leading-tight group-hover:text-cml-green transition-colors">
            {news[0]?.title}
          </h3>
          <p className="text-gray-600 text-lg leading-relaxed mb-8  md:block">
            {news[0]?.description}

          </p>
          <button className="text-cml-orange hover:text-orange-600 font-semibold underline transition-colors  md:block" onClick={() => navigate(`/NewsArticle/${news[0].id}`)}>
            Read more
          </button>
        </div>




        {/* News Container */}


        {news.map((item) => (

          <div className="flex items-start gap-2 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex-1">
              <div className="text-sm  mb-2 font-semibold text-cml-black">
                  {new Date(item.date).toLocaleDateString("en-GB")}
              </div>
              <h3 className="font-semibold text-cml-green mb-2 leading-tight group-hover:text-cml-green transition-colors">
                {item.title}
              </h3>
              <button onClick={() => navigate(`/NewsArticle/${item.id}`)} className="text-cml-green hover:text-green-700 text-sm font-medium transition-colors">
                Read more
              </button>
            </div>
            <div className="flex-shrink-0">
              <img
                src={item.images[0]}
                alt={item.title}
                className="w-20 h-16 object-cover rounded"
              />
            </div>
          </div>

        ))}





      </div>






    </div>
  );
};

export default MediaCoverage;
