const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://lumenlabbackend.onrender.com";

export interface Job {
  id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  type: "full-time" | "part-time" | "contract" | "internship";
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits?: string[];
  salary?: string;
  experienceLevel: "entry" | "mid" | "senior" | "lead";
  remote: boolean;
  postedAt: string;
  expiresAt?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  tags?: string[];
}

export interface SearchJobsParams {
  search?: string;
  department?: string;
  location?: string;
  type?: "full-time" | "part-time" | "contract" | "internship";
  experienceLevel?: "entry" | "mid" | "senior" | "lead";
  remote?: boolean;
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

export async function getJobs(
  params?: SearchJobsParams
): Promise<PaginatedResponse<Job>> {
  const queryParams = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        queryParams.append(key, String(value));
      }
    });
  }

  const url = `${API_BASE_URL}/jobs${
    queryParams.toString() ? `?${queryParams.toString()}` : ""
  }`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }
  return response.json();
}

export async function getJob(id: string): Promise<Job> {
  const response = await fetch(`${API_BASE_URL}/jobs/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch job");
  }
  return response.json();
}

export async function getJobBySlug(slug: string): Promise<Job> {
  const response = await fetch(`${API_BASE_URL}/jobs/slug/${slug}`);
  if (!response.ok) {
    throw new Error("Failed to fetch job");
  }
  return response.json();
}

export async function getDepartments(): Promise<string[]> {
  const response = await fetch(`${API_BASE_URL}/jobs/departments`);
  if (!response.ok) {
    throw new Error("Failed to fetch departments");
  }
  return response.json();
}

export async function getLocations(): Promise<string[]> {
  const response = await fetch(`${API_BASE_URL}/jobs/locations`);
  if (!response.ok) {
    throw new Error("Failed to fetch locations");
  }
  return response.json();
}
