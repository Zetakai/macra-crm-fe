import axios from 'axios';
import type { Lead, Interaction } from '@/types';

const API_URL = 'http://localhost:3000';

/**
 * API client instance for JSON Server
 */
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Lead API functions
 */
export const leadApi = {
  getAll: async (): Promise<Lead[]> => {
    const response = await api.get('/leads');
    return response.data;
  },

  getById: async (id: string): Promise<Lead> => {
    const response = await api.get(`/leads/${id}`);
    return response.data;
  },

  create: async (lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>): Promise<Lead> => {
    const response = await api.post('/leads', lead);
    return response.data;
  },

  update: async (id: string, lead: Partial<Lead>): Promise<Lead> => {
    const response = await api.put(`/leads/${id}`, lead);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/leads/${id}`);
  },
};

/**
 * Interaction API functions
 */
export const interactionApi = {
  getAll: async (): Promise<Interaction[]> => {
    const response = await api.get('/interactions');
    return response.data;
  },

  getByLeadId: async (leadId: string): Promise<Interaction[]> => {
    const response = await api.get(`/interactions?leadId=${leadId}`);
    return response.data;
  },

  create: async (interaction: Omit<Interaction, 'id'>): Promise<Interaction> => {
    const response = await api.post('/interactions', interaction);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/interactions/${id}`);
  },
};

export default api;
