import { debounce, DebounceSettings } from 'lodash';
import { useEffect, useState } from 'react';

type Options<T> = {
  refreshDeps?: React.DependencyList;
  before?: () => boolean | undefined;
  manual?: boolean;
  onSuccess?: (res: T) => void;
  onError?: (err: Error) => void;
  debounceOptions?: number | ({ wait: number } & Partial<DebounceSettings>);
};

export function useRequest<T>(request: () => Promise<T>, options?: Options<T>) {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error>();
  const { refreshDeps, before, manual, onSuccess, onError, debounceOptions } =
    options || {};
  const run = async () => {
    try {
      setLoading(true);
      const res = await request();
      setData(res);
      onSuccess && onSuccess(res);
    } catch (err) {
      setError(err);
      onError && onError(err);
    } finally {
      setLoading(false);
    }
  };
  const debounceRun = debounce(
    run,
    typeof debounceOptions === 'number'
      ? debounceOptions
      : debounceOptions?.wait || 0
  );
  useEffect(() => {
    if (manual) return;
    if (before && !before()) return;
    run();
  }, refreshDeps ?? []);

  return {
    run: debounceOptions ? debounceRun : run,
    data,
    setData,
    loading,
    setLoading,
    error,
    setError,
  };
}
