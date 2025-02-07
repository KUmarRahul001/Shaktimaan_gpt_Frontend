import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMessages, type Message } from '../store/messages';
import { useProfile } from '../store/profile';
import { useAuth } from '../store/auth';
import { Bot, Loader2, Send, Plus, Trash2, Settings, LogOut, User, Mail } from 'lucide-react';
import { cn } from '../lib/utils';
import { ThemeToggle } from '../components/ThemeToggle';
import { MessageBubble } from '../components/MessageBubble';
import { TypingIndicator } from '../components/TypingIndicator';
import { auth } from '../lib/auth';

export default function ChatPage() {
  const navigate = useNavigate();
  const {
    chats,
    currentChatId,
    isLoading,
    createChat,
    addMessage,
    updateMessage,
    setCurrentChat,
    deleteChat,
    getCurrentChat,
    fetchChats,
    formatMessageDate
  } = useMessages();

  const { profile, fetchProfile } = useProfile();
  const { logout } = useAuth();
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [currentMessages, setCurrentMessages] = useState<Message[]>([]);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  // Check and refresh session if needed
  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await auth.getSession();
        if (!session) {
          const refreshedSession = await auth.refreshSession();
          if (!refreshedSession) {
            navigate('/login');
          }
        }
      } catch (error) {
        console.error('Session check failed:', error);
        navigate('/login');
      }
    };
    checkSession();
  }, [navigate]);

  useEffect(() => {
    fetchChats();
    fetchProfile();
  }, [fetchChats, fetchProfile]);

  useEffect(() => {
    if (currentChatId) {
      getCurrentChat().then((data) => {
        if (data) {
          setCurrentMessages(data.messages);
        }
      });
    } else {
      setCurrentMessages([]);
    }
  }, [currentChatId, getCurrentChat]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentMessages]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isSending) return;

    setIsSending(true);
    setError(null);

    try {
      // Check session before sending
      const session = await auth.getSession();
      if (!session) {
        const refreshedSession = await auth.refreshSession();
        if (!refreshedSession) {
          throw new Error('Session expired. Please log in again.');
        }
      }

      const chatId = currentChatId || await createChat();
      
      const messageId = await addMessage(chatId, {
        content: message.trim(),
        role: 'user',
        status: 'sending',
      });

      await updateMessage(chatId, messageId, { status: 'sent' });

      const updated = await getCurrentChat();
      if (updated) {
        setCurrentMessages(updated.messages);
      }

      setMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
      setError(error instanceof Error ? error.message : 'Failed to send message');
      
      if (error instanceof Error && error.name === 'AuthSessionMissingError') {
        navigate('/login');
      }
    } finally {
      setIsSending(false);
    }
  };

  const handleNewChat = async () => {
    try {
      await createChat();
      setError(null);
    } catch (error) {
      console.error('Failed to create chat:', error);
      setError('Failed to create new chat');
    }
  };

  const handleDeleteChat = async (chatId: string) => {
    try {
      await deleteChat(chatId);
      setError(null);
    } catch (error) {
      console.error('Failed to delete chat:', error);
      setError('Failed to delete chat');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      setError('Failed to log out');
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Bot className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                ShaktimaanGPT
              </span>
            </div>
            <div className="flex items-center">
              <ThemeToggle />
            </div>
          </div>
          
          <button
            onClick={handleNewChat}
            className={cn(
              "w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg",
              "bg-purple-600 text-white hover:bg-purple-700 transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2",
              "dark:focus:ring-offset-gray-800"
            )}
          >
            <Plus className="h-5 w-5" />
            New Chat
          </button>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-6 w-6 animate-spin text-purple-600" />
            </div>
          ) : (
            <div className="space-y-1 p-2">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  className={cn(
                    "flex items-center justify-between p-2 rounded-lg cursor-pointer",
                    "hover:bg-gray-100 dark:hover:bg-gray-700",
                    currentChatId === chat.id && "bg-purple-50 dark:bg-purple-900/50"
                  )}
                  onClick={() => setCurrentChat(chat.id)}
                >
                  <span className="truncate text-sm text-gray-700 dark:text-gray-300">
                    {chat.title}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteChat(chat.id);
                    }}
                    className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    <Trash2 className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Profile Section */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="relative" ref={profileMenuRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={profile.name}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <User className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                )}
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {profile?.name}
                </p>
              </div>
            </button>

            {showProfileMenu && (
              <div className="absolute bottom-full left-0 mb-2 w-full rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                <div className="py-1">
                  <Link
                    to="/settings"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Link>
                  <Link
                    to="/contact"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Contact Us
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Error Display */}
        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/30 border-b border-red-200 dark:border-red-900">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {currentMessages.map((msg) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              formatDate={formatMessageDate}
            />
          ))}
          {isSending && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message ShaktimaanGPT..."
                className={cn(
                  "flex-1 rounded-lg border border-gray-300 dark:border-gray-600",
                  "px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500",
                  "bg-white dark:bg-gray-800 text-gray-900 dark:text-white",
                  "placeholder-gray-500 dark:placeholder-gray-400"
                )}
              />
              <button
                type="submit"
                disabled={!message.trim() || isSending}
                className={cn(
                  "flex items-center justify-center p-2 rounded-lg",
                  "bg-purple-600 text-white hover:bg-purple-700 transition-colors",
                  "focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  "dark:focus:ring-offset-gray-900"
                )}
              >
                {isSending ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}