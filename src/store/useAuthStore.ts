import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'admin' | 'manager' | 'user';

export interface User {
  id: string;
  username: string;
  name: string;
  role: UserRole;
  email: string;
  avatar?: string;
  createdAt: string;
}

// Demo users for the CRM
const demoUsers: (User & { password: string })[] = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123',
    name: 'Administrator',
    email: 'admin@macracrm.com',
    role: 'admin',
    createdAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    username: 'manager',
    password: 'manager123',
    name: 'Sales Manager',
    email: 'manager@macracrm.com',
    role: 'manager',
    createdAt: '2025-01-05T00:00:00.000Z',
  },
  {
    id: '3',
    username: 'user',
    password: 'user123',
    name: 'Sales Representative',
    email: 'user@macracrm.com',
    role: 'user',
    createdAt: '2025-01-10T00:00:00.000Z',
  },
];

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (username: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 500));

          const foundUser = demoUsers.find(
            (u) => u.username === username && u.password === password
          );

          if (foundUser) {
            const { password: _, ...userWithoutPassword } = foundUser;
            set({
              user: userWithoutPassword,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
            return true;
          } else {
            set({
              user: null,
              isAuthenticated: false,
              isLoading: false,
              error: 'Invalid credentials',
            });
            return false;
          }
        } catch {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: 'Login failed',
          });
          return false;
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          error: null,
        });
      },

      hasPermission: (permission: string) => {
        const { user } = get();
        if (!user) return false;

        // Permission hierarchy
        const permissions: Record<UserRole, string[]> = {
          admin: [
            'view_leads',
            'create_leads',
            'edit_leads',
            'delete_leads',
            'view_interactions',
            'create_interactions',
            'delete_interactions',
            'view_settings',
            'edit_settings',
            'manage_users',
            'view_reports',
          ],
          manager: [
            'view_leads',
            'create_leads',
            'edit_leads',
            'delete_leads',
            'view_interactions',
            'create_interactions',
            'delete_interactions',
            'view_reports',
          ],
          user: [
            'view_leads',
            'create_leads',
            'edit_leads',
            'view_interactions',
            'create_interactions',
          ],
        };

        return permissions[user.role]?.includes(permission) || false;
      },
    }),
    {
      name: 'crm-auth',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
