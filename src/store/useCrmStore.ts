import { create } from 'zustand';
import type { Lead, Interaction, DashboardStats, LeadStatus } from '@/types';
import { leadApi, interactionApi } from '@/lib/api';

interface CrmState {
  // State
  leads: Lead[];
  interactions: Interaction[];
  selectedLead: Lead | null;
  isLoading: boolean;
  isUpdating: boolean; // Separate flag for update operations
  error: string | null;

  // Lead Actions
  fetchLeads: () => Promise<void>;
  fetchLeadById: (id: string) => Promise<Lead | null>;
  createLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateLead: (id: string, lead: Partial<Lead>) => Promise<void>;
  deleteLead: (id: string) => Promise<void>;

  // Interaction Actions
  fetchInteractions: () => Promise<void>;
  createInteraction: (interaction: Omit<Interaction, 'id'>) => Promise<void>;
  deleteInteraction: (id: string) => Promise<void>;

  // Computed
  getStats: () => DashboardStats;
  getLeadsByStatus: (status: LeadStatus) => Lead[];
}

export const useCrmStore = create<CrmState>((set, get) => ({
  // Initial State
  leads: [],
  interactions: [],
  selectedLead: null,
  isLoading: false,
  isUpdating: false,
  error: null,

  // Lead Actions
  fetchLeads: async () => {
    set({ isLoading: true, error: null });
    try {
      const leads = await leadApi.getAll();
      set({ leads, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch leads', isLoading: false });
    }
  },

  fetchLeadById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const lead = await leadApi.getById(id);
      set({ selectedLead: lead, isLoading: false });
      return lead;
    } catch (error) {
      set({ error: 'Failed to fetch lead', isLoading: false });
      return null;
    }
  },

  createLead: async (leadData) => {
    set({ isLoading: true, error: null });
    try {
      const newLead = await leadApi.create(leadData);
      set((state) => ({
        leads: [...state.leads, newLead],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to create lead', isLoading: false });
    }
  },

  updateLead: async (id, leadData) => {
    set({ isUpdating: true, error: null });
    try {
      // Get current lead from store to preserve all fields
      const currentLead = get().leads.find((l) => l.id === id);
      if (!currentLead) {
        set({ error: 'Lead not found', isUpdating: false });
        return;
      }
      // Merge current lead with updates, ensuring updatedAt
      const mergedLead = {
        ...currentLead,
        ...leadData,
        updatedAt: new Date().toISOString(),
      };
      // Update with complete lead data to avoid losing fields
      const updatedLead = await leadApi.update(id, mergedLead);
      set((state) => ({
        leads: state.leads.map((l) => (l.id === id ? updatedLead : l)),
        selectedLead: state.selectedLead?.id === id ? updatedLead : state.selectedLead,
        isUpdating: false,
      }));
    } catch (error) {
      set({ error: 'Failed to update lead', isUpdating: false });
    }
  },

  deleteLead: async (id) => {
    set({ isUpdating: true, error: null });
    try {
      await leadApi.delete(id);
      set((state) => ({
        leads: state.leads.filter((l) => l.id !== id),
        selectedLead: state.selectedLead?.id === id ? null : state.selectedLead,
        isUpdating: false,
      }));
    } catch (error) {
      set({ error: 'Failed to delete lead', isUpdating: false });
    }
  },

  // Interaction Actions
  fetchInteractions: async () => {
    set({ isLoading: true, error: null });
    try {
      const interactions = await interactionApi.getAll();
      set({ interactions, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch interactions', isLoading: false });
    }
  },

  createInteraction: async (interactionData) => {
    set({ isUpdating: true, error: null });
    try {
      const newInteraction = await interactionApi.create(interactionData);
      set((state) => ({
        interactions: [...state.interactions, newInteraction],
        isUpdating: false,
      }));
    } catch (error) {
      set({ error: 'Failed to create interaction', isUpdating: false });
    }
  },

  deleteInteraction: async (id) => {
    set({ isUpdating: true, error: null });
    try {
      await interactionApi.delete(id);
      set((state) => ({
        interactions: state.interactions.filter((i) => i.id !== id),
        isUpdating: false,
      }));
    } catch (error) {
      set({ error: 'Failed to delete interaction', isUpdating: false });
    }
  },

  // Computed
  getStats: () => {
    const { leads, interactions } = get();
    return {
      totalLeads: leads.length,
      totalProspects: leads.filter((l) => l.status === 'Prospect').length,
      totalDeals: leads.filter((l) => l.status === 'Deal').length,
      totalInteractions: interactions.length,
    };
  },

  getLeadsByStatus: (status) => {
    return get().leads.filter((l) => l.status === status);
  },
}));
