"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const useQueryParams = (pathName: string) => {
  const pusePathname = useSearchParams();

  return pusePathname.get(pathName);
};

export default useQueryParams;
