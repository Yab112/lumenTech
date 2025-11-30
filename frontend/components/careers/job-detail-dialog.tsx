"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Clock,
  Briefcase,
  DollarSign,
  Share2,
  Copy,
  Check,
} from "lucide-react";
import { ApplicationForm } from "./application-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Job } from "@/lib/services/jobs";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

interface JobDetailDialogProps {
  job: Job;
  onClose: () => void;
  onApply?: () => void;
}

export function JobDetailDialog({
  job,
  onClose,
  onApply,
}: JobDetailDialogProps) {
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [copied, setCopied] = useState(false);

  const jobUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/careers?job=${job.slug}`
      : "";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jobUrl);
      setCopied(true);
      toast.success("Job link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: job.title,
          text: `Check out this job opportunity: ${job.title}`,
          url: jobUrl,
        });
      } catch (error) {
        // User cancelled or error occurred
      }
    } else {
      handleCopy();
    }
  };

  if (showApplicationForm) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900">
          <ApplicationForm
            job={job}
            onSuccess={() => {
              setShowApplicationForm(false);
              onClose();
            }}
            onCancel={() => setShowApplicationForm(false)}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900">
        <DialogHeader>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-2xl mb-3 pr-2">
                {job.title}
              </DialogTitle>
              <DialogDescription>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{job.department}</Badge>
                  <Badge variant="outline" className="capitalize">
                    {job.type.replace("-", " ")}
                  </Badge>
                  {job.remote && <Badge variant="default">Remote</Badge>}
                  <Badge variant="outline" className="capitalize">
                    {job.experienceLevel} Level
                  </Badge>
                </div>
              </DialogDescription>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Button
                variant="outline"
                size="icon"
                onClick={handleShare}
                title="Share job"
              >
                <Share2 className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopy}
                title="Copy job link"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-6 py-2">
            {/* Job Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="truncate">
                  {job.remote ? "Remote" : job.location}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Briefcase className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="capitalize">{job.experienceLevel}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span>
                  Posted{" "}
                  {formatDistanceToNow(new Date(job.postedAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>
              {job.salary && (
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span>{job.salary}</span>
                </div>
              )}
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Job Description</h3>
              <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
                {job.description}
              </div>
            </div>

            {/* Responsibilities */}
            {job.responsibilities && job.responsibilities.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-3">
                  Key Responsibilities
                </h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground pl-2">
                  {job.responsibilities.map((resp, index) => (
                    <li key={index} className="leading-relaxed">
                      {resp}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-3">Requirements</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground pl-2">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="leading-relaxed">
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Benefits */}
            {job.benefits && job.benefits.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-3">Benefits</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground pl-2">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="leading-relaxed">
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tags */}
            {job.tags && job.tags.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="flex flex-col sm:flex-row gap-2 mt-4 pt-4 border-t">
          <Button
            onClick={() => setShowApplicationForm(true)}
            className="flex-1"
          >
            Apply Now
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            className="sm:w-auto w-full"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
