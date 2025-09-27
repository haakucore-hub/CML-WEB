import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import useOurWorkStore from '@/store/useOurWorkStore';
import { useNavigate } from "react-router-dom";


const WhatWeDoComponent = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('Livelihood');

const { ourWork , fetchOurWork } = useOurWorkStore();
console.log("Our Work from store:", ourWork);
  // Simulate data fetching
  useEffect(() => {
 fetchOurWork();
  }, []);

  // Get unique categories
  const categories = ['Livelihood', 'WaSH', 'Education', 'Institution Building'];

  // Filter data by selected category
  const filteredData = ourWork.filter(item => item.type === selectedCategory);

  // SDG icons component
  const SDGIcons = () => (
    <div className="flex items-center gap-2">
      <span className="text-sm font-bold text-[hsl(var(--cml-black))]">SDE'S COVERED</span>
      <div className="flex gap-1">
        <div className="w-12 h-12 bg-red-600 text-white flex items-center justify-center text-xs font-bold rounded">
          <div className="text-center">
            <div className="text-lg">1</div>
            <div className="text-xs leading-none">NO POVERTY</div>
          </div>
        </div>
        <div className="w-12 h-12 bg-orange-400 text-white flex items-center justify-center text-xs font-bold rounded">
          <div className="text-center">
            <div className="text-lg">2</div>
            <div className="text-xs leading-none">ZERO HUNGER</div>
          </div>
        </div>
      </div>
    </div>
  );


  return (
    <div className="py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-2 md:mb-12">
          <h2 className="text-body-header mb-6 lg:mb-0">
            <span className="text-[hsl(var(--cml-black))]">WHAT WE </span>
            <span className="text-[hsl(var(--cml-orange))]">DO</span>
          </h2>
          
          {/* <SDGIcons /> */}
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 md:gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-2 py-2 md:px-8 md:py-4 rounded-full text-[8px] md:text-sm font-bold uppercase transition-all ${
                selectedCategory === category
                  ? 'bg-[hsl(var(--cml-green))] text-white'
                  : 'bg-white border-2 border-[hsl(var(--cml-green))] text-[hsl(var(--cml-green))] hover:bg-[hsl(var(--cml-green))/10]'
              }`}
            >
              {category === 'WaSH' ? 'WaSH' : category.replace(/([A-Z])/g, ' $1').trim()}
            </button>
          ))}
        </div>

{/* Cards Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6">
  {filteredData.map((item, index) => (
    <div
      key={item.id}
      className="group relative rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      style={{
        height: window.innerWidth >= 768 
          ? (index === 0 ? '500px' : index % 3 === 1 ? '450px' : '400px')
          : '350px'
      }}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 md:group-hover:bg-black/60 transition-all duration-300"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-4 md:p-6 text-white">
        <div className="transform translate-y-0 md:group-hover:translate-y-0 transition-transform duration-300">
          <span className="inline-block px-2 py-1 md:px-3 md:py-1 bg-[hsl(var(--cml-orange))] text-white text-xs font-bold rounded-full mb-2 md:mb-3">
            {item.type.toUpperCase()}
          </span>
          
          <h3 className="text-lg md:text-xl font-bold mb-2 leading-tight">
            {item.title}
          </h3>
          
          <p className="text-sm opacity-90 mb-3 md:mb-4 line-clamp-2">
            {item.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-xs mb-3 md:mb-4 gap-1 sm:gap-0">
            <span>Beneficiaries: <strong>{item.beneficiaries}</strong></span>
            <span>Villages: <strong>{item.villages}</strong></span>
          </div>
        </div>

        {/* Learn More Button - always visible on mobile, appears on hover on desktop */}
        <div className="transform translate-y-0 opacity-100 md:translate-y-full md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-300">
          <button  onClick={() => navigate(`/WorkDetail/${item.id}`)} className="flex items-center justify-center sm:justify-start gap-2 bg-[hsl(var(--cml-orange))] text-white px-4 py-2 rounded-full hover:bg-[hsl(var(--cml-green))/90] transition-colors text-sm font-medium w-full sm:w-auto">
            Learn More
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  ))}
</div>

        {/* Show message if no data for selected category */}
        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">
              No projects available for {selectedCategory} category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WhatWeDoComponent;