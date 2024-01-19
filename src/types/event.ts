export interface Event {
  _id: string;
  event_subject: string;
  event_content: string;
  event_time: Date;
  event_address: string;
  event_status: string;
  createdAt: Date;
  updatedAt: Date;
}
