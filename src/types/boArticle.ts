import { MeLiked } from "./product";
import { Member } from "./user";

export interface BoArticleInput {
  art_subject: string;
  art_content: string;
  art_images?: Array<string> | null;
}

export interface BoArticle {
  _id: string;
  art_subject: string;
  art_content: string;
  art_images?: Array<string> | null;
  art_status: string;
  art_likes: number;
  art_views: number;
  art_reviews: number;
  mb_id: string;
  createdAt: Date;
  updatedAt: Date;
  member_data: Member;
  me_liked: MeLiked[];
}
export interface SearchArticlesObj {
  page: number;
  limit: number;
  mb_id: string;
}
