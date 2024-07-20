export interface pollOptions{
    PNAME:string;
    VOTES: number;
}
export interface Poll{
    ID:string;
    TITLE:string;
    USERID:string;
    OPTIONS:pollOptions[]
}