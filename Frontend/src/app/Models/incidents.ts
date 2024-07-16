export interface Incident{
    ID:string
    location:string;
    media:string;
    body:string
    date:string
}
export interface AddIncident {
  ID: string;
  location: string;
  media: string;
  body: string;
  date: string;
  userID: string;
}