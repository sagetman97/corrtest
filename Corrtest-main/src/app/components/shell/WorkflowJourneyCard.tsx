import { Link } from 'react-router';
import { PButton, PCard, PStatusBadge } from '../polly';

type JourneyStep = 'mark' | 'execute' | 'settle' | 'cash';

const STEP_ORDER: Array<{ id: JourneyStep; label: string }> = [
  { id: 'mark', label: 'Mark' },
  { id: 'execute', label: 'Execute' },
  { id: 'settle', label: 'Settle' },
  { id: 'cash', label: 'Cash' },
];

export type JourneyLink = {
  label: string;
  to: string;
};

export function WorkflowJourneyCard({
  currentStep,
  nextStep,
  nextStepDescription,
  fallbackLinks = [],
}: {
  currentStep: JourneyStep;
  nextStep?: JourneyLink;
  nextStepDescription: string;
  fallbackLinks?: JourneyLink[];
}) {
  return (
    <PCard
      title="Workflow journey"
      description="Demo path continuity for mark -> execute -> settle -> cash"
      className="border-[var(--colors-border-common-default)] bg-[var(--colors-background-common-white)]"
    >
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          {STEP_ORDER.map((step, idx) => {
            const isCurrent = step.id === currentStep;
            const isComplete = STEP_ORDER.findIndex((x) => x.id === currentStep) > idx;
            return (
              <div key={step.id} className="flex items-center gap-2">
                <PStatusBadge
                  status={isCurrent ? 'active' : isComplete ? 'success' : 'pending'}
                  label={step.label}
                />
                {idx < STEP_ORDER.length - 1 ? (
                  <span className="text-xs text-[var(--colors-text-icon-medium)]" aria-hidden>
                    {'->'}
                  </span>
                ) : null}
              </div>
            );
          })}
        </div>
        <p className="text-sm text-[var(--colors-text-icon-medium)]">{nextStepDescription}</p>
        <div className="flex flex-wrap gap-2">
          {nextStep ? (
            <Link to={nextStep.to}>
              <PButton size="sm" intent="primary">
                Next: {nextStep.label}
              </PButton>
            </Link>
          ) : null}
          {fallbackLinks.map((link) => (
            <Link key={link.to} to={link.to}>
              <PButton size="sm" variant="outline" intent="accent">
                {link.label}
              </PButton>
            </Link>
          ))}
        </div>
      </div>
    </PCard>
  );
}
