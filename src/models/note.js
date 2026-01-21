const mongoose = require('mongoose');

/* =========================
   SECTION BASE
========================= */

const sectionSchema = new mongoose.Schema(
  {
    subtitle: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true,
      enum: ['TEXT', 'LIST', 'TABLE', 'CODE']
    }
  },
  {
    discriminatorKey: 'type',
    _id: false
  }
);

/* =========================
   TEXT
========================= */

const textSectionSchema = new mongoose.Schema(
  {
    content: {
      text: {
        type: String,
        required: true
      },
      highlights: {
        type: [String],
        default: []
      }
    }
  },
  { _id: false }
);

/* =========================
   LIST
========================= */

const listSectionSchema = new mongoose.Schema(
  {
    content: {
      style: {
        type: String,
        enum: ['default', 'mantra'],
        default: 'default'
      },
      items: {
        type: [String],
        required: true
      }
    }
  },
  { _id: false }
);

/* =========================
   TABLE
========================= */

const tableSectionSchema = new mongoose.Schema(
  {
    content: {
      title: {
        type: String,
        required: true
      },
      columns: {
        type: [String],
        required: true
      },
      rows: {
        type: [
          {
            type: Map,
            of: String
          }
        ],
        required: true
      }
    }
  },
  { _id: false }
);

/* =========================
   CODE
========================= */

const codeSectionSchema = new mongoose.Schema(
  {
    content: {
      language: {
        type: String,
        required: true
      },
      code: {
        type: String,
        required: true
      },
      explanation: {
        type: String,
        required: true
      }
    }
  },
  { _id: false }
);

/* =========================
   UNIT
========================= */

const unitSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    sections: [sectionSchema]
  },
  { _id: false }
);

/* =========================
   DISCRIMINATORS
========================= */

unitSchema.path('sections').discriminator('TEXT', textSectionSchema);
unitSchema.path('sections').discriminator('LIST', listSectionSchema);
unitSchema.path('sections').discriminator('TABLE', tableSectionSchema);
unitSchema.path('sections').discriminator('CODE', codeSectionSchema);

/* =========================
   NOTE
========================= */

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  summary: {
    type: String
  },
  source: {
    type: String,
    required: true
  },
  sourceType: {
    type: String,
    required: true,
    enum: ['pdf', 'youtube', 'audio']
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createDate: {
    type: Date,
    default: Date.now
  },
  units: {
    type: [unitSchema],
    default: []
  },
  mindmap: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  },
  flashcardsId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Flashcard',
    default: null
  },
  quizzId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quizz',
    default: null
  }
});

/* =========================
   TO JSON
========================= */

noteSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Note', noteSchema);
