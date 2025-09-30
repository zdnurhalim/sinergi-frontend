import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function FastApplyModal() {
  const [fullName, setFullName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [domicile, setDomicile] = useState("");
  const [education, setEducation] = useState("");
  const [major, setMajor] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [portfolioFile, setPortfolioFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // logic submit form
    console.log({
      fullName,
      whatsapp,
      domicile,
      education,
      major,
      cvFile,
      portfolioFile,
    });
    alert("Application submitted!");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
        className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold shadow-lg"
        >
        Fast Apply Now 🚀
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Fast Apply for this Job
          </DialogTitle>
        </DialogHeader>

        <form className="grid gap-4 py-2" onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="whatsapp">WhatsApp</Label>
            <Input
              id="whatsapp"
              placeholder="Enter your WhatsApp number"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              required
            />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="domicile">Domicile</Label>
            <Input
              id="domicile"
              placeholder="Enter your city or region"
              value={domicile}
              onChange={(e) => setDomicile(e.target.value)}
              required
            />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="education">Last Education</Label>
            <Input
              id="education"
              placeholder="Enter your highest education"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              required
            />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="major">Major</Label>
            <Input
              id="major"
              placeholder="Enter your major"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
            />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="cv">Upload CV</Label>
            <Input
              id="cv"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setCvFile(e.target.files?.[0] || null)}
              required
            />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="portfolio">Upload Portfolio</Label>
            <Input
              id="portfolio"
              type="file"
              accept=".pdf,.doc,.docx,.zip,.rar"
              onChange={(e) => setPortfolioFile(e.target.files?.[0] || null)}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Submit Application</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
