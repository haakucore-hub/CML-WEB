
import { Button } from "@/components/ui/button";
import { ChevronDown, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import useCareersStore from "@/store/useCareersStore";


const Career = () => {

    const { careers, fetchCareers, loading, error } = useCareersStore();

  useEffect(() => {
    fetchCareers();
  }, [fetchCareers]);


  console.log("Careers data:", careers);

  const jobPostings = careers || [] ;


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
        <h1 className="relative text-cml-orange text-4xl sm:text-5xl md:text-6xl font-bold  text-center">
          <span className="text-white">CAREERS</span>
        </h1>
      </section>

      <div className="p-6 md:p-16 bg-white ">


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobPostings.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-cmt-green"
            >
              {/* Job Type and Status */}
              <div className="flex justify-between items-start mb-4">
                <span className="bg-cml-green text-white px-4 py-2 rounded-full text-sm font-semibold">
                  {job.type} | {job.job_level
}
                </span>
                <span className="bg-green-100 text-cml-green px-3 py-1 rounded-full text-sm font-semibold">
                  {job.status}
                </span>
              </div>

              {/* Job Title */}
              <h2 className="text-2xl font-bold text-cml-black mb-2 leading-tight">
                {job.title}
              </h2>

              {/* Department */}
              <h3 className="text-xl font-bold text-cml-orange mb-4">
                {job.category}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                {job.desc}
              </p>

              {/* Requirements Section */}
              <div className="mb-6">
                <h4 className="text-lg font-bold text-cml-black mb-3">
                  REQUIREMENTS
                </h4>
                <ul className="space-y-2">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start">
                      <span className="w-2 h-2 bg-cml-orange rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between ">
                {/* Location and Experience */}
                <div className="mb-6 space-y-2">
                  <div className="text-sm">
                    <span className="font-bold text-cml-black">LOCATION: </span>
                    <span className="text-gray-700">{job.location}</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-bold text-cml-black">EXPERIENCE: </span>
                    <span className="text-gray-700">{job.experience}</span>
                  </div>
                </div>

                {/* Apply Button */}
                <button className=" bg-cml-orange hover:bg-orange-600 text-white md:font-bold py-2 px-2 rounded-full transition-colors duration-300">
                  APPLY NOW
                </button>
              </div>

            </div>
          ))}
        </div>


      </div>





    </div>
  );
};

export default Career;
