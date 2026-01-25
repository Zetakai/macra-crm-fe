import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useCrmStore } from '@/store/useCrmStore';
import { LeadList } from '@/components/leads/LeadList';
import { LeadForm } from '@/components/leads/LeadForm';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import type { Lead } from '@/types';
import { useTranslation } from 'react-i18next';

export function Leads() {
  const { t } = useTranslation();
  const {
    leads,
    isLoading,
    fetchLeads,
    createLead,
    updateLead,
    deleteLead,
  } = useCrmStore();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [deletingLead, setDeletingLead] = useState<Lead | null>(null);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const handleCreate = () => {
    setEditingLead(null);
    setIsFormOpen(true);
  };

  const handleEdit = (lead: Lead) => {
    setEditingLead(lead);
    setIsFormOpen(true);
  };

  const handleDelete = (lead: Lead) => {
    setDeletingLead(lead);
  };

  const handleFormSubmit = async (data: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingLead) {
      await updateLead(editingLead.id, data);
    } else {
      await createLead(data);
    }
    setIsFormOpen(false);
    setEditingLead(null);
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
    setEditingLead(null);
  };

  const handleDeleteConfirm = async () => {
    if (deletingLead) {
      await deleteLead(deletingLead.id);
      setDeletingLead(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">{t('leads_title')}</h1>
          <p className="text-muted-foreground">
            {t('leads_subtitle')}
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" />
          {t('add_new_lead')}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">{t('leads_total')}</p>
            <p className="text-2xl font-bold">{leads.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">{t('leads_prospects')}</p>
            <p className="text-2xl font-bold text-blue-500">
              {leads.filter((l) => l.status === 'Prospect').length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">{t('leads_negotiation')}</p>
            <p className="text-2xl font-bold text-yellow-500">
              {leads.filter((l) => l.status === 'Negotiation').length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">{t('leads_deals')}</p>
            <p className="text-2xl font-bold text-green-500">
              {leads.filter((l) => l.status === 'Deal').length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Leads List */}
      <Card>
        <CardHeader>
          <CardTitle>{t('all_leads')}</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-24 bg-muted animate-pulse rounded" />
              ))}
            </div>
          ) : (
            <LeadList leads={leads} onEdit={handleEdit} onDelete={handleDelete} />
          )}
        </CardContent>
      </Card>

      {/* Create/Edit Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingLead ? t('update_lead') : t('create_lead')}
            </DialogTitle>
          </DialogHeader>
          <LeadForm
            lead={editingLead}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={!!deletingLead}
        onOpenChange={() => setDeletingLead(null)}
        title={t('delete_lead')}
        description={t('delete_lead_confirm')}
        onConfirm={handleDeleteConfirm}
        variant="destructive"
      />
    </div>
  );
}
