import React, { useState, useEffect  } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CompanyService, CompanyResponse } from "@/services/CompanyService"; 
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface CompanyData {
  companyName: string;
  industry: string;
  companySize: string;
  otherInformation: string;
  website: string;
}

export const CompanySettings: React.FC = () => {

  const token = useSelector((state: RootState) => state.auth.token);
  const companyId = useSelector((state: RootState) => state.auth.data?.company?.id);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCompany = async () => {
      if (!companyId || !token) return;

      try {
        setLoading(true);
        const service = new CompanyService();
        const response: CompanyResponse = await service.getCompany(companyId, token);

        const data = response.data;
        setCompanyData({
          companyName: data.company_name,
          industry: data.industry || "",
          companySize: data.company_size || "",
          otherInformation: data.other_information || "",
          website: data.website || "",
        });
      } catch (err) {
        console.error("Failed to fetch company:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [companyId, token]);

  const [companyData, setCompanyData] = useState<CompanyData>({
    companyName: "",
    industry: "",
    companySize: "",
    otherInformation: "",
    website: "",
  });

  const [open, setOpen] = useState(false);

  const handleInputChange = (field: keyof CompanyData, value: string) => {
    setCompanyData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    if (!companyId || !token) return;
    
    try {
      setLoading(true);
      const service = new CompanyService();
    
      await service.updateCompany(
        companyId,
        {
          id: companyId,
          company_name: companyData.companyName,
          industry: companyData.industry || null,
          company_size: companyData.companySize || null,
          other_information: companyData.otherInformation || null,
          website: companyData.website || null,
        },
        token
      );
    
      console.log("Company updated successfully");
      setOpen(false);
    } catch (err) {
      console.error("Failed to update company:", err);
    } finally {
      setLoading(false);
    }
  };

  const industries = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "Manufacturing",
    "Retail",
    "Consulting",
    "Marketing & Advertising",
    "Real Estate",
    "Transportation",
    "Food & Beverage",
    "Entertainment",
    "Non-profit",
    "Government",
    "Other",
  ];

  const companySizes = [
    { value: "small", label: "Small (1-50 employees)" },
    { value: "middle", label: "Middle (51-200 employees)" },
    { value: "enterprise", label: "Enterprise (200+ employees)" },
  ];

  return (
    <div className="mx-auto space-y-6">
      {/* Preview Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Company Profile</h1>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>

            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Edit Company Profile</DialogTitle>
              </DialogHeader>

              <div className="space-y-4 mt-4">
                {/* Company Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <Input
                    value={companyData.companyName}
                    onChange={(e) => handleInputChange("companyName", e.target.value)}
                    placeholder="Enter your company name"
                  />
                </div>

                {/* Website */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Website
                  </label>
                  <Input
                    value={companyData.website}
                    onChange={(e) => handleInputChange("companyName", e.target.value)}
                    placeholder="Enter your website URL"
                  />
                </div>

                {/* Industry */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Industry
                  </label>
                  <Select
                    value={companyData.industry}
                    onValueChange={(value) => handleInputChange("industry", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Company Size */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Size
                  </label>
                  <Select
                    value={companyData.companySize}
                    onValueChange={(value) => handleInputChange("companySize", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                    <SelectContent>
                      {companySizes.map((size) => (
                        <SelectItem key={size.value} value={size.value}>
                          {size.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Other Info */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Other Information
                  </label>
                  <Textarea
                    value={companyData.otherInformation}
                    onChange={(e) => handleInputChange("otherInformation", e.target.value)}
                    placeholder="Company culture, mission, values, etc."
                    rows={4}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Company Profile Preview */}
<div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
  {/* Header dengan background */}
  <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 flex items-center gap-4">
    {/* Logo placeholder */}
    <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shadow-md">
      <span className="text-blue-700 font-bold text-xl">
        {companyData.companyName?.charAt(0) || "C"}
      </span>
    </div>
    <div>
      <h2 className="text-2xl font-bold text-white">
        {companyData.companyName || "Company Name"}
      </h2>
      <p className="text-blue-100 text-sm">
        {companyData.industry || "Industry not specified"}
      </p>
    </div>
  </div>

  {/* Detail Section */}
  <div className="p-6 space-y-6">
    {/* Website */}
    <div>
      <h3 className="text-sm font-semibold text-gray-700 mb-1">Website</h3>
      <p className="text-gray-600">
        {companyData.website ? (
          <a
            href={companyData.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {companyData.website}
          </a>
        ) : (
          "Not provided"
        )}
      </p>
    </div>

    {/* Industry */}
    <div>
      <h3 className="text-sm font-semibold text-gray-700 mb-1">Industry</h3>
      <p className="text-gray-600">
        {companyData.industry || "Not specified"}
      </p>
    </div>

    {/* Company Size */}
    <div>
      <h3 className="text-sm font-semibold text-gray-700 mb-1">Company Size</h3>
      <p className="text-gray-600">
        {companySizes.find((s) => s.value === companyData.companySize)?.label ||
          "Not specified"}
      </p>
    </div>

    {/* Additional Information */}
    {companyData.otherInformation && (
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-1">
          About the Company
        </h3>
        <p className="text-gray-600 leading-relaxed whitespace-pre-line">
          {companyData.otherInformation}
        </p>
      </div>
    )}
  </div>
</div>

      </div>
    </div>
  );
};
