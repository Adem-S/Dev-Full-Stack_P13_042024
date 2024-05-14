-- Création de la table conversations
CREATE TABLE conversations (
    conversation_id INT AUTO_INCREMENT PRIMARY KEY,
    user_seen BOOLEAN NOT NULL DEFAULT FALSE,
    support_seen BOOLEAN NOT NULL DEFAULT FALSE,
    title VARCHAR(255) NOT NULL
);

-- Création de la table messages
CREATE TABLE messages (
    message_id INT AUTO_INCREMENT PRIMARY KEY,
    conversation_id INT NOT NULL,
    sender_role VARCHAR(10) NOT NULL, -- 'support' ou 'user'
    message_text TEXT NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (conversation_id) REFERENCES conversations(conversation_id) ON DELETE CASCADE
);
