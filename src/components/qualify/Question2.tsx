import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { TeamSize } from '@/types/qualification';

interface Question2Props {
  teamSize: TeamSize | null;
  onUpdate: (data: { teamSize?: TeamSize }) => void;
}

const teamSizes = [
  { value: 'solo' as TeamSize, label: 'Solo (Just me)' },
  { value: '2-5' as TeamSize, label: '2–5 people' },
  { value: '6-20' as TeamSize, label: '6–20 people' },
  { value: '21-50' as TeamSize, label: '21–50 people' },
  { value: '50+' as TeamSize, label: '50+ people' },
];

const optionBase =
  'flex items-center gap-4 px-4 py-3.5 rounded-xl border cursor-pointer transition-all duration-200 select-none';
const optionActive =
  'border-blue-500/50 bg-blue-500/[0.08] shadow-[inset_0_0_0_1px_rgba(59,130,246,0.3)]';
const optionIdle =
  'border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/[0.14]';

export function Question2({ teamSize, onUpdate }: Question2Props) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-[2px] bg-gradient-to-r from-blue-400 to-cyan-400" />
        <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-blue-400">Step 2</span>
      </div>
      <h2 className="text-2xl font-bold text-white leading-snug">How many people are on your team?</h2>

      <RadioGroup value={teamSize || ''} onValueChange={(value) => onUpdate({ teamSize: value as TeamSize })}>
        <div className="space-y-2.5">
          {teamSizes.map((size) => {
            const active = teamSize === size.value;
            return (
              <label key={size.value} className={`${optionBase} ${active ? optionActive : optionIdle}`}>
                <RadioGroupItem value={size.value} className="shrink-0" />
                <span className={`text-sm font-medium transition-colors duration-200 ${active ? 'text-white' : 'text-white/70'}`}>
                  {size.label}
                </span>
              </label>
            );
          })}
        </div>
      </RadioGroup>
    </div>
  );
}
