export interface MessageRequest {
  conversationId: number;
  senderRole: 'user' | 'support';
  messageText: string;
}
