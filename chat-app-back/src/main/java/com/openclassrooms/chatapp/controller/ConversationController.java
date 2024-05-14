package com.openclassrooms.chatapp.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.chatapp.dto.CreateConversationRequest;
import com.openclassrooms.chatapp.model.Conversation;
import com.openclassrooms.chatapp.service.ConversationService;

@RestController
@RequestMapping("/api/conversations")
public class ConversationController {

	@Autowired
	private ConversationService conversationService;

	@GetMapping
	public ResponseEntity<List<Conversation>> getAllConversations() {
		return ResponseEntity.ok(conversationService.getAllConversations());
	}

	@PostMapping
	public ResponseEntity<Conversation> createConversation(@RequestBody CreateConversationRequest request) {
		Conversation newConversation = conversationService.createConversation(request);
		return ResponseEntity.ok(newConversation);
	}

	@DeleteMapping("/{conversationId}")
	public ResponseEntity<String> deleteConversation(@PathVariable Long conversationId) {
		boolean deleted = conversationService.deleteConversation(conversationId);
		if (deleted) {
			return ResponseEntity.ok("Conversation and all associated messages have been successfully deleted.");
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No conversation found with ID: " + conversationId);
		}
	}

	@GetMapping("/{conversationId}")
	public ResponseEntity<Optional<Conversation>> getConversation(@PathVariable Long conversationId) {
		Optional<Conversation> conversation = conversationService.getConversation(conversationId);
		if (conversation.isPresent()) {
			return ResponseEntity.ok(conversation);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(conversation);
		}
	}

}
