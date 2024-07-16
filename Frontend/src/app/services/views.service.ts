import { Injectable } from '@angular/core';
import { Views } from '../Models/views';

@Injectable({
  providedIn: 'root',
})
export class ViewsService {
  private views: Views[] = [
    {
      ID: '1',
      body: 'We need the president to speak to the youth and the Genz at our convinient time',
      userName: 'John chinga',
      date: '2024-07-09',
      // userId: '2',
    },
    {
      ID: '2',
      body: 'We need the president to speak to the youth and the Genz at our convinient time',
      userName: 'Elvis Topisia',
      date: '2024-07-09',
      // userId: '2',
    },
    {
      ID: '3',
      body: 'We need the president to speak to the youth and the Genz at our convinient time',
      userName: 'Ian Kibwa',
      date: '2024-07-09',
      // userId: '2',
    },
  ];
  constructor() {}
  getViews() {
    return this.views;
  }
  getView(ID: string) {
    const view = this.views.find((x) => x.ID === ID);
    return view;
  }
  addView(newView: Views) {
    return this.views.push(newView);
  }
}
