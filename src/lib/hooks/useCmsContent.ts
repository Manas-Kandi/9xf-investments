import { useEffect, useState } from 'react';
import { CmsContentType, CmsEditorialContext, CmsResolution } from '../cms/types';

interface CmsState<T> extends CmsResolution<T> {
  isLoading: boolean;
  error?: string;
}

export function useCmsContent<T>(
  type: CmsContentType,
  options: { slug?: string; initialData: CmsResolution<T>['data']; initialContext?: CmsEditorialContext },
): CmsState<T> {
  const [state, setState] = useState<CmsState<T>>({
    data: options.initialData,
    source: 'fallback',
    context: options.initialContext || { guidelines: [], fallbackMessage: undefined },
    isLoading: true,
  });

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams({ type });
    if (options.slug) params.set('slug', options.slug);

    fetch(`/api/cms?${params.toString()}`, { signal: controller.signal })
      .then(async (res) => {
        if (!res.ok) throw new Error(`Failed to load CMS content (${res.status})`);
        return res.json();
      })
      .then((json: CmsResolution<T>) => {
        setState({ ...json, isLoading: false });
      })
      .catch((error) => {
        console.warn('[CMS] Using fallback after client fetch error', error);
        setState((prev) => ({ ...prev, isLoading: false, error: error?.message }));
      });

    return () => controller.abort();
  }, [options.slug, type]);

  return state;
}
