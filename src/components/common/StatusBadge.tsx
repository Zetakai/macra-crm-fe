import { Badge } from '@/components/ui/badge';
import type { LeadStatus } from '@/types';

interface StatusBadgeProps {
  status: LeadStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const variant = status.toLowerCase() as 'prospect' | 'negotiation' | 'deal' | 'lost';

  return <Badge variant={variant}>{status}</Badge>;
}
