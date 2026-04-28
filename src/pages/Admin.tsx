import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LogOut, Search, ChevronDown, ChevronUp, RefreshCw,
  Users, TrendingUp, Calendar, CheckCircle, Clock, X,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

// ─── Types ────────────────────────────────────────────────────────────────────

type TabKey = 'pricing' | 'qualification' | 'explore' | 'fund' | 'gtm_fund' | 'ai_workforce';

interface TabConfig {
  key: TabKey;
  label: string;
  table: string;
  nameField: (r: Record<string, unknown>) => string;
  emailField: string;
  companyField: (r: Record<string, unknown>) => string;
  summaryFields: { label: string; field: (r: Record<string, unknown>) => string }[];
}

// ─── Tab configuration ────────────────────────────────────────────────────────

const TABS: TabConfig[] = [
  {
    key: 'pricing',
    label: 'Pricing Estimates',
    table: 'pricing_estimates',
    nameField: r => String(r.name ?? '—'),
    emailField: 'email',
    companyField: r => String(r.company ?? '—'),
    summaryFields: [
      { label: 'Tier', field: r => String(r.tier ?? '—') },
      { label: 'Estimate', field: r => r.estimate_lo && r.estimate_hi ? `$${Number(r.estimate_lo).toLocaleString()} – $${Number(r.estimate_hi).toLocaleString()}/mo` : '—' },
      { label: 'Role', field: r => String(r.role ?? '—') },
      { label: 'Urgency', field: r => String(r.urgency ?? '—') },
    ],
  },
  {
    key: 'qualification',
    label: 'Qualification',
    table: 'qualification_submissions',
    nameField: r => String(r.full_name ?? '—'),
    emailField: 'email',
    companyField: r => String(r.company_name ?? '—'),
    summaryFields: [
      { label: 'Business Type', field: r => String(r.business_type ?? '—') },
      { label: 'Team Size', field: r => String(r.team_size ?? '—') },
      { label: 'Revenue', field: r => String(r.monthly_revenue ?? '—') },
      { label: 'Goal', field: r => String(r.primary_goal ?? '—') },
    ],
  },
  {
    key: 'explore',
    label: 'Explore Form',
    table: 'explore_submissions',
    nameField: r => `${r.first_name ?? ''} ${r.last_name ?? ''}`.trim() || '—',
    emailField: 'email',
    companyField: r => String(r.company ?? '—'),
    summaryFields: [
      { label: 'Route', field: r => String(r.recommended_route ?? '—') },
      { label: 'Primary Reason', field: r => String(r.primary_reason ?? '—') },
      { label: 'Webhook', field: r => r.webhook_sent ? 'Sent' : 'Pending' },
    ],
  },
  {
    key: 'fund',
    label: 'Fund Applications',
    table: 'fund_applications',
    nameField: r => String(r.full_name ?? '—'),
    emailField: 'email',
    companyField: r => String(r.idea_name ?? '—'),
    summaryFields: [
      { label: 'Purpose', field: r => String(r.funding_purpose ?? '—') },
      { label: 'Phone', field: r => String(r.phone_number ?? '—') },
    ],
  },
  {
    key: 'gtm_fund',
    label: 'GTM Fund',
    table: 'gtm_fund_applications',
    nameField: r => String(r.full_name ?? '—'),
    emailField: 'email',
    companyField: r => String(r.company_name ?? '—'),
    summaryFields: [
      { label: 'Purpose', field: r => String(r.funding_purpose ?? '—') },
      { label: 'Phone', field: r => String(r.phone_number ?? '—') },
    ],
  },
  {
    key: 'ai_workforce',
    label: 'AI Workforce',
    table: 'ai_workforce_waitlist',
    nameField: r => String(r.full_name ?? '—'),
    emailField: 'email',
    companyField: r => String(r.company_name ?? '—'),
    summaryFields: [
      { label: 'Role', field: r => String(r.role ?? '—') },
      { label: 'Team Size', field: r => String(r.team_size ?? '—') },
      { label: 'Use Case', field: r => String(r.use_case ?? '—') },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(val: unknown): string {
  if (!val) return '—';
  const d = new Date(String(val));
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) +
    ' · ' + d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

function truncate(s: string, n = 40): string {
  return s.length > n ? s.slice(0, n) + '…' : s;
}

// ─── Detail drawer ────────────────────────────────────────────────────────────

function DetailDrawer({ row, onClose }: { row: Record<string, unknown>; onClose: () => void }) {
  const SKIP_KEYS = ['id'];
  const entries = Object.entries(row).filter(([k]) => !SKIP_KEYS.includes(k));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex justify-end"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
        className="relative z-10 w-full max-w-[520px] h-full bg-[#0C1120] border-l border-white/7 overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-[#0C1120] border-b border-white/7 flex items-center justify-between px-6 py-4 z-10">
          <p className="text-[13px] font-semibold text-white">Full Record</p>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white/7 transition-colors">
            <X className="w-4 h-4 text-white/50" />
          </button>
        </div>
        <div className="px-6 py-5 flex flex-col gap-4">
          {entries.map(([key, value]) => (
            <div key={key}>
              <p className="text-[10.5px] font-semibold tracking-[0.13em] uppercase text-white/30 mb-1">
                {key.replace(/_/g, ' ')}
              </p>
              <p className="text-[13.5px] text-white/80 leading-[1.6] break-words">
                {value === null || value === undefined || value === ''
                  ? <span className="text-white/20 italic">—</span>
                  : typeof value === 'object'
                  ? <span className="font-mono text-[12px] text-white/60">{JSON.stringify(value, null, 2)}</span>
                  : String(value)}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Row ──────────────────────────────────────────────────────────────────────

function LeadRow({ row, config, onExpand }: { row: Record<string, unknown>; config: TabConfig; onExpand: () => void }) {
  const name = config.nameField(row);
  const email = String(row[config.emailField] ?? '—');
  const company = config.companyField(row);

  return (
    <tr
      onClick={onExpand}
      className="border-b border-white/5 hover:bg-white/[0.025] cursor-pointer transition-colors group"
    >
      <td className="px-5 py-4">
        <p className="text-[13.5px] font-medium text-white leading-tight">{name}</p>
        <p className="text-[12px] text-white/40 mt-0.5">{email}</p>
      </td>
      <td className="px-4 py-4 hidden sm:table-cell">
        <p className="text-[13px] text-white/65">{truncate(company, 30)}</p>
      </td>
      {config.summaryFields.slice(0, 2).map(sf => (
        <td key={sf.label} className="px-4 py-4 hidden md:table-cell">
          <p className="text-[11px] font-semibold tracking-[0.08em] uppercase text-white/25 mb-0.5">{sf.label}</p>
          <p className="text-[12.5px] text-white/60">{truncate(sf.field(row), 28)}</p>
        </td>
      ))}
      <td className="px-4 py-4 hidden lg:table-cell">
        <p className="text-[12px] text-white/35">{formatDate(row.created_at)}</p>
      </td>
      <td className="px-4 py-4 text-right">
        <ChevronDown className="w-4 h-4 text-white/25 group-hover:text-white/50 ml-auto transition-colors" />
      </td>
    </tr>
  );
}

// ─── Tab panel ────────────────────────────────────────────────────────────────

function TabPanel({ config }: { config: TabConfig }) {
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sortAsc, setSortAsc] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Record<string, unknown> | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from(config.table)
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) setRows(data as Record<string, unknown>[]);
    setLoading(false);
  }, [config.table]);

  useEffect(() => { load(); }, [load]);

  const filtered = rows.filter(r => {
    const q = search.toLowerCase();
    return (
      config.nameField(r).toLowerCase().includes(q) ||
      String(r[config.emailField] ?? '').toLowerCase().includes(q) ||
      config.companyField(r).toLowerCase().includes(q)
    );
  });

  const sorted = sortAsc ? [...filtered].reverse() : filtered;

  return (
    <>
      <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/25" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search name, email, company..."
            className="w-full bg-[#111828] border border-white/7 rounded-lg pl-8 pr-3 py-2 text-[13px] text-white placeholder-white/20 outline-none focus:border-blue-600 transition-colors"
          />
        </div>
        <button
          onClick={() => setSortAsc(a => !a)}
          className="flex items-center gap-1.5 px-3 py-2 border border-white/7 rounded-lg text-[12px] text-white/40 hover:text-white/70 hover:border-white/13 transition-all"
        >
          {sortAsc ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          {sortAsc ? 'Oldest first' : 'Newest first'}
        </button>
        <button onClick={load} className="p-2 border border-white/7 rounded-lg text-white/30 hover:text-white/60 hover:border-white/13 transition-all">
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
        <span className="text-[11px] text-white/25 ml-auto">{filtered.length} record{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16 text-white/25 text-[13px]">Loading...</div>
      ) : sorted.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-2">
          <p className="text-[13px] text-white/25">{search ? 'No results found.' : 'No records yet.'}</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-5 py-3 text-left text-[10.5px] font-semibold tracking-[0.12em] uppercase text-white/25">Contact</th>
                <th className="px-4 py-3 text-left text-[10.5px] font-semibold tracking-[0.12em] uppercase text-white/25 hidden sm:table-cell">Company</th>
                {config.summaryFields.slice(0, 2).map(sf => (
                  <th key={sf.label} className="px-4 py-3 text-left text-[10.5px] font-semibold tracking-[0.12em] uppercase text-white/25 hidden md:table-cell">{sf.label}</th>
                ))}
                <th className="px-4 py-3 text-left text-[10.5px] font-semibold tracking-[0.12em] uppercase text-white/25 hidden lg:table-cell">Submitted</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {sorted.map(row => (
                <LeadRow
                  key={String(row.id)}
                  row={row}
                  config={config}
                  onExpand={() => setSelectedRow(row)}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AnimatePresence>
        {selectedRow && (
          <DetailDrawer row={selectedRow} onClose={() => setSelectedRow(null)} />
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Main Admin page ──────────────────────────────────────────────────────────

export default function Admin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabKey>('pricing');
  const [counts, setCounts] = useState<Record<TabKey, number>>({
    pricing: 0, qualification: 0, explore: 0, fund: 0, gtm_fund: 0, ai_workforce: 0,
  });
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) navigate('/admin/login');
      else setCheckingAuth(false);
    });
  }, [navigate]);

  useEffect(() => {
    if (checkingAuth) return;
    async function loadCounts() {
      const results = await Promise.all(
        TABS.map(t => supabase.from(t.table).select('id', { count: 'exact', head: true }))
      );
      const updated = { ...counts };
      TABS.forEach((t, i) => {
        updated[t.key] = results[i].count ?? 0;
      });
      setCounts(updated);
    }
    loadCounts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkingAuth]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate('/admin/login');
  }

  const totalLeads = Object.values(counts).reduce((a, b) => a + b, 0);
  const activeConfig = TABS.find(t => t.key === activeTab)!;

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#05070D] flex items-center justify-center">
        <p className="text-[13px] text-white/25">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05070D] text-white">
      {/* Header */}
      <div className="border-b border-white/7 bg-[#05070D] sticky top-0 z-20">
        <div className="max-w-[1400px] mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="text-[13px] font-bold tracking-[0.16em] uppercase text-white">
              BLIZTIC<span className="text-blue-500">.</span>
            </a>
            <span className="w-px h-4 bg-white/10" />
            <span className="text-[12px] font-medium text-white/40 tracking-wide">Admin Dashboard</span>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-white/7 text-[12.5px] text-white/40 hover:text-white/70 hover:border-white/13 transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign out
          </button>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-5 py-8">
        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <div className="bg-[#0C1120] border border-white/7 rounded-xl px-5 py-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-blue-400" />
              <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/30">Total Leads</span>
            </div>
            <p className="text-[28px] font-semibold text-white">{totalLeads}</p>
          </div>
          <div className="bg-[#0C1120] border border-white/7 rounded-xl px-5 py-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/30">Pricing Estimates</span>
            </div>
            <p className="text-[28px] font-semibold text-white">{counts.pricing}</p>
          </div>
          <div className="bg-[#0C1120] border border-white/7 rounded-xl px-5 py-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-sky-400" />
              <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/30">Qualified</span>
            </div>
            <p className="text-[28px] font-semibold text-white">{counts.qualification}</p>
          </div>
          <div className="bg-[#0C1120] border border-white/7 rounded-xl px-5 py-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/30">Explore Form</span>
            </div>
            <p className="text-[28px] font-semibold text-white">{counts.explore}</p>
          </div>
        </div>

        {/* Tab bar */}
        <div className="flex items-center gap-1 border-b border-white/7 mb-0 overflow-x-auto">
          {TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative flex items-center gap-2 px-4 py-3 text-[13px] font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.key ? 'text-white' : 'text-white/35 hover:text-white/60'
              }`}
            >
              {tab.label}
              {counts[tab.key] > 0 && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                  activeTab === tab.key ? 'bg-blue-600/25 text-blue-300' : 'bg-white/8 text-white/35'
                }`}>
                  {counts[tab.key]}
                </span>
              )}
              {activeTab === tab.key && (
                <span className="absolute bottom-0 left-0 right-0 h-px bg-blue-500" />
              )}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-[#0C1120] border border-white/7 border-t-0 rounded-b-xl overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <TabPanel config={activeConfig} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer note */}
        <div className="mt-6 flex items-center gap-2 text-[11.5px] text-white/20">
          <Calendar className="w-3.5 h-3.5" />
          All times displayed in your local timezone.
        </div>
      </div>
    </div>
  );
}
