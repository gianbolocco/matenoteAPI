const chatRepository = require('../repositories/ChatRepository');
const axios = require('axios');
const noteService = require('./noteService');

class ChatService {
    async chatWithNote(message, noteId, userId) {

        const lastQuestionsQuantity = 5;

        const noteContent = await noteService.getNoteContentById(noteId);

        const userLastQuestions = await chatRepository.findUserLastQuestions(noteId, userId, lastQuestionsQuantity);
        const lastAnswer = await chatRepository.findLastAnswer(noteId, userId);

        const response = await axios.post(process.env.CHAT_WITH_NOTE_WEBHOOK_URL, {
            noteContent: noteContent,
            message: message,
            userLastQuestions: userLastQuestions,
            lastAnswer: lastAnswer
        });

        const responseData = response.data;

        let assistantMessage = "No response";
        if (Array.isArray(responseData) && responseData.length > 0 && responseData[0].output) {
            assistantMessage = responseData[0].output;
        } else if (responseData && responseData.output) {
            assistantMessage = responseData.output;
        }

        return await chatRepository.createOrUpdate(noteId, userId, message, assistantMessage);
    }

    async getChatHistory(noteId, userId) {
        return await chatRepository.getChatHistory(noteId, userId);
    }

}

module.exports = new ChatService();