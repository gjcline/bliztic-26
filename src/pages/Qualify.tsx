import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SmokeBackground } from '@/components/ui/spooky-smoke-animation';
import { Question1 } from '@/components/qualify/Question1';
import { Question2 } from '@/components/qualify/Question2';
import { Question3 } from '@/components/qualify/Question3';
import { Question4 } from '@/components/qualify/Question4';
import { Question5 } from '@/components/qualify/Question5';
import { UniversalSuccess } from '@/components/qualify/UniversalSuccess';
import type { QualificationFormData } from '@/types/qualification';
import { saveInitialSubmission, updateSubmission, sendWebhook } from '@/lib/qualification';

const TOTAL_QUESTIONS = 5;

export default function Qualify() {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<QualificationFormData>({
    submissionId: undefined,
    businessType: null,
    customBusinessType: '',
    companyName: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    teamSize: null,
    fundingStage: null,
    outreachChannels: [],
    monthlySpend: null,
    monthlyRevenue: null,
    primaryGoal: null,
  });

  const updateFormData = (data: Partial<QualificationFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const validateQuestion = (questionNum: number): boolean => {
    switch (questionNum) {
      case 1: {
        const hasBusinessType = formData.businessType;
        const hasCustomType = formData.businessType !== 'other' || formData.customBusinessType.trim() !== '';
        return !!(
          hasBusinessType &&
          hasCustomType &&
          formData.fullName &&
          formData.email &&
          formData.phoneNumber &&
          formData.companyName
        );
      }
      case 2:
        return !!formData.teamSize;
      case 3: {
        const hasChannels = formData.outreachChannels.length > 0;
        const allChannelsTouched = formData.outreachChannels.every((c) => c.touched);
        return hasChannels && allChannelsTouched;
      }
      case 4: {
        const needsRevenue = formData.monthlySpend === '0';
        if (needsRevenue) {
          return !!(formData.monthlySpend && formData.fundingStage && formData.monthlyRevenue);
        }
        return !!(formData.monthlySpend && formData.fundingStage);
      }
      case 5:
        return !!formData.primaryGoal;
      default:
        return false;
    }
  };

  const handleNext = async () => {
    if (!validateQuestion(currentQuestion)) return;

    if (currentQuestion === 1 && !formData.submissionId) {
      const submissionId = await saveInitialSubmission({
        businessType: formData.businessType!,
        customBusinessType: formData.customBusinessType,
        companyName: formData.companyName,
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
      });
      if (submissionId) updateFormData({ submissionId });
    }

    if (currentQuestion < TOTAL_QUESTIONS) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      await handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentQuestion > 1) setCurrentQuestion((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    if (!formData.submissionId) {
      console.error('No submission ID found');
      return;
    }
    setIsSubmitting(true);
    try {
      await updateSubmission(formData.submissionId, formData);
      try {
        await sendWebhook(formData.submissionId, formData);
      } catch (webhookError) {
        console.error('Webhook error (non-blocking):', webhookError);
      }
      setShowSuccess(true);
      setIsSubmitting(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      setShowSuccess(true);
      setIsSubmitting(false);
    }
  };

  const progressPercentage = (currentQuestion / TOTAL_QUESTIONS) * 100;

  if (showSuccess) return <UniversalSuccess />;

  return (
    <div className="relative min-h-screen bg-[#030303] overflow-hidden">
      {/* Smoke canvas — full page background */}
      <div className="absolute inset-0 z-0">
        <SmokeBackground smokeColor="#0f2a4a" />
        {/* Darken the smoke so form content remains readable */}
        <div className="absolute inset-0 bg-[#030303]/60" />
      </div>

      {/* Subtle radial spotlight centred on the form */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.12)_0%,transparent_70%)] pointer-events-none blur-2xl z-0" />

      {/* Noise texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[1] opacity-[0.018]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      <div className="max-w-3xl mx-auto px-6 py-12 relative z-10">
        {/* Progress bar */}
        {currentQuestion > 1 && (
          <div className="mb-10 space-y-3">
            <div className="flex items-center justify-between text-[0.72rem] font-medium tracking-wide text-white/40 uppercase">
              <span>Step {currentQuestion} of {TOTAL_QUESTIONS}</span>
              <span className="text-blue-400 font-semibold">{Math.round(progressPercentage)}%</span>
            </div>
            {/* Custom progress track */}
            <div className="relative h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                initial={false}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.32 }}
            className="relative rounded-2xl border border-white/[0.07] bg-[#0a0c11]/80 backdrop-blur-xl shadow-[0_8px_64px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            {/* Accent top edge glow */}
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

            <div className="p-8 md:p-10">
              {currentQuestion === 1 && (
                <Question1
                  businessType={formData.businessType}
                  customBusinessType={formData.customBusinessType}
                  companyName={formData.companyName}
                  fullName={formData.fullName}
                  email={formData.email}
                  phoneNumber={formData.phoneNumber}
                  onUpdate={updateFormData}
                />
              )}
              {currentQuestion === 2 && (
                <Question2 teamSize={formData.teamSize} onUpdate={updateFormData} />
              )}
              {currentQuestion === 3 && (
                <Question3
                  outreachChannels={formData.outreachChannels}
                  onUpdate={(channels) => updateFormData({ outreachChannels: channels })}
                />
              )}
              {currentQuestion === 4 && (
                <Question4
                  monthlySpend={formData.monthlySpend}
                  monthlyRevenue={formData.monthlyRevenue}
                  fundingStage={formData.fundingStage}
                  onUpdate={updateFormData}
                />
              )}
              {currentQuestion === 5 && (
                <Question5
                  primaryGoal={formData.primaryGoal}
                  onUpdate={(goal) => updateFormData({ primaryGoal: goal })}
                />
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="flex gap-3 mt-6">
          {currentQuestion > 1 && (
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.07] text-white/70 hover:text-white text-sm font-medium transition-all duration-200 backdrop-blur-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          )}

          <button
            onClick={handleNext}
            disabled={!validateQuestion(currentQuestion) || isSubmitting}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              validateQuestion(currentQuestion) && !isSubmitting
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-[0_4px_24px_rgba(37,99,235,0.35)] hover:shadow-[0_4px_32px_rgba(37,99,235,0.5)] hover:brightness-110 active:scale-[0.98]'
                : 'bg-white/[0.05] text-white/25 cursor-not-allowed border border-white/[0.06]'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Submitting...
              </span>
            ) : currentQuestion === TOTAL_QUESTIONS ? (
              <>
                Submit
                <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
