import { useEffect } from 'react';
import { Phone, Mail, Users, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCrmStore } from '@/store/useCrmStore';
import { formatDateTime } from '@/lib/utils';
import type { InteractionType } from '@/types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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

export function Interactions() {
  const { t } = useTranslation();
  const { interactions, leads, fetchInteractions, fetchLeads, isLoading } = useCrmStore();

  useEffect(() => {
    fetchLeads();
    fetchInteractions();
  }, [fetchLeads, fetchInteractions]);

  const getLeadName = (leadId: string) => {
    const lead = leads.find((l) => l.id === leadId);
    return lead?.name || t('unknown_lead');
  };

  const sortedInteractions = [...interactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t('interactions_title')}</h1>
        <p className="text-muted-foreground">
          {t('interactions_subtitle')}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">{t('calls')}</p>
                <p className="text-xl font-bold">
                  {interactions.filter((i) => i.type === 'Call').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">{t('emails')}</p>
                <p className="text-xl font-bold">
                  {interactions.filter((i) => i.type === 'Email').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">{t('meetings')}</p>
                <p className="text-xl font-bold">
                  {interactions.filter((i) => i.type === 'Meeting').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">{t('complaints')}</p>
                <p className="text-xl font-bold">
                  {interactions.filter((i) => i.type === 'Complaint').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interactions List */}
      <Card>
        <CardHeader>
          <CardTitle>{t('all_interactions')}</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-20 bg-muted animate-pulse rounded" />
              ))}
            </div>
          ) : sortedInteractions.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              {t('no_interactions_yet')}
            </div>
          ) : (
            <div className="space-y-4">
              {sortedInteractions.map((interaction) => {
                const Icon = iconMap[interaction.type];
                return (
                  <div
                    key={interaction.id}
                    className="flex items-start gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className={`p-2 rounded-full ${colorMap[interaction.type].replace('text', 'bg')} bg-opacity-10`}>
                      <Icon className={`h-5 w-5 ${colorMap[interaction.type]}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <Link
                            to={`/leads/${interaction.leadId}`}
                            className="font-medium hover:underline"
                          >
                            {getLeadName(interaction.leadId)}
                          </Link>
                          <span className="text-sm text-muted-foreground ml-2">
                            - {t(`type_${interaction.type.toLowerCase()}`)}
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {formatDateTime(interaction.date)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {interaction.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
