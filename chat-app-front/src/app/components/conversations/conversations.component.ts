import { Component, OnInit } from '@angular/core';
import { ConversationService } from '../../core/services/conversation.service';
import { UserService } from '../../core/services/user.service';
import { Conversation } from 'src/app/core/interfaces/conversation.interface';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.css'],
})
export class ConversationsComponent implements OnInit {
  conversationTitle = '';
  conversations: Conversation[] = [];
  userRole: 'user' | 'support' | null = null;

  constructor(
    private router: Router,
    private conversationService: ConversationService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loadConversations();
    this.userService
      .getUserRole()
      .pipe(take(1))
      .subscribe((role) => {
        this.userRole = role;
      });
  }

  loadConversations() {
    this.conversationService
      .getAllConversations()
      .pipe(take(1))
      .subscribe((conversations) => {
        this.conversations = conversations;
      });
  }

  createConversation() {
    if (this.conversationTitle) {
      this.conversationService
        .createConversation({ title: this.conversationTitle })
        .pipe(take(1))
        .subscribe({
          next: (response: Conversation) => {
            if (response) {
              this.conversations.push(response);
              this.conversationTitle = '';
              this.router.navigate(['/chat', response.conversationId]);
            }
          },
          error: (err) => console.error('Failed to create conversation:', err),
        });
    }
  }

  joinConversation(conversationId: number) {
    this.router.navigate(['/chat', conversationId]);
  }
}
