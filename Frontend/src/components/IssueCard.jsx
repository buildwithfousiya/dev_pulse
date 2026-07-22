import React, { useState } from 'react';
import { Trash2, User, Calendar, Tag, AlertTriangle } from 'lucide-react';
import CustomSelect from './CustomSelect';

const IssueCard = ({ issue, onStatusChange, onDelete }) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case 'High':
        return 'badge-priority-high';
      case 'Medium':
        return 'badge-priority-medium';
      case 'Low':
        return 'badge-priority-low';
      default:
        return 'badge-priority-medium';
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Todo':
        return 'badge-status-todo';
      case 'In Progress':
        return 'badge-status-in-progress';
      case 'Resolved':
        return 'badge-status-resolved';
      default:
        return 'badge-status-todo';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <>
      <div className="issue-card">
        <div>
          <div className="issue-card-header" style={{ marginBottom: '0.75rem' }}>
            <div className="badge-group">
              <span className={`badge ${getPriorityBadgeClass(issue.priority)}`}>
                {issue.priority} Priority
              </span>
              <span className={`badge ${getStatusBadgeClass(issue.status)}`}>
                {issue.status}
              </span>
            </div>
            <button
              className="btn-icon-danger"
              title="Delete Issue"
              onClick={() => setShowConfirmDelete(true)}
            >
              <Trash2 size={16} />
            </button>
          </div>

          <h3 className="issue-title" style={{ marginBottom: '0.5rem' }}>
            {issue.title}
          </h3>
          <p className="issue-description">{issue.description}</p>
        </div>

        <div>
          {issue.tags && issue.tags.length > 0 && (
            <div className="tag-list" style={{ marginBottom: '0.85rem' }}>
              {issue.tags.map((tag, index) => (
                <span key={index} className="tag-chip">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="issue-card-footer">
            <div className="assignee-info">
              <div className="avatar">
                {issue.assignee ? issue.assignee.charAt(0) : 'U'}
              </div>
              <span>{issue.assignee}</span>
            </div>

            <div className="action-buttons">
              <CustomSelect
                options={[
                  { value: 'Todo', label: 'Todo' },
                  { value: 'In Progress', label: 'In Progress' },
                  { value: 'Resolved', label: 'Resolved' }
                ]}
                value={issue.status}
                onChange={(val) => onStatusChange(issue._id, val)}
              />
            </div>
          </div>
        </div>
      </div>

      {showConfirmDelete && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '400px' }}>
            <div className="modal-header" style={{ backgroundColor: '#fef2f2' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#dc2626' }}>
                <AlertTriangle size={20} />
                <h3 className="modal-title" style={{ color: '#991b1b' }}>Confirm Deletion</h3>
              </div>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: '0.9rem', color: '#475569' }}>
                Are you sure you want to delete <strong>"{issue.title}"</strong>? This action cannot be undone.
              </p>
            </div>
            <div className="modal-footer">
              <button
                className="btn-secondary"
                onClick={() => setShowConfirmDelete(false)}
              >
                Cancel
              </button>
              <button
                className="btn-danger"
                onClick={() => {
                  setShowConfirmDelete(false);
                  onDelete(issue._id);
                }}
              >
                Delete Issue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default IssueCard;
