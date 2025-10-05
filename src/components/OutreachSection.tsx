import React, { useState, useEffect } from 'react';
import useOutreachStore from '@/store/useOutreachStore';

const OutreachMapComponent = () => {
  // use the store's outreach and loading state
  const { outreach = [], fetchOutreach, loading, error } = useOutreachStore();
  const [selectedState, setSelectedState] = useState<string | null>(null);

  console.log("Outreach data:", outreach);
  // Calculate totals from  all states
  const calculateTotals = () => {
    const totals = {
      projects: 0,
      districts: 0,
      women: { total: 0, ongoing: 0 },
      children: { total: 0, ongoing: 0 },
      household: { total: 0, ongoing: 0 }
    };

    outreach.forEach(state => {
      // Projects
      if (state.projects !== 'Nil') {
        totals.projects += parseInt(state.projects);
      }
      
      // Districts
      totals.districts += parseInt(state.districts);
      
      // Women
      totals.women.total += parseInt(state.women.total.replace(/,/g, '')) || 0;
      totals.women.ongoing += parseInt(state.women.ongoing.replace(/,/g, '')) || 0;
      
      // Children
      totals.children.total += parseInt(state.children.total.replace(/,/g, '')) || 0;
      if (state.children.ongoing !== 'Nil') {
        totals.children.ongoing += parseInt(state.children.ongoing.replace(/,/g, '')) || 0;
      }
      
      // Household
      totals.household.total += parseInt(state.household.total.replace(/,/g, '')) || 0;
      totals.household.ongoing += parseInt(state.household.ongoing.replace(/,/g, '')) || 0;
    });

    return totals;
  };

  // Fetch outreach on mount
  useEffect(() => {
    fetchOutreach();
  }, [fetchOutreach]);

  // When outreach data arrives, set a sensible default selected state
  useEffect(() => {
    if (outreach && outreach.length > 0) {
      // prefer keeping current selection if still present
      const exists = outreach.some((s: any) => s.state === selectedState);
      if (!selectedState || !exists) {
        setSelectedState(outreach[0].state || null);
      }
    }
  }, [outreach]);

  const totals = calculateTotals();
  const selectedStateData = outreach.find((state: any) => state.state === selectedState);

  // Get the selected state's image
  const getMapImage = () => {
    const stateData = outreach.find((state: any) => state.state === selectedState);
    return stateData?.image || outreach[0]?.image;
  };

  if (loading) {
    return (
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-12 bg-muted rounded w-1/3 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 h-96 bg-muted rounded-lg"></div>
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-16 bg-muted rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-body-header mb-4">
            <span className="text-[hsl(var(--cml-black))]">OUR </span>
            <span className="text-[hsl(var(--cml-orange))]">OUTREACH</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Image Section */}
          <div className="lg:col-span-2">
            <div className="relative w-full h-96 bg-gray-50 rounded-lg overflow-hidden">
              <img
                src={getMapImage()}
                alt={`${selectedState} Outreach Map`}
                className="w-full h-full object-contain"
              />
              
              {/* Legend */}
              <div className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow-md">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 bg-[hsl(var(--cml-orange))] rounded"></div>
                  <span className="text-xs font-medium">ONGOING PROJECTS</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[hsl(var(--cml-green))] rounded"></div>
                  <span className="text-xs font-medium">DISTRICTS COVERED</span>
                </div>
              </div>
            </div>
            
            {/* Project Statistics */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="text-left">
                <div className="font-bold md:text-lg  text-[hsl(var(--cml-black))]">
                  ONGOING PROJECTS: <span className="text-[hsl(var(--cml-orange))]">{totals.projects}</span>
                </div>
                <div className="font-bold md:text-lg  text-[hsl(var(--cml-black))]">
                  DISTRICTS COVERED: <span className="text-[hsl(var(--cml-green))]">{totals.districts}</span>
                </div>
              </div>
            </div>
          </div>

          {/* State Selector and Stats */}
          <div className="space-y-6">
              {/* State Buttons */}
            <div className="space-y-3">
              {(outreach || []).map((state: any) => (
                <button
                  key={state.id || state.state}
                  onClick={() => setSelectedState(state.state)}
                  className={`w-full p-2 md:px-6 md:py-4 rounded-full text-left font-bold md:text-lg transition-all ${
                    selectedState === state.state
                      ? 'bg-[hsl(var(--cml-green))] text-white'
                      : 'bg-white border-2 border-[hsl(var(--cml-green))] text-[hsl(var(--cml-green))] hover:bg-[hsl(var(--cml-green))/10]'
                  }`}
                >
                  {String(state.state || '').toUpperCase()}
                </button>
              ))}
            </div>

            {/* Statistics Table */}
           {/* Statistics Table */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div></div>
                <div className="font-bold text-sm text-[hsl(var(--cml-black))]">TOTAL</div>
                <div className="font-bold text-sm text-[hsl(var(--cml-green))]">ONGOING</div>
                
                <div className="font-bold text-sm text-[hsl(var(--cml-black))] text-left">NO. OF WOMEN:</div>
                <div className="font-bold text-lg">
                  {selectedStateData?.women?.total ? parseInt(selectedStateData.women.total.replace(/,/g, '')).toLocaleString() : '0'}
                </div>
                <div className="font-bold text-lg text-[hsl(var(--cml-green))]">
                  {selectedStateData?.women?.ongoing ? parseInt(selectedStateData.women.ongoing.replace(/,/g, '')).toLocaleString() : '0'}
                </div>
                
                <div className="font-bold text-sm text-[hsl(var(--cml-black))] text-left">NO. OF CHILDREN:</div>
                <div className="font-bold text-lg">
                  {selectedStateData?.children?.total ? parseInt(selectedStateData.children.total.replace(/,/g, '')).toLocaleString() : '0'}
                </div>
                <div className="font-bold text-lg text-[hsl(var(--cml-green))]">
                  {selectedStateData?.children?.ongoing && selectedStateData.children.ongoing !== 'Nil' 
                    ? parseInt(selectedStateData.children.ongoing.replace(/,/g, '')).toLocaleString() 
                    : '0'}
                </div>
                
                <div className="font-bold text-sm text-[hsl(var(--cml-black))] text-left">NO. OF HOUSEHOLDS:</div>
                <div className="font-bold text-lg">
                  {selectedStateData?.household?.total ? parseInt(selectedStateData.household.total.replace(/,/g, '')).toLocaleString() : '0'}
                </div>
                <div className="font-bold text-lg text-[hsl(var(--cml-green))]">
                  {selectedStateData?.household?.ongoing ? parseInt(selectedStateData.household.ongoing.replace(/,/g, '')).toLocaleString() : '0'}
                </div>
              </div>
            </div>

       
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutreachMapComponent;