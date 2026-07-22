import axios from 'axios';

const API_BASE_URL = '/api/issues';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchIssues = async (filters = {}) => {
  const params = {};
  if (filters.status && filters.status !== 'All') {
    params.status = filters.status;
  }
  if (filters.priority && filters.priority !== 'All') {
    params.priority = filters.priority;
  }
  if (filters.search) {
    params.search = filters.search;
  }

  try {
    const response = await api.get('/', { params });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch issues');
  }
};

export const fetchIssueStats = async () => {
  try {
    const response = await api.get('/stats');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch issue statistics');
  }
};

export const createIssue = async (issueData) => {
  try {
    const response = await api.post('/', issueData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create issue');
  }
};

export const updateIssue = async (id, updateData) => {
  try {
    const response = await api.put(`/${id}`, updateData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update issue');
  }
};

export const deleteIssue = async (id) => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete issue');
  }
};
