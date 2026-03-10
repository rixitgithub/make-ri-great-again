import { useCallback, useState } from 'react';

export const useLoading = () => {
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  const setActionLoading = useCallback((action: string, isLoading: boolean) => {
    setLoading((prev) => ({
      ...prev,
      [action]: isLoading,
    }));
  }, []);

  return { actionLoading: loading, setActionLoading };
};
