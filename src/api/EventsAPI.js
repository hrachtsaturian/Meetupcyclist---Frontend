import BaseAPI from "./BaseAPI";

/**
 * API Class.
 *
 */
class EventsAPI extends BaseAPI {
  static async create(data) {
    await this.request({
      path: `events`,
      data,
      method: "post",
    });
  }

  static async get(id) {
    const res = await this.request({ path: `events/${id}` });
    return res.data;
  }

  static async getAll({ showAttendingEvents = false, showFavorites = false } = {}) {
    const query = new URLSearchParams({ showAttendingEvents, showFavorites });
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

  // addFavorite // POST events/:id/favorite
  static async makeFav(eventId) {
    await this.request({
      path: `events/${eventId}/favorite`,
      method: "post",
    });
  }

  // removeFavorite // DELETE events/:id/favorite
  static async removeFav(eventId) {
    await this.request({
      path: `events/${eventId}/favorite`,
      method: "delete",
    });
  }
}

export default EventsAPI;
