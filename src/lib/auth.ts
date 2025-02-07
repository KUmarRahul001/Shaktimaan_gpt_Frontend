import { supabase } from './supabase';

export type AuthError = {
  message: string;
  code?: string;
};

export const auth = {
  async signIn(email: string, password: string): Promise<{ 
    error: AuthError | null;
    session?: any;
  }> {
    try {
      // Clean up any existing sessions first
      await supabase.auth.signOut();

      // Attempt to sign in
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password
      });

      if (error) {
        console.error('Supabase auth error:', error);
        throw new Error(error.message);
      }

      if (!data?.session) {
        throw new Error('No session created');
      }

      return { 
        error: null,
        session: data.session
      };
    } catch (error) {
      console.error('Sign in error:', error);
      return {
        error: {
          message: error instanceof Error 
            ? error.message 
            : 'Invalid email or password. Please try again.',
          code: 'auth_failed'
        }
      };
    }
  },

  async getSession() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      return session;
    } catch (error) {
      console.error('Get session error:', error);
      return null;
    }
  },

  async refreshSession() {
    try {
      const { data: { session }, error } = await supabase.auth.refreshSession();
      if (error) throw error;
      return session;
    } catch (error) {
      console.error('Refresh session error:', error);
      return null;
    }
  },

  async signOut(): Promise<{ error: AuthError | null }> {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Clear any stored auth data
      localStorage.removeItem('auth-storage');
      localStorage.removeItem('supabase.auth.token');
      
      return { error: null };
    } catch (error) {
      return {
        error: {
          message: error instanceof Error ? error.message : 'Failed to sign out',
          code: 'signout_failed'
        }
      };
    }
  }
};