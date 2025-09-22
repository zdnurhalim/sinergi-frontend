import React, { useState } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { JobCreationForm } from '@/components/dashboard/JobCreationForm';
import { AIContextSection } from '@/components/dashboard/AIContextSection';
import { JobVersionCard } from '@/components/dashboard/JobVersionCard';
import { JobCard } from '@/components/dashboard/JobCard';
import { JobDetailsView } from '@/components/dashboard/JobDetailsView';
import { CompanySettings } from '@/components/dashboard/CompanySettings';
import { MultiStepJobForm } from '@/components/dashboard/MultiStepJobForm';

interface Job {
  id: number;
  title: string;
  company: string;
  description: string;
  status: 'draft' | 'published' | 'closed';
  applicants: number;
  createdAt: string;
}

const Dashboard = () => {
  const [selectedVersion, setSelectedVersion] = useState<'A' | 'B' | null>(null);
  const [activeView, setActiveView] = useState<'create-job' | 'jobs' | 'company'>('create-job');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [jobFormData, setJobFormData] = useState<any>(null);
  
  // Sample jobs data
  const [jobs] = useState<Job[]>([
    {
      id: 1,
      title: 'Social Media Specialist',
      company: 'KopiKreatif',
      description: 'We are looking for a creative Social Media Specialist to manage our Instagram, TikTok, and Twitter channels. Daily tasks include developing content calendars, creating engaging content, and community management.',
      status: 'published',
      applicants: 24,
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      title: 'Frontend Developer',
      company: 'TechStart Indonesia',
      description: 'Join our team as a Frontend Developer working with React, TypeScript, and modern web technologies. You will be responsible for building responsive user interfaces and collaborating with our design team.',
      status: 'draft',
      applicants: 0,
      createdAt: '2024-01-20'
    },
    {
      id: 3,
      title: 'Marketing Manager',
      company: 'GrowthCo',
      description: 'We are seeking an experienced Marketing Manager to lead our digital marketing initiatives, manage campaigns, and drive brand awareness across multiple channels.',
      status: 'published',
      applicants: 18,
      createdAt: '2024-01-10'
    },
    {
      id: 4,
      title: 'UX Designer',
      company: 'DesignHub',
      description: 'Looking for a talented UX Designer to create intuitive and engaging user experiences. You will work closely with product managers and developers to design user-centered solutions.',
      status: 'closed',
      applicants: 45,
      createdAt: '2024-01-05'
    }
  ]);

  const handleChooseVersion = (version: 'A' | 'B') => {
    setSelectedVersion(version);
    console.log(`Selected version ${version}`);
  };

  const handleJobFormComplete = (data: any) => {
    setJobFormData(data);
    console.log('Job form completed:', data);
  };

  const handleJobEdit = (id: number) => {
    console.log(`Edit job ${id}`);
  };

  const handleJobDelete = (id: number) => {
    console.log(`Delete job ${id}`);
  };

  const handleJobView = (id: number) => {
    const job = jobs.find(j => j.id === id);
    if (job) {
      setSelectedJob(job);
    }
  };

  const renderContent = () => {
    // Job Details View
    if (selectedJob) {
      return (
        <JobDetailsView 
          job={selectedJob} 
          onBack={() => setSelectedJob(null)} 
        />
      );
    }

    if (activeView === 'create-job') {
      // Show job versions if we have form data, otherwise show the multi-step form
      if (jobFormData) {
        return (
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Back button */}
            <button
              onClick={() => setJobFormData(null)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to Form
            </button>
            
            {/* Job Versions Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Generated Job Versions</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <JobVersionCard
                  version="A"
                  title={`${jobFormData.job.position} - Professional Focus`}
                  content={`🚀 Join ${jobFormData.company.companyName}'s Team!

We're looking for a ${jobFormData.job.position} to join our ${jobFormData.company.industry} team.

Daily Responsibilities:
${jobFormData.job.dailyTasks}

What We're Looking For:
${jobFormData.job.specificDetails}

${jobFormData.preferences.includeSalaryRange ? `💰 Salary: ${jobFormData.job.salaryRange}` : ''}
${jobFormData.preferences.includeCompanyName ? `🏢 Company: ${jobFormData.company.companyName}` : ''}

Ready to make an impact? Apply now!`}
                  onChoose={() => handleChooseVersion('A')}
                />
                
                <JobVersionCard
                  version="B"
                  title={`${jobFormData.job.position} - Growth Focused`}
                  content={`✨ Shape Your Career with ${jobFormData.company.companyName}!

We're seeking a talented ${jobFormData.job.position} to drive innovation in our ${jobFormData.company.industry} organization.

Your Mission:
${jobFormData.job.dailyTasks}

The Perfect Fit:
${jobFormData.job.specificDetails}

${jobFormData.preferences.includeSalaryRange ? `💼 Compensation: ${jobFormData.job.salaryRange}` : ''}
${jobFormData.preferences.includeCompanyName ? `🌟 Join: ${jobFormData.company.companyName}` : ''}

Take the next step in your career journey!`}
                  onChoose={() => handleChooseVersion('B')}
                />
              </div>
              
              {selectedVersion && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 font-medium">
                    ✅ Version {selectedVersion} selected! You can now proceed to publish or further customize this job ad.
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      } else {
        return (
          <div className="max-w-4xl mx-auto">
            <MultiStepJobForm onComplete={handleJobFormComplete} />
          </div>
        );
      }
    }

    // Company Settings View
    if (activeView === 'company') {
      return <CompanySettings />;
    }

    // Jobs List View
    return (
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">All Jobs</h1>
          <button
            onClick={() => setActiveView('create-job')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Create New Job
          </button>
        </div>
        
        <div className="space-y-4">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onEdit={handleJobEdit}
              onDelete={handleJobDelete}
              onView={handleJobView}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen flex">
      {/* Left Column - Sidebar */}
      <div className="w-[217px] flex-shrink-0">
        <Sidebar 
          activeView={activeView}
          onViewChange={setActiveView}
        />
      </div>
      
      {/* Right Column - Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;