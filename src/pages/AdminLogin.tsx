import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError('Invalid credentials. Please check your email and password.');
      setLoading(false);
      return;
    }

    navigate('/admin');
  }

  return (
    <div className="min-h-screen bg-[#05070D] flex flex-col items-center justify-center px-5">
      {/* Background subtle glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-600/[0.04] rounded-full blur-[120px]" />
      </div>

      <div className="relative w-full max-w-[420px]">
        {/* Logo */}
        <div className="text-center mb-10">
          <a href="/" className="inline-block text-[13px] font-bold tracking-[0.18em] uppercase text-white">
            BLIZTIC<span className="text-blue-500">.</span>
          </a>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="bg-[#0C1120] border border-white/7 rounded-2xl p-8"
        >
          <div className="flex flex-col items-center mb-7">
            <div className="w-12 h-12 rounded-full bg-blue-600/11 border border-blue-600/25 flex items-center justify-center mb-4">
              <Lock className="w-5 h-5 text-blue-300" />
            </div>
            <h1 className="text-[22px] font-semibold tracking-tight text-white">Admin Access</h1>
            <p className="text-[13.5px] text-white/40 mt-1">Bliztic internal dashboard</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3 p-3.5 bg-red-500/8 border border-red-500/20 rounded-lg mb-5"
            >
              <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
              <p className="text-[13px] text-red-300 leading-[1.55]">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/30">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@bliztic.com"
                required
                className="bg-[#111828] border border-white/7 rounded-lg px-4 py-3 text-[14px] text-white placeholder-white/20 outline-none focus:border-blue-600 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/30">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="bg-[#111828] border border-white/7 rounded-lg px-4 py-3 text-[14px] text-white placeholder-white/20 outline-none focus:border-blue-600 transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-1 flex items-center justify-center gap-2 w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white text-[14px] font-semibold rounded-lg transition-colors"
            >
              {loading ? 'Signing in...' : <>Sign in <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>
        </motion.div>

        <p className="text-center text-[11.5px] text-white/15 mt-6">
          For access, contact your Bliztic administrator.
        </p>
      </div>
    </div>
  );
}
