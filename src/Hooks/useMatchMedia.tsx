
import { useState, useLayoutEffect } from "react";

export const useMatchMedia = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(false);

  useLayoutEffect(() => {
    if(typeof window === 'undefined') return

    const media = window.matchMedia(query)

    const listener = () => setMatches(media.matches)

    setMatches(media.matches)

    media.addEventListener('change', listener)

    return () => media.removeEventListener('change', listener)
  }, [query])

  return matches
  
}