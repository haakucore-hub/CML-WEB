import { impactData } from "@/data/impactData";

const ImpactSection = () => {
  return (
    <section className="py-6 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-body-header mb-6">
            OUR <span className="text-cml-orange">IMPACT</span> IN ACTION
          </h2>
          <p className=" text-[12px] md:text-[16px] max-w-3xl mx-auto">
            For over <span className="font-bold ">25 years</span>, CML has been driving change at the grassroots level — strengthening livelihoods, enabling 
            community leadership, and partnering with hundreds of NGOs to uplift underserved communities.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 md:gap-8 gap-3">
          {impactData.map((stat, index) => (
            <div key={index} className="text-center group shadow-lg rounded-bl-2xl rounded-br-2xl pb-4">
              <div className="mb-6 overflow-hidden rounded-tl-2xl rounded-tr-2xl ">
                <img
                  src={stat.image}
                  alt={stat.label}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="space-y-2  ">
                <h3 className="text-[29px] font-bold text-cml-orange font-oswald">
                  {stat.number}
                </h3>
                <p className="text-[14px] md:text-[20px] text-cml-black">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;