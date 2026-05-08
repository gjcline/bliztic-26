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

const optionBase =
  'flex items-center gap-4 px-4 py-3.5 rounded-xl border cursor-pointer transition-all duration-200 select-none';
const optionActive =
  'border-blue-500/50 bg-blue-500/[0.08] shadow-[inset_0_0_0_1px_rgba(59,130,246,0.3)]';
const optionIdle =
  'border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/[0.14]';

export function Question5({ primaryGoal, onUpdate }: Question5Props) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-[2px] bg-gradient-to-r from-blue-400 to-cyan-400" />
        <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-blue-400">Step 5</span>
      </div>
      <h2 className="text-2xl font-bold text-white leading-snug">
        What's your primary business goal right now?
      </h2>

      <RadioGroup value={primaryGoal || ''} onValueChange={(v) => onUpdate(v as PrimaryGoal)}>
        <div className="space-y-2.5">
          {primaryGoals.map((goal) => {
            const active = primaryGoal === goal.value;
            return (
              <label key={goal.value} className={`${optionBase} ${active ? optionActive : optionIdle}`}>
                <RadioGroupItem value={goal.value} className="shrink-0" />
                <span className={`text-sm font-medium transition-colors duration-200 ${active ? 'text-white' : 'text-white/70'}`}>
                  {goal.label}
                </span>
              </label>
            );
          })}
        </div>
      </RadioGroup>
    </div>
  );
}
