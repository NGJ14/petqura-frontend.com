import axios from "axios";
import {
  onRequest,
  onRequestError,
  onResponse,
  onResponseError,
} from "./interceptors";

// const API_URL = "http://127.0.0.1:5000";
const API_URL = "http://beqa.petqura.com";
const axiosApi = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor
axiosApi.interceptors.request.use(onRequest);

// Add a response interceptor
axiosApi.interceptors.response.use(onResponse, onResponseError);

export async function get(url, data, config = {}) {
  return await axiosApi
    .get(url, { params: { ...data } }, { ...config })
    .then((response) => response.data);
}

export async function add(url, data, config = {}) {
  return await axiosApi
    .post(url, data, { ...config })
    .then((response) => response.data);
}

export async function update(url, data, config = {}) {
  return await axiosApi
    .put(url, { ...data }, { ...config })
    .then((response) => response.data);
}

export async function del(url, data, config = {}) {
  return await axiosApi
    .delete(url, { params: { ...data } }, { ...config })
    .then((response) => response.data);
}

export async function post(url, data, parameter, config = {}) {
  return await axiosApi
    .post(url, data, { params: { ...parameter } }, { ...config })
    .then((response) => response.data);
}

// export async function getFile(url, data, config = {}) {
//   return await axiosApi
//     .get(url, { params: { ...data } }, { ...config })
//     .then((response) => response.data);
// }

// export async function getPDFFile(url, data, config = {}) {
//   return await axiosApi
//     .get(url, { params: { ...data } }, { ...config })
//     .then((response) => {
//       console.log(response);
//       console.log(config);
//       console.log("Hi");
//       console.log(response.data);

//       if (response.data != "") {
//         const blob = new Blob([response.data], {
//           type: "application/pdf",
//         });
//         console.log(blob);
//         const blobAsText = blob.text();
//         console.log(blobAsText);
//         const url = window.URL.createObjectURL(blob);
//         const link = document.createElement("a");
//         link.href = url;
//         link.setAttribute(
//           "download",
//           `invoice_export_${new Date().toLocaleString()}.pdf`
//         ); //or any other extension
//         document.body.appendChild(link);
//         link.click();
//       }
//     });
// }

export async function getPDFFile(url, data, config = {}) {
  return await axiosApi
    .get(url, {
      responseType: "blob",
      headers: {
        Accept: "application/pdf",
      },
    })
    .then((response) => {
      if (response.data != "") {
        const blob = new Blob([response.data], {
          type: "application/pdf",
        });
        const blobAsText = blob.text();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `invoice_export_${new Date().toLocaleString()}.pdf`
        ); //or any other extension
        document.body.appendChild(link);
        link.click();
      }
    });
}
