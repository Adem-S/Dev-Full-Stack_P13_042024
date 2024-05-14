import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../../core/services/message.service';
import { ConversationService } from '../../core/services/conversation.service';
import { UserService } from '../../core/services/user.service';
import { Message } from 'src/app/core/interfaces/message.interface';
import { Conversation } from 'src/app/core/interfaces/conversation.interface';
import { take } from 'rxjs/operators';
import { WebSocketService } from '../../core/services/websocket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnDestroy {
  conversationId!: number;
  conversation: Conversation | null = null;
  messages: Message[] = [];
  newMessage: string = '';
  userRole: 'user' | 'support' | null = null;
  messageSubscription!: Subscription;
  conversationSubscription!: Subscription;
  deleteConversationSubscription!: Subscription;

  @ViewChild('scrollChat') private myScrollContainer!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private conversationService: ConversationService,
    private userService: UserService,
    private webSocketService: WebSocketService
  ) {}

  ngOnInit(): void {
    this.userService
      .getUserRole()
      .pipe(take(1))
      .subscribe((role) => {
        this.userRole = role;
      });
    this.route.params.pipe(take(1)).subscribe((params) => {
      this.conversationId = parseInt(params['id']);
      this.loadConversationAndInitWebSocket();
      this.loadMessages();
    });
  }

  ngOnDestroy() {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
    if (this.conversationSubscription) {
      this.conversationSubscription.unsubscribe();
    }
    if (this.deleteConversationSubscription) {
      this.deleteConversationSubscription.unsubscribe();
    }
    this.webSocketService.disconnect();
  }

  scrollToBottom(): void {
    this.myScrollContainer.nativeElement.scrollTop =
      this.myScrollContainer.nativeElement.scrollHeight;
  }

  goBack(): void {
    this.router.navigate(['/conversations']);
  }

  initWebSocket(conversation: Conversation | null): void {
    if (conversation && this.userRole) {
      this.webSocketService.initializeWebSocketConnection(
        conversation.conversationId,
        this.userRole
      );

      this.messageSubscription = this.webSocketService
        .subscribeToTopicMessages()
        .subscribe({
          next: (newMessage: Message) => {
            this.messages.push(newMessage);
            setTimeout(() => this.scrollToBottom(), 0);
            if (this.conversation && this.userRole === newMessage.senderRole) {
              this.conversation.supportSeen = this.userRole === 'support';
              this.conversation.userSeen = this.userRole === 'user';
            } else {
              this.markMessageAsSeen();
            }
          },
          error: (error) => {
            console.error('Erreur lors de la réception des messages:', error);
          },
        });

      this.conversationSubscription = this.webSocketService
        .subscribeToTopicConversation()
        .subscribe({
          next: (newConversation: Conversation) => {
            if (newConversation) this.conversation = newConversation;
          },
          error: (error) => {
            console.error('Erreur lors de la réception de la conv:', error);
          },
        });

      this.deleteConversationSubscription = this.webSocketService
        .subscribeToTopicDeleteConversation()
        .subscribe({
          next: (conversationDeleted: boolean) => {
            if (conversationDeleted) {
              this.conversation = null;
              this.goBack();
            }
          },
          error: (error) => {
            console.error('Erreur lors de la suppression de la conv:', error);
          },
        });
    }
  }

  loadConversationAndInitWebSocket(): void {
    this.conversationService
      .getConversationById(this.conversationId)
      .pipe(take(1))
      .subscribe((conversation) => {
        this.conversation = conversation;
        if (conversation) {
          this.initWebSocket(conversation);
        }
      });
  }

  deleteConversation(): void {
    if (this.conversation && this.userRole) {
      this.webSocketService.deleteConversation(
        `/app/chat/delete/${this.conversation.conversationId}`
      );
    }
  }

  loadMessages(): void {
    this.messageService
      .getMessagesByConversationId(this.conversationId)
      .pipe(take(1))
      .subscribe((messages) => {
        this.messages = messages;
        setTimeout(() => this.scrollToBottom(), 10);
      });
  }

  isLastMessageMine(): boolean {
    if (this.messages.length > 0) {
      const lastMessage = this.messages[this.messages.length - 1];
      return lastMessage.senderRole === this.userRole;
    }
    return false;
  }

  markMessageAsSeen(): void {
    if (this.conversation && this.userRole) {
      this.webSocketService.markMessageAsSeen(
        `/app/chat/seen/${this.conversation.conversationId}`,
        this.userRole
      );
    }
  }

  sendMessage(): void {
    if (this.newMessage.trim() !== '' && this.userRole && this.conversation) {
      this.webSocketService.sendMessage(
        `/app/chat/send/${this.conversation.conversationId}`,
        {
          conversationId: this.conversationId,
          senderRole: this.userRole,
          messageText: this.newMessage,
        }
      );
      this.newMessage = '';
    }
  }
}
