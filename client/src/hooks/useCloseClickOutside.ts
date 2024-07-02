import { useEffect, useRef } from "react";

export const useCloseClickOutside = (handler: () => void, isCapturing = true) => {
  const ref = useRef();
  useEffect(() => {
    const handleCloseModal = (e: MouseEvent) => {
      //@ts-expect-error has contain
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    };

    document.addEventListener("click", handleCloseModal, isCapturing);

    return () => {
      document.removeEventListener("click", handleCloseModal, isCapturing);
    };
  }, [handler, isCapturing]);

  return ref;
};
