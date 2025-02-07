import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Shield, Sparkles, ArrowRight, Bot, Mail, Phone, MapPin, Globe2, Users, Trophy } from 'lucide-react';
import { Layout, Paper, Grid, Container } from '../components/Layout';
import { Logo } from '../components/Logo';
import { ThemeToggle } from '../components/ThemeToggle';
import { ContactForm } from '../components/ContactForm';

export default function LandingPage() {
  return (
    <Layout className="bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <Container>
        <nav className="relative flex flex-col lg:flex-row items-center justify-between gap-6 py-4 md:py-6 lg:py-8">
          {/* Logo - Full width on mobile, auto on larger screens */}
          <div className="w-full lg:w-auto flex justify-center lg:justify-start">
            <Logo size="lg" className="transform scale-90 md:scale-100" />
          </div>

          {/* Navigation and Actions Container */}
          <div className="w-full lg:w-auto flex flex-col md:flex-row items-center gap-6">
            {/* Navigation Links */}
            <div className="flex items-center gap-4 md:gap-8 text-sm md:text-base order-2 md:order-1">
              <Link to="/features" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors px-2">Features</Link>
              <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors px-2">About</Link>
              <Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors px-2">Contact</Link>
            </div>

            {/* Theme Toggle and CTA Button */}
            <div className="flex items-center gap-4 md:gap-6 order-1 md:order-2">
              <ThemeToggle />
              <Link 
                to="/login"
                className="btn-gradient group min-w-[120px] md:min-w-[140px] h-10 md:h-11 flex items-center justify-center text-sm md:text-base px-4 md:px-6"
              >
                Get Started
                <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </nav>
      </Container>

      {/* Hero Section */}
      <Container>
        <Paper className="relative overflow-hidden mt-8 md:mt-12 lg:mt-16">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent dark:from-primary/10" />
          <div className="relative text-center max-w-4xl mx-auto space-y-6 md:space-y-8 py-12 md:py-16 lg:py-20 px-4 md:px-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight">
              Your AI-Powered Conversation Partner
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
              Experience the future of communication with our advanced chatbot powered by cutting-edge AI. 
              Get instant responses, personalized interactions, and seamless support.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 px-4">
              <Link
                to="/register"
                className="btn-gradient group h-12 md:h-14 flex items-center justify-center text-base md:text-lg"
              >
                Start Chatting Now
                <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
              <button className="btn-gradient-outline group h-12 md:h-14 flex items-center justify-center text-base md:text-lg">
                Watch Demo
                <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </Paper>
      </Container>

      {/* Features Section */}
      <Container>
        <Paper className="py-12 md:py-16 lg:py-20 relative overflow-hidden mt-8 md:mt-12 lg:mt-16" id="features">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent dark:from-secondary/10" />
          <div className="relative">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-12 md:mb-16 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Why Choose ShaktiMaanGPT?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 px-4 md:px-6">
              {[
                {
                  icon: <Sparkles className="h-8 w-8 text-white" />,
                  title: "AI-Powered Intelligence",
                  description: "Leverage the power of advanced AI for natural and intelligent conversations."
                },
                {
                  icon: <MessageSquare className="h-8 w-8 text-white" />,
                  title: "Real-time Chat",
                  description: "Instant responses and seamless communication with zero latency."
                },
                {
                  icon: <Shield className="h-8 w-8 text-white" />,
                  title: "Secure & Private",
                  description: "Enterprise-grade security with end-to-end encryption for your conversations."
                }
              ].map((feature, index) => (
                <Paper key={index} className="text-center p-6 md:p-8 hover:scale-105 transition-transform duration-300">
                  <div className="relative mb-6">
                    <div className="w-14 h-14 md:w-16 md:h-16 mx-auto rounded-xl btn-gradient flex items-center justify-center">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {feature.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </Paper>
              ))}
            </div>
          </div>
        </Paper>
      </Container>

      {/* About Section */}
      <Container>
        <Paper className="py-12 md:py-16 lg:py-20 relative overflow-hidden mt-8 md:mt-12 lg:mt-16" id="about">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent dark:from-accent/10" />
          <div className="relative px-4 md:px-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              About ShaktiMaanGPT
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
              <div className="space-y-6">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">
                  Our Mission
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  At ShaktiMaanGPT, we're dedicated to revolutionizing human-AI interaction through cutting-edge technology and intuitive design. Our mission is to make AI accessible, helpful, and engaging for everyone.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                    <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">100K+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Active Users</div>
                  </div>
                  <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                    <Globe2 className="h-8 w-8 text-secondary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">50+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Countries</div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">
                  Why We're Different
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      icon: <Bot className="h-6 w-6 text-primary" />,
                      title: "Advanced AI Technology",
                      description: "Powered by state-of-the-art language models"
                    },
                    {
                      icon: <Shield className="h-6 w-6 text-secondary" />,
                      title: "Privacy First",
                      description: "Your data is always protected and secure"
                    },
                    {
                      icon: <Trophy className="h-6 w-6 text-accent" />,
                      title: "Award-Winning Support",
                      description: "24/7 customer service and technical assistance"
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                      <div className="flex-shrink-0">{item.icon}</div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{item.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Paper>
      </Container>

      {/* Contact Section */}
      <Container>
        <Paper className="py-12 md:py-16 lg:py-20 relative overflow-hidden mt-8 md:mt-12 lg:mt-16" id="contact">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent dark:from-primary/10" />
          <div className="relative px-4 md:px-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Get in Touch
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <span className="text-gray-600 dark:text-gray-300">support@shaktimaangpt.com</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-secondary" />
                      <span className="text-gray-600 dark:text-gray-300">+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-accent" />
                      <span className="text-gray-600 dark:text-gray-300">123 AI Street, Tech Valley, CA 94025</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Office Hours
                  </h3>
                  <div className="space-y-2 text-gray-600 dark:text-gray-300">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM (PST)</p>
                    <p>Saturday: 10:00 AM - 4:00 PM (PST)</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
              <div>
                <ContactForm />
              </div>
            </div>
          </div>
        </Paper>
      </Container>

      {/* Footer */}
      <Container>
        <Paper className="mt-8 md:mt-12 lg:mt-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent dark:from-accent/10" />
          <div className="relative p-6 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <Logo size="sm" />
              <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                <Link to="/privacy" className="text-sm md:text-base text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">Privacy</Link>
                <Link to="/terms" className="text-sm md:text-base text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">Terms</Link>
                <Link to="/contact" className="text-sm md:text-base text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">Contact</Link>
              </div>
            </div>
            <div className="text-center mt-6 md:mt-8 text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} ShaktiMaanGPT. All rights reserved.
            </div>
          </div>
        </Paper>
      </Container>
    </Layout>
  );
}