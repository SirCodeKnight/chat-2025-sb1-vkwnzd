export interface User {
  id: string;
  username: string;
  avatar: string;
  bio: string;
}

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  user: User;
}

export interface WebSocketMessage {
  type: string;
  text: string;
  user: User;
}

export interface OnlineUser {
  id: string;
  username: string;
  avatar: string;
}