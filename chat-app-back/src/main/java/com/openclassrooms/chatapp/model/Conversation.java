package com.openclassrooms.chatapp.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "conversations")
public class Conversation {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "conversation_id")
	private Long conversationId;

	@Column(name = "user_seen", nullable = false)
	private Boolean userSeen = false;

	@Column(name = "support_seen", nullable = false)
	private Boolean supportSeen = false;

	@Column(name = "title")
	private String title;

	public Long getConversationId() {
		return conversationId;
	}

	public void setConversationId(Long conversationId) {
		this.conversationId = conversationId;
	}

	public Boolean getUserSeen() {
		return userSeen;
	}

	public void setUserSeen(Boolean userSeen) {
		this.userSeen = userSeen;
	}

	public Boolean getSupportSeen() {
		return supportSeen;
	}

	public void setSupportSeen(Boolean supportSeen) {
		this.supportSeen = supportSeen;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

}
