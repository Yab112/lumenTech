"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { FooterSection } from "@/components/sections/footer-section";
import { JobSearch } from "@/components/careers/job-search";
import { JobDetailSheet } from "@/components/careers/job-detail-sheet";
import { getJobs, getJobBySlug, type Job, type SearchJobsParams } from "@/lib/services/jobs";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { toast } from "sonner";
import { BriefcaseBusiness, Search, Mail, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";
import { MapPin, Clock, DollarSign, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { SimpleDropdown } from "@/components/ui/simple-dropdown";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function CareersPageContent() {
  const searchParams = useSearchParams();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [filterParams, setFilterParams] = useState<SearchJobsParams>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrevious: false,
  });

  useEffect(() => {
    loadJobs();
  }, [filterParams, pagination.page, pagination.pageSize]);

  // Handle job slug from URL parameter
  useEffect(() => {
    const jobSlug = searchParams.get("job");
    if (jobSlug && jobs.length > 0) {
      const job = jobs.find((j) => j.slug === jobSlug);
      if (job) {
        setSelectedJob(job);
      } else {
        // If job not found in current list, fetch it directly
        loadJobBySlug(jobSlug);
      }
    }
  }, [searchParams, jobs]);

  const loadJobBySlug = async (slug: string) => {
    try {
      const job = await getJobBySlug(slug);
      setSelectedJob(job);
    } catch (error) {
      // Job not found, ignore
    }
  };

  const loadJobs = async () => {
    try {
      setLoading(true);
      const response = await getJobs({
        ...filterParams,
        page: pagination.page,
        pageSize: pagination.pageSize,
      });
      console.log("Jobs response:", response);
      setJobs(response.data);
      setPagination((prev) => ({
        ...prev,
        total: response.meta.total,
        totalPages: response.meta.totalPages,
        hasNext: response.meta.hasNext,
        hasPrevious: response.meta.hasPrevious,
      }));
      console.log("Pagination state:", {
        total: response.meta.total,
        totalPages: response.meta.totalPages,
        hasNext: response.meta.hasNext,
        hasPrevious: response.meta.hasPrevious,
      });
    } catch (error) {
      console.error("Error loading jobs:", error);
      toast.error("Failed to load jobs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (params: SearchJobsParams) => {
    setFilterParams(params);
    setPagination((prev) => ({ ...prev, page: 1 })); // Reset to first page on new search
  };

  const handleQuickSearch = () => {
    setFilterParams({ ...filterParams, search: searchQuery });
    setPagination((prev) => ({ ...prev, page: 1 })); // Reset to first page on new search
  };

  const handlePageChange = (newPage: number, e?: React.MouseEvent) => {
    e?.preventDefault();
    setPagination((prev) => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageSizeChange = (newPageSize: string) => {
    setPagination((prev) => ({ 
      ...prev, 
      pageSize: parseInt(newPageSize),
      page: 1 // Reset to first page when changing page size
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
  };

  const handleCloseDialog = () => {
    setSelectedJob(null);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setSubscribing(true);
    try {
      const { subscribeToJobNotifications } = await import("@/lib/services/subscriptions");
      await subscribeToJobNotifications(email);
      toast.success(
        "Successfully subscribed! We'll notify you when new jobs are posted."
      );
      setEmail("");
    } catch (error: any) {
      const errorMessage = error.message || "Failed to subscribe. Please try again.";
      if (errorMessage.includes("already subscribed")) {
        toast.info("You're already subscribed to job notifications!");
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0F172A] careers-page">
      <ScrollProgress />
      <ScrollToTop />

      <Navigation />

      <div className="pt-20 pb-16">
        <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center gap-3 mb-6">
              <BriefcaseBusiness className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                Join Us
              </h1>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-lg mb-6">
              Work with our team of talented developers, UI designers, and AI
              engineers
            </p>

            <div className="flex gap-2 max-w-3xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                <Input
                  placeholder="Search jobs, skills, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleQuickSearch()}
                  className="pl-10 h-12 text-base"
                />
              </div>
              <Button onClick={handleQuickSearch} className="h-12 px-8">
                Search
              </Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <JobSearch onSearch={handleSearch} />
              </div>
            </div>

            <div className="lg:col-span-3">
                <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                  {loading
                    ? "Loading..."
                    : `${pagination.total} ${
                        pagination.total === 1 ? "job" : "jobs"
                      } found`}
                </h2>
                {!loading && pagination.total > 0 && (
                  <div className="flex items-center gap-2">
                    <Label className="text-sm text-muted-foreground">
                      Show:
                    </Label>
                    <SimpleDropdown
                      value={pagination.pageSize.toString()}
                      onValueChange={handlePageSizeChange}
                      options={[
                        { value: "10", label: "10" },
                        { value: "20", label: "20" },
                        { value: "50", label: "50" },
                        { value: "100", label: "100" },
                      ]}
                      placeholder="10"
                    />
                    <span className="text-sm text-muted-foreground">per page</span>
                  </div>
                )}
              </div>

              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6"
                    >
                      <Skeleton className="h-6 w-3/4 mb-3" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-2/3 mb-4" />
                      <div className="flex gap-2">
                        <Skeleton className="h-6 w-20" />
                        <Skeleton className="h-6 w-20" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : jobs.length > 0 ? (
                <>
                  <div className="space-y-4">
                    {jobs.map((job) => (
                      <div
                        key={job.id}
                        onClick={() => handleJobClick(job)}
                        className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 cursor-pointer"
                      >
                        {/* Job Header */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                              {job.title}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-3">
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                <span>
                                  {job.remote ? "Remote" : job.location}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>
                                  {formatDistanceToNow(new Date(job.postedAt), {
                                    addSuffix: true,
                                  })}
                                </span>
                              </div>
                              {job.salary && (
                                <div className="flex items-center gap-1 text-green-600 dark:text-green-400 font-medium">
                                  <DollarSign className="w-4 h-4" />
                                  <span>{job.salary}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          {job.active && (
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-0">
                              <Star className="w-3 h-3 mr-1" />
                              Active
                            </Badge>
                          )}
                        </div>

                        {/* Job Description */}
                        <p className="text-slate-700 dark:text-slate-300 mb-4 line-clamp-2">
                          {job.description}
                        </p>

                        {/* Tags and Type */}
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {job.department}
                            </Badge>
                            <Badge
                              variant="outline"
                              className="text-xs capitalize"
                            >
                              {job.type.replace("-", " ")}
                            </Badge>
                            <Badge
                              variant="outline"
                              className="text-xs capitalize"
                            >
                              {job.experienceLevel} Level
                            </Badge>
                            {job.remote && (
                              <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs border-0">
                                Remote
                              </Badge>
                            )}
                            {job.tags?.slice(0, 3).map((tag) => (
                              <Badge
                                key={tag}
                                variant="outline"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                          >
                            View Details →
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {pagination.totalPages > 0 && (
                    <div className="mt-8 space-y-4">
                      {/* Page Size and Info */}
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="text-sm text-muted-foreground">
                          Showing {((pagination.page - 1) * pagination.pageSize) + 1} to{" "}
                          {Math.min(pagination.page * pagination.pageSize, pagination.total)} of{" "}
                          {pagination.total} job{pagination.total !== 1 ? "s" : ""}
                        </div>
                        {pagination.totalPages > 1 && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Page</span>
                            <span className="text-sm font-medium">
                              {pagination.page} of {pagination.totalPages}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Pagination Controls */}
                      {pagination.totalPages > 1 && (
                        <Pagination>
                          <PaginationContent>
                            <PaginationItem>
                              <PaginationPrevious
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (pagination.hasPrevious) {
                                    handlePageChange(pagination.page - 1);
                                  }
                                }}
                                className={!pagination.hasPrevious ? "pointer-events-none opacity-50" : "cursor-pointer"}
                              />
                            </PaginationItem>
                            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => {
                              // Show first page, last page, current page, and pages around current
                              const showPage =
                                pageNum === 1 ||
                                pageNum === pagination.totalPages ||
                                (pageNum >= pagination.page - 1 && pageNum <= pagination.page + 1);
                              
                              if (!showPage) {
                                // Show ellipsis
                                if (pageNum === pagination.page - 2 || pageNum === pagination.page + 2) {
                                  return (
                                    <PaginationItem key={pageNum}>
                                      <PaginationEllipsis />
                                    </PaginationItem>
                                  );
                                }
                                return null;
                              }

                              return (
                                <PaginationItem key={pageNum}>
                                  <PaginationLink
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handlePageChange(pageNum);
                                    }}
                                    isActive={pageNum === pagination.page}
                                    className="cursor-pointer"
                                  >
                                    {pageNum}
                                  </PaginationLink>
                                </PaginationItem>
                              );
                            })}
                            <PaginationItem>
                              <PaginationNext
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (pagination.hasNext) {
                                    handlePageChange(pagination.page + 1);
                                  }
                                }}
                                className={!pagination.hasNext ? "pointer-events-none opacity-50" : "cursor-pointer"}
                              />
                            </PaginationItem>
                          </PaginationContent>
                        </Pagination>
                      )}
                    </div>
                  )}
                </>
              ) : (
                /* No Jobs - Subscription Form */
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-12">
                  <div className="max-w-md mx-auto text-center">
                    <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Bell className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                      No Open Positions Right Now
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-8">
                      We don't have any open positions at the moment, but we're
                      always looking for talented people to join our team.
                      Subscribe to get notified when new opportunities become
                      available.
                    </p>

                    <form onSubmit={handleSubscribe} className="space-y-4">
                      <div>
                        <Label htmlFor="email" className="sr-only">
                          Email Address
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-10 h-12"
                            required
                          />
                        </div>
                      </div>
                      <Button
                        type="submit"
                        disabled={subscribing}
                        className="w-full h-12"
                      >
                        {subscribing ? (
                          "Subscribing..."
                        ) : (
                          <>
                            <Bell className="w-4 h-4 mr-2" />
                            Subscribe for Job Notifications
                          </>
                        )}
                      </Button>
                    </form>

                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-4">
                      We'll send you an email when new job openings are posted.
                      You can unsubscribe at any time.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Job Detail Sheet */}
      <JobDetailSheet
        job={selectedJob}
        open={!!selectedJob}
        onOpenChange={(open) => !open && handleCloseDialog()}
      />

      <FooterSection />
    </div>
  );
}

export default function CareersPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 dark:bg-[#0F172A]">
        <Navigation />
        <div className="pt-20 pb-16">
          <div className="container mx-auto px-4">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-32 w-full" />
              ))}
            </div>
          </div>
        </div>
        <FooterSection />
      </div>
    }>
      <CareersPageContent />
    </Suspense>
  );
}
