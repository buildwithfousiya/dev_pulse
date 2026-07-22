import { useState, useEffect, useCallback } from 'react';
import Navbar from "./components/Navbar";
import FilterBar from "./components/FilterBar";
import IssueCard from "./components/IssueCard";
import IssueFormModal from "./components/IssueForm";
import toast, { Toaster } from 'react-hot-toast';
import { fetchIssues, fetchIssueStats, createIssue, updateIssue, deleteIssue } from './api';
import { Layers } from 'lucide-react';



function App() {
  const [issues, setIssues] = useState([]);
  const [stats, setStats] = useState({ total: 0, todo: 0, inProgress: 0, resolved: 0 });
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const [filters, setFilters] = useState({
    status: 'All',
    priority: 'All',
    search: ''
  });



  const loadData = useCallback(async () => {
    try {
      await Promise.resolve();
      setLoading(true);
      const [issuesRes, statsRes] = await Promise.all([
        fetchIssues(filters),
        fetchIssueStats()
      ]);

      if (issuesRes.success) {
        setIssues(issuesRes.data);
      }
      if (statsRes.success) {
        setStats(statsRes.data);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to load issues from server');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadData();
    }, 0);
    return () => clearTimeout(timer);
  }, [loadData]);

  const handleCreateIssue = async (newIssueData) => {
    try {
      const res = await createIssue(newIssueData);
      if (res.success) {
        toast.success('New issue created successfully!');
        loadData();
      }
    } catch (error) {
      toast.error(error.message || 'Error creating issue');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await updateIssue(id, { status: newStatus });
      if (res.success) {
        toast.success(`Status updated to "${newStatus}"`);
        loadData();
      }
    } catch (error) {
      toast.error(error.message || 'Failed to update status');
    }
  };

  const handleDeleteIssue = async (id) => {
    try {
      const res = await deleteIssue(id);
      if (res.success) {
        toast('Issue deleted permanently', { icon: 'ℹ️' });
        loadData();
      }
    } catch (error) {
      toast.error(error.message || 'Failed to delete issue');
    }
  };

  const handleResetFilters = () => {
    setFilters({
      status: 'All',
      priority: 'All',
      search: ''
    });
  };

  return (
    <div className="app-container">
      <Navbar
        stats={stats}
        onOpenCreateModal={() => setIsModalOpen(true)}
      />

      <FilterBar
        filters={filters}
        setFilters={setFilters}
        onReset={handleResetFilters}
      />

      {loading ? (
        <div className="spinner"></div>
      ) : issues.length > 0 ? (
        <div className="issue-grid">
          {issues.map((issue) => (
            <IssueCard
              key={issue._id}
              issue={issue}
              onStatusChange={handleStatusChange}
              onDelete={handleDeleteIssue}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Layers size={48} color="#cbd5e1" style={{ marginBottom: '1rem' }} />
          <h3>No issues found</h3>
          <p style={{ fontSize: '0.875rem', marginTop: '0.35rem' }}>
            Try adjusting your search filter or create a new issue task.
          </p>
        </div>
      )}

      <IssueFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateIssue}
      />

      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
}

export default App;
