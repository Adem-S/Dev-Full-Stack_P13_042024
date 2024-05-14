package com.openclassrooms.chatapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.openclassrooms.chatapp.dto.CreateConversationRequest;
import com.openclassrooms.chatapp.model.Conversation;
import com.openclassrooms.chatapp.repository.ConversationRepository;

@Service
public class ConversationService {

	@Autowired
	private ConversationRepository conversationRepository;

	public Conversation createConversation(CreateConversationRequest request) {
		Conversation conversation = new Conversation();
		conversation.setTitle(request.getTitle());
		conversation.setUserSeen(false);
		conversation.setSupportSeen(false);
		return conversationRepository.save(conversation);
	}

	public boolean deleteConversation(Long conversationId) {
		Optional<Conversation> conversation = conversationRepository.findById(conversationId);
		if (conversation.isPresent()) {
			conversationRepository.deleteById(conversationId);
			return true;
		}
		return false;
	}

	public Optional<Conversation> getConversation(Long conversationId) {
		return this.conversationRepository.findById(conversationId);

	}

	public void updateSeenStatus(Long conversationId, String senderRole) {
		Conversation conversation = conversationRepository.findById(conversationId).orElse(null);
		if (conversation != null) {
			if ("user".equals(senderRole)) {
				conversation.setUserSeen(true);
				conversation.setSupportSeen(false);
			} else if ("support".equals(senderRole)) {
				conversation.setSupportSeen(true);
				conversation.setUserSeen(false);
			}
			conversationRepository.save(conversation);
		} else {
			throw new RuntimeException("Conversation not found with ID: " + conversationId);
		}
	}

	public Conversation markConversationAsSeen(Long conversationId, String senderRole) {
		Conversation conversation = conversationRepository.findById(conversationId).orElse(null);
		if (conversation != null) {
			senderRole = senderRole.replace("\"", "");
			if ("user".equals(senderRole)) {
				conversation.setUserSeen(true);
			} else if ("support".equals(senderRole)) {
				conversation.setSupportSeen(true);
			}
			return conversationRepository.save(conversation);
		} else {
			throw new RuntimeException("Conversation not found with ID: " + conversationId);
		}
	}

	public List<Conversation> getAllConversations() {
		return conversationRepository.findAll();
	}

}
