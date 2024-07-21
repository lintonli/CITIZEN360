export interface IUser {
  ID: string;
  UNAME: string;
  EMAIL: string;
  UPASSWORD: string;
  Rolename: string;
  USTATUS: string;
  isEmailSent: number;
  isPasswordResetEmailSent: number;
  resetToken: string;
  resetTokenExpires: string;
  isDeleted: number;
}
export interface Payload {
  SUB: string;
  UNAME: string;
  Rolename: string;
}