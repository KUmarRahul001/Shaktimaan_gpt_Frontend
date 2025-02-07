import React from 'react';
import { Layout, Container, Paper } from '../../components/Layout';

export default function PrivacyPolicy() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  const version = "1.0.0";

  return (
    <Layout>
      <Container>
        <Paper className="prose dark:prose-invert max-w-none py-8 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-8">
              <p>Version: {version}</p>
              <p>Last Updated: {lastUpdated}</p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p>
                ShaktiMaanGPT ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Data Collection and Usage</h2>
              <h3 className="text-xl font-medium mb-3">2.1 Information We Collect</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>Account information (email, name, profile data)</li>
                <li>Chat history and interactions</li>
                <li>Usage data and analytics</li>
                <li>Device and browser information</li>
              </ul>

              <h3 className="text-xl font-medium mb-3">2.2 Cookies and Tracking</h3>
              <p>
                We use cookies and similar tracking technologies to enhance your experience. You can control cookie preferences through your browser settings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. GDPR Compliance</h2>
              <p>For users in the European Economic Area (EEA), we process personal data based on:</p>
              <ul className="list-disc pl-6">
                <li>Consent</li>
                <li>Contractual necessity</li>
                <li>Legal obligations</li>
                <li>Legitimate interests</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. CCPA Compliance</h2>
              <p>California residents have the right to:</p>
              <ul className="list-disc pl-6">
                <li>Know what personal data is collected</li>
                <li>Delete personal data</li>
                <li>Opt-out of data sales</li>
                <li>Non-discrimination for exercising rights</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal data, including encryption and secure data storage.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. International Transfers</h2>
              <p>
                Your data may be transferred to and processed in countries outside your residence. We ensure appropriate safeguards are in place for such transfers.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6">
                <li>Access your personal data</li>
                <li>Rectify inaccurate data</li>
                <li>Request data deletion</li>
                <li>Object to processing</li>
                <li>Data portability</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
              <p>
                For privacy-related inquiries, contact our Data Protection Officer at:
                <br />
                Email: privacy@shaktimaangpt.com
                <br />
                Address: 123 AI Street, Tech Valley, CA 94025
              </p>
            </section>
          </div>
        </Paper>
      </Container>
    </Layout>
  );
}