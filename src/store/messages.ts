import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { useAuth } from './auth';
import { geminiService } from '../lib/gemini';
import { formatDistanceToNow } from 'date-fns';
import { auth } from '../lib/auth';

export type Message = {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  status: 'sending' | 'sent' | 'error';
  created_at: string;
  chat_id: string;
};

export type Chat = {
  id: string;
  title: string;
  created_at: string;
  user_id: string;
};

type MessagesStore = {
  chats: Chat[];
  currentChatId: string | null;
  isLoading: boolean;
  error: string | null;
  createChat: () => Promise<string>;
  addMessage: (chatId: string, message: Pick<Message, 'content' | 'role' | 'status'>) => Promise<string>;
  updateMessage: (chatId: string, messageId: string, updates: Partial<Message>) => Promise<void>;
  setCurrentChat: (chatId: string) => void;
  deleteChat: (chatId: string) => Promise<void>;
  getCurrentChat: () => Promise<{ chat: Chat; messages: Message[] } | null>;
  fetchChats: () => Promise<void>;
  formatMessageDate: (date: string) => string;
};

export const useMessages = create<MessagesStore>()((set, get) => ({
  chats: [],
  currentChatId: null,
  isLoading: false,
  error: null,

  createChat: async () => {
    const { user } = useAuth.getState();
    if (!user) throw new Error('User not authenticated');

    try {
      // Ensure session is valid
      const session = await auth.getSession();
      if (!session) {
        // Try to refresh the session
        const refreshedSession = await auth.refreshSession();
        if (!refreshedSession) {
          throw new Error('Session expired. Please log in again.');
        }
      }

      const { data: chat, error } = await supabase
        .from('chats')
        .insert([{ user_id: user.id }])
        .select()
        .single();

      if (error) throw error;

      set((state) => ({
        chats: [chat, ...state.chats],
        currentChatId: chat.id,
      }));

      return chat.id;
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to create chat' });
      throw error;
    }
  },

  addMessage: async (chatId, message) => {
    try {
      const { data: newMessage, error } = await supabase
        .from('messages')
        .insert([{ ...message, chat_id: chatId }])
        .select()
        .single();

      if (error) throw error;

      if (message.role === 'user') {
        try {
          const aiResponse = await geminiService.generateResponse(message.content);
          await supabase
            .from('messages')
            .insert([{
              content: aiResponse,
              role: 'assistant',
              status: 'sent',
              chat_id: chatId,
            }]);

          const title = message.content.slice(0, 30) + '...';
          await supabase
            .from('chats')
            .update({ title })
            .eq('id', chatId);

          set((state) => ({
            chats: state.chats.map((c) =>
              c.id === chatId ? { ...c, title } : c
            ),
          }));
        } catch (error) {
          console.error('AI response error:', error);
        }
      }

      return newMessage.id;
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to add message' });
      throw error;
    }
  },

  updateMessage: async (chatId, messageId, updates) => {
    try {
      const { error } = await supabase
        .from('messages')
        .update(updates)
        .eq('id', messageId)
        .eq('chat_id', chatId);

      if (error) throw error;
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to update message' });
      throw error;
    }
  },

  setCurrentChat: (chatId) => {
    set({ currentChatId: chatId });
  },

  deleteChat: async (chatId) => {
    try {
      const { error } = await supabase
        .from('chats')
        .delete()
        .eq('id', chatId);

      if (error) throw error;

      set((state) => ({
        chats: state.chats.filter((chat) => chat.id !== chatId),
        currentChatId: state.currentChatId === chatId ? null : state.currentChatId,
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to delete chat' });
      throw error;
    }
  },

  getCurrentChat: async () => {
    const { currentChatId } = get();
    if (!currentChatId) return null;

    try {
      const [chatResponse, messagesResponse] = await Promise.all([
        supabase
          .from('chats')
          .select()
          .eq('id', currentChatId)
          .single(),
        supabase
          .from('messages')
          .select()
          .eq('chat_id', currentChatId)
          .order('created_at', { ascending: true }),
      ]);

      if (chatResponse.error) throw chatResponse.error;
      if (messagesResponse.error) throw messagesResponse.error;

      return {
        chat: chatResponse.data,
        messages: messagesResponse.data,
      };
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch chat' });
      throw error;
    }
  },

  fetchChats: async () => {
    const { user } = useAuth.getState();
    if (!user) return;

    set({ isLoading: true });
    try {
      const { data: chats, error } = await supabase
        .from('chats')
        .select()
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      set({ chats, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch chats',
        isLoading: false,
      });
    }
  },

  formatMessageDate: (date: string) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  },
}));