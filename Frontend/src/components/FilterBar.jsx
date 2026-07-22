import React from 'react';
import { Search, Filter, RotateCcw } from 'lucide-react';
import CustomSelect from './CustomSelect';

const FilterBar = ({ filters, setFilters, onReset }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="toolbar">
      <div className="filter-group">
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            name="search"
            placeholder="Search by title, description or assignee..."
            value={filters.search}
            onChange={handleInputChange}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Filter size={16} color="#64748b" />
          <CustomSelect
            options={[
              { value: 'All', label: 'Status: All' },
              { value: 'Todo', label: 'Todo' },
              { value: 'In Progress', label: 'In Progress' },
              { value: 'Resolved', label: 'Resolved' }
            ]}
            value={filters.status}
            onChange={(val) => setFilters((prev) => ({ ...prev, status: val }))}
          />
        </div>

        <CustomSelect
          options={[
            { value: 'All', label: 'Priority: All' },
            { value: 'High', label: 'High' },
            { value: 'Medium', label: 'Medium' },
            { value: 'Low', label: 'Low' }
          ]}
          value={filters.priority}
          onChange={(val) => setFilters((prev) => ({ ...prev, priority: val }))}
        />
      </div>

      {(filters.status !== 'All' || filters.priority !== 'All' || filters.search) && (
        <button
          className="btn-secondary"
          onClick={onReset}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
        >
          <RotateCcw size={14} />
          Reset Filters
        </button>
      )}
    </div>
  );
};

export default FilterBar;
