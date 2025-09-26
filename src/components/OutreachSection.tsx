import { useState } from "react";
import { Button } from "@/components/ui/button";

interface StateData {
  ongoingProjects: number;
  districtsCovered: number;
  women: { total: number; ongoing: number };
  children: { total: number; ongoing: number };
  households: { total: number; ongoing: number };
}

interface StateInfo {
  name: string;
  data: StateData;
}

const OutreachSection = () => {
  const [selectedState, setSelectedState] = useState<string>("ASSAM");

  const stateData: Record<string, StateInfo> = {
    ASSAM: {
      name: "ASSAM",
      data: {
        ongoingProjects: 5,
        districtsCovered: 8,
        women: { total: 18432, ongoing: 12847 },
        children: { total: 54321, ongoing: 21456 },
        households: { total: 48567, ongoing: 13245 }
      }
    },
    MANIPUR: {
      name: "MANIPUR", 
      data: {
        ongoingProjects: 2,
        districtsCovered: 3,
        women: { total: 8934, ongoing: 5432 },
        children: { total: 24567, ongoing: 9876 },
        households: { total: 19876, ongoing: 5432 }
      }
    },
    TRIPURA: {
      name: "TRIPURA",
      data: {
        ongoingProjects: 3,
        districtsCovered: 4,
        women: { total: 12456, ongoing: 7890 },
        children: { total: 28934, ongoing: 12345 },
        households: { total: 25678, ongoing: 8765 }
      }
    }
  };

  const currentData = stateData[selectedState].data;
  const totalStats = {
    ongoingProjects: Object.values(stateData).reduce((sum, state) => sum + state.data.ongoingProjects, 0),
    districtsCovered: Object.values(stateData).reduce((sum, state) => sum + state.data.districtsCovered, 0),
    women: {
      total: Object.values(stateData).reduce((sum, state) => sum + state.data.women.total, 0),
      ongoing: Object.values(stateData).reduce((sum, state) => sum + state.data.women.ongoing, 0)
    },
    children: {
      total: Object.values(stateData).reduce((sum, state) => sum + state.data.children.total, 0),
      ongoing: Object.values(stateData).reduce((sum, state) => sum + state.data.children.ongoing, 0)
    },
    households: {
      total: Object.values(stateData).reduce((sum, state) => sum + state.data.households.total, 0),
      ongoing: Object.values(stateData).reduce((sum, state) => sum + state.data.households.ongoing, 0)
    }
  };

  const getStateColor = (stateName: string) => {
    if (selectedState === "ALL") {
      return "#014624"; // cml-green for all states when showing total
    }
    return selectedState === stateName ? "#FF6E16" : "#014624"; // orange for selected, green for others
  };

  const displayData = selectedState === "ALL" ? totalStats : currentData;

  return (
    <section className="py-6">
      <div className="container mx-auto px-4">
        <h2 className="text-body-header text-cml-black mb-8">
          OUR <span className="text-cml-orange">OUTREACH</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 rounded-lg p-6">
              {/* Legend */}
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-cml-orange rounded-sm"></div>
                  <span className="text-body text-cml-black font-semibold">ONGOING PROJECTS</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-cml-green rounded-sm"></div>
                  <span className="text-body text-cml-black font-semibold">DISTRICTS COVERED</span>
                </div>
              </div>

              {/* SVG Map */}
              <div className="flex justify-center">
                <svg width="400" height="300" viewBox="0 0 400 300" className="max-w-full h-auto">
                  {/* Assam */}
                  <path
                    d="M80 120 L180 110 L200 140 L190 160 L160 170 L120 165 L90 150 Z"
                    fill={getStateColor("ASSAM")}
                    stroke="#fff"
                    strokeWidth="2"
                    className="cursor-pointer transition-colors duration-300"
                    onClick={() => setSelectedState("ASSAM")}
                  />
                  
                  {/* Manipur */}
                  <path
                    d="M140 180 L170 175 L180 200 L160 220 L140 215 L130 195 Z"
                    fill={getStateColor("MANIPUR")}
                    stroke="#fff"
                    strokeWidth="2"
                    className="cursor-pointer transition-colors duration-300"
                    onClick={() => setSelectedState("MANIPUR")}
                  />
                  
                  {/* Tripura */}
                  <path
                    d="M100 200 L130 195 L135 220 L115 235 L100 230 L95 215 Z"
                    fill={getStateColor("TRIPURA")}
                    stroke="#fff"
                    strokeWidth="2"
                    className="cursor-pointer transition-colors duration-300"
                    onClick={() => setSelectedState("TRIPURA")}
                  />

                  {/* Other northeastern states (lighter colors) */}
                  <path
                    d="M200 140 L240 135 L250 160 L230 175 L200 170 Z"
                    fill="#e5e7eb"
                    stroke="#fff"
                    strokeWidth="2"
                  />
                  <path
                    d="M180 200 L210 195 L220 220 L200 235 L180 230 Z"
                    fill="#e5e7eb"
                    stroke="#fff"
                    strokeWidth="2"
                  />
                  <path
                    d="M250 160 L280 155 L290 180 L270 195 L250 190 Z"
                    fill="#e5e7eb"
                    stroke="#fff"
                    strokeWidth="2"
                  />

                  {/* State Labels */}
                  <text x="130" y="140" className="text-xs fill-white font-semibold" textAnchor="middle">ASSAM</text>
                  <text x="155" y="200" className="text-xs fill-white font-semibold" textAnchor="middle">MANIPUR</text>
                  <text x="115" y="220" className="text-xs fill-white font-semibold" textAnchor="middle">TRIPURA</text>
                </svg>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-200">
                <div>
                  <div className="text-outreach text-cml-orange font-semibold">ONGOING PROJECTS: {displayData.ongoingProjects}</div>
                  <div className="text-outreach text-cml-black font-semibold">DISTRICTS COVERED: {displayData.districtsCovered}</div>
                </div>
                <div className="space-y-1">
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <span className="text-cml-black font-semibold"></span>
                    <span className="text-cml-black font-semibold text-center">TOTAL</span>
                    <span className="text-cml-green font-semibold text-center">ONGOING</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <span className="text-cml-black font-semibold">NO. OF WOMEN:</span>
                    <span className="text-cml-black text-center">{displayData.women.total.toLocaleString()}</span>
                    <span className="text-cml-green text-center">{displayData.women.ongoing.toLocaleString()}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <span className="text-cml-black font-semibold">NO. OF CHILDREN:</span>
                    <span className="text-cml-black text-center">{displayData.children.total.toLocaleString()}</span>
                    <span className="text-cml-green text-center">{displayData.children.ongoing.toLocaleString()}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <span className="text-cml-black font-semibold">NO. OF HOUSEHOLDS:</span>
                    <span className="text-cml-black text-center">{displayData.households.total.toLocaleString()}</span>
                    <span className="text-cml-green text-center">{displayData.households.ongoing.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* State Selection Buttons */}
          <div className="space-y-3">
            
            {Object.keys(stateData).map((state) => (
              <Button
                key={state}
                variant={selectedState === state ? "default" : "outline"}
                className={`w-full justify-center text-cta ${
                  selectedState === state 
                    ? "bg-cml-green text-white hover:bg-cml-green/90" 
                    : "border-gray-300 text-cml-black hover:bg-gray-50"
                }`}
                onClick={() => setSelectedState(state)}
              >
                {stateData[state].name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OutreachSection;
