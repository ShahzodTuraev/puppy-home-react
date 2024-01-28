import axios from "axios";
import { FollowSearchObj, Follower, Following } from "../../types/follow";
import { serverApi } from "../lib/config";
import { Definer } from "../lib/Definer";
import assert from "assert";

class FollowApiService {
  private readonly path: string;
  constructor() {
    this.path = serverApi;
  }
  public async getMemberFollowers(data: FollowSearchObj): Promise<Follower[]> {
    try {
      const url = `/follow/followers?mb_id=${data.mb_id}&page=${data.page}&limit=${data.limit}`;

      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });
      console.log("state:", result.data.state);
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data.state !== "fail", result?.data?.message);
      const followers: Follower[] = result.data.data;
      return followers;
    } catch (err: any) {
      console.log(`ERROR::: getMemberFollowers ${err.message}`);
      throw err;
    }
  }
  public async getMemberFollowings(
    data: FollowSearchObj
  ): Promise<Following[]> {
    try {
      const url = `/follow/followings?mb_id=${data.mb_id}&page=${data.page}&limit=${data.limit}`;

      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });
      console.log("state:", result.data.state);
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data.state !== "fail", result?.data?.message);
      const followings: Following[] = result.data.data;
      return followings;
    } catch (err: any) {
      console.log(`ERROR::: getMemberFollowings ${err.message}`);
      throw err;
    }
  }
}
export default FollowApiService;
