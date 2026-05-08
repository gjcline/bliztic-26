import { motion } from 'framer-motion';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { MonthlySpend, MonthlyRevenue, FundingStage } from '@/types/qualification';

interface Question4Props {
  monthlySpend: MonthlySpend | null;
  monthlyRevenue: MonthlyRevenue | null;
  fundingStage: FundingStage | null;
  onUpdate: (data: { monthlySpend?: MonthlySpend; monthlyRevenue?: MonthlyRevenue; fundingStage?: FundingStage }) => void;
}

const monthlySpends = [
  { value: '0' as MonthlySpend, label: '$0' },
  { value: '1-500' as MonthlySpend, label: '$1K – $50K' },
  { value: '500-2k' as MonthlySpend, label: '$50K – $200K' },
  { value: '2k-10k' as MonthlySpend, label: '$200K – $1M' },
  { value: '10k+' as MonthlySpend, label: '$1M+' },
];

const monthlyRevenues = [
  { value: '0-10k' as MonthlyRevenue, label: '$0 – $10K' },
  { value: '10k-50k' as MonthlyRevenue, label: '$10K – $50K' },
  { value: '50k-100k' as MonthlyRevenue, label: '$50K – $100K' },
  { value: '100k-500k' as MonthlyRevenue, label: '$100K – $500K' },
  { value: '500k+' as MonthlyRevenue, label: '$500K+' },
];

const fundingStages = [
  { value: 'seed' as FundingStage, label: 'Seed' },
  { value: 'series_a' as FundingStage, label: 'Series A' },
  { value: 'series_b_plus' as FundingStage, label: 'Series B+' },
  { value: 'bootstrapped' as FundingStage, label: 'Bootstrapped / Profitable' },
  { value: 'pre_revenue' as FundingStage, label: 'Profitable but need to scale' },
  { value: 'not_seeking' as FundingStage, label: 'Not seeking funding' },
];

const optionBase =
  'flex items-center gap-4 px-4 py-3.5 rounded-xl border cursor-pointer transition-all duration-200 select-none';
const optionActive =
  'border-blue-500/50 bg-blue-500/[0.08] shadow-[inset_0_0_0_1px_rgba(59,130,246,0.3)]';
const optionIdle =
  'border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/[0.14]';

function OptionGroup<T extends string>({
  title,
  value,
  options,
  onChange,
}: {
  title: string;
  value: T | null;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white leading-snug">{title}</h2>
      <RadioGroup value={value || ''} onValueChange={(v) => onChange(v as T)}>
        <div className="space-y-2.5">
          {options.map((opt) => {
            const active = value === opt.value;
            return (
              <label key={opt.value} className={`${optionBase} ${active ? optionActive : optionIdle}`}>
                <RadioGroupItem value={opt.value} className="shrink-0" />
                <span className={`text-sm font-medium transition-colors duration-200 ${active ? 'text-white' : 'text-white/70'}`}>
                  {opt.label}
                </span>
              </label>
            );
          })}
        </div>
      </RadioGroup>
    </div>
  );
}

export function Question4({ monthlySpend, monthlyRevenue, fundingStage, onUpdate }: Question4Props) {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-8 h-[2px] bg-gradient-to-r from-blue-400 to-cyan-400" />
        <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-blue-400">Step 4</span>
      </div>

      <OptionGroup
        title="What's your monthly marketing spend?"
        value={monthlySpend}
        options={monthlySpends}
        onChange={(v) => onUpdate({ monthlySpend: v })}
      />

      <div className="border-t border-white/[0.06] pt-6">
        <OptionGroup
          title="What stage is your company?"
          value={fundingStage}
          options={fundingStages}
          onChange={(v) => onUpdate({ fundingStage: v })}
        />
      </div>

      {monthlySpend === '0' && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="border-t border-white/[0.06] pt-6"
        >
          <OptionGroup
            title="What's your monthly revenue?"
            value={monthlyRevenue}
            options={monthlyRevenues}
            onChange={(v) => onUpdate({ monthlyRevenue: v })}
          />
        </motion.div>
      )}
    </div>
  );
}
