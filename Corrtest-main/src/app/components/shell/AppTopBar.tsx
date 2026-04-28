import { Link, useNavigate } from 'react-router';
import { PButton } from '../polly/PButton';
import { Icon } from '../Icon';
import { GlobalSearchBar } from './GlobalSearchBar';
import { useAuth } from '../../context/AuthContext';

export function AppTopBar() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-[var(--colors-border-common-default)] bg-[var(--colors-background-common-white)] px-4">
      <GlobalSearchBar />
      <div className="ml-auto flex items-center gap-2">
        <Link to="/support" className="inline-flex rounded-[var(--border-radius-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--colors-border-common-accent)]">
          <PButton variant="text" intent="accent" size="sm">
            Support
          </PButton>
        </Link>
        <Link to="/insights" className="inline-flex rounded-[var(--border-radius-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--colors-border-common-accent)]">
          <PButton variant="text" intent="accent" size="sm">
            Insights
          </PButton>
        </Link>
        <Link to="/program" className="inline-flex rounded-[var(--border-radius-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--colors-border-common-accent)]">
          <PButton variant="text" intent="accent" size="sm">
            Program
          </PButton>
        </Link>
        <Link to="/settings" className="inline-flex rounded-[var(--border-radius-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--colors-border-common-accent)]">
          <PButton variant="outline" intent="accent" size="sm" leftIcon={<Icon name="settings" size={14} />}>
            Settings
          </PButton>
        </Link>
        <PButton
          variant="outline"
          intent="accent"
          size="sm"
          onClick={() => {
            signOut();
            navigate('/login', { replace: true });
          }}
        >
          Sign out
        </PButton>
      </div>
    </header>
  );
}
