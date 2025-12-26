class Note {
    constructor(title, summary, sections, source, sourceType, userId) {
        this.id = null; // Set by repository
        this.title = title;
        this.summary = summary;
        this.sections = sections;
        this.createDate = new Date();
        this.source = source;
        this.sourceType = sourceType;
        this.userId = userId;
    }
}

module.exports = Note;
