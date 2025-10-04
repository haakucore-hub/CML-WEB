import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload } from "lucide-react";

const CollaborateSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    designation: "",
    state: "",
    district: "",
    areasOfInterest: [] as string[],
    message: "",
    document: null as File | null
  });

  const states = [
    "Assam", "Arunachal Pradesh", "Manipur", "Meghalaya", 
    "Mizoram", "Nagaland", "Sikkim", "Tripura"
  ];

  const districts = {
    "Assam": ["Kamrup", "Guwahati", "Dibrugarh", "Jorhat", "Silchar"],
    "Arunachal Pradesh": ["Itanagar", "Tawang", "Bomdila", "Pasighat"],
    "Manipur": ["Imphal East", "Imphal West", "Thoubal", "Bishnupur"],
    "Meghalaya": ["East Khasi Hills", "West Khasi Hills", "Garo Hills"],
    "Mizoram": ["Aizawl", "Lunglei", "Champhai", "Kolasib"],
    "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Tuensang"],
    "Sikkim": ["East Sikkim", "West Sikkim", "North Sikkim", "South Sikkim"],
    "Tripura": ["West Tripura", "South Tripura", "Dhalai", "North Tripura"]
  };

  const areasOfInterest = ["WaSH", "Education", "Livelihood", "Institution Building", "Other"];

  const handleAreaOfInterestChange = (area: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      areasOfInterest: checked 
        ? [...prev.areasOfInterest, area]
        : prev.areasOfInterest.filter(item => item !== area)
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, document: file }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission logic here
  };

  return (
    <section className="py-6 " id="collaborate">
      <div className="container mx-auto px-4 ">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-body-header text-cml-green mb-8 text-center">
            <span className="text-cml-orange">COLLABORATE</span>  WITH US 
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-label text-cml-black">Name</Label>
                <Input
                  id="name"
                  placeholder="Write your name here..."
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="border-gray-300"
                />
              </div>

              {/* Regions of Interest */}
              <div className="space-y-2">
                <Label className="text-label text-cml-black">Regions of Interest</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Select value={formData.state} onValueChange={(value) => setFormData(prev => ({ ...prev, state: value, district: "" }))}>
                    <SelectTrigger className="border-gray-300">
                      <SelectValue placeholder="State" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border shadow-lg">
                      {states.map((state) => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={formData.district} onValueChange={(value) => setFormData(prev => ({ ...prev, district: value }))}>
                    <SelectTrigger className="border-gray-300">
                      <SelectValue placeholder="District" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border shadow-lg">
                      {formData.state && districts[formData.state as keyof typeof districts]?.map((district) => (
                        <SelectItem key={district} value={district}>{district}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="outline" size="sm" className="text-white bg-cml-green border-cml-green hover:bg-cml-green/90">
                  + Add
                </Button>
              </div>

              {/* Phone No. */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-label text-cml-black">Phone No.</Label>
                <Input
                  id="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="border-gray-300"
                />
              </div>

              {/* Designation */}
              <div className="space-y-2">
                <Label htmlFor="designation" className="text-label text-cml-black">Designation</Label>
                <Input
                  id="designation"
                  placeholder="Designation"
                  value={formData.designation}
                  onChange={(e) => setFormData(prev => ({ ...prev, designation: e.target.value }))}
                  className="border-gray-300"
                />
              </div>

              {/* Email Address */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="email" className="text-label text-cml-black">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="border-gray-300"
                />
              </div>
            </div>

            {/* Area of Interest */}
            <div className="space-y-3">
              <Label className="text-label text-cml-black">Area of Interest</Label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {areasOfInterest.map((area) => (
                  <div key={area} className="flex items-center space-x-2">
                    <Checkbox
                      id={area}
                      checked={formData.areasOfInterest.includes(area)}
                      onCheckedChange={(checked) => handleAreaOfInterestChange(area, checked as boolean)}
                      className="border-cml-green data-[state=checked]:bg-cml-green"
                    />
                    <Label htmlFor={area} className="text-body text-cml-black cursor-pointer">
                      {area}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Upload Document */}
              <div className="space-y-3">
                <Label className="text-label text-cml-black">Upload Document</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    id="document"
                    className="hidden"
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx,.jpg,.png"
                  />
                  <label
                    htmlFor="document"
                    className="cursor-pointer inline-flex items-center justify-center gap-2 bg-cml-green text-white px-4 py-2 rounded-md hover:bg-cml-green/90 transition-colors"
                  >
                    <Upload className="h-4 w-4" />
                    Select Files
                  </label>
                  <p className="text-sm text-gray-500 mt-2">
                    Max. supported: .xlsx .xlxs .txt .pdf .zip
                  </p>
                  {formData.document && (
                    <p className="text-sm text-cml-green mt-2">
                      Selected: {formData.document.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-label text-cml-black">Message (Optional)</Label>
                <Textarea
                  id="message"
                  placeholder="Write a message..."
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="border-gray-300 min-h-[120px] resize-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end text-white">
              <Button 
                type="submit" 
                className="bg-cml-green text-white hover:bg-cml-green/90 px-8 py-2 text-cta"
              >
                SUBMIT
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CollaborateSection;