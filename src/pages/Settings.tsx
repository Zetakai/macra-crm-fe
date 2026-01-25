import { useTranslation } from 'react-i18next';
import { useTheme } from '@/lib/theme';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Sun,
  Moon,
  Monitor,
  Globe,
  Palette,
  User,
  Shield,
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

export function Settings() {
  const { t, i18n } = useTranslation();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t('settings_title')}</h1>
        <p className="text-muted-foreground">{t('settings_subtitle')}</p>
      </div>

      {/* Language Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            {t('language')}
          </CardTitle>
          <CardDescription>{t('language_desc')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              className={`
                p-4 rounded-lg border-2 cursor-pointer transition-colors
                ${i18n.language === 'en' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}
              `}
              onClick={() => i18n.changeLanguage('en')}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-medium">English</span>
                {i18n.language === 'en' && <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">Default</span>}
              </div>
              <p className="text-sm text-muted-foreground">{t('language_english_desc')}</p>
            </div>
            <div
              className={`
                p-4 rounded-lg border-2 cursor-pointer transition-colors
                ${i18n.language === 'id' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}
              `}
              onClick={() => i18n.changeLanguage('id')}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-medium">Bahasa</span>
                {i18n.language === 'id' && <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">Default</span>}
              </div>
              <p className="text-sm text-muted-foreground">{t('language_indonesian_desc')}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Theme Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            {t('theme')}
          </CardTitle>
          <CardDescription>{t('theme_desc')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              className={`
                p-4 rounded-lg border-2 cursor-pointer transition-colors
                ${theme === 'system' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}
              `}
              onClick={() => setTheme('system')}
            >
              <div className="flex items-center gap-3 mb-2">
                <Monitor className="h-6 w-6" />
                <span className="text-lg font-medium">{t('theme_system')}</span>
              </div>
              <p className="text-sm text-muted-foreground">{t('theme_system_desc')}</p>
              {resolvedTheme && (
                <div className="mt-2 text-xs text-muted-foreground">
                  {t('current')}: {resolvedTheme === 'dark' ? t('theme_dark') : t('theme_light')}
                </div>
              )}
            </div>
            <div
              className={`
                p-4 rounded-lg border-2 cursor-pointer transition-colors
                ${theme === 'light' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}
              `}
              onClick={() => setTheme('light')}
            >
              <div className="flex items-center gap-3 mb-2">
                <Sun className="h-6 w-6 text-amber-500" />
                <span className="text-lg font-medium">{t('theme_light')}</span>
              </div>
              <p className="text-sm text-muted-foreground">{t('theme_light_desc')}</p>
            </div>
            <div
              className={`
                p-4 rounded-lg border-2 cursor-pointer transition-colors
                ${theme === 'dark' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}
              `}
              onClick={() => setTheme('dark')}
            >
              <div className="flex items-center gap-3 mb-2">
                <Moon className="h-6 w-6 text-indigo-500" />
                <span className="text-lg font-medium">{t('theme_dark')}</span>
              </div>
              <p className="text-sm text-muted-foreground">{t('theme_dark_desc')}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            {t('account_info')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>{t('name')}</Label>
              <p className="font-medium">{user?.name}</p>
            </div>
            <div className="space-y-1">
              <Label>{t('email')}</Label>
              <p className="font-medium">{user?.email}</p>
            </div>
            <div className="space-y-1">
              <Label>{t('user_level')}</Label>
              <p className="font-medium">
                {user?.role === 'admin' ? t('level_admin') :
                 user?.role === 'manager' ? t('level_manager') :
                 t('level_user')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Permissions */}
      {user && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              {t('permissions')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {user.role === 'admin' && (
                <>
                  <PermissionBadge label={t('perm_view_leads')} allowed />
                  <PermissionBadge label={t('perm_create_leads')} allowed />
                  <PermissionBadge label={t('perm_edit_leads')} allowed />
                  <PermissionBadge label={t('perm_delete_leads')} allowed />
                  <PermissionBadge label={t('perm_view_interactions')} allowed />
                  <PermissionBadge label={t('perm_create_interactions')} allowed />
                  <PermissionBadge label={t('perm_delete_interactions')} allowed />
                  <PermissionBadge label={t('perm_view_settings')} allowed />
                  <PermissionBadge label={t('perm_edit_settings')} allowed />
                  <PermissionBadge label={t('perm_manage_users')} allowed />
                  <PermissionBadge label={t('perm_view_reports')} allowed />
                </>
              )}
              {user.role === 'manager' && (
                <>
                  <PermissionBadge label={t('perm_view_leads')} allowed />
                  <PermissionBadge label={t('perm_create_leads')} allowed />
                  <PermissionBadge label={t('perm_edit_leads')} allowed />
                  <PermissionBadge label={t('perm_delete_leads')} allowed />
                  <PermissionBadge label={t('perm_view_interactions')} allowed />
                  <PermissionBadge label={t('perm_create_interactions')} allowed />
                  <PermissionBadge label={t('perm_delete_interactions')} allowed />
                  <PermissionBadge label={t('perm_view_reports')} allowed />
                </>
              )}
              {user.role === 'user' && (
                <>
                  <PermissionBadge label={t('perm_view_leads')} allowed />
                  <PermissionBadge label={t('perm_create_leads')} allowed />
                  <PermissionBadge label={t('perm_edit_leads')} allowed />
                  <PermissionBadge label={t('perm_view_interactions')} allowed />
                  <PermissionBadge label={t('perm_create_interactions')} allowed />
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function PermissionBadge({ label, allowed }: { label: string; allowed: boolean }) {
  return (
    <div className={`flex items-center gap-2 p-2 rounded-md ${allowed ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
      {allowed ? (
        <Shield className="h-4 w-4" />
      ) : (
        <Shield className="h-4 w-4 opacity-50" />
      )}
      <span className="text-sm">{label}</span>
    </div>
  );
}
