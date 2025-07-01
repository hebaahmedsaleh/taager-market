
'use client';

import ErrorFallback from '@/app/components/ui/ErrorFallback';

export default function ProductError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return <ErrorFallback error={error} reset={reset} />;
}