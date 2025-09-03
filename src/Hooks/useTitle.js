import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    const prevTitle = document.title;   // store old
    document.title = `${title} - LawVault`;

    return () => {
      document.title = prevTitle;       // restore old
    };
  }, [title]);
};

export default useTitle;
