import { type RefObject, useEffect, useRef, useState } from "react";
import { type QueryParamConfig, useQueryParam } from "use-query-params";
import { staleForecastLabel } from "./stale";

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

// Returns a "cached forecast from <date>" label when the displayed overlay is
// served from a cache populated before today (only meaningful offline, since
// NetworkFirst keeps it fresh while online), else null.
export const useStaleOverlay = (url: string): string | null => {
  const [label, setLabel] = useState<string | null>(null);
  useEffect(() => {
    let cancelled = false;
    const check = async () => {
      if (navigator.onLine || !("caches" in window)) {
        if (!cancelled) setLabel(null);
        return;
      }
      const match = await caches.match(url).catch(() => undefined);
      const date = match?.headers.get("date");
      if (!cancelled) {
        setLabel(staleForecastLabel(date ? new Date(date) : null));
      }
    };
    check();
    window.addEventListener("online", check);
    window.addEventListener("offline", check);
    return () => {
      cancelled = true;
      window.removeEventListener("online", check);
      window.removeEventListener("offline", check);
    };
  }, [url]);
  return label;
};
