"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SimpleDropdown } from "@/components/ui/simple-dropdown";
import { X, Filter } from "lucide-react";
import { SearchJobsParams } from "@/lib/services/jobs";
import { getDepartments, getLocations } from "@/lib/services/jobs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface JobSearchProps {
  onSearch: (params: SearchJobsParams) => void;
}

export function JobSearch({ onSearch }: JobSearchProps) {
  const [department, setDepartment] = useState<string | undefined>(undefined);
  const [location, setLocation] = useState<string | undefined>(undefined);
  const [type, setType] = useState<string | undefined>(undefined);
  const [experienceLevel, setExperienceLevel] = useState<string | undefined>(
    undefined
  );
  const [remote, setRemote] = useState<boolean>(false);
  const [departments, setDepartments] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);

  useEffect(() => {
    loadFilters();
    // Auto-search when filters change
    handleSearch();
  }, [department, location, type, experienceLevel, remote]);

  const loadFilters = async () => {
    try {
      const [depts, locs] = await Promise.all([
        getDepartments(),
        getLocations(),
      ]);
      setDepartments(depts);
      setLocations(locs);
    } catch (error) {
      // Silently handle filter loading errors
    }
  };

  const handleSearch = () => {
    const params: SearchJobsParams = {
      ...(department && department !== "all" && { department }),
      ...(location && location !== "all" && { location }),
      ...(type && type !== "all" && { type: type as any }),
      ...(experienceLevel &&
        experienceLevel !== "all" && {
          experienceLevel: experienceLevel as any,
        }),
      ...(remote && { remote: true }),
    };
    onSearch(params);
  };

  const handleClear = () => {
    setDepartment(undefined);
    setLocation(undefined);
    setType(undefined);
    setExperienceLevel(undefined);
    setRemote(false);
    onSearch({});
  };

  const hasFilters =
    (department && department !== "all") ||
    (location && location !== "all") ||
    (type && type !== "all") ||
    (experienceLevel && experienceLevel !== "all") ||
    remote;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Filters
          </h3>
        </div>
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="text-xs h-8"
          >
            <X className="w-3 h-3 mr-1" />
            Clear
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {/* Department Filter */}
        <div>
          <Label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
            Department
          </Label>
          <SimpleDropdown
            value={department || "all"}
            onValueChange={(value) =>
              setDepartment(value === "all" ? undefined : value)
            }
            options={[
              { value: "all", label: "All Departments" },
              ...departments.map((dept) => ({ value: dept, label: dept })),
            ]}
            placeholder="All Departments"
            searchable={true}
          />
        </div>

        <Separator />

        {/* Location Filter */}
        <div>
          <Label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
            Location
          </Label>
          <SimpleDropdown
            value={location || "all"}
            onValueChange={(value) =>
              setLocation(value === "all" ? undefined : value)
            }
            options={[
              { value: "all", label: "All Locations" },
              ...locations.map((loc) => ({ value: loc, label: loc })),
            ]}
            placeholder="All Locations"
            searchable={true}
          />
        </div>

        <Separator />

        {/* Job Type Filter */}
        <div>
          <Label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
            Job Type
          </Label>
          <SimpleDropdown
            value={type || "all"}
            onValueChange={(value) =>
              setType(value === "all" ? undefined : value)
            }
            options={[
              { value: "all", label: "All Types" },
              { value: "full-time", label: "Full-time" },
              { value: "part-time", label: "Part-time" },
              { value: "contract", label: "Contract" },
              { value: "internship", label: "Internship" },
            ]}
            placeholder="All Types"
          />
        </div>

        <Separator />

        {/* Experience Level Filter */}
        <div>
          <Label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
            Experience Level
          </Label>
          <SimpleDropdown
            value={experienceLevel || "all"}
            onValueChange={(value) =>
              setExperienceLevel(value === "all" ? undefined : value)
            }
            options={[
              { value: "all", label: "All Levels" },
              { value: "entry", label: "Entry Level" },
              { value: "mid", label: "Mid Level" },
              { value: "senior", label: "Senior Level" },
              { value: "lead", label: "Lead" },
            ]}
            placeholder="All Levels"
          />
        </div>

        <Separator />

        {/* Remote Checkbox */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="remote"
            checked={remote}
            onCheckedChange={(checked) => setRemote(checked === true)}
          />
          <Label
            htmlFor="remote"
            className="cursor-pointer text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Remote only
          </Label>
        </div>
      </div>
    </div>
  );
}
