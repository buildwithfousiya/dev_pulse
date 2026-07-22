import React from 'react';
import { Layers, Plus, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

const Navbar = ({ stats, onOpenCreateModal }) => {
  return (
    <>
      <nav className="navbar">
        <div className="brand">
          <div className="brand-icon">
            <Layers size={22} />
          </div>
          <div>
            <h1 className="brand-title">DevPulse</h1>
            <div className="brand-subtitle">Issue & Task Tracker</div>
          </div>
        </div>

        <button className="btn-primary" onClick={onOpenCreateModal}>
          <Plus size={18} />
          <span>Create Issue</span>
        </button>
      </nav>

      <div className="stats-summary">
        <div className="stat-card">
          <div>
            <div className="stat-label">Total Issues</div>
            <div className="stat-value">{stats?.total || 0}</div>
          </div>
          <Layers size={20} color="#6366f1" />
        </div>

        <div className="stat-card">
          <div>
            <div className="stat-label">Todo</div>
            <div className="stat-value">{stats?.todo || 0}</div>
          </div>
          <AlertCircle size={20} color="#0369a1" />
        </div>

        <div className="stat-card">
          <div>
            <div className="stat-label">In Progress</div>
            <div className="stat-value">{stats?.inProgress || 0}</div>
          </div>
          <Clock size={20} color="#6d28d9" />
        </div>

        <div className="stat-card">
          <div>
            <div className="stat-label">Resolved</div>
            <div className="stat-value">{stats?.resolved || 0}</div>
          </div>
          <CheckCircle2 size={20} color="#15803d" />
        </div>
      </div>
    </>
  );
};

export default Navbar;
