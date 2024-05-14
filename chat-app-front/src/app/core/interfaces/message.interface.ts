export interface Message {
  messageId: number;
  conversationId: number;
  senderRole: 'user' | 'support';
  messageText: string;
  date: Date;
}
