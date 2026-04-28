/**
 * PPageHeader / ProductLogo tints by product vertical.
 * Source: `docs/reference/ux-guidelines-figma-master-ai.md` (Color Tokens) and
 * `ui-components-main` brand usage (accents on structure, not full surfaces).
 */
export const PILLAR_PAGE_ACCENT = {
  /** Default / home / settings-style */
  tealBrand: '#01FFF0',
  /** Pricing & marks — `blue-pricing` */
  bluePricing: '#1DD6FF',
  /** Trading & execution, network counterparty hubs — `yellow-exchange` */
  yellowExchange: '#FFD601',
  /** Settlement & cash stack */
  greenSettlement: '#6FCF97',
  /** AI / agentic surfaces — `purple-ai` */
  purpleAi: '#A089FD',
  /** Insights / analytics emphasis — `magenta-analytics` */
  magentaAnalytics: '#FF54D9',
} as const;

export type PillarPageAccent = (typeof PILLAR_PAGE_ACCENT)[keyof typeof PILLAR_PAGE_ACCENT];
