import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const TermsOfService = () => {
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">Terms of Service</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Last updated: July 15, 2026</p>
          
          <div className="space-y-8 text-gray-600 dark:text-gray-300 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using the Nursoid Educational Management platform, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">2. User Account and Security</h2>
              <p>
                To access most features of the platform, you must register for an account. You are responsible for maintaining the confidentiality of your account and password, and you agree to accept responsibility for all activities that occur under your account or password.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">3. Acceptable Use Policy</h2>
              <p>
                You agree not to use the service in any way that violates any applicable local, national, or international law or regulation. You also agree not to interfere with or disrupt the servers or networks connected to the service, or disobey any requirements, procedures, policies, or regulations of networks connected to the service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">4. Modifications to Service</h2>
              <p>
                Nursoid reserves the right at any time and from time to time to modify or discontinue, temporarily or permanently, the service (or any part thereof) with or without notice. You agree that Nursoid shall not be liable to you or to any third party for any modification, suspension, or discontinuance of the service.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
