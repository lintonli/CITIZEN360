import { Injectable } from '@angular/core';
import { Incident } from '../Models/incidents';

@Injectable({
  providedIn: 'root',
})
export class IncidentsService {
  private incidents: Incident[] = [
    {
      ID: '1',
      location: 'Nyeri',
      media:
        'https://imgs.search.brave.com/hup5-OjZCGtmmk94d9UoNgvIWGvuctTqiWRFhMZff6g/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTI0/MzQwODQwNi9waG90/by90b3BzaG90LWEt/cGljdHVyZS1vYnRh/aW5lZC1ieS1hZnAt/b3V0c2lkZS1pcmFu/LW9uLXNlcHRlbWJl/ci0yMS1zaG93cy1p/cmFuaWFuLWRlbW9u/c3RyYXRvcnMuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPUVI/V2RyTy16VHF6bHlI/aTF1QktBd3lyQWpf/UTVXQjU3NVIyXy1u/aUM3M2M9',
      date: '23-09-2-24',
      body: 'Protesters riot in regards to high cost of living',
    },
    {
      ID: '2',
      location: 'Nairobi',
      media:
        'https://imgs.search.brave.com/hup5-OjZCGtmmk94d9UoNgvIWGvuctTqiWRFhMZff6g/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTI0/MzQwODQwNi9waG90/by90b3BzaG90LWEt/cGljdHVyZS1vYnRh/aW5lZC1ieS1hZnAt/b3V0c2lkZS1pcmFu/LW9uLXNlcHRlbWJl/ci0yMS1zaG93cy1p/cmFuaWFuLWRlbW9u/c3RyYXRvcnMuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPUVI/V2RyTy16VHF6bHlI/aTF1QktBd3lyQWpf/UTVXQjU3NVIyXy1u/aUM3M2M9',
      date: '23-09-2-24',
      body: 'Protesters riot in regards to police brutalitty',
    },
  ];
  constructor() {}
  getIncidents(){
    return this.incidents
  }
  getIncidentbyId(id:string){
    const incident = this.incidents.find(x=>x.ID===id)
    return incident;
  }
  addIncident(newIncident:Incident){
    this.incidents.push(newIncident);
  }
  deleteIncident(id:string){
    const deleted= this.incidents.filter(x=>x.ID !==id)
    return deleted;
  }
}
