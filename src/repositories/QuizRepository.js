const Quiz = require('../models/Quiz');

class QuizRepository {
    async create(quizData) {
        const quiz = new Quiz(quizData);
        return await quiz.save();
    }

    async findByNoteId(noteId) {
        return await Quiz.find({ noteId: noteId });
    }

    async findById(id) {
        return await Quiz.findById(id);
    }

    async deleteById(id) {
        return await Quiz.findByIdAndDelete(id);
    }
}

module.exports = new QuizRepository();
