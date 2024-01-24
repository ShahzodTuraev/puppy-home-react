import { Product } from "./product";
import { Member } from "./user";

export interface order_items {
  _id: string;
  item_quantity: number;
  item_price: number;
  item_delivery_cost: number;
  order_id: string;
  product_id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  _id: string;
  order_total_amount: number;
  order_delivery_cost: number;
  order_status: string;
  mb_id: string;
  createdAt: Date;
  updatedAt: Date;
  order_items: any[];
  product_data: Product[];
}

export interface Like {
  _id: string;
  like_ref_id: string;
  like_group: string;
  mb_id: string;
  createdAt: Date;
  updatedAt: Date;
  product_data: Product[];
}

export interface Account {
  _id: string;
  account_number?: number;
  last_number: number;
  expire_date?: Date;
  secret_code: number;
  account_status: string;
  mb_id: string;
  createdAt: Date;
  updatedAt: Date;
  member_data: Member[];
}
