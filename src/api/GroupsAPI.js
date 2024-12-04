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

  static async getAll({ showJoinedGroups = false, showSaves = false } = {}) {
    const query = new URLSearchParams({ showJoinedGroups, showSaves });
    const res = await this.request({ path: `groups?${query.toString()}` });
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

  // leave // DELETE groups/:id/membership
  static async leave(groupId) {
    await this.request({
      path: `groups/${groupId}/membership`,
      method: "delete",
    });
  }

  // addSave // POST groups/:id/saved
  static async makeSave(groupId) {
    const res = await this.request({
      path: `groups/${groupId}/saved`,
      method: "post",
    });
    return res.data;
  }

  // removeSave // DELETE groups/:id/saved
  static async removeSave(groupId) {
    await this.request({
      path: `groups/${groupId}/saved`,
      method: "delete",
    });
  }
}

export default GroupsAPI;
