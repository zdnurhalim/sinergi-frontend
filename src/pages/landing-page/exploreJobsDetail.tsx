import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { JobRequirement, jobListSample } from "@/types/JobRequirement";
import { Banknote, MapPin, BriefcaseBusiness, Timer, ArrowLeft, Bookmark, Share2, Users, CheckCircle } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import FastApplyModal from "@/components/onboarding/ModalDialogFastApply";

const ExploreJobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [job, setJob] = useState<JobRequirement | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const foundJob = jobListSample.find((j) => j.id === Number(id));
    if (foundJob) setJob(foundJob);
  }, [id]);

  if (!job) {
    return <div className="text-center py-20 text-gray-500">Job not found</div>;
  }

  return (
    <div className="mt-16">
    <div
    className="w-full absolute top-0 h-64 -z-10 bg-cover bg-center"
    style={{
        backgroundImage: "url('https://api.builder.io/api/v1/image/assets/TEMP/df095bc2f4e8115febab0386b8096ac19c3a4553?placeholderIfAbsent=true')",
    }}
    ></div>
      <div className="relative max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT SECTION - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Header Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <Avatar className="w-16 h-16 border-2 border-gray-100">
                    <AvatarImage src="https://github.com/shadcn.png" alt={job.company_name} />
                    <AvatarFallback className="text-lg font-semibold bg-gradient-to-br from-blue-500 to-orange-500 text-white">
                      {job.company_name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h1 className="text-3xl font-bold text-gray-900">{job.desired_position}</h1>
                      <span className="text-2xl">🔥</span>
                    </div>
                    <p className="text-base text-gray-600 mb-2 flex items-center gap-2">
                      {job.company_name}
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                      <span className="text-sm">✓ Verified</span>
                    </p>
                    <span className="inline-block text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full font-medium">
                      {job.industry}
                    </span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`p-2.5 rounded-xl border transition-all ${
                      isBookmarked 
                        ? 'bg-blue-50 border-blue-200 text-blue-600' 
                        : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <Bookmark size={20} fill={isBookmarked ? "currentColor" : "none"} />
                  </button>
                  <button className="p-2.5 rounded-xl border border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-all">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>

              {/* Job Info Tags */}
              <div className="flex flex-wrap gap-3 mb-4">
                <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 rounded-lg py-2 px-4 text-sm font-medium border border-green-200">
                  <Banknote size={18} /> {job.salary_min} - {job.salary_max}
                </div>
                <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 rounded-lg py-2 px-4 text-sm font-medium border border-purple-200">
                  <MapPin size={18} /> {job.company_size}
                </div>
                <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-700 rounded-lg py-2 px-4 text-sm font-medium border border-orange-200">
                  <BriefcaseBusiness size={18} /> {job.experience_requirement.join(", ")}
                </div>
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 rounded-lg py-2 px-4 text-sm font-medium border border-blue-200">
                  <Timer size={18} /> {job.work_arrangement}
                </div>
              </div>

              {/* Deadline & Apply Button */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="text-sm">
                  <span className="text-gray-500">Deadline: </span>
                  <span className="font-semibold text-red-600">{job.vacancy_deadline}</span>
                </div>
                <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Jobs</span>
          </button>
              </div>
            </div>

            {/* Description Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></span>
                Deskripsi Pekerjaan
              </h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{job.description}</p>
            </div>

            {/* Daily Tasks Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></span>
                Tugas Harian
              </h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{job.daily_tasks}</p>
            </div>

            {/* Skills Required Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></span>
                Kualifikasi
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Keahlian yang Dibutuhkan</h4>
                  <div className="flex flex-wrap gap-2">
                    {job.skills_requirement.map((skill, idx) => (
                      <span key={idx} className="text-sm bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 text-gray-800 rounded-lg py-2 px-4 font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Pendidikan</h4>
                  <p className="text-gray-700">{job.education_requirement}</p>
                </div>

                {job.age_limitation && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Batasan Usia</h4>
                    <p className="text-gray-700">{job.age_limitation}</p>
                  </div>
                )}

                {job.gender_preference && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Preferensi Gender</h4>
                    <p className="text-gray-700">{job.gender_preference}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Application Process Card */}
            {job.application_process && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></span>
                  Proses Aplikasi
                </h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{job.application_process}</p>
              </div>
            )}

            {/* Other Information Card */}
            {job.other_information && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></span>
                  Informasi Tambahan
                </h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{job.other_information}</p>
              </div>
            )}

            {/* Specific Details Card */}
            {job.specific_details && job.specific_details.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></span>
                  Detail Spesifik
                </h3>
                <ul className="space-y-2">
                  {job.specific_details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700">
                      <CheckCircle size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* RIGHT SECTION - Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              
              {/* Benefits Card */}
              {job.benefits && job.benefits.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Benefit Perusahaan</h3>
                  <div className="space-y-3">
                    {job.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm text-gray-700">
                        <CheckCircle size={18} className="text-green-600 flex-shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Company Info Card */}
              <div className="bg-gradient-to-r from-[#298aca] to-[#aacde5] rounded-2xl shadow-lg p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="w-12 h-12 border-2 border-white/30">
                    <AvatarImage src="https://github.com/shadcn.png" alt={job.company_name} />
                    <AvatarFallback className="bg-white/20 text-white font-bold">
                      {job.company_name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-bold text-lg">{job.company_name}</h4>
                    <p className="text-sm text-white/80">{job.industry}</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Users size={16} />
                    <span>{job.company_size}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>{job.work_arrangement}</span>
                  </div>
                </div>

                <Button
                  className="w-full mt-4 bg-white text-[#298aca] hover:bg-gray-100 font-semibold"
                  onClick={() => alert("View company profile")}
                >
                  Company Profile Here
                </Button>
              </div>

              {/* Quick Apply Card */}
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl shadow-sm border border-orange-200 p-6">
                <div className="text-center">
                  <div className="text-4xl mb-3">🔥</div>
                  <h4 className="font-bold text-gray-900 mb-2">Active Recruitment!</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    The company is actively seeking candidates. Apply now for greater opportunities!
                  </p>
                  <FastApplyModal />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ExploreJobDetail;