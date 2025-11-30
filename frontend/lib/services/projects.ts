const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://lumenlabbackend.onrender.com';

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  technologies: string[];
  status: 'completed' | 'in-progress' | 'on-hold' | 'planned';
  featuredImage?: string;
  images?: string[];
  link?: string;
  githubUrl?: string;
  client?: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  tags?: string[];
}

export interface SearchProjectsParams {
  category?: string;
  featured?: boolean;
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

export async function getProjects(params?: SearchProjectsParams): Promise<PaginatedResponse<Project>> {
  const queryParams = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, String(value));
      }
    });
  }

  const url = `${API_BASE_URL}/projects${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }
  return response.json();
}

export async function getProject(id: string): Promise<Project> {
  const response = await fetch(`${API_BASE_URL}/projects/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch project');
  }
  return response.json();
}

export async function getProjectBySlug(slug: string): Promise<Project> {
  const response = await fetch(`${API_BASE_URL}/projects/slug/${slug}`);
  if (!response.ok) {
    throw new Error('Failed to fetch project');
  }
  return response.json();
}

export async function getCategories(): Promise<string[]> {
  const response = await fetch(`${API_BASE_URL}/projects/categories`);
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return response.json();
}


