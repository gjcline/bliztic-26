import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { FloatingPaths } from '../components/ui/floating-paths';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';

const PartnerLogin: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError("We couldn't find your account. Please book a call with us to set up your partner access.");
      setLoading(false);
      return;
    }

    navigate('/partner');
  };

  return (
    <div className="min-h-screen bg-[#030303] flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />

        <div className="absolute inset-0">
          <FloatingPaths position={1} />
          <FloatingPaths position={-1} />
        </div>

        <div className="relative z-10 w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={cn(
              "p-8 rounded-2xl",
              "bg-[#0a0a0a]/40 backdrop-blur-sm",
              "border border-white/5",
              "transform transition-all duration-500",
              "hover:bg-[#0a0a0a]/60 hover:border-white/10",
              "hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
            )}
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/5 border border-white/10 mb-4">
                <Lock className="h-7 w-7 text-white/80" />
              </div>
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80">
                Partner Login
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "p-4 rounded-lg",
                    "bg-white/5 border border-white/10",
                    "text-white/80"
                  )}
                >
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-white/60 mt-0.5 mr-3 flex-shrink-0" />
                    <p>
                      {error}{' '}
                      <Link
                        to="/qualify"
                        className="text-white underline hover:text-white/80"
                      >
                        Book a call
                      </Link>{' '}
                      to get started.
                    </p>
                  </div>
                </motion.div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/60 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className={cn(
                    "w-full p-3 rounded-lg",
                    "bg-white/5 border border-white/10",
                    "text-white placeholder-white/40",
                    "focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20",
                    "transition-all duration-300"
                  )}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white/60 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className={cn(
                    "w-full p-3 rounded-lg",
                    "bg-white/5 border border-white/10",
                    "text-white placeholder-white/40",
                    "focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20",
                    "transition-all duration-300"
                  )}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={cn(
                  "w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium",
                  "bg-white text-[#030303]",
                  "transform transition-all duration-300",
                  "hover:opacity-90 disabled:opacity-60"
                )}
              >
                {loading ? 'Signing in...' : <>Sign In <ArrowRight className="h-4 w-4" /></>}
              </button>
            </form>
          </motion.div>

          {/* Partnership Section */}
          <div className="mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={cn(
                "p-8 rounded-2xl",
                "bg-[#0a0a0a]/40 backdrop-blur-sm",
                "border border-white/5",
                "transform transition-all duration-500",
                "hover:bg-[#0a0a0a]/60 hover:border-white/10",
                "hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
              )}
            >
              <h3 className="text-xl font-bold text-white mb-4">
                Become a Partner
              </h3>
              <p className="text-white/60 mb-6">
                Join our partner network and unlock exclusive benefits.
              </p>
              <Link
                to="/qualify"
                className={cn(
                  "inline-flex items-center",
                  "px-6 py-3 rounded-lg",
                  "bg-white/5 hover:bg-white/10",
                  "border border-white/10",
                  "text-white font-medium",
                  "transform transition-all duration-300",
                  "hover:border-white/20 group"
                )}
              >
                Book a Call <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerLogin;
