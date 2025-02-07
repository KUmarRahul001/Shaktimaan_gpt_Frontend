import React from 'react';
import { Users, Globe2, Trophy, Bot, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Layout, Container, Paper } from '../components/Layout';
import { Logo } from '../components/Logo';
import { ThemeToggle } from '../components/ThemeToggle';

export default function AboutPage() {
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
              About ShaktiMaanGPT
            </h1>

            <div className="space-y-12">
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                  Our Story
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Founded in 2025, ShaktiMaanGPT emerged from a vision to make advanced AI technology accessible to everyone. Our team of experts combines decades of experience in artificial intelligence, machine learning, and user experience design to create a platform that's both powerful and intuitive.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      icon: <Users className="h-8 w-8 text-primary" />,
                      stat: "100K+",
                      label: "Active Users"
                    },
                    {
                      icon: <Globe2 className="h-8 w-8 text-secondary" />,
                      stat: "50+",
                      label: "Countries"
                    },
                    {
                      icon: <Trophy className="h-8 w-8 text-accent" />,
                      stat: "15+",
                      label: "Industry Awards"
                    }
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="text-center p-6 bg-white/50 dark:bg-gray-800/50 rounded-lg"
                    >
                      <div className="flex justify-center mb-4">{item.icon}</div>
                      <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {item.stat}
                      </div>
                      <div className="text-gray-600 dark:text-gray-300">{item.label}</div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                  Our Mission
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  At ShaktiMaanGPT, we're dedicated to revolutionizing human-AI interaction through cutting-edge technology and intuitive design. Our mission is to make AI accessible, helpful, and engaging for everyone.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      icon: <Bot className="h-6 w-6 text-primary" />,
                      title: "Innovation",
                      description: "Pushing the boundaries of AI technology to create better user experiences."
                    },
                    {
                      icon: <Users className="h-6 w-6 text-secondary" />,
                      title: "Accessibility",
                      description: "Making advanced AI tools available to users of all technical backgrounds."
                    }
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 p-6 bg-white/50 dark:bg-gray-800/50 rounded-lg"
                    >
                      <div className="flex-shrink-0">{item.icon}</div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                  Our Values
                </h2>
                <div className="space-y-4">
                  {[
                    "Innovation in AI technology",
                    "User privacy and data security",
                    "Ethical AI development",
                    "Continuous improvement",
                    "Community-driven development"
                  ].map((value, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg"
                    >
                      <Bot className="h-5 w-5 text-primary" />
                      <span className="text-gray-700 dark:text-gray-300">{value}</span>
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