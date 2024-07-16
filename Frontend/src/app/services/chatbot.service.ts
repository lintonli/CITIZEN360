import { Injectable } from '@angular/core';
import { IChat } from '../Models/chatbot';

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  private chatbotMessages: IChat[] = [
    {
      ID: '1',
      userId: 'bot',
      message: 'Hello! How can I help you today?',
      timestamp: new Date(),
    },
  ];
  constructor() {}
  getMessage(){
    return this.chatbotMessages;
  }
  sendMessage(newMessage:IChat){
return this.chatbotMessages.push(newMessage)
  }
}
