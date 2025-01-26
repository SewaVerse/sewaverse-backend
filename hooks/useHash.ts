import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const useHash = () => {
  const searchParams = useSearchParams();
  const [hash, setHash] = useState(
    typeof window !== "undefined" ? window.location.hash.slice(1) : null
  );

  useEffect(() => {
    setHash(
      typeof window !== "undefined" ? window.location.hash.slice(1) : null
    );
  }, [searchParams]);

  return hash;
};

export default useHash;
