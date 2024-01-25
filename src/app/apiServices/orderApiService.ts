import axios from "axios";
import { CartItem } from "../../types/others";
import { serverApi } from "../lib/config";
import assert from "assert";
import { Definer } from "../lib/Definer";
import { Order } from "../../types/order";

class OrderApiService {
  private readonly path: string;
  constructor() {
    this.path = serverApi;
  }

  async createOrder(data: CartItem[]) {
    try {
      const url = "/orders/create",
        result = await axios.post(this.path + url, data, {
          withCredentials: true,
        });
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);
      console.log("state:::", result.data.state);
      const order: any = result.data.data;
      return true;
    } catch (err: any) {
      console.log(`ERROR ::: creatOrder ${err.message}`);
      throw err;
    }
  }

  async getMyOrders(order_status: string): Promise<Order[]> {
    try {
      console.log("status", order_status);
      const url = `/orders?status=${order_status}`,
        result = await axios.get(this.path + url, {
          withCredentials: true,
        });
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);
      console.log("state:::", result.data.state);
      const orders: any = result.data.data;
      return orders;
    } catch (err: any) {
      console.log(`ERROR ::: getMyOrders ${err.message}`);
      throw err;
    }
  }

  async updateOrderStatus(data: any) {
    try {
      const url = "/orders/edit",
        result = await axios.post(this.path + url, data, {
          withCredentials: true,
        });
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);
      console.log("state:::", result.data.state);
      const order: any = result.data.data;
      return order;
    } catch (err: any) {
      console.log(`ERROR ::: updateOrderStatus ${err.message}`);
      throw err;
    }
  }
}
export default OrderApiService;
