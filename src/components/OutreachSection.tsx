import React, { useState, useEffect } from 'react';

// Mock data based on your provided JSON
const mockOutreachData = [
  {
    "women": {
      "ongoing": "21,647",
      "total": "32,593"
    },
    "household": {
      "total": "88,204",
      "ongoing": "21,506"
    },
    "children": {
      "ongoing": "35,621",
      "total": "93,165"
    },
    "districts": "11",
    "state": "Assam",
    "projects": "7",
    "image": "https://firebasestorage.googleapis.com/v0/b/cmlnorthest.firebasestorage.app/o/public%2F1758268529552-Assam%20Outreach%20Illustration.png?alt=media&token=b6956a96-7b1f-4015-a038-f43defbbee48",
    "id": "1758268539264"
  },
  {
    "state": "Manipur",
    "districts": "13",
    "household": {
      "ongoing": "0",
      "total": "3,500"
    },
    "women": {
      "total": "0",
      "ongoing": "0"
    },
    "image": "https://firebasestorage.googleapis.com/v0/b/cmlnorthest.firebasestorage.app/o/public%2F1758268659453-Manipur%20Outreach%20Illustration.png?alt=media&token=cbc401b6-003e-49a0-a741-39287574fcc1",
    "projects": "Nil",
    "children": {
      "total": "2,000",
      "ongoing": "0"
    },
    "id": "1758268683650"
  },
  {
    "projects": "4",
    "household": {
      "total": "21,491",
      "ongoing": "7,566"
    },
    "image": "https://firebasestorage.googleapis.com/v0/b/cmlnorthest.firebasestorage.app/o/public%2F1758268786848-Tripura%20Outreach%20Illustration.png?alt=media&token=b5c7ac61-d3f3-4556-a205-2b3f11e761ad",
    "children": {
      "total": "9,000",
      "ongoing": "Nil"
    },
    "state": "Tripura",
    "districts": "5",
    "id": "1758268796475",
    "women": {
      "ongoing": "0",
      "total": "0"
    }
  }
];

const OutreachMapComponent = () => {
  const [outreachData, setOutreachData] = useState([]);
  const [selectedState, setSelectedState] = useState('Assam');
  const [loading, setLoading] = useState(true);

  // Calculate totals from all states
  const calculateTotals = () => {
    const totals = {
      projects: 0,
      districts: 0,
      women: { total: 0, ongoing: 0 },
      children: { total: 0, ongoing: 0 },
      household: { total: 0, ongoing: 0 }
    };

    outreachData.forEach(state => {
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

  // Simulate data fetching
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setOutreachData(mockOutreachData);
      setLoading(false);
    };
    
    fetchData();
  }, []);

  const totals = calculateTotals();
  const selectedStateData = outreachData.find(state => state.state === selectedState);

  // Get the selected state's image
  const getMapImage = () => {
    const stateData = outreachData.find(state => state.state === selectedState);
    return stateData?.image || outreachData[0]?.image;
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
              {outreachData.map((state) => (
                <button
                  key={state.id}
                  onClick={() => setSelectedState(state.state)}
                  className={`w-full p-2 md:px-6 md:py-4 rounded-full text-left font-bold md:text-lg transition-all ${
                    selectedState === state.state
                      ? 'bg-[hsl(var(--cml-green))] text-white'
                      : 'bg-white border-2 border-[hsl(var(--cml-green))] text-[hsl(var(--cml-green))] hover:bg-[hsl(var(--cml-green))/10]'
                  }`}
                >
                  {state.state.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Statistics Table */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div></div>
                <div className="font-bold text-sm text-[hsl(var(--cml-black))]">TOTAL</div>
                <div className="font-bold text-sm text-[hsl(var(--cml-green))]">ONGOING</div>
                
                <div className="font-bold text-sm text-[hsl(var(--cml-black))] text-left">NO. OF WOMEN:</div>
                <div className="font-bold text-lg">{totals.women.total.toLocaleString()}</div>
                <div className="font-bold text-lg text-[hsl(var(--cml-green))]">{totals.women.ongoing.toLocaleString()}</div>
                
                <div className="font-bold text-sm text-[hsl(var(--cml-black))] text-left">NO. OF CHILDREN:</div>
                <div className="font-bold text-lg">{totals.children.total.toLocaleString()}</div>
                <div className="font-bold text-lg text-[hsl(var(--cml-green))]">{totals.children.ongoing.toLocaleString()}</div>
                
                <div className="font-bold text-sm text-[hsl(var(--cml-black))] text-left">NO. OF HOUSEHOLDS:</div>
                <div className="font-bold text-lg">{totals.household.total.toLocaleString()}</div>
                <div className="font-bold text-lg text-[hsl(var(--cml-green))]">{totals.household.ongoing.toLocaleString()}</div>
              </div>
            </div>

       
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutreachMapComponent;