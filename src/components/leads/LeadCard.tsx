import { Mail, Phone, Building2, Calendar, Edit2, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Lead } from '@/types';
import { formatDate } from '@/lib/utils';

interface LeadCardProps {
  lead: Lead;
  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
}

export function LeadCard({ lead, onEdit, onDelete }: LeadCardProps) {
  const statusVariant = (lead.status || 'Prospect').toLowerCase() as 'prospect' | 'negotiation' | 'deal' | 'lost';

  return (
    <Link to={`/leads/${lead.id}`} className="block h-full">
      <Card className="hover:shadow-md transition-shadow h-full">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-semibold text-lg hover:text-primary transition-colors">
                {lead.name || 'Unknown'}
              </h3>
              <p className="text-sm text-muted-foreground">{lead.company || '-'}</p>
            </div>
            <Badge variant={statusVariant}>{lead.status || 'Unknown'}</Badge>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>{lead.email || '-'}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>{lead.phone || '-'}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Building2 className="h-4 w-4" />
              <span>{lead.source || '-'}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(lead.createdAt)}</span>
            </div>
          </div>

          {lead.notes && (
            <div className="mt-3 p-2 bg-muted rounded text-sm text-muted-foreground">
              {lead.notes}
            </div>
          )}
        </CardContent>

        <CardFooter className="p-4 pt-0 flex justify-end gap-2" onClick={(e) => e.preventDefault()}>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              onEdit(lead);
            }}
          >
            <Edit2 className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              onDelete(lead);
            }}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
