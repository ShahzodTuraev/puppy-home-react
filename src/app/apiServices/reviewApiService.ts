import axios from "axios";
import assert from "assert";
import { serverApi } from "../lib/config";
import { Definer } from "../lib/Definer";
import { Review } from "../../types/reivew";
import { CreateReviewObj, ReviewSearchObj } from "../../types/others";

class ReviewApiService {
  private readonly path: string;
  constructor() {
    this.path = serverApi;
  }

  async getTargetReviews(data: ReviewSearchObj): Promise<Review[]> {
    try {
      const url = "/reviews",
        result = await axios.post(this.path + url, data, {
          withCredentials: true,
        });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);
      console.log("state:::", result.data.state);
      const targetReviews: Review[] = result.data.data;
      return targetReviews;
    } catch (err: any) {
      console.log(`ERROR ::: getTargetReviews ${err.message}`);
      throw err;
    }
  }

  async createReview(data: CreateReviewObj): Promise<any> {
    try {
      const url = "/review/create",
        result = await axios.post(this.path + url, data, {
          withCredentials: true,
        });
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);
      console.log("state:::", result.data.state);

      return true;
    } catch (err: any) {
      console.log(`ERROR ::: createReviews ${err.message}`);
      throw err;
    }
  }
}
export default ReviewApiService;
