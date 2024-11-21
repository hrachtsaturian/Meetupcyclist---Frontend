import BaseAPI from "./BaseAPI";

/**
 * API Class.
 *
 */
class EventsAPI extends BaseAPI {
  static async get(id) {
    const res = await this.request({ path: `events/${id}` });
    return res.data;
  }

  static async getAll() {
    const res = await this.request({ path: `events` });
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
  
  // addFavorite // POST events/:id/favorite
  static async makeFav(eventId) {
    const res = await this.request({
      path: `events/${eventId}/favorite`,
      method: "post",
    });
    return res.data;
  }

  // removerFavorite // DELETE events/:id/favorite
  static async removeFav(eventId) {
    await this.request({
      path: `events/${eventId}/favorite`,
      method: "delete",
    });
}
}

export default EventsAPI;
