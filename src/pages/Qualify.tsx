import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { DotsPattern } from '@/components/ui/bg-pattern';
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
      case 1:
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
      case 2:
        return !!formData.teamSize;
      case 3:
        const hasChannels = formData.outreachChannels.length > 0;
        const allChannelsTouched = formData.outreachChannels.every((c) => c.touched);
        return hasChannels && allChannelsTouched;
      case 4:
        const needsRevenue = formData.monthlySpend === '0';
        if (needsRevenue) {
          return !!(formData.monthlySpend && formData.fundingStage && formData.monthlyRevenue);
        }
        return !!(formData.monthlySpend && formData.fundingStage);
      case 5:
        return !!formData.primaryGoal;
      default:
        return false;
    }
  };

  const handleNext = async () => {
    if (!validateQuestion(currentQuestion)) {
      return;
    }

    if (currentQuestion === 1 && !formData.submissionId) {
      const submissionId = await saveInitialSubmission({
        businessType: formData.businessType!,
        customBusinessType: formData.customBusinessType,
        companyName: formData.companyName,
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
      });

      if (submissionId) {
        updateFormData({ submissionId });
      }
    }

    if (currentQuestion < TOTAL_QUESTIONS) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      await handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!formData.submissionId) {
      console.error('No submission ID found');
      return;
    }

    setIsSubmitting(true);

    try {
      await updateSubmission(formData.submissionId, formData);
      await sendWebhook(formData.submissionId, formData);
      setShowSuccess(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressPercentage = (currentQuestion / TOTAL_QUESTIONS) * 100;

  if (showSuccess) {
    return <UniversalSuccess />;
  }

  return (
    <div className="relative min-h-screen bg-[#030303] overflow-hidden">
      {/* Gradient Background Layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] via-transparent to-rose-500/[0.03] blur-3xl" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] opacity-25" />

      {/* Noise Texture */}
      <div
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.018]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}
      />

      {/* Radial Spotlight */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.15)_0%,_rgba(6,182,212,0.08)_50%,_transparent_100%)] pointer-events-none blur-2xl" />

      <div className="max-w-3xl mx-auto px-6 py-12 relative z-10">
        {currentQuestion > 1 && (
          <div className="mb-12 space-y-4">
            <div className="flex items-center justify-between text-white/60 text-sm">
              <span>Question {currentQuestion} of {TOTAL_QUESTIONS}</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/5 group hover:border-blue-500/20 transition-all duration-500 overflow-hidden"
          >
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
              <Question2
                teamSize={formData.teamSize}
                onUpdate={updateFormData}
              />
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
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-4 mt-8">
          {currentQuestion > 1 && (
            <Button
              onClick={handleBack}
              variant="outline"
              size="lg"
              className="flex-1 bg-white/5 border-white/10 text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
          )}

          <Button
            onClick={handleNext}
            disabled={!validateQuestion(currentQuestion) || isSubmitting}
            size="lg"
            className={`flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold shadow-[0_4px_24px_rgba(37,99,235,0.3)] hover:shadow-[0_4px_32px_rgba(37,99,235,0.4)] hover:scale-105 transition-all duration-200 ${
              currentQuestion === 1 ? 'w-full' : ''
            }`}
          >
            {isSubmitting ? (
              'Submitting...'
            ) : currentQuestion === TOTAL_QUESTIONS ? (
              <>
                Continue
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            ) : (
              <>
                Next
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
