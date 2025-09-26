
import HeroSection from "@/components/HeroSection";
import WhatWeDoSection from "@/components/WhatWeDoSection";
import PartnersSection from "@/components/PartnersSection";
import ImpactSection from "@/components/ImpactSection";
import CollaborateSection from "@/components/CollaborateSection";
import StoriesSection from "@/components/StoriesSection";
import AnnualReportSection from "@/components/AnnualReportSection";
import AwardsSection from "@/components/AwardsSection";
import ChairmanSection from "@/components/ChairmanSection";
import NewsEventsSection from "@/components/NewsEventsSection";
import NewsletterSection from "@/components/NewsletterSection";
import OutreachSection from "@/components/OutreachSection";



const Index = () => {
  return (
    <div className="min-h-screen">

      <HeroSection />
            <PartnersSection />
              <ImpactSection />
              {/* <OutreachSection/> */}
          
              <StoriesSection/>
              <ChairmanSection/>
              <NewsEventsSection/>

              <AnnualReportSection/>
              <AwardsSection/>

      {/* <WhatWeDoSection /> */}

      {/* <ImpactSection /> */}
          <NewsletterSection/>
          <CollaborateSection/>

    </div>
  );
};

export default Index;
