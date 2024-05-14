package com.openclassrooms.chatapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.openclassrooms.chatapp.model.Conversation;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation, Long> {
}