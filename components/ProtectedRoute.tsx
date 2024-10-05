// /app/components/ProtectedRoute.tsx
import { useAuth } from '../components/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import LoadingSpinner from './LoadingSpinnerComponent';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading) return <LoadingSpinner />;

  return <>{children}</>;
};

export default ProtectedRoute;
