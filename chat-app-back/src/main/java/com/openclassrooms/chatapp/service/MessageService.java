package com.openclassrooms.chatapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.openclassrooms.chatapp.dto.CreateMessageRequest;
import com.openclassrooms.chatapp.model.Message;
import com.openclassrooms.chatapp.repository.MessageRepository;

@Service
public class MessageService {

	@Autowired
	private MessageRepository messageRepository;

	@Autowired
	private ConversationService conversationService;

	public Message createMessage(CreateMessageRequest request) {
		Message message = new Message();
		message.setConversationId(request.getConversationId());
		message.setSenderRole(request.getSenderRole());
		message.setMessageText(request.getMessageText());
		message.setDate(new java.sql.Timestamp(System.currentTimeMillis()));

		Message savedMessage = messageRepository.save(message);
		conversationService.updateSeenStatus(request.getConversationId(), request.getSenderRole());

		return savedMessage;

	}

	public List<Message> getMessagesByConversationId(Long conversationId) {
		return messageRepository.findByConversationId(conversationId);
	}
}
