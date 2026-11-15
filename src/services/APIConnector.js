import axios from "axios";

// Default timeout: 20 seconds for standard requests
const DEFAULT_TIMEOUT = 20000;
// Extended timeout: 2 minutes for file/media uploads
const UPLOAD_TIMEOUT = 120000;

export const axiosInstance = axios.create({
  timeout: DEFAULT_TIMEOUT,
});

// Response interceptor to format timeout and network errors cleanly
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.code === "ECONNABORTED" ||
      error.message?.toLowerCase().includes("timeout")
    ) {
      const timeoutMessage =
        "Request timed out. The server took too long to respond. Please try again.";
      error.message = timeoutMessage;
      if (!error.response) {
        error.response = { data: { message: timeoutMessage, success: false } };
      }
    } else if (
      error.code === "ERR_NETWORK" ||
      (!error.response && error.request)
    ) {
      const networkMessage =
        "Network error: Unable to connect to server. Please check your connection.";
      error.message = networkMessage;
      if (!error.response) {
        error.response = { data: { message: networkMessage, success: false } };
      }
    }
    return Promise.reject(error);
  }
);

export const APIConnector = (
  method,
  url,
  bodyData,
  headers,
  params,
  timeout
) => {
  // Automatically provide longer timeout for multipart/form-data (uploads)
  const isMultipart =
    (headers && headers["Content-Type"]?.includes("multipart/form-data")) ||
    (typeof FormData !== "undefined" && bodyData instanceof FormData);

  const requestTimeout =
    timeout || (isMultipart ? UPLOAD_TIMEOUT : DEFAULT_TIMEOUT);

  return axiosInstance({
    method: `${method}`,
    url: `${url}`,
    data: bodyData ? bodyData : null,
    headers: headers ? headers : null,
    params: params ? params : null,
    timeout: requestTimeout,
  });
};