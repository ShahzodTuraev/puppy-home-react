import axios from "axios";
import assert from "assert";
import { serverApi } from "../lib/config";
import { Definer } from "../lib/Definer";
import { Event } from "../../types/event";

class EventApiService {
  private readonly path: string;
  constructor() {
    this.path = serverApi;
  }

  async getEvents(page: string, limit: string): Promise<Event[]> {
    try {
      const url = `/events?page=${page}&limit=${limit}`,
        result = await axios.get(this.path + url, {
          withCredentials: true,
        });
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);
      console.log("state:::", result.data.state);
      const events: Event[] = result.data.data;
      return events;
    } catch (err: any) {
      console.log(`ERROR ::: getEvents ${err.message}`);
      throw err;
    }
  }
}
export default EventApiService;
