import React from 'react';
import { MessageSquare, Shield, Sparkles, Bot, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Layout, Container, Paper } from '../components/Layout';
import { Logo } from '../components/Logo';
import { ThemeToggle } from '../components/ThemeToggle';

export default function FeaturesPage() {
  return (
    <Layout className="bg-gradient-to-br from-background via-background to-primary/5">
      <Container>
        <nav className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center space-x-2">
            <Logo size="md" />
          </Link>
          <ThemeToggle />
        </nav>

        <Paper className="mt-8">
          <div className="max-w-4xl mx-auto px-4 py-12">
            <Link
              to="/"
              className="inline-flex items-center text-gray-600 hover:text-primary mb-8"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>

            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
              Features
            </h1>

            <div className="space-y-12">
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                  Core Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    {
                      icon: <Bot className="h-8 w-8 text-primary" />,
                      title: "Advanced AI Chat",
                      description: "Experience natural conversations with our state-of-the-art language model."
                    },
                    {
                      icon: <Shield className="h-8 w-8 text-secondary" />,
                      title: "Enterprise Security",
                      description: "Bank-grade encryption and security measures to protect your data."
                    },
                    {
                      icon: <Sparkles className="h-8 w-8 text-accent" />,
                      title: "Smart Responses",
                      description: "Context-aware responses that understand and remember conversation history."
                    },
                    {
                      icon: <MessageSquare className="h-8 w-8 text-primary" />,
                      title: "Multi-Platform Support",
                      description: "Access your conversations from any device, anywhere."
                    }
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 p-6 bg-white/50 dark:bg-gray-800/50 rounded-lg"
                    >
                      <div className="flex-shrink-0">{feature.icon}</div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                  Premium Features
                </h2>
                <div className="space-y-4">
                  {[
                    "Custom AI model training for your specific needs",
                    "Priority support with 24/7 availability",
                    "Advanced analytics and insights",
                    "Team collaboration tools",
                    "API access for custom integrations"
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg"
                    >
                      <Sparkles className="h-5 w-5 text-primary" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </Paper>
      </Container>
    </Layout>
  );
}