/**
 * Prototype command-palette / global search index. Expand with real search service in production.
 */
export type SearchIndexItem = {
  id: string;
  path: string;
  label: string;
  description: string;
  group: string;
  /** Extra match terms (lowercased when matching). */
  keywords?: string[];
};

export const globalSearchIndex: SearchIndexItem[] = [
  { id: 'h1', path: '/home', label: 'Home · Operations overview', description: 'Activity, exceptions, KPIs', group: 'Core', keywords: ['dashboard', 'landing'] },
  { id: 'p0', path: '/pricing/overview', label: 'Pricing overview', description: 'Infrastructure pillar hub', group: 'Pricing & marks' },
  { id: 'p1', path: '/pricing/programs', label: 'Pricing programs', description: 'Catalog & changelog', group: 'Pricing & marks', keywords: ['marks', 'versions'] },
  { id: 'p2', path: '/pricing/buyer-api', label: 'Buyer API config', description: 'Contract & payload', group: 'Pricing & marks', keywords: ['api', 'integration'] },
  { id: 'p3', path: '/pricing/marks', label: 'Base pricing & marks', description: 'Feeds & overlays', group: 'Pricing & marks' },
  { id: 'p4', path: '/pricing/eligibility', label: 'Eligibility rules', description: 'Rule groups & drafts', group: 'Pricing & marks' },
  { id: 'p5', path: '/pricing/llpa-srp', label: 'LLPA / SRP workspace', description: 'Grid & cash-flow', group: 'Pricing & marks', keywords: ['msr', 'grid'] },
  { id: 't0', path: '/trading/overview', label: 'Trading overview', description: 'Execution pillar hub', group: 'Trading & execution' },
  { id: 't1', path: '/trading/best-efforts', label: 'Best efforts desk', description: 'Locks & matching', group: 'Trading & execution' },
  { id: 't2', path: '/trading/mandatory-bid', label: 'Mandatory bid desk', description: 'Bid tapes', group: 'Trading & execution', keywords: ['tape', 'hedge'] },
  { id: 't3', path: '/trading/opportunities', label: 'Opportunity discovery', description: 'Agentic queue', group: 'Trading & execution', keywords: ['ai'] },
  { id: 't4', path: '/trading/market-making', label: 'Market making controls', description: 'Guardrails', group: 'Trading & execution' },
  { id: 't5', path: '/trading/pipeline-marks', label: 'Pipeline marks', description: 'Reserve spread', group: 'Trading & execution' },
  { id: 't6', path: '/trading/shadow-bidding', label: 'Shadow bidding', description: 'What-if scenarios', group: 'Trading & execution' },
  { id: 's0', path: '/settlement/overview', label: 'Settlement overview', description: 'Settlement pillar hub', group: 'Settlement & cash' },
  { id: 's1', path: '/settlement/delivery', label: 'Delivery inbox', description: 'Packages', group: 'Settlement & cash' },
  { id: 's1b', path: '/settlement/conditioning', label: 'Conditioning workspace', description: 'Exception loops', group: 'Settlement & cash', keywords: ['conditions', 'stips'] },
  { id: 's1c', path: '/settlement/clearing', label: 'Clearing queue', description: 'Clear/return and escrow gates', group: 'Settlement & cash', keywords: ['clear', 'escrow'] },
  { id: 's1d', path: '/settlement/compliance', label: 'Operational compliance', description: 'ULDD, docs, fraud, QC', group: 'Settlement & cash', keywords: ['fraud', 'uldd', 'qc'] },
  { id: 's2', path: '/settlement/cash', label: 'Cash & escrow', description: 'Master/sub escrow', group: 'Settlement & cash', keywords: ['wire', 'funding'] },
  { id: 's3', path: '/settlement/reconciliation', label: 'Reconciliation', description: 'Bid vs delivered and adjustments', group: 'Settlement & cash' },
  { id: 's4', path: '/settlement/purchase-advice', label: 'Purchase advice', description: 'PA workflow', group: 'Settlement & cash' },
  { id: 's5', path: '/settlement/servicing', label: 'Servicing onboarding', description: 'Transfer readiness', group: 'Settlement & cash', keywords: ['servicing'] },
  { id: 's6', path: '/settlement/custodial', label: 'Custodial tracking', description: 'E-notes and MERS', group: 'Settlement & cash', keywords: ['mers', 'custody'] },
  { id: 's7', path: '/settlement/post-close', label: 'Post-close performance', description: 'EPO/EPD signals', group: 'Settlement & cash', keywords: ['epo', 'epd', 'prepay'] },
  { id: 'n0', path: '/network/overview', label: 'Network overview', description: 'Counterparties and connectors hub', group: 'Network' },
  { id: 'n1', path: '/network/integrations', label: 'Integrations', description: 'Connectors & sync log', group: 'Network', keywords: ['los', 'encompass'] },
  { id: 'n2', path: '/network/buyers', label: 'Buyer directory', description: 'Buyer appetite and API posture', group: 'Network', keywords: ['buyers', 'counterparties'] },
  { id: 'n3', path: '/network/sellers', label: 'Seller directory', description: 'Seller profiles and preferences', group: 'Network', keywords: ['sellers', 'counterparties'] },
  { id: 'n4', path: '/network/approvals', label: 'Approval relationships', description: 'Buyer/seller approval graph', group: 'Network', keywords: ['approval', 'relationships'] },
  { id: 'i1', path: '/insights/command', label: 'Insights command center', description: 'Executive analytics', group: 'Insights' },
  { id: 'i2', path: '/insights/ai', label: 'AI insights', description: 'Recommendations', group: 'Insights' },
  { id: 'i3', path: '/insights/execution-delta', label: 'Execution delta', description: 'Spread and fallback comparison', group: 'Insights' },
  { id: 'i4', path: '/insights/margin-accuracy', label: 'Margin accuracy', description: 'Observed vs configured margin', group: 'Insights' },
  { id: 'i5', path: '/insights/market-share', label: 'Market share', description: 'Channel and buyer share trends', group: 'Insights' },
  { id: 'i6', path: '/insights/sla-throughput', label: 'SLA & throughput', description: 'Intake-to-settlement timings', group: 'Insights' },
  { id: 'g1', path: '/settings/admin', label: 'Administration', description: 'Users & audit', group: 'Settings', keywords: ['roles', 'governance'] },
  { id: 'g1b', path: '/settings/roles', label: 'User roles', description: 'Capability matrix', group: 'Settings', keywords: ['permissions'] },
  { id: 'g1c', path: '/settings/policies', label: 'Notification policies', description: 'Alerts and escalations', group: 'Settings' },
  { id: 'g1d', path: '/settings/templates', label: 'Rule templates', description: 'Pricing and settlement templates', group: 'Settings' },
  { id: 'g1e', path: '/settings/adapter-showcase', label: 'Adapter showcase', description: 'Polly React UI parity samples', group: 'Settings' },
  { id: 'g2', path: '/program', label: 'Program · monetization', description: 'Buyer/seller economics', group: 'Program' },
  { id: 'g3', path: '/support', label: 'Support & success', description: 'Contacts & timeline', group: 'Support' },
];
