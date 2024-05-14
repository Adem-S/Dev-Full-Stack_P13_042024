package com.openclassrooms.chatapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.openclassrooms.chatapp.model.Message;
import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
	List<Message> findByConversationId(Long conversationId);
}
