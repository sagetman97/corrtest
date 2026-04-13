# Secrets Management Process

## Metadata

- Owner: Engineering + Security
- Last reviewed: 2026-04-13
- Confidence: High

## Purpose

Define how secrets are handled across Pod repositories and workflows.

## Core Rules

- Never store secrets in markdown, source code, or chat prompts.
- Use approved secret stores and access controls.
- Rotate credentials on schedule and after potential exposure.
- Limit secret access to least privilege.

## Standard Workflow

1. Request secret access with business justification.
2. Grant least-privileged role-based access.
3. Reference secret paths/labels in docs, never secret values.
4. Rotate and audit access regularly.

## Incident Response for Exposure

1. Revoke/rotate exposed secret immediately.
2. Assess blast radius.
3. Record incident and remediation actions.
4. Add prevention improvements to runbooks.
