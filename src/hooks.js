import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useQueryParam } from "use-query-params";

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

// A hack to get a fullscreen element on mobile
export const useVhHack = () => {
  useLayoutEffect(() => {
    const listener = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    window.addEventListener("resize", listener);
    listener(); // Initial update
    return () => window.removeEventListener("resize", listener);
  }, []);
};
