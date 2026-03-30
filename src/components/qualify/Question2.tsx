import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { TeamSize } from '@/types/qualification';

interface Question2Props {
  teamSize: TeamSize | null;
  onUpdate: (data: { teamSize?: TeamSize }) => void;
}

const teamSizes = [
  { value: 'solo' as TeamSize, label: 'Solo (Just me)' },
  { value: '2-5' as TeamSize, label: '2-5 people' },
  { value: '6-20' as TeamSize, label: '6-20 people' },
  { value: '21-50' as TeamSize, label: '21-50 people' },
  { value: '50+' as TeamSize, label: '50+ people' },
];

export function Question2({ teamSize, onUpdate }: Question2Props) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-[2px] bg-gradient-to-r from-blue-400 to-cyan-400" />
        <span className="text-xs font-semibold tracking-wider uppercase text-blue-400">Step 2</span>
      </div>
      <h2 className="text-2xl font-bold text-white mb-1">How many people are on your team?</h2>
      <RadioGroup
        value={teamSize || ''}
        onValueChange={(value) => onUpdate({ teamSize: value as TeamSize })}
      >
        <div className="space-y-3">
          {teamSizes.map((size) => (
            <label
              key={size.value}
              className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                teamSize === size.value
                  ? 'border-blue-500/50 bg-gradient-to-r from-blue-500/20 to-cyan-500/20'
                  : 'border-white/10 bg-white/5 hover:border-blue-500/30'
              }`}
            >
              <RadioGroupItem value={size.value} />
              <span className="text-white font-medium">{size.label}</span>
            </label>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}
