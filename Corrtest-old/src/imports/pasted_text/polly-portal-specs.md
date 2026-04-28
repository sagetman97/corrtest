You are designing a new portal experience for Polly, the mortgage capital markets technology platform at polly.io.

Use the attached Polly product screenshots, frontend reference screens, design system, component library, tokens, and any uploaded project specs as the source of truth. Do not create a new brand or visual language. The new portal must feel indistinguishable from Polly’s existing frontend product experience.

PROJECT GOAL
Create a high-fidelity, interactive portal prototype for [INSERT PORTAL TYPE: customer admin / lender portal / investor portal / partner portal / internal operations portal / LO portal]. The portal should help [PRIMARY USER] quickly understand status, take action, manage workflows, and access Polly platform capabilities without feeling like they have entered a separate product.

POLLY CONTEXT
Polly is a cloud-native mortgage capital markets platform. The product ecosystem includes:
- Product and Pricing Engine
- Loan Trading Exchange
- Data and Analytics
- Polly AI
- Network / integrations
- Enterprise-grade security and scalability

The design should reflect Polly’s core product promises:
- Speed
- Accuracy
- Confidence
- Configurability
- Real-time visibility
- Data-driven decisions
- Workflow automation
- Enterprise trust
- Modern mortgage capital markets infrastructure

DESIGN PRINCIPLES
1. Match the existing Polly frontend exactly.
   - Reuse the same layout density, spacing, typography, colors, border radius, card styles, table styles, charts, form controls, modals, filters, navigation, empty states, loading states, and interaction patterns.
   - Do not introduce new visual metaphors, gradients, icon styles, or component patterns unless they already exist in Polly’s product.

2. Enterprise fintech, not generic SaaS.
   - The UI should feel precise, structured, secure, and operationally reliable.
   - Prioritize clarity, scanability, and actionability over decorative design.
   - Use dense information layouts where appropriate, but maintain strong hierarchy.

3. Data-forward workflow design.
   - Every page should help users answer:
     - What is happening?
     - What requires attention?
     - What changed?
     - What action should I take next?
   - Use tables, filters, status indicators, trend cards, charts, and audit-style details where relevant.

4. Mortgage domain realism.
   - Use realistic terminology such as:
     - Loan
     - Lock
     - Rate
     - Price
     - Margin
     - Best execution
     - Investor
     - Commitment
     - Eligibility
     - Scenario
     - Product
     - Channel
     - Rule
     - Bid
     - Delivery
     - Pipeline
     - Exceptions
     - Audit log
   - Avoid consumer-finance or generic CRM language unless specifically needed.

5. Portal should extend the platform.
   - The portal should feel connected to Polly’s PPE, Loan Trading Exchange, Data & Analytics, and AI capabilities.
   - It should not feel like a marketing site, help center, or standalone admin tool.

TARGET USERS
Primary user: [INSERT]
Secondary users: [INSERT]
User sophistication: enterprise mortgage professionals; assume they understand mortgage capital markets, pricing, trading, operational exceptions, and compliance-sensitive workflows.

CORE PORTAL SECTIONS
Design the following sections unless the uploaded project spec says otherwise:

1. Home / Overview
   - Executive summary cards
   - Status of key workflows
   - Recent activity
   - Items requiring attention
   - Quick links into major Polly modules
   - Alerts or exceptions
   - Relevant real-time metrics

2. Workspace / Account Overview
   - Organization profile
   - Active products/modules
   - Environment/status
   - Key contacts
   - Implementation or account health
   - Usage summary

3. Product & Pricing
   - Summary of PPE status
   - Active pricing configurations
   - Rule/version status
   - Recent changes
   - Exceptions or pending approvals
   - Links to pricing workflows

4. Loan Trading / Execution
   - Best execution summary
   - Investor/buyer activity
   - Commitment/cart/pool-related status
   - Recent bid or sale activity
   - Exceptions needing action

