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
  order: string;
  product_collection?: string[];
  price: number[];
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
