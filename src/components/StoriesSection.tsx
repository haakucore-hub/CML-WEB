import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import useStoryStore from '@/store/useStoriesStore';
import { useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface story {
  id: number;
  name: string;
  msg: string;
  state: string;
  type: string;
  image: string;
}



const StoriesSection = () => {
  const { stories, fetchStories, loading, error } = useStoryStore();

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  return (
    <section className="py-6">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-body-header mb-6">
            HEAR OUR <span className="text-cml-orange">STORIES</span>
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
              nextEl: '.stories-button-next',
              prevEl: '.stories-button-prev',
            }}
            pagination={{
              clickable: true,
              el: '.stories-pagination',
            }}
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 30 },
              1024: { slidesPerView: 2, spaceBetween: 40 },
              1280: { slidesPerView: 3, spaceBetween: 50 },
            }}
            className="stories-swiper"
          >
            {stories?.slice().reverse().map((story) => (
              <SwiperSlide key={story.id}>
                <div className="bg-[#F1F1F1] rounded-xl p-6 h-[250px] shadow-lg ">
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-bold text-cml-black text-lg">
                          {story.name}
                        </h3>
                        <span className="bg-cml-green text-white px-3 py-1 rounded-full text-sm font-medium">
                          {story.state}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">{story.type
                      }</p>
                    </div>
                  </div>

                  <blockquote className="text-cml-black italic ">
                    "{story.msg
                    }"
                  </blockquote>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>


        </div>
      </div>
    </section>
  );
};

export default StoriesSection;