# Polly Tooling Integration Matrix

## Purpose

Map current tools to practical knowledge-ingestion patterns for Cursor Chat and
this repository.

## Observed Tool Inventory (From Okta App View)

- Drata
- Pave
- Jira
- Lattice
- Kibana Prod
- Kibana Stage
- Sentry
- SonarCloud
- GitHub
- AWS SSO
- 1Password Business
- Clari
- CircleCI
- KnowBe4
- Amazon AppStream
- Kubernetes Dashboard - Review
- Google Workspace Account
- Google Workspace Mail
- Google Workspace Drive
- Google Workspace Calendar
- Slack
- Rippling
- Datadog
- Ashby

## High-Priority Integrations (Phase 1)

| Tool | Primary Knowledge Value | Integration Method | Canonical Output in Repo |
| --- | --- | --- | --- |
| Jira | Epics, scope, delivery status, decisions | MCP or REST API pull | `docs/reference/processes/` and `docs/how-to/` |
| GitHub | Code decisions, PR context, ownership | MCP or GitHub API | `docs/reference/engineering/` |
| Slack | Decision context and clarifications | MCP or export + summary | `docs/reference/processes/decision-log.md` |
| Google Drive | Specs, decks, docs | Drive API/MCP + normalization | `docs/reference/` and `docs/explanation/` |
| Google Calendar | Milestones and release cadence | API export and summaries | `docs/reference/team/operating-cadence.md` |

## Observability and Reliability Integrations (Phase 2)

| Tool | Knowledge Value | Integration Method | Canonical Output |
| --- | --- | --- | --- |
| Datadog | Service health, incidents, SLO trends | API snapshots + weekly digest | `docs/reference/engineering/reliability.md` |
| Sentry | Error patterns and regressions | API + runbook linking | `docs/how-to/incident-triage.md` |
| Kibana (Prod/Stage) | Logs and operational patterns | API/query export or runbook refs | `docs/reference/engineering/logging.md` |
| CircleCI | Build outcomes and flaky pipelines | API + failure digest | `docs/reference/engineering/ci-health.md` |
| SonarCloud | Code quality and debt trends | API + KPI summaries | `docs/reference/engineering/code-quality.md` |

## Security, Access, and Compliance (Phase 3)

| Tool | Knowledge Value | Integration Method | Canonical Output |
| --- | --- | --- | --- |
| Drata | Compliance controls and evidence posture | API/export + controlled summaries | `docs/reference/processes/compliance.md` |
| 1Password Business | Secret handling standards | No secret sync; policy-only docs | `docs/reference/processes/secrets.md` |
| AWS SSO | Role model and access paths | Export role map | `docs/reference/tools/aws-sso.md` |
| Amazon AppStream | Virtual app delivery context and access runbooks | Manual docs + controlled export | `docs/how-to/` |
| KnowBe4 | Security training context | Report summaries only | `docs/reference/team/security-training.md` |

## People and Business Systems (Selective)

| Tool | Knowledge Value | Integration Method | Canonical Output |
| --- | --- | --- | --- |
| Lattice | Team goals and review cycles | Policy-safe summaries only | `docs/reference/team/goals.md` |
| Rippling | Org metadata (limited use) | Manual, HR-safe summaries only | `docs/reference/people/` |
| Ashby | Hiring funnel and role requirements | API/export summaries | `docs/reference/team/hiring.md` |
| Pave | Compensation benchmarking context | High-level policy summary only | `docs/reference/team/comp-philosophy.md` |
| Clari | Revenue and forecasting context | Controlled summaries only | `docs/explanation/` |

## Do Not Ingest as Raw Knowledge

- Credentials, tokens, or secret payloads from any system.
- Full HR/private records.
- Unreviewed customer-sensitive data.

## MCP in Cursor (this Pod)

For **what each connected MCP can do** and **when to use it**, see `docs/reference/mcp-capabilities-and-usage.md`.

## Integration Pattern

1. Pull from source system (MCP/API/export).
2. Normalize to focused markdown pages.
3. Add owner, source, and date metadata.
4. Mark uncertainty and stale data clearly.
5. Reference markdown pages in chat answers.
