import { useState } from "react";
import { useInquiryStore } from '@/store/useInquiryStore';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, X } from "lucide-react";

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

  const [regions, setRegions] = useState<Array<{ state: string; district: string }>>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleAddRegion = () => {
    if (formData.state && formData.district) {
      const isDuplicate = regions.some(
        r => r.state === formData.state && r.district === formData.district
      );
      
      if (isDuplicate) {
        toast.error('This region is already added');
        return;
      }

      setRegions(prev => [...prev, { state: formData.state, district: formData.district }]);
      setFormData(prev => ({ ...prev, state: "", district: "" }));
      toast.success('Region added successfully');
    } else {
      toast.error('Please select both state and district');
    }
  };

  const handleRemoveRegion = (index: number) => {
    setRegions(prev => prev.filter((_, i) => i !== index));
    toast.success('Region removed');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        toast.error('File size should not exceed 10MB');
        return;
      }
      setFormData(prev => ({ ...prev, document: file }));
      toast.success('File selected successfully');
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error('Please enter your name');
      return false;
    }
    if (!formData.phone.trim()) {
      toast.error('Please enter your phone number');
      return false;
    }
    if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
      toast.error('Please enter a valid phone number');
      return false;
    }
    if (!formData.email.trim()) {
      toast.error('Please enter your email address');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    if (!formData.designation.trim()) {
      toast.error('Please enter your designation');
      return false;
    }
    if (regions.length === 0) {
      toast.error('Please add at least one region of interest');
      return false;
    }
    if (formData.areasOfInterest.length === 0) {
      toast.error('Please select at least one area of interest');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const inquiryPayload = {
        Regions: regions,
        designation: formData.designation,
        email: formData.email,
        file: formData.document ? formData.document.name : undefined,
        interests: {
          areas: formData.areasOfInterest,
        },
         msg: formData.message,
          name: formData.name,
          pending_inquiries: 0,
          phone: formData.phone,
      };

      const addInquiry = useInquiryStore.getState().addInquiry;
      await addInquiry(inquiryPayload as any);
      
      toast.success('Inquiry submitted successfully! We will get back to you soon.');
      
      // Reset form
      setFormData({
        name: "",
        phone: "",
        email: "",
        designation: "",
        state: "",
        district: "",
        areasOfInterest: [],
        message: "",
        document: null
      });
      setRegions([]);
      
      // Reset file input
      const fileInput = document.getElementById('document') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Failed to submit inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-6" id="collaborate">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-body-header text-cml-green mb-8 text-center">
            <span className="text-cml-orange">COLLABORATE</span> WITH US 
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-label text-cml-black">
                  Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="Write your name here..."
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="border-gray-300"
                  required
                />
              </div>

              {/* Phone No. */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-label text-cml-black">
                  Phone No. <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="border-gray-300"
                  required
                />
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-label text-cml-black">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="border-gray-300"
                  required
                />
              </div>

              {/* Designation */}
              <div className="space-y-2">
                <Label htmlFor="designation" className="text-label text-cml-black">
                  Designation <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="designation"
                  placeholder="Designation"
                  value={formData.designation}
                  onChange={(e) => setFormData(prev => ({ ...prev, designation: e.target.value }))}
                  className="border-gray-300"
                  required
                />
              </div>

              {/* Regions of Interest */}
              <div className="space-y-2 md:col-span-2">
                <Label className="text-label text-cml-black">
                  Regions of Interest <span className="text-red-500">*</span>
                </Label>
                <div className="flex flex-col md:flex-row gap-2">
                  <Select 
                    value={formData.state} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, state: value, district: "" }))}
                  >
                    <SelectTrigger className="border-gray-300 md:w-1/3">
                      <SelectValue placeholder="Select State" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border shadow-lg">
                      {states.map((state) => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select 
                    value={formData.district} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, district: value }))}
                    disabled={!formData.state}
                  >
                    <SelectTrigger className="border-gray-300 md:w-1/3">
                      <SelectValue placeholder="Select District" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border shadow-lg">
                      {formData.state && districts[formData.state as keyof typeof districts]?.map((district) => (
                        <SelectItem key={district} value={district}>{district}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button 
                    type="button"
                    onClick={handleAddRegion}
                    variant="outline" 
                    className="text-white bg-cml-green border-cml-green hover:bg-cml-green/90 md:w-auto"
                  >
                    + Add Region
                  </Button>
                </div>

                {/* Display added regions */}
                {regions.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {regions.map((region, index) => (
                      <div 
                        key={index}
                        className="flex items-center gap-2 bg-cml-green/10 text-cml-green px-3 py-1 rounded-full text-sm"
                      >
                        <span>{region.state} - {region.district}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveRegion(index)}
                          className="hover:bg-cml-green/20 rounded-full p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Area of Interest */}
            <div className="space-y-3">
              <Label className="text-label text-cml-black">
                Area of Interest <span className="text-red-500">*</span>
              </Label>
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
                    accept=".pdf,.doc,.docx,.xlsx,.xls,.txt,.zip,.jpg,.jpeg,.png"
                  />
                  <label
                    htmlFor="document"
                    className="cursor-pointer inline-flex items-center justify-center gap-2 bg-cml-green text-white px-4 py-2 rounded-md hover:bg-cml-green/90 transition-colors"
                  >
                    <Upload className="h-4 w-4" />
                    Select Files
                  </label>
                  <p className="text-sm text-gray-500 mt-2">
                    Max. supported: .xlsx .xls .txt .pdf .zip (Max 10MB)
                  </p>
                  {formData.document && (
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <p className="text-sm text-cml-green">
                        Selected: {formData.document.name}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({ ...prev, document: null }));
                          const fileInput = document.getElementById('document') as HTMLInputElement;
                          if (fileInput) fileInput.value = '';
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
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
                disabled={isSubmitting}
                className="bg-cml-green text-white hover:bg-cml-green/90 px-8 py-2 text-cta disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CollaborateSection;