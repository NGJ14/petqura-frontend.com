import { getLocalStorage } from "./utils";

// Add a request interceptor
export function onRequest(config) {
  // Do something before request is sent
  // like adding token to request header
  const auth = getLocalStorage("AUTH_DETAILS");
  if (auth) {
    config.headers = {
      ...config.headers,
    };
    config.headers = {
      ...config.headers,
      Authorization: config?.url?.includes("/logout")
        ? `Bearer ${auth.refresh_token}`
        : `Bearer ${auth.access_token}`,
    };
  }

  return config;
}

export function onRequestError(error) {
  // Do something with request error
  return Promise.reject(error);
}

// Add a response interceptor
export function onResponse(response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}

export function onResponseError(error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  const status = Number(
    error.response ? error.response.headers.status || error.response.status : -1
  );
  if (status === 401 || status === 403) {
    localStorage.clear();
    if (window.location.href?.includes("/carer")) {
      window.location.href = "/carer/login";
    } else {
      window.location.href = "/home";
    }
  }

  if (status == 404 && !window.location.href?.includes("/carer/login")) {
    window.location.href = "/page-not-found";
  }

  return Promise.reject(
    error?.response?.data?.message ||
      "Something went wrong! Please try again after some time"
  );
}
