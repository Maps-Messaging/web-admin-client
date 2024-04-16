'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

axios.defaults.baseURL = process.env.API_BASE_URL;

export default function Page(): React.JSX.Element {
  const router = useRouter();

  // Immediately attempt to navigate, note: this isn't typically recommended
  if (typeof window !== "undefined") {
    router.push('/dashboard');
  }

  return (
    <div>Loading or redirecting...</div>
  );
}
