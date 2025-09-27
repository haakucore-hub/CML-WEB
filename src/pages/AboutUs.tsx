import useBoardMemberStore from "@/store/ourMembersStore";
import { Mail, Phone } from "lucide-react";
import { useEffect, useState } from "react";

const AboutUs = () => {
  const { boardMembers, members, fetchBoardMembers, fetchMembers, loading, error } = useBoardMemberStore();

  useEffect(() => {
    fetchMembers();
    fetchBoardMembers();
  }, [fetchMembers, fetchBoardMembers]);

  // Defensive: fallback to first member if available
  const [selectedMember, setSelectedMember] = useState(null);
  useEffect(() => {
    if (boardMembers && boardMembers.length > 0) {
      setSelectedMember(boardMembers[0]);
    }
  }, [boardMembers]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative h-64 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('/2487984edae468540f569b057a9d6ca7c30142ac(2).jpg')",
        }}
      >
        {/* Gradient + Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-cml-green/80 to-cml-green/60">
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Heading */}
        <h1 className="relative text-4xl sm:text-5xl md:text-6xl font-bold text-white text-center">
          ABOUT <span className="text-cml-orange">US</span>
        </h1>
      </section>

      {/* Who We Are Section */}
      <section className="py-6 bg-white">
        <div className="container mx-auto px-4">
          <div className="">
            <h2 className="text-4xl font-bold mb-8">
              <span className="text-cml-orange">WHO</span> WE ARE
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="flex flex-col space-y-6 text-gray-700 text-lg leading-relaxed">
                <p className="leading-tight">
                  Centre for Microfinance & Livelihood (CML) was initiated by
                  the Tata Trusts, Mumbai in 2008. It was conceptualised as a
                  specialised umbrella support organisation for capacity
                  building, research, collaborative interventions and policy
                  advocacy in the development space of Northeast India. CML has
                  a deep understanding of regional challenges, nuances and
                  opportunities, which helps them customise intervention
                  strategies that are most relevant, meaningful and beneficial
                  to the North-Eastern Region of India. These interventions are
                  strategically designed to go beyond the realm of patchwork
                  philanthropy to be inclusive, long-term, impact-driven and
                  supported by data analytics and technology.
                </p>

                <p className="leading-tight">
                  With its mandate of strengthening development in the region,
                  CML started its initiatives focusing on the domains of
                  training and capacity building, livelihood intervention
                  piloting and compilation and synthesis of sector information
                  for forging linkages and advocacy.
                </p>
              </div>
              <div className="">
                <div className=" md:w-[500px] max-w-md">
                  <img
                    src="674232734c37f917e2b2c5d7d52f9b804e072eb5.png"
                    alt="CML Team at work"
                    className="w-[580px] h-auto rounded-lg shadow-lg object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Board Members Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12">
            <span className="text-cml-orange">BOARD</span> MEMBERS
          </h2>

          {/* Board Members Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
            {boardMembers && boardMembers.map((member, index) => (
              <div
                key={index}
                className={`flex items-center cursor-pointer group w-full max-w-xs mx-auto px-3 py-2 sm:px-4 sm:py-3
        ${selectedMember && selectedMember.name === member.name
            ? "bg-cml-green text-white rounded-full shadow-lg"
            : "border-cml-green border-2 rounded-full hover:shadow-lg hover:bg-cml-green/10 transition-all duration-300"
        }`}
                onClick={() => setSelectedMember(member)}
              >
                <div className="relative flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 mr-3 sm:mr-4 rounded-full overflow-hidden bg-green-500">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div
                  className={`text-start ${selectedMember && selectedMember.name === member.name
                      ? "text-white"
                      : "text-gray-900"
                    }`}
                >
                  <h3 className="text-xs sm:text-sm md:text-base font-semibold transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-[10px] sm:text-xs md:text-sm">
                    {member.designation || member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Chairman Spotlight */}

          {selectedMember && (
            <div className="bg-white rounded-lg shadow-lg p-4 border-4 border-cml-green">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="flex justify-center lg:justify-start">
                  <div className="w-[366px] h-[366px] rounded-lg overflow-hidden">
                    <img
                      src={selectedMember.image}
                      alt={selectedMember.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="">
                  <div className="mb-6">
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">
                      {selectedMember.name?.toUpperCase()} {" "}
                      <span className="text-cml-orange text-xl">
                        {(selectedMember.designation || selectedMember.role)?.toUpperCase()}
                      </span>
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedMember.desc || selectedMember.bio}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-gray-600">
                          📧 Independent
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <Mail className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-600">
                          {selectedMember.email}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-600">
                          {selectedMember.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-cml-green mb-3">
                    EXPERIENCE
                  </h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    {(selectedMember.experience || []).map((exp, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-cml-orange rounded-full"></span>
                        <span>
                          {typeof exp === 'string' ? exp : `${exp.role}${exp.workplace ? `, ${exp.workplace}` : ''}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Team Members Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12">
            <span className="text-cml-orange">TEAM</span> MEMBERS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {members && members.map((member, index) => (
              <div key={index} className="group">
                <div
                  className={`border-t-4 border-r-4 ${index % 2 === 0 ? 'border-cml-green' : 'border-cml-orange'} overflow-hidden rounded-lg`}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-80 object-cover transition-transform duration-300"
                  />
                  <div className="bottom-4 p-4 left-4 right-4 text-black">
                    <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                    <p className="text-sm opacity-90 text-cml-green">
                      {member.role}
                    </p>
                    <p className="text-xs opacity-80">{member.experience}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;