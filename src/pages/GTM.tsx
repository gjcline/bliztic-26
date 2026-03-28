import React from 'react';
import { HeroGeometric } from '../components/ui/hero-geometric';
import CTA from '../components/CTA';
import GTMComparisonChart from '../components/ui/gtm-comparison-chart';
import GTMResultsBlock from '../components/ui/gtm-results-block';

const GTM: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <HeroGeometric
        title1=""
        title2="Bulletproof GTM infrastructure"
        subtitle="Winning a market is easy, owning it is not."
        description="Most companies can win a market once, our clients own it forever."
        primaryActionText=""
        secondaryActionText="How?"
        secondaryActionHref="#gtm-section"
      />

      {/* GTM Comparison Section */}
      <GTMComparisonChart />

      {/* GTM Results Block */}
      <GTMResultsBlock />

      {/* CTA Section */}
      <CTA />
    </>
  );
};

export default GTM;
