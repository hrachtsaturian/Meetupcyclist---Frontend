import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/**
 * Base API Class
 */
class BaseAPI {
  // the token for interactive with the API will be stored here.
  static token;

  static async request({ path, data = {}, method = "get" }) {
    const url = `${BASE_URL}/${path}`;
    const params = method === "get" ? data : {};
    const headers = {};

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const axiosRes = await axios({
        url,
        method,
        data,
        params,
        headers,
        withCredentials: true,
      });
      return axiosRes.data;
    } catch (e) {
      console.error("API Error:", e?.response);
      const message =
        e?.response?.data?.error?.message || e.message || "Unexpected error";
      throw new Error(message);
    }
  }
}

export default BaseAPI;
