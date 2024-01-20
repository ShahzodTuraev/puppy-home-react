import { MeFollowed } from "./follow";

export interface Member {
  _id: string;
  mb_nick: string;
  mb_email: string;
  mb_phone: string;
  mb_password: string;
  mb_type: string;
  mb_status: string;
  mb_address?: string;
  mb_location?: string;
  mb_description?: string;
  mb_image?: string;
  mb_point?: number;
  mb_views: number;
  mb_likes: number;
  mb_follow_cnt: number;
  mb_subscriber_cnt: number;
  createdAt: Date;
  me_liked: []; //meliked
  me_followed: MeFollowed[];
}
