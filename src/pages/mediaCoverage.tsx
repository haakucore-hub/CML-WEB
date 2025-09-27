
import { Button } from "@/components/ui/button";
import { ChevronDown, Mail, Phone } from "lucide-react";
import { useState } from "react";

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

  const newsEvents: NewsEvent[] = [
    {
      id: 1,
      date: "4/8/2024",
      time: "12:35 PM",
      title: "First field visit after joining as a State Head for Assam; Pradipta Mandal shares his experience",
      description: "Comprehensive overview of the field visit and insights shared by the new State Head",
      image: "813da84aae9a5bd0670eea142fba75c5f6656133.png",
      readMoreUrl: "#"
    },
    {
      id: 2,
      date: "4/8/2024",
      time: "12:35 PM",
      title: "Meghalaya Baby League concludes in high spirits",
      description: "Annual sports event brings together young athletes from across the region",
      image: "813da84aae9a5bd0670eea142fba75c5f6656133.png",
      readMoreUrl: "#"
    },
    {
      id: 3,
      date: "4/8/2024",
      time: "12:35 PM",
      title: "Water filters were distributed to curb the water borne diseases in Ujjan Maidan village in Tulashikhar block of Tripura",
      description: "Community health initiative providing clean water access to rural households",
      image: "813da84aae9a5bd0670eea142fba75c5f6656133.png",
      readMoreUrl: "#"
    },
    {
      id: 4,
      date: "4/8/2024",
      time: "12:35 PM",
      title: "Agricultural training workshop held in remote villages of Manipur",
      description: "Farmers learn sustainable farming techniques and modern agricultural practices",
      image: "813da84aae9a5bd0670eea142fba75c5f6656133.png",
      readMoreUrl: "#"
    },
    {
      id: 5,
      date: "3/8/2024",
      time: "10:20 AM",
      title: "Women's self-help group meeting creates new opportunities for rural entrepreneurs",
      description: "Empowering women through microfinance and skill development programs",
      image: "813da84aae9a5bd0670eea142fba75c5f6656133.png",
      readMoreUrl: "#"
    }
  ];



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
            {newsEvents[1].date} | {newsEvents[1].time}
          </div>
          <h3 className="font-semibold text-cml-green mb-2 leading-tight group-hover:text-cml-green transition-colors">
            {newsEvents[1].title}
          </h3>
          <p className="text-gray-600 text-lg leading-relaxed mb-8  md:block">
            {newsEvents[1].description}

          </p>
          <button className="text-cml-orange hover:text-orange-600 font-semibold underline transition-colors  md:block">
            Read more
          </button>
        </div>




        {/* News Container */}


        {newsEvents.map((item) => (

          <div className="flex items-start gap-2 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex-1">
              <div className="text-sm  mb-2 font-semibold text-cml-black">
                {item.date} | {item.time}
              </div>
              <h3 className="font-semibold text-cml-green mb-2 leading-tight group-hover:text-cml-green transition-colors">
                {item.title}
              </h3>
              <button className="text-cml-green hover:text-green-700 text-sm font-medium transition-colors">
                Read more
              </button>
            </div>
            <div className="flex-shrink-0">
              <img
                src={item.image}
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
