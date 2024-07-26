export interface SignIn {
  name: string;
  passwd: string;
  email?: string;
  phone?: string;
}
export interface UserInfo {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  role: string;
  token?: string;
  has_password: boolean;
}
export const defaultUserInfo: UserInfo = {
  id: "",
  name: "",
  email: "",
  role: "",
  phone: "",
  token: "",
  has_password: false,
};
export interface UpdateInfo {
  email?: string;
  passwd?: string;
  pushdeer?: string;
  username?: string;
}
