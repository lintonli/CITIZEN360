import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RouterModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  constructor(){}

}
