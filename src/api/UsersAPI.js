import BaseAPI from "./BaseAPI";

/**
 * API Class.
 *
 */
class UsersAPI extends BaseAPI {
  static async authenticate(creds) {
    const res = await this.request({
      path: `login`,
      data: creds,
      method: "post",
    });
    return res.data;
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
