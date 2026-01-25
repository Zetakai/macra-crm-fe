import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MoreHorizontal, Plus, GripVertical } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCrmStore } from '@/store/useCrmStore';
import type { Lead, LeadStatus } from '@/types';

const STATUS_COLUMNS: { key: LeadStatus; title: string; color: string }[] = [
  { key: 'Prospect', title: 'Prospect', color: 'bg-blue-500' },
  { key: 'Negotiation', title: 'Negotiation', color: 'bg-yellow-500' },
  { key: 'Deal', title: 'Deal', color: 'bg-green-500' },
  { key: 'Lost', title: 'Lost', color: 'bg-red-500' },
];

export function Pipeline() {
  const { t } = useTranslation();
  const { leads, fetchLeads, isLoading, updateLead } = useCrmStore();
  const [draggedLeadId, setDraggedLeadId] = useState<string | null>(null);
  const [dragOverStatus, setDragOverStatus] = useState<LeadStatus | null>(null);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const getLeadsByStatus = (status: LeadStatus) => {
    return leads.filter((lead) => lead.status === status);
  };

  const handleDragStart = (e: React.DragEvent, leadId: string) => {
    setDraggedLeadId(leadId);
    e.dataTransfer.effectAllowed = 'move';
    // Make drag image more visible
    const target = e.target as HTMLElement;
    target.style.opacity = '0.5';
  };

  const handleDragEnd = (e: React.DragEvent) => {
    setDraggedLeadId(null);
    setDragOverStatus(null);
    const target = e.target as HTMLElement;
    target.style.opacity = '1';
  };

  const handleDragOver = (e: React.DragEvent, status: LeadStatus) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverStatus(status);
  };

  const handleDragLeave = () => {
    setDragOverStatus(null);
  };

  const handleDrop = (e: React.DragEvent, newStatus: LeadStatus) => {
    e.preventDefault();
    setDragOverStatus(null);

    if (draggedLeadId && newStatus) {
      const lead = leads.find((l) => l.id === draggedLeadId);
      if (lead && lead.status !== newStatus) {
        updateLead(draggedLeadId, {
          status: newStatus,
          updatedAt: new Date().toISOString(),
        });
      }
    }
    setDraggedLeadId(null);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-muted animate-pulse rounded" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-96 bg-muted animate-pulse rounded" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">{t('pipeline_status')}</h1>
          <p className="text-muted-foreground">
            {t('deals_from_prospects', {
              deals: leads.filter((l) => l.status === 'Deal').length,
              prospects: leads.filter((l) => l.status === 'Prospect').length,
            })}
          </p>
        </div>
        <Link to="/leads">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            {t('add_new_lead')}
          </Button>
        </Link>
      </div>

      {/* Pipeline Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATUS_COLUMNS.map((column) => {
          const columnLeads = getLeadsByStatus(column.key);
          const isDragOver = dragOverStatus === column.key && draggedLeadId;

          return (
            <div
              key={column.key}
              className={`space-y-3 transition-colors rounded-lg ${
                isDragOver ? 'bg-primary/10 ring-2 ring-primary ring-inset' : ''
              }`}
              onDragOver={(e) => handleDragOver(e, column.key)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, column.key)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${column.color}`} />
                  <h3 className="font-medium">{column.title}</h3>
                </div>
                <span className="text-sm text-muted-foreground">
                  {columnLeads.length}
                </span>
              </div>

              <div className="bg-muted/50 rounded-lg p-3 space-y-3 min-h-[200px]">
                {columnLeads.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No leads
                  </p>
                ) : (
                  columnLeads.map((lead) => (
                    <PipelineCard
                      key={lead.id}
                      lead={lead}
                      onDragStart={handleDragStart}
                      onDragEnd={handleDragEnd}
                    />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface PipelineCardProps {
  lead: Lead;
  onDragStart: (e: React.DragEvent, leadId: string) => void;
  onDragEnd: (e: React.DragEvent) => void;
}

function PipelineCard({ lead, onDragStart, onDragEnd }: PipelineCardProps) {
  const { t } = useTranslation();
  const { updateLead } = useCrmStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const statusOptions: LeadStatus[] = ['Prospect', 'Negotiation', 'Deal', 'Lost'];

  const handleStatusChange = (newStatus: LeadStatus) => {
    updateLead(lead.id, {
      status: newStatus,
      updatedAt: new Date().toISOString(),
    });
    setIsMenuOpen(false);
  };

  return (
    <Card
      draggable
      onDragStart={(e) => onDragStart(e, lead.id)}
      onDragEnd={onDragEnd}
      className="cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow"
    >
      <CardContent className="p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-medium text-primary">
                {(lead.name || '?').charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <Link
                to={`/leads/${lead.id}`}
                className="font-medium text-sm hover:text-primary transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                {lead.name || 'Unknown'}
              </Link>
              <p className="text-xs text-muted-foreground line-clamp-1">
                {lead.company || '-'}
              </p>
            </div>
          </div>

          <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={(e) => e.preventDefault()}
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t('status')}</DropdownMenuLabel>
              {statusOptions.map((status) => (
                <DropdownMenuItem
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  disabled={lead.status === status}
                >
                  {status === 'Prospect' && t('status_prospect')}
                  {status === 'Negotiation' && t('status_negotiation')}
                  {status === 'Deal' && t('status_deal')}
                  {status === 'Lost' && t('status_lost')}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
          <span>{lead.source}</span>
          <Link
            to={`/leads/${lead.id}`}
            className="hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            {t('view_all')}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
