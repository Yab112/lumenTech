"use client";

import { Job } from "@/lib/services/jobs";
import { JobCard } from "./job-card";
import { Skeleton } from "@/components/ui/skeleton";

interface JobListProps {
  jobs: Job[];
  loading: boolean;
  onJobClick: (job: Job) => void;
}

export function JobList({ jobs, loading, onJobClick }: JobListProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="border rounded-lg p-6 space-y-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground text-lg mb-2">No jobs found</p>
        <p className="text-muted-foreground">
          Try adjusting your search filters or check back later for new opportunities.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">
          Open Positions ({jobs.length})
        </h2>
        <p className="text-muted-foreground">
          Discover your next career opportunity with us
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} onClick={() => onJobClick(job)} />
        ))}
      </div>
    </div>
  );
}

