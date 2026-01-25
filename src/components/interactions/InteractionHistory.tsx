import { Phone, Mail, Users, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Interaction, InteractionType } from '@/types';
import { formatDateTime } from '@/lib/utils';

interface InteractionHistoryProps {
  interactions: Interaction[];
  onDelete: (id: string) => void;
}

const iconMap: Record<InteractionType, React.ComponentType<{ className?: string }>> = {
  Call: Phone,
  Email: Mail,
  Meeting: Users,
  Complaint: AlertCircle,
};

const colorMap: Record<InteractionType, string> = {
  Call: 'text-blue-500',
  Email: 'text-green-500',
  Meeting: 'text-purple-500',
  Complaint: 'text-red-500',
};

export function InteractionHistory({ interactions, onDelete }: InteractionHistoryProps) {
  if (interactions.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          No interactions recorded yet.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Interaction History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {interactions
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((interaction) => {
              const Icon = iconMap[interaction.type];
              return (
                <div
                  key={interaction.id}
                  className="flex items-start gap-3 p-3 rounded-lg border bg-muted/50 hover:bg-muted transition-colors"
                >
                  <Icon className={`h-5 w-5 mt-0.5 ${colorMap[interaction.type]}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{interaction.type}</span>
                      <button
                        onClick={() => onDelete(interaction.id)}
                        className="text-xs text-muted-foreground hover:text-destructive transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {interaction.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {formatDateTime(interaction.date)}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </CardContent>
    </Card>
  );
}
