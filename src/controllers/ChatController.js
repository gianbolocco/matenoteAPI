const chatService = require('../services/chatService');

const getChatHistory = async (req, res, next) => {
    try {
        const chatHistory = await chatService.getChatHistory(req.params.id, req.query.userId);
        res.status(200).json({
            status: 'success',
            data: { chatHistory }
        });
    } catch (error) {
        next(error);
    }
}

const chatWithNote = async (req, res, next) => {
    try {
        const response = await chatService.chatWithNote(req.body.message, req.params.id, req.body.userId);
        res.status(200).json({
            status: 'success',
            data: { response }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getChatHistory,
    chatWithNote
};
