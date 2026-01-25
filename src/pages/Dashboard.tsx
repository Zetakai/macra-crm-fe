import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, TrendingUp, DollarSign, Phone, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCrmStore } from '@/store/useCrmStore';
import { useTranslation } from 'react-i18next';

export function Dashboard() {
  const { t } = useTranslation();
  const { leads, getStats, fetchLeads, fetchInteractions, isLoading } = useCrmStore();

  useEffect(() => {
    fetchLeads();
    fetchInteractions();
  }, [fetchLeads, fetchInteractions]);

  const stats = getStats();

  const recentLeads = [...leads]
    .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
    .filter((lead) => lead.name && lead.name.trim()) // Filter out leads without name
    .slice(0, 5);

  const statCards = [
    {
      title: t('total_leads'),
      value: stats.totalLeads,
      icon: Users,
      color: 'text-blue-500',
      bg: 'bg-blue-50 dark:bg-blue-950',
    },
    {
      title: t('prospects'),
      value: stats.totalProspects,
      icon: TrendingUp,
      color: 'text-yellow-500',
      bg: 'bg-yellow-50 dark:bg-yellow-950',
    },
    {
      title: t('deals_closed'),
      value: stats.totalDeals,
      icon: DollarSign,
      color: 'text-green-500',
      bg: 'bg-green-50 dark:bg-green-950',
    },
    {
      title: t('interactions'),
      value: stats.totalInteractions,
      icon: Phone,
      color: 'text-purple-500',
      bg: 'bg-purple-50 dark:bg-purple-950',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">{t('dashboard_title')}</h1>
          <p className="text-muted-foreground">{t('dashboard_subtitle')}</p>
        </div>
        <Link to="/leads">
          <Button>
            {t('view_all_leads')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    {isLoading ? (
                      <div className="h-8 w-16 bg-muted animate-pulse rounded mt-1" />
                    ) : (
                      <p className="text-3xl font-bold">{stat.value}</p>
                    )}
                  </div>
                  <div className={`p-3 rounded-full ${stat.bg}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Leads */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{t('recent_leads')}</span>
            <Link to="/leads">
              <Button variant="ghost" size="sm">
                {t('view_all')}
              </Button>
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-16 bg-muted animate-pulse rounded" />
              ))}
            </div>
          ) : recentLeads.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {t('no_leads_yet')}
            </div>
          ) : (
            <div className="space-y-3">
              {recentLeads.map((lead) => (
                <Link
                  key={lead.id}
                  to={`/leads/${lead.id}`}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {(lead.name || '?').charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{lead.name || 'Unknown'}</p>
                      <p className="text-sm text-muted-foreground">{lead.company || '-'}</p>
                    </div>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      lead.status === 'Deal'
                        ? 'bg-green-100 text-green-800'
                        : lead.status === 'Negotiation'
                        ? 'bg-yellow-100 text-yellow-800'
                        : lead.status === 'Lost'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {lead.status}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Users className="h-10 w-10 mx-auto mb-3 text-primary" />
            <h3 className="font-semibold mb-1">{t('manage_leads')}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {t('add_edit_track_leads')}
            </p>
            <Link to="/leads">
              <Button variant="outline" className="w-full">
                {t('go_to_leads')}
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Phone className="h-10 w-10 mx-auto mb-3 text-primary" />
            <h3 className="font-semibold mb-1">{t('track_interactions')}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {t('record_calls_emails_meetings')}
            </p>
            <Link to="/interactions">
              <Button variant="outline" className="w-full">
                {t('view_interactions')}
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-10 w-10 mx-auto mb-3 text-primary" />
            <h3 className="font-semibold mb-1">{t('pipeline_status')}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {t('deals_from_prospects', { deals: stats.totalDeals, prospects: stats.totalProspects })}
            </p>
            <Link to="/pipeline">
              <Button variant="outline" className="w-full">
                {t('view_pipeline')}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
