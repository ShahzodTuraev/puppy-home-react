import axios from "axios";
import { Notification } from "../../types/notification";
import { serverApi } from "../lib/config";
import assert from "assert";
import { Definer } from "../lib/Definer";

class NotificationApiService {
  private readonly path: string;
  constructor() {
    this.path = serverApi;
  }

  async getMyNotifications(): Promise<Notification[]> {
    try {
      const url = "/receive-notification",
        result = await axios.get(this.path + url, {
          withCredentials: true,
        });
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);
      console.log("state:::", result.data.state);
      const orders: any = result.data.data;
      return orders;
    } catch (err: any) {
      console.log(`ERROR ::: getMyNotifications ${err.message}`);
      throw err;
    }
  }

  async removeMyNotifications(data: any): Promise<Notification> {
    try {
      const url = "/seen-notification",
        result = await axios.post(this.path + url, data, {
          withCredentials: true,
        });
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);
      console.log("state:::", result.data.state);
      const orders: any = result.data.data;
      return orders;
    } catch (err: any) {
      console.log(`ERROR ::: removeMyNotifications ${err.message}`);
      throw err;
    }
  }
}
export default NotificationApiService;
