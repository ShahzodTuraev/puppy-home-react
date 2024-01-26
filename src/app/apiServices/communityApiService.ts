import axios from "axios";
import { BoArticle, SearchArticlesObj } from "../../types/boArticle";
import { serverApi } from "../lib/config";
import { Definer } from "../lib/Definer";
import assert from "assert";

class CommunityApiService {
  private readonly path: string;
  constructor() {
    this.path = serverApi;
  }
  public async getTargetArticles(
    data: SearchArticlesObj
  ): Promise<BoArticle[]> {
    try {
      let url = `/community/articles?page=${data.page}&limit=${data.limit}&mb_id=${data.mb_id}`;
      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });
      console.log("state:", result.data.state);
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data.state !== "fail", result?.data?.message);
      const articles: BoArticle[] = result.data.data;
      return articles;
    } catch (err: any) {
      console.log(`ERROR::: getTargetArticles ${err.message}`);
      throw err;
    }
  }

  public async getChosenArticles(id: string): Promise<boolean> {
    try {
      let url = `/community/single-article/${id}`;
      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });
      console.log("state:", result.data.state);
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data.state !== "fail", result?.data?.message);
      return true;
    } catch (err: any) {
      console.log(`ERROR::: getChosenArticles ${err.message}`);
      throw err;
    }
  }
}

export default CommunityApiService;
