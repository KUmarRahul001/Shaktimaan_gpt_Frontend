import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bot, Loader2, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { auth } from '../lib/auth';
import { useAuth } from '../store/auth';
import { cn } from '../lib/utils';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await auth.getSession();
        if (session?.user) {
          navigate('/chat');
        }
      } catch (error) {
        console.error('Session check failed:', error);
      }
    };
    checkSession();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await auth.signOut();
      const { error: authError, session } = await auth.signIn(email, password);
      
      if (authError) {
        setError(authError.message);
        return;
      }

      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
          name: session.user.user_metadata.name || email.split('@')[0],
        });
        navigate('/chat');
      } else {
        throw new Error('No session created');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="flex min-h-screen">
        {/* Left Section - Login Form */}
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-md">
            <div className="flex justify-center">
              <Link to="/" className="flex items-center space-x-2">
                <Bot className="h-10 w-10 text-primary" />
                <span className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  ShaktiMaanGPT
                </span>
              </Link>
            </div>

            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
              Welcome back
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
              Enter your credentials to access your account
            </p>

            {/* Mobile Signup Button - Only visible on mobile */}
            <div className="mt-4 lg:hidden text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Don't have an account?
              </p>
              <Link
                to="/register"
                className={cn(
                  "inline-flex items-center justify-center px-6 py-2",
                  "bg-gradient-to-r from-primary via-secondary to-accent",
                  "text-white font-medium rounded-lg",
                  "hover:opacity-90 transition-opacity",
                  "group"
                )}
              >
                Create an account
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {error && (
              <div className="mt-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-900 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 mr-2" />
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleLogin} className="mt-8 space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email address
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={cn(
                        "block w-full px-4 py-3 border rounded-lg",
                        "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
                        "dark:bg-gray-800 dark:border-gray-700 dark:text-white",
                        "pl-11" // Space for icon
                      )}
                      placeholder="Enter your email"
                    />
                    <Mail className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={cn(
                        "block w-full px-4 py-3 border rounded-lg",
                        "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
                        "dark:bg-gray-800 dark:border-gray-700 dark:text-white",
                        "pl-11" // Space for icon
                      )}
                      placeholder="Enter your password"
                    />
                    <Lock className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Remember me
                  </label>
                </div>

                <Link
                  to="/reset-password"
                  className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={cn(
                  "w-full flex items-center justify-center px-4 py-3 border border-transparent",
                  "text-white font-medium rounded-lg",
                  "bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",
                  "transition-colors duration-200",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  "dark:focus:ring-offset-gray-900"
                )}
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  'Sign in'
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Section - Sign Up CTA */}
        <div className="hidden lg:flex lg:flex-1 lg:flex-col lg:justify-center lg:relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent opacity-10" />
          <div className="relative px-12 py-24 text-center">
            <h2 className="text-4xl font-extrabold text-white mb-6">
              New to ShaktiMaanGPT?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-md mx-auto">
              Join our community and experience the next generation of AI-powered conversations.
              Sign up now to get started!
            </p>
            <Link
              to="/register"
              className={cn(
                "inline-flex items-center px-8 py-3 border-2 border-white text-white",
                "rounded-lg text-lg font-medium",
                "hover:bg-white hover:text-primary",
                "transition-all duration-200",
                "group"
              )}
            >
              Create an account
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <div className="mt-12">
              <div className="grid grid-cols-1 gap-8 max-w-md mx-auto">
                {[
                  {
                    title: "Free to Start",
                    description: "No credit card required. Try all features free for 14 days."
                  },
                  {
                    title: "Smart AI Chat",
                    description: "Experience natural conversations with our advanced AI."
                  },
                  {
                    title: "Secure & Private",
                    description: "Your data is protected with enterprise-grade security."
                  }
                ].map((feature, index) => (
                  <div key={index} className="text-left bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-white/80">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}