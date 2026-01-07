const Folder = require('../models/Folder');

class FolderRepository {
    async create(folderData) {
        const folder = new Folder(folderData);
        return await folder.save();
    }

    async findByUserId(userId) {
        return await Folder.find({ userId: userId }).sort({ createDate: -1 });
    }

    async findById(id) {
        return await Folder.findById(id).populate('notes');
    }

    async deleteById(id) {
        return await Folder.findByIdAndDelete(id);
    }

    async updateById(id, data) {
        return await Folder.findByIdAndUpdate(id, data);
    }

    async deleteNoteFromFolders(noteId) {
        return await Folder.updateMany({ notes: noteId }, { $pull: { notes: noteId } });
    }

    async addNoteToFolder(folderId, notesIds) {
        return await Folder.findByIdAndUpdate(folderId, { $addToSet: { notes: { $each: notesIds } } });
    }

    async removeNoteFromFolder(folderId, noteId) {
        return await Folder.findByIdAndUpdate(folderId, { $pull: { notes: noteId } });
    }
}

module.exports = new FolderRepository();
