import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { ChevronUp, ChevronDown } from 'lucide-react';
import  {useNewsStore } from '@/store/useNewsStore';
import { useNavigate } from "react-router-dom";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useEffect } from 'react';

interface NewsEvent {
  id: number;
  date: string;
  time: string;
  title: string;
  description: string;
  image: string;
  readMoreUrl: string;
}

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

const NewsEventsSection = () => {
   const navigate = useNavigate();
   const { news, fetchNews, loading, error } = useNewsStore();

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  console.log("News from store:", news);
  return (
    <section className="py-6 ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Description */}
          <div>
            <h2 className="text-body-header text-center md:text-start mb-6">
              <span className="text-cml-orange">NEWS</span> AND EVENTS
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8 hidden md:block">
              Stay updated with the latest developments from CML's ongoing programs, field activities, and 
              community engagements across Northeast India. From farmer melas and training workshops to 
              partnership announcements and success stories, this section highlights the milestones, media 
              coverage, and impactful events that shape our journey.
            </p>
            <button className="text-cml-orange hover:text-orange-600 font-semibold underline transition-colors hidden md:block">
              Show all
            </button>
          </div>

          {/* Right Column - Scrolling News */}
          <div className="relative">
            {/* Scroll Up Button */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
              <button className="news-scroll-up w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors border">
                <ChevronUp className="w-5 h-5 text-cml-green" />
              </button>
            </div>

            {/* News Container */}
            <div className="relative overflow-hidden rounded-lg border bg-gray-50 p-6" style={{ height: '400px' }}>
              <Swiper
                modules={[Autoplay, Navigation]}
                direction="vertical"
                spaceBetween={20}
                slidesPerView={3}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                loop={true}
                speed={800}
                navigation={{
                  nextEl: '.news-scroll-down',
                  prevEl: '.news-scroll-up',
                }}
                className="news-swiper h-full"
              >
                {news.slice().reverse().map((item) => (
                  <SwiperSlide key={item.id}>
                    <div className="flex items-start gap-4 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow group">
                      <div className="flex-1">
                      <div className="text-sm mb-2 font-semibold text-cml-black">
  {new Date(item.date).toLocaleDateString("en-GB")}
</div>

                        <h3 className="font-semibold text-cml-green mb-2 leading-tight group-hover:text-cml-green transition-colors">
                          {item.title}
                        </h3>
                           <button
            onClick={() => navigate(`/NewsArticle/${item.id}`)}
            className="text-cml-green hover:text-green-700 text-sm font-medium transition-colors"
          >
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
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Scroll Down Button */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-20">
              <button className="news-scroll-down w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors border">
                <ChevronDown className="w-5 h-5 text-cml-green" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsEventsSection;