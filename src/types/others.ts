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

export interface MemberLiken {
  like_group: string;
  like_status: number;
  like_ref_id: string;
}
