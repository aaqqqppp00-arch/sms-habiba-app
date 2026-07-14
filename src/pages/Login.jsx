import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, X, CheckCircle } from 'lucide-react';

const Login = ({ setAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [isSendingReset, setIsSendingReset] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!resetEmail) return;
    setIsSendingReset(true);
    // Simulate API
    setTimeout(() => {
      setIsSendingReset(false);
      setResetSent(true);
      setTimeout(() => {
        setIsForgotModalOpen(false);
        setResetSent(false);
        setResetEmail('');
      }, 3000);
    }, 1000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setAuth(true);
      navigate('/dashboard');
    }, 800);
  };

  return (
    <div className="flex min-h-screen bg-white font-sans selection:bg-zinc-200">
      {/* Left Panel - Brand Area */}
      <div className="relative hidden lg:flex flex-col justify-between w-1/2 bg-zinc-950 px-16 py-20 overflow-hidden">
        {/* Subtle radial glow effect & Grid Texture */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-zinc-800/40 via-zinc-950/0 to-zinc-950/0 pointer-events-none z-0"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0 opacity-50 mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 rounded-xl bg-white text-zinc-950 flex items-center justify-center font-bold text-lg tracking-tighter">
              DE
            </div>
            <span className="text-white font-semibold text-xl tracking-tight">DEPI SMS</span>
          </div>

          <div className="max-w-md">
            <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-tight leading-[1.1] mb-6">
              The modern standard for educational management.
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed font-medium">
              Streamline your institution's operations with our precision-engineered platform. Built for performance, designed for clarity.
            </p>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-4 text-zinc-500 text-sm font-medium">
          <span>&copy; 2024 DEPI Initiative</span>
          <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
          <a href="#" className="hover:text-zinc-300 transition-colors">Privacy Policy</a>
          <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
          <a href="#" className="hover:text-zinc-300 transition-colors">Terms of Service</a>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-white">
        <div className="w-full max-w-sm">
          {/* Mobile Logo */}
          <div className="flex lg:hidden items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-zinc-950 text-white flex items-center justify-center font-bold text-lg tracking-tighter">
              DE
            </div>
            <span className="text-zinc-950 font-semibold text-xl tracking-tight">DEPI SMS</span>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-zinc-950 tracking-tight mb-2">Sign in to your account</h2>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-700" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-none text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 transition-all shadow-sm"
                  placeholder="admin@depi.edu"
                />
              </div>
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-zinc-700" htmlFor="password">
                  Password
                </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-11 py-2.5 bg-white border border-gray-200 rounded-none text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 transition-all shadow-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Forgot Password and Remember Me */}
            <div className="flex flex-col items-start gap-4 mt-2">
              <button 
                type="button" 
                onClick={() => setIsForgotModalOpen(true)}
                className="text-sm font-medium text-zinc-900 hover:underline transition-colors self-end"
              >
                Forgot password?
              </button>
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-zinc-900 focus:ring-zinc-900 accent-zinc-900"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-zinc-700">
                  Remember me for 30 days
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-zinc-950 hover:bg-zinc-800 text-white text-sm font-medium rounded-none shadow-[0_2px_10px_-3px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_14px_-4px_rgba(0,0,0,0.3)] transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? (
                <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-zinc-500">
              Don't have an account?{' '}
              <a href="#" className="font-medium text-zinc-900 hover:underline underline-offset-4">
                Contact IT Support
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 md:p-6 border-b border-zinc-100">
              <h3 className="text-lg font-semibold text-zinc-900">Reset Password</h3>
              <button 
                onClick={() => setIsForgotModalOpen(false)}
                className="p-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleForgotPassword}>
              <div className="p-6 md:p-8">
                {resetSent ? (
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-4">
                      <CheckCircle size={24} />
                    </div>
                    <h4 className="text-lg font-medium text-zinc-900 mb-2">Check your email</h4>
                    <p className="text-sm text-zinc-500">
                      We've sent password reset instructions to <span className="font-medium text-zinc-900">{resetEmail}</span>
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-zinc-600 mb-6">
                      Enter the email address associated with your account and we'll send you a link to reset your password.
                    </p>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-zinc-700">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                        <input
                          type="email"
                          required
                          value={resetEmail}
                          onChange={(e) => setResetEmail(e.target.value)}
                          className="w-full pl-11 pr-4 py-2.5 bg-white border border-zinc-200 rounded-none text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 transition-all shadow-sm"
                          placeholder="admin@depi.edu"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>

              {!resetSent && (
                <div className="p-5 md:p-6 bg-zinc-50 border-t border-zinc-100 flex justify-end gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsForgotModalOpen(false)}
                    className="px-5 py-2.5 text-sm font-medium text-zinc-700 bg-white border border-zinc-300 rounded-none hover:bg-zinc-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={!resetEmail || isSendingReset}
                    className="px-5 py-2.5 text-sm font-medium text-white bg-zinc-950 rounded-none hover:bg-zinc-800 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isSendingReset ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Send Reset Link'
                    )}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
