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

  static async getAll({ showSaves = false } = {}) {
    const query = new URLSearchParams({ showSaves });
    const res = await this.request({ path: `locations?${query.toString()}` });
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

  // addSave // POST locations/:id/saved
  static async makeSave(locationId) {
    const res = await this.request({
      path: `locations/${locationId}/saved`,
      method: "post",
    });
    return res.data;
  }

  // removeSave // DELETE locations/:id/saved
  static async removeSave(locationId) {
    await this.request({
      path: `locations/${locationId}/saved`,
      method: "delete",
    });
  }
}

export default LocationsAPI;
