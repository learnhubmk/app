'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const ResetRedirect = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    const email = searchParams.get('email');
    if (token && email) {
      router.push(`/content-panel/reset-password?token=${token}&email=${email}`);
    } else {
      router.push('/content-panel/login');
    }
  }, [router, searchParams]);

  return <div>Redirecting...</div>;
};

export default ResetRedirect;
