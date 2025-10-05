import { Button } from "@/components/ui/button";
import { ChevronDown, Mail, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { useNewsStore } from '@/store/useNewsStore';
import { useNavigate } from "react-router-dom";

const MediaCoverage = () => {
  const navigate = useNavigate();
  const { news, fetchNews, loading, error } = useNewsStore();
  
  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center">Error: {error}</div>;
  if (!news || news.length === 0) return <div className="min-h-screen flex items-center justify-center">No news available</div>;

 const latestNews = news[news.length - 1];

  const otherNews = news.slice(1);

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
        <h1 className="relative text-cml-orange text-4xl sm:text-5xl md:text-6xl font-bold text-center">
          MEDIA <span className="text-white">COVERAGE</span>
        </h1>
      </section>

      <div className="p-6 md:p-16 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Left Column - Latest News */}
          <div className="bg-gray-200 p-6 rounded-lg">
            <h2 className="text-3xl font-bold text-center md:text-start mb-6">
              <span className="text-cml-orange">LATEST</span> NEWS
            </h2>
            <div className="text-sm mb-2 font-semibold text-cml-black">
              {new Date(latestNews.date).toLocaleDateString("en-GB")}
            </div>
            <h3 className="font-semibold text-cml-green text-xl mb-3 leading-tight">
              {latestNews.title}
            </h3>
            <p className="text-gray-600 text-base leading-relaxed mb-6">
              {latestNews.description}
            </p>
             <div className="prose prose-gray max-w-none mt-10">
          {latestNews?.desc && latestNews.desc.map((paragraph, index) => (
            <p key={index} className="mb-4 text-gray-700 leading-relaxed text-base">
              {paragraph}
            </p>
          ))}
        </div>
          </div>

          {/* Right Column - Other News Grid */}
          <div className="space-y-4">
            {otherNews.reverse().map((item) => (
              <div 
                key={item.id}
                className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow group border border-gray-100"
              >
                <div className="flex-1">
                  <div className="text-sm mb-2 font-semibold text-cml-black">
                    {new Date(item.date).toLocaleDateString("en-GB")}
                  </div>
                  <h3 className="font-semibold text-cml-green mb-2 leading-tight group-hover:text-green-700 transition-colors">
                    {item.title}
                  </h3>
                  <button 
                    onClick={() => navigate(`/NewsArticle/${item.id}`)} 
                    className="text-cml-green hover:text-green-700 text-sm font-medium transition-colors underline"
                  >
                    Read more
                  </button>
                </div>
                <div className="flex-shrink-0">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-24 h-20 object-cover rounded"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaCoverage;