import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    marketingConsent: false,
    privacyConsent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Implement form submission logic here
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Legal Notice */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
        <p className="mb-2">
          By submitting this form, you acknowledge that your information will be processed in accordance with our{' '}
          <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
        </p>
        <p>
          Data Retention: Your information will be retained for up to 24 months or as required by applicable laws.
        </p>
      </div>

      {/* Form Fields */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Name *
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className={cn(
            "w-full px-4 py-2 rounded-lg border",
            "focus:ring-2 focus:ring-primary focus:border-transparent",
            "dark:bg-gray-800 dark:border-gray-700"
          )}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Email *
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          className={cn(
            "w-full px-4 py-2 rounded-lg border",
            "focus:ring-2 focus:ring-primary focus:border-transparent",
            "dark:bg-gray-800 dark:border-gray-700"
          )}
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Message *
        </label>
        <textarea
          id="message"
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
          className={cn(
            "w-full px-4 py-2 rounded-lg border",
            "focus:ring-2 focus:ring-primary focus:border-transparent",
            "dark:bg-gray-800 dark:border-gray-700"
          )}
        />
      </div>

      {/* Consent Checkboxes */}
      <div className="space-y-4">
        <div className="flex items-start">
          <input
            type="checkbox"
            id="privacyConsent"
            required
            checked={formData.privacyConsent}
            onChange={(e) => setFormData(prev => ({ ...prev, privacyConsent: e.target.checked }))}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <label htmlFor="privacyConsent" className="ml-2 block text-sm text-gray-600 dark:text-gray-400">
            I consent to the processing of my personal data as described in the Privacy Policy *
          </label>
        </div>

        <div className="flex items-start">
          <input
            type="checkbox"
            id="marketingConsent"
            checked={formData.marketingConsent}
            onChange={(e) => setFormData(prev => ({ ...prev, marketingConsent: e.target.checked }))}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <label htmlFor="marketingConsent" className="ml-2 block text-sm text-gray-600 dark:text-gray-400">
            I would like to receive marketing communications about products and services (optional)
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          "w-full flex items-center justify-center gap-2",
          "px-6 py-3 rounded-lg",
          "bg-primary text-white",
          "hover:bg-primary/90 transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-5 w-5" />
            Send Message
          </>
        )}
      </button>

      {/* Legal Disclaimer */}
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
        * Required fields. By clicking "Send Message", you confirm that you have read and agree to our{' '}
        <a href="/terms" className="text-primary hover:underline">Terms & Conditions</a> and{' '}
        <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
      </p>
    </form>
  );
}