import React from 'react';
import { Layout, Container, Paper } from '../../components/Layout';

export default function TermsConditions() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  const version = "1.0.0";

  return (
    <Layout>
      <Container>
        <Paper className="prose dark:prose-invert max-w-none py-8 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-8">
              <p>Version: {version}</p>
              <p>Last Updated: {lastUpdated}</p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
              <p>
                By accessing or using ShaktiMaanGPT, you agree to be bound by these Terms and Conditions and our Privacy Policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Intellectual Property</h2>
              <p>
                All content, features, and functionality are owned by ShaktiMaanGPT and are protected by international copyright, trademark, and other intellectual property laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. User Conduct</h2>
              <p>You agree not to:</p>
              <ul className="list-disc pl-6">
                <li>Use the service for any illegal purpose</li>
                <li>Attempt to gain unauthorized access</li>
                <li>Interfere with the proper working of the service</li>
                <li>Engage in any automated use of the system</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Limitation of Liability</h2>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL SHAKTIMAANGPT BE LIABLE FOR ANY INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Termination</h2>
              <p>
                We reserve the right to terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason whatsoever.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Changes to Terms</h2>
              <p>
                We reserve the right to modify or replace these Terms at any time. Changes will be effective immediately upon posting to the Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Contact</h2>
              <p>
                Questions about the Terms should be sent to us at:
                <br />
                Email: legal@shaktimaangpt.com
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