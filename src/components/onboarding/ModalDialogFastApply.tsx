import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import ApplicationService from "@/services/ApplicationService";
import { JobRequirementService } from "@/services/JobRequirementService";

interface FastApplyModalProps {
  jobAdsId: number;
  recruiterId: number;
}

export default function FastApplyModal({ jobAdsId, recruiterId }: FastApplyModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    whatsapp: "",
    domicile: "",
    last_education: "",
    major: "",
    email: "",
  });

  const [cvFile, setCvFile] = useState<File | null>(null);
  const [portfolioFile, setPortfolioFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {

      const payload = new FormData();
      payload.append("job_ads_id", String(jobAdsId));
      payload.append("recruiter_id", String(recruiterId));
      payload.append("application_status", "1");
      
      // Hardcode
      payload.append("job_ads_id", "3");
      payload.append("recruiter_id", "9");

      Object.entries(formData).forEach(([key, value]) => {
        payload.append(key, value);
      });

      if (cvFile) payload.append("cv", cvFile);
      if (portfolioFile) payload.append("portfolio_path", portfolioFile);

      await ApplicationService.createApplication(payload);

      toast({
        title: "Lamaran Berhasil Dikirim 🎉",
        description: "Terima kasih! Lamaran cepat kamu telah diterima.",
      });

      setOpen(false);
      setFormData({
        full_name: "",
        whatsapp: "",
        domicile: "",
        last_education: "",
        major: "",
        email: "",
      });
      setCvFile(null);
      setPortfolioFile(null);
    } catch (error: any) {
      console.error("Error:", error);
      toast({
        title: "Gagal Mengirim Lamaran 😞",
        description:
          error?.response?.data?.message ||
          "Terjadi kesalahan saat mengirim lamaran.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <Dialog open={open} onOpenChange={setOpen}>
      {/* 🔸 Tombol Trigger Modal */}
      <DialogTrigger asChild>
        <Button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold shadow-lg">
          Fast Apply Now 🚀
        </Button>
      </DialogTrigger>

      {/* 🔸 Konten Modal */}
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Fast Apply for this Job
          </DialogTitle>
        </DialogHeader>

        <form className="grid gap-4 py-2" onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="full_name">Full Name</Label>
            <Input
              id="full_name"
              name="full_name"
              placeholder="Enter your full name"
              value={formData.full_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="whatsapp">WhatsApp</Label>
            <Input
              id="whatsapp"
              name="whatsapp"
              placeholder="Enter your WhatsApp number"
              value={formData.whatsapp}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="domicile">Domicile</Label>
            <Input
              id="domicile"
              name="domicile"
              placeholder="Enter your city or region"
              value={formData.domicile}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="last_education">Last Education</Label>
            <Input
              id="last_education"
              name="last_education"
              placeholder="Enter your highest education"
              value={formData.last_education}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="major">Major</Label>
            <Input
              id="major"
              name="major"
              placeholder="Enter your major"
              value={formData.major}
              onChange={handleChange}
            />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="cv_path">Upload CV</Label>
            <Input
              id="cv_path"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setCvFile(e.target.files?.[0] || null)}
              required
            />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="portfolio_path">Upload Portfolio (Optional)</Label>
            <Input
              id="portfolio_path"
              type="file"
              accept=".pdf,.doc,.docx,.zip,.rar"
              onChange={(e) => setPortfolioFile(e.target.files?.[0] || null)}
            />
          </div>

          <DialogFooter className="flex justify-end gap-2 pt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Submit Application"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
