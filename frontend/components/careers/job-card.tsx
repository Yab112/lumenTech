"use client";

import { Job } from "@/lib/services/jobs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Briefcase, ArrowRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface JobCardProps {
  job: Job;
  onClick: () => void;
}

export function JobCard({ job, onClick }: JobCardProps) {
  const timeAgo = formatDistanceToNow(new Date(job.postedAt), { addSuffix: true });

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-semibold line-clamp-2">{job.title}</h3>
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="secondary">{job.department}</Badge>
          <Badge variant="outline">{job.type}</Badge>
          {job.remote && <Badge variant="default">Remote</Badge>}
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="space-y-2 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            <span className="capitalize">{job.experienceLevel} Level</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Posted {timeAgo}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">
          {job.description}
        </p>
        <Button onClick={onClick} className="w-full mt-auto">
          View Details
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}

