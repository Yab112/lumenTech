const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://lumenlabbackend.onrender.com';

export type ApplicationType = 'job' | 'talent_pool';

export interface CreateApplicationDto {
  jobId?: string; // Optional for talent pool applications
  applicationType?: ApplicationType; // Defaults to 'job'
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  resume: string;
  coverLetter?: string;
  linkedIn?: string;
  portfolio?: string;
  skills?: string[];
  experience?: string;
  education?: string;
  location?: string;
  metadata?: Record<string, any>;
}

export interface Application {
  id: string;
  jobId?: string | null;
  applicationType: ApplicationType;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  resume: string;
  coverLetter?: string;
  linkedIn?: string;
  portfolio?: string;
  skills?: string[];
  experience?: string;
  education?: string;
  location?: string;
  status: 'pending' | 'reviewing' | 'interview' | 'rejected' | 'accepted';
  submittedAt: string;
  createdAt: string;
  updatedAt: string;
  job?: {
    id: string;
    title: string;
    department: string;
  };
}

export async function submitApplication(data: CreateApplicationDto): Promise<Application> {
  const response = await fetch(`${API_BASE_URL}/applications`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...data,
      applicationType: data.applicationType || 'job',
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to submit application' }));
    throw new Error(error.message || 'Failed to submit application');
  }

  return response.json();
}

export async function submitTalentPoolApplication(data: Omit<CreateApplicationDto, 'jobId' | 'applicationType'>): Promise<Application> {
  return submitApplication({
    ...data,
    applicationType: 'talent_pool',
  });
}

export async function getApplications(params?: {
  jobId?: string;
  applicationType?: ApplicationType;
}): Promise<Application[]> {
  const queryParams = new URLSearchParams();
  if (params?.jobId) {
    queryParams.append('jobId', params.jobId);
  }
  if (params?.applicationType) {
    queryParams.append('applicationType', params.applicationType);
  }

  const url = `${API_BASE_URL}/applications${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Failed to fetch applications');
  }
  
  return response.json();
}

export async function getTalentPool(): Promise<Application[]> {
  const response = await fetch(`${API_BASE_URL}/applications/talent-pool`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch talent pool');
  }
  
  return response.json();
}




