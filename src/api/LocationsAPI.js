import BaseAPI from "./BaseAPI";

/**
 * API Class.
 *
 */
class LocationsAPI extends BaseAPI {
  static async create(data) {
    await this.request({
      path: `locations`,
      data,
      method: "post",
    });
  }

  static async get(id) {
    const res = await this.request({ path: `locations/${id}` });
    return res.data;
  }

  static async getAll() {
    const res = await this.request({ path: `locations` });
    return res.data;
  }

  static async update(id, data) {
    const res = await this.request({
      path: `locations/${id}`,
      data,
      method: "patch",
    });
    return res.data;
  }

  static async delete(id) {
    await this.request({
      path: `locations/${id}`,
      method: "delete",
    });
  }

  // addFavorite // POST locations/:id/favorite
  static async makeFav(locationId) {
    const res = await this.request({
      path: `locations/${locationId}/favorite`,
      method: "post",
    });
    return res.data;
  }

  // removeFavorite // DELETE locations/:id/favorite
  static async removeFav(locationId) {
    await this.request({
      path: `locations/${locationId}/favorite`,
      method: "delete",
    });
  }
}

export default LocationsAPI;
