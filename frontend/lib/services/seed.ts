const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://lumenlabbackend.onrender.com';

export interface SeedJobsRequest {
  count?: number;
}

export interface SeedBlogsRequest {
  count?: number;
}

export interface SeedApplicationsRequest {
  count?: number;
}

export interface SeedAllRequest {
  jobs?: number;
  blogs?: number;
  applications?: number;
}

export interface SeedFromJsonRequest {
  jobs?: any[];
  blogs?: any[];
  applications?: any[];
}

export async function clearAllData(): Promise<{ message: string }> {
  const response = await fetch(`${API_BASE_URL}/seed/clear`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to clear data' }));
    throw new Error(error.message || 'Failed to clear data');
  }

  return response.json();
}

export async function seedJobs(data: SeedJobsRequest = {}): Promise<{ message: string; count: number }> {
  const response = await fetch(`${API_BASE_URL}/seed/jobs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to seed jobs' }));
    throw new Error(error.message || 'Failed to seed jobs');
  }

  return response.json();
}

export async function seedBlogs(data: SeedBlogsRequest = {}): Promise<{ message: string; count: number }> {
  const response = await fetch(`${API_BASE_URL}/seed/blogs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to seed blogs' }));
    throw new Error(error.message || 'Failed to seed blogs');
  }

  return response.json();
}

export async function seedApplications(data: SeedApplicationsRequest = {}): Promise<{ message: string; count: number }> {
  const response = await fetch(`${API_BASE_URL}/seed/applications`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to seed applications' }));
    throw new Error(error.message || 'Failed to seed applications');
  }

  return response.json();
}

export async function seedAll(data: SeedAllRequest): Promise<{ message: string; results: any }> {
  const response = await fetch(`${API_BASE_URL}/seed/all`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to seed data' }));
    throw new Error(error.message || 'Failed to seed data');
  }

  return response.json();
}

export async function seedFromJson(data: SeedFromJsonRequest): Promise<{ message: string; results: any }> {
  const response = await fetch(`${API_BASE_URL}/seed/json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to seed from JSON' }));
    throw new Error(error.message || 'Failed to seed from JSON');
  }

  return response.json();
}



