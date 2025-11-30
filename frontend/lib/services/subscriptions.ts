const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://lumenlabbackend.onrender.com';

export interface Subscription {
  id: string;
  email: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSubscriptionDto {
  email: string;
}

export async function subscribeToJobNotifications(
  email: string,
): Promise<Subscription> {
  const response = await fetch(`${API_BASE_URL}/subscriptions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to subscribe');
  }

  return response.json();
}

export async function unsubscribeFromJobNotifications(
  email: string,
): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/subscriptions/unsubscribe`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to unsubscribe');
  }
}



