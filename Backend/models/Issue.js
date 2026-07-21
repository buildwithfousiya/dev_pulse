const mongoose = require('mongoose');


const issueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: {
        values: ['Todo', 'In Progress', 'Resolved']
      },
      default: 'Todo'
    },
    priority: {
      type: String,
      enum: {
        values: ['Low', 'Medium', 'High']
      },
      default: 'Medium'
    },
    assignee: {
      type: String,
      required: true
    },
    tags: [
      {
        type: String,
        trim: true
      }
    ],
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
);

module.exports = mongoose.model('Issue', issueSchema);
