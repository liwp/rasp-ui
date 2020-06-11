import { useEffect, useRef, useState } from "react";
import { useQueryParam } from "use-query-params";

export const useIsImageLoading = (url, delay = 0) => {
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

export const useOnClickOutside = (handler) => {
  const ref = useRef();

  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);

  return ref;
};

export const useStatefulQueryParam = (name, paramConfig) => {
  const [queryParam, setQueryParam] = useQueryParam(name, paramConfig);
  const [state, setState] = useState(queryParam);
  return [
    state,
    (newState) => {
      setQueryParam(newState);
      setState(newState);
    },
  ];
};
