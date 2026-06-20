import { type RefObject, useEffect, useRef, useState } from "react";
import { type QueryParamConfig, useQueryParam } from "use-query-params";

type ImageStatus = "loading" | "loaded" | "error";

export const useImageStatus = (url: string, delay = 500): ImageStatus => {
  const [status, setStatus] = useState<ImageStatus>("loading");
  useEffect(() => {
    // Debounce: keep the prior status for `delay` ms so fast layer/time
    // switches don't flash a spinner.
    const timer = setTimeout(() => setStatus("loading"), delay);
    const image = new Image();
    image.src = url;
    image.onload = () => {
      clearTimeout(timer);
      setStatus("loaded");
    };
    image.onerror = () => {
      clearTimeout(timer);
      setStatus("error");
    };
    return () => {
      clearTimeout(timer);
      image.onload = null;
      image.onerror = null;
    };
  }, [url, delay]);
  return status;
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
