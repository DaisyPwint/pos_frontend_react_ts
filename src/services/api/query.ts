import { getProducts, getProductsByPage } from "./productApi.ts";

export const productQuery = () => ({
  queryKey: ["products"],
  queryFn: getProducts,
});

export const productByPageQuery = (page = 1) => ({
  queryKey: ["products", page],
  queryFn: async () => getProductsByPage(page),
  keepPreviousData: true,
  staleTime: 1000 * 60 * 60,
});
