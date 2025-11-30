"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Database, Trash2 } from "lucide-react";
import {
  clearAllData,
  seedJobs,
  seedBlogs,
  seedApplications,
  seedAll,
} from "@/lib/services/seed";

export default function SeedPage() {
  const [loading, setLoading] = useState(false);
  const [jobCount, setJobCount] = useState(10);
  const [blogCount, setBlogCount] = useState(5);
  const [applicationCount, setApplicationCount] = useState(5);

  const handleSeedJobs = async () => {
    setLoading(true);
    try {
      const result = await seedJobs({ count: jobCount });
      toast.success(result.message);
    } catch (error: any) {
      toast.error(error.message || "Failed to seed jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleSeedBlogs = async () => {
    setLoading(true);
    try {
      const result = await seedBlogs({ count: blogCount });
      toast.success(result.message);
    } catch (error: any) {
      toast.error(error.message || "Failed to seed blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleSeedApplications = async () => {
    setLoading(true);
    try {
      const result = await seedApplications({ count: applicationCount });
      toast.success(result.message);
    } catch (error: any) {
      toast.error(error.message || "Failed to seed applications");
    } finally {
      setLoading(false);
    }
  };

  const handleSeedAll = async () => {
    setLoading(true);
    try {
      await seedAll({
        jobs: jobCount,
        blogs: blogCount,
        applications: applicationCount,
      });
      toast.success("All data seeded successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to seed data");
    } finally {
      setLoading(false);
    }
  };

  const handleClearAll = async () => {
    if (!confirm("⚠️ Are you sure you want to clear all data? This action cannot be undone.")) {
      return;
    }

    setLoading(true);
    try {
      await clearAllData();
      toast.success("All data cleared successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to clear data");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0F172A]">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Database className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
              Database Seeding
            </h1>
          </div>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Seed your database with sample data.
          </p>

          <Card>
            <CardHeader>
              <CardTitle>Seed Database</CardTitle>
              <CardDescription>
                Generate sample data for jobs, blogs, and applications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="jobCount">Number of Jobs</Label>
                <div className="flex gap-2">
                  <Input
                    id="jobCount"
                    type="number"
                    min="1"
                    max="100"
                    value={jobCount}
                    onChange={(e) => setJobCount(parseInt(e.target.value) || 10)}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSeedJobs}
                    disabled={loading}
                    variant="outline"
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Seed Jobs"
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="blogCount">Number of Blogs</Label>
                <div className="flex gap-2">
                  <Input
                    id="blogCount"
                    type="number"
                    min="1"
                    max="100"
                    value={blogCount}
                    onChange={(e) => setBlogCount(parseInt(e.target.value) || 5)}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSeedBlogs}
                    disabled={loading}
                    variant="outline"
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Seed Blogs"
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="applicationCount">Number of Applications</Label>
                <div className="flex gap-2">
                  <Input
                    id="applicationCount"
                    type="number"
                    min="1"
                    max="100"
                    value={applicationCount}
                    onChange={(e) => setApplicationCount(parseInt(e.target.value) || 5)}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSeedApplications}
                    disabled={loading}
                    variant="outline"
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Seed Applications"
                    )}
                  </Button>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button
                  onClick={handleSeedAll}
                  disabled={loading}
                  className="w-full"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Seeding...
                    </>
                  ) : (
                    "Seed All Data"
                  )}
                </Button>
              </div>

              <div className="pt-4 border-t">
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-900">
                  <h3 className="font-semibold text-red-900 dark:text-red-200 mb-2">
                    Clear All Data
                  </h3>
                  <p className="text-sm text-red-700 dark:text-red-300 mb-4">
                    This will permanently delete all jobs, blogs, and applications from the database.
                    This action cannot be undone.
                  </p>
                  <Button
                    onClick={handleClearAll}
                    disabled={loading}
                    variant="destructive"
                    className="w-full"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Clearing...
                      </>
                    ) : (
                      <>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Clear All Data
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

