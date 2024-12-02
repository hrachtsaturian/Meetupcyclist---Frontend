import BaseAPI from "./BaseAPI";

/**
 * API Class.
 *
 */
class GroupsAPI extends BaseAPI {
  static async create(data) {
    await this.request({
      path: `groups`,
      data,
      method: "post",
    });
  }

  static async get(id) {
    const res = await this.request({ path: `groups/${id}` });
    return res.data;
  }

  static async getAll() {
    const res = await this.request({ path: `groups` });
    return res.data;
  }

  static async update(id, data) {
    const res = await this.request({
      path: `groups/${id}`,
      data,
      method: "patch",
    });
    return res.data;
  }

  static async delete(id) {
    await this.request({
      path: `groups/${id}`,
      method: "delete",
    });
  }

  // join // POST groups/:id/membership
  static async join(groupId) {
    const res = await this.request({
      path: `groups/${groupId}/membership`,
      method: "post",
    });
    return res.data;
  }

  // withdraw // DELETE groups/:id/membership
  static async withdraw(groupId) {
    await this.request({
      path: `groups/${groupId}/membership`,
      method: "delete",
    });
  }

  // addFavorite // POST groups/:id/favorite
  static async makeFav(groupId) {
    const res = await this.request({
      path: `groups/${groupId}/favorite`,
      method: "post",
    });
    return res.data;
  }

  // removeFavorite // DELETE groups/:id/favorite
  static async removeFav(groupId) {
    await this.request({
      path: `groups/${groupId}/favorite`,
      method: "delete",
    });
  }
}

export default GroupsAPI;
