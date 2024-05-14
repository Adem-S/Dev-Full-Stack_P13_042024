import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../interfaces/message.interface';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private pathService: string = '/api/messages';

  constructor(private http: HttpClient) {}

  public getMessagesByConversationId(
    conversationId: number
  ): Observable<Message[]> {
    return this.http.get<Message[]>(
      `${this.pathService}/conversation/${conversationId}`
    );
  }
}
