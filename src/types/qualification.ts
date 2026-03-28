export type BusinessType =
  | 'agency'
  | 'saas'
  | 'ecommerce'
  | 'startup'
  | 'consulting'
  | 'other';

export type TeamSize =
  | 'solo'
  | '2-5'
  | '6-20'
  | '21-50'
  | '50+';

export type FundingStage =
  | 'seed'
  | 'series_a'
  | 'series_b_plus'
  | 'bootstrapped'
  | 'pre_revenue'
  | 'not_seeking';

export type OutreachChannel =
  | 'cold_email'
  | 'cold_calling'
  | 'linkedin'
  | 'facebook'
  | 'instagram'
  | 'google_ads'
  | 'other';

export interface ChannelWithLevel {
  channel: OutreachChannel;
  successLevel: number;
  touched: boolean;
}

export type MonthlySpend =
  | '0'
  | '1-500'
  | '500-2k'
  | '2k-10k'
  | '10k+';

export type MonthlyRevenue =
  | '0-10k'
  | '10k-50k'
  | '50k-100k'
  | '100k-500k'
  | '500k+';

export type PrimaryGoal =
  | 'more_leads'
  | 'better_conversions'
  | 'scale_team'
  | 'reduce_costs'
  | 'improve_systems'
  | 'new_markets';

export interface QualificationFormData {
  submissionId?: string;
  businessType: BusinessType | null;
  companyName: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  teamSize: TeamSize | null;
  fundingStage: FundingStage | null;
  outreachChannels: ChannelWithLevel[];
  monthlySpend: MonthlySpend | null;
  monthlyRevenue: MonthlyRevenue | null;
  primaryGoal: PrimaryGoal | null;
}
