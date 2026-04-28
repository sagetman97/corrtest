/** Mock domain entities — separated from UI per v2 plan */

// —— Home / operator landing (parity with legacy Overview + Alerts) ——

export const recentActivity = [
  { action: 'Price Lock', loan: 'LN-2847392', borrower: 'Johnson, M.', amount: '$425,000', time: '2 min ago', status: 'locked' as const },
  { action: 'Best Execution', loan: 'LN-2847388', borrower: 'Smith, R.', amount: '$680,000', time: '8 min ago', status: 'success' as const },
  { action: 'Pricing Exception', loan: 'LN-2847385', borrower: 'Davis, K.', amount: '$550,000', time: '15 min ago', status: 'warning' as const },
  { action: 'Lock Expiry', loan: 'LN-2847381', borrower: 'Wilson, T.', amount: '$390,000', time: '22 min ago', status: 'pending' as const },
  { action: 'Commitment', loan: 'LN-2847376', borrower: 'Brown, L.', amount: '$725,000', time: '34 min ago', status: 'active' as const },
  { action: 'Delivery package', loan: 'LN-2847362', borrower: 'Nguyen, P.', amount: '$512,000', time: '41 min ago', status: 'processing' as const },
];

export const activeExceptions = [
  { id: 'EX-0042', loan: 'LN-2847392', type: 'Eligibility Variance', severity: 'High' as const, created: '10:42 AM', status: 'pending' as const },
  { id: 'EX-0041', loan: 'LN-2847388', type: 'Price Adjustment', severity: 'Medium' as const, created: '10:28 AM', status: 'pending' as const },
  { id: 'EX-0040', loan: 'LN-2847385', type: 'Lock Extension', severity: 'Low' as const, created: '10:15 AM', status: 'active' as const },
  { id: 'EX-0039', loan: 'LN-2847360', type: 'Settlement variance', severity: 'High' as const, created: '09:58 AM', status: 'pending' as const },
];

// —— Network / integrations (parity with legacy Integrations page) ——

export type ConnectorHealth = 'Healthy' | 'Degraded' | 'Not Connected';

export const integrationConnectors = [
  { name: 'Encompass LOS', domain: 'Loan Origination System', connStatus: 'active' as const, lastSync: '2 min ago', health: 'Healthy' as const, loans: 1247 },
  { name: 'Black Knight MSP', domain: 'Product & Pricing', connStatus: 'active' as const, lastSync: '5 min ago', health: 'Healthy' as const, loans: 0 },
  { name: 'Optimal Blue', domain: 'Product & Pricing', connStatus: 'active' as const, lastSync: '3 min ago', health: 'Healthy' as const, loans: 0 },
  { name: 'Fannie Mae DU', domain: 'Underwriting', connStatus: 'active' as const, lastSync: '1 min ago', health: 'Healthy' as const, loans: 485 },
  { name: 'Freddie Mac LPA', domain: 'Underwriting', connStatus: 'active' as const, lastSync: '1 min ago', health: 'Healthy' as const, loans: 312 },
  { name: 'CoreLogic Fraud', domain: 'Fraud', connStatus: 'active' as const, lastSync: '9 min ago', health: 'Degraded' as const, loans: 0 },
  { name: 'ICE Mortgage Technology', domain: 'LOS Integration', connStatus: 'active' as const, lastSync: '4 min ago', health: 'Healthy' as const, loans: 643 },
  { name: 'MeridianLink', domain: 'Point of Sale', connStatus: 'pending' as const, lastSync: 'Never', health: 'Not Connected' as const, loans: 0 },
];

export const syncActivityLog = [
  { timestamp: '10:45 AM', integration: 'Encompass LOS', action: 'Loan sync completed', records: 847, status: 'success' as const },
  { timestamp: '10:43 AM', integration: 'Fannie Mae DU', action: 'Underwriting results received', records: 142, status: 'success' as const },
  { timestamp: '10:40 AM', integration: 'CoreLogic Fraud', action: 'Connection timeout — retrying', records: 0, status: 'warning' as const },
  { timestamp: '10:38 AM', integration: 'Freddie Mac LPA', action: 'Underwriting results received', records: 98, status: 'success' as const },
  { timestamp: '10:35 AM', integration: 'Black Knight MSP', action: 'Mark policy feed received', records: 1, status: 'success' as const },
  { timestamp: '10:31 AM', integration: 'ICE Mortgage Technology', action: 'Document index refreshed', records: 312, status: 'success' as const },
];

