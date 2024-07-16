import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Views } from '../Models/views';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ViewsService } from '../services/views.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-add-view',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './add-view.component.html',
  styleUrl: './add-view.component.css',
})
export class AddViewComponent implements OnInit {
  views: Views[] = [];
  addview!: FormGroup;
  role: string = '';
  @Output() closeModal = new EventEmitter<void>();
  constructor(
    private viewService: ViewsService,
    private route: Router,
    private fb: FormBuilder,
    private auth: AuthenticationService
  ) {}
  ngOnInit(): void {
    const currentUser = this.auth.getCurrentUser();
    if (currentUser) {
      this.role = currentUser.ROLE;
    }
    this.addview = this.fb.group({
      body: ['', Validators.required],
    });
  }
  onSubmit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    const username = currentUser.EMAIL;
    if (this.addview.valid) {
      const data: Views = {
        ...this.addview.value,
        userName: username,
        
      };
      this.viewService.addView(data);
      this.route.navigate(['/views']);
       this.closeModal.emit();
    }
  }
}
