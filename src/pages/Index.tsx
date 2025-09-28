import React from 'react';
import Navbar from '@/components/onboarding/Navbar';
import Hero from '@/components/onboarding/Hero';
import AIPrompting from '@/components/onboarding/AIPrompting';
import JobList from '@/components/onboarding/JobList';
import About from '@/components/onboarding/About';
import MoreFeatures from '@/components/onboarding/MoreFeatures';
import Footer from '@/components/onboarding/Footer';

function App() {
  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-r from-[#f6c178] to-[#aacde5]  text-white font-sans antialiased">
      {/* Top Aurora Background */}
      <div className="pointer-events-none absolute inset-x-0 top-[-20rem] mx-auto h-[40rem] w-[80rem] opacity-60 blur-3xl" aria-hidden="true" style={{ background: 'radial-gradient(ellipse at center, rgba(170,205,229,0.25), rgba(246,193,120,0.18) 40%, rgba(170,205,229,0.1) 60%, transparent 70%)' }}></div>
      <div className="pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

      <Navbar />

      <main className="flex-1">
        <Hero />
        <AIPrompting />
        <JobList />
        <About />
        <MoreFeatures />
        <Footer />
      </main>

      {/* Tambahkan komponen footer di sini jika ada */}
    </div>
  );
}

export default App;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import Header from '@/components/Header';
// import Hero from '@/components/Hero';
// import FeatureSection from '@/components/FeatureSection';
// import FeatureCard from '@/components/FeatureCard';
// import Newsletter from '@/components/Newsletter';
// import Footer from '@/components/Footer';

// const Index = () => {
//   return (
//     <div className="bg-white flex flex-col overflow-hidden items-stretch">
//       {/* Hero Section with Header */}
//       <div className="flex flex-col relative min-h-[673px] w-full items-stretch text-white pt-[22px] pb-[158px] px-10 max-md:max-w-full max-md:pb-[100px] max-md:px-5">
//         <img
//           src="https://api.builder.io/api/v1/image/assets/TEMP/df095bc2f4e8115febab0386b8096ac19c3a4553?placeholderIfAbsent=true"
//           alt="Hero background"
//           className="absolute h-full w-full object-cover inset-0"
//         />
//         <Header />
//         <div className="relative self-center flex w-[525px] max-w-full flex-col items-center mt-[135px] -mb-8 max-md:mt-10 max-md:mb-2.5">
//           <h1 className="text-[40px] font-semibold text-center max-md:max-w-full">
//             The Intelligent Way
//             <br />
//             to <span style={{ backgroundImage: 'var(--gradient-hire)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Hire</span> and <span style={{ backgroundImage: 'var(--gradient-develop)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Develop</span> Talent
//           </h1>
//           <p className="text-base font-normal leading-6 tracking-[0.8px] text-center self-stretch mt-10 max-md:max-w-full">
//             Attract better candidates by starting smarter,
//             <br />
//             Sinergi AI help you define your ideal role and requirements{" "}
//             <span className="font-medium">before you even write the ad</span>
//           </p>
//           <Link 
//             to="/onboarding"
//             className="shadow-[0px_4px_4px_rgba(0,0,0,0.25)] flex items-center gap-2.5 text-lg text-[rgba(29,31,34,1)] font-medium justify-center mt-10 px-8 py-4 rounded-[10px] transition-colors max-md:px-5 hover:opacity-90" 
//             style={{ backgroundImage: 'var(--gradient-hero-cta)' }}
//           >
//             <span className="self-stretch my-auto">
//               Try Sinergi.AI Now
//             </span>
//           </Link>
//         </div>
//       </div>

//       {/* Main Content */}
//       <main className="self-center flex w-full max-w-[1121px] flex-col items-stretch mt-[69px] max-md:max-w-full max-md:mt-10">
//         {/* First Feature Section */}
//         <FeatureSection
//           title="Sinergi AI help you even\nbefore you write job ad"
//           description="Ever wonder why some job ads attract quality talent while others fall flat?\n\nThe title, tone, and skills you wrote determine who applies, even their salary expectations. Sinergi AI helps you optimize every detail to ensure you attract the talent you actually want."
//           imageSrc="https://api.builder.io/api/v1/image/assets/TEMP/50e7ab3c89c429e158905c4772cda2d2aff26277?placeholderIfAbsent=true"
//           imageAlt="Job ad optimization interface"
//           buttonText="Try Sinergi.AI Now"
//         />

//         {/* Second Feature Section */}
//         <div className="mt-20 max-md:mt-10">
//           <FeatureSection
//             title="Customized Learning,\nMade Effortless"
//             description="Employee specialized training has always been expensive, or generic online video courses.With the Talent Development Module from SinergiAI, you can instantly create specific curriculum tailored to your company's goals, a division's needs, or even an individual's growth path—all from a single prompt."
//             imageSrc="https://api.builder.io/api/v1/image/assets/TEMP/50e7ab3c89c429e158905c4772cda2d2aff26277?placeholderIfAbsent=true"
//             imageAlt="Customized learning platform interface"
//             buttonText="# Coming Soon"
//             buttonVariant="coming-soon"
//             reverse={true}
//           />
//         </div>

//         {/* More Features Section */}
//         <section className="flex w-full flex-col items-stretch mt-20 max-md:max-w-full max-md:mt-10">
//           <h2 className="text-[rgba(40,68,83,1)] text-[32px] font-semibold text-center max-md:max-w-full">
//             More Features
//           </h2>
//           <div className="flex w-full items-center gap-[25px] flex-wrap mt-10 max-md:max-w-full">
//             <FeatureCard
//               title="AI CV Screener"
//               description="Effortlessly screen hundreds or even thousands of CVs with our smart screener in minutes.\n\nOur AI instantly delivers a shortlist of the best candidates, complete with summaries."
//               imageSrc="https://api.builder.io/api/v1/image/assets/TEMP/9fcbf2c47287b48b530fb83a6df63033ac5ed39c?placeholderIfAbsent=true"
//               imageAlt="AI CV screening interface"
//             />
//             <FeatureCard
//               title="Talent Pool & Sourcing"
//               description="Source candidates using our private job links to maintain company confidentiality.\n\nAll applicant data is automatically captured and organized into your own, searchable talent pool."
//               imageSrc="https://api.builder.io/api/v1/image/assets/TEMP/9fcbf2c47287b48b530fb83a6df63033ac5ed39c?placeholderIfAbsent=true"
//               imageAlt="Talent pool management interface"
//             />
//             <FeatureCard
//               title="Generated Interviewer Scripts"
//               description="Our AI generates a unique script of insightful questions tailored specifically to each candidates.\n\nEmpowers you to uncover their true skills and get to know them on a deeper level."
//               imageSrc="https://api.builder.io/api/v1/image/assets/TEMP/9fcbf2c47287b48b530fb83a6df63033ac5ed39c?placeholderIfAbsent=true"
//               imageAlt="Interview script generation interface"
//             />
//           </div>
//         <div className="self-center flex items-center gap-2.5 text-lg text-[rgba(29,31,34,1)] font-medium justify-center mt-10 px-8 py-4 rounded-[10px] max-md:px-5">
//           <Link 
//             to="/onboarding"
//             className="self-stretch my-auto transition-colors px-4 py-2 rounded hover:opacity-90" 
//             style={{ backgroundImage: 'var(--gradient-cta-button)' }}
//           >
//             Try Sinergi.AI Now
//           </Link>
//         </div>
//         </section>

//         {/* Newsletter Section */}
//         <Newsletter />
//       </main>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// };

// export default Index;
