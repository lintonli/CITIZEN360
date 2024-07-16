export interface IUser{
    ID:string;
    UNAME:string;
    EMAIL:string;
    UPASSWORD:string;
    Rolename:string;
    USTATUS:string;
    isEmailSent:number;
    isDeleted:number;
}
export interface Payload {
  SUB: string;
  UNAME: string;
  UROLE: string;
}