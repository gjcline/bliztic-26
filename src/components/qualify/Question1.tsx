import { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Code, ShoppingCart, Users, TrendingUp, Layers } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { BusinessType } from '@/types/qualification';

interface Question1Props {
  businessType: BusinessType | null;
  customBusinessType: string;
  companyName: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  onUpdate: (data: {
    businessType?: BusinessType;
    customBusinessType?: string;
    companyName?: string;
    fullName?: string;
    email?: string;
    phoneNumber?: string;
  }) => void;
}

const businessTypes = [
  { value: 'agency' as BusinessType, label: 'Agency', icon: Briefcase },
  { value: 'saas' as BusinessType, label: 'SaaS', icon: Code },
  { value: 'ecommerce' as BusinessType, label: 'E-commerce', icon: ShoppingCart },
  { value: 'startup' as BusinessType, label: 'Startup', icon: Users },
  { value: 'consulting' as BusinessType, label: 'Consulting', icon: TrendingUp },
  { value: 'other' as BusinessType, label: 'Other', icon: Layers },
];

const optionBase =
  'flex items-center gap-4 px-4 py-3.5 rounded-xl border cursor-pointer transition-all duration-200 select-none';
const optionActive =
  'border-blue-500/50 bg-blue-500/[0.08] shadow-[inset_0_0_0_1px_rgba(59,130,246,0.3)]';
const optionIdle =
  'border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/[0.14]';

const inputBase =
  'bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-white/25 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500/50 focus:bg-white/[0.06] transition-all duration-200 w-full';

export function Question1({
  businessType,
  customBusinessType,
  companyName,
  fullName,
  email,
  phoneNumber,
  onUpdate,
}: Question1Props) {
  const [showContactFields, setShowContactFields] = useState(!!businessType);

  const handleBusinessTypeChange = (value: string) => {
    onUpdate({ businessType: value as BusinessType });
    setShowContactFields(true);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-[2px] bg-gradient-to-r from-blue-400 to-cyan-400" />
          <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-blue-400">Step 1</span>
        </div>
        <h2 className="text-2xl font-bold text-white leading-snug">
          What type of business do you run?
        </h2>

        <RadioGroup value={businessType || ''} onValueChange={handleBusinessTypeChange}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {businessTypes.map((type) => {
              const Icon = type.icon;
              const active = businessType === type.value;
              return (
                <label key={type.value} className={`${optionBase} ${active ? optionActive : optionIdle}`}>
                  <RadioGroupItem value={type.value} className="shrink-0" />
                  <Icon className={`w-4 h-4 shrink-0 transition-colors duration-200 ${active ? 'text-blue-400' : 'text-white/40'}`} />
                  <span className={`text-sm font-medium transition-colors duration-200 ${active ? 'text-white' : 'text-white/70'}`}>
                    {type.label}
                  </span>
                </label>
              );
            })}
          </div>
        </RadioGroup>

        {businessType === 'other' && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="pt-1"
          >
            <Label htmlFor="customBusinessType" className="text-[0.75rem] font-semibold text-white/50 uppercase tracking-wider mb-2 block">
              Specify your business type
            </Label>
            <input
              id="customBusinessType"
              type="text"
              placeholder="e.g., Healthcare, Education, Real Estate..."
              value={customBusinessType}
              onChange={(e) => onUpdate({ customBusinessType: e.target.value })}
              className={inputBase}
            />
          </motion.div>
        )}
      </div>

      {showContactFields && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-5 pt-2"
        >
          <div className="border-t border-white/[0.06] pt-6">
            <h3 className="text-base font-semibold text-white/80 mb-5 tracking-tight">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="fullName" className="text-[0.73rem] font-semibold text-white/45 uppercase tracking-wider">
                  Full Name
                </Label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => onUpdate({ fullName: e.target.value })}
                  autoComplete="name"
                  required
                  className={inputBase}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="companyName" className="text-[0.73rem] font-semibold text-white/45 uppercase tracking-wider">
                  Company Name
                </Label>
                <input
                  id="companyName"
                  type="text"
                  placeholder="Acme Inc."
                  value={companyName}
                  onChange={(e) => onUpdate({ companyName: e.target.value })}
                  autoComplete="organization"
                  required
                  className={inputBase}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-[0.73rem] font-semibold text-white/45 uppercase tracking-wider">
                  Email Address
                </Label>
                <input
                  id="email"
                  type="email"
                  placeholder="john@company.com"
                  value={email}
                  onChange={(e) => onUpdate({ email: e.target.value })}
                  autoComplete="email"
                  inputMode="email"
                  required
                  className={inputBase}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="phoneNumber" className="text-[0.73rem] font-semibold text-white/45 uppercase tracking-wider">
                  Phone Number
                </Label>
                <input
                  id="phoneNumber"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={phoneNumber}
                  onChange={(e) => onUpdate({ phoneNumber: e.target.value })}
                  autoComplete="tel"
                  inputMode="tel"
                  required
                  className={inputBase}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
