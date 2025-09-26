import { useState, useEffect } from "react";
import { Calendar, FileText, Download, Loader2 } from "lucide-react";
import useTendersStore from "@/store/useTendersStore";
const Tenders = () => {
  const { tenders, loading, error, fetchTenders } = useTendersStore();
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    fetchTenders();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).toUpperCase();
  };

  const formatCurrency = (value) => {
    const num = parseInt(value);
    return `₹${(num / 100000).toFixed(1)}L`;
  };

  const isActive = (status) => status.toLowerCase() === 'active';

  const filteredTenders = tenders.filter(tender => {
    if (filterStatus === "all") return true;
    if (filterStatus === "active") return isActive(tender.status);
    if (filterStatus === "not-active") return !isActive(tender.status);
    return true;
  });

  const handleViewDocument = (pdfUrl) => {
    window.open(pdfUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-cml-green mx-auto mb-4" />
          <p className="text-gray-600">Loading tenders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchTenders}
            className="bg-cml-green text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Component would go here */}
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
          TENDERS
        </h1>
      </section>
    

      {/* Tenders Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredTenders.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-600 mb-2">No Tenders Found</h3>
              <p className="text-gray-500">
                {filterStatus === "all" 
                  ? "There are currently no tenders available."
                  : `There are no ${filterStatus.replace('-', ' ')} tenders at the moment.`
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTenders.map((tender) => (
                <div
                  key={tender.id}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border-2 border-gray-200"
                >
                  {/* Status Badge */}
                  <div className="flex justify-end mb-4">
                    {isActive(tender.status) ? (
                      <span className="bg-green-100 text-cml-green px-4 py-2 rounded-full text-sm font-bold">
                        ACTIVE
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-bold">
                        NOT ACTIVE
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-cml-black mb-4 leading-tight">
                    {tender.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                    {tender.desc}
                  </p>

                  {/* Requirements */}
                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-cml-black mb-3">
                      REQUIREMENTS
                    </h4>
                    <ul className="space-y-2">
                      {tender.requirements.map((req, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start">
                          <span className="w-2 h-2 bg-cml-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tender Details */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
   <div className="space-y-2 mb-6 text-sm">
                    <div>
                      <span className="font-bold text-cml-black">TENDER ID: </span>
                      <span className="text-gray-700">{tender.tender_id}</span>
                    </div>
                    <div>
                      <span className="font-bold text-cml-black">LAST DATE: </span>
                      <span className="text-gray-700">{formatDate(tender.last_date)}</span>
                    </div>
                    <div>
                      <span className="font-bold text-cml-black">ESTIMATED VALUE: </span>
                      <span className="text-gray-700">{formatCurrency(tender.estimated_value)}</span>
                    </div>
                  </div>

                  {/* View Document Button */}
                  <button 
                    onClick={() => handleViewDocument(tender.pdf)}
                    className={`font-bold py-3 px-6 rounded-full transition-colors duration-300 flex items-center justify-center gap-2 ${
                      isActive(tender.status)
                        ? "bg-cml-orange hover:bg-orange-600 text-white"
                        : "bg-gray-400 text-white cursor-not-allowed"
                    }`}
                    disabled={!isActive(tender.status)}
                  >
                    <FileText className="w-4 h-4" />
                    VIEW DOCUMENT
                  </button>
                </div>
               
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

 =

      {/* Footer Component would go here */}
    </div>
  );
};

export default Tenders;