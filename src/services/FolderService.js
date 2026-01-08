const folderRepository = require('../repositories/folderRepository');
const { NotFoundError } = require('../utils/customErrors');

class FolderService {

    async createFolder(userId, data) {
        return await folderRepository.create({ ...data, userId });
    }

    async getFoldersByUserId(userId) {
        return await folderRepository.findByUserId(userId);
    }

    async getFolderById(id) {
        const folder = await folderRepository.findById(id);
        if (!folder) {
            throw new NotFoundError('Folder not found');
        }
        return folder;
    }

    async deleteFolder(id) {
        const deleted = await folderRepository.deleteById(id);
        if (!deleted) {
            throw new NotFoundError('Folder not found');
        }
        return { message: 'Folder deleted successfully' };
    }

    async updateFolder(id, data) {
        const updated = await folderRepository.updateById(id, data);
        if (!updated) {
            throw new NotFoundError('Folder not found');
        }
        return updated;
    }

    async deleteNoteFromFolders(noteId) {
        return await folderRepository.deleteNoteFromFolders(noteId);
    }

    async addNoteToFolder(folderId, notesIds) {
        const folder = await this.getFolderById(folderId);
        if (!folder) {
            throw new NotFoundError('Folder not found');
        }
        const updated = await folderRepository.addNoteToFolder(folderId, notesIds);
        return updated;
    }

    async removeNoteFromFolder(folderId, noteId) {
        const folder = await this.getFolderById(folderId);
        if (!folder) {
            throw new NotFoundError('Folder not found');
        }
        const updated = await folderRepository.removeNoteFromFolder(folderId, noteId);
        return updated;
    }
}

module.exports = new FolderService();
