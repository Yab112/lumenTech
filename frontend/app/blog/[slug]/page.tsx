"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { FooterSection } from "@/components/sections/footer-section";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { getBlogBySlug, type Blog } from "@/lib/services/blogs";
import { toast } from "sonner";
import { format } from "date-fns";
import { Calendar, Clock, User, ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      loadBlog();
    }
  }, [slug]);

  const loadBlog = async () => {
    try {
      setLoading(true);
      const data = await getBlogBySlug(slug);
      if (!data.published) {
        toast.error("This blog post is not published");
        router.push("/blog");
        return;
      }
      setBlog(data);
    } catch (error: any) {
      toast.error(error.message || "Failed to load blog post");
      router.push("/blog");
    } finally {
      setLoading(false);
    }
  };

  const renderContentBlocks = (blocks?: Blog["contentBlocks"]) => {
    if (!blocks || blocks.length === 0) {
      return null;
    }

    return blocks.map((block, index) => {
      switch (block.type) {
        case "heading":
          const HeadingTag = `h${block.level || "2"}` as keyof JSX.IntrinsicElements;
          return (
            <HeadingTag
              key={index}
              className="mt-8 mb-4 font-bold text-slate-900 dark:text-white"
              style={{
                fontSize:
                  block.level === "1"
                    ? "2.5rem"
                    : block.level === "2"
                    ? "2rem"
                    : block.level === "3"
                    ? "1.5rem"
                    : "1.25rem",
              }}
            >
              {block.content}
            </HeadingTag>
          );

        case "image":
          if (!block.image) return null;
          return (
            <figure key={index} className="my-8">
              <img
                src={block.image.url}
                alt={block.image.alt || ""}
                className="w-full rounded-lg"
                style={{
                  width: block.image.width || "100%",
                  height: block.image.height || "auto",
                }}
              />
              {block.image.caption && (
                <figcaption className="mt-2 text-sm text-center text-slate-600 dark:text-slate-400">
                  {block.image.caption}
                </figcaption>
              )}
            </figure>
          );

        case "code":
          if (!block.code) return null;
          return (
            <div key={index} className="my-6">
              {block.code.filename && (
                <div className="bg-slate-800 text-slate-200 px-4 py-2 rounded-t-lg text-sm font-mono">
                  {block.code.filename}
                </div>
              )}
              <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
                <code className={`language-${block.code.language || "text"}`}>
                  {block.code.code}
                </code>
              </pre>
            </div>
          );

        case "quote":
          return (
            <blockquote
              key={index}
              className="my-6 pl-4 border-l-4 border-blue-600 dark:border-blue-400 italic text-slate-700 dark:text-slate-300"
            >
              {block.content}
            </blockquote>
          );

        case "text":
        default:
          return (
            <p
              key={index}
              className="my-4 text-slate-700 dark:text-slate-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: block.content || "" }}
            />
          );
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0F172A]">
        <Navigation />
        <div className="pt-20 pb-16">
          <div className="max-w-4xl mx-auto px-4">
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/2 mb-8" />
            <Skeleton className="h-64 w-full mb-8" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
        <FooterSection />
      </div>
    );
  }

  if (!blog) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0F172A]">
      <ScrollProgress />
      <ScrollToTop />
      <Navigation />

      <article className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* Back Button */}
          <Link href="/blog">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>

          {/* Header */}
          <header className="mb-8">
            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {blog.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs font-medium">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              {blog.title}
            </h1>

            {/* Meta Information */}
            <div className="flex items-center gap-6 text-sm text-slate-600 dark:text-slate-400 mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{blog.author}</span>
              </div>
              {blog.publishedAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={blog.publishedAt}>
                    {format(new Date(blog.publishedAt), "MMMM d, yyyy")}
                  </time>
                </div>
              )}
              {blog.readingTime && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{blog.readingTime} min read</span>
                </div>
              )}
            </div>
          </header>

          {/* Featured Image */}
          {blog.featuredImage && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <img
                src={blog.featuredImage}
                alt={blog.title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {/* Render content blocks if available */}
            {blog.contentBlocks && blog.contentBlocks.length > 0 ? (
              renderContentBlocks(blog.contentBlocks)
            ) : (
              <div
                className="text-slate-700 dark:text-slate-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            )}
          </div>

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-600 dark:text-slate-400">Share:</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: blog.title,
                      text: blog.excerpt || blog.title,
                      url: window.location.href,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    toast.success("Link copied to clipboard!");
                  }
                }}
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </article>

      <FooterSection />
    </div>
  );
}