// —— AI narrative insights (agentic + traceability demo) ——

export const aiRecommendations = [
  {
    id: 'AI-1247',
    title: 'Pricing improvement opportunity',
    description:
      'Analysis shows 12 loans could achieve +8–15 bps better execution by switching to Investor B under current mandatory tape.',
    impact: '+$18,400 estimated gain',
    confidence: 'High' as const,
    loanCount: 12,
    action: 'Review recommendations',
    basis:
      'Historical bid patterns and current investor appetite for similar loan profiles; scored against policy PA-12.',
  },
  {
    id: 'AI-1246',
    title: 'Near-miss eligibility detection',
    description:
      'Five loans scored 0.5–2.0 points below investor guidelines. Minor overlay adjustments could unlock eligibility.',
    impact: '5 additional eligible loans',
    confidence: 'Medium' as const,
    loanCount: 5,
    action: 'View details',
    basis: 'DTI and credit score dimensions within 2 points of published thresholds for Conv Core v8.',
  },
  {
    id: 'AI-1245',
    title: 'Lock extension risk alert',
    description:
      'Eight locks expiring in 5–7 days show elevated fallout risk based on borrower engagement signals.',
    impact: 'Potential $3.2M fallout',
    confidence: 'High' as const,
    loanCount: 8,
    action: 'Contact borrowers',
    basis: 'Engagement model: reduced comms frequency and delayed document submission vs cohort baseline.',
  },
  {
    id: 'AI-1244',
    title: 'Margin optimization',
    description: 'Conv 30Y pricing could move +3–5 bps while maintaining 95%+ win rate in shadow scenarios.',
    impact: '+$12,200/mo revenue',
    confidence: 'Medium' as const,
    loanCount: 247,
    action: 'Run scenario',
    basis: '90-day elasticity vs competitive marks and observed pull-through by channel.',
  },
] as const;

// —— Support / success (pilots & design partners) ——

export const supportContacts = [
  { type: 'Customer Success Manager', name: 'Alex Rodriguez', email: 'alex.rodriguez@polly.io', phone: '+1 (555) 234-5678' },
  { type: 'Technical Support', name: 'Support Team', email: 'support@polly.io', phone: '+1 (555) 234-5679' },
  { type: 'Implementation Lead', name: 'Jordan Kim', email: 'jordan.kim@polly.io', phone: '+1 (555) 234-5680' },
] as const;

export const supportResources = [
  { title: 'Buyer API & marks documentation', category: 'Infrastructure', url: '/pricing/buyer-api' },
  { title: 'Execution & settlement playbooks', category: 'Guides', url: '/settlement/overview' },
  { title: 'API integration guide', category: 'Technical', url: '/network/integrations' },
  { title: 'User roles & notifications', category: 'Administration', url: '/settings/roles' },
  { title: 'Best execution & mandatory tape', category: 'Guides', url: '/trading/mandatory-bid' },
  { title: 'Release notes — April 2026', category: 'Updates', url: '/insights/command' },
] as const;

export const implementationMilestones = [
  { phase: 'Initial setup', status: 'completed' as const, date: '2025-11-15', description: 'Platform provisioning and access configuration' },
  { phase: 'Data integration', status: 'completed' as const, date: '2025-12-08', description: 'LOS and agency connectors established' },
  { phase: 'Marks & eligibility', status: 'completed' as const, date: '2026-01-22', description: 'Buyer API contracts and rule groups configured' },
  { phase: 'User training', status: 'completed' as const, date: '2026-02-14', description: 'Operator onboarding and certification' },
  { phase: 'Demo launch', status: 'completed' as const, date: '2026-03-01', description: 'Demo preview environment activated' },
  { phase: 'Ongoing optimization', status: 'active' as const, date: 'Current', description: 'Continuous improvement and UX iteration' },
] as const;

export const loans = [
  {
    id: 'LN-2847392',
    borrower: 'Johnson, M.',
    amount: 425000,
    stage: 'Lock pending',
    deltaBps: 14,
    buyer: 'North River',
    status: 'attention' as const,
  },
  {
    id: 'LN-2847388',
    borrower: 'Smith, R.',
    amount: 680000,
    stage: 'Best efforts',
    deltaBps: 8,
    buyer: 'Acme Capital',
    status: 'ok' as const,
  },
  {
    id: 'LN-2847376',
    borrower: 'Brown, L.',
    amount: 725000,
    stage: 'Mandatory tape',
    deltaBps: 22,
    buyer: 'Bayline',
    status: 'ok' as const,
  },
];