5. Data & Analytics
   - Market and competitive insights
   - Volume trends
   - Price comparison
   - Profitability indicators
   - Customizable dashboard cards
   - Drill-down chart/table pattern

6. AI / Insights
   - AI-generated recommendations
   - Near-miss eligibility insights
   - Pricing improvement opportunities
   - Suggested next actions
   - Confidence/traceability indicators
   - Clear disclaimer pattern where needed

7. Integrations / Network
   - LOS integrations
   - Agency/investor/API connections
   - Connection health
   - Sync status
   - Error states
   - Integration setup or support flow

8. Admin / Settings
   - Users and roles
   - Permissions
   - Security settings
   - Audit log
   - Notification preferences
   - Data access controls

9. Support / Success
   - Support contact
   - Customer success contact
   - Documentation links
   - Implementation milestones if relevant
   - Ticket/status overview if relevant

INTERACTION REQUIREMENTS
Create an interactive prototype with:
- Clickable left navigation
- Top-level search or command pattern if consistent with Polly’s existing product
- Drill-down from dashboard cards into detail pages
- Table sorting, filtering, and row detail pattern
- Modal for configuration/edit action
- Empty state
- Loading state
- Error state
- Permission-denied / limited-access state
- Success confirmation after an action
- Alert or exception review workflow

INFORMATION ARCHITECTURE
Use a left-side navigation pattern if consistent with Polly’s existing frontend. Otherwise use the attached product navigation pattern exactly.

Suggested hierarchy:
- Overview
- Product & Pricing
- Loan Trading
- Analytics
- AI Insights
- Integrations
- Admin
- Support

VISUAL STYLE REQUIREMENTS
Use existing Polly frontend styling from attachments:
- Same color palette
- Same typography
- Same data table density
- Same chart style
- Same card elevation/borders
- Same buttons and action hierarchy
- Same form controls
- Same modal/dialog style
- Same empty/error/loading states
- Same icon style
- Same spacing system

If a needed pattern is missing, create the minimum viable extension that feels native to Polly. Clearly keep it conservative and production-ready.

CONTENT TONE
Use concise, confident, enterprise product copy.
Tone should be:
- Clear
- Precise
- Professional
- Helpful
- Modern
- Low-fluff

Avoid:
- Marketing slogans inside the product
- Playful consumer copy
- Vague AI language
- Overpromising automation

SAMPLE REALISTIC DATA
Use plausible mortgage capital markets data:
- Lock volume
- Pull-through rate
- Best execution gain/loss
- Margin movement
- Investor bid status
- Rule version
- Pricing scenario
- Channel
- Product type
- Loan count
- Basis point changes
- Exception count
- Last sync timestamp
- Integration health

Example cards:
- Active Locks
- Pricing Exceptions
- Best Execution Opportunities
- Investor Commitments
- Margin Movement
- Integration Health
- AI Recommendations
- Pending Approvals

AI UX REQUIREMENTS
For Polly AI-related surfaces:
- Recommendations must be explainable.
- Include “why this matters” or “basis for recommendation.”
- Show confidence/status carefully.
- Allow user review before action.
- Never make AI actions feel automatic without user control.
- Provide traceability back to pricing, eligibility, or loan data.

COMPLIANCE / TRUST UX
Include enterprise trust patterns:
- Role-based access indicators
- Audit trail
- Last updated timestamps
- Source/system of record labels
- Data sync health
- Permission states
- Export/download controls only where appropriate
- Clear distinction between recommendation and executed action

DELIVERABLE
Produce a polished, high-fidelity, clickable Figma Make prototype with:
- Desktop-first experience
- Responsive considerations for tablet
- At least 8–10 core screens
- Realistic data
- Native Polly visual feel
- Key workflows represented end-to-end
- Component consistency with existing Polly UI

Do not optimize for novelty. Optimize for trust, consistency, speed, and operational usefulness.

Before finalizing, compare every generated screen against the attached Polly frontend references and revise anything that feels generic, off-brand, visually inconsistent, too playful, too spacious, or unlike Polly’s existing product.