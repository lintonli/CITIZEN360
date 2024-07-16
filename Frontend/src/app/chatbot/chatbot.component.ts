import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IChat } from '../Models/chatbot';
import { ChatbotService } from '../services/chatbot.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../services/authentication.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css',
})
export class ChatbotComponent implements OnInit {
  messages: IChat[] = [];
  newMessage: string = '';
  role: string = '';
  menuVisible: boolean = false;
  constructor(
    private chatService: ChatbotService,
    private auth: AuthenticationService,
    private route: Router
  ) {}
  ngOnInit(): void {
    const currentUser = this.auth.getCurrentUser();
    if (currentUser) {
      this.role = currentUser.ROLE;
    } else {
      this.route.navigate(['/login']); // Redirect to login if no user is found
    }
  }
  sendMessage(): void {
    // if (this.newMessage.trim()) {
    //   this.chatService.sendMessage(this.newMessage).subscribe((message) => {
    //     this.messages.push(message);
    //   });
    //   this.newMessage = '';
    // }
  }
  onOptionChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedOption = selectElement.value;
    this.sendMessageWithOption(selectedOption);
  }

  sendMessageWithOption(option: string): void {
    //   const optionMessage = `You selected: ${option}`;
    //   this.chatService.sendMessage(optionMessage).subscribe((message) => {
    //     this.messages.push(message);
    //   });
    // }
  }
  logout() {
    this.auth.logout();
    this.route.navigate(['/login']);
  }
  toggleMenu(): void {
    this.menuVisible = !this.menuVisible;
    const menuElement = document.querySelector('.menu');
    if (menuElement) {
      menuElement.classList.toggle('show', this.menuVisible);
    }
  }
}
