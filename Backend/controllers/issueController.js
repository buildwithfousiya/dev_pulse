const Issue = require('../models/Issue');

const getIssues = async (req, res, next) => {
    try {
        const { status, priority, search } = req.query;
        const filter = {};

        if (status && status !== 'All') {
            filter.status = status;
        }

        if (priority && priority !== 'All') {
            filter.priority = priority;
        }

        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { assignee: { $regex: search, $options: 'i' } }
            ]
        }
        const issues = await Issue.find(filter).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: issues.length,
            data: issues
        });

    } catch (error) {
        next(error);

    }
};

const getIssueById = async (req, res, next) => {
    try {
        const issue = await Issue.findById(req.params.id);

        if (!issue) {
            res.status(404);
            throw new Error(`Issue not found`);
        }

        res.status(200).json({
            success: true,
            data: issue
        });
    } catch (error) {
        next(error);
    }
};

const createIssue = async (req, res, next) => {
    try {
        const { title, description, assignee, priority, status, tags } = req.body;

        if (!title || !title.trim() || !description || !assignee || !assignee.trim()) {
            res.status(400);
            throw new Error('Title, description, and assignee are required fields');
        }

        let processedTags = [];
        if (Array.isArray(tags)) {
            processedTags = tags.map(t => t.trim()).filter(Boolean);
        } else if (typeof tags === 'string' && tags.trim()) {
            processedTags = tags.split(',').map(t => t.trim()).filter(Boolean);
        }

        const issue = await Issue.create({
            title: title.trim(),
            description: description.trim(),
            assignee: assignee.trim(),
            priority: priority,
            status: status,
            tags: processedTags
        });

        res.status(201).json({
            success: true,
            message: 'Issue created successfully',
            data: issue
        });
    } catch (error) {
        next(error);
    }
};

const updateIssue = async (req, res, next) => {
  try {
    let issue = await Issue.findById(req.params.id);

    if (!issue) {
      res.status(404);
      throw new Error(`Issue not found`);
    }

    if (req.body.tags !== undefined) {
      if (typeof req.body.tags === 'string') {
        req.body.tags = req.body.tags.split(',').map(t => t.trim()).filter(Boolean);
      }
    }

    issue = await Issue.findByIdAndUpdate(req.params.id, req.body, {
      new: true, 
    });

    res.status(200).json({
      success: true,
      message: 'Issue updated successfully',
      data: issue
    });
  } catch (error) {
    next(error);
  }
};

const deleteIssue = async (req, res, next) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      res.status(404);
      throw new Error(`Issue not found`);
    }

    await issue.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Issue permanently deleted',
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

const getIssueStats = async (req, res, next) => {
  try {
    const todoCount = await Issue.countDocuments({ status: 'Todo' });
    const inProgressCount = await Issue.countDocuments({ status: 'In Progress' });
    const resolvedCount = await Issue.countDocuments({ status: 'Resolved' });
    const totalCount = await Issue.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        total: totalCount,
        todo: todoCount,
        inProgress: inProgressCount,
        resolved: resolvedCount
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getIssues,
  getIssueById,
  createIssue,
  updateIssue,
  deleteIssue,
  getIssueStats
};