import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// Mock data for the article
const articleData = {
  title: "FLOOD AFFECTED WEAVERS SEEING A NEW DAWN IN ASSAM'S LAKHIMPUR DISTRICT",
  author: "TNM NewsDesk",
  publishDate: "Apr 30, 2018",
  mainImage: "news.png",
  sideImages: [
    "news.png",
    "news.png",
    "news.png"
  ],
  content: [
    "Jyotiprava Lagachu, from a remote Matmora village in Assam's Lakhimpur district, almost gave up weaving which was a source of livelihood for her family. She was fed up, because, the earning was less, and top of that, the annual flood would destroy everything in her locality.",
    "For Jyotiprava, the scenario changed drastically once she underwent a skill upgradation programme in their neighbourhood. \"Life was pretty difficult with the less earning. In spite of the earlier work in weaving, I could hardly earn around Rs 2,500 a month. My husband also had to go out for work to increase the family earning\" said 28-year old Lagachu.",
    "Most of the villagers are devastated by the floods. Many in the neighbourhood have shifted to other places and the rest struggled to live. The agri-based villagers, with no option for livelihood, started migrating to other parts to work as daily wage earner and the womenfolk of the sand deposited area endeavoured for livelihood in the traditional loom sets under their tilted house.",
    "Moreover, exploitation of middleman was another problem which was making their lives miserable.",
    "Lagachu was one of the lucky individuals to be a part of a skill upgrade programme in 2015 by Centre for Microfinance and Livelihood-Tata Trusts and Mising Autonomous Council in Matmora.",
    "Around 150 village women from three clusters in that locality were trained on the usage of fly shuttle loom and also quality production, promotion and marketing. \"I was fighting to fulfil the basic needs of my family. So, I was very keen to learn about the new handloom technologies and was very eager to be a part of the project. After the training, I realised it was the best thing to happen,\" Lagachu said.",
    "Shifting from throw shuttle to fly shuttle loom enabled her to produce quality items but her production capacity also increased by three times. With the production of silk items, at present she is earning from Rs 12,000 to 18,000 a month.",
    "Her husband Kishore Lagachu who once migrated in search of work has now returned home and is helping her in the weaving activity. Her children are getting education in a private school.",
    "Chatra Medok, the programme manager said that they are also focusing on new designs and marketing aspects."
  ]
};

// Mock data for media outreach section
const mediaOutreachData = [
  {
    id: 1,
    title: "New methodology changing the fate of Majuli Farmers",
    image: "news.png"
  },
  {
    id: 2,
    title: "New methodology changing the fate of Majuli Farmers",
    image: "news.png"
  },
  {
    id: 3,
    title: "New methodology changing the fate of Majuli Farmers", 
    image: "news.png"
  },
  {
    id: 4,
    title: "New methodology changing the fate of Majuli Farmers",
    image: "news.png"
  }
];

const NewsArticleComponent = () => {


  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 ">
        
        {/* Article Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-cml-black mb-4 leading-tight">
            {articleData.title}
          </h1>
          
          <div className="text-gray-600 mb-6">
            <span>Written By: <span className="font-semibold">{articleData.author}</span></span>
            <span className="mx-2">|</span>
            <span>Published on: <span className="font-semibold">{articleData.publishDate}</span></span>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Main Article */}
          <div className="lg:col-span-2">
            {/* Main Image */}
            <div className="mb-6">
              <img
                src={articleData.mainImage}
                alt="Main article image"
                className="w-full h-auto rounded-lg shadow-sm"
              />
            </div>
            
            {/* Article Content */}
            <div className="prose prose-gray max-w-none">
              {articleData.content.map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-700 leading-relaxed text-base">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Right Column - Side Images */}
          <div className="lg:col-span-1">
            <div className="space-y-4">
              {articleData.sideImages.map((image, index) => (
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
          {mediaOutreachData.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="bg-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
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
          ))}
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