import { usePageContext } from "./usePageContext.js";

export function useData<Data>() {
  const { data } = usePageContext();
  return data as Data;
}
