package com.openclassrooms.chatapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.openclassrooms.chatapp.dto.CreateMessageRequest;
import com.openclassrooms.chatapp.model.Conversation;
import com.openclassrooms.chatapp.model.Message;
import com.openclassrooms.chatapp.service.ConversationService;
import com.openclassrooms.chatapp.service.MessageService;

@Controller
public class ChatController {

	@Autowired
	private ConversationService conversationService;

	@Autowired
	private MessageService messageService;

	@MessageMapping("/chat/send/{conversationId}")
	@SendTo("/topic/messages/{conversationId}")
	public Message sendMessage(@DestinationVariable Long conversationId, @Payload CreateMessageRequest request) {
		request.setConversationId(conversationId);
		Message savedMessage = messageService.createMessage(request);
		return savedMessage;
	}

	@MessageMapping("/chat/seen/{conversationId}")
	@SendTo("/topic/conversation/seen/{conversationId}")
	public Conversation handleReadReceipt(@DestinationVariable Long conversationId, String senderRole) {
		Conversation savedConv = conversationService.markConversationAsSeen(conversationId, senderRole);
		return savedConv;
	}

	@MessageMapping("/chat/delete/{conversationId}")
	@SendTo("/topic/conversation/delete/{conversationId}")
	public boolean handleDelete(@DestinationVariable Long conversationId) {
		return conversationService.deleteConversation(conversationId);
	}

}
