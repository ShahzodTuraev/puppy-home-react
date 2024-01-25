import axios from "axios";
import assert from "assert";
import { serverApi } from "../lib/config";
import { ServiceSearchObj } from "../../types/others";
import { Product } from "../../types/product";
import { Definer } from "../lib/Definer";

class ServiceApiService {
  private readonly path: string;
  constructor() {
    this.path = serverApi;
  }

  async getTargetServices(data: ServiceSearchObj): Promise<Product[]> {
    try {
      console.log("dataaaaa", data);
      const url = "/services",
        result = await axios.post(this.path + url, data, {
          withCredentials: true,
        });
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);
      console.log("state:::", result.data.state);
      const services: Product[] = result.data.data;
      return services;
    } catch (err: any) {
      console.log(`ERROR ::: getTargetServices ${err.message}`);
      throw err;
    }
  }

  async getChosenService(service_id: string): Promise<Product> {
    try {
      const url = `/products/${service_id}`,
        result = await axios.get(this.path + url, {
          withCredentials: true,
        });
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);
      console.log("state:::", result.data.state);
      const service: Product = result.data.data;
      return service;
    } catch (err: any) {
      console.log(`ERROR ::: getChosenService ${err.message}`);
      throw err;
    }
  }
}
export default ServiceApiService;
