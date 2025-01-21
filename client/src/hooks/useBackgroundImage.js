import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

export function useBackgroundImage() {
  const [backgroundImageUrl, setBackgroundImageUrl] = useState(
    () => localStorage.getItem('backgroundImageUrl') || ''
  );
  const url = `https://api.unsplash.com/photos/random?query=dark&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`;

  const fetchImage = useCallback(async () => {
    try {
      const response = await axios.get(url);
      const data = response.data;
      localStorage.setItem('backgroundImageUrl', data.urls.full);
      localStorage.setItem('lastFetchTime', Date.now());
      return data.urls.full;
    } catch (error) {
      throw new Error('Failed to fetch background image');
    }
  }, [url]);

  const { isLoading, error } = useQuery({
    queryKey: ['backgroundImage'],
    queryFn: fetchImage,
    enabled: !backgroundImageUrl,
    staleTime: 1000 * 60 * 60 * 5,
    onSuccess: (data) => setBackgroundImageUrl(data),
  });

  useEffect(() => {
    let isMounted = true;

    const fetchAndSetImage = async () => {
      try {
        const imageUrl = await fetchImage();
        if (isMounted) {
          setBackgroundImageUrl(imageUrl);
        }
      } catch (error) {
        console.error('Failed to fetch background image:', error);
      }
    };

    if (!backgroundImageUrl) {
      fetchAndSetImage();
    } else {
      const lastFetchTime = parseInt(localStorage.getItem('lastFetchTime'), 10);
      if (Date.now() - lastFetchTime > 1000 * 60 * 60 * 5 || !lastFetchTime) {
        fetchAndSetImage();
      }
    }

    return () => (isMounted = false);
  }, [backgroundImageUrl, fetchImage]);

  return { isLoading, error, backgroundImageUrl };
}
