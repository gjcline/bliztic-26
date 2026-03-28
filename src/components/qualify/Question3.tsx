import { motion } from 'framer-motion';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import type { OutreachChannel, ChannelWithLevel } from '@/types/qualification';

interface Question3Props {
  outreachChannels: ChannelWithLevel[];
  onUpdate: (channels: ChannelWithLevel[]) => void;
}

const channels: { value: OutreachChannel; label: string }[] = [
  { value: 'cold_email', label: 'Cold Email' },
  { value: 'cold_calling', label: 'Cold Calling' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'facebook', label: 'Facebook Ads' },
  { value: 'instagram', label: 'Instagram Ads' },
  { value: 'google_ads', label: 'Google Ads' },
  { value: 'other', label: 'Other' },
];

export function Question3({ outreachChannels, onUpdate }: Question3Props) {
  const handleChannelToggle = (channel: OutreachChannel) => {
    const existing = outreachChannels.find((c) => c.channel === channel);

    if (existing) {
      onUpdate(outreachChannels.filter((c) => c.channel !== channel));
    } else {
      onUpdate([
        ...outreachChannels,
        { channel, successLevel: 50, touched: false },
      ]);
    }
  };

  const handleSliderChange = (channel: OutreachChannel, value: number[]) => {
    onUpdate(
      outreachChannels.map((c) =>
        c.channel === channel
          ? { ...c, successLevel: value[0], touched: true }
          : c
      )
    );
  };

  const isChannelSelected = (channel: OutreachChannel) => {
    return outreachChannels.some((c) => c.channel === channel);
  };

  const getChannelData = (channel: OutreachChannel) => {
    return outreachChannels.find((c) => c.channel === channel);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white">
          Which outreach channels are you currently using?
        </h2>
        <p className="text-white/60">Select all that apply</p>

        <div className="space-y-3">
          {channels.map((channel) => (
            <div key={channel.value} className="space-y-3">
              <label
                className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  isChannelSelected(channel.value)
                    ? 'border-white bg-white/10'
                    : 'border-white/10 bg-white/5 hover:border-white/20'
                }`}
              >
                <Checkbox
                  checked={isChannelSelected(channel.value)}
                  onCheckedChange={() => handleChannelToggle(channel.value)}
                />
                <span className="text-white font-medium flex-1">{channel.label}</span>
              </label>

              {isChannelSelected(channel.value) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="pl-4 pr-4 pb-4 space-y-3"
                >
                  <div className="bg-white/5 p-4 rounded-lg space-y-3">
                    <Label className="text-white/80 text-sm">
                      How successful is this channel? (0-100)
                    </Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[getChannelData(channel.value)?.successLevel || 50]}
                        onValueChange={(value) => handleSliderChange(channel.value, value)}
                        max={100}
                        step={1}
                        className="flex-1"
                      />
                      <span className="text-white font-semibold min-w-[3rem] text-right">
                        {getChannelData(channel.value)?.successLevel || 50}%
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
