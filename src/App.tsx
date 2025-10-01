import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/store/store";

import Index from "./pages/landing-page/index";
import Onboarding from "./pages/landing-page/Onboarding";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/reusable/ScrollToTop";

// dashboard
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import MainDashboard from "./pages/dashboard/MainDashboard";
import JobsPage from "./pages/dashboard/JobsPage";
import CreateJobPage from "./pages/dashboard/CreateJobPage";
import CompanyPage from "./pages/dashboard/CompanyPage";
import ApplicantPage from "./pages/dashboard/Applicant";
import { ApplicantProfilePage } from "./pages/dashboard/jobs/ApplicantProfile";
import { MultiStepJobForm } from "./components/dashboard/jobCreation/MultiStepJobForm";
import { PricingPage } from "./pages/dashboard/payment/PricingPage";
import { CheckoutPage } from "./pages/dashboard/payment/CheckoutPage";
import LoginPage from "./pages/landing-page/loginPage";
import ExploreJobs from "./pages/landing-page/exploreJobs";
import LandingPage from "./pages/landing-page/LandingPages";
import ExploreJobDetail from "./pages/landing-page/exploreJobsDetail";
import RegisterPage from "./pages/landing-page/RegisterPage";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop /> 
          <Routes>
            <Route element={<Index />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/explore-jobs" element={<ExploreJobs />} />
              <Route path="/explore-jobs/job-detail/:id" element={<ExploreJobDetail />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/onboarding" element={<Onboarding />} />

            {/* Nested Dashboard Routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<MainDashboard />} />
              <Route path="mainDashboard" element={<MainDashboard />} />
              <Route path="jobs" element={<JobsPage />} />
              <Route path="create-job" element={<CreateJobPage />} />
              <Route path="pricing" element={<PricingPage />} />
              <Route path="pricing/checkout" element={<CheckoutPage />} />
              <Route path="company" element={<CompanyPage />} />
              <Route path="applicant" element={<ApplicantPage />} />
              <Route path="jobs/applicant/:id" element={<ApplicantProfilePage />} />
              <Route
                path="jobs/edit/:jobId"
                element={
                  <MultiStepJobForm
                    onComplete={(data) => {
                      console.log("Job form completed:", data);
                    }}
                  />
                }
              />
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
