import { Injectable } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs';
import { Observable, Subject } from 'rxjs';

import * as SockJS from 'sockjs-client';
import { Message } from '../interfaces/message.interface';
import { MessageRequest } from '../interfaces/messageRequest.interface';
import { Conversation } from '../interfaces/conversation.interface';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private client!: Client;

  private topicMessages: Subject<Message> = new Subject<Message>();
  private topicConversation: Subject<Conversation> =
    new Subject<Conversation>();
  private topicDeleteConversation: Subject<boolean> = new Subject<boolean>();

  constructor() {}

  initializeWebSocketConnection(
    conversationId: number,
    userRole: 'user' | 'support'
  ) {
    const socket = new SockJS('http://localhost:3001/ws');
    this.client = new Client({
      webSocketFactory: () => socket,
    });

    this.client.onConnect = (frame: any) => {
      console.log('Connected: ' + frame);

      this.client.subscribe(
        `/topic/messages/${conversationId}`,
        (message: IMessage) => {
          this.topicMessages.next(JSON.parse(message.body));
        }
      );

      this.client.subscribe(
        `/topic/conversation/seen/${conversationId}`,
        (message: IMessage) => {
          this.topicConversation.next(JSON.parse(message.body));
        }
      );

      this.client.subscribe(
        `/topic/conversation/delete/${conversationId}`,
        (message: IMessage) => {
          this.topicDeleteConversation.next(JSON.parse(message.body));
        }
      );

      this.markMessageAsSeen(`/app/chat/seen/${conversationId}`, userRole);
    };

    this.client.onStompError = (frame: any) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };

    this.client.onWebSocketClose = (frame: any) => {
      console.log('Close WebSocket');
    };

    this.client.activate();
  }

  subscribeToTopicMessages(): Observable<Message> {
    return this.topicMessages.asObservable();
  }

  subscribeToTopicConversation(): Observable<Conversation> {
    return this.topicConversation.asObservable();
  }

  subscribeToTopicDeleteConversation(): Observable<boolean> {
    return this.topicDeleteConversation.asObservable();
  }

  sendMessage(destination: string, body: MessageRequest) {
    this.client.publish({ destination, body: JSON.stringify(body) });
  }

  markMessageAsSeen(destination: string, body: string) {
    this.client.publish({ destination, body: JSON.stringify(body) });
  }

  deleteConversation(destination: string) {
    this.client.publish({ destination });
  }

  disconnect() {
    if (this.client?.active) {
      this.client.deactivate();
    }
  }
}
