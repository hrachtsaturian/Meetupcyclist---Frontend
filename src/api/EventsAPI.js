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
    showAttendingEvents = false,
    showSaves = false,
    showPastEvents = false,
  } = {}) {
    const query = new URLSearchParams({ showAttendingEvents, showSaves, showPastEvents });
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
