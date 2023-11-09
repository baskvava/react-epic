import { useEffect, useRef, useState } from "react";

function useDebounce(value: any, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const timerId = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    timerId.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timerId.current);
  }, [value, delay]);

  return { debouncedValue };
}

export { useDebounce };
