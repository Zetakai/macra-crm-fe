/**
 * Lead status type for CRM pipeline management
 */
export type LeadStatus = 'Prospect' | 'Negotiation' | 'Deal' | 'Lost';

/**
 * Lead source type for tracking where leads come from
 */
export type LeadSource = 'Website' | 'Referral' | 'Social Media' | 'Cold Call';

/**
 * Interaction type for tracking customer communications
 */
export type InteractionType = 'Call' | 'Email' | 'Meeting' | 'Complaint';

/**
 * Lead entity representing a potential or existing customer
 */
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: LeadStatus;
  source: LeadSource;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Interaction entity representing a customer interaction/communication
 */
export interface Interaction {
  id: string;
  leadId: string;
  type: InteractionType;
  description: string;
  date: string;
}

/**
 * Dashboard statistics interface
 */
export interface DashboardStats {
  totalLeads: number;
  totalProspects: number;
  totalDeals: number;
  totalInteractions: number;
}
