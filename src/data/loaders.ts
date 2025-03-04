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

// async function getData(
//   url:string, 
//   pageSize:number,
//   sort:any,
//   filters:any,
//   populate:any,
// ) {
//   const authToken = await getAuthToken();
//   const headers = {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${authToken}`,
//     },
//   };
//   const query = qs.stringify({
//     sort: ["name:desc"],
//     pagination: {
//       pageSize: pageSize,
//     },
//   });

//   try {
//     const response = await fetch(url, authToken ? headers : {});
//     const data = await response.json();
//     return flattenAttributes(data.data);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     throw error; // or return null;
//   }
// }

export async function mutateData(method: string, path: string, payload: any) {
  const baseUrl = getStrapiURL();
  const authToken = await getAuthToken();
  const url = `${baseUrl}/api/${path}`;

  if (!authToken) throw new Error("No auth token found");
  if (!payload) throw new Error("No payload found");

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ ...payload }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error", error);
    throw error;
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
    populate: {
      vendors: {
        populate: true
      }
     },
  });
  return fetchData(`${baseUrl}/api/products?${query}`);
}

export async function getAddresses() {
  const PAGE_SIZE = 2;
  const query = qs.stringify({
    sort: ["name:desc"],
    pagination: {
      pageSize: PAGE_SIZE,
    },
  });
  return fetchData(`${baseUrl}/api/addresses?${query}`);
}

export async function getOrders() {
  const PAGE_SIZE = 2;
  const query = qs.stringify({
    sort: ["id:desc"],
    pagination: {
      pageSize: PAGE_SIZE,
    },
    populate: {
      vendor: {
        populate: true
      },
      users_permissions_user: {
        populate: true
      }
     },
  });
  return fetchData(`${baseUrl}/api/orders?${query}`);
}