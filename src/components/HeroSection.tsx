import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import DonationPopup from "@/components/DonationPopup";
import useBannerStore from "@/store/useBannerStore";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";

const HeroSection = () => {
  const [showDonation, setShowDonation] = useState(false);
  const { fetchBanners, banners, loading } = useBannerStore();

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);



  // fallback image if no banners exist in Firestore
  const defaultBanner = "/images/default-hero.jpg";
  const bannersToShow = banners && banners.length > 0 ? banners : [defaultBanner];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center"
    >
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        speed={1000}
        className="absolute inset-0 w-full h-full"
      >
        {bannersToShow.map((image: string, index: number) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${image})`,
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-[#002C0D] opacity-[65%]"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Content - Static overlay */}
      <div className="flex items-center justify-center relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="md:text-[64px] text-header mb-6 leading-tight">
            EMPOWERING COMMUNITIES
            <br />
            ACROSS <span className="text-cml-orange">NORTH-EAST INDIA</span>
          </h1>

          <p className="md:text-[20px] mb-8 max-w-2xl mx-auto">
            Driving sustainable livelihoods, capacity building, and grassroots
            development through inclusive partnerships and innovation.
          </p>

          <Button  onClick={() => setShowDonation(true)} className="text-white bg-cml-orange hover:bg-cml-orange/90 px-5 py-1 rounded-full font-semibold">
            DONATE
          </Button>
        </div>
      </div>
        <DonationPopup open={showDonation} onClose={() => setShowDonation(false)} />
    </section>
  );
};

export default HeroSection;
