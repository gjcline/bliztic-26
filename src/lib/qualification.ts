import { supabase } from './supabase';
import type {
  BusinessType,
  TeamSize,
  FundingStage,
  OutreachChannel,
  MonthlySpend,
  MonthlyRevenue,
  PrimaryGoal,
  QualificationFormData,
  ChannelWithLevel,
} from '@/types/qualification';

export const businessTypeLabels: Record<BusinessType, string> = {
  agency: 'Agency',
  saas: 'SaaS',
  ecommerce: 'E-commerce',
  startup: 'Startup',
  consulting: 'Consulting',
  other: 'Other',
};

export const teamSizeLabels: Record<TeamSize, string> = {
  solo: 'Solo (Just me)',
  '2-5': '2-5 people',
  '6-20': '6-20 people',
  '21-50': '21-50 people',
  '50+': '50+ people',
};

export const fundingStageLabels: Record<FundingStage, string> = {
  seed: 'Seed',
  series_a: 'Series A',
  series_b_plus: 'Series B+',
  bootstrapped: 'Bootstrapped/Profitable',
  pre_revenue: 'Pre-revenue',
  not_seeking: 'Not seeking funding',
};

export const outreachChannelLabels: Record<OutreachChannel, string> = {
  cold_email: 'Cold Email',
  cold_calling: 'Cold Calling',
  linkedin: 'LinkedIn',
  facebook: 'Facebook / Instagram (Meta) Ads',
  x: 'X Ads',
  organic_content: 'Organic Content',
  google_ads: 'Google Ads',
  other: 'Other',
};

export const monthlySpendLabels: Record<MonthlySpend, string> = {
  '0': '$0',
  '1-500': '$1K - $50K',
  '500-2k': '$50K - $200K',
  '2k-10k': '$200K - $1M',
  '10k+': '$1M+',
};

export const monthlyRevenueLabels: Record<MonthlyRevenue, string> = {
  '0-10k': '$0 - $10K',
  '10k-50k': '$10K - $50K',
  '50k-100k': '$50K - $100K',
  '100k-500k': '$100K - $500K',
  '500k+': '$500K+',
};

export const primaryGoalLabels: Record<PrimaryGoal, string> = {
  more_leads: 'Generate more qualified leads',
  better_conversions: 'Improve conversion rates',
  scale_team: 'Scale my team and operations',
  reduce_costs: 'Reduce customer acquisition costs',
  improve_systems: 'Build better systems and processes',
  new_markets: 'Expand to new markets',
};

export async function saveInitialSubmission(data: {
  businessType: BusinessType;
  companyName: string;
  fullName: string;
  email: string;
  phoneNumber: string;
}): Promise<string | null> {
  try {
    const { data: submission, error } = await supabase
      .from('qualification_submissions')
      .insert({
        business_type: data.businessType,
        company_name: data.companyName,
        full_name: data.fullName,
        email: data.email,
        phone_number: data.phoneNumber,
        status: 'in_progress',
      })
      .select('id')
      .single();

    if (error) {
      console.error('Error saving initial submission:', error);
      return null;
    }

    return submission?.id || null;
  } catch (error) {
    console.error('Error saving initial submission:', error);
    return null;
  }
}

export async function updateSubmission(
  submissionId: string,
  data: Partial<QualificationFormData>
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('qualification_submissions')
      .update({
        team_size: data.teamSize,
        funding_stage: data.fundingStage,
        outreach_channels: data.outreachChannels,
        monthly_spend: data.monthlySpend,
        monthly_revenue: data.monthlyRevenue,
        primary_goal: data.primaryGoal,
        status: 'completed',
        last_updated_at: new Date().toISOString(),
      })
      .eq('id', submissionId);

    if (error) {
      console.error('Error updating submission:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error updating submission:', error);
    return false;
  }
}

export async function sendWebhook(
  submissionId: string,
  formData: QualificationFormData
): Promise<boolean> {
  const webhookUrl = import.meta.env.VITE_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error('Webhook URL not configured');
    return false;
  }

  try {
    const payload = {
      submissionId,
      timestamp: new Date().toISOString(),
      contactInfo: {
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        companyName: formData.companyName,
      },
      answers: {
        businessType: formData.businessType ? businessTypeLabels[formData.businessType] : null,
        teamSize: formData.teamSize ? teamSizeLabels[formData.teamSize] : null,
        fundingStage: formData.fundingStage ? fundingStageLabels[formData.fundingStage] : null,
        outreachChannels: formData.outreachChannels.map((ch: ChannelWithLevel) => ({
          channel: outreachChannelLabels[ch.channel],
          successLevel: ch.successLevel,
        })),
        monthlySpend: formData.monthlySpend ? monthlySpendLabels[formData.monthlySpend] : null,
        monthlyRevenue: formData.monthlyRevenue ? monthlyRevenueLabels[formData.monthlyRevenue] : null,
        primaryGoal: formData.primaryGoal ? primaryGoalLabels[formData.primaryGoal] : null,
      },
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error('Webhook request failed:', response.status);
      return false;
    }

    await supabase
      .from('qualification_submissions')
      .update({
        webhook_sent: true,
        webhook_sent_at: new Date().toISOString(),
      })
      .eq('id', submissionId);

    return true;
  } catch (error) {
    console.error('Error sending webhook:', error);
    return false;
  }
}
