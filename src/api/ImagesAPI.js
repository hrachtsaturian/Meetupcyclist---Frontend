import BaseAPI from "./BaseAPI";

/**
 * API Class.
 *
 */
class ImagesAPI extends BaseAPI {
  static async uploadImage(formData) {
    const res = await this.request({
      path: `uploadImage`,
      method: "post",
      data: formData
    });
    return res.data;
  }
}

export default ImagesAPI;
