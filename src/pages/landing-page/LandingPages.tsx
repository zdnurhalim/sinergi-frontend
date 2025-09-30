import React from 'react';
import Hero from '@/components/onboarding/Hero';
import AIPrompting from '@/components/onboarding/AIPrompting';
import JobList from '@/components/onboarding/JobList';
import About from '@/components/onboarding/About';
import MoreFeatures from '@/components/onboarding/MoreFeatures';
import { jobListSample } from '@/types/JobRequirement';

function App() {
  return (
    <div className="relative flex min-h-screen flex-col bg-slate-600/5  text-white font-sans antialiased">
      {/* Top Aurora Background */}
      <div className="pointer-events-none absolute inset-x-0 top-[-20rem] mx-auto h-[40rem] opacity-60 blur-3xl" aria-hidden="true" style={{ background: 'radial-gradient(ellipse at center, rgba(170,205,229,0.25), rgba(246,193,120,0.18) 40%, rgba(170,205,229,0.1) 60%, transparent 70%)' }}></div>
      <div className="pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

      <main className="flex-1">
        <Hero />
        <AIPrompting />
        <JobList 
          jobListSample={jobListSample} 
          onSelect={(job) => console.log("Dipilih:", job)} 
        />
        <About />
        <MoreFeatures />
      </main>
    </div>
  );
}

export default App;