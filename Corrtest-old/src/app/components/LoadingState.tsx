import { LoadingLogo } from './LoadingLogo';

export function LoadingState() {
  return <LoadingLogo size={48} message="Loading..." />;
}

export function TableLoadingSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-10 bg-muted/30 rounded animate-pulse"></div>
      ))}
    </div>
  );
}
