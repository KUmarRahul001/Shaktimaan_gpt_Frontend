import React from 'react';
import { Mail, Phone, MapPin, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { Layout, Container, Paper } from '../components/Layout';
import { Logo } from '../components/Logo';
import { ThemeToggle } from '../components/ThemeToggle';

export default function ContactPage() {
  return (
    <Layout className="bg-gradient-to-br from-background via-background to-primary/5">
      <Container>
        {/* Navigation */}
        <nav className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center space-x-2">
            <Logo size="md" />
          </Link>
          <ThemeToggle />
        </nav>

        <Paper className="mt-8">
          <div className="max-w-4xl mx-auto px-4 py-12">
            {/* Back Button */}
            <Link
              to="/"
              className="inline-flex items-center text-gray-600 hover:text-primary mb-8"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>

            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Contact Us
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Get in Touch
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    <span className="text-gray-600 dark:text-gray-300">support@shaktimaangpt.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    <span className="text-gray-600 dark:text-gray-300">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    <span className="text-gray-600 dark:text-gray-300">123 AI Street, Tech Valley, CA 94025</span>
                  </div>
                </div>
              </div>

              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className={cn(
                      "mt-1 block w-full rounded-md border-gray-300 shadow-sm",
                      "focus:border-purple-500 focus:ring-purple-500 sm:text-sm",
                      "dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    )}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className={cn(
                      "mt-1 block w-full rounded-md border-gray-300 shadow-sm",
                      "focus:border-purple-500 focus:ring-purple-500 sm:text-sm",
                      "dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    )}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className={cn(
                      "mt-1 block w-full rounded-md border-gray-300 shadow-sm",
                      "focus:border-purple-500 focus:ring-purple-500 sm:text-sm",
                      "dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    )}
                  />
                </div>

                <button
                  type="submit"
                  className={cn(
                    "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white",
                    "bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500",
                    "dark:focus:ring-offset-gray-900"
                  )}
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </Paper>
      </Container>
    </Layout>
  );
}