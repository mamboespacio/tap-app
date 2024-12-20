import qs from "qs";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/utils";
import { Category } from './types';

async function fetchCategories() {
  const query = qs.stringify({
    sort: ["name:desc"],
    // pagination: {
    //   pageSize: 2,
    // },
  });
  const { data } = await api.get<Category[]>(`/categories/${query}`);
  return console.log(data);
}

export function useFetchCategories() {
  return useQuery({ queryKey: ['categories'], queryFn: fetchCategories })
}