export const tapes = [
  { id: 'TP-8821', seller: 'Harbor Mtg', loans: 36, bestBid: 101.18, status: 'open' as const },
  { id: 'TP-8819', seller: 'Orion Capital', loans: 22, bestBid: 100.94, status: 'closing' as const },
];

export const packages = [
  { id: 'PK-7721', loanId: 'LN-9821', completeness: 96, nextStep: 'Clearing', risk: 'low' as const },
  { id: 'PK-7718', loanId: 'LN-9816', completeness: 72, nextStep: 'Conditioning', risk: 'high' as const },
];

// —— Admin / governance (unified settings hub) ——

export const adminUsers = [
  { name: 'Sarah Chen', email: 'sarah.chen@abclending.com', role: 'Admin', lastActive: '2 min ago', status: 'active' as const },
  { name: 'Michael Park', email: 'michael.park@abclending.com', role: 'Pricing Manager', lastActive: '15 min ago', status: 'active' as const },
  { name: 'David Liu', email: 'david.liu@abclending.com', role: 'Capital Markets', lastActive: '1 hour ago', status: 'active' as const },
  { name: 'Jennifer Wu', email: 'jennifer.wu@abclending.com', role: 'Operations', lastActive: '3 hours ago', status: 'active' as const },
  { name: 'Robert Martinez', email: 'robert.martinez@abclending.com', role: 'Read Only', lastActive: 'Yesterday', status: 'active' as const },
  { name: 'Emily Johnson', email: 'emily.johnson@abclending.com', role: 'Capital Markets', lastActive: '2 days ago', status: 'active' as const },
];

export const adminRolesSummary = [
  { role: 'Admin', users: 2, permissions: 'Full access to pricing, execution, settlement, and org settings' },
  { role: 'Pricing Manager', users: 3, permissions: 'Publish marks, manage eligibility drafts, buyer API configs' },
  { role: 'Capital Markets', users: 4, permissions: 'Trading desks, commitments, analytics exports' },
  { role: 'Operations', users: 5, permissions: 'Settlement queues, conditioning, delivery inbox' },
  { role: 'Read Only', users: 8, permissions: 'View-only across pillars' },
] as const;

export const adminAuditLog = [
  { timestamp: '2026-04-27 10:42 AM', user: 'Sarah Chen', action: 'Published eligibility draft', resource: 'Conv Core v8.2', ip: '192.168.1.42' },
  { timestamp: '2026-04-27 10:38 AM', user: 'Michael Park', action: 'Acknowledged mandatory tape', resource: 'TP-8821', ip: '192.168.1.55' },
  { timestamp: '2026-04-27 10:15 AM', user: 'David Liu', action: 'Exported reconciliation bundle', resource: '847 loans', ip: '192.168.1.73' },
  { timestamp: '2026-04-27 09:52 AM', user: 'Sarah Chen', action: 'Modified notification policy', resource: 'Settlement SLA', ip: '192.168.1.42' },
  { timestamp: '2026-04-27 09:30 AM', user: 'Jennifer Wu', action: 'Approved conditioning exception', resource: 'EX-0042', ip: '192.168.1.88' },
];

// —— Cash & escrow (Brief: master/sub escrow, release on buyer approval) ——

export const escrowMasterAccount = {
  id: 'ESC-MASTER-01',
  label: 'Buyer master escrow',
  buyer: 'North River Capital',
  currency: 'USD',
  balance: '$128.4M',
  availableToRelease: '$14.2M',
  holds: '$3.1M',
  status: 'active' as const,
};

export const escrowSubAccounts = [
  { id: 'SUB-8842', seller: 'Harbor Mtg', balance: '$42.1M', pendingRelease: '$2.4M', holdReason: 'Buyer approval pending', status: 'pending_release' as const },
  { id: 'SUB-8839', seller: 'Orion Capital', balance: '$31.6M', pendingRelease: '$0', holdReason: '—', status: 'cleared' as const },
  { id: 'SUB-8831', seller: 'Keystone LLC', balance: '$18.9M', pendingRelease: '$1.1M', holdReason: 'Variance review CS-547', status: 'on_hold' as const },
  { id: 'SUB-8827', seller: 'Northpoint', balance: '$35.8M', pendingRelease: '$0', holdReason: '—', status: 'cleared' as const },
];

