import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IncidentsComponent } from './incidents/incidents.component';
import { AddIncidentsComponent } from './add-incidents/add-incidents.component';
import { PollsComponent } from './polls/polls.component';
import { ViewsComponent } from './views/views.component';
import { AdminComponent } from './admin/admin.component';
import { AddViewComponent } from './add-view/add-view.component';
import { ChatbotComponent } from './chatbot/chatbot.component';

export const routes: Routes = [
    {path:'', component:WelcomeComponent},
    {path:'incidents', component:IncidentsComponent},
    {path:'dashboard', component:DashboardComponent},
    {path:'login', component:LoginComponent},
    {path:'register', component:SignUpComponent},
    {path:'addincident', component:AddIncidentsComponent},
    {path:'polls', component:PollsComponent},
    {path:'views', component:ViewsComponent},
    {path:'users', component:AdminComponent},
    {
        path:"addview", component:AddViewComponent
    },{
        path:'chat', component:ChatbotComponent
    }
];
