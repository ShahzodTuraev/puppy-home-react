export interface NavbarObj {
  element: JSX.Element;
  title: string;
  path: string;
  private: boolean;
  hidden: boolean;
}

export interface ProductSearchObj {
  page: number;
  limit: number;
  search: string;
  order: string;
  product_collection?: string[];
  price: number[];
}

export interface ServiceSearchObj {
  page: number;
  limit: number;
  service_collection: string[];
  service_area: string[];
  order: string;
}

export interface ReviewSearchObj {
  page: number;
  limit: number;
  review_ref_id: string;
}

export interface MemberLiken {
  like_group: string;
  like_status: number;
  like_ref_id: string;
}

export interface CreateReviewObj {
  review_ref_id: string;
  group_type: string;
  content: string;
  product_rating?: number;
}

export interface CartItem {
  _id: string;
  quantity: number;
  name: string;
  price: number;
  discount: number;
  delivery_fee: number;
  image: string;
}

export interface ChatMessage {
  msg: string;
  mb_id: string;
  mb_nick: string;
  mb_image: string;
}

export interface ChatGreetMsg {
  text: string;
}

export interface ChatInfoMsg {
  total: number;
}
