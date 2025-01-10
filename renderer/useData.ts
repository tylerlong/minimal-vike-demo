import { usePageContext } from "./usePageContext";

export function useData<Data>() {
  const { data } = usePageContext();
  return data as Data;
}
