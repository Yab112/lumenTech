"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { FooterSection } from "@/components/sections/footer-section";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import {
  FolderKanban,
  ExternalLink,
  Code,
  Globe,
  Github,
  Filter,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getProjects, getCategories, type Project } from "@/lib/services/projects";
import { toast } from "sonner";
import { SimpleDropdown } from "@/components/ui/simple-dropdown";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined
  );
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 12,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrevious: false,
  });

  useEffect(() => {
    loadData();
  }, [selectedCategory, pagination.page, pagination.pageSize]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [projectsResponse, categoriesData] = await Promise.all([
        getProjects({
          category: selectedCategory,
          page: pagination.page,
          pageSize: pagination.pageSize,
        }),
        getCategories(),
      ]);
      setProjects(projectsResponse.data);
      setCategories(categoriesData);
      setPagination((prev) => ({
        ...prev,
        total: projectsResponse.meta.total,
        totalPages: projectsResponse.meta.totalPages,
        hasNext: projectsResponse.meta.hasNext,
        hasPrevious: projectsResponse.meta.hasPrevious,
      }));
    } catch (error) {
      toast.error("Failed to load projects. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category: string | undefined) => {
    setSelectedCategory(category);
    setPagination((prev) => ({ ...prev, page: 1 })); // Reset to first page on category change
  };

  const handlePageChange = (newPage: number, e?: React.MouseEvent) => {
    e?.preventDefault();
    setPagination((prev) => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "on-hold":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "planned":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "in-progress":
        return "In Progress";
      case "on-hold":
        return "On Hold";
      case "planned":
        return "Planned";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0F172A] transition-colors duration-300">
      <ScrollProgress />
      <ScrollToTop />

      <Navigation />

      {/* Cover Section with Title - Similar to Blog */}
      <div className="relative w-full h-[60vh] min-h-[400px] max-h-[600px] overflow-hidden">
        {/* Background Image/Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600">
          <div className="absolute inset-0 bg-black/40 dark:bg-black/60"></div>
          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: "40px 40px",
              }}
            ></div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center max-w-4xl mx-auto px-4">
            <div className="flex items-center justify-center gap-3 mb-6">
              <FolderKanban className="w-10 h-10 text-white" />
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">
                Our Projects
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Explore the innovative solutions we've built for our clients. From
              web applications to AI-powered systems.
            </p>
          </div>
        </div>
      </div>

      <main className="pt-16 pb-16">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="mb-8 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Filter by Category:
              </Label>
            </div>
            <SimpleDropdown
              value={selectedCategory || "all"}
              onValueChange={(value) =>
                handleCategoryChange(value === "all" ? undefined : value)
              }
              options={[
                { value: "all", label: "All Categories" },
                ...categories.map((category) => ({
                  value: category,
                  label: category,
                })),
              ]}
              placeholder="All Categories"
              className="w-[200px]"
            />
          </div>

          {/* Projects Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="h-full">
                  <Skeleton className="h-48 w-full rounded-t-lg mb-4" />
                  <CardHeader>
                    <Skeleton className="h-6 w-20 mb-2" />
                    <Skeleton className="h-6 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-5/6" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                >
                  <Card className="h-full flex flex-col">
                    {/* Featured Image */}
                    {project.featuredImage && (
                      <div className="w-full h-48 overflow-hidden rounded-t-lg">
                        <img
                          src={project.featuredImage}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {project.category}
                        </Badge>
                        <Badge className={getStatusColor(project.status)}>
                          {getStatusLabel(project.status)}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl mb-2">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <div className="space-y-4 flex-1">
                        <div>
                          <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                            <Code className="w-4 h-4" />
                            Technologies
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.slice(0, 4).map((tech) => (
                              <Badge
                                key={tech}
                                variant="outline"
                                className="text-xs"
                              >
                                {tech}
                              </Badge>
                            ))}
                            {project.technologies.length > 4 && (
                              <Badge variant="outline" className="text-xs">
                                +{project.technologies.length - 4}
                              </Badge>
                            )}
                          </div>
                        </div>
                        {project.tags && project.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {project.tags.slice(0, 3).map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2 mt-4 pt-4 border-t">
                        {project.link && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => window.open(project.link, "_blank")}
                          >
                            <Globe className="w-4 h-4 mr-2" />
                            View
                          </Button>
                        )}
                        {project.githubUrl && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() =>
                              window.open(project.githubUrl, "_blank")
                            }
                          >
                            <Github className="w-4 h-4 mr-2" />
                            Code
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <FolderKanban className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
              <p className="text-xl text-slate-600 dark:text-slate-400">
                No projects found in this category. Check back soon!
              </p>
            </div>
          )}

          {/* Pagination */}
          {!loading && projects.length > 0 && pagination.totalPages > 1 && (
            <div className="mt-12">
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
              <div className="text-center mt-4 text-sm text-muted-foreground">
                Showing {((pagination.page - 1) * pagination.pageSize) + 1} to{" "}
                {Math.min(pagination.page * pagination.pageSize, pagination.total)} of{" "}
                {pagination.total} projects
              </div>
            </div>
          )}
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
