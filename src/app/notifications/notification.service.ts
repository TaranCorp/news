import { Injectable } from '@angular/core';
import { Observable, scan, Subject } from 'rxjs';

enum MessageType {
  INFO,
  ERROR,
  CLEAR
}

interface Message {
  id: number,
  content: string,
  type: MessageType
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private messagesInput: Subject<Message>;   
  private messages$: Observable<Array<Message>>;

  constructor() {
    this.messagesInput = new Subject<Message>(); 
    this.messages$ = this.messagesInput.pipe( 
      scan((total: Array<Message>, message: Message) => {
        if (message.type === MessageType.CLEAR) {
          return total.filter(existingMessage => existingMessage.id != message.id);
        }
        return [...total, message];
      }, [])
    );
  }

  getMessages() {
    return this.messages$;
  }

  addInfo(message: string) {
    this.addMessage(message, MessageType.INFO);
  }

  addError(message: string) {
    this.addMessage(message, MessageType.ERROR);
  }

  removeMessage(message: string) {
    this.addMessage(message, MessageType.CLEAR);
  }

  private addMessage(message: string, type: MessageType) {
    this.messagesInput.next({
      id: this.getRandomNumber(),
      content: message,
      type
    })
  }

  private getRandomNumber(): number {
    return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
  }

  clearMessage(id: number) {
    throw new Error('NIY')
  }
}
