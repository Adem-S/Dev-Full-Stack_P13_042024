import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Conversation } from '../interfaces/conversation.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  private pathService: string = '/api/conversations';

  constructor(private http: HttpClient) {}

  public getAllConversations(): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(this.pathService);
  }

  public getConversationById(
    conversationId: number
  ): Observable<Conversation | null> {
    return this.http.get<Conversation | null>(
      `${this.pathService}/${conversationId}`
    );
  }

  public createConversation(conversationData: {
    title: string;
  }): Observable<Conversation> {
    return this.http.post<Conversation>(this.pathService, conversationData);
  }
}
