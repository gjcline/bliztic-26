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
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-[2px] bg-gradient-to-r from-blue-400 to-cyan-400" />
          <span className="text-xs font-semibold tracking-wider uppercase text-blue-400">Step 1</span>
        </div>
        <h2 className="text-2xl font-bold text-white mb-1">
          What type of business do you run?
        </h2>
        <RadioGroup value={businessType || ''} onValueChange={handleBusinessTypeChange}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {businessTypes.map((type) => {
              const Icon = type.icon;
              return (
                <label
                  key={type.value}
                  className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                    businessType === type.value
                      ? 'border-blue-500/50 bg-gradient-to-r from-blue-500/20 to-cyan-500/20'
                      : 'border-white/10 bg-white/5 hover:border-blue-500/30'
                  }`}
                >
                  <RadioGroupItem value={type.value} />
                  <Icon className={`w-5 h-5 transition-colors duration-300 ${
                    businessType === type.value ? 'text-blue-400' : 'text-white/60'
                  }`} />
                  <span className="text-white font-medium">{type.label}</span>
                </label>
              );
            })}
          </div>
        </RadioGroup>

        {businessType === 'other' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-2 pt-2"
          >
            <Label htmlFor="customBusinessType" className="text-white/80">
              Please specify your business type
            </Label>
            <Input
              id="customBusinessType"
              type="text"
              placeholder="e.g., Healthcare, Education, Real Estate..."
              value={customBusinessType}
              onChange={(e) => onUpdate({ customBusinessType: e.target.value })}
              className="bg-white/5 border-white/10 focus:border-blue-500/50"
            />
          </motion.div>
        )}
      </div>

      {showContactFields && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6 pt-4"
        >
          <div className="border-t border-white/10 pt-6">
            <h3 className="text-xl font-semibold text-white mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-white/80">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => onUpdate({ fullName: e.target.value })}
                  autoComplete="name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/80">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@company.com"
                  value={email}
                  onChange={(e) => onUpdate({ email: e.target.value })}
                  autoComplete="email"
                  inputMode="email"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-white/80">
                  Phone Number
                </Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={phoneNumber}
                  onChange={(e) => onUpdate({ phoneNumber: e.target.value })}
                  autoComplete="tel"
                  inputMode="tel"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyName" className="text-white/80">
                  Company Name
                </Label>
                <Input
                  id="companyName"
                  type="text"
                  placeholder="Acme Inc."
                  value={companyName}
                  onChange={(e) => onUpdate({ companyName: e.target.value })}
                  autoComplete="organization"
                  required
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
