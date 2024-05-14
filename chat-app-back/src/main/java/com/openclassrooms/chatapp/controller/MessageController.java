package com.openclassrooms.chatapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.chatapp.dto.CreateMessageRequest;
import com.openclassrooms.chatapp.model.Message;
import com.openclassrooms.chatapp.service.MessageService;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

	@Autowired
	private MessageService messageService;

	@PostMapping
	public ResponseEntity<Message> createMessage(@RequestBody CreateMessageRequest request) {
		Message message = messageService.createMessage(request);
		return ResponseEntity.ok(message);
	}

	@GetMapping("/conversation/{conversationId}")
	public ResponseEntity<List<Message>> getMessagesByConversationId(@PathVariable Long conversationId) {
		return ResponseEntity.ok(messageService.getMessagesByConversationId(conversationId));
	}
}
