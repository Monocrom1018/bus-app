export type ID = string | number | undefined;
export type S3Level = 'public' | 'protected' | 'private';

export interface Address {
  zipcode: string;
  address1: string;
  address2?: string;
}

export interface Model<T = number> {
  id: T;
  model_name: string;
  created_at: string;
  update_at: string;
}

export interface User extends Model, Address {
  email: string;
  name: string;
  phone: string;
  image?: S3Image;
  status?: string;
  description?: string;
  uuid?: string;
}

export interface S3ImageBase {
  level: S3Level;
  key: string;
}

export interface Image extends Model {
  imagable_type: string;
  imagable_id: number;
  image_type: 'normal' | 'main';
}
export type S3Image = S3ImageBase & Image;

export interface Chatroom extends Model<string> {
  name: string;
  users: User[];
  avatar?: string;
  room_type: 'single' | 'multi';
}

export interface UserChatroom extends Model {
  user_id: number;
  chatroom_id: string;
  chatroom: Chatroom;
}

export interface MessageType {
  id?: ID;
  user_id: ID;
  room_id: string;
  text: string;
  image?: string;
  view?: number;
  owner?: string;
  createdAt?: string;
  isLast?: boolean;
}

