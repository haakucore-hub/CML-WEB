const ChairmanSection = () => {
  return (
    <section className="py-6 ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Chairman Image */}
          <div className="flex flex-col justify-center lg:justify-start">
              <h2 className="text-body-header text-center md:text-start mb-8">
              MEET THE <span className="text-cml-orange">CHAIRMAN</span>
            </h2>
            <div className="flex  items-center ml-5 md:text-start">
              {/* Green Circle Background */}
              <div className="  overflow-hidden">
               <img 
                  src="RanjitBorthakurChairmanImage.png" 
                  alt="Ranjit Barthakur - Chairman and CEO"
                  className="w-90 h-80 object-cover object-center"
                />
                 {/* Name and Title */}
              <div className="text-center mt-6">
                <h3 className="text-2xl  text-cml-black mb-2">
                  Ranjit Barthakur
                </h3>
                <p className="text-gray-600 text-lg">
                  Chairman and CEO
                </p>
              </div>
              </div>
              
             
            </div>
          </div>

          {/* Right Column - Content */}
          <div>
          
            
            <div className="space-y-6">
              <p className="text-gray-700 text-lg leading-relaxed">
                Ranjit Barthakur is a social entrepreneur, committed to pursuing social 
                change through innovative cutting edge concepts, ecological neutrality and 
                impactful action. He has pioneered the concepts of Naturenomics™ and 
                Rural Futures, with a view to inspiring community-based conservation and 
                livelihoods in the Eastern Himalayas.
              </p>
              
              <p className="text-gray-700 text-lg leading-relaxed">
                Ranjit has served in diverse roles in both the private and public sector, 
                most notably as an advisor to the ex-Chief Minister of Assam. He brings 
                over 40 years of expertise in FMCGs, the hospitality sector, IT, 
                sustainability practices in business and sports to his numerous concerns.
              </p>
            </div>

           
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChairmanSection;