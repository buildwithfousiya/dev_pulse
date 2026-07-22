import React, { useState } from 'react';
import { X, PlusCircle } from 'lucide-react';
import CustomSelect from './CustomSelect';

const IssueForm = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignee: '',
    priority: 'Medium',
    status: 'Todo',
    tags: ''
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.assignee.trim()) {
      newErrors.assignee = 'Assignee name is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    onSubmit({
      ...formData,
      tags: formData.tags
    });

    setFormData({
      title: '',
      description: '',
      assignee: '',
      priority: 'Medium',
      status: 'Todo',
      tags: ''
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <PlusCircle size={20} color="#6366f1" />
            <h2 className="modal-title">Create New Issue</h2>
          </div>
          <button className="btn-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">
                Title <span className="required">*</span>
              </label>
              <input
                type="text"
                name="title"
                className="form-input"
                placeholder="e.g. Fix Navigation Bar responsive crash"
                value={formData.title}
                onChange={handleChange}
              />
              {errors.title && <span className="form-error">{errors.title}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">
                Description <span className="required">*</span>
              </label>
              <textarea
                name="description"
                className="form-textarea"
                placeholder="Provide detailed steps or context for this task..."
                value={formData.description}
                onChange={handleChange}
              />
              {errors.description && <span className="form-error">{errors.description}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  Assignee Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="assignee"
                  className="form-input"
                  placeholder="e.g. Alex Rivera"
                  value={formData.assignee}
                  onChange={handleChange}
                />
                {errors.assignee && <span className="form-error">{errors.assignee}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Tags (comma-separated)</label>
                <input
                  type="text"
                  name="tags"
                  className="form-input"
                  placeholder="e.g. bug, frontend, api"
                  value={formData.tags}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Priority</label>
                <CustomSelect
                  options={['Low', 'Medium', 'High']}
                  value={formData.priority}
                  onChange={(val) => setFormData((prev) => ({ ...prev, priority: val }))}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Initial Status</label>
                <CustomSelect
                  options={['Todo', 'In Progress', 'Resolved']}
                  value={formData.status}
                  onChange={(val) => setFormData((prev) => ({ ...prev, status: val }))}
                />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IssueForm;
