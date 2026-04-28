import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router';
import type { ReactElement } from 'react';
import { ShellProvider } from './context/ShellContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppShell } from './layouts/AppShell';
import { PricingLayout } from './layouts/PricingLayout';
import { TradingLayout } from './layouts/TradingLayout';
import { SettlementLayout } from './layouts/SettlementLayout';
import { NetworkLayout } from './layouts/NetworkLayout';
import { InsightsLayout } from './layouts/InsightsLayout';
import { SettingsLayout } from './layouts/SettingsLayout';
import { PToastHost } from './components/polly';
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
  BuyerDirectoryPage,
  SettingsAdminOverviewPage,
  InsightsExecutivePage,
  PricingProgramsPage,
} from './pages/ux/routePages';
import {
  InsightsHubPage,
  NetworkOverviewPage,
  PricingOverviewPage,
  SettingsHubPage,
  SettlementOverviewPage,
  TradingOverviewPage,
} from './pages/v2/HubPages';
import { AiInsightsNarrativePage } from './pages/v2/AiInsightsNarrativePage';
import { SupportPage } from './pages/v2/SupportPage';
import { LoginPage } from './pages/v2/LoginPage';

function RequireAuth({ children }: { children: ReactElement }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ShellProvider>
          <>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                element={
                  <RequireAuth>
                    <AppShell />
                  </RequireAuth>
                }
              >
                <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<DashboardPage />} />

              <Route path="/pricing" element={<PricingLayout />}>
                <Route index element={<Navigate to="overview" replace />} />
                <Route path="overview" element={<PricingOverviewPage />} />
                <Route path="programs" element={<PricingProgramsPage />} />
                <Route path="buyer-api" element={<BuyerApiConfigPage />} />
                <Route path="marks" element={<BasePricingMarksPage />} />
                <Route path="eligibility" element={<EligibilityRulesPage />} />
                <Route path="llpa-srp" element={<LlpSrpWorkspacePage />} />
              </Route>

              <Route path="/trading" element={<TradingLayout />}>
                <Route index element={<Navigate to="overview" replace />} />
                <Route path="overview" element={<TradingOverviewPage />} />
                <Route path="best-efforts" element={<BestEffortsDeskPage />} />
                <Route path="mandatory-bid" element={<MandatoryBidDeskPage />} />
                <Route path="opportunities" element={<OpportunityDiscoveryPage />} />
                <Route path="market-making" element={<MarketMakingControlsPage />} />
                <Route path="pipeline-marks" element={<PipelineMarksPage />} />
                <Route path="shadow-bidding" element={<ShadowBiddingPage />} />
              </Route>

              <Route path="/settlement" element={<SettlementLayout />}>
                <Route index element={<Navigate to="overview" replace />} />
                <Route path="overview" element={<SettlementOverviewPage />} />
                <Route path="delivery" element={<DeliveryInboxPage />} />
                <Route path="conditioning" element={<ConditioningWorkspacePage />} />
                <Route path="clearing" element={<ClearingQueuePage />} />
                <Route path="purchase-advice" element={<PurchaseAdviceWorkspacePage />} />
                <Route path="cash" element={<CashSettlementMonitorPage />} />
                <Route path="compliance" element={<OperationalCompliancePage />} />
                <Route path="reconciliation" element={<ReconciliationAdjustmentsPage />} />
                <Route path="servicing" element={<ServicingOnboardingPage />} />
                <Route path="custodial" element={<CustodialTrackingPage />} />
                <Route path="post-close" element={<PostClosingPerformancePage />} />
              </Route>

              <Route path="/network" element={<NetworkLayout />}>
                <Route index element={<Navigate to="overview" replace />} />
                <Route path="overview" element={<NetworkOverviewPage />} />
                <Route path="buyers" element={<BuyerDirectoryPage />} />
                <Route path="sellers" element={<SellerDirectoryPage />} />
                <Route path="approvals" element={<ApprovalRelationshipsPage />} />
                <Route path="integrations" element={<IntegrationMappingsPage />} />
              </Route>

              <Route path="/insights" element={<InsightsLayout />}>
                <Route index element={<InsightsHubPage />} />
                <Route path="command" element={<InsightsExecutivePage />} />
                <Route path="ai" element={<AiInsightsNarrativePage />} />
                <Route path="execution-delta" element={<AnalyticsExecutionDeltaPage />} />
                <Route path="margin-accuracy" element={<AnalyticsMarginAccuracyPage />} />
                <Route path="market-share" element={<AnalyticsMarketSharePage />} />
                <Route path="sla-throughput" element={<AnalyticsSlaThroughputPage />} />
              </Route>

              <Route path="/settings" element={<SettingsLayout />}>
                <Route index element={<SettingsHubPage />} />
                <Route path="admin" element={<SettingsAdminOverviewPage />} />
                <Route path="roles" element={<AdminRolesPage />} />
                <Route path="policies" element={<AdminPoliciesPage />} />
                <Route path="templates" element={<AdminTemplatesPage />} />
                <Route path="adapter-showcase" element={<AdapterShowcasePage />} />
              </Route>

              <Route path="/program" element={<MonetizationModelPage />} />

              <Route path="/support" element={<SupportPage />} />
              <Route path="/ai-insights" element={<Navigate to="/insights/ai" replace />} />
              <Route path="/analytics" element={<Navigate to="/insights/command" replace />} />
              <Route path="/admin" element={<Navigate to="/settings/admin" replace />} />

              {/* Legacy IA — deep links & bookmarks */}
              <Route path="/pricing/buyer-api-config" element={<Navigate to="/pricing/buyer-api" replace />} />
              <Route path="/pricing/base-pricing-marks" element={<Navigate to="/pricing/marks" replace />} />
              <Route path="/pricing/eligibility-rules" element={<Navigate to="/pricing/eligibility" replace />} />
              <Route path="/pricing/llpa-srp-workspace" element={<Navigate to="/pricing/llpa-srp" replace />} />

              <Route path="/execution/best-efforts" element={<Navigate to="/trading/best-efforts" replace />} />
              <Route path="/execution/mandatory-bid" element={<Navigate to="/trading/mandatory-bid" replace />} />
              <Route path="/execution/opportunity-discovery" element={<Navigate to="/trading/opportunities" replace />} />
              <Route path="/execution/market-making-controls" element={<Navigate to="/trading/market-making" replace />} />
              <Route path="/execution/pipeline-marks" element={<Navigate to="/trading/pipeline-marks" replace />} />
              <Route path="/execution/shadow-bidding" element={<Navigate to="/trading/shadow-bidding" replace />} />

              <Route path="/settlement/delivery-inbox" element={<Navigate to="/settlement/delivery" replace />} />
              <Route path="/settlement/conditioning-workspace" element={<Navigate to="/settlement/conditioning" replace />} />
              <Route path="/settlement/clearing-queue" element={<Navigate to="/settlement/clearing" replace />} />
              <Route path="/settlement/cash-monitor" element={<Navigate to="/settlement/cash" replace />} />
              <Route path="/settlement/operational-compliance" element={<Navigate to="/settlement/compliance" replace />} />
              <Route path="/settlement/reconciliation-adjustments" element={<Navigate to="/settlement/reconciliation" replace />} />
              <Route path="/settlement/servicing-onboarding" element={<Navigate to="/settlement/servicing" replace />} />
              <Route path="/settlement/custodial-tracking" element={<Navigate to="/settlement/custodial" replace />} />
              <Route path="/settlement/post-closing-performance" element={<Navigate to="/settlement/post-close" replace />} />

              <Route path="/counterparties/buyers" element={<Navigate to="/network/buyers" replace />} />
              <Route path="/counterparties/sellers" element={<Navigate to="/network/sellers" replace />} />
              <Route path="/counterparties/approval-relationships" element={<Navigate to="/network/approvals" replace />} />
              <Route path="/integrations/mappings" element={<Navigate to="/network/integrations" replace />} />

              <Route path="/analytics/execution-delta" element={<Navigate to="/insights/execution-delta" replace />} />
              <Route path="/analytics/margin-accuracy" element={<Navigate to="/insights/margin-accuracy" replace />} />
              <Route path="/analytics/market-share" element={<Navigate to="/insights/market-share" replace />} />
              <Route path="/analytics/sla-throughput" element={<Navigate to="/insights/sla-throughput" replace />} />

              <Route path="/admin/user-roles" element={<Navigate to="/settings/roles" replace />} />
              <Route path="/admin/policies" element={<Navigate to="/settings/policies" replace />} />
              <Route path="/admin/rule-templates" element={<Navigate to="/settings/templates" replace />} />
              <Route path="/admin/adapter-showcase" element={<Navigate to="/settings/adapter-showcase" replace />} />
              <Route path="/admin/monetization-model" element={<Navigate to="/program" replace />} />

                <Route path="*" element={<Navigate to="/home" replace />} />
              </Route>
            </Routes>
            <PToastHost />
          </>
        </ShellProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
