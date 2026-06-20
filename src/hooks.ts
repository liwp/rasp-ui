import { type RefObject, useEffect, useRef, useState } from "react";
import { type QueryParamConfig, useQueryParam } from "use-query-params";

export const useIsImageLoading = (url: string, delay = 0): boolean => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(true), delay);
    const image = new Image();
    image.src = url;
    image.onload = () => {
      clearTimeout(timer);
      setIsLoading(false);
    };
  }, [url, delay]);
  return isLoading;
};

export const useOnClickOutside = <T extends HTMLElement>(
  handler: (event: MouseEvent) => void,
): RefObject<T | null> => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [handler]);

  return ref;
};

export const useStatefulQueryParam = <T>(
  name: string,
  paramConfig: QueryParamConfig<T>,
): [T, (newState: T) => void] => {
  const [queryParam, setQueryParam] = useQueryParam(name, paramConfig);
  const [state, setState] = useState(queryParam);
  return [
    state,
    (newState: T) => {
      setQueryParam(newState);
      setState(newState);
    },
  ];
};
