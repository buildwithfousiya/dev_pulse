const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Issue = require('./models/Issue');

dotenv.config();

const sampleIssues = [
  {
    title: 'Fix Navigation Bar responsive layout crash',
    description: 'The navbar hamburger menu overlaps with search bar on mobile screens below 375px width.',
    status: 'Todo',
    priority: 'High',
    assignee: 'Alex Rivera',
    tags: ['frontend', 'bug', 'responsive']
  },
  {
    title: 'Implement JWT Token Expiration and Refresh flow',
    description: 'User sessions currently do not expire. Need auto refresh token mechanism.',
    status: 'In Progress',
    priority: 'High',
    assignee: 'Fousiya S.',
    tags: ['api', 'security', 'backend']
  },
  {
    title: 'Database indexing for high-frequency queries',
    description: 'Add compound indexes on status and priority fields to optimize filter queries.',
    status: 'Todo',
    priority: 'Medium',
    assignee: 'David Chen',
    tags: ['database', 'performance']
  },
  {
    title: 'UI Dark Mode Toggle missing persistent state',
    description: 'When switching to Dark Mode and reloading, theme resets to light mode.',
    status: 'Resolved',
    priority: 'Low',
    assignee: 'Sarah Connor',
    tags: ['frontend', 'ui']
  },
  {
    title: 'API Rate Limiter for public endpoints',
    description: 'Prevent brute-force spam by restricting IP requests to 100 requests per 15 minutes.',
    status: 'In Progress',
    priority: 'Medium',
    assignee: 'Fousiya S.',
    tags: ['api', 'backend', 'security']
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB database...');

    await Issue.deleteMany();
    console.log('Cleared existing issues.');

    const createdIssues = await Issue.insertMany(sampleIssues);
    console.log(`Successfully seeded ${createdIssues.length} sample issues!`);

    process.exit(0);
  } catch (error) {
    console.error(`Seeder Error: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();
