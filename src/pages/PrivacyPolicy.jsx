import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans p-6 lg:p-12">
      <div className="max-w-3xl mx-auto">
        <Link 
          to="/login" 
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to Login
        </Link>
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 lg:p-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">Privacy Policy</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Last updated: July 15, 2026</p>
          
          <div className="space-y-8 text-gray-600 dark:text-gray-300 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">1. Information We Collect</h2>
              <p>
                When you use the Nursoid Educational Management system, we collect information that you provide directly to us, such as when you create or modify your account, contact customer support, or otherwise communicate with us. This information may include your name, email address, phone number, and any other information you choose to provide.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">2. How We Use Your Information</h2>
              <p>
                We use the information we collect to provide, maintain, and improve our services, to process transactions, to send you related information including confirmations and invoices, and to provide customer service and support. We also use the information to monitor and analyze trends, usage, and activities in connection with our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">3. Data Security</h2>
              <p>
                We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction. We use industry-standard encryption protocols (like SSL/TLS) to secure data during transmission.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">4. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:privacy@nursoid.edu" className="text-blue-600 hover:underline">privacy@nursoid.edu</a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
