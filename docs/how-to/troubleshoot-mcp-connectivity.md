# How to Troubleshoot MCP Connectivity in Cursor

## Purpose

Restore reliable MCP-based retrieval when connectors fail or become unstable.

## Symptoms

- MCP server shows error state.
- Chat cannot access expected tool data.
- Responses fall back to incomplete local context only.

## Steps

1. Check MCP server status in Cursor settings.
2. Verify authentication/session state for affected connector.
3. Reconnect and validate scope/permissions.
4. Retry a small read action before full ingestion workflows.
5. If failure persists, switch to API/export fallback temporarily.

## Fallback Plan

- Continue knowledge updates via manual/API export.
- Normalize outputs to markdown in `docs/`.
- Mark source and retrieval date clearly.

## Recovery Criteria

- Connector read operations succeed.
- Latest source updates can be ingested.
- No critical knowledge workflow remains blocked.
