import qs from "qs";
import BaseAPI from "./BaseAPI";

/**
 * API Class.
 *
 */
class LocationsAPI extends BaseAPI {
  static async create(data) {
    const res = await this.request({
      path: `locations`,
      data,
      method: "post",
    });
    return res.data;
  }

  static async get(id) {
    const res = await this.request({ path: `locations/${id}` });
    return res.data;
  }

  static async getAll({ isSaved = false } = {}) {
    const query = qs.stringify({ isSaved });
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

  // get location reviews // GET locations/:id/reviews
  static async getReviews(id) {
    const res = await this.request({ path: `locations/${id}/reviews` });
    return res.data;
  }

  // add location review // POST locations/:id/reviews
  static async createReview(id, newReviewText, newReviewRate) {
    const res = await this.request({
      path: `locations/${id}/reviews`,
      method: "post",
      data: { text: newReviewText, rate: newReviewRate }
    });
    return res.data;
  }

  // edit location review // PATCH locationreviews/:id
  static async editReview(id, newReviewText, newReviewRate) {
    const res = await this.request({
      path: `locationreviews/${id}`,
      method: "patch",
      data: { text: newReviewText, rate: newReviewRate }
    });
    return res.data;
  }

  // delete location review // DELETE locationreviews/:id
  static async deleteReview(id) {
    const res = await this.request({
      path: `locationreviews/${id}`,
      method: "delete",
    });
    return res.data;
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