export const cashSettlementLines = [
  { settlement_id: 'CS-551', counterparty: 'Bayline', expected: '$6.4M', variance: '$0', wire_status: 'Sent', state: 'completed' as const },
  { settlement_id: 'CS-547', counterparty: 'Harbor', expected: '$5.2M', variance: '$42K', wire_status: 'Held', state: 'warning' as const },
  { settlement_id: 'CS-540', counterparty: 'Acme Capital', expected: '$8.1M', variance: '$0', wire_status: 'Queued', state: 'processing' as const },
  { settlement_id: 'CS-538', counterparty: 'North River', expected: '$4.6M', variance: '$0', wire_status: 'Sent', state: 'completed' as const },
];

// —— Pricing programs (API-first Programs catalog — not “rate sheet” center of gravity) ——

export const pricingProgramsCatalog = [
  { name: 'Conventional 30Y Fixed', version: 'v4.2.1', status: 'active' as const, lastUpdate: '2026-04-25 09:15 AM', rules: 247, pendingChanges: 3 },
  { name: 'FHA 30Y Fixed', version: 'v4.2.1', status: 'active' as const, lastUpdate: '2026-04-25 09:15 AM', rules: 189, pendingChanges: 2 },
  { name: 'VA 30Y Fixed', version: 'v4.2.0', status: 'active' as const, lastUpdate: '2026-04-22 02:30 PM', rules: 156, pendingChanges: 0 },
  { name: 'Jumbo 30Y Fixed', version: 'v4.2.1', status: 'active' as const, lastUpdate: '2026-04-25 09:15 AM', rules: 203, pendingChanges: 5 },
  { name: 'Conventional 15Y Fixed', version: 'v4.1.8', status: 'pending' as const, lastUpdate: '2026-04-26 04:45 PM', rules: 198, pendingChanges: 8 },
  { name: 'ARM 5/1', version: 'v4.2.0', status: 'active' as const, lastUpdate: '2026-04-22 02:30 PM', rules: 134, pendingChanges: 1 },
];

export const pricingConfigurationChanges = [
  { id: 'CHG-1847', product: 'Conventional 30Y Fixed', change: 'LLPA adjustment for DTI > 45%', author: 'Sarah Chen', timestamp: '2026-04-25 09:15 AM', status: 'active' as const },
  { id: 'CHG-1846', product: 'Jumbo 30Y Fixed', change: 'Updated investor overlays for credit score bands', author: 'Michael Park', timestamp: '2026-04-25 09:12 AM', status: 'active' as const },
  { id: 'CHG-1845', product: 'FHA 30Y Fixed', change: 'Marks effective 4/26 — buyer API payload v2', author: 'Sarah Chen', timestamp: '2026-04-25 08:45 AM', status: 'active' as const },
  { id: 'CHG-1844', product: 'Conventional 15Y Fixed', change: 'Lock policy window extended to 90 days', author: 'David Liu', timestamp: '2026-04-26 04:45 PM', status: 'pending' as const },
];

// —— Executive analytics (combined command center) ——

export const execVolumeTrend = [
  { date: '4/20', locks: 142, volume: 48.2 },
  { date: '4/21', locks: 156, volume: 52.8 },
  { date: '4/22', locks: 168, volume: 57.3 },
  { date: '4/23', locks: 145, volume: 49.1 },
  { date: '4/24', locks: 171, volume: 61.5 },
  { date: '4/25', locks: 183, volume: 68.2 },
  { date: '4/26', locks: 177, volume: 64.7 },
];

export const execMarginByProduct = [
  { product: 'Conv 30Y', margin: 58, volume: 124.5 },
  { product: 'FHA 30Y', margin: 48, volume: 86.3 },
  { product: 'VA 30Y', margin: 45, volume: 42.8 },
  { product: 'Jumbo 30Y', margin: 42, volume: 68.2 },
  { product: 'Conv 15Y', margin: 62, volume: 51.7 },
  { product: 'ARM 5/1', margin: 38, volume: 28.9 },
];

