export interface User {
  name: string;
  email: string;
  password: string;
  links: ILinkItem[];
}


export interface AuthResponse {
  user: User;
  jwtToken: string;
}

export interface ILinkItem {
  _id: string;
  type: string;
  url: string;
}

export interface IUser {
  message: string;
  success: boolean;
  user: User;
}