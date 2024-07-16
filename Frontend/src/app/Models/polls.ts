export interface PollOptions{
    name:string;
    votes:number;
}
export interface Poll {
  ID: string;
  title: string;
  options: PollOptions[];
  voters: string[];
}