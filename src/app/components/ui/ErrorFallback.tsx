'use client';

import { useEffect } from 'react';

export default function ErrorFallback({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="p-6 text-red-600">
      <p>{error.message || 'Something went wrong.'}</p>
      <button
        onClick={reset}
        className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded"
      >
        Retry
      </button>
    </div>
  );
}