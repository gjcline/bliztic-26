import { motion } from 'framer-motion';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import type { OutreachChannel, ChannelWithLevel } from '@/types/qualification';

interface Question3Props {
  outreachChannels: ChannelWithLevel[];
  onUpdate: (channels: ChannelWithLevel[]) => void;
}

const channels: { value: OutreachChannel; label: string }[] = [
  { value: 'cold_email', label: 'Cold Email' },
  { value: 'cold_calling', label: 'Cold Calling' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'facebook', label: 'Facebook / Instagram (Meta) Ads' },
  { value: 'x', label: 'X Ads' },
  { value: 'organic_content', label: 'Organic Content' },
  { value: 'google_ads', label: 'Google Ads' },
  { value: 'other', label: 'Other' },
];

const optionBase =
  'flex items-center gap-4 px-4 py-3.5 rounded-xl border cursor-pointer transition-all duration-200 select-none';
const optionActive =
  'border-blue-500/50 bg-blue-500/[0.08] shadow-[inset_0_0_0_1px_rgba(59,130,246,0.3)]';
const optionIdle =
  'border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/[0.14]';

export function Question3({ outreachChannels, onUpdate }: Question3Props) {
  const handleChannelToggle = (channel: OutreachChannel) => {
    const existing = outreachChannels.find((c) => c.channel === channel);
    if (existing) {
      onUpdate(outreachChannels.filter((c) => c.channel !== channel));
    } else {
      onUpdate([...outreachChannels, { channel, successLevel: 50, touched: false }]);
    }
  };

  const handleSliderChange = (channel: OutreachChannel, value: number[]) => {
    onUpdate(
      outreachChannels.map((c) =>
        c.channel === channel ? { ...c, successLevel: value[0], touched: true } : c
      )
    );
  };

  const isSelected = (channel: OutreachChannel) => outreachChannels.some((c) => c.channel === channel);
  const getData = (channel: OutreachChannel) => outreachChannels.find((c) => c.channel === channel);

  const sliderValue = (channel: OutreachChannel) => {
    const v = getData(channel)?.successLevel ?? 50;
    if (v <= 33) return 'Low';
    if (v <= 66) return 'Moderate';
    return 'High';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-[2px] bg-gradient-to-r from-blue-400 to-cyan-400" />
        <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-blue-400">Step 3</span>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-white leading-snug mb-1">
          Which outreach channels are you currently using?
        </h2>
        <p className="text-[0.8rem] text-white/40">Select all that apply</p>
      </div>

      <div className="space-y-2.5">
        {channels.map((channel) => {
          const active = isSelected(channel.value);
          return (
            <div key={channel.value}>
              <label className={`${optionBase} ${active ? optionActive : optionIdle}`}>
                <Checkbox
                  checked={active}
                  onCheckedChange={() => handleChannelToggle(channel.value)}
                  className="shrink-0"
                />
                <span className={`text-sm font-medium flex-1 transition-colors duration-200 ${active ? 'text-white' : 'text-white/70'}`}>
                  {channel.label}
                </span>
              </label>

              {active && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="mx-1 mt-1 mb-1 bg-white/[0.03] border border-white/[0.06] rounded-xl px-5 py-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[0.72rem] font-semibold text-white/45 uppercase tracking-wider">
                        Channel effectiveness
                      </span>
                      <span className={`text-[0.72rem] font-bold tracking-wide ${
                        sliderValue(channel.value) === 'High'
                          ? 'text-cyan-400'
                          : sliderValue(channel.value) === 'Moderate'
                          ? 'text-blue-400'
                          : 'text-white/50'
                      }`}>
                        {getData(channel.value)?.successLevel ?? 50}% — {sliderValue(channel.value)}
                      </span>
                    </div>
                    <Slider
                      value={[getData(channel.value)?.successLevel ?? 50]}
                      onValueChange={(value) => handleSliderChange(channel.value, value)}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
