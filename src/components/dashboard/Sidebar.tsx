import React from 'react';

interface SidebarProps {
  activeView: 'create-job' | 'jobs' | 'company';
  onViewChange: (view: 'create-job' | 'jobs' | 'company') => void;
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange, className = '' }) => {
  return (
    <nav
      className={`flex w-[217px] h-screen flex-col justify-between items-center shrink-0 shadow-[0_4px_4px_0_#D5CDC5] px-1 py-3 rounded-[0_8px_8px_0] bg-white max-md:w-full max-md:h-auto max-md:flex-row max-md:justify-between max-md:px-4 max-md:py-3 max-sm:px-3 max-sm:py-2 ${className}`}
    >
      <div className="flex flex-col items-center gap-10 self-stretch relative max-md:flex-row max-md:gap-5 max-md:w-full">
        <div className="flex flex-col items-center gap-10 self-stretch relative max-md:flex-row max-md:gap-5 max-md:w-full max-sm:gap-3">
          {/* Logo */}
          <div className="flex w-[167px] h-9 justify-center items-center aspect-[60/13] relative px-0 py-[0.094px] max-md:w-[120px] max-md:h-auto max-sm:w-[100px]">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/3886b63a2367e7ff19c79c759b2c8243ad5e17ed?width=342"
              alt="Sinergi AI Platform Logo"
              className="flex w-[171px] items-center gap-2 shrink-0 absolute h-9 -left-0.5 top-0"
            />
          </div>
          
          {/* Navigation Menu */}
          <div className="flex flex-col items-start gap-2 self-stretch relative max-md:hidden">
            {/* Create Job Navigation */}
            <button 
              onClick={() => onViewChange('create-job')}
              className={`flex h-12 items-center gap-2 self-stretch relative px-4 py-3 rounded-lg transition-colors ${
                activeView === 'create-job' 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 22.9333H9C3.57 22.9333 1.25 20.6133 1.25 15.1833V9.18333C1.25 3.75333 3.57 1.43333 9 1.43333H11C11.41 1.43333 11.75 1.77333 11.75 2.18333C11.75 2.59333 11.41 2.93333 11 2.93333H9C4.39 2.93333 2.75 4.57333 2.75 9.18333V15.1833C2.75 19.7933 4.39 21.4333 9 21.4333H15C19.61 21.4333 21.25 19.7933 21.25 15.1833V13.1833C21.25 12.7733 21.59 12.4333 22 12.4333C22.41 12.4333 22.75 12.7733 22.75 13.1833V15.1833C22.75 20.6133 20.43 22.9333 15 22.9333Z" fill="currentColor"/>
                <path d="M8.5 17.6833C8.09 17.6833 7.75 17.3433 7.75 16.9333C7.75 16.5233 8.09 16.1833 8.5 16.1833C8.91 16.1833 9.25 16.5233 9.25 16.9333C9.25 17.3433 8.91 17.6833 8.5 17.6833Z" fill="currentColor"/>
                <path d="M12 17.6833C11.59 17.6833 11.25 17.3433 11.25 16.9333C11.25 16.5233 11.59 16.1833 12 16.1833C12.41 16.1833 12.75 16.5233 12.75 16.9333C12.75 17.3433 12.41 17.6833 12 17.6833Z" fill="currentColor"/>
                <path d="M15.5 17.6833C15.09 17.6833 14.75 17.3433 14.75 16.9333C14.75 16.5233 15.09 16.1833 15.5 16.1833C15.91 16.1833 16.25 16.5233 16.25 16.9333C16.25 17.3433 15.91 17.6833 15.5 17.6833Z" fill="currentColor"/>
              </svg>
              <span className="text-sm font-medium">Create Job</span>
            </button>

            {/* Jobs Navigation */}
            <button 
              onClick={() => onViewChange('jobs')}
              className={`flex h-12 items-center gap-2 self-stretch relative px-4 py-3 rounded-lg transition-colors ${
                activeView === 'jobs' 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 22.9333H7C3 22.9333 1 20.9333 1 16.9333V8.93333C1 4.93333 3 2.93333 7 2.93333H17C21 2.93333 23 4.93333 23 8.93333V16.9333C23 20.9333 21 22.9333 17 22.9333ZM7 4.43333C3.83 4.43333 2.5 5.76333 2.5 8.93333V16.9333C2.5 20.1033 3.83 21.4333 7 21.4333H17C20.17 21.4333 21.5 20.1033 21.5 16.9333V8.93333C21.5 5.76333 20.17 4.43333 17 4.43333H7Z" fill="currentColor"/>
                <path d="M12 14.9333C10.21 14.9333 8.75 13.4733 8.75 11.6833C8.75 9.89333 10.21 8.43333 12 8.43333C13.79 8.43333 15.25 9.89333 15.25 11.6833C15.25 13.4733 13.79 14.9333 12 14.9333ZM12 9.93333C11.03 9.93333 10.25 10.7133 10.25 11.6833C10.25 12.6533 11.03 13.4333 12 13.4333C12.97 13.4333 13.75 12.6533 13.75 11.6833C13.75 10.7133 12.97 9.93333 12 9.93333Z" fill="currentColor"/>
              </svg>
              <span className="text-sm font-medium">Jobs</span>
            </button>

            {/* Company Navigation */}
            <button 
              onClick={() => onViewChange('company')}
              className={`flex h-12 items-center gap-2 self-stretch relative px-4 py-3 rounded-lg transition-colors ${
                activeView === 'company' 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 21.9333H6C4.35 21.9333 3 20.5833 3 18.9333V7.93333C3 6.28333 4.35 4.93333 6 4.93333H8V3.93333C8 2.28333 9.35 0.933334 11 0.933334H13C14.65 0.933334 16 2.28333 16 3.93333V4.93333H18C19.65 4.93333 21 6.28333 21 7.93333V18.9333C21 20.5833 19.65 21.9333 18 21.9333ZM14 3.93333C14 3.38333 13.55 2.93333 13 2.93333H11C10.45 2.93333 10 3.38333 10 3.93333V4.93333H14V3.93333ZM19 7.93333C19 7.38333 18.55 6.93333 18 6.93333H6C5.45 6.93333 5 7.38333 5 7.93333V18.9333C5 19.4833 5.45 19.9333 6 19.9333H18C18.55 19.9333 19 19.4833 19 18.9333V7.93333Z" fill="currentColor"/>
                <path d="M12 14.9333C10.9 14.9333 10 14.0333 10 12.9333C10 11.8333 10.9 10.9333 12 10.9333C13.1 10.9333 14 11.8333 14 12.9333C14 14.0333 13.1 14.9333 12 14.9333Z" fill="currentColor"/>
              </svg>
              <span className="text-sm font-medium">Company</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer/User section */}
      <div className="flex flex-col items-center gap-2 relative max-md:hidden">
        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mb-2">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8Z" fill="#666"/>
            <path d="M8 10C5.33579 10 3.17157 11.6857 2.34315 14C2.15621 14.5 2.51957 15 3.07107 15H12.9289C13.4804 15 13.8438 14.5 13.6569 14C12.8284 11.6857 10.6642 10 8 10Z" fill="#666"/>
          </svg>
        </div>
        
        <button
          onClick={() => {
            // TODO: Implement proper logout functionality
            console.log('Logout clicked');
            // You can add logout logic here (clear auth tokens, redirect, etc.)
          }}
          className="flex items-center gap-2 text-gray-600 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors text-sm"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10.6667 11.3333L14 8L10.6667 4.66667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 8H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};