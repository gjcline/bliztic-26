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
      <h2 className="text-2xl font-bold text-white">How many people are on your team?</h2>
      <RadioGroup
        value={teamSize || ''}
        onValueChange={(value) => onUpdate({ teamSize: value as TeamSize })}
      >
        <div className="space-y-3">
          {teamSizes.map((size) => (
            <label
              key={size.value}
              className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                teamSize === size.value
                  ? 'border-white bg-white/10'
                  : 'border-white/10 bg-white/5 hover:border-white/20'
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
