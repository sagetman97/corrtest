# AI Evaluation Standard

## Metadata

- Owner: AI Engineer + AI Solutions Manager
- Last reviewed: 2026-04-13
- Confidence: High

## Purpose

Define minimum evaluation rigor for AI features before pilot and release.

## Minimum Standard

- Baseline dataset and scenario coverage defined.
- Pass/fail thresholds documented before testing.
- Candidate vs baseline comparison recorded.
- Regression cases identified and tracked.

## Coverage Dimensions

- Core task quality
- Edge-case behavior
- Safety and policy alignment
- Latency and reliability signals

## Decision Policy

- Pass all critical thresholds -> eligible for release review.
- Miss critical threshold -> hold and remediate.
- Unknown behavior in critical path -> do not ship without mitigation.

## Required Artifacts

- Evaluation summary note
- Linked metrics updates
- Decision entry with ship/hold rationale
