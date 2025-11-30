"use client";

import { useState } from "react";
import { Job } from "@/lib/services/jobs";
import {
  submitApplication,
  submitTalentPoolApplication,
  type ApplicationType,
} from "@/lib/services/applications";
import { uploadFile } from "@/lib/services/upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, Upload, FileText, X } from "lucide-react";

interface ApplicationFormProps {
  job?: Job;
  applicationType?: ApplicationType;
  onSuccess: () => void;
  onCancel: () => void;
}

export function ApplicationForm({
  job,
  applicationType = "job",
  onSuccess,
  onCancel,
}: ApplicationFormProps) {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    resume: "",
    coverLetter: "",
    linkedIn: "",
    portfolio: "",
  });

  const handleFileChange = async (
    file: File | null,
    type: "resume" | "document",
    setFile: (file: File | null) => void
  ) => {
    if (!file) {
      setFile(null);
      return;
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      toast.error("File size must be less than 10MB");
      return;
    }

    setFile(file);
    setUploading(true);

    try {
      const fileUrl = await uploadFile(
        file,
        type === "resume" ? "resume" : "document"
      );

      if (type === "resume") {
        setFormData({ ...formData, resume: fileUrl });
        toast.success("Resume uploaded successfully!");
      } else {
        setFormData({ ...formData, coverLetter: fileUrl });
        toast.success("Cover letter uploaded successfully!");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to upload file");
      setFile(null);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate that resume is provided (either file or URL/text)
    if (!formData.resume && !resumeFile) {
      toast.error("Please provide a resume (upload file or paste text/URL)");
      return;
    }

    setLoading(true);

    try {
      // If resume file is selected but not uploaded yet, upload it first
      let finalResume = formData.resume;
      if (
        resumeFile &&
        (!formData.resume || !formData.resume.startsWith("http"))
      ) {
        setUploading(true);
        finalResume = await uploadFile(resumeFile, "resume");
        setUploading(false);
      }

      // If cover letter file is selected but not uploaded yet, upload it first
      let finalCoverLetter = formData.coverLetter;
      if (
        coverLetterFile &&
        (!formData.coverLetter || !formData.coverLetter.startsWith("http"))
      ) {
        setUploading(true);
        finalCoverLetter = await uploadFile(coverLetterFile, "document");
        setUploading(false);
      }

      if (applicationType === "talent_pool") {
        await submitTalentPoolApplication({
          ...formData,
          resume: finalResume,
          coverLetter: finalCoverLetter || formData.coverLetter,
        });
      } else {
        if (!job) {
          toast.error("Job information is required");
          return;
        }
        await submitApplication({
          jobId: job.id,
          ...formData,
          resume: finalResume,
          coverLetter: finalCoverLetter || formData.coverLetter,
        });
      }
      toast.success("Application submitted successfully!");
      onSuccess();
    } catch (error: any) {
      toast.error(error.message || "Failed to submit application");
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">
        {applicationType === "talent_pool"
          ? "Join Our Talent Pool"
          : job
          ? "Submit Your Application"
          : "Apply for Position"}
      </h2>
      <p className="text-muted-foreground mb-6">
        {applicationType === "talent_pool"
          ? "Submit your information to join our talent pool. We'll reach out when we have opportunities that match your skills."
          : "Fill out the form below to submit your application. We'll review it and get back to you soon."}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 no-focus-outline">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleChange}
              className="focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-0 focus:outline-none"
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleChange}
              className="focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-0 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-0 focus:outline-none"
          />
        </div>

        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className="focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-0 focus:outline-none"
          />
        </div>

        <div>
          <Label htmlFor="resume">Resume/CV *</Label>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Input
                id="resume-file"
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  handleFileChange(file, "resume", setResumeFile);
                }}
                className="hidden"
                disabled={uploading || loading}
              />
              <Label
                htmlFor="resume-file"
                className="flex items-center gap-2 px-4 py-2 border border-dashed rounded-md cursor-pointer hover:bg-accent transition-colors focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-0 focus:outline-none active:outline-none"
              >
                <Upload className="h-4 w-4" />
                {resumeFile
                  ? resumeFile.name
                  : "Upload Resume (PDF, DOC, DOCX, TXT)"}
              </Label>
              {resumeFile && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setResumeFile(null);
                    setFormData({ ...formData, resume: "" });
                  }}
                  disabled={uploading || loading}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            {resumeFile && formData.resume && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span>Uploaded: {formData.resume}</span>
              </div>
            )}
            <div className="text-sm text-muted-foreground text-center">OR</div>
            <Textarea
              id="resume"
              name="resume"
              placeholder="Paste your resume text or provide a URL to your resume"
              value={formData.resume}
              onChange={handleChange}
              rows={4}
              disabled={uploading || loading}
              className="focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-0 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="coverLetter">Cover Letter</Label>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Input
                id="cover-letter-file"
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  handleFileChange(file, "document", setCoverLetterFile);
                }}
                className="hidden"
                disabled={uploading || loading}
              />
              <Label
                htmlFor="cover-letter-file"
                className="flex items-center gap-2 px-4 py-2 border border-dashed rounded-md cursor-pointer hover:bg-accent transition-colors focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-0 focus:outline-none active:outline-none"
              >
                <Upload className="h-4 w-4" />
                {coverLetterFile
                  ? coverLetterFile.name
                  : "Upload Cover Letter (PDF, DOC, DOCX, TXT)"}
              </Label>
              {coverLetterFile && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setCoverLetterFile(null);
                    setFormData({ ...formData, coverLetter: "" });
                  }}
                  disabled={uploading || loading}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            {coverLetterFile && formData.coverLetter && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span>Uploaded: {formData.coverLetter}</span>
              </div>
            )}
            <div className="text-sm text-muted-foreground text-center">OR</div>
            <Textarea
              id="coverLetter"
              name="coverLetter"
              placeholder="Tell us why you're interested in this position..."
              value={formData.coverLetter}
              onChange={handleChange}
              rows={4}
              disabled={uploading || loading}
              className="focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-0 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="linkedIn">LinkedIn Profile (URL)</Label>
          <Input
            id="linkedIn"
            name="linkedIn"
            type="url"
            placeholder="https://linkedin.com/in/yourprofile"
            value={formData.linkedIn}
            onChange={handleChange}
            className="focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-0 focus:outline-none"
          />
        </div>

        <div>
          <Label htmlFor="portfolio">Portfolio/Website (URL)</Label>
          <Input
            id="portfolio"
            name="portfolio"
            type="url"
            placeholder="https://yourportfolio.com"
            value={formData.portfolio}
            onChange={handleChange}
            className="focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-0 focus:outline-none"
          />
        </div>

        <div className="flex gap-2 pt-4">
          <Button
            type="submit"
            disabled={loading || uploading}
            className="flex-1 focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-0 focus:outline-none active:outline-none"
          >
            {(loading || uploading) && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {uploading
              ? "Uploading..."
              : loading
              ? "Submitting..."
              : "Submit Application"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={loading || uploading}
            className="focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-0 focus:outline-none active:outline-none"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
