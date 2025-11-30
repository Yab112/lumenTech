const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://lumenlabbackend.onrender.com';

export interface ContentBlock {
  type: 'text' | 'image' | 'code' | 'quote' | 'heading';
  content?: string;
  image?: {
    url: string;
    alt?: string;
    caption?: string;
    width?: string;
    height?: string;
  };
  code?: {
    code: string;
    language?: string;
    filename?: string;
  };
  level?: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  contentBlocks?: ContentBlock[];
  excerpt?: string;
  author: string;
  published: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  tags?: string[];
  featuredImage?: string;
  metaDescription?: string;
  readingTime?: number;
}

export interface SearchBlogsParams {
  published?: boolean;
  tags?: string[];
  page?: number;
  pageSize?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

export async function getBlogs(params?: SearchBlogsParams): Promise<PaginatedResponse<Blog>> {
  const queryParams = new URLSearchParams();
  if (params) {
    if (params.published !== undefined) {
      queryParams.append('published', String(params.published));
    }
    if (params.tags && params.tags.length > 0) {
      params.tags.forEach(tag => queryParams.append('tags', tag));
    }
    if (params.page !== undefined) {
      queryParams.append('page', String(params.page));
    }
    if (params.pageSize !== undefined) {
      queryParams.append('pageSize', String(params.pageSize));
    }
  }

  const url = `${API_BASE_URL}/blogs${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch blogs');
  }
  return response.json();
}

export async function getBlog(id: string): Promise<Blog> {
  const response = await fetch(`${API_BASE_URL}/blogs/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch blog');
  }
  return response.json();
}

export async function getBlogBySlug(slug: string): Promise<Blog> {
  const response = await fetch(`${API_BASE_URL}/blogs/slug/${slug}`);
  if (!response.ok) {
    throw new Error('Failed to fetch blog');
  }
  return response.json();
}


