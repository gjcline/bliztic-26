import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { PrimaryGoal } from '@/types/qualification';

interface Question5Props {
  primaryGoal: PrimaryGoal | null;
  onUpdate: (goal: PrimaryGoal) => void;
}

const primaryGoals = [
  { value: 'more_leads' as PrimaryGoal, label: 'Generate more qualified leads' },
  { value: 'better_conversions' as PrimaryGoal, label: 'Improve conversion rates' },
  { value: 'scale_team' as PrimaryGoal, label: 'Scale my team and operations' },
  { value: 'reduce_costs' as PrimaryGoal, label: 'Reduce customer acquisition costs' },
  { value: 'improve_systems' as PrimaryGoal, label: 'Build better systems and processes' },
  { value: 'new_markets' as PrimaryGoal, label: 'Expand to new markets' },
];

export function Question5({ primaryGoal, onUpdate }: Question5Props) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-[2px] bg-gradient-to-r from-blue-400 to-cyan-400" />
        <span className="text-xs font-semibold tracking-wider uppercase text-blue-400">Step 5</span>
      </div>
      <h2 className="text-2xl font-bold text-white mb-1">
        What's your primary business goal or challenge right now?
      </h2>
      <RadioGroup
        value={primaryGoal || ''}
        onValueChange={(value) => onUpdate(value as PrimaryGoal)}
      >
        <div className="space-y-3">
          {primaryGoals.map((goal) => (
            <label
              key={goal.value}
              className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                primaryGoal === goal.value
                  ? 'border-blue-500/50 bg-gradient-to-r from-blue-500/20 to-cyan-500/20'
                  : 'border-white/10 bg-white/5 hover:border-blue-500/30'
              }`}
            >
              <RadioGroupItem value={goal.value} />
              <span className="text-white font-medium">{goal.label}</span>
            </label>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}
