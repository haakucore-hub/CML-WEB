import useBoardMemberStore from "@/store/ourMembersStore";
import { Mail, Phone } from "lucide-react";
import { useEffect, useState } from "react";

const AboutUs = () => {
  const { boardMembers, members, fetchBoardMembers, fetchMembers, loading, error } = useBoardMemberStore();

  useEffect(() => {
    fetchMembers();
    fetchBoardMembers();
  }, [fetchMembers, fetchBoardMembers]);


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

                <p className="leading-tight hidden md:block">
                  With its mandate of strengthening development in the region,
                  CML started its initiatives focusing on the domains of
                  training and capacity building, livelihood intervention
                  piloting and compilation and synthesis of sector information
                  for forging linkages and advocacy.
                </p>
              </div>
              <div className="relative p-3">
                <div className="absolute bg-cml-green bottom-0 left-0 w-[200px] h-[200px] "></div>
                <div className="z-30 relative ">
                  <img
                    src="674232734c37f917e2b2c5d7d52f9b804e072eb5.png"
                    alt="CML Team at work"
                    className="w-full h-auto  shadow-lg object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-6 text-gray-700 text-lg leading-relaxed">


                <p className="leading-tight  md:hidden">
                  With its mandate of strengthening development in the region,
                  CML started its initiatives focusing on the domains of
                  training and capacity building, livelihood intervention
                  piloting and compilation and synthesis of sector information
                  for forging linkages and advocacy.
                </p>
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
            {boardMembers && boardMembers.map((member: any, index) => (
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
  <div className="bg-white rounded-2xl  shadow-lg border-4 border-cml-green">
    <div className="grid grid-cols-1 lg:grid-cols-3 ">
      {/* Image Section */}
      <div className="flex items-center justify-center ">
        <div className=" overflow-hidden ">
          <img
            src={selectedMember.image}
            alt={selectedMember.name}
            className=" md:h-[400px] md:w-[400px] p-2"
          />
        </div>
      </div>

      {/* Details Section */}
      <div className="lg:col-span-1  p-8">
        <div className="mb-6">
          <h3 className="text-3xl font-bold text-gray-900 mb-2">
            {selectedMember.name?.toUpperCase()}{" "}
            
          </h3>
          <span className="text-cml-orange text-sm">
              {(selectedMember.designation || selectedMember.role)?.toUpperCase()}
            </span>
      <p className="text-gray-700 leading-relaxed mb-8">
        {(selectedMember.desc || selectedMember.bio)
          ?.split(" ")
          .slice(0, 75)
          .join(" ")} 
      </p>

        </div>

      <div className="flex justify-between gap-6">
  
  {/* Mail + Phone */}
  <div className="flex flex-col items-start  gap-2">
    <div className="flex  items-center gap-2">
            <Mail className="w-5 h-5 bg-cml-green text-white rounded" />
      <span className="text-sm text-gray-900">{selectedMember.email}</span>

    </div>
    <div className="flex items-center gap-2">
    <Phone className="w-5 h-5 bg-cml-green text-white rounded " />
      <span className="text-sm text-gray-900">{selectedMember.phone}</span>
        
    </div>
  </div>
</div>

      </div>

      {/* Experience Section */}
      <div className="lg:col-span-1 bg-[#01462414] border-t-2 md:border-t-0 md:border-l-2 border-cml-green p-8">
        <h4 className="text-2xl font-bold text-cml-green mb-6 text-right">
          EXPERIENCE
        </h4>
      <div className="space-y-0">
  {(selectedMember.experience || []).map((exp, index) => {
    const isLast = index === selectedMember.experience.length - 1;

    return (
      <div key={index} className="flex items-start gap-4">
        {/* Text Content */}
        <div className="flex-1 text-right">
          <div className="font-bold text-lg text-gray-900">{exp.role}</div>
          <div className="text-gray-700">{exp.workplace}</div>
        </div>
        
        {/* Timeline Dot and Line */}
        <div className="flex flex-col items-center">
          <div className="w-4 h-4 bg-orange-500 rounded-full flex-shrink-0"></div>
          {!isLast && (
            <div className="w-0.5 h-16 bg-orange-500"></div>
          )}
        </div>
      </div>
    );
  })}
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
            {members && members.map((member: any, index) => (
              <div key={index} className="group relative p-3">
                <div className={`absolute  top-0 right-0 w-[150px]  h-[170px]  ${index % 2 == 0 ? 'bg-cml-green' : 'bg-cml-orange'}`}></div>
                <div
                  className={` overflow-hidden rounded-bl-[4rem] z-30 relative `}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-80 object-cover transition-transform duration-300"
                  />

                </div>
                <div className=" bottom-4  p-4 left-4 right-4 text-black">
                  <h3 className="text-lg font-bold mb-1 uppercase">{member.name}</h3>
                  <p className="text-sm opacity-90 text-cml-green">
                    {member.role}
                  </p>
                  <p className="text-xs opacity-80">Experience: {member.experience} Years</p>
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