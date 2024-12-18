import qs from "qs";
import BaseAPI from "./BaseAPI";

/**
 * API Class.
 *
 */
class EventsAPI extends BaseAPI {
  static async create(data) {
    const res = await this.request({
      path: `events`,
      data,
      method: "post",
    });
    return res.data;
  }

  static async get(id) {
    const res = await this.request({ path: `events/${id}` });
    return res.data;
  }

  static async getAll({
    filter: {
      isSaved = null,
      isAttending = null,
      minDate = null,
      maxDate = null,
      createdBy = null,
    } = {},
    sort: { date = "ASC" } = {},
  } = {}) {
    const query = qs.stringify({
      filter: { isSaved, isAttending, minDate, maxDate, createdBy },
      sort: { date },
    });
    const res = await this.request({ path: `events?${query.toString()}` });
    return res.data;
  }

  static async update(id, data) {
    const res = await this.request({
      path: `events/${id}`,
      data,
      method: "patch",
    });
    return res.data;
  }

  static async delete(id) {
    await this.request({
      path: `events/${id}`,
      method: "delete",
    });
  }

  // get event attendees // GET events/:id/attendees
  static async getAttendees(id) {
    const res = await this.request({ path: `events/${id}/attendees` });
    return res.data;
  }

  // get event posts // GET events/:id/posts
  static async getPosts(id) {
    const res = await this.request({ path: `events/${id}/posts` });
    return res.data;
  }

  // add event post // POST events/:id/posts
  static async createPost(id, newPostText) {
    const res = await this.request({
      path: `events/${id}/posts`,
      method: "post",
      data: { text: newPostText },
    });
    return res.data;
  }

  // edit event post // PATCH eventposts/:id
  static async editPost(id, newPostText) {
    const res = await this.request({
      path: `eventposts/${id}`,
      method: "patch",
      data: { text: newPostText },
    });
    return res.data;
  }

  // delete event post // DELETE eventposts/:id
  static async deletePost(id) {
    const res = await this.request({
      path: `eventposts/${id}`,
      method: "delete",
    });
    return res.data;
  }

  // attend // POST events/:id/attendance
  static async attend(eventId) {
    await this.request({
      path: `events/${eventId}/attendance`,
      method: "post",
    });
  }

  // unattend // DELETE events/:id/attendance
  static async unattend(eventId) {
    await this.request({
      path: `events/${eventId}/attendance`,
      method: "delete",
    });
  }

  // addSave // POST events/:id/saved
  static async makeSave(eventId) {
    await this.request({
      path: `events/${eventId}/saved`,
      method: "post",
    });
  }

  // removeSave // DELETE events/:id/saved
  static async removeSave(eventId) {
    await this.request({
      path: `events/${eventId}/saved`,
      method: "delete",
    });
  }
}

export default EventsAPI;
