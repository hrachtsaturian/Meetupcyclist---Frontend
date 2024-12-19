import BaseAPI from "./BaseAPI";

/**
 * API Class.
 *
 */
class UsersAPI extends BaseAPI {
  static async authenticate() {
    const res = await this.request({
      path: `authenticate`,
      method: "post",
      withCredentials: true,
    });
    return res.data;
  }

  static async login(creds) {
    const res = await this.request({
      path: `login`,
      data: creds,
      method: "post",
    });
    return res.data;
  }

  static async logout() {
    await this.request({
      path: `logout`,
      method: "post",
    });
  }

  static async signup(creds) {
    const res = await this.request({
      path: `signup`,
      data: creds,
      method: "post",
    });
    return res.data;
  }

  static async get(id) {
    const res = await this.request({ path: `users/${id}` });
    return res.data;
  }

  static async updateProfile(id, data) {
    const res = await this.request({
      path: `users/${id}`,
      data,
      method: "patch",
    });
    return res.data;
  }

  static async deactivate(id) {
    const res = await this.request({
      path: `users/${id}/deactivate`,
      method: "patch",
    });
    return res.data;
  }
}

export default UsersAPI;
