import { ReactNode } from 'react';
import {
  AdminPoliciesPage,
  AdminRolesPage,
  AdminTemplatesPage,
  AdapterShowcasePage,
  AnalyticsExecutionDeltaPage,
  AnalyticsMarginAccuracyPage,
  AnalyticsMarketSharePage,
  AnalyticsSlaThroughputPage,
  ApprovalRelationshipsPage,
  BasePricingMarksPage,
  BestEffortsDeskPage,
  BuyerApiConfigPage,
  BuyerDirectoryPage,
  CashSettlementMonitorPage,
  ClearingQueuePage,
  ConditioningWorkspacePage,
  DashboardPage,
  DeliveryInboxPage,
  EligibilityRulesPage,
  IntegrationMappingsPage,
  LlpSrpWorkspacePage,
  MandatoryBidDeskPage,
  MarketMakingControlsPage,
  MonetizationModelPage,
  OpportunityDiscoveryPage,
  OperationalCompliancePage,
  PipelineMarksPage,
  PostClosingPerformancePage,
  PurchaseAdviceWorkspacePage,
  ReconciliationAdjustmentsPage,
  ServicingOnboardingPage,
  SellerDirectoryPage,
  ShadowBiddingPage,
  CustodialTrackingPage,
} from '../pages/ux/routePages';

export interface AppRoute {
  path: string;
  label: string;
  group: string;
  element: ReactNode;
}

export const appRoutes: AppRoute[] = [
  { path: '/', label: 'Dashboard', group: 'Dashboard', element: <DashboardPage /> },
  { path: '/pricing/buyer-api-config', label: 'Buyer API Config', group: 'Pricing Infrastructure', element: <BuyerApiConfigPage /> },
  { path: '/pricing/base-pricing-marks', label: 'Base Pricing & Marks', group: 'Pricing Infrastructure', element: <BasePricingMarksPage /> },
  { path: '/pricing/eligibility-rules', label: 'Eligibility & Rule Updates', group: 'Pricing Infrastructure', element: <EligibilityRulesPage /> },
  { path: '/pricing/llpa-srp-workspace', label: 'LLPA/SRP Config Workspace', group: 'Pricing Infrastructure', element: <LlpSrpWorkspacePage /> },
  { path: '/execution/best-efforts', label: 'Best Efforts Desk', group: 'Execution', element: <BestEffortsDeskPage /> },
  { path: '/execution/mandatory-bid', label: 'Mandatory Bid Desk', group: 'Execution', element: <MandatoryBidDeskPage /> },
  { path: '/execution/opportunity-discovery', label: 'Opportunity Discovery', group: 'Execution', element: <OpportunityDiscoveryPage /> },
  { path: '/execution/market-making-controls', label: 'Market Making Controls', group: 'Execution', element: <MarketMakingControlsPage /> },
  { path: '/execution/pipeline-marks', label: 'Pipeline Marks', group: 'Execution', element: <PipelineMarksPage /> },
  { path: '/execution/shadow-bidding', label: 'Shadow Bidding', group: 'Execution', element: <ShadowBiddingPage /> },
  { path: '/settlement/delivery-inbox', label: 'Delivery Inbox', group: 'Settlement', element: <DeliveryInboxPage /> },
  { path: '/settlement/conditioning-workspace', label: 'Conditioning Workspace', group: 'Settlement', element: <ConditioningWorkspacePage /> },
  { path: '/settlement/clearing-queue', label: 'Clearing Queue', group: 'Settlement', element: <ClearingQueuePage /> },
  { path: '/settlement/purchase-advice', label: 'Purchase Advice Workspace', group: 'Settlement', element: <PurchaseAdviceWorkspacePage /> },
  { path: '/settlement/cash-monitor', label: 'Cash Settlement Monitor', group: 'Settlement', element: <CashSettlementMonitorPage /> },
  { path: '/settlement/operational-compliance', label: 'Operational Compliance', group: 'Settlement', element: <OperationalCompliancePage /> },
  { path: '/settlement/reconciliation-adjustments', label: 'Reconciliation & Adjustments', group: 'Settlement', element: <ReconciliationAdjustmentsPage /> },
  { path: '/settlement/servicing-onboarding', label: 'Servicing Onboarding', group: 'Settlement', element: <ServicingOnboardingPage /> },
  { path: '/settlement/custodial-tracking', label: 'Custodial Tracking', group: 'Settlement', element: <CustodialTrackingPage /> },
  { path: '/settlement/post-closing-performance', label: 'Post Closing Performance', group: 'Settlement', element: <PostClosingPerformancePage /> },
  { path: '/counterparties/buyers', label: 'Buyer Directory', group: 'Counterparties', element: <BuyerDirectoryPage /> },
  { path: '/counterparties/sellers', label: 'Seller Directory', group: 'Counterparties', element: <SellerDirectoryPage /> },
  { path: '/counterparties/approval-relationships', label: 'Approval Relationships', group: 'Counterparties', element: <ApprovalRelationshipsPage /> },
  { path: '/integrations/mappings', label: 'LOS/Doc/Fraud/Servicing', group: 'Integrations', element: <IntegrationMappingsPage /> },
  { path: '/analytics/execution-delta', label: 'Execution Delta', group: 'Analytics', element: <AnalyticsExecutionDeltaPage /> },
  { path: '/analytics/margin-accuracy', label: 'Margin Accuracy', group: 'Analytics', element: <AnalyticsMarginAccuracyPage /> },
  { path: '/analytics/market-share', label: 'Market Share', group: 'Analytics', element: <AnalyticsMarketSharePage /> },
  { path: '/analytics/sla-throughput', label: 'SLA & Throughput', group: 'Analytics', element: <AnalyticsSlaThroughputPage /> },
  { path: '/admin/rule-templates', label: 'Rule Templates', group: 'Admin', element: <AdminTemplatesPage /> },
  { path: '/admin/user-roles', label: 'User Roles', group: 'Admin', element: <AdminRolesPage /> },
  { path: '/admin/policies', label: 'Notification Policies', group: 'Admin', element: <AdminPoliciesPage /> },
  { path: '/admin/monetization-model', label: 'Monetization Model', group: 'Admin', element: <MonetizationModelPage /> },
  { path: '/admin/adapter-showcase', label: 'Adapter Showcase', group: 'Admin', element: <AdapterShowcasePage /> },
];

export const groupedRoutes = appRoutes.reduce<Record<string, AppRoute[]>>((acc, route) => {
  acc[route.group] = [...(acc[route.group] ?? []), route];
  return acc;
}, {});
