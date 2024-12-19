import qs from "qs";
import { flattenAttributes, getStrapiURL, getAuthToken } from "../lib/utils";

const baseUrl = getStrapiURL();

async function fetchData(url:string) {
  const authToken = await getAuthToken();

  const headers = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  };

  try {
    const response = await fetch(url, authToken ? headers : {});
    const data = await response.json();
    return flattenAttributes(data.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // or return null;
  }
}

export async function postData(url:string, body:any) {
  const authToken = await getAuthToken();
  console.log(body);
  const headers = {
    method: "POST",
    body: body,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  };

  try {
    const response = await fetch(url, authToken ? headers : {});
    const data = await response.json();
    return flattenAttributes(data.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // or return null;
  }
}

export async function getCategories() {
  const query = qs.stringify({
    sort: ["name:desc"],
  });
  return fetchData(`${baseUrl}/api/categories?${query}`);
}

export async function getProducts() {
  const PAGE_SIZE = 2;
  const query = qs.stringify({
    sort: ["name:desc"],
    pagination: {
      pageSize: PAGE_SIZE,
    },
  });
  return fetchData(`${baseUrl}/api/products?${query}`);
}

export async function getOnSaleProducts() {
  const PAGE_SIZE = 2;
  const query = qs.stringify({
    sort: ["name:desc"],
    pagination: {
      pageSize: PAGE_SIZE,
    },
  });
  return fetchData(`${baseUrl}/api/products?${query}`);
}

export async function getFavouriteProducts() {
  const PAGE_SIZE = 2;
  const query = qs.stringify({
    sort: ["name:desc"],
    pagination: {
      pageSize: PAGE_SIZE,
    },
  });
  return fetchData(`${baseUrl}/api/products?${query}`);
}

export async function getProductsByCategory(category:any) {
  const PAGE_SIZE = 2;
  const query = qs.stringify({
    sort: ["name:desc"],
    pagination: {
      pageSize: PAGE_SIZE,
    },
    filters: {
      slug:{
        $eq: category,
      }
    },
    populate: {
      vendors: {
        populate: true
      }
     },
  });
  return fetchData(`${baseUrl}/api/categories?${query}`);
}

export async function getVendorById(vendorId:string) {
  const PAGE_SIZE = 2;
  const query = qs.stringify({
    sort: ["name:desc"],
    pagination: {
      pageSize: PAGE_SIZE,
    },
    filters: {
      id:{
        $eq: vendorId,
      }
    },
    populate: {
      products: {
        populate: true
      }
     },
  });
  return fetchData(`${baseUrl}/api/vendors?${query}`);
}
export async function getProductById(productId:string) {
  const PAGE_SIZE = 2;
  const query = qs.stringify({
    sort: ["name:desc"],
    pagination: {
      pageSize: PAGE_SIZE,
    },
    filters: {
      id:{
        $eq: productId,
      }
    },
  });
  return fetchData(`${baseUrl}/api/products?${query}`);
}