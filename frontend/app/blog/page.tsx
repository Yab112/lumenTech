"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { FooterSection } from "@/components/sections/footer-section";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { BookOpen, Calendar, Clock, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { getBlogs, type Blog } from "@/lib/services/blogs";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [meta, setMeta] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrevious: false,
  });

  useEffect(() => {
    loadBlogs();
  }, [page]);

  const loadBlogs = async () => {
    try {
      setLoading(true);
      // Only fetch published blogs with pagination
      const response = await getBlogs({ published: true, page, pageSize });
      setBlogs(response.data);
      setMeta(response.meta);
    } catch (error) {
      toast.error("Failed to load blog posts. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0F172A] transition-colors duration-300">
      <ScrollProgress />
      <ScrollToTop />
      
      <Navigation />
      
      {/* Cover Section with Title - Medium Style */}
      <div className="relative w-full h-[60vh] min-h-[400px] max-h-[600px] overflow-hidden">
        {/* Background Image/Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
          <div className="absolute inset-0 bg-black/40 dark:bg-black/60"></div>
          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center max-w-4xl mx-auto px-4">
            <div className="flex items-center justify-center gap-3 mb-6">
              <BookOpen className="w-10 h-10 text-white" />
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">
                Our Blog
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Insights, tutorials, and updates from our team of developers, UI designers, and AI engineers.
            </p>
          </div>
        </div>
      </div>

      {/* Blog Posts - Medium Style */}
      <main className="pt-16 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          {loading ? (
            <div className="space-y-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <div className="flex gap-4 mt-4">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-16">
              {blogs.map((blog, index) => (
                <article
                  key={blog.id}
                  className="group"
                >
                  <Link href={`/blog/${blog.slug}`}>
                    {/* Featured Image */}
                    {blog.featuredImage && (
                      <div className="mb-6 rounded-lg overflow-hidden">
                        <img
                          src={blog.featuredImage}
                          alt={blog.title}
                          className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}

                    {/* Post Content */}
                    <div className="space-y-4">
                      {/* Tags */}
                      {blog.tags && blog.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {blog.tags.slice(0, 3).map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs font-medium"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Title */}
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                        {blog.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                        {blog.excerpt || blog.content.substring(0, 200) + "..."}
                      </p>

                      {/* Meta Information */}
                      <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400 pt-4 border-t border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span className="font-medium">{blog.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {blog.publishedAt
                              ? formatDistanceToNow(new Date(blog.publishedAt), { addSuffix: true })
                              : formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{calculateReadTime(blog.content)}</span>
                        </div>
                      </div>

                      {/* Read More Link */}
                      <div className="pt-2">
                        <span className="text-blue-600 dark:text-blue-400 font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                          Read more
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}

          {!loading && blogs.length === 0 && (
            <div className="text-center py-20">
              <BookOpen className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
              <p className="text-xl text-slate-600 dark:text-slate-400">
                No blog posts yet. Check back soon for updates!
              </p>
            </div>
          )}

          {/* Pagination */}
          {!loading && meta.totalPages > 1 && (
            <div className="mt-16 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (meta.hasPrevious) {
                          setPage(page - 1);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                      }}
                      className={!meta.hasPrevious ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                  
                  {(() => {
                    const pages: (number | 'ellipsis')[] = [];
                    const totalPages = meta.totalPages;
                    
                    if (totalPages <= 7) {
                      // Show all pages if 7 or fewer
                      for (let i = 1; i <= totalPages; i++) {
                        pages.push(i);
                      }
                    } else {
                      // Always show first page
                      pages.push(1);
                      
                      if (page <= 3) {
                        // Near the start
                        for (let i = 2; i <= 4; i++) {
                          pages.push(i);
                        }
                        pages.push('ellipsis');
                        pages.push(totalPages);
                      } else if (page >= totalPages - 2) {
                        // Near the end
                        pages.push('ellipsis');
                        for (let i = totalPages - 3; i <= totalPages; i++) {
                          pages.push(i);
                        }
                      } else {
                        // In the middle
                        pages.push('ellipsis');
                        for (let i = page - 1; i <= page + 1; i++) {
                          pages.push(i);
                        }
                        pages.push('ellipsis');
                        pages.push(totalPages);
                      }
                    }
                    
                    return pages.map((item, index) => {
                      if (item === 'ellipsis') {
                        return (
                          <PaginationItem key={`ellipsis-${index}`}>
                            <PaginationEllipsis />
                          </PaginationItem>
                        );
                      }
                      return (
                        <PaginationItem key={item}>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setPage(item);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            isActive={item === page}
                          >
                            {item}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    });
                  })()}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (meta.hasNext) {
                          setPage(page + 1);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                      }}
                      className={!meta.hasNext ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}

          {/* Page Info */}
          {!loading && meta.total > 0 && (
            <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
              Showing {((page - 1) * pageSize) + 1} to {Math.min(page * pageSize, meta.total)} of {meta.total} posts
            </div>
          )}
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
