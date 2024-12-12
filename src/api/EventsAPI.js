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
      isSaved = false,
      isAttending = false,
      minDate = null,
      maxDate = null,
      createdBy = null
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

  // attach // POST events/:id/groups/:id
  static async attach(eventId, groupId) {
    await this.request({
      path: `events/${eventId}/groups/${groupId}`,
      method: "post",
    });
  }

  // remove // DELETE events/:id/groups/:id
  static async remove(eventId, groupId) {
    await this.request({
      path: `events/${eventId}/groups/${groupId}`,
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
