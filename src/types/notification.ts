import { Member } from "./user";

export interface Notification {
  _id: string;
  notif_subject: string;
  notif_content: string;
  notif_status: string;
  notif_sender_id: string;
  notif_receiver_id: string;
  sender_data: Member;
  createdAt: Date;
  updatedAt: Date;
}
