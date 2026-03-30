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
  { value: '1-500' as MonthlySpend, label: '$1 - $500' },
  { value: '500-2k' as MonthlySpend, label: '$500 - $2K' },
  { value: '2k-10k' as MonthlySpend, label: '$2K - $10K' },
  { value: '10k+' as MonthlySpend, label: '$10K+' },
];

const monthlyRevenues = [
  { value: '0-10k' as MonthlyRevenue, label: '$0 - $10K' },
  { value: '10k-50k' as MonthlyRevenue, label: '$10K - $50K' },
  { value: '50k-100k' as MonthlyRevenue, label: '$50K - $100K' },
  { value: '100k-500k' as MonthlyRevenue, label: '$100K - $500K' },
  { value: '500k+' as MonthlyRevenue, label: '$500K+' },
];

const fundingStages = [
  { value: 'seed' as FundingStage, label: 'Seed' },
  { value: 'series_a' as FundingStage, label: 'Series A' },
  { value: 'series_b_plus' as FundingStage, label: 'Series B+' },
  { value: 'bootstrapped' as FundingStage, label: 'Bootstrapped/Profitable' },
  { value: 'pre_revenue' as FundingStage, label: 'Pre-revenue' },
  { value: 'not_seeking' as FundingStage, label: 'Not seeking funding' },
];

export function Question4({ monthlySpend, monthlyRevenue, fundingStage, onUpdate }: Question4Props) {
  const showRevenueQuestion = monthlySpend === '0' || monthlySpend === '1-500';

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-[2px] bg-gradient-to-r from-blue-400 to-cyan-400" />
          <span className="text-xs font-semibold tracking-wider uppercase text-blue-400">Step 4</span>
        </div>
        <h2 className="text-2xl font-bold text-white mb-1">
          What's your monthly marketing spend?
        </h2>
        <RadioGroup
          value={monthlySpend || ''}
          onValueChange={(value) => onUpdate({ monthlySpend: value as MonthlySpend })}
        >
          <div className="space-y-3">
            {monthlySpends.map((spend) => (
              <label
                key={spend.value}
                className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                  monthlySpend === spend.value
                    ? 'border-blue-500/50 bg-gradient-to-r from-blue-500/20 to-cyan-500/20'
                    : 'border-white/10 bg-white/5 hover:border-blue-500/30'
                }`}
              >
                <RadioGroupItem value={spend.value} />
                <span className="text-white font-medium">{spend.label}</span>
              </label>
            ))}
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white">
          What stage is your company?
        </h2>
        <RadioGroup
          value={fundingStage || ''}
          onValueChange={(value) => onUpdate({ fundingStage: value as FundingStage })}
        >
          <div className="space-y-3">
            {fundingStages.map((stage) => (
              <label
                key={stage.value}
                className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                  fundingStage === stage.value
                    ? 'border-blue-500/50 bg-gradient-to-r from-blue-500/20 to-cyan-500/20'
                    : 'border-white/10 bg-white/5 hover:border-blue-500/30'
                }`}
              >
                <RadioGroupItem value={stage.value} />
                <span className="text-white font-medium">{stage.label}</span>
              </label>
            ))}
          </div>
        </RadioGroup>
      </div>

      {showRevenueQuestion && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold text-white">
            What's your monthly revenue?
          </h2>
          <RadioGroup
            value={monthlyRevenue || ''}
            onValueChange={(value) => onUpdate({ monthlyRevenue: value as MonthlyRevenue })}
          >
            <div className="space-y-3">
              {monthlyRevenues.map((revenue) => (
                <label
                  key={revenue.value}
                  className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                    monthlyRevenue === revenue.value
                      ? 'border-blue-500/50 bg-gradient-to-r from-blue-500/20 to-cyan-500/20'
                      : 'border-white/10 bg-white/5 hover:border-blue-500/30'
                  }`}
                >
                  <RadioGroupItem value={revenue.value} />
                  <span className="text-white font-medium">{revenue.label}</span>
                </label>
              ))}
            </div>
          </RadioGroup>
        </motion.div>
      )}
    </div>
  );
}
