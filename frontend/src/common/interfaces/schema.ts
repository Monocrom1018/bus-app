export type ID = string | number | undefined;
export type S3Level = 'public' | 'protected' | 'private';

export interface Address {
  zipcode: string;
  address1: string;
  address2?: string;
}

export interface Model<T = number> {
  id?: T;
  model_name: string;
  created_at: string;
  updated_at: string;
}

export interface S3FileBase {
  level: S3Level;
  key: string;
}

export interface Image extends Model {
  imagable_type: string;
  imagable_id: number;
  image_type: 'normal' | 'main';
  id?: number;
}

export interface File extends Model {
  target_type: string;
  target_id: number;
  file_type: 'normal' | 'main';
  id?: number;
  key?: string;
}

export type S3Image = S3FileBase & Image;

export type S3File = S3FileBase & File;

export interface FileData {
  fileName?: string;
  key?: string;
  previewSrc?: string;
  isUploaded?: boolean;
  id?: number;
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

export type ImageType = 'normal' | 'main';

export interface S3ImageBase {
  level: S3Level;
  key: string;
  image_type: ImageType;
}

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

export interface S3OldImage extends S3Image {
  destroy: boolean;
}
