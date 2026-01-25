import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Building2, Calendar, Edit2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useCrmStore } from '@/store/useCrmStore';
import { LeadForm } from '@/components/leads/LeadForm';
import { InteractionHistory } from '@/components/interactions/InteractionHistory';
import { InteractionForm } from '@/components/interactions/InteractionForm';
import { formatDate } from '@/lib/utils';
import type { Lead } from '@/types';
import { useTranslation } from 'react-i18next';

export function LeadDetail() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const {
    selectedLead: lead,
    interactions,
    isLoading,
    fetchLeadById,
    fetchInteractions,
    updateLead,
    createInteraction,
    deleteInteraction,
  } = useCrmStore();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isInteractionOpen, setIsInteractionOpen] = useState(false);

  useEffect(() => {
    if (id) {
      fetchLeadById(id);
      fetchInteractions();
    }
  }, [id, fetchLeadById, fetchInteractions]);

  const leadInteractions = interactions.filter((i) => i.leadId === id);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-muted animate-pulse rounded" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="h-64 bg-muted animate-pulse rounded" />
          </div>
          <div>
            <div className="h-48 bg-muted animate-pulse rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold">{t('lead_not_found')}</h2>
        <p className="text-muted-foreground mt-2">
          {t('lead_not_found_desc')}
        </p>
        <Link to="/leads">
          <Button className="mt-4">{t('back_to_leads')}</Button>
        </Link>
      </div>
    );
  }

  const statusVariant = lead.status.toLowerCase() as 'prospect' | 'negotiation' | 'deal' | 'lost';

  const handleUpdateLead = async (data: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>) => {
    await updateLead(lead.id, { ...data, updatedAt: new Date().toISOString() });
    setIsEditOpen(false);
  };

  const handleCreateInteraction = async (data: {
    type: string;
    description: string;
    date: string;
  }) => {
    await createInteraction({
      type: data.type as "Call" | "Email" | "Meeting" | "Complaint",
      description: data.description,
      date: data.date,
      leadId: lead.id,
    });
    setIsInteractionOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link to="/leads">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t('back_to_leads')}
        </Button>
      </Link>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-2xl font-bold text-primary">
              {lead.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h1 className="text-2xl font-bold">{lead.name}</h1>
            <p className="text-muted-foreground">{lead.company}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsEditOpen(true)}>
            <Edit2 className="h-4 w-4 mr-2" />
            {t('edit')}
          </Button>
          <Button onClick={() => setIsInteractionOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            {t('add_interaction')}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="info">
            <TabsList>
              <TabsTrigger value="info">{t('contact_information')}</TabsTrigger>
              <TabsTrigger value="notes">{t('notes')}</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>{t('contact_information')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">{t('email')}</p>
                        <p className="font-medium">{lead.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">{t('phone')}</p>
                        <p className="font-medium">{lead.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Building2 className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">{t('company')}</p>
                        <p className="font-medium">{lead.company || '-'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">{t('source')}</p>
                        <p className="font-medium">{lead.source}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>{t('notes')}</CardTitle>
                </CardHeader>
                <CardContent>
                  {lead.notes ? (
                    <p className="whitespace-pre-wrap">{lead.notes}</p>
                  ) : (
                    <p className="text-muted-foreground">{t('no_leads_yet')}</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Interaction History */}
          <InteractionHistory
            interactions={leadInteractions}
            onDelete={deleteInteraction}
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t('status')}</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant={statusVariant} className="text-sm">
                {lead.status}
              </Badge>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('created')}</span>
                  <span>{formatDate(lead.createdAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('updated')}</span>
                  <span>{formatDate(lead.updatedAt)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('update_lead')}</DialogTitle>
          </DialogHeader>
          <LeadForm
            lead={lead}
            onSubmit={handleUpdateLead}
            onCancel={() => setIsEditOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Add Interaction Dialog */}
      <Dialog open={isInteractionOpen} onOpenChange={setIsInteractionOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('add_interaction')}</DialogTitle>
          </DialogHeader>
          <InteractionForm
            onSubmit={handleCreateInteraction}
            onCancel={() => setIsInteractionOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
