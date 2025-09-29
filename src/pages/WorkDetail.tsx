import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowRight, MapPin, Users, Home } from 'lucide-react';
import useOurWorkStore from '@/store/useOurWorkStore';
import DonationPopup from "@/components/DonationPopup";

const WorkDetailPage = () => {
  const [showDonation, setShowDonation] = useState(false);
  const { id } = useParams();
  const { 
    workDetail, 
    loadingDetail, 
    errorDetail, 
    fetchWorkById,
    ourWork,
    fetchOurWork,
    loadingList 
  } = useOurWorkStore();

  useEffect(() => {
    if (id) {
      fetchWorkById(id);
    }
  }, [id, fetchWorkById]);

  useEffect(() => {
    fetchOurWork();
  }, [fetchOurWork]);

  // Filter other works excluding current one
  const otherWorks = ourWork.filter(work => 
    String(work.id) !== String(id) && String(work.dateID) !== String(id)
  ).slice(0, 4);

  if (loadingDetail) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="animate-pulse">
            {/* Title skeleton */}
            <div className="h-8 bg-muted rounded w-3/4 mb-6"></div>
            
            {/* Badges skeleton */}
            <div className="flex gap-4 mb-12">
              <div className="h-10 bg-muted rounded-full w-20"></div>
              <div className="h-10 bg-muted rounded-full w-24"></div>
              <div className="h-10 bg-muted rounded-full w-32"></div>
            </div>

            {/* Content sections skeleton */}
            {[...Array(3)].map((_, index) => (
              <div key={index} className="mb-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <div className="h-6 bg-muted rounded w-1/2"></div>
                    <div className="h-4 bg-muted rounded w-full"></div>
                    <div className="h-4 bg-muted rounded w-4/5"></div>
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                  </div>
                  <div className="h-64 bg-muted rounded-xl"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (errorDetail) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[hsl(var(--cml-black))] mb-4">
            Work Not Found
          </h2>
          <p className="text-muted-foreground mb-6">{errorDetail}</p>
          <button 
            onClick={() => window.history.back()}
            className="bg-[hsl(var(--cml-green))] text-white px-6 py-3 rounded-full hover:bg-[hsl(var(--cml-green))/90] transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!workDetail) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[hsl(var(--cml-black))] mb-4">
            No Work Details Available
          </h2>
          <button 
            onClick={() => window.history.back()}
            className="bg-[hsl(var(--cml-green))] text-white px-6 py-3 rounded-full hover:bg-[hsl(var(--cml-green))/90] transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-body-header text-[hsl(var(--cml-black))] mb-6 leading-tight">
            {workDetail.subtitle || workDetail.title}
          </h1>
          
          {/* Info Badges */}
          <div className="flex flex-wrap gap-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-[hsl(var(--cml-green))] text-white rounded-full font-bold text-sm">
              <MapPin className="w-4 h-4" />
              ASSAM
            </span>
            {workDetail.villages && (
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[hsl(var(--cml-green))] text-white rounded-full font-bold text-sm">
                <Home className="w-4 h-4" />
                {workDetail.villages} VILLAGES
              </span>
            )}
            {workDetail.beneficiaries && (
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[hsl(var(--cml-green))] text-white rounded-full font-bold text-sm">
                <Users className="w-4 h-4" />
                {workDetail.beneficiaries} BENEFICIARIES
              </span>
            )}
          </div>
        </div>

        {/* Main Content */}
        {workDetail.desc && workDetail.desc.length > 0 ? (
          <div className="space-y-16">
            {workDetail.desc.map((section, index) => (
              <div key={index} className="mb-16">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                  index % 2 === 0 ? '' : 'lg:grid-flow-col-dense'
                }`}>
                  {/* Text Content */}
                  <div className={`space-y-6 ${index % 2 === 0 ? '' : 'lg:col-start-2'}`}>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-6 bg-[hsl(var(--cml-orange))] rounded-full flex-shrink-0 mt-1"></div>
                      <div>
                        <h2 className="text-xl font-bold text-[hsl(var(--cml-black))] mb-4">
                          {section.title}
                        </h2>
                        <p className="text-base text-foreground leading-relaxed">
                          {section.desc}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Image */}
                  <div className={`${index % 2 === 0 ? '' : 'lg:col-start-1 lg:row-start-1'}`}>
                    <div className="rounded-2xl overflow-hidden shadow-lg">
                      <img
                        src={section.image}
                        alt={section.title}
                        className="w-full h-80 object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">
              No detailed description available for this project.
            </p>
          </div>
        )}

        {/* Donate Button */}
        <div className="my-16">
          <button onClick={() => setShowDonation(true)} className="bg-[hsl(var(--cml-orange))] text-white px-8 py-4 rounded-full font-bold text-lg  transition-colors">
            DONATE NOW
          </button>
        </div>
   <DonationPopup open={showDonation} onClose={() => setShowDonation(false)} />
        {/* Other Works Section */}
        {otherWorks.length > 0 && (
          <div className="mt-20">
            <h2 className="text-body-header mb-12">
              <span className="text-[hsl(var(--cml-orange))]">OTHER </span>
              <span className="text-[hsl(var(--cml-black))]">WORKS</span>
            </h2>

            {loadingList ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="h-48 bg-muted rounded-xl mb-4"></div>
                    <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-muted rounded w-1/2 mb-4"></div>
                    <div className="h-10 bg-muted rounded-full"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {otherWorks.map((work) => (
                  <div key={work.id} className="group cursor-pointer">
                    <div className="relative rounded-xl overflow-hidden mb-4 shadow-md">
                      <img
                        src={work.image}
                        alt={work.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300"></div>
                      
                      {/* Content Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <div className="mb-2">
                          <span className="inline-block px-2 py-1 bg-[hsl(var(--cml-orange))] text-xs font-bold rounded-full">
                            {work.type ? work.type.toUpperCase() : 'LIVELIHOOD'}
                          </span>
                        </div>
                        <h3 className="font-bold text-sm mb-1">
                          {work.title}
                        </h3>
                        <p className="text-xs opacity-90 line-clamp-2">
                          {work.subtitle || 'Development project for rural communities'}
                        </p>
                      </div>
                    </div>

                    <button 
                      onClick={() => window.location.href = `/work/${work.id || work.dateID}`}
                      className="w-full bg-[hsl(var(--cml-green))] text-white py-3 rounded-full font-bold text-sm hover:bg-[hsl(var(--cml-green))/90] transition-colors"
                    >
                      DONATE
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkDetailPage;