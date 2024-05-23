export interface SignIn {
    username: string;
    password: string;
    email?: string;
    phone?: string;
    pushdeer?: string;
}
export interface UserInfo {
    id?: string;
    username?: string;
    email?: string;
    phone?: string;
    token?: string;
}
export const defaultUserInfo: UserInfo = {
    id: "",
    username: "",
    email: "",
    phone: "",
    token: "",
}