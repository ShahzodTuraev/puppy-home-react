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
  min_price: number;
  max_price: number;
}
