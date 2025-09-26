import { useState, useEffect } from "react";
import { Calendar, Download, FileText, Loader2, Eye } from "lucide-react";
import useReportStore from '@/store/useReportStore';



const AnnualReportsPage = () => {
  const { reports, fetchReports, loading, error } = useReportStore();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);



  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-cml-green mx-auto mb-4" />
          <p className="text-gray-600">Loading annual reports...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchReports}
            className="bg-cml-green text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

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
          ANNUAL<span className="text-cml-orange">REPORTS</span>
        </h1>
      </section>

      {/* Reports Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {reports.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-600 mb-2">No Reports Found</h3>
              <p className="text-gray-500">
                {searchTerm ? "Try adjusting your search terms." : "No annual reports are currently available."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {reports.map((report) => (
                <div key={report.id} className="flex flex-col">
                  {/* Report Cover */}
                  <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-full group">
                    <div className="relative">
                      <img
                        src={report.thumbnail || '/api/placeholder/400/600'}
                        alt={report.title}
                        className="w-full h-auto object-cover"
                      />
                      
                      {/* Overlay on Hover */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="text-center space-y-3">
                          <button 
                            className="bg-cml-orange text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors flex items-center gap-2 mx-auto"
                            onClick={() => window.open(report.pdf, '_blank')}
                          >
                            <Eye className="w-4 h-4" />
                            VIEW REPORT
                          </button>
                          <button 
                            className="bg-cml-green text-white px-6 py-2 rounded-full font-semibold hover:bg-green-700 transition-colors flex items-center gap-2 mx-auto"
                            onClick={() => {
                              const link = document.createElement('a');
                              link.href = report.pdf;
                              link.download = `${report.title}.pdf`;
                              link.click();
                            }}
                          >
                            <Download className="w-4 h-4" />
                            DOWNLOAD
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Report Year */}
                  <div className="mt-4 text-center">
                    <h3 className="text-xl font-bold text-cml-black">
                      {report.year}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
};

export default AnnualReportsPage;