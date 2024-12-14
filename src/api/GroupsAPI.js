import BaseAPI from "./BaseAPI";

/**
 * API Class.
 *
 */
class GroupsAPI extends BaseAPI {
  static async create(data) {
    const res = await this.request({
      path: `groups`,
      data,
      method: "post",
    });
    return res.data;
  }

  static async get(id) {
    const res = await this.request({ path: `groups/${id}` });
    return res.data;
  }

  static async getAll({ isJoined = false, isSaved = false } = {}) {
    const query = new URLSearchParams({ isJoined, isSaved });
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

  // get group members // GET groups/:id/members
  static async getMembers(id) {
    const res = await this.request({ path: `groups/${id}/members` });
    return res.data;
  }

  // get group events // GET groups/:id/events
  static async getEvents(id) {
    const res = await this.request({ path: `groups/${id}/events` });
    return res.data;
  }

  // get group posts // GET groups/:id/posts
  static async getPosts(id) {
    const res = await this.request({ path: `groups/${id}/posts` });
    return res.data;
  }

  // add group post // POST groups/:id/posts
  static async createPost(id, newPostText) {
    const res = await this.request({
      path: `groups/${id}/posts`,
      method: "post",
      data: { text: newPostText }
    });
    return res.data;
  }

  // edit group post // PATCH groupposts/:id
  static async editPost(id, newPostText) {
    const res = await this.request({
      path: `groupposts/${id}`,
      method: "patch",
      data: { text: newPostText }
    });
    return res.data;
  }

  // delete group post // DELETE groupposts/:id
  static async deletePost(id) {
    const res = await this.request({
      path: `groupposts/${id}`,
      method: "delete",
    });
    return res.data;
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

  // linkEvent // POST groups/:id/events/:id?/link
  static async linkEvent(groupId, eventId) {
    await this.request({
      path: `groups/${groupId}/events/${eventId}/link`,
      method: "post",
    });
  }

  // unlinkEvent // DELETE groups/:id/events/:id?/unlink
  static async unlinkEvent(groupId, eventId) {
    await this.request({
      path: `groups/${groupId}/events/${eventId}/unlink`,
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