export const execChannelPerformance = [
  { channel: 'Retail', locks: 485, volume: 172.3, pullThrough: 89.2 },
  { channel: 'Wholesale', locks: 312, volume: 98.7, pullThrough: 85.6 },
  { channel: 'Correspondent', locks: 156, volume: 52.4, pullThrough: 91.8 },
  { channel: 'Consumer Direct', locks: 94, volume: 28.1, pullThrough: 82.3 },
];

// —— Capital markets / trading desk (Corrtest-old Loan Trading parity) ——

export const investorBidsSnapshot = [
  { investor: 'Fannie Mae', product: 'Conv 30Y Fixed', loans: 47, volume: '$18.2M', avgPrice: '101.250', margin: '+58 bps', status: 'active' as const },
  { investor: 'Freddie Mac', product: 'Conv 30Y Fixed', loans: 52, volume: '$21.5M', avgPrice: '101.125', margin: '+52 bps', status: 'active' as const },
  { investor: 'Ginnie Mae', product: 'FHA 30Y Fixed', loans: 38, volume: '$14.8M', avgPrice: '100.875', margin: '+48 bps', status: 'active' as const },
  { investor: 'Wells Fargo', product: 'Jumbo 30Y Fixed', loans: 23, volume: '$12.3M', avgPrice: '100.625', margin: '+42 bps', status: 'active' as const },
  { investor: 'UWM', product: 'Conv 15Y Fixed', loans: 31, volume: '$9.7M', avgPrice: '101.375', margin: '+62 bps', status: 'active' as const },
  { investor: 'Rocket Mortgage', product: 'VA 30Y Fixed', loans: 19, volume: '$7.4M', avgPrice: '100.750', margin: '+45 bps', status: 'pending' as const },
];

export const activeCommitments = [
  { id: 'CMT-8472', investor: 'Fannie Mae', type: 'Mandatory' as const, volume: '$45.2M', deliveryDate: '2026-05-15', status: 'active' as const, utilization: '78%' },
  { id: 'CMT-8471', investor: 'Freddie Mac', type: 'Best Efforts' as const, volume: '$32.8M', deliveryDate: '2026-05-20', status: 'active' as const, utilization: '65%' },
  { id: 'CMT-8470', investor: 'Ginnie Mae', type: 'Mandatory' as const, volume: '$28.5M', deliveryDate: '2026-05-18', status: 'locked' as const, utilization: '92%' },
  { id: 'CMT-8469', investor: 'Wells Fargo', type: 'Best Efforts' as const, volume: '$19.3M', deliveryDate: '2026-06-01', status: 'pending' as const, utilization: '34%' },
];

// —— Reconciliation / wires (Brief purchase advice & warehouse instructions) ——

export const warehouseWireQueue = [
  {
    id: 'WH-901',
    institution: 'Wells Fargo Warehouse Trust',
    purpose: 'Purchase funding — CS-551 / Bayline',
    aba: '121000248',
    beneficiary: 'Polly Master Escrow ****7721',
    status: 'sent' as const,
    amount: '$6.4M',
  },
  {
    id: 'WH-898',
    institution: 'JP Morgan Custody',
    purpose: 'Warehouse rollover — Harbor tape',
    aba: '021000021',
    beneficiary: 'Custody ****4420',
    status: 'queued' as const,
    amount: '$5.2M',
  },
  {
    id: 'WH-894',
    institution: 'Bank of America',
    purpose: 'Variance hold — CS-547 pending approval',
    aba: '026009593',
    beneficiary: 'Sub-escrow SUB-8831',
    status: 'held' as const,
    amount: '$42K',
  },
];

export const bidSnapshotFieldCompare = [
  { field: 'Base price', bid: '100.125', delivered: '100.125', aligned: true },
  { field: 'LLPA stack', bid: '-0.750', delivered: '-0.750', aligned: true },
  { field: 'SRP tier', bid: '1.125', delivered: '1.090', aligned: false },
  { field: 'Product / program', bid: 'Conv 30Y', delivered: 'Conv 30Y', aligned: true },
];

export const purchaseAdviceWireRoutes = [
  {
    pa_id: 'PA-812',
    buyer: 'North River',
    warehouse: 'Wells Fargo Warehouse Trust',
    instructed: '2026-04-27 09:42 ET',
    status: 'confirmed' as const,
  },
  {
    pa_id: 'PA-809',
    buyer: 'Acme Capital',
    warehouse: 'JP Morgan Custody',
    instructed: '2026-04-26 16:05 ET',
    status: 'pending_dual_control' as const,
  },
];
