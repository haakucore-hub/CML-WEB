import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import useWhatWeDoStore from "@/store/whatWeDoStore";
import { sdgData } from "@/data/sdgData";
import floodResilience from "@/assets/flood-resilience-1.jpg";
import livelihood from "@/assets/livelihood-2.jpg";
import fishery from "@/assets/fishery-3.jpg";
import orchard from "@/assets/orchard-4.jpg";

const WhatWeDoSection = () => {
  const [activeTab, setActiveTab] = useState("livelihood");
  const [selectedProject, setSelectedProject] = useState(0);
  const { projects, loading, error, fetchProjects } = useWhatWeDoStore();

  const tabs = [
    { id: "livelihood", label: "LIVELIHOOD" },
    { id: "wash", label: "WaSH" },
    { id: "education", label: "EDUCATION" },
    { id: "institutionBuilding", label: "INSTITUTION BUILDING" }
  ];

  // Fallback data for demo
  const fallbackProjects = [
    {
      title: "ASI - FLOOD RESILIENCE",
      state: "ASSAM",
      description: "The primary objective of the project is optimal use of the underutilized land resources of enterprising rural households in Boko Block of Kamrup District of Assam. Provision of access to improved input support leading to increased production and productivity is the key intervention the program is based on.",
      highlightPoints: [
        "The project will generate an additional revenue of Rs. 5.6 Crore at the end of 3rd Year. In terms of outcomes, the project envisages 244+ MT of Horticultural Produce and 90 MT of Fish. The project aims to augment the average additional household income of the famers to tune of Rs. 80K to Rs. 1 lakhs."
      ],
      outcomes: {
        additionalRevenue: "Rs. 5.6 Crore",
        produce: "244+ MT",
        fish: "90 MT",
        incomeIncrease: "Rs. 80K - 1 Lakh"
      },
      images: [floodResilience, livelihood, fishery, orchard],
      sdgs: [1, 2],
      buttonText: "Learn more",
      buttonLink: "#flood-resilience"
    }
  ];

  useEffect(() => {
    fetchProjects(activeTab);
  }, [activeTab, fetchProjects]);

  const displayProjects = projects.length > 0 ? projects : fallbackProjects;
  const currentProject = displayProjects[selectedProject];

  if (!currentProject) return null;

  const getSDGInfo = (sdgId: number) => {
    return sdgData.find(sdg => sdg.id === sdgId);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-body-header mb-8">
            WHAT WE <span className="text-cml-orange">DO</span>
          </h2>
          
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSelectedProject(0);
                }}
                className={`px-8 py-3 rounded-full text-cta font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-cml-green text-white shadow-lg'
                    : 'bg-white text-cml-black border border-gray-300 hover:border-cml-orange hover:text-cml-orange'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-body">Loading projects...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-body text-destructive">Error: {error}</p>
          </div>
        ) : (
          <div className="relative">
            {/* Main Content Area */}
            <div className="flex flex-col lg:flex-row items-center gap-12">
              
              {/* Left Side - Circular Images */}
              <div className="hidden lg:flex flex-col space-y-8 w-64">
                {currentProject.images.slice(0, 2).map((image, index) => (
                  <div 
                    key={index}
                    className="w-48 h-48 rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <img
                      src={image}
                      alt={`Project ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Center - Project Details */}
              <div className="flex-1 max-w-2xl">
                <div className="bg-cml-black rounded-3xl p-8 text-white relative">
                  <h3 className="text-header text-3xl mb-2 text-center">
                    {currentProject.title}
                  </h3>
                  <p className="text-cml-orange text-xl font-bold text-center mb-6">
                    {currentProject.state}
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    <p className="text-body leading-relaxed">
                      {currentProject.description}
                    </p>
                    {currentProject.highlightPoints.map((point, index) => (
                      <p key={index} className="text-body leading-relaxed">
                        {point}
                      </p>
                    ))}
                  </div>

                  <div className="text-center">
                    <Button 
                      className="bg-cml-orange hover:bg-cml-orange/90 text-white px-8 py-3 rounded-full text-cta"
                    >
                      {currentProject.buttonText || "Learn more"}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Right Side - Images and SDGs */}
              <div className="lg:w-80 space-y-8">
                {/* More Circular Images */}
                <div className="hidden lg:flex flex-col space-y-8">
                  {currentProject.images.slice(2, 4).map((image, index) => (
                    <div 
                      key={index + 2}
                      className="w-48 h-48 rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ml-auto"
                    >
                      <img
                        src={image}
                        alt={`Project ${index + 3}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>

                {/* SDGs Covered */}
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h4 className="text-label mb-4 text-center">
                    <span className="text-cml-orange">SDE'S</span> COVERED
                  </h4>
                  <div className="flex flex-wrap gap-3 justify-center">
                    {currentProject.sdgs.map((sdgId) => {
                      const sdg = getSDGInfo(sdgId);
                      if (!sdg) return null;
                      
                      return (
                        <div
                          key={sdgId}
                          className="w-16 h-16 rounded-lg flex flex-col items-center justify-center text-white text-xs font-bold text-center"
                          style={{ backgroundColor: sdg.color }}
                        >
                          <span className="text-lg mb-1">{sdgId}</span>
                          <span className="text-xs leading-tight">
                            {sdg.title.split(' ')[0]}<br/>
                            {sdg.title.split(' ')[1]}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Images Grid */}
            <div className="lg:hidden mt-8 grid grid-cols-2 gap-4">
              {currentProject.images.map((image, index) => (
                <div 
                  key={index}
                  className="aspect-square rounded-2xl overflow-hidden shadow-lg"
                >
                  <img
                    src={image}
                    alt={`Project ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Project Navigation */}
        {displayProjects.length > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {displayProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedProject(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  selectedProject === index ? 'bg-cml-orange' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default WhatWeDoSection;