"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { FooterSection } from "@/components/sections/footer-section";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { ApplicationForm } from "@/components/careers/application-form";
import { getJob, type Job } from "@/lib/services/jobs";
import { toast } from "sonner";
import { ArrowLeft, BriefcaseBusiness } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function ApplyPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const jobId = searchParams.get("jobId");
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (jobId) {
      loadJob();
    } else {
      // If no jobId, redirect to careers page
      router.push("/careers");
    }
  }, [jobId]);

  const loadJob = async () => {
    if (!jobId) return;

    try {
      setLoading(true);
      const data = await getJob(jobId);
      setJob(data);
    } catch (error: any) {
      toast.error(error.message || "Failed to load job details");
      router.push("/careers");
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = () => {
    toast.success("Application submitted successfully!");
    router.push("/careers");
  };

  const handleCancel = () => {
    router.push("/careers");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0F172A]">
        <Navigation />
        <div className="pt-20 pb-16">
          <div className="max-w-4xl mx-auto px-4">
            <Skeleton className="h-10 w-48 mb-6" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
        <FooterSection />
      </div>
    );
  }

  if (!job) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0F172A]">
      <ScrollProgress />
      <ScrollToTop />
      <Navigation />

      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* Back Button */}
          <Link href="/careers">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Careers
            </Button>
          </Link>

          <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
            {/* Job Summary Card - Left Sidebar (Upwork style) */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 border-2">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 flex items-center justify-center flex-shrink-0">
                      <BriefcaseBusiness className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="font-bold text-lg mb-1 leading-tight">
                        {job.title}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {job.department}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="text-xs font-medium">
                        {job.department}
                      </Badge>
                      <Badge variant="outline" className="text-xs capitalize">
                        {job.type.replace("-", " ")}
                      </Badge>
                      {job.remote && (
                        <Badge variant="default" className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          Remote
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-xs capitalize">
                        {job.experienceLevel}
                      </Badge>
                    </div>

                    {job.salary && (
                      <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
                        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                          Salary
                        </div>
                        <div className="text-xl font-bold text-green-600 dark:text-green-400">
                          {job.salary}
                        </div>
                      </div>
                    )}

                    <div className="pt-3 border-t border-slate-200 dark:border-slate-700 space-y-3 text-sm">
                      <div>
                        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                          Location
                        </div>
                        <div className="font-semibold">
                          {job.remote ? "Remote" : job.location}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                          Experience Level
                        </div>
                        <div className="font-semibold capitalize">
                          {job.experienceLevel}
                        </div>
                      </div>
                    </div>

                    {job.tags && job.tags.length > 0 && (
                      <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
                        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                          Skills
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {job.tags.slice(0, 5).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {job.tags.length > 5 && (
                            <Badge variant="outline" className="text-xs">
                              +{job.tags.length - 5}
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Application Form - Main Content (Upwork style) */}
            <div className="lg:col-span-1">
              <Card className="border-2">
                <CardContent className="p-8">
                  <ApplicationForm
                    job={job}
                    onSuccess={handleSuccess}
                    onCancel={handleCancel}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <FooterSection />
    </div>
  );
}

export default function ApplyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 dark:bg-[#0F172A]">
        <Navigation />
        <div className="pt-20 pb-16">
          <div className="max-w-4xl mx-auto px-4">
            <Skeleton className="h-10 w-48 mb-6" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
        <FooterSection />
      </div>
    }>
      <ApplyPageContent />
    </Suspense>
  );
}

