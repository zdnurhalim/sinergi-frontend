import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CompanyData {
  companyName: string;
  industry: string;
  companySize: string;
  otherInformation: string;
}

export const CompanySettings: React.FC = () => {
  const [companyData, setCompanyData] = useState<CompanyData>({
    companyName: '',
    industry: '',
    companySize: '',
    otherInformation: ''
  });

  const handleInputChange = (field: keyof CompanyData, value: string) => {
    setCompanyData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving company data:', companyData);
    // TODO: Integrate with backend to save company data
  };

  const industries = [
    'Technology',
    'Healthcare',
    'Finance',
    'Education',
    'Manufacturing',
    'Retail',
    'Consulting',
    'Marketing & Advertising',
    'Real Estate',
    'Transportation',
    'Food & Beverage',
    'Entertainment',
    'Non-profit',
    'Government',
    'Other'
  ];

  const companySizes = [
    { value: 'small', label: 'Small (1-50 employees)' },
    { value: 'middle', label: 'Middle (51-200 employees)' },
    { value: 'enterprise', label: 'Enterprise (200+ employees)' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Company Information</h1>
        
        <div className="space-y-6">
          {/* Company Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Name
            </label>
            <input
              type="text"
              value={companyData.companyName}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
              placeholder="Enter your company name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Industry */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Industry
            </label>
            <Select value={companyData.industry} onValueChange={(value) => handleInputChange('industry', value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your industry" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-lg rounded-lg z-50 max-h-60 overflow-y-auto">
                {industries.map((industry) => (
                  <SelectItem key={industry} value={industry} className="hover:bg-gray-100">
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Company Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Size
            </label>
            <Select value={companyData.companySize} onValueChange={(value) => handleInputChange('companySize', value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your company size" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-lg rounded-lg z-50">
                {companySizes.map((size) => (
                  <SelectItem key={size.value} value={size.value} className="hover:bg-gray-100">
                    {size.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Other Information */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Other Information
            </label>
            <textarea
              value={companyData.otherInformation}
              onChange={(e) => handleInputChange('otherInformation', e.target.value)}
              placeholder="Enter any additional information about your company (company culture, mission, values, etc.)"
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Save Company Information
            </button>
          </div>
        </div>
      </div>

      {/* Preview Section */}
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Company Profile Preview</h2>
        <div className="space-y-3 text-sm">
          <div>
            <span className="font-medium text-gray-700">Company:</span>
            <span className="ml-2 text-gray-600">{companyData.companyName || 'Not specified'}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Industry:</span>
            <span className="ml-2 text-gray-600">{companyData.industry || 'Not specified'}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Size:</span>
            <span className="ml-2 text-gray-600">
              {companySizes.find(size => size.value === companyData.companySize)?.label || 'Not specified'}
            </span>
          </div>
          {companyData.otherInformation && (
            <div>
              <span className="font-medium text-gray-700">Additional Info:</span>
              <p className="ml-2 text-gray-600 mt-1 whitespace-pre-line">{companyData.otherInformation}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
