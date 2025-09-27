import React from 'react';

interface JobVersionCardProps {
  version: string;
  title: string;
  content: string;
  onChoose: () => void;
  className?: string;
}

export const JobVersionCard: React.FC<JobVersionCardProps> = ({ 
  version, 
  title, 
  content, 
  onChoose, 
  className = '' 
}) => {
  // Parse content for better formatting
  const formatContent = (text: string) => {
    return text.split('\n').map((line, index) => {
      if (line.trim() === '') return null;
      
      // Handle emoji lines (titles/sections)
      if (line.match(/^[🚀✨☕💰💼🏢🌟📍]/)) {
        return (
          <div key={index} className="font-semibold text-gray-900 text-base mb-3">
            {line}
          </div>
        );
      }
      
      // Handle bullet points
      if (line.trim().startsWith('•')) {
        return (
          <div key={index} className="ml-4 text-gray-700 text-sm mb-1 flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            <span>{line.trim().substring(1).trim()}</span>
          </div>
        );
      }
      
      // Handle regular paragraphs
      return (
        <div key={index} className="text-gray-700 text-sm mb-2 leading-relaxed">
          {line}
        </div>
      );
    }).filter(Boolean);
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-[500px] ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {version}
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
          <div className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">
            Version {version}
          </div>
        </div>
      </div>
      
      {/* Content - Takes up available space */}
      <div className="px-6 pt-6 pb-4 flex-1 overflow-y-auto">
        <div className="space-y-2 text-justify">
          {formatContent(content)}
        </div>
      </div>
      
      {/* Action Button - Always at bottom */}
      <div className="px-6 pb-6 flex-shrink-0">
        <button
          onClick={onChoose}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 shadow-sm"
        >
          <span>Choose this Version</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};
