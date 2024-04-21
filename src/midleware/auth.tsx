// utils/auth.js
import { useAuth } from '@/hooks/useAuthContext';
import { useRouter } from 'next/router';

export const RequireAuth = () => {
  const router = useRouter();
  const { user } = useAuth()

  if (!user) {
    router.push('/');
    return { props: {} };
  }

  return { props: {} };
};
