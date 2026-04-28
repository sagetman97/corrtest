import { IconName, Icon } from './Icon';

interface EmptyStateProps {
  icon: IconName;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="bg-muted rounded-lg p-4 mb-4">
        <Icon name={icon} size={32} className="text-muted-foreground" />
      </div>
      <h3 className="text-sm mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground text-center mb-4 max-w-md">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
