const Chat = require('../models/chat');

class ChatRepository {
    async findByNoteAndUserId(noteId, userId) {
        return await Chat.findOne({ noteId: noteId, userId: userId });
    }

    async createOrUpdate(noteId, userId, userMessage, assistantMessage) {
        let chat = await this.findByNoteAndUserId(noteId, userId);

        if (!chat) {
            chat = new Chat({
                noteId: noteId,
                userId: userId,
                messages: []
            });
        }

        chat.messages.push({
            role: 'user',
            content: userMessage,
        });

        chat.messages.push({
            role: 'assistant',
            content: assistantMessage,
        });

        return await chat.save();
    }

    async findUserLastQuestions(noteId, userId, quantity) {
        const chat = await this.findByNoteAndUserId(noteId, userId);
        if (!chat || !chat.messages) return [];

        return chat.messages
            .filter(m => m.role === 'user')
            .slice(-quantity)
            .map(m => m.content);
    }

    async findLastAnswer(noteId, userId) {
        const chat = await this.findByNoteAndUserId(noteId, userId);
        if (!chat || !chat.messages || chat.messages.length === 0) return '';

        const lastMessage = chat.messages[chat.messages.length - 1];
        return lastMessage.role === 'assistant' ? lastMessage.content : '';
    }

    async getChatHistory(noteId, userId) {
        const chat = await this.findByNoteAndUserId(noteId, userId);
        return chat ? chat.messages : [];
    }

    async deleteChatsByNoteId(noteId) {
        return await Chat.deleteMany({ noteId: noteId });
    }
}

module.exports = new ChatRepository();
