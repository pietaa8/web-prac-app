import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `${title} - LawVault`;
  }, [title]);
  return null;
};

export default useTitle;
